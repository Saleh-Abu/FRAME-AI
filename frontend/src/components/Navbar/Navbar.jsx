import { ScanFace } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
            <ScanFace className="h-5 w-5 text-cyan-400" />
          </div>

          <h1 className="text-xl font-semibold tracking-[0.2em] text-white">
            FRAME<span className="text-cyan-400">.AI</span>
          </h1>
        </div>

        <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <a className="transition hover:text-white" href="#technology">
            Technology
          </a>

          <a className="transition hover:text-white" href="#how-it-works">
            How It Works
          </a>

          <a className="transition hover:text-white" href="#about">
            About
          </a>
        </div>
<Link
  to="/scan"
  className="rounded-full border border-white/20 px-5 py-2 text-sm text-white transition hover:border-cyan-400/50 hover:bg-cyan-400/10"
>
  Start Scan
</Link>
      </div>
    </nav>
  );
}

export default Navbar;