import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CameraPermission from "../../components/Camera/CameraPermission";
import CameraPreview from "../../components/Camera/CameraPreview";
import FaceGuide from "../../components/Camera/FaceGuide";
import CameraHUD from "../../components/Camera/CameraHUD";
import Countdown from "../../components/Camera/Countdown";

function Camera() {
  const navigate = useNavigate();

  const [permissionGranted, setPermissionGranted] = useState(false);

  const [cameraStatus, setCameraStatus] = useState({
    faceDetected: false,
    ready: false,
    faceCount: 0,
  });

  const [countdown, setCountdown] = useState(0);

  // Start countdown when backend says camera is ready
  useEffect(() => {
    if (!cameraStatus.ready) {
      setCountdown(0);
      return;
    }

    if (countdown !== 0) return;

    setCountdown(3);
  }, [cameraStatus.ready]);

  // Countdown animation
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      if (countdown === 1) {
        console.log("📸 Capture Image");

        // Next step:
        // Capture image
        // Send to /analyze
        // Navigate to Analysis page

        setCountdown(0);
        return;
      }

      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />

      {/* Back Button */}
      <button
        onClick={() => navigate("/scan")}
        className="absolute left-8 top-8 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-5 py-3 text-white transition hover:border-cyan-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {!permissionGranted ? (
        <CameraPermission
          onAllow={() => setPermissionGranted(true)}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-screen w-full"
        >
          {/* Live Camera */}
          <CameraPreview
            onStatusUpdate={setCameraStatus}
          />

          {/* AI Face Guide */}
          <FaceGuide />

          {/* Countdown */}
          <Countdown value={countdown} />

          {/* AI HUD */}
          <CameraHUD
            status={cameraStatus}
          />
        </motion.div>
      )}
    </main>
  );
}

export default Camera;