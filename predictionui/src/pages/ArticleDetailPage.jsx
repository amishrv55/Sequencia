import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import api from "../api/axiosInstance";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/articles/${id}`);
        setArticle(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch article:", err);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link to="/articles" className="text-blue-600 underline mb-4 inline-block">← Back to Articles</Link>
        
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">{article.title}</h1>
        <p className="text-lg text-gray-600 italic mb-6">{article.summary}</p>

        {/* 🖼️ Render Images */}
        {article.image_url && article.image_url.split(",").map((url, idx) => (
          <img
            key={idx}
            src={url.trim()}
            alt={`article-img-${idx}`}
            className="rounded-lg shadow-md mb-6 w-full"
          />
        ))}

        {/* 📄 Article Content */}
        <div className="prose prose-indigo max-w-none">
          {article.content.split("\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
