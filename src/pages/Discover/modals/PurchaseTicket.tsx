import { X, Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PurchaseTicket({ onClose, selectedEvent }: any) {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    email: "",
    walletAddress: "",
  });
  const isFormValid =
    buyerInfo.name && buyerInfo.email && buyerInfo.walletAddress;

  const handlePurchase = () => {
    const ticketDetails = {
      eventId: selectedEvent.id,
      eventName: selectedEvent.name,
      date: selectedEvent.date,
      time: selectedEvent.time,
      location: selectedEvent.location,
      quantity: ticketQuantity,
      totalPrice: selectedEvent.price,
      totalPriceUSD: (
        parseFloat(selectedEvent.priceUSD.replace("$", "")) * ticketQuantity
      ).toFixed(2),
      buyer: buyerInfo,
      purchaseTime: new Date().toISOString(),
      ticketId: `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    console.log("Ticket Purchase Details:", ticketDetails);
    toast.success("Ticket purchased successfully!");
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-layout/30 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-layout rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-mint">Purchase Ticket</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white/80"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Event Details */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-lg mb-2">{selectedEvent.name}</h3>
            <div className="space-y-1 text-sm text-black/80">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {selectedEvent.date} at {selectedEvent.time}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {selectedEvent.location}
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Quantity
            </label>
            <select
              value={ticketQuantity}
              onChange={(e) => setTicketQuantity(parseInt(e.target.value))}
              className="w-full border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Buyer Information */}
          <div className="space-y-4 grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={buyerInfo.name}
                onChange={(e) =>
                  setBuyerInfo({ ...buyerInfo, name: e.target.value })
                }
                className="w-full border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={buyerInfo.email}
                onChange={(e) =>
                  setBuyerInfo({ ...buyerInfo, email: e.target.value })
                }
                className="w-full border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your email"
              />
            </div>
          </div>
          {/* wallet address */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-white/80 mb-1">
              Wallet Address *
            </label>
            <input
              type="text"
              value={buyerInfo.walletAddress}
              onChange={(e) =>
                setBuyerInfo({
                  ...buyerInfo,
                  walletAddress: e.target.value,
                })
              }
              className="w-full border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="0x..."
            />
          </div>

          {/* Price Summary */}
          <div className="bg-layout border-t border-gray-600 p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/80">Price per ticket:</span>
              <span className="font-semibold">
                {selectedEvent.price} ({selectedEvent.priceUSD})
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/80">Quantity:</span>
              <span className="font-semibold">{ticketQuantity}</span>
            </div>
            <div className="border-t border-gray-600 flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-blue-600">
                {selectedEvent.price} ($
                {(
                  parseFloat(selectedEvent.priceUSD.replace("$", "")) *
                  ticketQuantity
                ).toFixed(2)}
                )
              </span>
            </div>
          </div>

          {/* Purchase Button */}
          <button
            onClick={handlePurchase}
            disabled={!isFormValid}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Purchase Ticket{ticketQuantity > 1 ? "s" : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
