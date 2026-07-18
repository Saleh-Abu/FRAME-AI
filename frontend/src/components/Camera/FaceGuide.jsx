import { motion } from "framer-motion";

function FaceGuide({ status, countdown }) {
  const isReady = status?.ready;
  const isCountingDown = countdown > 0;

  // Dynamic colors
  const borderColor = isReady
    ? "border-green-400/40"
    : "border-cyan-400/20";

  const cornerColor = isReady
    ? "border-green-400"
    : "border-cyan-400";

  const scannerColor = isReady
    ? "bg-green-300"
    : "bg-cyan-300";

  const dotColor = isReady
    ? "bg-green-400"
    : "bg-cyan-400";

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">

      <motion.div
        animate={{
          scale: isCountingDown
            ? [1, 1.02, 1]
            : 1,

          boxShadow: isReady
            ? [
                "0 0 30px rgba(74,222,128,.2)",
                "0 0 80px rgba(74,222,128,.5)",
                "0 0 30px rgba(74,222,128,.2)",
              ]
            : [
                "0 0 30px rgba(34,211,238,.15)",
                "0 0 70px rgba(34,211,238,.35)",
                "0 0 30px rgba(34,211,238,.15)",
              ],
        }}
        transition={{
          duration: isCountingDown ? 1 : 2,
          repeat: Infinity,
        }}
        className={`
          relative
          h-[52vh]
          w-[72vw]
          max-h-[560px]
          max-w-[430px]
          min-h-[360px]
          min-w-[280px]
          rounded-[45%]
          border
          transition-colors
          duration-500
          ${borderColor}

          sm:h-[58vh]
          sm:w-[55vw]

          md:h-[60vh]
          md:w-[42vw]

          lg:h-[62vh]
          lg:w-[34vw]

          xl:h-[64vh]
          xl:w-[30vw]
        `}
      >

        {/* Top Left */}
        <div
          className={`
            absolute left-0 top-0
            h-10 w-10
            rounded-tl-3xl
            border-l-4 border-t-4
            transition-colors duration-500
            ${cornerColor}
          `}
        />

        {/* Top Right */}
        <div
          className={`
            absolute right-0 top-0
            h-10 w-10
            rounded-tr-3xl
            border-r-4 border-t-4
            transition-colors duration-500
            ${cornerColor}
          `}
        />

        {/* Bottom Left */}
        <div
          className={`
            absolute bottom-0 left-0
            h-10 w-10
            rounded-bl-3xl
            border-b-4 border-l-4
            transition-colors duration-500
            ${cornerColor}
          `}
        />

        {/* Bottom Right */}
        <div
          className={`
            absolute bottom-0 right-0
            h-10 w-10
            rounded-br-3xl
            border-b-4 border-r-4
            transition-colors duration-500
            ${cornerColor}
          `}
        />

        {/* Animated Scanner */}
        <motion.div
          animate={{
            top: isReady
              ? ["45%", "55%", "45%"]
              : ["8%", "92%", "8%"],
          }}
          transition={{
            duration: isReady ? 1.2 : 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`
            absolute
            left-[8%]
            right-[8%]
            h-[2px]
            ${scannerColor}
          `}
          style={{
            boxShadow: isReady
              ? "0 0 20px rgba(74,222,128,1)"
              : "0 0 20px rgba(34,211,238,1)",
          }}
        />

        {/* Center Dot */}
        <motion.div
          animate={{
            scale: isReady
              ? [1, 1.5, 1]
              : [1, 1.15, 1],
          }}
          transition={{
            duration: isReady ? 0.8 : 1.5,
            repeat: Infinity,
          }}
          className={`
            absolute
            left-1/2
            top-1/2
            h-3
            w-3
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            ${dotColor}
          `}
          style={{
            boxShadow: isReady
              ? "0 0 25px rgba(74,222,128,.9)"
              : "0 0 20px rgba(34,211,238,.9)",
          }}
        />

        {/* Lock-On Ring */}
        {isReady && (
          <motion.div
            initial={{
              scale: 1.15,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            className="
              absolute
              inset-3
              rounded-[45%]
              border
              border-green-400/20
            "
          />
        )}

      </motion.div>
    </div>
  );
}

export default FaceGuide;