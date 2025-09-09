import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Ticket } from "lucide-react";
import { UserButton } from "@civic/auth-web3/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Features", href: "/" },
    { name: "Earn", href: "/" },
    { name: "Marketplace", href: "/" },
    { name: "About", href: "/" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/20 py-2 sm:py-4"
          : "bg-transparent border-b border-white/10 py-3 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center min-h-[60px] sm:min-h-[64px]">
          {/* Enhanced Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Ticket className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="font-bold text-lg sm:text-2xl bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              MetaTicket®
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group px-3 py-2 rounded-lg hover:bg-white/5"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-[calc(100%-1.5rem)] transition-all duration-300"></span>
              </motion.a>
            ))}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* User Button Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="login-button-container flex-shrink-0"
            >
              <UserButton
                className="login-button scale-75 sm:scale-100"
                dropdownButtonClassName="internal-button"
              />
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex-shrink-0"
              aria-label="Toggle mobile menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span
                  className={`block w-4 h-0.5 bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                  }`}
                ></span>
                <span
                  className={`block w-4 h-0.5 bg-white transition-all duration-300 mt-1 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-4 h-0.5 bg-white transition-all duration-300 mt-1 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                  }`}
                ></span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-3 sm:py-4 space-y-1 sm:space-y-2 border-t border-white/10 mt-3 sm:mt-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="block text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 font-medium py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-sm sm:text-base"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20,
                }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : -20,
              }}
              transition={{ delay: 0.4 }}
              className="pt-3 sm:pt-4 border-t border-white/10 mt-3 sm:mt-4"
            >
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-sm sm:text-base">
                Launch Platform
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Glassmorphism effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 pointer-events-none"></div>
    </motion.nav>
  );
}
