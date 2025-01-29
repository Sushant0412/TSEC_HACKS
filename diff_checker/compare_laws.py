import cohere
import os

co = cohere.Client("0jpjQvvrDH5hPjzSQvRGXopcQxW3r9xW2LvgvZ2t")


def read_file(file_path):
    """Helper function to read a file."""
    try:
        with open(file_path, "r") as file:
            return file.read()
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        return ""


def send_to_cohere(ocr_text, laws_text):
    """Send OCR text and laws to Cohere for comparison."""
    try:
        # Construct the prompt for the request
        prompt = f"This is the bailing text: {ocr_text}\nThis is the laws: {laws_text}\ncheck for violations and summarize in 500 words the violations if it mostly/largely looks good just say All laws followed and say nothing else just say All Laws followed don’t give summary or conclusion."

        # Make the request to Cohere API
        response = co.generate(
            model="xlarge",  # Use appropriate Cohere model
            prompt=prompt,
            max_tokens=1000,  # Set an appropriate limit for the response
            temperature=0.3,  # Use low temperature for deterministic output
        )

        # Get the response text
        text_part = response.generations[0].text.strip()

        # Check if the response mentions "All laws followed"
        if "all laws followed" in text_part.lower():
            return "All laws followed"
        else:
            # Return the summarized violations or issues
            return f"Violation Summary:\n{text_part[:500]}..."  # Truncate for brevity (2-3 lines)

    except Exception as e:
        print(f"Error calling Cohere API: {e}")
        return "Error during comparison."


def generate_report(ocr_text, law_files):
    """Generate violation report by comparing OCR text with law files."""
    # Read all laws into a single text
    laws_text = ""
    for law_file in law_files:
        law_content = read_file(law_file)
        if law_content:
            laws_text += law_content + "\n"
        else:
            print(f"Warning: Unable to read {law_file}, skipping.")

    if not laws_text:
        print("Error: No laws content to compare with.")
        return

    # Send OCR text and laws to Cohere for comparison
    cohere_report = send_to_cohere(ocr_text, laws_text)

    # Ensure output folder exists
    os.makedirs("output", exist_ok=True)

    # Write the result (whether laws are followed or violation summary) to the output file
    with open("output/violations_report.txt", "w") as report_file:
        report_file.write(cohere_report)

    print("Violations report generated: output/violations_report.txt")


def read_ocr_text(file_path):
    """Helper function to read OCR text from a file."""
    return read_file(file_path)


if __name__ == "__main__":
    # Read OCR text from the doc_comparison.txt file
    ocr_text = read_ocr_text("./output/doc_comparison.txt")
    if not ocr_text:
        print("Error: OCR text is empty or missing.")
        exit()

    # Define law files to compare against
    law_files = [
        "laws/bail_laws.txt",
        "laws/contract_laws.txt",
        "laws/criminal_procedure_laws.txt",
    ]

    # Generate the violation report
    generate_report(ocr_text, law_files)
