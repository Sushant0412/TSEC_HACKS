from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import json
import google.generativeai as genai
import time
import os
from google.api_core.exceptions import ResourceExhausted
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# Load the JSON data
with open('Laws.json') as laws_file:
    laws_data = json.load(laws_file)

with open('Offences.json') as offenses_file:
    offenses_data = json.load(offenses_file)

# Secure API Key Handling
#genai.configure(api_key="AIzaSyC8QVswiobSY_zFhch2Gn346tsWa4LWPeg")
#API_KEY = os.getenv("AIzaSyC8QVswiobSY_zFhch2Gn346tsWa4LWPeg")  # Load from environment variable
#

genai.configure(api_key="AIzaSyD8SBOM2_y1Ibj2z_9WJuRcy554g-ubE9s")  # Use the secure API key
model = genai.GenerativeModel("gemini-pro")

@app.route('/query', methods=['POST'])
def get_query():
    data = request.json
    query = data.get('query')
    prompt = f"You are now an AI bot integrated into a law website. Answer the following question as an Indian Lawyer: {query}"

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

if __name__ == '__main__':
    app.run(debug=True)
