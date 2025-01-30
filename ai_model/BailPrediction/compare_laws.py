import requests
import os

# Gemini API configuration
GEMINI_API_KEY = (
    "AIzaSyB1s0qBzbGORa8i9NyjZ4kKAyjWlrpiipA"
    # "AIzaSyDVc86TZN-4bJTKkzPnMZTYC97qKgba7SQ"  # Replace with your Gemini API key
)
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"


def read_file(file_path):
    """Helper function to read a file."""
    try:
        with open(file_path, "r") as file:
            return file.read()
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        return ""


def send_to_gemini(ocr_text, laws_text):
    """Send OCR text and laws to Gemini for comparison."""
    try:
        headers = {
            "Content-Type": "application/json",
        }

        # Construct the prompt for the request
        prompt = f"This is the bailing text: {ocr_text}\nThis is the laws: {laws_text}\n check for violations and if any found summarize in less than 200 words as small as possible. Or if none just say that - The doc abides by the laws"
        # Send request to Gemini API
        data = {"contents": [{"parts": [{"text": prompt}]}]}

        response = requests.post(GEMINI_API_URL, headers=headers, json=data)

        if response.status_code == 200:
            gemini_response = response.json()

            # Extract the content text from the Gemini response
            text_part = (
                gemini_response.get("candidates", [{}])[0]
                .get("content", {})
                .get("parts", [{}])[0]
                .get("text", "")
            )
            return f"Violation Summary:\n{text_part}..."  # Truncate for brevity (2-3 lines)

        else:
            # Handle error response from Gemini API
            return f"Error: {response.status_code} - {response.text}"

    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return "Error during comparison."


def generate_report(ocr_text, law_files):
    """Generate violation report by comparing OCR text with law files."""
    # Read all laws into a single text
    laws_text = ""
    for law_file in law_files:
        laws_text += read_file(law_file) + "\n"

    # Send OCR text and laws to Gemini for comparison
    gemini_report = send_to_gemini(ocr_text, laws_text)

    if gemini_report is None:
        gemini_report = "Error: No report generated."  # Handle None case

    # Ensure output folder exists
    os.makedirs("output", exist_ok=True)

    # Write the result (whether laws are followed or violation summary) to the output file
    with open("output/violations_report.txt", "w") as report_file:
        report_file.write(gemini_report)

    print("Violations report generated: output/violations_report.txt")


def read_ocr_text(file_path):
    """Helper function to read OCR text from a file."""
    return read_file(file_path)


if __name__ == "__main__":
    # Read OCR text from the doc_comparison.txt file
    ocr_text = read_ocr_text("./output/doc_comparison.txt")

    # Define law files to compare against
    law_files = [
        "laws/bail_laws.txt",
        "laws/contract_laws.txt",
        "laws/criminal_procedure_laws.txt",
    ]

    # Generate the violation report
    generate_report(ocr_text, law_files)
