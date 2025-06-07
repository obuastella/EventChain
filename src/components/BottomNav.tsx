import { LayoutDashboard, CalendarDays, Search, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", icon: <LayoutDashboard />, label: "Overview" },
    { to: "/discover", icon: <Search />, label: "Discover" },
    { to: "/manage", icon: <CalendarDays />, label: "Manage" },
    { to: "/settings", icon: <Settings />, label: "Profile" },
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
