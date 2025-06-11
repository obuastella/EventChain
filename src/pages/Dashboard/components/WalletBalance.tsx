// import { useState, useEffect } from "react";
// import { useUser } from "@civic/auth-web3/react";
// import { userHasWallet } from "@civic/auth-web3";
// import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
// import {
//   Eye,
//   EyeOff,
//   Wallet,
//   TrendingUp,
//   RefreshCw,
//   Check,
//   Copy,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import Loading from "./Loading";
// import { useNavigate } from "react-router-dom";

// const WalletBalance = () => {
//   const navigate = useNavigate();
//   const userContext: any = useUser();
//   const [showBalance, setShowBalance] = useState(true);
//   const [balance, setBalance] = useState(0);
//   const [usdValue, setUsdValue] = useState(0);
//   const [solPrice, setSolPrice] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [error, setError] = useState(null);

//   // Solana RPC connection - using devnet for testing, you can switch to mainnet with your own RPC
//   const connection = new Connection("https://api.devnet.solana.com");

//   // Fetch SOL price from CoinGecko
//   const fetchSolPrice = async () => {
//     try {
//       const response = await fetch(
//         "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
//       );
//       const data = await response.json();
//       return data.solana.usd;
//     } catch (error) {
//       console.error("Error fetching SOL price:", error);
//       return 158; // Fallback price
//     }
//   };

//   // Fetch wallet balance
//   const fetchBalance = async () => {
//     try {
//       setError(null);
//       const { publicKey } = userContext.solana.wallet;
//       const balanceInLamports = await connection.getBalance(publicKey);
//       const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

//       // Get current SOL price
//       const currentSolPrice = await fetchSolPrice();

//       setBalance(balanceInSol);
//       setSolPrice(currentSolPrice);
//       // console.log(solPrice);

//       setUsdValue(balanceInSol * currentSolPrice);
//       console.log("Updated SOL price:", currentSolPrice);
//     } catch (error) {
//       console.error("Error fetching balance:", error);
//       //   setError("Failed to fetch balance");
//     } finally {
//       setIsLoading(false);
//       setIsRefreshing(false);
//     }
//   };

//   // Refresh balance
//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await fetchBalance();
//   };

//   // Airdrop devnet SOL for testing
//   const requestAirdrop = async () => {
//     try {
//       setIsRefreshing(true);
//       const { publicKey } = userContext.solana.wallet;

//       // Request 2 SOL airdrop (2 * LAMPORTS_PER_SOL)
//       const signature = await connection.requestAirdrop(
//         publicKey,
//         2 * LAMPORTS_PER_SOL
//       );

//       // Wait for confirmation
//       await connection.confirmTransaction(signature);

//       // Refresh balance after airdrop
//       await fetchBalance();

//       toast.success("🎉 2 SOL added to your devnet wallet!");
//     } catch (error) {
//       console.error("Airdrop failed:", error);
//       toast.error("❌ Airdrop failed. Try again in a few minutes.");
//       setIsRefreshing(false);
//     }
//   };
//   // function to handle copying
//   const handleCopyAddress = async () => {
//     try {
//       await navigator.clipboard.writeText(userContext.solana.address);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
//     } catch (err) {
//       console.error("Failed to copy address:", err);
//       // Fallback for older browsers
//       const textArea = document.createElement("textarea");
//       textArea.value = userContext.solana.address;
//       document.body.appendChild(textArea);
//       textArea.select();
//       document.execCommand("copy");
//       document.body.removeChild(textArea);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };
//   //
//   // Initial fetch
//   useEffect(() => {
//     if (userHasWallet(userContext) && userContext.solana.wallet?.publicKey) {
//       fetchBalance();
//     }
//   }, [userContext]);

//   if (!userHasWallet(userContext)) {
//     return null;
//   }

//   if (error) {
//     return (
//       <motion.div
//         className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <div className="text-center">
//           <p className="text-red-400 font-medium">Error loading wallet</p>
//           <p className="text-sm text-gray-400 mt-1">{error}</p>
//           <button
//             onClick={handleRefresh}
//             className="mt-3 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm text-white transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </motion.div>
//     );
//   }

//   const handleBuyTicket = () => {
//     navigate("/discover");
//   };
//   return (
//     <motion.div
//       className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* Background decoration */}
//       <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-400/20 to-transparent rounded-full -translate-y-12 translate-x-12" />
//       <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-400/20 to-transparent rounded-full translate-y-8 -translate-x-8" />

