import { motion } from "framer-motion";
import { Ticket, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <motion.div
      className={`fixed bottom-8 right-8 z-50 ${
        isVisible ? "block" : "hidden"
      }`}
      initial={{ scale: 0 }}
      animate={{ scale: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 font-semibold"
      >
        <Ticket className="w-5 h-5" />
        <span>Get Started</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}
