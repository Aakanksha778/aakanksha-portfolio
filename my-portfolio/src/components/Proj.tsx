import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import lungCancerHero from "../assets/proj_pics/lungcancer-hero.png";
import lifeStatsHeatmap from "../assets/proj_pics/livingCon-hero.png";
import auroraHero from "../assets/aurora/login1.png";
import rdmHero from "../assets/proj_pics/rdm-finder-pic.png";
import censoraHero from "../assets/proj_pics/centsora-pic.png";

gsap.registerPlugin(ScrollTrigger);

// ── Types ─────────────────────────────────────────────────────────────────────

type Project = {
  title: string;
  hook: string;
  stack: string[];
  featured?: boolean;
  thumbImg?: string;
  links?: {
    github?: string;
    report?: string;
    caseStudy?: string;
    demo?: string;
    live?: string;
  };
};

// ── Projects data ─────────────────────────────────────────────────────────────

const projects: Project[] = [
  // ── Row 1: Aurora full-width ──────────────────────────────────────────────
  {
    title: "Aurora - Mental Health Support App",
    hook: "A calm, supportive mental-health app with journaling, grounding exercises, and an AI companion.",
    stack: ["Flutter", "Firebase", "Firestore", "Gemini API"],
    featured: true,
    thumbImg: auroraHero,
    links: {
      caseStudy: "/aurora",
      github: "https://github.com/sunnypatell/csci4100u-aurora",
    },
  },

  // Row 2: RDM Finder + Centsora 
  {
    title: "RDM Finder",
    hook: "A research support tool for Ontario Tech University that helps researchers filter and discover dataset and repository options for storing and organising research data.",
    stack: ["HTML", "CSS", "JavaScript", "CMS"],
    featured: false,
    thumbImg: rdmHero,
    links: {
      live: "https://research.ontariotechu.ca/faculty/research-data-management/research-data-storage-finder/index.php",
    },
  },
  {
    title: "Centsora",
    hook: "A personal finance tracker that visualises spending patterns and helps users build better money habits over time.",
    stack: ["React", "CSS", "Finance", "Data Viz"],
    featured: false,
    thumbImg: censoraHero,
    links: {
      live:   "https://web-dev-proj-two.vercel.app/",
      github: "https://github.com/Aakanksha778/web-dev-proj.git",
    },
  },

  // Row 3: Data viz projects 
  {
    title: "Lung Cancer Deep Dive",
    hook: "Exploratory analysis of lifestyle factors and symptoms linked to lung cancer using survey data and visual storytelling.",
    stack: ["Python", "Pandas", "Seaborn", "Matplotlib", "Jupyter"],
    featured: false,
    thumbImg: lungCancerHero,
    links: {
      github: "https://github.com/Aakanksha778/lung-cancer-data-viz",
      report: "https://nbviewer.org/github/Aakanksha778/lung-cancer-data-viz/blob/main/lungCancerReport_clean.ipynb",
    },
  },
  {
    title: "Living Conditions Around the World",
    hook: "A visual exploration of global quality-of-life indicators like safety, health care, pollution, cost of living.",
    stack: ["R", "ggplot2", "Data Viz", "EDA", "Mapping"],
    featured: false,
    thumbImg: lifeStatsHeatmap,
    links: {
      github: "https://github.com/Aakanksha778/living-conditions-analysis",
      report: "https://aakanksha778.github.io/living-conditions-analysis/",
    },
  },
];

// 3D tilt effect
function useTilt(sectionRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    const tiles = Array.from(section.querySelectorAll<HTMLElement>(".tile"));
    type Handler = [HTMLElement, string, EventListener];
    const handlers: Handler[] = [];

    tiles.forEach((tile) => {
      const onMove = (e: MouseEvent) => {
        const rect = tile.getBoundingClientRect();
        const cx = (e.clientX - rect.left) / rect.width - 0.5;
        const cy = (e.clientY - rect.top) / rect.height - 0.5;
        tile.style.transform = `perspective(1000px) rotateY(${cx * 8}deg) rotateX(${-cy * 8}deg) translateY(-6px) scale(1.012)`;
        tile.style.transition = "box-shadow 180ms ease";
      };

      const onLeave = () => {
        tile.style.transition = "transform 420ms ease, box-shadow 180ms ease";
        tile.style.transform = "";
        setTimeout(() => {
          if (tile.style.transform === "") tile.style.transition = "";
        }, 450);
      };

      tile.addEventListener("mousemove", onMove);
      tile.addEventListener("mouseleave", onLeave);
      handlers.push([tile, "mousemove", onMove as EventListener]);
      handlers.push([tile, "mouseleave", onLeave as EventListener]);
    });

    return () => {
      handlers.forEach(([el, type, fn]) => el.removeEventListener(type, fn));
    };
  }, [sectionRef]);
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useTilt(sectionRef);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector(".sectionHead"), {
        y: 22,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(section.querySelectorAll(".tile"), {
        y: 40,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(section.querySelector(".projectsCta"), {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector(".projectsCta"),
          start: "top 88%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="section workSection" ref={sectionRef}>
      <div className="sectionHead">
        <h2>Projects</h2>
      </div>

      <div className="workGrid workGrid--stacked">
        {projects.map((p, i) => {
          const isFeatured = !!p.featured;
          const hasActions =
            !!p.links?.caseStudy ||
            !!p.links?.live ||
            !!p.links?.report ||
            !!p.links?.github ||
            !!p.links?.demo;

          return (
            <article key={i} className={`tile${isFeatured ? " feature" : ""}`}>
              {/* Thumbnail */}
              <div className="tileMedia">
                <div className={`thumb${isFeatured ? " thumb--feature" : ""}`}>
                  <div className="thumb__shine" aria-hidden="true" />
                  {p.thumbImg && (
                    <>
                      <img
                        className="thumb__img"
                        src={p.thumbImg}
                        alt={`${p.title} preview`}
                      />
                      <div className="thumb__overlay" aria-hidden="true" />
                    </>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="tileBody">
                <div className="tileTop">
                  <h3>{p.title}</h3>
                </div>

                {/* Stack — italic Fraunces, no pills */}
                <p className="tileStack">{p.stack.join("  ·  ")}</p>

                <p>{p.hook}</p>

                {hasActions && (
                  <div className="tileActions">
                    {p.links?.caseStudy && (
                      <Link className="btnSmall" to={p.links.caseStudy}>
                        View the App
                      </Link>
                    )}
                    {p.links?.live && (
                      <a
                        className="btnSmall"
                        href={p.links.live}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit Site
                      </a>
                    )}
                    {p.links?.report && (
                      <a
                        className="btnSmall"
                        href={p.links.report}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Report
                      </a>
                    )}
                    {p.links?.demo && (
                      <a
                        className="btnSmall"
                        href={p.links.demo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Play Game
                      </a>
                    )}
                    {p.links?.github && (
                      <a
                        className="btnSmall ghost"
                        href={p.links.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* ── CTA ── */}
      <div className="projectsCta">
        <p className="projectsCtaText">There's more where that came from.</p>
        <Link to="/projects" className="btn projectsCtaBtn">
          Explore all my projects
        </Link>
      </div>
    </section>
  );
}