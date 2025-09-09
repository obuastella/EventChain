import { useState } from "react";

// BuyersModal Component
const BuyersModal = ({ event, isOpen, onClose }) => {
  const [buyerSearchTerm, setBuyerSearchTerm] = useState("");

  if (!event || !isOpen) return null;

  const isFreeEvent =
    event.ticketType === "free" || parseFloat(event.priceUSD) === 0;

  const filteredBuyers = event.buyers.filter(
    (buyer) =>
      buyer.name.toLowerCase().includes(buyerSearchTerm.toLowerCase()) ||
      buyer.wallet.toLowerCase().includes(buyerSearchTerm.toLowerCase())
  );

  const handleClose = () => {
    setBuyerSearchTerm("");
    onClose();
  };

  const calculateRevenue = () => {
    if (isFreeEvent) return "Free Event";
    return (event.sold * parseFloat(event.priceUSD)).toFixed(2);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <div
        className="bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-3xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{event.title}</h2>
            <p className="text-gray-400">
              {isFreeEvent ? "Event Attendees" : "Event Buyers"}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <span className="text-2xl text-gray-400">×</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div
            className={`rounded-xl p-4 ${
              isFreeEvent
                ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
                : "bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">
                  {isFreeEvent ? "Total Registered" : "Total Sales"}
                </p>
                <p className="text-xl font-bold text-white">{event.sold}</p>
              </div>
              <span className="text-2xl">📈</span>
            </div>
          </div>

          <div
            className={`rounded-xl p-4 ${
              isFreeEvent
                ? "bg-gradient-to-r from-cyan-500/20 to-teal-500/20"
                : "bg-gradient-to-r from-green-500/20 to-emerald-500/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">
                  {isFreeEvent ? "Event Type" : "Revenue"}
                </p>
                <p className="text-xl font-bold text-white">
                  {isFreeEvent ? "Free" : `$${calculateRevenue()}`}
                </p>
              </div>
              <span className="text-2xl">💰</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Remaining</p>
                <p className="text-xl font-bold text-white">
                  {event.capacity - event.sold}
                </p>
              </div>
              <span className="text-2xl">🎫</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder={`Search ${
                isFreeEvent ? "attendees" : "buyers"
              } by name or wallet...`}
              value={buyerSearchTerm}
              onChange={(e) => setBuyerSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          {buyerSearchTerm && (
            <p className="text-sm text-gray-400 mt-2">
              Showing {filteredBuyers.length} of {event.buyers.length}{" "}
              {isFreeEvent ? "attendees" : "buyers"}
            </p>
          )}
        </div>

        {/* Buyers Table */}
        <div className="bg-white/5 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">
              {isFreeEvent ? "Attendees" : "Buyers"} ({filteredBuyers.length})
            </h3>
          </div>

          {filteredBuyers.length === 0 ? (
            <div className="p-8 text-center">
              <span className="text-4xl mb-4 block">👥</span>
              <p className="text-gray-400">
                {buyerSearchTerm
                  ? `No ${
                      isFreeEvent ? "attendees" : "buyers"
                    } found matching your search`
                  : `No ${isFreeEvent ? "attendees" : "buyers"} yet`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-4 text-gray-300">
                      {isFreeEvent ? "Attendee" : "Buyer"}
                    </th>
                    <th className="text-left p-4 text-gray-300">Wallet</th>
                    <th className="text-left p-4 text-gray-300">
                      {isFreeEvent ? "Spots" : "Tickets"}
                    </th>
                    <th className="text-left p-4 text-gray-300">Amount</th>
                    <th className="text-left p-4 text-gray-300">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBuyers.map((buyer) => (
                    <tr
                      key={buyer.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isFreeEvent
                                ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                                : "bg-gradient-to-r from-purple-500 to-pink-500"
                            }`}
                          >
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
                          <span className="text-gray-400 hover:text-white cursor-pointer">
                            🔗
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-white">{buyer.tickets}</td>
                      <td
                        className={`p-4 ${
                          isFreeEvent ? "text-blue-400" : "text-green-400"
                        }`}
                      >
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
      </div>
    </div>
  );
};

export default BuyersModal;
