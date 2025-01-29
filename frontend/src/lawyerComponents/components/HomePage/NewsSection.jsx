import React from "react";

// Example news items related to bail cases with images
const newsItems = [
  {
    id: 1,
    title: "Breaking News: New Bail Reform Law",
    description:
      "A new law has been passed to reform the bail system. This change aims to provide a more equitable process for individuals awaiting trial.",
    date: "2024-08-30",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    id: 2,
    title: "Update on Recent Bail Legislation",
    description:
      "Recent legislative changes have been introduced to address concerns about bail practices. These updates are designed to improve fairness in the justice system.",
    date: "2024-08-28",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG37JYLBXZB3qIXQay-Ac7HxFmlUt95whzEA&s",
  },
  {
    id: 3,
    title: "Court Ruling on Bail Issues",
    description:
      "A recent court ruling has set new precedents for bail decisions. This ruling is expected to impact how bail is determined in future cases.",
    date: "2024-08-25",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq3pOaGJYDgdU2BWdGsoe1iYpMf1ZTh2W7Qw&s",
  },
  {
    id: 4,
    title: "New Insights on Bail Reform",
    description:
      "Recent studies provide new insights into the impact of bail reform on the justice system. These findings could influence future legislation.",
    date: "2024-08-20",
    image:
      "data:image/jpeg;base64,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",
  },
];

function NewsSection() {
  return (
    <section className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Latest Bail News
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4  space-x-4">
        {newsItems.map((item) => (
          <div
            className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
            key={item.id}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-30 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-red-900">
                {item.title}
              </h3>
              <p className="text-gray-700 mt-3">{item.description}</p>
              <span className="block text-sm text-gray-500 mt-4">
                {item.date}
              </span>
              <div className="mt-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                  onClick={() => alert(`More about: ${item.title}`)}
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewsSection;
