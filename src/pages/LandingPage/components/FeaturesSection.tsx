import { motion } from "framer-motion";
import { Shield, Coins, TrendingUp, Repeat } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Fraud-Proof Security",
      description:
        "Blockchain technology ensures every ticket is authentic and cannot be counterfeited.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Coins,
      title: "Earn Crypto Rewards",
      description:
        "Get token rewards for every ticket purchase, event attendance, and community participation.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Repeat,
      title: "True Ownership",
      description:
        "Your tickets are NFTs - trade, sell, or keep them as collectibles forever.",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: TrendingUp,
      title: "Dynamic Pricing",
      description:
        "Fair market pricing with transparent resale mechanisms and royalties for creators.",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose Web3 Ticketing?
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience the future of event ticketing with blockchain technology
            that puts power back in your hands
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
