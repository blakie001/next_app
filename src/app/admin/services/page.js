"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ category: "", description: "", sub_services: [] });
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  // Fetch Services from API
  const fetchServices = async () => {
    try {
      const res = await axios.get("/api/services");
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Service
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await axios.put(`/api/services/${editingService._id}`, form);
      } else {
        await axios.post("/api/services", form);
      }
      fetchServices();
      setForm({ category: "", description: "", sub_services: [] });
      setEditingService(null);
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  // Delete Service
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`/api/services/${id}`);
        fetchServices();
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  // Edit Service
  const handleEdit = (service) => {
    setEditingService(service);
    setForm({
      category: service.category,
      description: service.description,
      sub_services: service.sub_services || [],
    });
  };

  // Add a new sub-service
  const addSubService = () => {
    setForm({
      ...form,
      sub_services: [
        ...form.sub_services,
        { name: "", description: "", technologies: [] },
      ],
    });
  };

  // Handle Sub-Service Change
  const handleSubServiceChange = (index, field, value) => {
    const updatedSubServices = [...form.sub_services];
    updatedSubServices[index][field] = value;
    setForm({ ...form, sub_services: updatedSubServices });
  };

  // Handle Technology Change
  const handleTechChange = (index, techIndex, value) => {
    const updatedSubServices = [...form.sub_services];
    updatedSubServices[index].technologies[techIndex] = value;
    setForm({ ...form, sub_services: updatedSubServices });
  };

  // Add Technology
  const addTechnology = (index) => {
    const updatedSubServices = [...form.sub_services];
    updatedSubServices[index].technologies.push("");
    setForm({ ...form, sub_services: updatedSubServices });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Services</h1>

      {/* Service Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg mb-6">
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Service Category"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Service Description"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          required
        ></textarea>

        {/* Sub-Services */}
        <h2 className="text-lg font-semibold mt-4">Sub-Services</h2>
        {form.sub_services.map((sub, index) => (
          <div key={index} className="border p-3 mb-2 rounded">
            <input
              type="text"
              placeholder="Sub-Service Name"
              value={sub.name}
              onChange={(e) => handleSubServiceChange(index, "name", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
            <textarea
              placeholder="Sub-Service Description"
              value={sub.description}
              onChange={(e) => handleSubServiceChange(index, "description", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
            
            {/* Technologies */}
            <h3 className="text-md font-semibold">Technologies</h3>
            {sub.technologies.map((tech, techIndex) => (
              <input
                key={techIndex}
                type="text"
                placeholder="Technology"
                value={tech}
                onChange={(e) => handleTechChange(index, techIndex, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
            ))}
            <button
              type="button"
              onClick={() => addTechnology(index)}
              className="bg-green-500 text-white px-2 py-1 rounded mt-2"
            >
              + Add Technology
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSubService}
          className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
        >
          + Add Sub-Service
        </button>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          {editingService ? "Update Service" : "Add Service"}
        </button>
      </form>

      {/* Services List */}
      <ul className="bg-white p-4 shadow-md rounded-lg">
        {services.length === 0 ? (
          <p className="text-gray-500">No services added yet.</p>
        ) : (
          services.map((service) => (
            <li key={service._id} className="border-b py-4">
              <h2 className="text-lg font-semibold">{service.category}</h2>
              <p className="text-gray-600">{service.description}</p>

              {/* Sub-Services */}
              {service.sub_services.length > 0 && (
                <ul className="mt-2">
                  {service.sub_services.map((sub, subIndex) => (
                    <li key={subIndex} className="border p-3 rounded mt-2">
                      <h3 className="font-medium">{sub.name}</h3>
                      <p className="text-gray-500">{sub.description}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {sub.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
