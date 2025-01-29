import React, { useState } from "react";
import {
  FaInfoCircle,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      text: "New case assigned: Smith vs. Jones.",
      icon: <FaInfoCircle className="text-blue-500" />,
      details:
        "Case details: Smith vs. Jones. Assigned to attorney John Doe. Deadline for initial review: 2024-08-30.",
    },
    {
      id: 2,
      text: "Client meeting scheduled for 2 PM tomorrow.",
      icon: <FaCalendarAlt className="text-green-500" />,
      details:
        "Client meeting with Sarah Johnson at 2 PM tomorrow in Conference Room A.",
    },
    {
      id: 3,
      text: "Document submission deadline approaching: Johnson case.",
      icon: <FaExclamationTriangle className="text-red-500" />,
      details:
        "Document submission for the Johnson case is due by the end of the day. Ensure all documents are submitted before 5 PM.",
    },
    {
      id: 4,
      text: "Court hearing scheduled: Brown vs. Green, 10 AM on Monday.",
      icon: <FaCalendarAlt className="text-yellow-500" />,
      details:
        "Court hearing for Brown vs. Green scheduled for 10 AM on Monday in Courtroom 3B.",
    },
    {
      id: 5,
      text: "Your profile has been updated successfully.",
      icon: <FaInfoCircle className="text-gray-500" />,
      details:
        "Your profile details have been successfully updated. No further action required.",
    },
  ];

  const [expandedNotification, setExpandedNotification] = useState(null);

  const handleViewDetails = (id) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Notifications</h2>
      <div className="p-4">
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="shadow-md rounded-lg p-4 flex flex-col transition-transform transform hover:scale-105 hover:shadow-lg border border-gray-200 bg-white"
            >
              <div className="flex items-start mb-4">
                <span className="mr-4 text-2xl">{notification.icon}</span>
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold">
                    {notification.text}
                  </p>
                </div>
                <button
                  onClick={() => handleViewDetails(notification.id)}
                  className="bg-primary text-white px-4 py-2 rounded-lg flex items-center mt-2"
                >
                  {expandedNotification === notification.id ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}{" "}
                  View Details
                </button>
              </div>
              {expandedNotification === notification.id && (
                <div className="mt-2 text-gray-700 border-t border-gray-200 pt-2">
                  <p className="text-sm">{notification.details}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationsPage;
