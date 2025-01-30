import React, { useEffect, useState } from "react";

const ClientMeetings = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    // Hardcoded meetings data
    const hardcodedMeetings = [
      {
        id: 1,
        client: "John Doe",
        meetingDate: "2025-02-01T10:00:00",
        location: "123 Main St",
        purpose: "Discuss contract details",
        status: "Scheduled",
      },
      {
        id: 2,
        client: "Jane Smith",
        meetingDate: "2025-02-02T14:00:00",
        location: "456 Oak St",
        purpose: "Review legal documents",
        status: "Confirmed",
      },
      {
        id: 3,
        client: "Michael Johnson",
        meetingDate: "2025-02-03T09:30:00",
        location: "789 Pine St",
        purpose: "Consultation",
        status: "Cancelled",
      },
      {
        id: 4,
        client: "Parth Takale",
        meetingDate: "2025-02-03T09:30:00",
        location: "Thane",
        purpose: "Consultation",
        status: "Confirmed",
      },
    ];

    // Set the hardcoded meetings to state
    setMeetings(hardcodedMeetings);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  // Local status update without server request
  const updateStatus = (id, newStatus) => {
    setMeetings(
      meetings.map((meeting) =>
        meeting.id === id ? { ...meeting, status: newStatus } : meeting
      )
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-left text-gray-800">
        Client Meetings
      </h1>
      <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {meetings.map((meeting) => (
            <div
              key={meeting.id} // Ensure this is a unique identifier
              className="bg-white border border-gray-300 shadow-md rounded-lg p-6 flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl hover:border-blue-400"
            >
              <div className="font-semibold text-2xl mb-2 text-gray-900 text-left">
                {meeting.client}
              </div>
              <div className="text-gray-700 mb-2 text-left">
                <span className="font-medium text-gray-800">Date: </span>
                {formatDate(meeting.meetingDate)}
              </div>
              <div className="text-gray-700 mb-2 text-left">
                <span className="font-medium text-gray-800">Location:</span>{" "}
                {meeting.location}
              </div>
              <div className="text-gray-700 mb-2 text-left">
                <span className="font-medium text-gray-800">Purpose:</span>{" "}
                {meeting.purpose}
              </div>
              <div
                className={`text-gray-700 mb-4 text-xl font-medium text-left ${
                  meeting.status === "Scheduled"
                    ? "text-blue-500"
                    : meeting.status === "Confirmed"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                <span className="font-semibold">Status:</span> {meeting.status}
              </div>
              <div className="flex space-x-3 mt-auto">
                {/* Buttons to update status locally */}
                {meeting.status !== "Confirmed" && (
                  <button
                    className="bg-primary text-white px-5 py-2 rounded-lg transition-colors duration-200"
                    onClick={() => updateStatus(meeting.id, "Confirmed")}
                  >
                    Confirm
                  </button>
                )}
                {meeting.status !== "Cancelled" && (
                  <button
                    className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                    onClick={() => updateStatus(meeting.id, "Cancelled")}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientMeetings;
