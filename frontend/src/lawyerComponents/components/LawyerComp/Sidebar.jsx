import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{ backgroundColor: "#03346E" }}
      className="w-64 h-screen text-white lg:fixed lg:top-0 lg:left-0 lg:h-screen z-50"
    >
      <div className="p-2 text-2xl font-bold ml-3 ">Lawyer Dashboard</div>
      <ul className="mt-6 space-y-4">
        <li>
          <NavLink
            to="notifications"
            className={({ isActive }) =>
              `flex justify-center text-lg px-4 py-2 rounded-lg transition-colors duration-300 ${
                isActive
                  ? "bg-white text-[#03346E] font-semibold"
                  : "hover:bg-white hover:text-[#03346E]"
              }`
            }
          >
            Notifications
          </NavLink>
        </li>
        <li>
          <NavLink
            to="clients"
            className={({ isActive }) =>
              `flex justify-center text-lg px-4 py-2 rounded-lg transition-colors duration-300 ${
                isActive
                  ? "bg-white text-[#03346E] font-semibold"
                  : "hover:bg-white hover:text-[#03346E]"
              }`
            }
          >
            Clients
          </NavLink>
        </li>
        <li>
          <NavLink
            to="client-documents"
            className={({ isActive }) =>
              `flex justify-center text-lg px-4 py-2 rounded-lg transition-colors duration-300 ${
                isActive
                  ? "bg-white text-[#03346E] font-semibold"
                  : "hover:bg-white hover:text-[#03346E]"
              }`
            }
          >
            Client Documents
          </NavLink>
        </li>
        <li>
          <NavLink
            to="client-meetings"
            className={({ isActive }) =>
              `flex justify-center px-4 text-lg py-2 rounded-lg transition-colors duration-300 ${
                isActive
                  ? "bg-white text-[#03346E] font-semibold"
                  : "hover:bg-white hover:text-[#03346E]"
              }`
            }
          >
            Client Meetings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="document-upload"
            className={({ isActive }) =>
              `flex justify-center px-4 text-lg py-2 rounded-lg transition-colors duration-300 ${
                isActive
                  ? "bg-white text-[#03346E] font-semibold"
                  : "hover:bg-white hover:text-[#03346E]"
              }`
            }
          >
            Document Upload
          </NavLink>
        </li>
        <li>
          <NavLink
            to="court-appearances"
            className={({ isActive }) =>
              `flex justify-center px-4 text-lg py-2 rounded-lg transition-colors duration-300 ${
                isActive
                  ? "bg-white text-[#03346E] font-semibold"
                  : "hover:bg-white hover:text-[#03346E]"
              }`
            }
          >
            Court Appearances
          </NavLink>
        </li>
        <li>
          <NavLink
            to="precedents-used"
            className={({ isActive }) =>
              `flex justify-center text-lg px-4 py-2 rounded-lg transition-colors duration-300 ${
                isActive
                  ? "bg-white text-[#03346E] font-semibold"
                  : "hover:bg-white hover:text-[#03346E]"
              }`
            }
          >
            Precedents Used
          </NavLink>
        </li>
        <li>
          <NavLink
            to="cases"
            className={({ isActive }) =>
              `flex justify-center text-lg px-4 py-2 rounded-lg transition-colors duration-300 ${
                isActive
                  ? "bg-white text-[#03346E] font-semibold"
                  : "hover:bg-white hover:text-[#03346E]"
              }`
            }
          >
            Cases
          </NavLink>
        </li>
        <li
          className={`flex justify-center text-lg px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-white hover:text-[#03346E] font-semibold`}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
