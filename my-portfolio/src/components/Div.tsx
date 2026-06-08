import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RundownDivider() {
  const stageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const left = stage.querySelector<HTMLElement>(".splitLeft");
    const right = stage.querySelector<HTMLElement>(".splitRight");
    const band = stage.querySelector<HTMLElement>(".mintBand");
    const text = stage.querySelector<HTMLElement>(".rundownText");
    const squiggles = stage.querySelectorAll<SVGPathElement>(".squiggle");
    const dots = stage.querySelectorAll<SVGCircleElement>(".dot");

    if (!left || !right || !band || !text) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(text, { opacity: 0, y: 12, filter: "blur(6px)" });
      gsap.set(band, { scaleY: 0, transformOrigin: "top" });

      squiggles.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
      });

      gsap.set(dots, { opacity: 0, scale: 0.92, transformOrigin: "center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "+=110%",
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(left, { xPercent: -6, ease: "none" }, 0)
        .to(right, { xPercent: 6, ease: "none" }, 0)
        .to(band, { scaleY: 1, ease: "none" }, 0.12)
        .to(squiggles, { opacity: 1, ease: "none", stagger: 0.05 }, 0.30)
        .to(squiggles, { strokeDashoffset: 0, ease: "none", stagger: 0.06 }, 0.34)
        .to(dots, { opacity: 1, scale: 1, ease: "none", stagger: 0.02 }, 0.40)
        .to(
          text,
          { opacity: 1, y: 0, filter: reduce ? "none" : "blur(0px)", ease: "none" },
          0.50
        );

      // ✅ force ScrollTrigger to recalc sizes after pin setup
      ScrollTrigger.refresh();
    }, stage);

    return () => ctx.revert();
  }, []);

  return (
    <section className="scrollChapter" aria-label="Rundown divider">
      <div className="chapterStage" ref={stageRef}>
        <div className="split">
          <div className="splitLeft" />
          <div className="splitRight" />
        </div>

        <div className="mintBand" />

        <svg
          className="dreamyOverlay"
          viewBox="0 0 1200 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="squiggle s1"
            d="M120 380 C 220 310, 320 450, 420 380 S 620 310, 720 380 S 920 450, 1080 360"
          />
          <path
            className="squiggle s2"
            d="M160 470 C 260 520, 360 420, 460 470 S 660 520, 760 450 S 960 390, 1100 480"
          />
          <path
            className="squiggle s3"
            d="M200 290 C 300 240, 380 330, 500 300 S 700 240, 820 300 S 980 360, 1120 270"
          />

          <g className="dotCloud">
            <circle className="dot d1" cx="220" cy="220" r="7" />
            <circle className="dot d2" cx="260" cy="260" r="5" />
            <circle className="dot d3" cx="310" cy="210" r="4" />
            <circle className="dot d4" cx="860" cy="240" r="7" />
            <circle className="dot d5" cx="910" cy="280" r="5" />
            <circle className="dot d6" cx="960" cy="230" r="4" />
            <circle className="dot d7" cx="420" cy="560" r="6" />
            <circle className="dot d8" cx="470" cy="590" r="4" />
            <circle className="dot d9" cx="520" cy="555" r="5" />
          </g>
        </svg>

        <div className="rundownWrap">
          <div className="rundownText">
            <div className="rundownTitle">From information to insight</div>
            <div className="rundownSub">A few things I have built</div>
          </div>
        </div>
      </div>
    </section>
  );
}
