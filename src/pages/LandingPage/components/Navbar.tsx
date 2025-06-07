import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center w-full border-b border-b-gray-800 p-6">
      <Link to="/" className="font-semibold text-xl text-primary">
        MetaTicket®
      </Link>
      <button className="cursor-pointer text-secondary border border-mint p-2 rounded-full text-sm px-3 hover:text-mint">
        Get Started
      </button>
    </nav>
  );
}
