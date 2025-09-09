import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  increment,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  // Fetch events from Firebase in real-time
  useEffect(() => {
    const fetchEvents = () => {
      try {
        // Create a query to get events ordered by creation date (newest first)
        const q = query(collection(db, "events"), orderBy("createdAt", "desc"));

        // Set up real-time listener
        const unsubscribe = onSnapshot(
          q,
          (querySnapshot) => {
            const eventsData = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();

              // Transform Firebase data to match component's expected format
              const event = {
                id: doc.id,
                title: data.title || "",
                date: data.date || "",
                venue: data.venue || "",
                capacity: parseInt(data.capacity) || 0,
                sold: data.sold || 0,
                priceUSD:
                  data.price || (data.ticketType === "free" ? "0.00" : "0.00"),
                ticketType: data.ticketType || "free",
                status: data.status || "active",
                image:
                  data.image ||
                  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop",
                creator: data.creator || "",
                email: data.email || "",
                userId: data.userId || "",
                createdAt: data.createdAt?.toDate?.() || new Date(),
                buyers: [], // Initialize with empty array, can be populated from separate collection
              };
              eventsData.push(event);
            });

            setEvents(eventsData);
            setLoading(false);
          },
          (err) => {
            console.error("Error fetching events:", err);
            setError("Failed to load events");
            setLoading(false);
          }
        );

        // Return cleanup function
        return unsubscribe;
      } catch (err) {
        console.error("Error setting up events listener:", err);
        setError("Failed to load events");
        setLoading(false);
      }
    };

    const unsubscribe = fetchEvents();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Create a new event
  const createEvent = async (eventData) => {
    try {
      const docRef = await addDoc(collection(db, "events"), {
        ...eventData,
        sold: 0,
        status: "active",
        createdAt: new Date(),
      });

      console.log("✅ Event Created with ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  };

  // Update an event
  const updateEvent = async (eventId, updateData) => {
    try {
      await updateDoc(doc(db, "events", eventId), updateData);
      console.log("✅ Event Updated:", eventId);
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };

  // Delete an event
  const deleteEvent = async (eventId) => {
    try {
      await deleteDoc(doc(db, "events", eventId));
      console.log("✅ Event Deleted:", eventId);
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };

  // Increment sold tickets for an event
  const incrementSoldTickets = async (eventId, amount = 1) => {
    try {
      await updateDoc(doc(db, "events", eventId), {
        sold: increment(amount),
      });
      console.log("✅ Tickets incremented for event:", eventId);
    } catch (error) {
      console.error("Error incrementing tickets:", error);
      throw error;
    }
  };

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    incrementSoldTickets,
  };
};
