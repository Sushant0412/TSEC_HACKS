import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Cases = () => {
  // Sample data for cases
  const casesData = [
    {
      caseId: "C001",
      clientName: "Alice Johnson",
      caseType: "Civil",
      status: "Open",
      lastUpdated: "2024-08-15",
    },
    {
      caseId: "C002",
      clientName: "Bob Smith",
      caseType: "Criminal",
      status: "Closed",
      lastUpdated: "2024-07-22",
    },
    {
      caseId: "C003",
      clientName: "Charlie Brown",
      caseType: "Family",
      status: "In Progress",
      lastUpdated: "2024-08-10",
    },
    {
      caseId: "C004",
      clientName: "Diana Prince",
      caseType: "Corporate",
      status: "Open",
      lastUpdated: "2024-08-12",
    },
    {
      caseId: "C005",
      clientName: "Edward Snowden",
      caseType: "Civil",
      status: "Open",
      lastUpdated: "2024-08-18",
    },
    {
      caseId: "C006",
      clientName: "Fiona Green",
      caseType: "Criminal",
      status: "In Progress",
      lastUpdated: "2024-08-20",
    },
    {
      caseId: "C007",
      clientName: "George Martin",
      caseType: "Civil",
      status: "Closed",
      lastUpdated: "2024-07-30",
    },
    {
      caseId: "C008",
      clientName: "Hannah Lewis",
      caseType: "Family",
      status: "Open",
      lastUpdated: "2024-08-16",
    },
  ];

  // State for search input and filtered cases
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCases, setFilteredCases] = useState(casesData);

  // Handle search input change
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setFilteredCases(
      casesData.filter((caseItem) =>
        caseItem.caseId.toUpperCase().includes(term.toUpperCase())
      )
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Heading Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-800 text-left">
          Cases
        </h1>
        <p className="text-lg text-gray-600 text-left">
          Here you can view and manage all the cases.
        </p>
      </div>

      {/* Search Input and Button */}
      <div className="flex mb-8">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by Case ID"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-lg p-3 w-full md:w-80 lg:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
          />
          <button
            onClick={() =>
              handleSearchChange({ target: { value: searchTerm } })
            }
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FaSearch className="w-5 h-5 mr-2" />
            <span className="font-semibold">Search</span>
          </button>
        </div>
      </div>

      {/* Card layout displaying cases */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCases.map((caseItem) => (
          <div
            key={caseItem.caseId}
            className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl hover:border-blue-500"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Case ID: {caseItem.caseId}
            </h2>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Client Name:</span>{" "}
              {caseItem.clientName}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Case Type:</span>{" "}
              {caseItem.caseType}
            </p>
            <p
              className={`text-sm mb-2 ${
                caseItem.status === "Open"
                  ? "text-green-500"
                  : caseItem.status === "Closed"
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              <span className="font-medium">Status:</span> {caseItem.status}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Last Updated:</span>{" "}
              {caseItem.lastUpdated}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cases;
