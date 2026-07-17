import { useLocation, Navigate } from "react-router-dom";
import { useState } from "react";

import { frames } from "../../data/frames";

import FrameSelector from "../../components/TryOn/FrameSelector";

function TryOn() {

    const location = useLocation();

    const imageUrl = location.state?.imageUrl;

    const analysisResult = location.state?.analysisResult;

    if (!imageUrl || !analysisResult) {
        return <Navigate to="/scan" replace />;
    }

    const recommendedFrames = frames.filter(frame =>
        analysisResult.recommendations.some(r => r.id === frame.id)
    );

    const [selectedFrame, setSelectedFrame] = useState(
        recommendedFrames[0]
    );

    return (

        <main className="min-h-screen bg-black px-6 py-12 text-white">

            <div className="mx-auto max-w-7xl">

                <FrameSelector
                    frames={recommendedFrames}
                    selectedFrame={selectedFrame}
                    setSelectedFrame={setSelectedFrame}
                />

            </div>

        </main>

    );

}

export default TryOn;