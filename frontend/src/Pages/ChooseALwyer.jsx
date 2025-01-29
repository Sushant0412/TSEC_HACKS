import React, { useState } from "react";
import lawyers from "../../public/data/lawyers.json"; // Adjust the path if the JSON file is located elsewhere
import { assets } from "../assets/assets.js";
const ChooseLawyer = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle the search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const [isLawyer, setIsLawyer] = useState(true);

  const toggleSwitch = () => setIsLawyer(!isLawyer);
  // Filter lawyers based on the search term

  const filteredLawyers = lawyers.filter(
    (lawyer) =>
      (lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.specialization
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        lawyer.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      lawyer.type == `${isLawyer ? "lawyer" : "probono"}`
  );

  const handleWhatsAppClick = (phoneNumber) => {
    const formattedNumber = phoneNumber.replace(/\s+/g, "");
    const whatsappUrl = `https://wa.me/${formattedNumber}`;
    window.open(whatsappUrl, "_blank");
  };
  return (
    <div className="bg-white border border-primary p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-3xl font-bold text-primary mb-6">Lawyers</h2>
      <div className="flex gap-x-2  items-center pb-2">
        <h3 className="text-primary">Pro Bono</h3>
        <div
          onClick={toggleSwitch}
          className={`w-8 h-4 flex items-center mt-1  rounded-full  cursor-pointer ${
            isLawyer ? "bg-primary" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-3 h-3 rounded-full shadow-md transform duration-300 ease-in-out ${
              isLawyer ? "translate-x-4" : "translate-x-1"
            }`}
          ></div>
        </div>
        <h3 className="text-primary">Lawyers</h3>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or specialization or location..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Lawyer List */}
      <ul className="space-y-6">
        {filteredLawyers.map((lawyer, index) => (
          <li
            key={index}
            className="p-4 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition duration-300"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <p className="text-xl font-semibold">{lawyer.name}</p>
                <p className="text-md text-gray-700">
                  Specialization: {lawyer.specialization}
                </p>
                <p className="text-md text-gray-700">
                  Type:{" "}
                  {lawyer.type.charAt(0).toUpperCase() + lawyer.type.slice(1)}
                </p>
                <p className="text-md text-gray-700">
                  Experience: {lawyer.experience}
                </p>
                <p className="text-md text-gray-700">
                  Location: {lawyer.location}
                </p>
                <p className="text-md text-gray-700">
                  Phone: {lawyer.contactDetails.phone}
                </p>
                <p className="text-md text-gray-700">
                  Email: {lawyer.contactDetails.email}
                </p>
              </div>
              <div className="mt-4 md:mt-0 md:flex md:items-center">
                <button className="bg-[#00008B] text-white text-lg px-6 py-2 rounded-full hover:bg-primary-light transition duration-300">
                  Apply
                </button>
                <div className="p-3">
                  <img
                    className="cursor-pointer w-10 h-10 rounded-full border-4 border-gray-300 shadow-lg object-cover"
                    src={assets.wp}
                    alt="Connect with Whatsapp"
                    onClick={() =>
                      handleWhatsAppClick(lawyer.contactDetails.phone)
                    }
                  />
                            
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* No Results Found */}
      {filteredLawyers.length === 0 && (
        <p className="text-md text-gray-500 mt-4">
          No lawyers found matching your search criteria.
        </p>
      )}
    </div>
  );
};

export default ChooseLawyer;
