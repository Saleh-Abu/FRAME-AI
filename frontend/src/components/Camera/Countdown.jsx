import { motion, AnimatePresence } from "framer-motion";

function Countdown({ value }) {
  return (
    <AnimatePresence>

      {value > 0 && (

        <motion.div
          key={value}
          initial={{
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 1.4,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="absolute inset-0 z-50 flex items-center justify-center"
        >

          <div className="rounded-full bg-black/60 px-12 py-8 backdrop-blur-xl">

            <h1 className="text-8xl font-bold text-cyan-300">
              {value}
            </h1>

          </div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}

export default Countdown;