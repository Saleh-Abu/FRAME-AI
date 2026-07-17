import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import ScannerAnimation from "../../components/Analysis/ScannerAnimation";
import LandmarkOverlay from "../../components/Analysis/LandmarkOverlay";
import ProgressPanel from "../../components/Analysis/ProgressPanel";
import AIStatus from "../../components/Analysis/AIStatus";
import CompletionAnimation from "../../components/Analysis/CompletionAnimation";
import FaceShapeCard from "../../components/Analysis/FaceShapeCard";
import TryOnModal from "../../components/TryOn/TryOnModal";


const stages = [
  "boot",
  "detect",
  "landmarks",
  "geometry",
  "classification",
  "recommendation",
  "complete",
];

function Analysis() {
  const location = useLocation();

  const imageUrl = location.state?.imageUrl;
  const analysisResult = location.state?.analysisResult;

  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [stage, setStage] = useState("boot");

  const [showCompletion, setShowCompletion] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showTryOn, setShowTryOn] = useState(false);
const [selectedFrame, setSelectedFrame] = useState(null);
const openTryOn = (frame) => {
  setSelectedFrame(frame);
  setShowTryOn(true);
};

const closeTryOn = () => {
  setShowTryOn(false);
};

  if (!imageUrl || !analysisResult) {
    return <Navigate to="/scan" replace />;
  }

  useEffect(() => {
    let value = 0;

    const timer = setInterval(() => {
      value += 2;

      if (value > 100) value = 100;

      setProgress(value);

      if (value < 15) {
        setStage(stages[0]);
        setCurrentStep(0);
      } else if (value < 35) {
        setStage(stages[1]);
        setCurrentStep(1);
      } else if (value < 55) {
        setStage(stages[2]);
        setCurrentStep(2);
      } else if (value < 75) {
        setStage(stages[3]);
        setCurrentStep(3);
      } else if (value < 95) {
        setStage(stages[4]);
        setCurrentStep(4);
      } else if (value < 100) {
        setStage(stages[5]);
        setCurrentStep(5);
      } else {
        setStage(stages[6]);

        setShowCompletion(true);

        clearInterval(timer);

        setTimeout(() => {
          setShowCompletion(false);
          setShowResults(true);
        }, 1800);
      }
    }, 90);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-10 text-white">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[220px]" />

      {/* Floating Particles */}

      {Array.from({ length: 18 }).map((_, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
          }}
          className="absolute h-1 w-1 rounded-full bg-cyan-300"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">

        {/* LEFT PANEL */}

        <div className="relative">

          <ScannerAnimation imageUrl={imageUrl} />

          {stage !== "boot" && (
            <LandmarkOverlay />
          )}

        </div>

        {/* RIGHT PANEL */}

        <div className="space-y-6">

          <ProgressPanel
            progress={progress}
          />

          <AIStatus
            currentStep={currentStep}
            analysisResult={analysisResult}
          />

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="rounded-3xl border border-cyan-400/10 bg-white/[0.03] p-6 backdrop-blur-xl"
          >

            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
              LIVE ANALYSIS
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              FRAME.AI Vision Engine
            </h2>

            <p className="mt-5 leading-8 text-white/60">

              {stage === "boot" &&
                "Initializing neural vision engine..."}

              {stage === "detect" &&
                "Detecting facial region..."}

              {stage === "landmarks" &&
                "Mapping 478 facial landmarks..."}

              {stage === "geometry" &&
                "Calculating facial proportions..."}

              {stage === "classification" &&
                "Classifying face shape..."}

              {stage === "recommendation" &&
                "Searching eyewear database..."}

              {stage === "complete" &&
                "Preparing recommendations..."}

            </p>

          </motion.div>

        </div>

      </div>

      <CompletionAnimation
        show={showCompletion}
      />
            {/* ===================== RESULTS DASHBOARD ===================== */}

      {showResults && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
          }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/95 px-6 py-12 backdrop-blur-xl"
        >
          <div className="mx-auto max-w-7xl">

            {/* Header */}

            <motion.div
              initial={{
                opacity: 0,
                y: -30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="mb-12"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                FRAME.AI RESULTS
              </p>

              <h1 className="mt-4 text-5xl font-bold">
                Face Analysis Complete
              </h1>

              <p className="mt-5 max-w-2xl text-lg text-white/50">
                Our AI has analyzed your facial geometry and generated
                personalized eyewear recommendations.
              </p>
            </motion.div>

            {/* Cards */}

            <div className="grid gap-8 lg:grid-cols-2">

              {/* Face Shape */}

              <FaceShapeCard
                faceShape={analysisResult.faceShape}
              />

              {/* Geometry */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2,
                }}
                className="rounded-3xl border border-cyan-400/10 bg-white/[0.03] p-8 backdrop-blur-xl"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                  Geometry
                </p>

                <h2 className="mt-3 text-2xl font-semibold">
                  Facial Measurements
                </h2>

                <div className="mt-8 space-y-5">

                  <div className="flex justify-between">
                    <span className="text-white/50">
                      Face Length
                    </span>

                    <span className="font-semibold">
                      {analysisResult.geometry.faceLength}px
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/50">
                      Cheekbone Width
                    </span>

                    <span className="font-semibold">
                      {analysisResult.geometry.cheekboneWidth}px
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/50">
                      Jaw Width
                    </span>

                    <span className="font-semibold">
                      {analysisResult.geometry.jawWidth}px
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/50">
                      Forehead Width
                    </span>

                    <span className="font-semibold">
                      {analysisResult.geometry.foreheadWidth}px
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/50">
                      Face Ratio
                    </span>

                    <span className="font-semibold text-cyan-300">
                      {analysisResult.geometry.faceRatio}
                    </span>
                  </div>

                </div>

              </motion.div>

            </div>

            {/* Recommendations */}

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
              }}
              className="mt-12"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                Recommended Frames
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                Best Matches
              </h2>

              <div className="mt-8 grid gap-6 md:grid-cols-3">

                {analysisResult.recommendations.map((frame) => (

                  <motion.div
                    key={frame.id}
                    whileHover={{
                      scale: 1.04,
                      y: -8,
                    }}
                    className="rounded-3xl border border-cyan-400/10 bg-white/[0.03] p-6 backdrop-blur-xl"
                  >
                    <div className="flex h-44 items-center justify-center rounded-2xl bg-black/30">

                      <div className="text-center">

                        <div className="text-6xl">
                          👓
                        </div>

                        <p className="mt-3 text-white/30">
                          Frame Preview
                        </p>

                      </div>

                    </div>

                    <h3 className="mt-6 text-2xl font-semibold">
                      {frame.name}
                    </h3>

                    <p className="mt-2 capitalize text-white/40">
                      {frame.style}
                    </p>

                    <div className="mt-5 flex items-center justify-between">

                      <span className="text-cyan-300">
                        {frame.matchScore}% Match
                      </span>

                      <button
  onClick={() => openTryOn(frame)}
  className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-black transition hover:bg-cyan-300"
>
  Try On
</button>

                    </div>

                  </motion.div>

                ))}

              </div>

            </motion.div>

          </div>

        </motion.div>

      )}
      <TryOnModal
  open={showTryOn}
  onClose={closeTryOn}
  imageUrl={imageUrl}
  frame={selectedFrame}
  analysisResult={analysisResult}
/>

    </main>

  );

}

export default Analysis;