//       <div className="relative z-10">
//         <AnimatePresence mode="wait">
//           {isLoading ? (
//             <Loading />
//           ) : (
//             // Loaded State
//             <motion.div
//               key="loaded"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               {/* Header */}
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center space-x-3">
//                   <motion.div
//                     className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
//                     animate={{
//                       boxShadow: [
//                         "0 0 0 0 rgba(168, 85, 247, 0.4)",
//                         "0 0 0 10px rgba(168, 85, 247, 0)",
//                       ],
//                     }}
//                     transition={{ duration: 1.5, repeat: Infinity }}
//                   >
//                     <Wallet className="w-5 h-5 text-white" />
//                   </motion.div>
//                   <div>
//                     <motion.h3
//                       className="text-white font-semibold"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.2 }}
//                     >
//                       Wallet Connected ✨
//                     </motion.h3>
//                     {/* copy button to copy wallet address */}
//                     <motion.div
//                       className="flex items-center space-x-1 group"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.3 }}
//                     >
//                       <motion.p className="text-xs text-gray-400">
//                         {userContext.solana.address.slice(0, 6)}...
//                         {userContext.solana.address.slice(-4)}
//                       </motion.p>
//                       <motion.button
//                         onClick={handleCopyAddress}
//                         className="p-1 hover:bg-white/10 rounded transition-colors opacity-0 group-hover:opacity-100"
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.95 }}
//                         title={copied ? "Copied!" : "Copy address"}
//                       >
//                         <AnimatePresence mode="wait">
//                           {copied ? (
//                             <motion.div
//                               key="check"
//                               initial={{ scale: 0, opacity: 0 }}
//                               animate={{ scale: 1, opacity: 1 }}
//                               exit={{ scale: 0, opacity: 0 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               <Check className="w-3 h-3 text-green-400" />
//                             </motion.div>
//                           ) : (
//                             <motion.div
//                               key="copy"
//                               initial={{ scale: 0, opacity: 0 }}
//                               animate={{ scale: 1, opacity: 1 }}
//                               exit={{ scale: 0, opacity: 0 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               <Copy className="w-3 h-3 text-gray-400 hover:text-white" />
//                             </motion.div>
//                           )}
//                         </AnimatePresence>
//                       </motion.button>
//                     </motion.div>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-1">
//                   <motion.button
//                     onClick={handleRefresh}
//                     disabled={isRefreshing}
//                     className="p-2 hover:bg-white/10 rounded-lg transition-colors group disabled:opacity-50"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.4 }}
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <RefreshCw
//                       className={`w-4 h-4 text-gray-400 group-hover:text-white ${
//                         isRefreshing ? "animate-spin" : ""
//                       }`}
//                     />
//                   </motion.button>
//                   <motion.button
//                     onClick={() => setShowBalance(!showBalance)}
//                     className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.4 }}
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     {showBalance ? (
//                       <Eye className="w-4 h-4 text-gray-400 group-hover:text-white" />
//                     ) : (
//                       <EyeOff className="w-4 h-4 text-gray-400 group-hover:text-white" />
//                     )}
//                   </motion.button>
//                 </div>
//               </div>

//               {/* Balance Display */}
//               <motion.div
//                 className="space-y-2"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 <motion.div
//                   className="flex items-baseline space-x-2"
//                   animate={{ scale: showBalance ? 1 : 0.9 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <motion.span
//                     className="text-3xl font-bold text-white"
//                     initial={{ opacity: 0, scale: 0.5 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
//                   >
//                     {showBalance ? balance.toFixed(4) : "••••"}
//                   </motion.span>
//                   <motion.span
//                     className="text-purple-300 font-medium"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.6 }}
//                   >
//                     SOL
//                   </motion.span>
//                 </motion.div>

//                 <motion.div
//                   className="flex items-center justify-between"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.7 }}
//                 >
//                   <span className="text-gray-400 text-sm">
//                     {showBalance ? `${usdValue.toFixed(2)} USD` : "$••••"}
//                   </span>
//                   <motion.div
//                     className="flex items-center space-x-1 text-green-400 text-sm"
//                     initial={{ opacity: 0, x: 10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.8 }}
//                   >
//                     <TrendingUp className="w-3 h-3" />
//                     <span>+12.5%</span>
//                   </motion.div>
//                 </motion.div>
//               </motion.div>

//               {/* Quick Actions */}
//               {/* Quick Actions */}
//               <motion.div
//                 className="space-y-3 mt-4"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.9 }}
//               >
//                 {/* Main Action Buttons */}
//                 <div className="flex space-x-2">
//                   <motion.button
//                     className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg py-2 px-3 text-sm font-medium text-white transition-colors"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     Send
//                   </motion.button>
//                   <motion.button
//                     onClick={handleBuyTicket}
//                     className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg py-2 px-3 text-sm font-medium text-white transition-colors"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     Buy Tickets
//                   </motion.button>
//                 </div>

//                 {/* Devnet Airdrop Button (only show in dev) */}
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 1.0 }}
//                 >
//                   <motion.button
//                     onClick={requestAirdrop}
//                     disabled={isRefreshing}
//                     className="w-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 rounded-lg py-2 px-3 text-sm font-medium text-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     {isRefreshing ? "Adding SOL..." : "🚁 Add 2 Devnet SOL"}
//                   </motion.button>
//                   <p className="text-xs text-gray-500 text-center mt-1">
//                     Free devnet SOL for testing
//                   </p>
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.div>
//   );
// };

