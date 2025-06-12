import { motion } from "framer-motion";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FeaturesSection from "./components/FeaturesSection";
import EarningsSection from "./components/EarningsSection";
import ComparisonSection from "./components/ComparisonSection";
import FloatingCTA from "./components/FloatingCTA";

export default function Index() {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20"></div>
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <FeaturesSection />
        <EarningsSection />
        <ComparisonSection />
        <Footer />
        <FloatingCTA />
      </div>

      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-5">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 800),
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
