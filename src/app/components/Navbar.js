import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-center gap-6">
            <Link href="/services" className="hover:underline">Services</Link>
            <Link href="/research" className="hover:underline">Research</Link>
            <Link href="/products" className="hover:underline">Products</Link>
        </nav>
    );
}
