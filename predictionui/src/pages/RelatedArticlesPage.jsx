import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axiosInstance";
import Header from "../components/Header";

const RelatedArticlesPage = () => {
  const { questionId } = useParams();
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await api.get(`/articles/related/${questionId}`);
        setArticles(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch related articles", err);
      }
    };

    fetchRelated();
  }, [questionId]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">📚 Must Read Articles</h1>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search related articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {articles.length === 0 ? (
          <p className="text-gray-600">No related articles found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles
              .filter(
                (article) =>
                  article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (article.summary && 
                   article.summary.toLowerCase().includes(searchTerm.toLowerCase()))
              )
              .map((article) => (
                <div
                  key={article.id}
                  className="bg-white shadow rounded-lg p-4 border hover:shadow-lg transition"
                >
                  {article.image_url && (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded mb-3"
                    />
                  )}
                  <h2 className="text-lg font-bold">{article.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">{article.summary}</p>
                  <Link
                    to={`/articles/${article.id}`}
                    className="text-indigo-600 hover:underline font-semibold"
                  >
                    Read More →
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedArticlesPage;