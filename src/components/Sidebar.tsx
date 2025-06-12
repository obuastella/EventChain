import { useUser } from "@civic/auth-web3/react";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Search,
  Ticket,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
  const navigate = useNavigate();
  const { signOut } = useUser();
  const handleLogout = async () => {
    try {
      toast.success("Logged out successfully!");
      navigate("/");
      signOut();
    } catch (error: any) {
      console.log("Error logging out: ", error?.message);
    }
  };
  return (
    <div
      className={`text-black h-full flex flex-col p-4 space-y-4 overflow-hidden transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } group hover:w-64`}
    >
      {/* Navigation Items */}
      <div className="text-black flex flex-col space-y-4">
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          label="Overview"
          to="/dashboard"
          isCollapsed={isCollapsed}
        />

        <SidebarItem
          icon={<Search size={20} />}
          label="Discover"
          to="/discover"
          isCollapsed={isCollapsed}
        />
        <SidebarItem
          icon={<Ticket size={20} />}
          label="My Tickets"
          to="/my-tickets"
          isCollapsed={isCollapsed}
        />

        <SidebarItem
          icon={<CalendarDays size={20} />}
          label="Manage Events"
          to="/manage"
          isCollapsed={isCollapsed}
        />

        {/* <SidebarItem
          icon={<Settings size={20} />}
          label="Settings"
          to="/settings"
          isCollapsed={isCollapsed}
        /> */}
      </div>

      {/* Logout Item at the bottom */}
      <button onClick={handleLogout} className="cursor-pointer mt-auto">
        <SidebarItem
          icon={<LogOut size={20} />}
          label="Logout"
          to="/"
          isCollapsed={isCollapsed}
        />
      </button>
    </div>
  );
}

export function SidebarItem({
  icon,
  label,
  to,
  isCollapsed,
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
  isCollapsed: boolean;
}) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center p-2 rounded transition-all hover:bg-primary/20 ${
        isActive ? "text-black font-semibold bg-white" : "text-black"
      } hover:text-secondary`}
    >
      <div className="w-6 flex justify-center">{icon}</div>
      <span
        className={`ml-4 text-sm font-medium transition-opacity duration-300 ${
          isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
        } group-hover:opacity-100 group-hover:w-auto group-hover:overflow-visible`}
      >
        {label}
      </span>
    </Link>
  );
}
