import { motion } from "framer-motion";

function FaceGuide() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

      {/* Outer glow */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 30px rgba(34,211,238,.15)",
            "0 0 70px rgba(34,211,238,.35)",
            "0 0 30px rgba(34,211,238,.15)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="relative h-[420px] w-[320px] rounded-[180px] border border-cyan-400/20"
      >

        {/* Top Left */}
        <div className="absolute left-0 top-0 h-10 w-10 border-l-4 border-t-4 border-cyan-400 rounded-tl-3xl" />

        {/* Top Right */}
        <div className="absolute right-0 top-0 h-10 w-10 border-r-4 border-t-4 border-cyan-400 rounded-tr-3xl" />

        {/* Bottom Left */}
        <div className="absolute bottom-0 left-0 h-10 w-10 border-l-4 border-b-4 border-cyan-400 rounded-bl-3xl" />

        {/* Bottom Right */}
        <div className="absolute bottom-0 right-0 h-10 w-10 border-r-4 border-b-4 border-cyan-400 rounded-br-3xl" />

        {/* Animated Scanner */}
        <motion.div
          animate={{
            top: ["8%", "92%", "8%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-6 right-6 h-[2px] bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,1)]"
        />

        {/* Center Dot */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,.9)]"
        />

      </motion.div>
    </div>
  );
}

export default FaceGuide;