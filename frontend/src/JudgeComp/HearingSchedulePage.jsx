import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const JudgeDashboard = () => {
  // State to hold hearing data
  const [hearingData, setHearingData] = useState([]);
  const [selectedHearing, setSelectedHearing] = useState(null);

  // Dummy data for hearing schedule
  const dummySchedule = [
    {
      id: 1,
      date: "2024-09-01",
      caseTitle: "Case 001: John Doe vs State",
      time: "10:00 AM",
      status: "scheduled",
    },
    {
      id: 2,
      date: "2024-09-02",
      caseTitle: "Case 002: Jane Smith vs City",
      time: "02:00 PM",
      status: "in-progress",
    },
    {
      id: 3,
      date: "2024-09-03",
      caseTitle: "Case 003: Company A vs Company B",
      time: "11:30 AM",
      status: "completed",
    },
  ];

  // This function would normally fetch hearing data from an API or database
  const fetchHearingData = () => {
    setHearingData(dummySchedule); // Set the hearing data (normally from an API)
  };

  // UseEffect hook to fetch hearing data on component mount
  useEffect(() => {
    fetchHearingData();
  }, []);

  // Function to handle dropdown selection
  const handleDropdownSelect = (selectedOption) => {
    setSelectedHearing(selectedOption.value); // Set the selected hearing
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "";
    }
  };

  // Dropdown options
  const dropdownOptions = hearingData.map((hearing) => ({
    value: hearing.id,
    label: hearing.caseTitle,
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Judge Dashboard</h1>

      {/* Dropdown to select a hearing */}
      <Dropdown
        options={dropdownOptions}
        onChange={handleDropdownSelect}
        value={selectedHearing}
        placeholder="Select a hearing"
        className="mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hearingData.map((hearing) => (
          <div
            key={hearing.id}
            className="border rounded-lg p-4 shadow-md flex flex-col"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold">{hearing.caseTitle}</h2>
              <div className="flex items-center space-x-2">
                <button className="text-gray-600">More</button>
              </div>
            </div>

            <div className="mt-2">
              <div className="flex items-center mb-2">
                <span className="text-sm text-gray-600">Date:</span>
                <span className="ml-2 text-sm">{hearing.date}</span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-sm text-gray-600">Time:</span>
                <span className="ml-2 text-sm">{hearing.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`p-2 rounded-md badge ${getStatusColor(hearing.status)}`}>
                  {hearing.status}
                </span>
                <button className="text-sm text-blue-500">
                  View Documents
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JudgeDashboard;
