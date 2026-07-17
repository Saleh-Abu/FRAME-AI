import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  ImagePlus,
  LoaderCircle,
  ScanFace,
  ShieldCheck,
  X,
} from "lucide-react";

function Scan() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAnalysisError("Please select a valid image file.");
      return;
    }

    setImageFile(file);
    setSelectedImage(URL.createObjectURL(file));
    setAnalysisError("");
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    setAnalysisError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const analyzeFace = async () => {
    if (!imageFile) {
      setAnalysisError("Please select a photo first.");
      return;
    }

    try {
      setIsAnalyzing(true);
      setAnalysisError("");

      const formData = new FormData();

      formData.append("image", imageFile);

      const response = await fetch(
        "http://127.0.0.1:8000/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          "The analysis service returned an error."
        );
      }

      const data = await response.json();

      console.log("FRAME.AI analysis:", data);

      if (!data.success) {
        setAnalysisError(data.message);
        return;
      }

      navigate("/analysis", {
        state: {
          imageUrl: selectedImage,
          analysisResult: data,
        },
      });
    } catch (error) {
      console.error("FRAME.AI error:", error);

      setAnalysisError(
        "Could not connect to FRAME.AI. Make sure the ML service is running."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-16 text-white">
      {/* Background glow */}
      <div className="absolute h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[160px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-3xl text-center"
      >
        {/* Scan icon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
          <ScanFace className="h-7 w-7 text-cyan-400" />
        </div>

        {/* Heading */}
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
          Facial Analysis
        </p>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          Begin your face scan.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/50">
          Use your camera or upload a clear front-facing photo. FRAME.AI will
          analyze your facial geometry and recommend frames designed for you.
        </p>

        {/* Scan options */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {/* Camera */}
          <button
  onClick={() => navigate("/camera")}
  className="group rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-left transition hover:border-cyan-400/40 hover:bg-cyan-400/[0.05]"
>
  <Camera className="mb-8 h-8 w-8 text-cyan-400" />

  <h2 className="text-xl font-medium">
    Use Camera
  </h2>

  <p className="mt-2 text-sm leading-6 text-white/40">
    Start a live guided facial scan.
  </p>
</button>
        

          {/* Upload */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="group rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-left transition hover:border-cyan-400/40 hover:bg-cyan-400/[0.05]"
          >
            <ImagePlus className="mb-8 h-8 w-8 text-cyan-400" />

            <h2 className="text-xl font-medium">
              Upload Photo
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/40">
              Choose a clear front-facing image.
            </p>
          </button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Image preview */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="relative overflow-hidden rounded-2xl bg-black/40">
              <img
                src={selectedImage}
                alt="Selected face"
                className="h-80 w-full object-contain"
              />

              <button
                type="button"
                onClick={removeImage}
                disabled={isAnalyzing}
                aria-label="Remove selected image"
                className="absolute right-4 top-4 rounded-full bg-black/70 p-2 backdrop-blur-md transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* API validation error */}
            {analysisError && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300"
              >
                {analysisError}
              </motion.div>
            )}

            {/* Analyze button */}
            <button
              type="button"
              onClick={analyzeFace}
              disabled={isAnalyzing}
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-cyan-400 px-6 py-4 font-medium text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isAnalyzing ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  Analyzing your face...
                </>
              ) : (
                <>
                  Analyze My Face
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Privacy */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/30">
          <ShieldCheck className="h-4 w-4" />
          Your image is processed securely.
        </div>
      </motion.div>
    </main>
  );
}

export default Scan;