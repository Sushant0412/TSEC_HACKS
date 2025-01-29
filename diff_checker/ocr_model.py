import os
import pytesseract
import docx
import fitz  # PyMuPDF
import difflib

# Define directories
laws_dir = "laws"
docs_dir = "documents"
output_file = "output/doc_comparison.txt"


# Load laws from text files
def load_laws():
    laws = {}
    for file in os.listdir(laws_dir):
        if file.endswith(".txt"):
            category = file.replace(".txt", "")
            with open(os.path.join(laws_dir, file), "r", encoding="utf-8") as f:
                laws[category] = f.read()
    return laws


# Extract text from PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with fitz.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text("text") + "\n"
    return text


# Extract text from DOCX
def extract_text_from_docx(docx_path):
    doc = docx.Document(docx_path)
    return "\n".join([para.text for para in doc.paragraphs])


# Compare document text with laws
def compare_with_laws(doc_text, laws):
    matches = {}
    for category, law_text in laws.items():
        ratio = difflib.SequenceMatcher(None, doc_text, law_text).ratio()
        if ratio > 0.3:  # Threshold for similarity
            matches[category] = ratio
    return matches


# Main function
def process_documents():
    laws = load_laws()
    results = []

    for file in os.listdir(docs_dir):
        if file.endswith(".pdf"):
            doc_text = extract_text_from_pdf(os.path.join(docs_dir, file))
        elif file.endswith(".docx"):
            doc_text = extract_text_from_docx(os.path.join(docs_dir, file))
        else:
            continue

        matches = compare_with_laws(doc_text, laws)

        results.append(
            f"Document: {file}\nExtracted Text:\n{doc_text}\n\nApplicable Laws:\n"
        )
        for law, similarity in matches.items():
            results.append(f"- {law} (Match: {similarity:.2f})\n")

        results.append("\n" + "-" * 50 + "\n")

    with open(output_file, "w", encoding="utf-8") as f:
        f.writelines(results)


# Run script
if __name__ == "__main__":
    process_documents()
