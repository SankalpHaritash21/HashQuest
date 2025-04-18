import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Hash, Cpu, Power, Terminal } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="tron-grid absolute inset-0 animate-grid-flow opacity-20"></div>

      <div className="relative z-10">
        <header className="py-8">
          <nav className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <Terminal className="w-8 h-8 text-tron-accent" />
                <span className="text-2xl font-mono text-tron-text">
                  HASH_SYS
                </span>
              </motion.div>
            </div>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-mono tron-text mb-8">
              HASH_MATRIX
            </h1>
            <p className="text-xl md:text-2xl text-tron-text/80 mb-12 max-w-3xl mx-auto">
              Enter the grid. Generate secure hashes. Find your prefix.
            </p>
            <Link to="/generator" className="tron-button text-xl">
              Initialize System
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            {[
              {
                icon: Hash,
                title: "Advanced Algorithms",
                desc: "Multiple hashing protocols available",
              },
              {
                icon: Cpu,
                title: "Quantum Processing",
                desc: "High-speed hash generation",
              },
              {
                icon: Power,
                title: "Grid Power",
                desc: "Real-time performance metrics",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i }}
                className="tron-border p-6 bg-black/50 backdrop-blur"
              >
                <feature.icon className="w-12 h-12 text-tron-accent mb-4" />
                <h3 className="text-xl font-mono text-tron-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-tron-text/70">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Home;
