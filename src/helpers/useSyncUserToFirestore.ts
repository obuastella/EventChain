import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useUser } from "@civic/auth-web3/react";
import { db } from "../config/firebase";

export function useSyncUserToFirestore() {
  const { user } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      //   console.log("user store", user);
      if (!user) return;

      const userRef = doc(db, "users", user.id);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          id: user.id,
          name: user.name || "",
          email: user.email || "",
          wallet: user.walletAddress || "",
          createdAt: new Date(),
        });
        // console.log("✅ User created in Firestore:", user.id);
      } else {
        // console.log("ℹ️ User already exists:", user.id);
      }
    };

    syncUser();
  }, [user]);
}
