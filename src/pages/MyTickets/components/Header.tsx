import { motion } from "framer-motion";
import { Ticket } from "lucide-react";

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
          <Ticket className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">My Tickets</h1>
          <p className="text-gray-400">Manage your Web3 event tickets</p>
        </div>
      </div>
    </motion.div>
  );
}
