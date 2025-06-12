import { useState } from "react";
import { motion } from "framer-motion";
import {
  MoreVertical,
  ExternalLink,
  Calendar,
  Hash,
  DollarSign,
  Ticket,
  Search,
} from "lucide-react";
import { tickets } from "./ticketsData";
import Header from "./components/Header";
import { toast } from "react-toastify";

const MyTickets = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const ActionMenu = ({ ticket }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
        >
          <MoreVertical className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-full mt-2 w-48 bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl z-50"
          >
            <div className="p-2">
              <button
                onClick={() => handleExplorer(ticket)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left group"
              >
                <ExternalLink className="w-4 h-4 text-green-400 group-hover:text-green-300" />
                <span className="text-gray-300 group-hover:text-white">
                  View on Explorer
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  };
  const handleExplorer = (ticket: any) => {
    console.log(ticket);
    toast.warning(
      "🥺 We are so sorry we are currently working on this feature!"
    );
  };
  const StatusBadge = ({ status }: any) => {
    const statusConfig: any = {
      confirmed: {
        bg: "bg-green-500/20",
        text: "text-green-400",
        border: "border-green-500/30",
      },
      pending: {
        bg: "bg-yellow-500/20",
        text: "text-yellow-400",
        border: "border-yellow-500/30",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredTickets = tickets.filter(
    (ticket: any) =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets or venues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Tickets Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
        >
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left p-6 text-gray-300 font-medium">
                    Event
                  </th>
                  <th className="text-left p-6 text-gray-300 font-medium">
                    Quantity
                  </th>
                  <th className="text-left p-6 text-gray-300 font-medium">
                    Date
                  </th>
                  <th className="text-left p-6 text-gray-300 font-medium">
                    Price
                  </th>
                  <th className="text-left p-6 text-gray-300 font-medium">
                    Status
                  </th>
                  <th className="text-left p-6 text-gray-300 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket: any, index: any) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500">
                          <img
                            src={ticket.image}
                            alt={ticket.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">
                            {ticket.title}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {ticket.venue}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center space-x-2">
                        <Hash className="w-4 h-4 text-gray-400" />
                        <span className="text-white font-medium">
                          {ticket.quantity}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-white">
                          {new Date(ticket.date).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-white font-medium">
                          {ticket.price}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {ticket.currency}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <StatusBadge status={ticket.status} />
                    </td>
                    <td className="p-6">
                      <ActionMenu ticket={ticket} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="mb-16 md:mb-0 md:hidden space-y-4 p-4">
            {filteredTickets.map((ticket: any, index: any) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500">
                      <img
                        src={ticket.image}
                        alt={ticket.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">
                        {ticket.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{ticket.venue}</p>
                    </div>
                  </div>
                  <ActionMenu ticket={ticket} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-xs">Quantity</p>
                    <p className="text-white font-medium">{ticket.quantity}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Date</p>
                    <p className="text-white font-medium">
                      {new Date(ticket.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Price</p>
                    <p className="text-white font-medium">
                      {ticket.price} {ticket.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Status</p>
                    <StatusBadge status={ticket.status} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Empty State */}
        {filteredTickets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Ticket className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No tickets found
            </h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
