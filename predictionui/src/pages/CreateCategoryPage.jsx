// src/pages/CreateCategoryPage.jsx
import React, { useState } from "react";
import api from "../api/axiosInstance";
import Header from "../components/Header";

const CreateCategoryPage = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/categories/", form);
      alert("✅ Category created!");
      setForm({ name: "", description: "" });
    } catch (err) {
      console.error("❌ Error creating category:", err);
      alert("Failed to create category");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-semibold mb-4">Create New Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Category name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Category description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
            rows={3}
            required
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryPage;
