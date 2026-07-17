import { motion } from "framer-motion";
import { ArrowRight, ScanFace, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20 lg:px-8">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 py-20 lg:grid-cols-2">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-300">
            <Sparkles className="h-4 w-4" />
            AI-Powered Eyewear Intelligence
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Your face.
            <br />
            Your perfect
            <span className="text-cyan-400"> frame.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-white/50">
            FRAME.AI analyzes your facial geometry to discover eyewear designed
            for your unique features.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
           <Link
  to="/scan"
  className="group flex items-center gap-3 rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-cyan-300"
>
  Scan My Face
  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
</Link>

            <button className="rounded-full border border-white/15 px-6 py-3 text-white/70 transition hover:border-white/30 hover:text-white">
              Explore Technology
            </button>
          </div>
        </motion.div>

        {/* Right scanner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative flex h-[420px] w-[320px] items-center justify-center rounded-[3rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl sm:h-[520px] sm:w-[400px]">
            <div className="absolute inset-4 rounded-[2.5rem] border border-cyan-400/10" />

            <ScanFace
              strokeWidth={1}
              className="h-40 w-40 text-cyan-400/70 sm:h-52 sm:w-52"
            />

            {/* Scanning line */}
            <motion.div
              animate={{
                top: ["15%", "85%", "15%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-8 right-8 h-px bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.9)]"
            />

            <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/30">
              <span>Face Analysis</span>
              <span className="text-cyan-400">Active</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;