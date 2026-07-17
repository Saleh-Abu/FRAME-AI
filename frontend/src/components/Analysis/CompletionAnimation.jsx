import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

function CompletionAnimation({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.2,
          }}
          transition={{
            duration: 0.6,
          }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl"
        >
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
            }}
            className="rounded-3xl border border-cyan-400/20 bg-white/[0.05] px-10 py-10 text-center backdrop-blur-xl"
          >
            <motion.div
              initial={{
                rotate: -180,
                scale: 0,
              }}
              animate={{
                rotate: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <CheckCircle2 className="mx-auto h-20 w-20 text-cyan-400" />
            </motion.div>

            <h2 className="mt-6 text-3xl font-bold">
              Analysis Complete
            </h2>

            <p className="mt-3 text-white/50">
              Preparing your personalized eyewear recommendations...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CompletionAnimation;