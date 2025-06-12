import { motion } from "framer-motion";
import { DollarSign, CheckCircle, Users, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function EarningsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const earningMethods = [
    {
      title: "Purchase Rewards",
      icon: DollarSign,
      description: "Earn 2-5% back in tokens on every ticket purchase",
      potential: "Up to $50 per event",
    },
    {
      title: "Attendance Proof",
      icon: CheckCircle,
      description: "Get exclusive tokens for actually attending events",
      potential: "5-20 tokens per event",
    },
    {
      title: "Referral Program",
      icon: Users,
      description: "Earn when friends buy tickets through your link",
      potential: "10% of their purchase",
    },
    {
      title: "NFT Appreciation",
      icon: TrendingUp,
      description: "Your ticket NFTs can increase in value over time",
      potential: "Historical events: 100x+",
    },
  ];

  return (
    <section className="py-20 relative" id="earn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Turn Events Into Earnings
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Unlike traditional ticketing platforms that keep all the value, we
            share the wealth with our community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-4">
              {earningMethods.map((method, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    activeTab === index
                      ? "bg-purple-500/20 border-purple-400"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                  onClick={() => setActiveTab(index)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activeTab === index ? "bg-purple-500" : "bg-white/10"
                      }`}
                    >
                      <method.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">
                        {method.title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {method.description}
                      </p>
                    </div>
                    <div className="text-green-400 font-semibold text-sm">
                      {method.potential}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-8 border border-white/10"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                {(() => {
                  const IconComponent = earningMethods[activeTab].icon;
                  return <IconComponent className="w-8 h-8 text-white" />;
                })()}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {earningMethods[activeTab].title}
              </h3>
              <p className="text-white/80 mb-6">
                {earningMethods[activeTab].description}
              </p>
              <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                <div className="text-green-400 text-sm font-medium">
                  Earning Potential
                </div>
                <div className="text-2xl font-bold text-white">
                  {earningMethods[activeTab].potential}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
