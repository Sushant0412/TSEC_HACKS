// src/components/Sidebar.jsx

import React from "react";
import {
  FaBell,
  FaFileAlt,
  FaFileContract,
  FaFolder,
  FaHandHoldingUsd,
  FaMoneyBill,
  FaUserTie,
} from "react-icons/fa";

const Sidebar = ({ handleNavigation, activeComponent }) => {
  const items = [
    {
      label: "Bail Eligibility",
      value: "BailEligibility",
      icon: <FaFileContract />,
    },
    { label: "Case Details", value: "CaseDetails", icon: <FaFileAlt /> },
    { label: "Document Generation", value: "DocGen", icon: <FaFileAlt /> },
    {
      label: "Document Validation",
      value: "Document Validation",
      icon: <FaUserTie />,
    },
    {
      label: "Clause Assessment",
      value: "Clause Assessment",
      icon: <FaUserTie />,
    },
    { label: "Bail Options", value: "BailOptions", icon: <FaMoneyBill /> },
    {
      label: "Application Assistance",
      value: "ApplicationAssistance",
      icon: <FaHandHoldingUsd />,
    },
    {
      label: "Notification Center",
      value: "NotificationCenter",
      icon: <FaBell />,
    },
    { label: "Documents", value: "Documents", icon: <FaFolder /> },
    { label: "Choose Lawyer", value: "ChooseLawyer", icon: <FaUserTie /> },
    { label: "Choose Ngo", value: "ChooseNgo", icon: <FaUserTie /> },
    {
      label: "PrisonerFaceRecognition",
      value: "PrisonerFaceRecognition",
      icon: <FaUserTie />,
    },
    { label: "BailBuddy", value: "BailBuddy", icon: <FaUserTie /> },
  ];

  return (
    <div
      style={{ backgroundColor: "#03346E" }}
      className="w-64 h-screen text-white lg:fixed lg:top-0 lg:left-0 lg:h-screen"
    >
      <div className="p-4 text-2xl font-bold text-left">
        Undertrial Dashboard
      </div>
      <ul className="mt-2 space-y-4">
        {items.map((item) => (
          <li
            key={item.value}
            className={`cursor-pointer px-4 m-3 py-[7px]  rounded-lg transition-colors duration-300 hover:bg-white hover:text-[#03346E] ${
              activeComponent === item.value
                ? "bg-white text-[#03346E] font-semibold"
                : ""
            }`}
            onClick={() => handleNavigation(item.value)}
          >
            <div className="flex items-center space-x-3">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
