from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import json
import google.generativeai as genai
import time
import os
from google.api_core.exceptions import ResourceExhausted
from dotenv import load_dotenv
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

load_dotenv()

app = Flask(__name__)
CORS(app)

# Load the JSON data
with open('Laws.json') as laws_file:
    laws_data = json.load(laws_file)

with open('Offences.json') as offenses_file:
    offenses_data = json.load(offenses_file)

# Secure API Key Handling
genai.configure(api_key=os.getenv("AIzaSyD8SBOM2_y1Ibj2z_9WJuRcy554g-ubE9s"))  # Use the secure API key
model = genai.GenerativeModel("gemini-pro")

# BERT Model and Tokenizer
bert_tokenizer = AutoTokenizer.from_pretrained("AryanKKate/legal-bert-model")
bert_model = AutoModelForSequenceClassification.from_pretrained("AryanKKate/legal-bert-model")


@app.route('/query', methods=['POST'])
def get_query():
    data = request.json
    query = data.get('query')
    prompt = f"You are now an AI bot integrated into a law website. Answer the following question as an Indian Lawyer: {query}"

    # Retry mechanism for Google Generative AI model
    max_retries = 3
    retries = 0
    while retries < max_retries:
        try:
            response = model.generate_content(prompt)
            print(response.text)
            return jsonify({"data": response.text})
        except ResourceExhausted:
            retries += 1
            wait_time = 5 * retries  # Exponential backoff
            print(f"Rate limit exceeded. Retrying in {wait_time} seconds...")
            time.sleep(wait_time)

    print("Failed to get a response after multiple retries.")
    return jsonify({"data": "Could not find anything for your case"}), 429  # HTTP 429: Too Many Requests


@app.route('/get_info', methods=['POST'])
def get_info():
    data = request.json
    offenses_list = data.get('offenses')

    if not offenses_list:
        return jsonify({"error": "No offenses provided"}), 400

    offenses_names = [name.strip() for part in offenses_list.split(',') for name in part.replace(' and ', ' ').split()]

    results = []
    for offense_name in offenses_names:
        offense = next((item for item in offenses_data if item['Offense_Name'].lower() == offense_name.lower()), None)
        if not offense:
            results.append({"error": f"Offense '{offense_name}' not found"})
            continue

        related_laws = [law for law in laws_data if law['Law_ID'] == offense['Law_ID']]
        result = {
            "Offense": offense_name,
            "Laws": [
                {
                    "Law_Name": law['Law_Name'],
                    "Abbreviation": law['Abbreviation'],
                    "Description": law['Description']
                }
                for law in related_laws
            ],
            "Penalty/Imprisonment Duration": offense.get('Penalty/Imprisonment Duration'),
            "Bail_Eligibility_Status": offense.get('Bail Eligibility Status')
        }
        results.append(result)

    return jsonify({"data": results})


@app.route('/bert_predict', methods=['POST'])
def bert_predict():
    data = request.json
    text = data.get('text')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    # Tokenize and predict with BERT
    inputs = bert_tokenizer(text, return_tensors="pt", truncation=True, padding=True)

    with torch.no_grad():
        outputs = bert_model(**inputs)
        logits = outputs.logits

    probabilities = torch.nn.functional.softmax(logits, dim=-1)
    predicted_class = torch.argmax(probabilities, dim=-1).item()

    # Assuming you have two classes: "Legally Risky" and "Not Legally Risky"
    classification = "Legally Risky" if predicted_class == 1 else "Legally Safe"

    # Provide suggestions if it's "Legally Risky"
    suggestions = []
    if classification == "Legally Risky":
        suggestions = generate_suggestions(text)

    return jsonify({
        "prediction": classification,
        "confidence": probabilities.tolist(),
        "suggestions": suggestions
    })

def generate_suggestions(text):
    # Example logic for generating suggestions if text is risky
    # Here, we are just creating generic suggestions. You can refine this with more domain-specific suggestions.
    suggestions = []

    if "automatically renew" in text.lower():
        suggestions.append("Consider adding a clause allowing either party to review the agreement before renewal.")

    if "six months" in text.lower():
        suggestions.append("Make sure the 6-month notice period is reasonable and aligns with the industry standard.")

    # You can expand this list based on more patterns or use additional models for suggestion generation.
    return suggestions



if __name__ == '__main__':
    app.run(debug=True)

