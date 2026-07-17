import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

function FaceShapeCard({ faceShape }) {
  if (!faceShape) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl border border-cyan-400/10 bg-white/[0.03] p-8 backdrop-blur-xl"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10">
          <BrainCircuit className="h-7 w-7 text-cyan-400" />
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            AI DETECTED
          </p>

          <h2 className="mt-1 text-4xl font-bold capitalize">
            {faceShape.primaryShape}
          </h2>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-white/50">
            Confidence
          </span>

          <span className="font-semibold text-cyan-300">
            {(faceShape.confidence * 100).toFixed(0)}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${faceShape.confidence * 100}%`,
            }}
            transition={{
              duration: 1,
            }}
            className="h-full rounded-full bg-cyan-400"
          />
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-black/20 p-5">

        <h3 className="font-semibold">
          AI Explanation
        </h3>

        <p className="mt-3 leading-7 text-white/50">
          Your facial proportions most closely match a{" "}
          <span className="font-semibold text-cyan-300 capitalize">
            {faceShape.primaryShape}
          </span>{" "}
          face shape.

          FRAME.AI analyzed facial geometry,
          forehead width,
          jaw width,
          cheekbone proportions
          and facial ratios
          before generating recommendations.
        </p>

      </div>
    </motion.div>
  );
}

export default FaceShapeCard;