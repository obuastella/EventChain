import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {/* Header Loading */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Loader2 className="w-5 h-5 text-white animate-spin" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Loading Wallet...</h3>
            <div className="h-3 w-20 bg-gray-600/50 rounded animate-pulse mt-1"></div>
          </div>
        </div>
      </div>

      {/* Balance Loading Skeleton */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-24 bg-gray-600/50 rounded animate-pulse"></div>
          <div className="h-6 w-12 bg-gray-600/30 rounded animate-pulse"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-gray-600/30 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-green-500/30 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Buttons Loading */}
      <div className="flex space-x-2">
        <div className="flex-1 h-8 bg-gray-600/30 rounded animate-pulse"></div>
        <div className="flex-1 h-8 bg-purple-500/30 rounded animate-pulse"></div>
      </div>

      {/* Loading Dots Animation */}
      <div className="flex justify-center space-x-1 pt-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-purple-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
