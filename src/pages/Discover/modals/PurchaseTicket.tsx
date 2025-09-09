import { useUser } from "@civic/auth-web3/react";
import {
  query,
  collection,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  increment,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../../config/firebase";
import { v4 as uuidv4 } from "uuid";

interface PurchaseTicketProps {
  onClose: () => void;
  selectedEvent: Event;
}

const PurchaseTicket: React.FC<PurchaseTicketProps> = ({
  onClose,
  selectedEvent,
}) => {
  const { user }: any = useUser();
  const userContext = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);

    if (selectedEvent?.ticketType !== "free") {
      toast.warning("Sorry We are currently working on this...");
      setIsLoading(false);
      onClose();
      return;
    }
    // const payload = {
    //   eventID: selectedEvent?.id,
    //   userId: user.id,
    //   userName: user.name,
    //   email: user?.email,
    //   wallet: userContext?.solana?.address || "",
    //   eventTitle: selectedEvent?.title,
    //   venue: selectedEvent?.venue,
    //   eventImage: selectedEvent?.image,
    //   ticketType: selectedEvent?.ticketType,
    //   purchasedAt: new Date(),
    //   status: "active",
    // };

    // try {
    //   console.log("Payload: ", payload);
    //   // TODO: Hanlde purchase request
    //   setIsLoading(false);
    // } catch (err) {
    //   console.log("An error occured while purchasing ticket...", err);
    //   setIsLoading(false);
    // }
    // setIsLoading(false);
    // const ticketId = uuidv4(); // unique ticket id
    const payload = {
      eventID: selectedEvent.id,
      userId: user.id,
      userName: user.name,
      email: user?.email,
      wallet: userContext?.solana?.address || "",
      eventTitle: selectedEvent.title,
      venue: selectedEvent.venue,
      eventImage: selectedEvent.image,
      ticketType: selectedEvent.ticketType,
      purchasedAt: new Date(),
      status: "active",
      nonce: uuidv4(),
    };
    try {
      // ticketId = userId (enforce one ticket per user per event)
      const ticketRef = doc(
        collection(db, "events", selectedEvent.id, "tickets"),
        user.id
      );

      const existingTicket = await getDoc(ticketRef);

      if (existingTicket.exists()) {
        toast.warning("You already have a ticket for this event.");
        setIsLoading(false);
        onClose();
        return;
      }

      await setDoc(ticketRef, payload);

      console.log("🎟️ Ticket purchased:", user.id);
      toast.success("Ticket purchased!");
    } catch (err) {
      console.error("Error purchasing ticket:", err);
      toast.error("Failed to purchase ticket.");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900/95 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">
            {selectedEvent.title}
          </h3>
          <p className="text-gray-400">
            {selectedEvent.ticketType === "free"
              ? "Free"
              : `$${selectedEvent.priceUSD || "0.00"}`}
          </p>
        </div>
        <button
          onClick={() => handlePurchase()}
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          {isLoading ? "Loading..." : "Get Ticket"}
        </button>
        <button
          onClick={onClose}
          className="w-full mt-3 py-3 border border-white/20 rounded-xl text-gray-300 hover:bg-white/10 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default PurchaseTicket;
