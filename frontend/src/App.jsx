import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Scan from "./pages/Scan/Scan";
import Analysis from "./pages/Analysis/Analysis";
import Camera from "./pages/Camera/Camera";

function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/camera" element={<Camera />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;