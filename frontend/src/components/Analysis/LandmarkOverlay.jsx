import { motion } from "framer-motion";

function LandmarkOverlay() {
  const points = [];

  // Generate landmark-like positions
  for (let row = 0; row < 18; row++) {
    for (let col = 0; col < 14; col++) {
      points.push({
        id: `${row}-${col}`,
        left: 28 + col * 3.4,
        top: 14 + row * 3.8,
      });
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none">

      {points.map((point, index) => (
        <motion.div
          key={point.id}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0.15, 1, 0.25],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            delay: index * 0.005,
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          style={{
            left: `${point.left}%`,
            top: `${point.top}%`,
          }}
        />
      ))}

    </div>
  );
}

export default LandmarkOverlay;