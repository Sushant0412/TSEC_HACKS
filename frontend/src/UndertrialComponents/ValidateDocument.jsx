import { useState } from "react";
import { FaUpload, FaFile } from "react-icons/fa";

function ValidateDocument() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiOutput, setApiOutput] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/validate", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setApiOutput(data.violations_report || "File validated successfully");
      } else {
        setApiOutput(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Error in API call");
      setApiOutput("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-12 bg-white rounded-xl shadow-xl mt-20">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Validate Document
      </h1>

      <div className="mb-6">
        <div className="relative border-2 border-blue-200 border-dashed rounded-lg p-6 hover:border-blue-400 transition-colors duration-300">
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="text-center">
            <FaFile className="mx-auto text-4xl text-blue-500 mb-4" />
            <p className="text-sm text-gray-600">
              {file
                ? file.name
                : "Drag and drop your file here or click to browse"}
            </p>
          </div>
        </div>
      </div>

      <button
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-300"
        onClick={handleFileUpload}
        disabled={loading || !file}
      >
        {loading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Validating...
          </span>
        ) : (
          <>
            <FaUpload className="mr-2" />
            <span>Validate Document</span>
          </>
        )}
      </button>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {/* New Textbox for displaying the API output */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 text-blue-600">
          Validation Result:
        </h2>
        <pre
          className="w-full p-4 bg-gray-100 border-2 border-gray-300 rounded-lg"
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        >
          {apiOutput || "The response will be generated here."}
        </pre>
      </div>
    </div>
  );
}

export default ValidateDocument;
