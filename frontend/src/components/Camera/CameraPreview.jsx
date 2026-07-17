import { useEffect, useRef } from "react";

function CameraPreview({ onStatusUpdate }) {
  const videoRef = useRef(null);

  useEffect(() => {
    let stream;
    let interval;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        interval = setInterval(captureFrame, 800);
      } catch (err) {
        console.error(err);
      }
    };

    startCamera();

    return () => {
      stream?.getTracks().forEach(track => track.stop());

      clearInterval(interval);
    };
  }, []);

  const captureFrame = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      videoRef.current,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const formData = new FormData();

      formData.append(
        "image",
        blob,
        "camera.jpg"
      );

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/camera-check",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        onStatusUpdate(data);

      } catch (err) {
        console.error(err);
      }

    }, "image/jpeg");
  };

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className="h-full w-full object-cover"
    />
  );
}

export default CameraPreview;