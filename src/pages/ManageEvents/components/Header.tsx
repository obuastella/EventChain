import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useState } from "react";
import CreateEventModal from "./CreateEventModal";

export default function ManageEventsHeader() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-8"
    >
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Events</h1>
          <p className="text-gray-400">Create and manage your Web3 events</p>
        </div>
      </div>
      {/* <button
        onClick={() => setShowCreateModal(true)}
        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
      >
        <Plus className="w-5 h-5" />
        <span>Create Event</span>
      </button> */}
      {showCreateModal && <CreateEventModal onClose={handleCloseModal} />}
    </motion.div>
  );
}
