import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function FrameCard({
  frame,
  selected,
  onSelect,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        y: -8,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={() => onSelect(frame)}
      className={`relative cursor-pointer overflow-hidden rounded-3xl border p-5 backdrop-blur-xl transition

      ${
        selected
          ? "border-cyan-400 bg-cyan-400/10"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      {/* AI Match Badge */}

      <div className="absolute right-4 top-4 rounded-full bg-cyan-400 px-3 py-1 text-xs font-semibold text-black">
        {frame.matchScore}% Match
      </div>

      {/* Glasses Preview */}

      <div className="flex h-44 items-center justify-center rounded-2xl bg-black/20">

        <img
          src={frame.image}
          alt={frame.name}
          className="max-h-28 object-contain"
        />

      </div>

      {/* Name */}

      <h3 className="mt-6 text-2xl font-semibold">
        {frame.name}
      </h3>

      <p className="mt-2 text-white/50">
        {frame.style}
      </p>

      <div className="mt-6 flex items-center justify-between">

        <div>

          <p className="text-xs uppercase text-white/30">
            Material
          </p>

          <p className="mt-1">
            {frame.material}
          </p>

        </div>

        <div className="flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 py-2 text-cyan-300">

          <Sparkles className="h-4 w-4" />

          AI Pick

        </div>

      </div>

      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        className="mt-8 w-full rounded-2xl bg-cyan-400 py-3 font-semibold text-black transition hover:bg-cyan-300"
      >
        Try On
      </motion.button>

    </motion.div>
  );
}

export default FrameCard;