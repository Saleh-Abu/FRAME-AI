import { useEffect, useRef, useState } from "react";
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

  // Reference to the live video element
  const videoRef = useRef(null);

  // Camera permission
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Live AI camera status
  const [cameraStatus, setCameraStatus] = useState({
    faceDetected: false,
    ready: false,
    faceCount: 0,
  });

  // Countdown: 3 -> 2 -> 1
  const [countdown, setCountdown] = useState(0);

  // Prevent multiple analyses
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // --------------------------------------------------
  // CAPTURE CURRENT VIDEO FRAME
  // --------------------------------------------------

  const captureCurrentFrame = async () => {
    const video = videoRef.current;

    if (!video) {
      console.error("Video element not available.");
      return null;
    }

    if (!video.videoWidth || !video.videoHeight) {
      console.error("Video is not ready yet.");
      return null;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      console.error("Could not create canvas context.");
      return null;
    }

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/jpeg",
        0.95
      );
    });
  };

  // --------------------------------------------------
  // SEND CAPTURED IMAGE TO FASTAPI
  // --------------------------------------------------

  const analyzeCapturedImage = async () => {
    try {
      setIsAnalyzing(true);

      const blob = await captureCurrentFrame();

      if (!blob) {
        throw new Error("Could not capture camera frame.");
      }

      const formData = new FormData();

      formData.append(
        "image",
        blob,
        "camera-capture.jpg"
      );

      const response = await fetch(
        "http://127.0.0.1:8000/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          `Analysis request failed: ${response.status}`
        );
      }

      const analysis = await response.json();

      console.log("Analysis Result:", analysis);

      return analysis;
    } catch (error) {
      console.error("Camera analysis error:", error);

      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  // --------------------------------------------------
  // START COUNTDOWN WHEN FACE IS READY
  // --------------------------------------------------

  useEffect(() => {
    if (isAnalyzing) return;

    if (!cameraStatus.ready) {
      setCountdown(0);
      return;
    }

    if (countdown !== 0) return;

    setCountdown(3);
  }, [cameraStatus.ready, isAnalyzing]);

  // --------------------------------------------------
  // COUNTDOWN
  // --------------------------------------------------

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(async () => {
      // Cancel countdown if face is no longer ready
      if (!cameraStatus.ready) {
        setCountdown(0);
        return;
      }

      if (countdown === 1) {
  console.log("📸 Capturing image...");

  const blob = await captureCurrentFrame();

  if (!blob) {
    setCountdown(0);
    return;
  }

  const imageUrl = URL.createObjectURL(blob);

  const formData = new FormData();
  formData.append("image", blob, "camera-capture.jpg");

  try {
    setIsAnalyzing(true);

    const response = await fetch(
      "http://127.0.0.1:8000/analyze",
      {
        method: "POST",
        body: formData,
      }
    );

    const analysisResult = await response.json();

    console.log("Final Analysis:", analysisResult);

    if (!analysisResult.success) {
      console.error(
        "Analysis failed:",
        analysisResult.message
      );

      setCountdown(0);
      setIsAnalyzing(false);
      return;
    }

    navigate("/analysis", {
      state: {
        imageUrl,
        imageFile: blob,
        analysisResult,
      },
    });

  } catch (error) {
    console.error("Analysis error:", error);

    setCountdown(0);
    setIsAnalyzing(false);
  }

  return;
}

      setCountdown((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, cameraStatus.ready]);

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

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
        /* Camera Permission */

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
            videoRef={videoRef}
            onStatusUpdate={setCameraStatus}
          />

          {/* Face Scanner */}

         <FaceGuide
  status={cameraStatus}
  countdown={countdown}
/>

          {/* Countdown */}

          <Countdown value={countdown} />

          {/* Live AI Status */}

          <CameraHUD status={cameraStatus} />

          {/* Analyzing Indicator */}

          {isAnalyzing && (
            <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="rounded-3xl border border-cyan-400/20 bg-black/80 px-10 py-8 text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-cyan-400" />

                <p className="mt-5 text-sm uppercase tracking-[0.3em] text-cyan-400">
                  Analyzing Face
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </main>
  );
}

export default Camera;