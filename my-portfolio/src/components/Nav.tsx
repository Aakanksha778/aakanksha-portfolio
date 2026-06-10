import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import gsap from "gsap";

// ── Lotus SVG logo ─────────────────────────────────────────────────────────
function LotusLogo() {
  return (
    <svg
      className="lotusLogo"
      width="30"
      height="30"
      viewBox="-26 -30 52 52"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="-18" cy="-4" rx="11" ry="22"
        transform="rotate(-38,-18,-4)" fill="#A1E3F9" opacity="0.85"/>
      <ellipse cx="-9" cy="-10" rx="9" ry="20"
        transform="rotate(-18,-9,-10)" fill="#578FCA" opacity="0.90"/>
      <ellipse cx="0" cy="-14" rx="8" ry="20" fill="#3674B5"/>
      <ellipse cx="9" cy="-10" rx="9" ry="20"
        transform="rotate(18,9,-10)" fill="#578FCA" opacity="0.90"/>
      <ellipse cx="18" cy="-4" rx="11" ry="22"
        transform="rotate(38,18,-4)" fill="#A1E3F9" opacity="0.85"/>
      <line x1="0" y1="12" x2="0" y2="18"
        stroke="#578FCA" strokeWidth="2" strokeLinecap="round" opacity="0.55"/>
      <path d="M-22,20 Q0,16 22,20"
        stroke="#3674B5" strokeWidth="1.4" strokeLinecap="round" opacity="0.40"/>
    </svg>
  );
}

// ── Component ──────────────────────────────────────────────────────────────
export default function Nav() {
  const navRef       = useRef<HTMLElement | null>(null);
  const brandTextRef = useRef<HTMLSpanElement | null>(null);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location   = useLocation();
  const navigate   = useNavigate();

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Hide on scroll-down
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    let lastY   = window.scrollY;
    let ticking = false;
    const update = () => {
      const y         = window.scrollY;
      const goingDown = y > lastY;
      const nearTop   = y < 12;
      if (nearTop)        nav.classList.remove("nav--hidden");
      else if (goingDown) nav.classList.add("nav--hidden");
      else                nav.classList.remove("nav--hidden");
      lastY   = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on desktop resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 720) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Brand letter-bloom animation
  useLayoutEffect(() => {
    const el = brandTextRef.current;
    if (!el) return;
    const letters = el.querySelectorAll<HTMLElement>(".brandLetter");
    if (!letters.length) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;
    let intervalId: number | null = null;
    const playBloom = () => {
      gsap.killTweensOf(letters);
      const tl = gsap.timeline();
      tl.set(letters, { y: 0, opacity: 1, filter: "blur(0px)", textShadow: "0 0 0px rgba(54,116,181,0)" });
      tl.to(letters, { textShadow: "0 0 14px rgba(54,116,181,0.30)", duration: 0.35, ease: "power2.out", stagger: 0.04 });
      tl.to(letters, { y: -2, duration: 0.18, ease: "sine.inOut", stagger: 0.03, yoyo: true, repeat: 1 }, "-=0.12");
      tl.to(letters, { textShadow: "0 0 0px rgba(54,116,181,0)", duration: 0.55, ease: "power2.out", stagger: 0.02, clearProps: "filter" });
      return tl;
    };
    const onEnter = () => playBloom();
    const ctx = gsap.context(() => {
      playBloom();
      intervalId = window.setInterval(() => {
        if (document.visibilityState !== "visible") return;
        playBloom();
      }, 18000);
      el.addEventListener("pointerenter", onEnter);
    }, el);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      ctx.revert();
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <header className="nav" ref={navRef}>
        <div className="navInner">

          {/* Brand (col 1) */}
          <button
            className="brand"
            onClick={() => scrollTo("top")}
            aria-label="Go to top"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <LotusLogo />
            <span className="brandName" ref={brandTextRef}>
              {"Aakanksha".split("").map((ch, i) => (
                <span key={i} className="brandLetter">
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
          </button>

          {/* Nav links (col 2) */}
          <nav className="links" aria-label="Main navigation">
            <button onClick={() => scrollTo("about")}>About</button>
            <button onClick={() => scrollTo("work")}>Projects</button>
            <button onClick={() => scrollTo("board")}>Side-Quest</button>
            <Link to="/design" className="navLink">Design</Link>
            <button onClick={() => scrollTo("contact")}>Contact</button>
          </nav>

          {/* Right: socials + hamburger (col 3) */}
          <div className="navRight">
            <div className="navSocials">
              <a href="https://github.com/Aakanksha778" target="_blank" rel="noreferrer"
                 aria-label="GitHub" className="navSocialIcon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.603-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10Z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/aakanksha-parekh-97b5692b4/" target="_blank" rel="noreferrer"
                 aria-label="LinkedIn" className="navSocialIcon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Hamburger (mobile only) */}
            <button
              className={`hamburger${menuOpen ? " hamburger--open" : ""}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className="hamLine" />
              <span className="hamLine" />
              <span className="hamLine" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="mobileMenu" role="dialog" aria-label="Mobile navigation">
          <nav className="mobileLinks">
            <button onClick={() => scrollTo("about")}>About</button>
            <button onClick={() => scrollTo("work")}>Projects</button>
            <button onClick={() => scrollTo("board")}>Side-Quest</button>
            <Link to="/design" className="mobileNavLink" onClick={() => setMenuOpen(false)}>Design</Link>
            <button onClick={() => scrollTo("contact")}>Contact</button>
          </nav>
          <div className="mobileSocials">
            <a href="https://github.com/Aakanksha778" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/aakanksha-parekh-97b5692b4/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>
      )}
    </>
  );
}