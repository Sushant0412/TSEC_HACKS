import { useEffect, useState } from "react";
import axios from "axios";

const LegalNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Make the API request to fetch news articles
        const response = await axios.post(
          "http://localhost:3000/user/legalnews"
        );
        console.log(response.data.results[1].image_url);
        // Only take the first 4 articles from the response
        setNews(response.data.results.slice(0, 4));
      } catch (error) {
        console.error("Error fetching legal news:", error);
      }
    };

    fetchNews();
  }, []); // Empty dependency array means this will run once when the component mounts

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        Legal News
      </h1>
      {news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((article) => (
            <div
              key={article.article_id}
              className="bg-white rounded-lg shadow-lg border-2 border-pink-600 overflow-hidden"
            >
              <img
                src={
                  article.image_url ||
                  "https://marathi.cdn.zeenews.com/marathi/sites/default/files/2025/01/29/838946-100624-new-breaking-news-image.png"
                }
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {article.title}
                  </a>
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.content || "No description available"}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Published on:</strong>{" "}
                  {new Date(article.pubDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Source:</strong>{" "}
                  <a
                    href={article.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {article.source_name}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No news articles available.</p>
      )}
    </div>
  );
};

export default LegalNews;
