import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { useUser } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";
import { useEffect, useState } from "react";
import { X, Calendar, MapPin } from "lucide-react";
import { toast } from "react-toastify";

interface BuyerInfo {
  name: string;
  email: string;
  walletAddress: string;
}

interface EventDetails {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  price: string; // e.g. "0.01 SOL"
  priceUSD: string; // e.g. "$1.00"
}

interface Props {
  selectedEvent: EventDetails;
  onClose: () => void;
}

const RPC_URL = "https://api.devnet.solana.com";
const RECIPIENT_WALLET_ADDRESS = "5xyuP7FuZRt5sKX86uxhB7rM8CcDa8tkERoRc6uRGgDr"; // This will be changed later based on who created the event

export default function PurchaseTicket({ selectedEvent, onClose }: Props) {
  // Use Civic's useUser hook
  const userContext: any = useUser();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [buyerInfo, setBuyerInfo] = useState<BuyerInfo>({
    name: "",
    email: "",
    walletAddress: "",
  });

  // Check if user has wallet connected through Civic
  const isWalletConnected = userHasWallet(userContext);
  const isFormValid =
    buyerInfo.name &&
    buyerInfo.email &&
    buyerInfo.walletAddress &&
    isWalletConnected;

  const handlePurchase = async () => {
    if (!isWalletConnected) {
      toast.error("Please connect your wallet.");
      return;
    }

    if (!userContext.solana?.wallet?.publicKey) {
      toast.error("Wallet not properly connected.");
      return;
    }

    try {
      toast.info("Preparing transaction...");

      const lamportsPerTicket =
        parseFloat(selectedEvent.price) * LAMPORTS_PER_SOL;
      const totalLamports = Math.floor(lamportsPerTicket * ticketQuantity);

      const connection = new Connection(RPC_URL);
      const recipientPubkey = new PublicKey(RECIPIENT_WALLET_ADDRESS);

      // Get the public key from Civic's wallet
      const { publicKey } = userContext.solana.wallet;

      // Get latest blockhash
      const { blockhash } = await connection.getLatestBlockhash();

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports: totalLamports,
        })
      );

      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // console.log("Sending transaction...");

      // Use Civic's sendTransaction method
      const signature = await userContext.solana.wallet.sendTransaction(
        transaction,
        connection
      );

      console.log("Transaction sent:", signature);
      toast.info("Transaction sent! Waiting for confirmation...");

      // Wait for confirmation
      await connection.confirmTransaction(signature, "confirmed");

      toast.success("Ticket purchased successfully!");

      // Dispatch custom event to notify wallet balance to refresh
      const balanceUpdateEvent = new CustomEvent("walletBalanceUpdate", {
        detail: { signature, amount: totalLamports },
      });
      window.dispatchEvent(balanceUpdateEvent);
      dispatchEvent(
        new CustomEvent("walletBalanceUpdate", { detail: "tx_complete" })
      );

      onClose();
    } catch (error: any) {
      console.error("Transaction error:", error);

      let errorMessage = "Transaction failed.";

      if (
        error.message?.includes("0x1") ||
        error.message?.includes("Insufficient")
      ) {
        errorMessage = "Insufficient funds.";
      } else if (error.message?.includes("User rejected")) {
        errorMessage = "Transaction was cancelled.";
      } else if (error.message?.includes("Buffer")) {
        errorMessage =
          "Browser compatibility issue. Please refresh and try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    }
  };

  // Auto-fill wallet address if available
  useEffect(() => {
    if (isWalletConnected && userContext.solana?.address) {
      setBuyerInfo((prev) => ({
        ...prev,
        walletAddress: userContext.solana.address,
      }));
    }
  }, [isWalletConnected, userContext.solana?.address]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-zinc-900 text-white rounded-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-mint">Purchase Ticket</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-lg mb-2">{selectedEvent.name}</h3>
          <div className="space-y-1 text-sm">
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

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <select
            value={ticketQuantity}
            onChange={(e) => setTicketQuantity(parseInt(e.target.value))}
            className="w-full bg-zinc-800 border border-gray-600 rounded px-3 py-2"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1">Full Name *</label>
            <input
              type="text"
              value={buyerInfo.name}
              onChange={(e) =>
                setBuyerInfo({ ...buyerInfo, name: e.target.value })
              }
              className="w-full bg-zinc-800 border border-gray-600 rounded px-3 py-2"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email *</label>
            <input
              type="email"
              value={buyerInfo.email}
              onChange={(e) =>
                setBuyerInfo({ ...buyerInfo, email: e.target.value })
              }
              className="w-full bg-zinc-800 border border-gray-600 rounded px-3 py-2"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Wallet Address *</label>
          <input
            type="text"
            value={buyerInfo.walletAddress}
            onChange={(e) =>
              setBuyerInfo({ ...buyerInfo, walletAddress: e.target.value })
            }
            className="w-full bg-zinc-800 border border-gray-600 rounded px-3 py-2"
            placeholder="Wallet address will be auto-filled"
            readOnly={isWalletConnected}
          />
        </div>

        <div className="border-t border-gray-600 pt-4 mb-6 text-sm">
          <div className="flex justify-between mb-1">
            <span>Price per ticket:</span>
            <span>
              {selectedEvent.price} SOL ({selectedEvent.priceUSD})
            </span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Quantity:</span>
            <span>{ticketQuantity}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>
              {(parseFloat(selectedEvent.price) * ticketQuantity).toFixed(2)}{" "}
              SOL
            </span>
          </div>
        </div>

        <button
          disabled={!isFormValid}
          onClick={handlePurchase}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            isFormValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Purchase Ticket{ticketQuantity > 1 ? "s" : ""}
        </button>
      </div>
    </div>
  );
}
