import React, { useState } from "react";

const DocumentUpload = () => {
  const [files, setFiles] = useState([]); // State for selected files
  const [uploadedDocuments, setUploadedDocuments] = useState([
    { id: 1, name: "Contract Agreement", date: "Aug 20, 2024" },
    { id: 2, name: "Witness Statement", date: "Aug 22, 2024" },
  ]);
  const [uploading, setUploading] = useState(false); // State to track uploading status
  const [error, setError] = useState(null); // State for error message
  const [selectedClient, setSelectedClient] = useState(null); // Assuming client selection
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  // Handle file upload
  const handleUpload = () => {
    if (files.length > 0) {
      setUploading(true);
      setError(null);
      setSuccessMessage(""); // Clear any previous success message

      // Simulate upload success
      setTimeout(() => {
        setUploading(false);
        setFiles([]); // Clear selected files after upload
        setSuccessMessage("Image uploaded successfully!");

        // Add new uploaded documents to the list
        const newDocuments = files.map((file, index) => ({
          id: uploadedDocuments.length + index + 1,
          name: file.name,
          date: new Date().toLocaleDateString(),
        }));
        setUploadedDocuments([...uploadedDocuments, ...newDocuments]);
      }, 2000); // Simulate a delay of 2 seconds
    } else {
      setError("Please select at least one document.");
    }
  };

  return (
    <div className="p-6 flex justify-center flex-col">
      <h1 className="text-3xl font-bold mb-4">Document Upload</h1>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="max-w-xl flex mx-auto rounded-lg overflow-hidden w-80">
        <div className="md:flex">
          <div className="w-full">
            <div className="relative border-dotted h-48 rounded-lg border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
              <div className="absolute">
                <div className="flex flex-col items-center">
                  <i className="fa fa-folder-open fa-4x text-blue-700"></i>
                  <span className="block text-gray-400 font-normal">
                    Attach your files here
                  </span>
                </div>
              </div>

              <input
                type="file"
                className="h-full w-full opacity-0"
                onChange={handleFileChange}
                multiple // Allow multiple files
              />
            </div>
          </div>
        </div>
      </div>

      <button
        className="bg-[#00008B] w-[20%] mr-[525px] ml-[525px] text-white px-6 py-2 rounded mt-4 hover:bg-primary-light transition duration-300"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Documents"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {successMessage && (
        <p className="mx-auto text-green-500 mt-4">{successMessage}</p> // Display success message
      )}

      <h2 className="text-2xl font-semibold mb-4">Uploaded Documents</h2>

      <ul className="space-y-4">
        {uploadedDocuments.map((doc, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 rounded-lg bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 border-blue-500"
          >
            <span>{doc.name}</span>
            <div className="bg-[#00008B] text-white px-4 py-1 hover:bg-[#1E3A55] transition duration-300 rounded-xl">
              {doc.date}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentUpload;
