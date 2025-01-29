"use client";

import { useState } from "react";
import axios from "axios";
import { FaFileDownload, FaSpinner } from "react-icons/fa";

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

  const [isLoading, setIsLoading] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const requestData = {
      projectName: "bailReckoner",
      design_file: "bailApplication.ejs",
      pdf_name: "BailApplication",
      template_data: formData,
      should_replace: true,
      return_file: true,
    };

    try {
      const response = await axios.post(
        "http://192.168.32.251:3001/pdf/generate",
        requestData
      );
      if (response.data.status_code === 200) {
        setPdfGenerated(true);
        setPdfUrl(response.data.file_url); // Assuming the API returns a file URL
        alert("PDF Generated Successfully!");
      } else {
        alert("Error generating PDF.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while generating the PDF.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Generate Bail Application PDF
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-600">
              Petitioner Details
            </h2>
            <InputField
              label="Petitioner Name"
              name="petitionerName"
              value={formData.petitionerName}
              onChange={handleInputChange}
            />
            <InputField
              label="Father's Name"
              name="petitionerFatherName"
              value={formData.petitionerFatherName}
              onChange={handleInputChange}
            />
            <InputField
              label="Age"
              name="petitionerAge"
              value={formData.petitionerAge}
              onChange={handleInputChange}
              type="number"
            />
            <InputField
              label="Occupation"
              name="petitionerOccupation"
              value={formData.petitionerOccupation}
              onChange={handleInputChange}
            />
            <TextAreaField
              label="Address"
              name="petitionerAddress"
              value={formData.petitionerAddress}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-600">
              Respondent Details
            </h2>
            <InputField
              label="Respondent Name"
              name="respondentName"
              value={formData.respondentName}
              onChange={handleInputChange}
            />
            <InputField
              label="Father's Name"
              name="respondentFatherName"
              value={formData.respondentFatherName}
              onChange={handleInputChange}
            />
            <InputField
              label="Age"
              name="respondentAge"
              value={formData.respondentAge}
              onChange={handleInputChange}
              type="number"
            />
            <InputField
              label="Occupation"
              name="respondentOccupation"
              value={formData.respondentOccupation}
              onChange={handleInputChange}
            />
            <TextAreaField
              label="Address"
              name="respondentAddress"
              value={formData.respondentAddress}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-600">Case Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="FIR Number"
              name="firNumber"
              value={formData.firNumber}
              onChange={handleInputChange}
            />
            <InputField
              label="Section"
              name="section"
              value={formData.section}
              onChange={handleInputChange}
            />
            <InputField
              label="Police Station"
              name="policeStation"
              value={formData.policeStation}
              onChange={handleInputChange}
            />
            <InputField
              label="Date of Arrest"
              name="dateOfArrest"
              value={formData.dateOfArrest}
              onChange={handleInputChange}
              type="date"
            />
          </div>
          <TextAreaField
            label="Business Details"
            name="businessDetails"
            value={formData.businessDetails}
            onChange={handleInputChange}
          />
          <TextAreaField
            label="Other Relevant Facts"
            name="otherRelevantFacts"
            value={formData.otherRelevantFacts}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-600">Court Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Court Name"
              name="courtName"
              value={formData.courtName}
              onChange={handleInputChange}
            />
            <InputField
              label="Judge Title"
              name="judgeTitle"
              value={formData.judgeTitle}
              onChange={handleInputChange}
            />
            <InputField
              label="Court Location"
              name="courtLocation"
              value={formData.courtLocation}
              onChange={handleInputChange}
            />
            <InputField
              label="Hearing Date"
              name="hearingDate"
              value={formData.hearingDate}
              onChange={handleInputChange}
              type="date"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-600">
            Additional Details
          </h2>
          <TextAreaField
            label="Charge Details"
            name="chargeDetails"
            value={formData.chargeDetails}
            onChange={handleInputChange}
          />
          <InputField
            label="Petition Filing Date"
            name="petitionFilingDate"
            value={formData.petitionFilingDate}
            onChange={handleInputChange}
            type="date"
          />
          <InputField
            label="Petitioner's Legal Counsel"
            name="petitionerLegalCounsel"
            value={formData.petitionerLegalCounsel}
            onChange={handleInputChange}
          />
          <InputField
            label="Place of Filing"
            name="placeOfFiling"
            value={formData.placeOfFiling}
            onChange={handleInputChange}
          />
          <TextAreaField
            label="Prayer Details"
            name="prayerDetails"
            value={formData.prayerDetails}
            onChange={handleInputChange}
          />
          <TextAreaField
            label="Additional Prayer Details"
            name="additionalPrayerDetails"
            value={formData.additionalPrayerDetails}
            onChange={handleInputChange}
          />
          <TextAreaField
            label="Conditions of Bail"
            name="conditionsOfBail"
            value={formData.conditionsOfBail}
            onChange={handleInputChange}
          />
          <TextAreaField
            label="Previous Applications"
            name="previousApplications"
            value={formData.previousApplications}
            onChange={handleInputChange}
          />
          <TextAreaField
            label="Petitioner's Undertaking"
            name="petitionerUndertaking"
            value={formData.petitionerUndertaking}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Generating...
              </>
            ) : (
              "Generate PDF"
            )}
          </button>
          {pdfGenerated && (
            <a
              href={pdfUrl}
              download="BailApplication.pdf"
              className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center"
            >
              <FaFileDownload className="mr-2" />
              Download PDF
            </a>
          )}
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      required
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      required
    />
  </div>
);

export default DocGen;
