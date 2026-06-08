// src/pages/Aurora.tsx
import { useState, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import dashboardImg from "../assets/aurora/dashboard.png";
import resourcesImg from "../assets/aurora/resources.png";
import anxDepImg from "../assets/aurora/anxiety.png";
import loginImg from "../assets/aurora/login1.png";

const shots = [
  { src: loginImg,     label: "Onboarding",           caption: "Calm, welcoming entry point that sets the emotional tone immediately." },
  { src: dashboardImg, label: "Dashboard",             caption: "At-a-glance mood tracking, journal prompts, and quick-access tools." },
  { src: resourcesImg, label: "Resources Hub",         caption: "Curated support categories with clear, non-clinical language." },
  { src: anxDepImg,    label: "Anxiety & Depression",  caption: "Grounding exercises, breathing animations, and self-check tools." },
];

const stats = [
  { value: "4",       label: "Team members" },
  { value: "~1 month",  label: "Build time" },
  { value: "Flutter", label: "Framework" },
  { value: "4th yr",  label: "Course project" },
];

const contributions = [
  {
    title: "Resources Hub",
    body: "Designed and built the full Resources section including layout, navigation, routing, and all sub-pages from scratch.",
  },
  {
    title: "Support Pages",
    body: "Implemented dedicated pages for Eating Disorders, ADHD Help, and Anxiety & Depression, each with tailored content and interactions.",
  },
  {
    title: "Journaling Flows",
    body: "Created Firestore-backed journaling using Flutter bottom sheets with smooth entry and exit animations.",
  },
  {
    title: "Grounding Tools",
    body: "Built breathing animations, countdown timers, sliders, spinners, and swipe-based exercises for in-the-moment relief.",
  },
  {
    title: "Hotline Logic",
    body: "Added emergency resource escalation with clear, non-alarming messaging and graceful fallbacks when contacts are unavailable.",
  },
  {
    title: "Visual Consistency",
    body: "Maintained a soft, cohesive aesthetic across the dashboard and all resource screens. Typography, spacing, and color all held to a single tone.",
  },
];

export default function Aurora() {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".aurora-hero__title, .aurora-hero__sub, .aurora-hero__actions", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
      });

      gsap.from(".aurora-stat", {
        y: 16,
        opacity: 0,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.3,
      });

      gsap.utils.toArray<HTMLElement>(".aurora-section").forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        });
      });

      gsap.from(".aurora-shot", {
        y: 24,
        opacity: 0,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".aurora-shots-grid",
          start: "top 80%",
          once: true,
        },
      });
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <div className="aurora-page" ref={pageRef}>

      {/* ── Back nav ───────────────────────────────────────────────────────── */}
      <div className="page aurora-back-row">
        <button
          onClick={() => { navigate("/"); setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }), 120); }}
          className="aurora-back-link"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Projects
        </button>
      </div>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <header className="aurora-hero">
        <div className="page aurora-hero__inner">
          <h1 className="aurora-hero__title">Aurora</h1>
          <p className="aurora-hero__sub">
            A mental health companion app built with care, journaling, grounding exercises,
            and an AI-powered support space for moments that feel heavy.
          </p>
          <div className="aurora-hero__actions">
            <a
              className="aurora-hero__btn aurora-hero__btn--primary"
              href="https://github.com/sunnypatell/csci4100u-aurora"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </header>

      {/* ── Stats ──────────────────────────────────────────────────────────── */}
      <div className="page aurora-stats-wrap">
        <div className="aurora-stats-bar">
          {stats.map((s) => (
            <div key={s.label} className="aurora-stat">
              <span className="aurora-stat__value">{s.value}</span>
              <span className="aurora-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <main className="page aurora-main">

        {/* Overview */}
        <section className="aurora-section">
          <span className="aurora-section__label">Overview</span>
          <div className="aurora-overview-grid">
            <div className="aurora-overview__left">
              <h2 className="aurora-section__title">Designed for the hard moments.</h2>
              <p>
                Aurora is a calm, supportive mobile app built to help users pause, reflect, and
                access grounding tools during moments of emotional overwhelm. Rather than
                clinical diagnosis or symptom tracking, Aurora focuses on emotional safety and practical support.
                Offering a soft space to breathe, journal, and find resources when life feels heavy.
              </p>
              <p>
                Built as a 4th-year group project over roughly one month, the app shipped with
                a full Firebase backend, Firestore-backed journals, and an AI companion
                powered by Google's Gemini API.
              </p>
            </div>
            <div className="aurora-overview__right">
              <div className="aurora-meta-block">
                <div className="aurora-meta-row">
                  <span className="aurora-meta-row__key">Stack</span>
                  <span className="aurora-meta-row__val">Flutter, Firebase, Firestore, Gemini API</span>
                </div>
                <div className="aurora-meta-row">
                  <span className="aurora-meta-row__key">Focus</span>
                  <span className="aurora-meta-row__val">UX Design, Animations, Accessibility</span>
                </div>
                <div className="aurora-meta-row">
                  <span className="aurora-meta-row__key">Role</span>
                  <span className="aurora-meta-row__val">Feature lead: Resources Hub & Grounding Tools</span>
                </div>
                <div className="aurora-meta-row">
                  <span className="aurora-meta-row__key">Team</span>
                  <span className="aurora-meta-row__val">4 developers, 1 month sprint</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshots */}
        <section className="aurora-section">
          <span className="aurora-section__label">Selected Screens</span>
          <h2 className="aurora-section__title">The experience, screen by screen.</h2>
          <p className="aurora-section__sub">Click any screen to view it full size.</p>

          <div className="aurora-shots-grid">
            {shots.map((s) => (
              <figure
                key={s.label}
                className="aurora-shot"
                onClick={() => setActiveImg(s.src)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setActiveImg(s.src)}
                aria-label={`View ${s.label} screenshot`}
              >
                <div className="aurora-shot__img-wrap">
                  <img src={s.src} alt={s.label} />
                  <div className="aurora-shot__hover-hint" aria-hidden="true">Expand</div>
                </div>
                <figcaption>
                  <span className="aurora-shot__label">{s.label}</span>
                  <span className="aurora-shot__caption">{s.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Contributions */}
        <section className="aurora-section">
          <span className="aurora-section__label">My Contributions</span>
          <h2 className="aurora-section__title">What I built.</h2>

          <div className="aurora-contributions">
            {contributions.map((item, i) => (
              <div key={item.title} className="aurora-contrib-row">
                <span className="aurora-contrib-row__num">0{i + 1}</span>
                <div className="aurora-contrib-row__content">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ethics */}
        <section className="aurora-section aurora-section--ethics">
          <span className="aurora-section__label">Ethical & UX Considerations</span>
          <h2 className="aurora-section__title">Designed with care, not just code.</h2>

          <div className="aurora-ethics">
            <div className="aurora-ethics__item">
              <h3>Emotional support, not diagnosis.</h3>
              <p>Aurora offers grounding tools and resources, not clinical advice or medical diagnosis. The distinction was intentional from day one.</p>
            </div>
            <div className="aurora-ethics__item">
              <h3>Language calibrated for vulnerability.</h3>
              <p>Every screen uses non-alarming, gentle language written specifically for users who may be in a fragile or overwhelmed state.</p>
            </div>
            <div className="aurora-ethics__item">
              <h3>Escalation is always one tap away.</h3>
              <p>Hotlines and emergency resources are surfaced proactively.</p>
            </div>
            <div className="aurora-ethics__item">
              <h3>No pressure mechanics.</h3>
              <p>No notifications, no streaks, no gamification. Interactions are minimal and unhurried. The app gets out of the way when you need it to.</p>
            </div>
          </div>
        </section>

      </main>

      {/* ── Image modal ────────────────────────────────────────────────────── */}
      {activeImg && (
        <div
          className="auroraModal"
          onClick={() => setActiveImg(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot preview"
        >
          <div className="auroraModalInner" onClick={(e) => e.stopPropagation()}>
            <button
              className="auroraModalClose"
              onClick={() => setActiveImg(null)}
              aria-label="Close preview"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"/>
              </svg>
            </button>
            <img src={activeImg} alt="Expanded screenshot" />
          </div>
        </div>
      )}
    </div>
  );
}