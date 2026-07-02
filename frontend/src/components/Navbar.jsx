import { NavLink, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "Home", testid: "nav-home" },
  { to: "/play", label: "Play", testid: "nav-play" },
  { to: "/puzzles", label: "Puzzles", testid: "nav-puzzles" },
  { to: "/lessons", label: "Lessons", testid: "nav-lessons" },
  { to: "/coach", label: "Coach", testid: "nav-coach" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  return (
    <header
      className="sticky top-0 z-50 glass-strong border-b border-white/10"
      data-testid="site-navbar"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" data-testid="nav-logo">
          <div className="w-8 h-8 rounded-md flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(0,229,255,0.2), rgba(255,215,0,0.2))",
              border: "1px solid rgba(0,229,255,0.4)",
            }}>
            <Sparkles className="w-4 h-4 text-cyan-300" />
          </div>
          <div className="font-bold tracking-wide" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            <span className="text-silver text-xl">ASTRA</span>
            <span className="text-cyan-glow text-xl">APP</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = loc.pathname === l.to || (l.to !== "/" && loc.pathname.startsWith(l.to));
            return (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={l.testid}
                className={`px-4 py-2 text-sm rounded-md transition-all ${
                  active
                    ? "text-cyan-300 bg-white/5"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
                style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.05em", fontWeight: 500 }}
              >
                {l.label.toUpperCase()}
              </NavLink>
            );
          })}
          <Link
            to="/play"
            data-testid="nav-cta-play"
            className="ml-3 btn-gold px-4 py-2 rounded-md text-sm"
            style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.05em" }}
          >
            PLAY NOW
          </Link>
        </nav>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen((v) => !v)}
          data-testid="nav-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 glass-strong" data-testid="nav-mobile-menu">
          <div className="px-6 py-4 flex flex-col gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                data-testid={`${l.testid}-mobile`}
                className="px-3 py-2 text-slate-200 rounded-md hover:bg-white/5"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
