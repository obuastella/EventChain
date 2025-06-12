import { Ticket, Search, Sparkles, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import WalletBalance from "./components/WalletBalance";
import Header from "./components/Header";
import { useNavigate } from "react-router-dom";
import { stats } from "./statsData";

const Dashboard = () => {
  const navigate = useNavigate();

  // Fun quick actions with more personality
  const quickActions = [
    {
      title: "🎪 Discover",
      subtitle: "Find Epic Events",
      description: "200+ Web3 events waiting",
      icon: <Search className="w-8 h-8" />,
      gradient: "from-orange-400 via-pink-500 to-purple-600",
      route: "/discover",
    },
    {
      title: "🎫 My Tickets",
      subtitle: "Your Adventures",
      description: "3 tickets ready to go",
      icon: <Ticket className="w-8 h-8" />,
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      route: "/my-tickets",
    },
    {
      title: "⚡ Host Event",
      subtitle: "Create Magic",
      description: "Be the next big thing",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-yellow-400 via-orange-500 to-red-500",
      route: "/manage",
    },
  ];

  const handleNav = (path: any) => {
    navigate(path);
  };
  return (
    <div className="space-y-8">
      <Header />
      {/* Wallet Balance Component */}
      <WalletBalance />

      {/* Stats Section - Keep the cute ones! */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={`${stat.bgColor} backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:scale-105 transition-all duration-300 cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}
              >
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fun Quick Actions - Less boxy, more personality */}
      <div className="mb-12 md:mb-0 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          <span>Quick Actions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              className="cursor-pointer group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:border-white/40 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNav(action.route)}
            >
              {/* Animated background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500`}
              />

              <div className="relative z-10 text-center space-y-3">
                <div className="flex justify-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${action.gradient} rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}
                  >
                    {action.icon}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                    {action.title}
                  </h4>
                  <p className="text-sm font-medium text-purple-300">
                    {action.subtitle}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {action.description}
                  </p>
                </div>

                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-2 group-hover:scale-110 transition-all mx-auto" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
