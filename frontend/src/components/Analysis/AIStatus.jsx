import { motion } from "framer-motion";
import {
  CheckCircle2,
  LoaderCircle,
  BrainCircuit,
} from "lucide-react";

function AIStatus({
  currentStep,
  analysisResult,
}) {
  const steps = [
    {
      title: "Face detected",
      icon: CheckCircle2,
    },
    {
      title: "478 landmarks mapped",
      icon: CheckCircle2,
    },
    {
      title: "Head alignment verified",
      icon: CheckCircle2,
    },
    {
      title: "Facial geometry calculated",
      icon: CheckCircle2,
    },
    {
      title: analysisResult
        ? `${analysisResult.faceShape.primaryShape.toUpperCase()} face classified`
        : "Classifying face shape...",
      icon: BrainCircuit,
    },
    {
      title: analysisResult
        ? `${analysisResult.recommendations.length} frame recommendations generated`
        : "Finding matching frames...",
      icon: LoaderCircle,
    },
  ];

  return (
    <div className="rounded-3xl border border-cyan-400/10 bg-white/[0.03] p-6 backdrop-blur-xl">

      <h2 className="mb-6 text-lg font-semibold text-white">
        AI Status
      </h2>

      <div className="space-y-5">

        {steps.map((step, index) => {

          const Icon = step.icon;

          const active = index <= currentStep;

          return (
            <motion.div
              key={step.title}
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: active ? 1 : 0.3,
                x: 0,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.12,
              }}
              className="flex items-center gap-4"
            >

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full
                ${
                  active
                    ? "bg-cyan-400 text-black"
                    : "bg-white/10 text-white/40"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    active &&
                    index === steps.length - 1
                      ? "animate-spin"
                      : ""
                  }`}
                />
              </div>

              <div>

                <p
                  className={`font-medium ${
                    active
                      ? "text-white"
                      : "text-white/40"
                  }`}
                >
                  {step.title}
                </p>

              </div>

            </motion.div>
          );
        })}

      </div>

    </div>
  );
}

export default AIStatus;