import { motion } from "framer-motion";

function ProgressPanel({ progress }) {
  return (
    <div className="rounded-3xl border border-cyan-400/10 bg-white/[0.03] p-6 backdrop-blur-xl">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
            FRAME.AI
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Vision Engine
          </h2>
        </div>

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,1)]"
        />
      </div>

      <div className="mb-3 flex items-center justify-between">

        <span className="text-white/50">
          AI Processing
        </span>

        <motion.span
          key={progress}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-semibold text-cyan-300"
        >
          {progress}%
        </motion.span>

      </div>

      <div className="relative h-3 overflow-hidden rounded-full bg-white/10">

        <motion.div
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            duration: 0.35,
          }}
          className="relative h-full rounded-full bg-cyan-400"
        >

          <motion.div
            animate={{
              x: ["-100%", "300%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.3,
              ease: "linear",
            }}
            className="absolute inset-y-0 w-24 bg-white/50 blur-md"
          />

        </motion.div>

      </div>

      <div className="mt-5 flex justify-between text-xs text-white/30">

        <span>Face Detection</span>

        <span>Geometry</span>

        <span>Recommendation</span>

      </div>

    </div>
  );
}

export default ProgressPanel;