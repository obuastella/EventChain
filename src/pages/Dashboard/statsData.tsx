import { Ticket, Users } from "lucide-react";

export const stats = [
  {
    label: "Tickets bought",
    value: "2",
    icon: <Ticket className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/20",
  },

  {
    label: "Events Hosted",
    value: "1",
    icon: <Users className="w-5 h-5" />,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/20",
  },
];
