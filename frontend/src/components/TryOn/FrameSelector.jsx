import { motion } from "framer-motion";
import FrameCard from "./FrameCard";

function FrameSelector({
  frames,
  selectedFrame,
  setSelectedFrame,
}) {
  return (
    <div>

      <div className="mb-8">

        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          AI Recommendations
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          Choose Your Frame
        </h2>

      </div>

      <motion.div
        layout
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {frames.map((frame) => (

          <FrameCard
            key={frame.id}
            frame={frame}
            selected={selectedFrame?.id === frame.id}
            onSelect={setSelectedFrame}
          />

        ))}
      </motion.div>

    </div>
  );
}

export default FrameSelector;