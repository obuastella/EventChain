//@ts-nocheck
import { useState, useRef, useEffect } from "react";
import {
  Search,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  Zap,
  ArrowRight,
  Filter,
  Globe,
} from "lucide-react";
import { useEvents } from "../../hooks/useEvents";
import ErrorEvents from "./components/ErrorEvents";
import Loader from "../../shared/Loader";
import PurchaseTicket from "./modals/PurchaseTicket";

// Define the event type based on your Firestore structure
interface Event {
  id: string;
  title: string;
  venue: string;
  date: string;
  capacity: number;
  ticketType: "free" | "paid";
  priceUSD?: string;
  image: string;
  creator: string;
  userId: string;
  email: string;
  buyers: string[];
  sold: number;
  status: string;
  createdAt: Date;
}

export default function Discover() {
  const { events, loading, error } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory] = useState("All");
  const [setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Update filtered events when events data changes
  useEffect(() => {
    if (events) {
      setFilteredEvents(events);
    }
  }, [events]);

  // Track mouse for gradient effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterEvents(term, selectedCategory);
  };

  const filterEvents = (searchTerm: string, category: string) => {
    if (!events) return;

    let filtered = events;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.creator.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // For now, we don't have categories in Firestore, so we'll skip category filtering
    // You can add a category field to your events later
    if (category !== "All") {
      // filtered = filtered.filter((event) => event.category === category);
    }

    setFilteredEvents(filtered);
  };

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Show loading state
  if (loading) {
    return <Loader />;
  }

  // Show error state
  if (error) {
    return <ErrorEvents />;
  }

  return (
    <>
      {/* <div className="min-h-screen bg-gradient-to-br via-purple-950 from-slate-900 to-slate-900 relative overflow-hidden"> */}
      <div className="min-h-screenp-4 md:p-8 relative overflow-hidden">
        {/* Hero Section */}
        <div ref={heroRef} className="relative z-10 text-white pt-2 pb-14">
          <div className="max-w-7xl mx-auto px-6 text-center">
            {/* Brand Header */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <Sparkles
                  className="w-8 h-8 text-purple-400 mr-3 animate-spin"
                  style={{ animationDuration: "3s" }}
                />
                <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  MetaTickets
                </h1>
                <Zap className="w-8 h-8 text-cyan-400 ml-3 animate-pulse" />
              </div>
              <p className="text-xl text-gray-300 font-medium tracking-wide">
                We're not disrupting ticketing. We're deleting it.
              </p>
            </div>

            {/* Main CTA */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Discover events that{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  break reality
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                From NFT galleries to DeFi summits, find Web3 experiences that
                push boundaries. Pay with crypto, own your tickets as NFTs.
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="max-w-3xl mx-auto relative mb-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
                  <div className="flex items-center">
                    <Search className="ml-4 w-6 h-6 text-purple-400" />
                    <input
                      type="text"
                      placeholder="Search the metaverse..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="flex-1 px-4 py-4 bg-transparent text-white text-lg placeholder-gray-400 focus:outline-none"
                    />
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 mr-2">
                      <span>Search</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Events Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {searchTerm || selectedCategory !== "All"
                  ? `Found ${filteredEvents.length} experiences`
                  : "Featured Experiences"}
              </h2>
              <p className="text-gray-400">The future is happening now</p>
            </div>
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-gray-400" />
              <Globe className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                No events found
              </h3>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                Try adjusting your search
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="group relative"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* Card glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-500">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={event.image || "/images/default-event.jpg"}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/images/default-event.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Creator badge */}
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-purple-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                          by {event.creator}
                        </span>
                      </div>

                      {/* Status badge */}
                      {event.status && (
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3 py-1 backdrop-blur-sm text-white text-xs font-medium rounded-full ${
                              event.status === "active"
                                ? "bg-green-500/80"
                                : "bg-gray-500/80"
                            }`}
                          >
                            {event.status}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                        {event.title}
                      </h3>

                      {/* Description placeholder */}
                      <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                        {event.ticketType === "free"
                          ? "Join this free event and connect with the community"
                          : "Premium event experience with exclusive benefits"}
                      </p>

                      {/* Event details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-300">
                          <Calendar className="w-4 h-4 mr-3 text-purple-400" />
                          <span className="text-sm">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <MapPin className="w-4 h-4 mr-3 text-pink-400" />
                          <span className="text-sm">{event.venue}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Users className="w-4 h-4 mr-3 text-cyan-400" />
                          <span className="text-sm">
                            Up to {event.capacity} guests
                          </span>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {event.ticketType === "free"
                              ? "Free"
                              : `${event.priceUSD || "0.00"} SOL`}
                          </div>
                        </div>
                        <button
                          onClick={() => openModal(event)}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-purple-500/25"
                        >
                          <span>Get Ticket</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
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
