export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-4">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <nav className="mt-4 space-y-2">
                    <a href="/admin/services" className="block p-2 bg-gray-800 rounded">Services</a>
                    <a href="/admin/products" className="block p-2 bg-gray-800 rounded">Products</a>
                    <a href="/admin/research" className="block p-2 bg-gray-800 rounded">Research</a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>
    );
}
