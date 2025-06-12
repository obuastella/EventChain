import { LayoutDashboard, CalendarDays, Search, Ticket } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", icon: <LayoutDashboard />, label: "Overview" },
    { to: "/discover", icon: <Search />, label: "Discover" },
    { to: "/my-tickets", icon: <Ticket />, label: "My Tickets" },
    { to: "/manage", icon: <CalendarDays />, label: "Manage" },
  ];

  return (
    <div className="bg-[#25253a] shadow flex justify-around py-2">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`flex flex-col items-center text-sm ${
            location.pathname === item.to ? "text-secondary" : "text-gray-600"
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
