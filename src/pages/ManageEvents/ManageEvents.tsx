//@ts-nocheck
import { useState } from "react";
import {
  Plus,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Ticket,
  X,
  Upload,
  Edit,
  ExternalLink,
  TrendingUp,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { events } from "./eventsData";

const ManageEvents = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [buyerSearchTerm, setBuyerSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    venue: "",
    capacity: "",
    currency: "USD",
    price: "",
    priceUSD: "",
    priceSOL: "",
  });

  // Mock exchange rate
  const SOL_TO_USD = 142.5;

  // Mock events data
  const [events] = useState([
    {
      id: 1,
      title: "Crypto Music Festival 2025",
      date: "2025-08-15",
      venue: "Miami Beach",
      capacity: 5000,
      sold: 3250,
      priceUSD: "150.00",
      status: "active",
      image:
        "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop",
      buyers: [
        {
          id: 1,
          name: "Alex Johnson",
          wallet: "0x1234...5678",
          tickets: 2,
          date: "2025-06-10",
          amount: "$300.00",
        },
        {
          id: 2,
          name: "Sarah Chen",
          wallet: "0x8765...4321",
          tickets: 1,
          date: "2025-06-09",
          amount: "$150.00",
        },
        {
          id: 3,
          name: "Michael Rodriguez",
          wallet: "0x9876...1234",
          tickets: 3,
          date: "2025-06-08",
          amount: "$450.00",
        },
        {
          id: 4,
          name: "Emily Davis",
          wallet: "0x2468...9135",
          tickets: 1,
          date: "2025-06-07",
          amount: "$150.00",
        },
        {
          id: 5,
          name: "David Kim",
          wallet: "0x1357...2468",
          tickets: 2,
          date: "2025-06-06",
          amount: "$300.00",
        },
      ],
    },
    {
      id: 2,
      title: "NFT Art Gallery Opening",
      date: "2025-07-20",
      venue: "SoHo NYC",
      capacity: 200,
      sold: 180,
      priceUSD: "75.00",
      status: "active",
      image:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop",
      buyers: [
        {
          id: 3,
          name: "Emma Wilson",
          wallet: "0x5432...8765",
          tickets: 1,
          date: "2025-06-11",
          amount: "$75.00",
        },
        {
          id: 6,
          name: "James Thompson",
          wallet: "0x7890...3456",
          tickets: 2,
          date: "2025-06-10",
          amount: "$150.00",
        },
      ],
    },
  ]);

  const handleInputChange = (e: any) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowCreateModal(false);
    setFormData({
      title: "",
      date: "",
      venue: "",
      capacity: "",
      currency: "USD",
      price: "",
      priceUSD: "",
      priceSOL: "",
    });
  };

  const CreateEventModal = () => {
    return (
      showCreateModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <form className="text-2xl space-y-4 font-bold text-white">
                {/* Image Upload */}
                <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300">Drop your image here</p>
                </div>

                {/* Basic Info */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Event title"
                    required
                  />
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Venue"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Capacity"
                    required
                  />
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="SOL">SOL (◎)</option>
                  </select>
                </div>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={`Price in ${formData.currency}`}
                  required
                />

                {/* Price Conversion - Fixed height to prevent jumping */}
                <div className="min-h-[80px]">
                  {formData.priceUSD && formData.priceSOL && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10 rounded-xl"
                    >
                      <div className="flex justify-between">
                        <span className="text-white">
                          USD: ${formData.priceUSD}
                        </span>
                        <span className="text-white">
                          SOL: {formData.priceSOL} ◎
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Rate: 1 SOL = ${SOL_TO_USD}
                      </p>
                    </motion.div>
                  )}
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 border border-white/20 rounded-xl text-gray-300 hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      )
    );
  };
  // added

  const BuyersModal = () => {
    // Filter buyers based on search term
    const filteredBuyers =
      selectedEvent?.buyers.filter(
        (buyer) =>
          buyer.name.toLowerCase().includes(buyerSearchTerm.toLowerCase()) ||
          buyer.wallet.toLowerCase().includes(buyerSearchTerm.toLowerCase())
      ) || [];

    return (
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => {
              setSelectedEvent(null);
              setBuyerSearchTerm(""); // Reset search when closing
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-3xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedEvent.title}
                  </h2>
                  <p className="text-gray-400">Event Buyers</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedEvent(null);
                    setBuyerSearchTerm(""); // Reset search when closing
                  }}
                  className="p-2 hover:bg-white/10 rounded-xl"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Total Sales</p>
                      <p className="text-xl font-bold text-white">
                        {selectedEvent.sold}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Revenue</p>
                      <p className="text-xl font-bold text-white">
                        $
                        {(
                          selectedEvent.sold *
                          parseFloat(selectedEvent.priceUSD)
                        ).toFixed(2)}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Remaining</p>
                      <p className="text-xl font-bold text-white">
                        {selectedEvent.capacity - selectedEvent.sold}
                      </p>
                    </div>
                    <Ticket className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
              </div>

              {/* Search Bar for Buyers */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search buyers by name or wallet..."
                    value={buyerSearchTerm}
                    onChange={(e) => setBuyerSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                {buyerSearchTerm && (
                  <p className="text-sm text-gray-400 mt-2">
                    Showing {filteredBuyers.length} of{" "}
                    {selectedEvent.buyers.length} buyers
                  </p>
                )}
              </div>

              {/* Buyers Table */}
              <div className="bg-white/5 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-lg font-semibold text-white">
                    Buyers ({filteredBuyers.length})
                  </h3>
                </div>

                {filteredBuyers.length === 0 ? (
                  <div className="p-8 text-center">
                    <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">
                      {buyerSearchTerm
                        ? "No buyers found matching your search"
                        : "No buyers yet"}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="text-left p-4 text-gray-300">Buyer</th>
                          <th className="text-left p-4 text-gray-300">
                            Wallet
                          </th>
                          <th className="text-left p-4 text-gray-300">
                            Tickets
                          </th>
                          <th className="text-left p-4 text-gray-300">
                            Amount
                          </th>
                          <th className="text-left p-4 text-gray-300">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBuyers.map((buyer) => (
                          <tr
                            key={buyer.id}
                            className="border-b border-white/5 hover:bg-white/5"
                          >
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                  <span className="text-white font-semibold text-sm">
                                    {buyer.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </span>
                                </div>
                                <span className="text-white">{buyer.name}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-300 font-mono text-sm">
                                  {buyer.wallet}
                                </span>
                                <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                              </div>
                            </td>
                            <td className="p-4 text-white">{buyer.tickets}</td>
                            <td className="p-4 text-green-400">
                              {buyer.amount}
                            </td>
                            <td className="p-4 text-gray-300">{buyer.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
              <p className="text-gray-400">
                Create and manage your Web3 events
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Create Event</span>
          </button>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                    {event.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {event.title}
                </h3>
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{event.venue}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Sold</p>
                    <p className="text-lg font-semibold text-white">
                      {event.sold}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Capacity</p>
                    <p className="text-lg font-semibold text-white">
                      {event.capacity}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Price</p>
                    <p className="text-lg font-semibold text-white">
                      ${event.priceUSD}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Sales Progress</span>
                    <span>
                      {Math.round((event.sold / event.capacity) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (event.sold / event.capacity) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 py-2 px-4 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors flex items-center justify-center space-x-2">
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center space-x-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>Buyers</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <CreateEventModal />
        <BuyersModal />
      </div>
    </div>
  );
};

export default ManageEvents;
