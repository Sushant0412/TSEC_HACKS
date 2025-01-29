import React, { useEffect, useState } from "react";
import DocumentDetailModal from "./DocumentDetailModel"; // Ensure this import is correct
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const ClientDocuments = () => {
  const [clients, setClients] = useState([
    { id: 1, name: "John Doe", caseNumber: "12345" },
    { id: 2, name: "Jane Smith", caseNumber: "67890" },
    { id: 3, name: "Alice Johnson", caseNumber: "24680" },
    { id: 4, name: "Robert Brown", caseNumber: "13579" },
    { id: 5, name: "Emily Davis", caseNumber: "24681" },
    { id: 6, name: "Michael White", caseNumber: "11111" },
    { id: 7, name: "Sarah Clark", caseNumber: "22222" },
    { id: 8, name: "David Martinez", caseNumber: "33333" },
    { id: 9, name: "Laura Wilson", caseNumber: "44444" },
    { id: 10, name: "Chris Taylor", caseNumber: "55555" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState(clients);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearchChange = (event) => {
    const term = event.target.value.toUpperCase();
    setSearchTerm(term);
    setFilteredClients(
      clients.filter(
        (client) =>
          client.name.toUpperCase().includes(term) ||
          client.caseNumber.includes(term)
      )
    );
  };

  const handleViewDocuments = (client) => {
    setSelectedClient(client);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedClient(null);
  };

  useEffect(() => {
    const fetchClients = async () => {
      const lawyerId = localStorage.getItem("id");
      if (!lawyerId) {
        console.error("Lawyer ID not found");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/lawyer/cases",
          { lawyerId },
          { withCredentials: true }
        );
        if (response.data.status && response.data.data) {
          const clientIds = response.data.data;
          const clientDetailsPromises = clientIds.map((id) =>
            axios.post(
              `http://localhost:3000/prisoner/getPrisonerDetailsByName`,
              { _id: "66c9913f6cdba09d94e14405" },
              { withCredentials: true }
            )
          );
          const clientDetailsResponses = await Promise.all(
            clientDetailsPromises
          );
          const clientsData = clientDetailsResponses.map((res) => res.data);
          setClients(clientsData);
        } else {
          console.error("Error fetching client IDs:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, [setClients]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Heading Section */}
      <div className="text-left mb-8 ml-6">
        <h1 className="text-4xl font-semibold text-gray-800">
          Client Documents
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Search for clients and view their documents.
        </p>
      </div>

      {/* Search Section */}
      <div className="flex items-center mb-6 ml-6 space-x-4">
        <input
          type="text"
          placeholder="Search by Client Name or Case Number"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-lg p-3 w-full md:w-80 lg:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => handleSearchChange({ target: { value: searchTerm } })}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center transition-transform"
        >
          <FaSearch className="w-5 h-5 mr-2" />
          <span className="font-semibold">Search</span>
        </button>
      </div>

      {/* Client List */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-gray-300 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
            >
              <div className="flex flex-col text-left">
                <h3 className="text-3xl font-bold text-gray-\ hover:text-blue-600 transition-colors">
                  {client.name}
                </h3>
                <p className="text-gray-500 text-lg">
                  Case Number: {client.caseNumber}
                </p>
              </div>
              <button
                onClick={() => handleViewDocuments(client)}
                className="mt-6 bg-gradient-to-r bg-blue-600 text-white w-32 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition-all duration-300 focus:outline-none text-sm"
              >
                View Documents
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Document Detail Modal */}
      {isModalVisible && (
        <DocumentDetailModal
          client={selectedClient}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ClientDocuments;
