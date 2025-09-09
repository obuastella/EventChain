//@ts-nocheck
import { Calendar, Edit, MapPin, Users } from "lucide-react";
import { useTickets } from "../../../hooks/useTickets";

const EventCard = ({ event, index, onViewBuyers }: any) => {
  const eventId = event?.id;
  const ticketsData = useTickets(eventId);

  const isFreeEvent =
    event.ticketType === "free" || parseFloat(event.priceUSD) === 0;

  const formatPrice = () => {
    if (isFreeEvent) return "Free";
    return `$${event.priceUSD}`;
  };

  return (
    <div className=" bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
            {event.status}
          </span>
          {isFreeEvent && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Free
            </span>
          )}
        </div>
      </div>

      <div className="p-6 mb-14">
        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
        <div className="flex items-center space-x-2 text-gray-400 mb-1">
          <span>
            <Calendar size={18} />
          </span>
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-400 mb-4">
          <span>
            <MapPin size={18} />
          </span>
          <span>{event.venue}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              {isFreeEvent ? "Registered" : "Sold"}
            </p>
            <p className="text-lg font-semibold text-white">
              {ticketsData.tickets.length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Capacity</p>
            <p className="text-lg font-semibold text-white">{event.capacity}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Price</p>
            <p
              className={`text-lg font-semibold ${
                isFreeEvent ? "text-blue-400" : "text-white"
              }`}
            >
              {formatPrice()}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>
              {isFreeEvent ? "Registration Progress" : "Sales Progress"}
            </span>
            <span>
              {Math.round((ticketsData.tickets.length / event.capacity) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                isFreeEvent
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                  : "bg-gradient-to-r from-purple-500 to-pink-500"
              }`}
              style={{
                width: `${Math.min((event.sold / event.capacity) * 100, 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-14 flex space-x-2">
          <button className="flex-1 py-2 px-4 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors flex items-center justify-center space-x-2">
            <span>
              <Edit size={18} />
            </span>
            <span>Edit</span>
          </button>
          <button
            onClick={() => onViewBuyers(event)}
            className={`flex-1 py-2 px-4 rounded-xl text-white transition-all flex items-center justify-center space-x-2 ${
              isFreeEvent
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            }`}
          >
            <span>
              <Users size={18} />
            </span>
            <span>{isFreeEvent ? "Attendees" : "Buyers"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default EventCard;
