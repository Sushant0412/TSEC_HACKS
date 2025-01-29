import { useState } from "react";
import axios from "axios";

const DocGen = () => {
  const [formData, setFormData] = useState({
    petitionerName: "",
    petitionerFatherName: "",
    petitionerAge: "",
    petitionerOccupation: "",
    petitionerAddress: "",
    respondentName: "",
    respondentFatherName: "",
    respondentAge: "",
    respondentOccupation: "",
    respondentAddress: "",
    firNumber: "",
    section: "",
    policeStation: "",
    dateOfArrest: "",
    businessDetails: "",
    otherRelevantFacts: "",
    prayerDetails: "",
    courtName: "",
    judgeTitle: "",
    courtLocation: "",
    chargeDetails: "",
    petitionFilingDate: "",
    petitionerLegalCounsel: "",
    placeOfFiling: "",
    additionalPrayerDetails: "",
    conditionsOfBail: "",
    previousApplications: "",
    petitionerUndertaking: "",
    hearingDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      projectName: "bailReckoner",
      design_file: "bailApplication.ejs",
      pdf_name: "BailApplication",
      template_data: formData,
      should_replace: true,
      return_file: true,
    };

    try {
      const response = await axios.post("http://192.168.32.251:3001/pdf/generate", requestData);
      if (response.data.status_code === 200) {
        alert("PDF Generated Successfully!");
      } else {
        alert("Error generating PDF.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while generating the PDF.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Generate Bail Application PDF</h1>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        {/* Petitioner Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="petitionerName" className="block text-sm font-semibold">Petitioner Name</label>
            <input
              type="text"
              name="petitionerName"
              value={formData.petitionerName}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="petitionerFatherName" className="block text-sm font-semibold">Father's Name</label>
            <input
              type="text"
              name="petitionerFatherName"
              value={formData.petitionerFatherName}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>
        {/* Add more input fields for the rest of the form here */}
        <div>
          <label htmlFor="hearingDate" className="block text-sm font-semibold">Hearing Date</label>
          <input
            type="date"
            name="hearingDate"
            value={formData.hearingDate}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            required
          />
        </div>
        {/* Add a Submit button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
          >
            Generate PDF
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocGen;
