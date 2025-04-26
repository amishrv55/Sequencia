import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import Header from "../components/Header"; // adjust the path if needed


const CategoryPage = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories/");
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">Explore Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.length === 0 ? (
            <p className="text-gray-500">No categories available.</p>
          ) : (
            categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition"
              >
                <h2 className="text-xl font-semibold text-indigo-600">{cat.name}</h2>
                <p className="text-gray-600 text-sm mt-2">{cat.description}</p>
                <a
                  href={`/categories/${cat.name.toLowerCase()}`}
                  className="mt-4 inline-block bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded"
                >
                  View Questions
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    </div>
  );
};
export default CategoryPage;
