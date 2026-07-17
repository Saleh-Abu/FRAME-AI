import { motion } from "framer-motion";
import { Camera, ShieldCheck } from "lucide-react";

function CameraPermission({ onAllow }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex h-full items-center justify-center"
    >
      <div className="w-full max-w-md rounded-3xl border border-cyan-400/10 bg-white/[0.03] p-10 text-center backdrop-blur-xl">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/10">
          <Camera className="h-10 w-10 text-cyan-400" />
        </div>

        <h2 className="mt-8 text-3xl font-bold text-white">
          Camera Access
        </h2>

        <p className="mt-4 text-white/50 leading-7">
          FRAME.AI needs camera access to perform a live facial scan and
          recommend the perfect eyewear.
        </p>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/40">
          <ShieldCheck className="h-4 w-4 text-cyan-400" />
          Your camera feed never leaves your device until you capture.
        </div>

        <button
          onClick={onAllow}
          className="mt-10 w-full rounded-2xl bg-cyan-400 py-4 font-semibold text-black transition hover:bg-cyan-300"
        >
          Allow Camera
        </button>

      </div>
    </motion.div>
  );
}

export default CameraPermission;