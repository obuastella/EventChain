import { useState, useEffect } from "react";
import { collectionGroup, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export const useMyTickets = (userId: string) => {
  const [tickets, setTickets] = useState<unknown>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const ticketsQuery = query(
      collectionGroup(db, "tickets"),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(ticketsQuery, (snapshot) => {
      const userTickets = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTickets(userTickets);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  return { tickets, loading };
};
