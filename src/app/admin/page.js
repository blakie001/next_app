"use client";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Your Content</h2>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/services">
            <div className="p-6 bg-white shadow-md rounded-lg cursor-pointer hover:bg-blue-100 transition">
              <h3 className="text-lg font-semibold">Manage Services</h3>
              <p className="text-gray-600">Add, edit, and delete services.</p>
            </div>
          </Link>

          <Link href="/admin/products">
            <div className="p-6 bg-white shadow-md rounded-lg cursor-pointer hover:bg-blue-100 transition">
              <h3 className="text-lg font-semibold">Manage Products</h3>
              <p className="text-gray-600">Add, edit, and delete products.</p>
            </div>
          </Link>

          <Link href="/admin/research">
            <div className="p-6 bg-white shadow-md rounded-lg cursor-pointer hover:bg-blue-100 transition">
              <h3 className="text-lg font-semibold">Manage Research</h3>
              <p className="text-gray-600">Add, edit, and delete research citations.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
