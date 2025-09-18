//@ts-nocheck
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Share2,
  ArrowLeft,
  Ticket,
  UserPlus,
} from "lucide-react";
// Uncomment these Firebase imports and update the path to your Firebase config
import {
  doc,
  getDoc,
  collection,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@civic/auth-web3/react";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";

const SharedEventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user, signIn } = useUser();
  const userContext = useUser();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchasing, setPurchasing] = useState(false);

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch event from Firebase
        const eventDoc = await getDoc(doc(db, "events", eventId));

        if (eventDoc.exists()) {
          const eventData = { id: eventDoc.id, ...eventDoc.data() };
          setEvent(eventData);
        } else {
          setError("Event not found");
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    } else {
      setError("No event ID provided");
      setLoading(false);
    }
  }, [eventId]);

  const handlePurchaseTicket = async () => {
    // Check if user is signed in
    if (!user) {
      signIn();
      return;
    }

    setPurchasing(true);
    try {
      // Check if it's a paid event (currently not supported)
      if (event.ticketType !== "free") {
        toast.warning("Sorry We are currently working on this...");
        setPurchasing(false);
        return;
      }

      const payload = {
        eventID: eventId,
        userId: user.id,
        userName: user.name,
        email: user?.email,
        wallet: userContext?.solana?.address || "",
        eventTitle: event.title,
        venue: event.venue,
        eventImage: event.image,
        ticketType: event.ticketType,
        purchasedAt: serverTimestamp(),
        status: "active",
        nonce: uuidv4(),
      };

      // ticketId = userId (enforce one ticket per user per event)
      const ticketRef = doc(
        collection(db, "events", eventId, "tickets"),
        user.id
      );

      const existingTicket = await getDoc(ticketRef);

      if (existingTicket.exists()) {
        toast.warning("You already have a ticket for this event.");
        setPurchasing(false);
        return;
      }

      await setDoc(ticketRef, payload);

      console.log("🎟️ Ticket purchased:", user.id);
      toast.success("Ticket registered successfully!");
    } catch (error) {
      console.error("Error getting ticket:", error);
      toast.error("Failed to get ticket. Please try again.");
    } finally {
      setPurchasing(false);
    }
  };

  const handleShare = async () => {
    try {
      const shareUrl = window.location.href;

      if (
        navigator.share &&
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        await navigator.share({
          title: event.title,
          text: `Check out this event: ${event.title}`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading event...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="text-gray-400 mb-6">
            {error ||
              "The event you're looking for doesn't exist or has been removed."}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate(-1)}
              className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors"
            >
              Browse All Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isFreeEvent =
    event.ticketType === "free" || parseFloat(event.price || "0") === 0;

  const formatPrice = () => {
    if (isFreeEvent) return "Free";
    return `$${event.price}`;
  };

  // Calculate remaining spots
  const remainingSpots = parseInt(event.capacity) - (event.sold || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
            >
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Event Image */}
        <div className="relative mb-8">
          <img
            src={
              event.image ||
              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800"
            }
            alt={event.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800";
            }}
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 capitalize">
              {event.status}
            </span>
            {isFreeEvent && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Free
              </span>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-white mb-6">
              {event.title}
            </h1>

            {/* Event Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-gray-300">
                <Calendar className="text-purple-400" size={20} />
                <div>
                  <p className="font-medium">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {/* Note: Your Firebase data doesn't include time, so showing date only */}
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="text-purple-400" size={20} />
                <div>
                  <p className="font-medium">{event.venue}</p>
                  <p className="text-sm text-gray-400">
                    Created by {event.creator}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-300">
                <Users className="text-purple-400" size={20} />
                <div>
                  <p className="font-medium">
                    {remainingSpots > 0
                      ? `${remainingSpots} spots remaining`
                      : "Sold Out"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {event.sold || 0} sold out of {event.capacity} total
                  </p>
                </div>
              </div>
            </div>

            {/* Event Description - if you add description field later */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                About This Event
              </h3>
              <div className="text-gray-300 leading-relaxed space-y-2">
                <p>
                  Join us for <strong>{event.title}</strong> at {event.venue}.
                </p>
                <p>
                  Event created by {event.creator} ({event.email})
                </p>
                <p>
                  This is a {event.ticketType} event with {event.capacity} total
                  spots available.
                </p>
              </div>
            </div>
          </div>

          {/* Purchase Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-gray-400 text-sm mb-2">Price</p>
                <p
                  className={`text-3xl font-bold ${
                    isFreeEvent ? "text-blue-400" : "text-white"
                  }`}
                >
                  {formatPrice()}
                </p>
              </div>

              <button
                onClick={handlePurchaseTicket}
                disabled={purchasing || remainingSpots <= 0}
                className={`w-full py-4 px-6 rounded-xl text-white font-medium transition-all flex items-center justify-center space-x-2 ${
                  purchasing || remainingSpots <= 0
                    ? "bg-gray-600 cursor-not-allowed"
                    : !user
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    : isFreeEvent
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                }`}
              >
                {purchasing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : remainingSpots <= 0 ? (
                  <span>Sold Out</span>
                ) : !user ? (
                  <>
                    {/* <LogIn size={20} /> */}
                    <span>Sign In to Get Ticket</span>
                  </>
                ) : (
                  <>
                    {isFreeEvent ? (
                      <UserPlus size={20} />
                    ) : (
                      <Ticket size={20} />
                    )}
                    <span>
                      {isFreeEvent ? "Register for Free" : "Buy Ticket"}
                    </span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                {!user
                  ? "Sign in with Civic to get your ticket"
                  : isFreeEvent
                  ? "Free registration - secure your spot now"
                  : "Secure checkout powered by Stripe"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedEventPage;
