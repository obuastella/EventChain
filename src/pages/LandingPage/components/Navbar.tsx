import { Link } from "react-router-dom";
import { UserButton } from "@civic/auth-web3/react";
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center w-full border-b border-b-gray-800 p-6">
      <Link to="/" className="font-semibold text-xl text-primary">
        MetaTicket®
      </Link>
      <UserButton
        className="login-button"
        dropdownButtonClassName="internal-button"
      />
    </nav>
  );
}
