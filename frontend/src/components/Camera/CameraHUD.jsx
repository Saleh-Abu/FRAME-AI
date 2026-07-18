import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ScanFace,
  AlertCircle,
} from "lucide-react";

function CameraHUD({ status }) {
  const isReady = status?.ready;
  const faceDetected = status?.faceDetected;

  const message =
    status?.message ||
    (faceDetected
      ? "Hold still..."
      : "Position your face inside the guide.");

  return (
    <div className="absolute bottom-8 left-1/2 z-40 w-[90%] max-w-md -translate-x-1/2">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl border p-5 backdrop-blur-xl transition-all duration-500 ${
          isReady
            ? "border-green-400/30 bg-green-400/10"
            : "border-cyan-400/20 bg-black/70"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                isReady
                  ? "bg-green-400/10"
                  : "bg-cyan-400/10"
              }`}
            >
              {isReady ? (
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              ) : (
                <ScanFace className="h-5 w-5 text-cyan-400" />
              )}
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                Live AI Scan
              </p>

              <p
                className={`mt-1 text-sm font-medium ${
                  isReady
                    ? "text-green-400"
                    : "text-cyan-300"
                }`}
              >
                {isReady
                  ? "Ready to Capture"
                  : "Positioning"}
              </p>
            </div>

          </div>

          {/* Face Status */}

          <div
            className={`h-2.5 w-2.5 rounded-full ${
              faceDetected
                ? "bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]"
                : "bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.8)]"
            }`}
          />

        </div>

        {/* Dynamic AI Instruction */}

        <AnimatePresence mode="wait">

          <motion.div
            key={status?.status || message}
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            transition={{
              duration: 0.25,
            }}
            className="mt-5 flex items-center gap-3"
          >

            {!isReady && (
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-cyan-400" />
            )}

            {isReady && (
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-400" />
            )}

            <p className="text-sm text-white/80">
              {message}
            </p>

          </motion.div>

        </AnimatePresence>

        {/* Status Indicators */}

        <div className="mt-5 grid grid-cols-2 gap-3">

          <div className="rounded-xl bg-white/[0.04] px-4 py-3">

            <p className="text-xs text-white/30">
              Face
            </p>

            <p
              className={`mt-1 text-sm ${
                faceDetected
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {faceDetected
                ? "Detected"
                : "Not Detected"}
            </p>

          </div>

          <div className="rounded-xl bg-white/[0.04] px-4 py-3">

            <p className="text-xs text-white/30">
              Position
            </p>

            <p
              className={`mt-1 text-sm ${
                isReady
                  ? "text-green-400"
                  : "text-cyan-400"
              }`}
            >
              {isReady
                ? "Perfect"
                : "Adjusting"}
            </p>

          </div>

        </div>

      </motion.div>

    </div>
  );
}

export default CameraHUD;