"use client";
import { useEffect, useState } from "react";

export default function AdminResearchPage() {
  const [researchItems, setResearchItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    year: "",
    type: "",
    description: "",
    doi: "",
  });
  const [editingId, setEditingId] = useState(null); // Track editing research ID

  // Fetch research data
  useEffect(() => {
    async function fetchResearch() {
      try {
        const res = await fetch("/api/research");
        const data = await res.json();
        setResearchItems(data);
      } catch (error) {
        console.error("Error fetching research:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchResearch();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit (Add or Update research)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.year || !form.type || !form.description || !form.doi) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await fetch(
        editingId ? `/api/research/${editingId}` : "/api/research",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Failed to save research");

      const newResearch = await res.json();
      setResearchItems((prev) =>
        editingId
          ? prev.map((r) => (r._id === editingId ? newResearch : r))
          : [...prev, newResearch.newResearch]
      );

      setForm({ title: "", year: "", type: "", description: "", doi: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving research:", error);
    }
  };

  // Handle edit
  const handleEdit = (research) => {
    setForm({
      title: research.title,
      year: research.year,
      type: research.type,
      description: research.description,
      doi: research.doi,
    });
    setEditingId(research._id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this research?")) return;
    try {
      const res = await fetch(`/api/research/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete research");

      setResearchItems((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Error deleting research:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Research</h1>

      {/* Research Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-md mb-6">
        <input
          type="text"
          name="title"
          placeholder="Research Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="number"
          name="year"
          placeholder="Publication Year"
          value={form.year}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="text"
          name="type"
          placeholder="Research Type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <textarea
          name="description"
          placeholder="Research Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="text"
          name="doi"
          placeholder="DOI (Digital Object Identifier)"
          value={form.doi}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Research" : "Add Research"}
        </button>
      </form>

      {/* Research List */}
      {loading ? (
        <p className="text-center">Loading research data...</p>
      ) : researchItems.length === 0 ? (
        <p className="text-center">No research available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {researchItems.map((research) => (
            <div key={research._id} className="bg-white p-4 shadow-md rounded-md relative">
              <h2 className="text-xl font-semibold">{research.title}</h2>
              <p className="text-gray-600 mt-2">Year: {research.year}</p>
              <p className="text-gray-600 mt-2">Type: {research.type}</p>
              <p className="text-gray-600 mt-2">{research.description}</p>
              <a
                href={research.doi}
                target="_blank"
                className="block mt-4 text-blue-600 underline"
              >
                View Research (DOI)
              </a>
              <div className="flex gap-3 mt-4">
                <button onClick={() => handleEdit(research)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(research._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
