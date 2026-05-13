import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import avatarImg from "../assets/aaku3.png";

type DotSpec = { x: string; y: string; s: string; d: string };

const blueDots: DotSpec[] = [
  { x: "10%", y: "14%", s: "6px", d: "0s" },
  { x: "18%", y: "32%", s: "4px", d: "-1.2s" },
  { x: "14%", y: "52%", s: "5px", d: "-2.1s" },
  { x: "22%", y: "72%", s: "7px", d: "-2.6s" },
  { x: "12%", y: "90%", s: "3px", d: "-0.7s" },
  { x: "36%", y: "12%", s: "3px", d: "-1.8s" },
  { x: "42%", y: "28%", s: "6px", d: "-3.2s" },
  { x: "34%", y: "46%", s: "4px", d: "-0.9s" },
  { x: "46%", y: "64%", s: "5px", d: "-2.9s" },
  { x: "38%", y: "86%", s: "3px", d: "-1.1s" },
  { x: "56%", y: "18%", s: "5px", d: "-1.4s" },
  { x: "64%", y: "36%", s: "3px", d: "-3.5s" },
  { x: "58%", y: "52%", s: "7px", d: "-2.2s" },
  { x: "66%", y: "70%", s: "4px", d: "-0.6s" },
  { x: "60%", y: "88%", s: "6px", d: "-2.7s" },
  { x: "76%", y: "14%", s: "4px", d: "-2.4s" },
  { x: "86%", y: "28%", s: "6px", d: "-1.0s" },
  { x: "78%", y: "46%", s: "3px", d: "-3.0s" },
  { x: "90%", y: "64%", s: "5px", d: "-2.0s" },
  { x: "82%", y: "84%", s: "7px", d: "-3.8s" },
];

const yellowDots: DotSpec[] = [
  { x: "24%", y: "18%", s: "3px", d: "-0.3s" },
  { x: "28%", y: "40%", s: "5px", d: "-1.7s" },
  { x: "30%", y: "62%", s: "3px", d: "-2.8s" },
  { x: "26%", y: "88%", s: "4px", d: "-0.9s" },
  { x: "50%", y: "10%", s: "4px", d: "-2.2s" },
  { x: "48%", y: "34%", s: "3px", d: "-1.5s" },
  { x: "52%", y: "74%", s: "5px", d: "-3.1s" },
  { x: "70%", y: "22%", s: "3px", d: "-0.6s" },
  { x: "74%", y: "56%", s: "4px", d: "-2.6s" },
  { x: "72%", y: "92%", s: "3px", d: "-1.2s" },
  { x: "92%", y: "18%", s: "4px", d: "-3.0s" },
  { x: "94%", y: "44%", s: "3px", d: "-0.8s" },
  { x: "90%", y: "72%", s: "4px", d: "-2.4s" },
];

export default function Hero() {
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);

  // Hero emphasis ripple
  useLayoutEffect(() => {
    const titleEl = heroTitleRef.current;
    if (!titleEl) return;

    const words = Array.from(titleEl.querySelectorAll<HTMLElement>(".heroEmph"));
    if (!words.length) return;

    const ctx = gsap.context(() => {
      const rippleFrom = (centerIndex: number) => {
        gsap.killTweensOf(words);

        words.forEach((w) => w.classList.remove("isPulse"));

        const ordered = [...words].sort((a, b) => {
          const ai = words.indexOf(a);
          const bi = words.indexOf(b);
          return Math.abs(ai - centerIndex) - Math.abs(bi - centerIndex);
        });

        ordered.forEach((w) => w.classList.add("isPulse"));

        gsap.fromTo(
          ordered,
          { y: 0 },
          {
            y: -3,
            duration: 0.18,
            ease: "power2.out",
            stagger: 0.06,
            yoyo: true,
            repeat: 1,
          }
        );

        gsap.to(
          {},
          {
            duration: 0.55,
            onComplete: () => words.forEach((w) => w.classList.remove("isPulse")),
          }
        );
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
            Hey There! I’m Aakanksha, currently a 4th year Computer Science student specializing in
            Data Science at Ontario Tech University. Welcome to my portfolio!
          </p>

          <div className="cta">
            <a className="btn" href="#work">Some of my work</a>
            <a className="btn ghost" href="#contact">Say Hello</a>
          </div>

          <div className="miniNotes">
            <span className="noteTag">Data Visualization</span>
            <span className="noteTag">React</span>
            <span className="noteTag">Python</span>
            <span className="noteTag">SQL</span>
            <span className="noteTag">Java</span>
            <span className="noteTag">Power BI</span>
          </div>
        </div>

        <div className="heroPhoto" aria-label="Headshot">
          <div className="heroAvatar heroAvatar--doodles">
            <div className="doodles" aria-hidden="true">
              {blueDots.map((dot, i) => (
                <span
                  key={`b-${i}`}
                  className="heroDot heroDot--blue"
                  style={
                    {
                      ["--x" as any]: dot.x,
                      ["--y" as any]: dot.y,
                      ["--s" as any]: dot.s,
                      ["--d" as any]: dot.d,
                    } as React.CSSProperties
                  }
                />
              ))}

              {yellowDots.map((dot, i) => (
                <span
                  key={`y-${i}`}
                  className="heroDot heroDot--yellow"
                  style={
                    {
                      ["--x" as any]: dot.x,
                      ["--y" as any]: dot.y,
                      ["--s" as any]: dot.s,
                      ["--d" as any]: dot.d,
                    } as React.CSSProperties
                  }
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
