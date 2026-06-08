import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import avatarImg from "../assets/aaku3.png";

function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

type DotSpec = { x: string; y: string; s: string; d: string; type: "blue" | "yellow" };

export default function Hero() {
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);

  const dots = useMemo<DotSpec[]>(() => {
    return Array.from({ length: 33 }, (_, i) => ({
      x:    `${seededRand(i * 5)       * 88 + 4}%`,
      y:    `${seededRand(i * 5 + 1)   * 88 + 4}%`,
      s:    `${(seededRand(i * 5 + 2)  *  4 + 3).toFixed(0)}px`,
      d:    `-${(seededRand(i * 5 + 3) * 3.8).toFixed(1)}s`,
      type: i % 3 === 0 ? "yellow" : "blue",
    }));
  }, []);

  useLayoutEffect(() => {
    const titleEl = heroTitleRef.current;
    if (!titleEl) return;

    const words = Array.from(titleEl.querySelectorAll<HTMLElement>(".heroEmph"));
    if (!words.length) return;

    const ctx = gsap.context(() => {
      const rippleFrom = (centerIndex: number) => {
        gsap.killTweensOf(words);
        words.forEach(w => w.classList.remove("isPulse"));

        const ordered = [...words].sort((a, b) => {
          const ai = words.indexOf(a);
          const bi = words.indexOf(b);
          return Math.abs(ai - centerIndex) - Math.abs(bi - centerIndex);
        });

        ordered.forEach(w => w.classList.add("isPulse"));
        gsap.fromTo(ordered, { y: 0 }, { y: -3, duration: 0.18, ease: "power2.out", stagger: 0.06, yoyo: true, repeat: 1 });
        gsap.to({}, { duration: 0.55, onComplete: () => words.forEach(w => w.classList.remove("isPulse")) });
      };

      const onEnter = (e: Event) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains("heroEmph")) return;
        const idx = words.indexOf(target);
        if (idx >= 0) rippleFrom(idx);
      };

      titleEl.addEventListener("pointerenter", onEnter, true);
      return () => titleEl.removeEventListener("pointerenter", onEnter, true);
    }, titleEl);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero">
      <div className="heroGrid">

        <div className="heroCopy">
          <h1 className="heroTitle" ref={heroTitleRef}>
            I like making data look{" "}
            <span className="heroEmph word-playful">playful</span>,{" "}
            <span className="heroEmph word-fun">fun</span> and{" "}
            <span className="heroEmph word-human">human</span> through code!
          </h1>

          <p className="subtitle">
            Hey there! I'm Aakanksha, a 4th-year Computer Science student specializing
            in Data Science at Ontario Tech University. Welcome to my portfolio!
          </p>

          {/*
            Single action row: Resume (slightly emphasised) + GitHub + LinkedIn.
          */}
          <div className="heroActions">
            <a className="heroAction heroAction--primary" href="/resume.pdf" download>
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M7.5 10.5L3 6h3V1.5h3V6h3L7.5 10.5Z" fill="currentColor"/>
                <rect x="2" y="12" width="11" height="1.5" rx=".75" fill="currentColor"/>
              </svg>
              Resume
            </a>

            <a className="heroAction" href="https://github.com/Aakanksha778"
               target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.603-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10Z"/>
              </svg>
              GitHub
            </a>

            <a className="heroAction" href="https://www.linkedin.com/in/aakanksha-parekh-97b5692b4/"
               target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        <div className="heroPhoto" aria-label="Headshot">
          <div className="heroAvatar heroAvatar--doodles">
            <div className="doodles" aria-hidden="true">
              {dots.map((dot, i) => (
                <span
                  key={i}
                  className={`heroDot heroDot--${dot.type}`}
                  style={{
                    ["--x" as string]: dot.x,
                    ["--y" as string]: dot.y,
                    ["--s" as string]: dot.s,
                    ["--d" as string]: dot.d,
                  } as React.CSSProperties}
                />
              ))}
            </div>
            <img className="headshotImg" src={avatarImg} alt="Aakanksha avatar waving" />
          </div>
        </div>

      </div>
    </section>
  );
}