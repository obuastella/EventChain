import { useNavigate } from "react-router-dom";
import { useUser } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";
import { useState, useCallback, useMemo } from "react";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
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
import Loading from "./Loading";

const WalletBalance = () => {
  const navigate = useNavigate();
  const userContext: any = useUser();
  const queryClient = useQueryClient();

  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);

  // Memoize connection to avoid recreating
  const connection = useMemo(
    () => new Connection("https://api.devnet.solana.com"),
    []
  );

  // Memoize wallet address
  const walletAddress = useMemo(() => {
    return userHasWallet(userContext) ? userContext.solana.address : null;
  }, [userContext]);

  // Fetch SOL price with caching
  const { data: solPrice = 158 } = useQuery({
    queryKey: ["solPrice"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
      );
      const data = await response.json();
      return data.solana.usd;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    enabled: !!walletAddress,
  });

  // Fetch wallet balance with caching
  const {
    data: balance = 0,
    isLoading,
    refetch: refetchBalance,
    isRefetching,
    error,
  } = useQuery({
    queryKey: ["walletBalance", walletAddress],
    queryFn: async () => {
      if (!userContext?.solana?.wallet?.publicKey) {
        throw new Error("No wallet found");
      }

      const balanceInLamports = await connection.getBalance(
        userContext.solana.wallet.publicKey
      );
      return balanceInLamports / LAMPORTS_PER_SOL;
    },
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!walletAddress && !!userContext?.solana?.wallet?.publicKey,
    retry: 2,
    refetchOnWindowFocus: false, // Prevent refetch on window focus
  });

  // Memoize USD value calculation
  const usdValue = useMemo(() => {
    return balance * solPrice;
  }, [balance, solPrice]);

  // Airdrop mutation
  const airdropMutation = useMutation({
    mutationFn: async () => {
      if (!userContext?.solana?.wallet?.publicKey) {
        throw new Error("No wallet found");
      }

      const signature = await connection.requestAirdrop(
        userContext.solana.wallet.publicKey,
        2 * LAMPORTS_PER_SOL
      );

      await connection.confirmTransaction(signature, "finalized");
      return signature;
    },
    onSuccess: () => {
      // Invalidate balance query to trigger refetch
      queryClient.invalidateQueries({
        queryKey: ["walletBalance", walletAddress],
      });
      toast.success("🎉 2 SOL added to your devnet wallet!");
    },
    onError: (error) => {
      console.error("Airdrop failed:", error);
      toast.error("❌ Airdrop failed. Try again in a few minutes.");
    },
  });

  // Optimized refresh handler
  const handleRefresh = useCallback(async () => {
    await refetchBalance();
  }, [refetchBalance]);

  // Copy address handler
  const handleCopyAddress = useCallback(async () => {
    if (!walletAddress) return;

    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = walletAddress;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [walletAddress]);

  // Early returns for loading states
  if (!userContext || !userContext.solana || !userContext.solana.wallet) {
    return <Loading />;
  }

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
          <p className="text-sm text-gray-400 mt-1">{error.message}</p>
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

  const isRefreshing = isRefetching || airdropMutation.isLoading;

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
                    <motion.div
                      className="flex items-center space-x-1 group"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.p className="text-xs text-gray-400">
                        {walletAddress?.slice(0, 6)}...
                        {walletAddress?.slice(-4)}
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
                <div className="flex space-x-2">
                  <motion.button
                    onClick={handleBuyTicket}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg py-2 px-3 text-sm font-medium text-white transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Buy Tickets
                  </motion.button>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <motion.button
                    onClick={() => airdropMutation.mutate()}
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
