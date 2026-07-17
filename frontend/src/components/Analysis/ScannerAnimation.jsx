import { motion } from "framer-motion";

function ScannerAnimation({ imageUrl }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
      }}
      className="relative overflow-hidden rounded-[36px] border border-cyan-400/10 bg-white/[0.03] p-4 backdrop-blur-xl"
    >

      <div className="relative overflow-hidden rounded-[28px]">

        <img
          src={imageUrl}
          alt=""
          className="h-[640px] w-full object-contain"
        />

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />

        {/* AI Glow */}

        <motion.div
          animate={{
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="absolute inset-0 bg-cyan-400/10"
        />

        {/* Scanner */}

        <motion.div
          animate={{
            y: [
              -260,
              260,
              -260,
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
          className="absolute left-0 right-0 top-1/2 h-[3px] bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,1)]"
        />

        {/* Glow */}

        <motion.div
          animate={{
            y: [
              -260,
              260,
              -260,
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
          className="absolute left-0 right-0 top-1/2 h-20 bg-gradient-to-b from-cyan-400/20 to-transparent blur-xl"
        />

        {/* Frame */}

        <div className="absolute inset-6 rounded-[24px] border border-cyan-400/20" />

      </div>

    </motion.div>
  );
}

export default ScannerAnimation;