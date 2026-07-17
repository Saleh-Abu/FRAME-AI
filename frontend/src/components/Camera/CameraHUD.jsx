import { CheckCircle2 } from "lucide-react";

function CameraHUD({ status }) {
  return (
    <div className="absolute bottom-8 left-1/2 z-50 w-[360px] -translate-x-1/2 rounded-3xl border border-cyan-400/10 bg-black/60 p-6 backdrop-blur-xl">

      <p className="mb-4 text-center text-xs uppercase tracking-[0.35em] text-cyan-400">
        Live AI Scan
      </p>

      <div className="space-y-3">

        <div className="flex items-center gap-3">

          <CheckCircle2
            className={`h-5 w-5 ${
              status.faceDetected
                ? "text-green-400"
                : "text-red-500"
            }`}
          />

          <span className="text-white">
            {status.faceDetected
              ? "Face Detected"
              : "No Face Detected"}
          </span>

        </div>

        <div className="flex items-center gap-3">

          <CheckCircle2
            className={`h-5 w-5 ${
              status.ready
                ? "text-green-400"
                : "text-cyan-400"
            }`}
          />

          <span className="text-white">
            {status.ready
              ? "Ready to Capture"
              : "Hold Still..."}
          </span>

        </div>

      </div>

    </div>
  );
}

export default CameraHUD;