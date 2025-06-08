import { useState } from "react";
import { Search, Calendar, MapPin, Users } from "lucide-react";
import { eventsData } from "./eventsData";
import PurchaseTicket from "./modals/PurchaseTicket";

export default function Discover() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (term: any) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredEvents(eventsData);
    } else {
      const filtered = eventsData.filter(
        (event: any) =>
          event.name.toLowerCase().includes(term.toLowerCase()) ||
          event.location.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  const openModal = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Search */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Discover Web3 Events</h1>
            <p className="text-xl mb-8">
              Find and purchase tickets using cryptocurrency
            </p>

            {/* Search Bar */}
            <div className="border rounded-lg border-foreground max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events by name or location..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {searchTerm
              ? `Search Results (${filteredEvents.length})`
              : "Featured Events"}
          </h2>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No events found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event: any) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {event.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {event.date} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {event.attendees}/{event.maxAttendees} attending
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {event.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          {event.priceUSD}
                        </div>
                      </div>
                      <button
                        onClick={() => openModal(event)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                      >
                        Get Ticket
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Purchase Modal */}
        {isModalOpen && selectedEvent && (
          <PurchaseTicket onClose={closeModal} selectedEvent={selectedEvent} />
        )}
      </div>
    </>
  );
}
