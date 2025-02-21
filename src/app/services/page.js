"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const ServicesPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Our Services</h1>

      <div className="max-w-4xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{service.category}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Sub Services:</h3>
              <ul className="list-disc pl-5 space-y-2">
                {service.sub_services.map((sub, subIndex) => (
                  <li key={subIndex} className="text-gray-700">
                    <strong>{sub.name}</strong>: {sub.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-4 mt-8">
        <Link href="/products">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            View Products
          </button>
        </Link>
        <Link href="/research">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            View Research Citations
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServicesPage;
