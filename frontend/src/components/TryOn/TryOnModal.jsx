import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRef } from "react";

import GlassesOverlay from "./GlassesOverlay";

function TryOnModal({
  open,
  onClose,
  imageUrl,
  frame,
  analysisResult,
}) {
  const imageRef = useRef(null);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl"
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.92,
            y: 30,
          }}
          transition={{
            duration: 0.35,
          }}
          className="relative h-[92vh] w-[96vw] overflow-hidden rounded-3xl border border-cyan-400/10 bg-[#090909]"
        >
          {/* HEADER */}

          <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">

            <div>

              <p className="text-xs uppercase tracking-[0.35em] text-cyan-400">
                FRAME.AI
              </p>

              <h1 className="mt-2 text-4xl font-bold text-white">
                Virtual Try-On
              </h1>

            </div>

            <button
              onClick={onClose}
              className="rounded-full bg-white/5 p-4 transition hover:bg-white/10"
            >
              <X className="h-7 w-7 text-white" />
            </button>

          </div>

          {/* BODY */}

          <div className="grid h-[calc(92vh-90px)] grid-cols-[1.35fr_0.65fr]">

            {/* LEFT SIDE */}

            <div className="relative flex items-center justify-center overflow-hidden bg-black">

              {/* Uploaded Image */}

              <img
                ref={imageRef}
                src={imageUrl}
                alt="Uploaded Face"
                className="max-h-[82vh] max-w-full object-contain"
              />

              {/* AI Overlay */}

              <GlassesOverlay
                frame={frame}
                analysisResult={analysisResult}
                imageRef={imageRef}
              />

            </div>

            {/* RIGHT SIDE */}

            <div className="overflow-y-auto border-l border-white/10 bg-[#101010] p-8">

              <h2 className="text-4xl font-bold text-white">
                {frame?.name}
              </h2>

              <p className="mt-2 text-lg capitalize text-white/40">
                {frame?.style}
              </p>

              {/* Match */}

              <div className="mt-10 rounded-3xl bg-white/5 p-8">

                <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
                  Match Score
                </p>

                <h2 className="mt-4 text-6xl font-bold text-cyan-300">
                  {frame?.matchScore}%
                </h2>

              </div>

              {/* AI */}

              <div className="mt-8 rounded-3xl bg-white/5 p-8">

                <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
                  AI Detection
                </p>

                <div className="mt-8 space-y-5">

                  <div className="flex justify-between">

                    <span className="text-white/50">
                      Face Shape
                    </span>

                    <span className="font-medium capitalize text-white">
                      {analysisResult.faceShape.primaryShape}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-white/50">
                      Confidence
                    </span>

                    <span className="font-medium text-white">
                      {(analysisResult.faceShape.confidence * 100).toFixed(0)}%
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-white/50">
                      Material
                    </span>

                    <span className="font-medium text-white">
                      {frame?.material}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-white/50">
                      Color
                    </span>

                    <span className="font-medium text-white">
                      {frame?.color}
                    </span>

                  </div>

                </div>

              </div>

              {/* Controls */}

              <div className="mt-10 grid grid-cols-2 gap-4">

                <button
                  className="rounded-2xl bg-cyan-400 py-4 font-semibold text-black transition hover:bg-cyan-300"
                >
                  Download
                </button>

                <button
                  onClick={onClose}
                  className="rounded-2xl border border-white/10 py-4 text-white transition hover:bg-white/5"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TryOnModal;