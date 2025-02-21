"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Services</h1>
      <ul>
        {services.map((service) => (
          <li key={service._id}>{service.name}</li>
        ))}
      </ul>
    </div>
  );
}