// export default WalletBalance;
import { useNavigate } from "react-router-dom";
import { useUser } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";
import { useEffect, useState } from "react";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  Check,
  TrendingUp,
} from "lucide-react";
import { toast } from "react-toastify";

const WalletBalance = () => {
  const navigate = useNavigate();
  const userContext: any = useUser();
  const [showBalance, setShowBalance] = useState(true);
  const [balance, setBalance] = useState(0);
  const [usdValue, setUsdValue] = useState(0);
  const [solPrice, setSolPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  // Solana RPC connection - using devnet for testing, you can switch to mainnet with your own RPC
  const connection = new Connection("https://api.devnet.solana.com");

  // Fetch SOL price from CoinGecko
  const fetchSolPrice = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
      );
      const data = await response.json();
      return data.solana.usd;
    } catch (error) {
      console.error("Error fetching SOL price:", error);
      return 158; // Fallback price
    }
  };

  // Fetch wallet balance
  const fetchBalance = async () => {
    try {
      setError(null);
      const { publicKey } = userContext.solana.wallet;
      const balanceInLamports = await connection.getBalance(publicKey);
      const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

      // Get current SOL price
      const currentSolPrice = await fetchSolPrice();

      setBalance(balanceInSol);
      setSolPrice(currentSolPrice);
      setUsdValue(balanceInSol * currentSolPrice);
      console.log("Updated SOL price:", currentSolPrice);
    } catch (error) {
      console.error("Error fetching balance:", error);
      // setError("Failed to fetch balance");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Refresh balance
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchBalance();
  };

  // Airdrop devnet SOL for testing
  const requestAirdrop = async () => {
    try {
      setIsRefreshing(true);
      const { publicKey } = userContext.solana.wallet;

      // Request 2 SOL airdrop (2 * LAMPORTS_PER_SOL)
      const signature = await connection.requestAirdrop(
        publicKey,
        2 * LAMPORTS_PER_SOL
      );

      // Wait for confirmation
      // await connection.confirmTransaction(signature);
      await connection.confirmTransaction(signature, "finalized");

      // Refresh balance after airdrop
      await fetchBalance();

      toast.success("🎉 2 SOL added to your devnet wallet!");
    } catch (error) {
      console.error("Airdrop failed:", error);
      toast.error("❌ Airdrop failed. Try again in a few minutes.");
      setIsRefreshing(false);
    }
  };

  // function to handle copying
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(userContext.solana.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy address:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = userContext.solana.address;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Listen for wallet balance update events
  useEffect(() => {
    const handleBalanceUpdate = (event: CustomEvent) => {
      console.log("Balance update event received:", event.detail);
      // Add a small delay to ensure the transaction is fully processed
      setTimeout(() => {
        handleRefresh();
      }, 1000);
    };

    // Add event listener
    window.addEventListener(
      "walletBalanceUpdate",
      handleBalanceUpdate as EventListener
    );

    // Cleanup
    return () => {
      window.removeEventListener(
        "walletBalanceUpdate",
        handleBalanceUpdate as EventListener
      );
    };
  }, [userContext]);

  // Initial fetch
  useEffect(() => {
    if (userHasWallet(userContext) && userContext.solana.wallet?.publicKey) {
      fetchBalance();
    }
  }, [userContext]);

  //
  useEffect(() => {
    const handleBalanceUpdate = () => {
      fetchBalance();
    };

    window.addEventListener("walletBalanceUpdate", handleBalanceUpdate);

    return () => {
      window.removeEventListener("walletBalanceUpdate", handleBalanceUpdate);
    };
  }, []);

  // Loading component
  const Loading = () => (
    <motion.div
      className="flex items-center justify-center py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center space-x-2">
        <motion.div
          className="w-4 h-4 bg-purple-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0,
          }}
        />
        <motion.div
          className="w-4 h-4 bg-pink-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.2,
          }}
        />
        <motion.div
          className="w-4 h-4 bg-purple-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.4,
          }}
        />
      </div>
    </motion.div>
  );

  if (!userHasWallet(userContext)) {
    return null;
  }

  if (error) {
    return (
      <motion.div
        className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center">
          <p className="text-red-400 font-medium">Error loading wallet</p>
          <p className="text-sm text-gray-400 mt-1">{error}</p>
          <button
            onClick={handleRefresh}
            className="mt-3 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm text-white transition-colors"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  const handleBuyTicket = () => {
    navigate("/discover");
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-400/20 to-transparent rounded-full -translate-y-12 translate-x-12" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-400/20 to-transparent rounded-full translate-y-8 -translate-x-8" />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Loading />
          ) : (
            // Loaded State
            <motion.div
              key="loaded"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(168, 85, 247, 0.4)",
                        "0 0 0 10px rgba(168, 85, 247, 0)",
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Wallet className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-white font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Wallet Connected ✨
                    </motion.h3>
                    {/* copy button to copy wallet address */}
                    <motion.div
                      className="flex items-center space-x-1 group"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.p className="text-xs text-gray-400">
                        {userContext.solana.address.slice(0, 6)}...
                        {userContext.solana.address.slice(-4)}
                      </motion.p>
                      <motion.button
                        onClick={handleCopyAddress}
                        className="p-1 hover:bg-white/10 rounded transition-colors opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title={copied ? "Copied!" : "Copy address"}
                      >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Check className="w-3 h-3 text-green-400" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="copy"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Copy className="w-3 h-3 text-gray-400 hover:text-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <motion.button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors group disabled:opacity-50"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw
                      className={`w-4 h-4 text-gray-400 group-hover:text-white ${
                        isRefreshing ? "animate-spin" : ""
                      }`}
                    />
                  </motion.button>
                  <motion.button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showBalance ? (
                      <Eye className="w-4 h-4 text-gray-400 group-hover:text-white" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400 group-hover:text-white" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Balance Display */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="flex items-baseline space-x-2"
                  animate={{ scale: showBalance ? 1 : 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span
                    className="text-3xl font-bold text-white"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    {showBalance ? balance.toFixed(4) : "••••"}
                  </motion.span>
                  <motion.span
                    className="text-purple-300 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    SOL
                  </motion.span>
                </motion.div>

                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <span className="text-gray-400 text-sm">
                    {showBalance ? `${usdValue.toFixed(2)} USD` : "$••••"}
                  </span>
                  <motion.div
                    className="flex items-center space-x-1 text-green-400 text-sm"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <TrendingUp className="w-3 h-3" />
                    <span>+12.5%</span>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                className="space-y-3 mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                {/* Main Action Buttons */}
                <div className="flex space-x-2">
                  <motion.button
                    className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg py-2 px-3 text-sm font-medium text-white transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send
                  </motion.button>
                  <motion.button
                    onClick={handleBuyTicket}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg py-2 px-3 text-sm font-medium text-white transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Buy Tickets
                  </motion.button>
                </div>

                {/* Devnet Airdrop Button (only show in dev) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <motion.button
                    onClick={requestAirdrop}
                    disabled={isRefreshing}
                    className="w-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 rounded-lg py-2 px-3 text-sm font-medium text-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isRefreshing ? "Adding SOL..." : "🚁 Add 2 Devnet SOL"}
                  </motion.button>
                  <p className="text-xs text-gray-500 text-center mt-1">
                    Free devnet SOL for testing
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default WalletBalance;
