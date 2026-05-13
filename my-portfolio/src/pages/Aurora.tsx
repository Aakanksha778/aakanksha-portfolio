// src/pages/Aurora.tsx
import { useState } from "react";
import { Link } from "react-router-dom";

import dashboardImg from "../assets/aurora/dashboard.png";
import resourcesImg from "../assets/aurora/resources.png";
import anxDepImg from "../assets/aurora/anxiety.png";

const shots = [
  { src: dashboardImg, label: "Dashboard" },
  { src: resourcesImg, label: "Resources Hub" },
  { src: anxDepImg, label: "Anxiety & Depression Tools" },
];

export default function Aurora() {
  const [activeImg, setActiveImg] = useState<string | null>(null);

  return (
    <div className="page auroraPage">
  <div className="auroraWrap">
    <header className="auroraHeader">

        <h1 className="auroraTitle">Aurora - Mental Health Support App</h1>

        <p className="muted auroraMeta">
          Team of 4 • Mobile Devices (4th year) • Built in ~1 month • Flutter + Firebase • Includes AI chatbot
        </p>

        <div className="auroraCta">
          <a
            className="btn"
            href="https://github.com/sunnypatell/csci4100u-aurora"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <Link className="btn ghost" to="/#work">
            Back to Projects
          </Link>
        </div>
      </header>

      {/* CONTENT */}
      <main className="auroraStack">
        {/* OVERVIEW */}
        <section className="paper auroraCard">
          <h2 className="auroraCardTitle">Overview</h2>
          <p className="auroraPara">
            Aurora is a calm, supportive mental-health app designed to help users pause, reflect,
            and access grounding tools during moments of emotional overwhelm. The experience
            prioritizes emotional safety and thoughtful UX rather than clinical diagnosis.
          </p>
        </section>

        {/* SCREENSHOTS */}
        <section className="paper auroraCard">
          <h2 className="auroraCardTitle">Selected Screens</h2>
          <p className="muted auroraCenterText">
            Click any screen to view it in full size.
          </p>

          <div className="auroraShots">
            {shots.map((s) => (
              <figure
                key={s.label}
                className="auroraShot"
                onClick={() => setActiveImg(s.src)}
              >
                <img src={s.src} alt={s.label} />
                <figcaption className="muted">{s.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ROLE */}
        <section className="paper auroraCard">
          <h2 className="auroraCardTitle">My Role & Contributions</h2>

          <ul className="auroraList">
            <li>Designed and built the full Resources hub layout, navigation, and routing</li>
            <li>
              Implemented support pages: <b>Eating Disorders</b>, <b>ADHD Help</b>, and{" "}
              <b>Anxiety & Depression</b>
            </li>
            <li>Created Firestore-backed journaling flows using bottom sheets</li>
            <li>
              Built grounding tools: breathing animations, timers, spinners, sliders,
              and swipe-based exercises
            </li>
            <li>Added hotline logic with clear emergency messaging and graceful fallbacks</li>
            <li>Maintained a consistent, soft aesthetic across dashboard and resources</li>
          </ul>
        </section>

        {/* ETHICS */}
        <section className="paper auroraCard">
          <h2 className="auroraCardTitle">Ethical & UX Considerations</h2>

          <ul className="auroraList">
            <li>Designed as emotional support — not diagnosis or medical advice</li>
            <li>Careful, non-alarming language throughout the experience</li>
            <li>Clear escalation paths to hotlines and emergency resources</li>
            <li>Low cognitive-load interactions for moments of distress</li>
          </ul>
        </section>

        {/* STACK */}
        <section className="paper auroraCard">
          <h2 className="auroraCardTitle">Tech Stack</h2>

          <div className="tagRow auroraCenterTags">
            {["Flutter", "Firebase", "Firestore", "UX Design", "Animations"].map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>

      {/* IMAGE MODAL */}
      {activeImg && (
        <div className="auroraModal" onClick={() => setActiveImg(null)}>
          <div className="auroraModalInner" onClick={(e) => e.stopPropagation()}>
            <button
                className="auroraModalClose"
                onClick={() => setActiveImg(null)}
                aria-label="Close"
                >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path
                    d="M18 6L6 18M6 6l12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    />
                </svg>
                </button>

            <img src={activeImg} alt="Expanded screen" />
          </div>
        </div>
      )}
    </div>
  );
}
