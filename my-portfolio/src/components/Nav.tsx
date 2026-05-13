import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Nav() {
  const navRef = useRef<HTMLElement | null>(null);
  const brandTextRef = useRef<HTMLSpanElement | null>(null);

  // Hide nav on scroll down
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const goingDown = y > lastY;
      const nearTop = y < 12;

      if (nearTop) nav.classList.remove("nav--hidden");
      else if (goingDown) nav.classList.add("nav--hidden");
      else nav.classList.remove("nav--hidden");

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Brand bloom (replay + hover)
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

      tl.set(letters, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        textShadow: "0 0 0px rgba(54,116,181,0)",
      });

      tl.to(letters, {
        textShadow: "0 0 14px rgba(54,116,181,0.30)",
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.04,
      });

      tl.to(
        letters,
        {
          y: -2,
          duration: 0.18,
          ease: "sine.inOut",
          stagger: 0.03,
          yoyo: true,
          repeat: 1,
        },
        "-=0.12"
      );

      tl.to(letters, {
        textShadow: "0 0 0px rgba(54,116,181,0)",
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.02,
        clearProps: "filter",
      });

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
    <header className="nav" ref={navRef}>
      <div className="navInner">
        <a className="brand" href="#top" aria-label="Go to top">
          <span className="brandName" ref={brandTextRef}>
            {"Aakanksha".split("").map((ch, i) => (
              <span key={i} className="brandLetter">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </span>
        </a>

        <nav className="links">
          <a href="#about">About</a>
          <a href="#work">Projects</a>
          <a href="#board">Side-Quest</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
