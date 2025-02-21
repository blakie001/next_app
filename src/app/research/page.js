"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const ResearchPage = () => {
  const [research, setResearch] = useState([]);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const response = await fetch("/api/research");
        const data = await response.json();
        setResearch(data);
      } catch (error) {
        console.error("Error fetching research citations:", error);
      }
    };

    fetchResearch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Research Citations</h1>

      <div className="max-w-5xl mx-auto">
        {research.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{item.title}</h2>
            <p className="text-gray-500 text-sm mb-1">
              <strong>Year:</strong> {item.year} | <strong>Type:</strong> {item.type}
            </p>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <a
              href={item.doi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 font-semibold hover:underline"
            >
              Read More
            </a>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-4 mt-8">
        <Link href="/services">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            View Services
          </button>
        </Link>
        <Link href="/products">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            View Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ResearchPage;
