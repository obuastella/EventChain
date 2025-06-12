import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function ComparisonSection() {
  const comparisons = [
    {
      feature: "Ticket Ownership",
      web2: "Platform owns your ticket",
      web3: "You own your NFT ticket",
      web3Better: true,
    },
    {
      feature: "Resale Control",
      web2: "Platform controls resale & takes huge fees",
      web3: "You control resale, minimal fees",
      web3Better: true,
    },
    {
      feature: "Rewards",
      web2: "No rewards for purchases",
      web3: "Earn tokens on every purchase",
      web3Better: true,
    },
    {
      feature: "Fraud Protection",
      web2: "Easy to counterfeit",
      web3: "Impossible to counterfeit",
      web3Better: true,
    },
    {
      feature: "Long-term Value",
      web2: "Ticket has no value after event",
      web3: "Ticket can appreciate as collectible",
      web3Better: true,
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
            Web3 vs Traditional Ticketing
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            See why blockchain-based ticketing is revolutionizing the industry
          </p>
        </motion.div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-3 bg-white/10 text-white font-semibold">
            <div className="p-4 text-center">Feature</div>
            <div className="p-4 text-center border-x border-white/10">
              Web2 Ticketing
            </div>
            <div className="p-4 text-center">Web3 Ticketing</div>
          </div>

          {comparisons.map((comparison, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 border-t border-white/10 hover:bg-white/5 transition-colors"
            >
              <div className="p-4 text-white font-medium">
                {comparison.feature}
              </div>
              <div className="p-4 text-red-300 border-x border-white/10">
                {comparison.web2}
              </div>
              <div className="p-4 text-green-300 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                {comparison.web3}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
