//ts-nocheck
import { useState } from "react";
import { Search, Plus, Loader2 } from "lucide-react";
import { useEvents } from "../../hooks/useEvents";

// Components
import EventCard from "./components/EventCard";
import NoResults from "./components/NoResults";
import ManageEventsHeader from "./components/Header";
import BuyersModal from "./components/BuyersModal";
import CreateEventModal from "./components/CreateEventModal";

const ManageEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Use the custom hook
  const { events, loading, error } = useEvents();

  // Filter events based on search term
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleCreateEvent = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  // Handle event creation from the modal
  // const handleEventCreated = async (eventData) => {
  //   try {
  //     await createEvent(eventData);
  //     setShowCreateModal(false);
  //     // No need to manually update state - the real-time listener will handle it
  //   } catch (error) {
  //     console.error("Failed to create event:", error);
  //     // You might want to show a toast notification here
  //     alert("Failed to create event. Please try again.");
  //   }
  // };

  // Handle event update
  // const handleEventUpdate = async (eventId, updateData) => {
  //   try {
  //     await updateEvent(eventId, updateData);
  //     // Real-time listener will update the UI automatically
  //   } catch (error) {
  //     console.error("Failed to update event:", error);
  //     alert("Failed to update event. Please try again.");
  //   }
  // };

  // Handle event deletion
  // const handleEventDelete = async (eventId) => {
  //   if (window.confirm("Are you sure you want to delete this event?")) {
  //     try {
  //       await deleteEvent(eventId);
  //       // Real-time listener will update the UI automatically
  //     } catch (error) {
  //       console.error("Failed to delete event:", error);
  //       alert("Failed to delete event. Please try again.");
  //     }
  //   }
  // };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <ManageEventsHeader />
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
              <p className="text-white text-lg">Loading your events...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <ManageEventsHeader />
          <div className="flex items-center justify-center py-32">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 text-center max-w-md">
              <p className="text-red-400 text-lg mb-4">⚠️ {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <ManageEventsHeader />

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Total Events</p>
            <p className="text-2xl font-bold text-white">{events.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Free Events</p>
            <p className="text-2xl font-bold text-blue-400">
              {events.filter((e) => e.ticketType === "free").length}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Paid Events</p>
            <p className="text-2xl font-bold text-purple-400">
              {events.filter((e) => e.ticketType === "paid").length}
            </p>
          </div>
        </div>

        {/* Search and Create Button */}
        <div className="flex flex-wrap flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="relative w-full md:w-lg ">
            <Search className="absolute z-40 left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events, venues, or creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Create Event Button */}
          <button
            onClick={handleCreateEvent}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Create Event</span>
          </button>
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div className="mb-6">
            <p className="text-gray-400 text-sm">
              {filteredEvents.length === 0
                ? `No events found for "${searchTerm}"`
                : `Found ${filteredEvents.length} event${
                    filteredEvents.length !== 1 ? "s" : ""
                  } for "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Events Grid or No Results */}
        {filteredEvents.length === 0 ? (
          <NoResults
            searchTerm={searchTerm}
            // onCreateEvent={handleCreateEvent}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                onViewBuyers={handleEventSelect}
                onEdit={(event) => console.log("Edit event:", event.id)}
                // onDelete={() => handleEventDelete(event.id)}
              />
            ))}
          </div>
        )}

        {/* Buyers Modal */}
        <BuyersModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={handleCloseModal}
        />

        {/* Create Event Modal */}
        {showCreateModal && (
          <CreateEventModal
            onClose={handleCloseCreateModal}
            // onEventCreated={handleEventCreated}
          />
        )}
      </div>
    </div>
  );
};

export default ManageEvents;
