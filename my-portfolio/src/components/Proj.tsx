import { Link } from "react-router-dom";
import lungCancerHero from "../assets/proj_pics/lungcancer-hero.png";
import lifeStatsHeatmap from "../assets/proj_pics/livingCon-hero.png";
import auroraHero from "../assets/aurora/login1.png";
import memoryMatchHero from "../assets/proj_pics/memorymatch-hero.png";

type Project = {
  title: string;
  hook: string;
  tags: string[];
  featured?: boolean;
  thumbImg?: string;
  thumbHint?: string;
  links?: {
    github?: string;
    report?: string;
    caseStudy?: string;
    demo?: string;
  };
};

const projects: Project[] = [
  {
    title: "Aurora - Mental Health Support App",
    hook: "A calm, supportive mental-health app with journaling, grounding tools, and an AI companion.",
    tags: ["Flutter", "Firebase", "UX Design", "Mental Health"],
    featured: true,
    thumbImg: auroraHero,
    links: {
      caseStudy: "/aurora",
      github: "https://github.com/sunnypatell/csci4100u-aurora",
    },
  },
  {
    title: "Memory Match - Emoji Game",
    hook: "A playful memory game built with HTML, CSS, and JavaScript, featuring emoji cards, live game stats, and a clean responsive layout.",
    tags: ["HTML", "CSS", "JavaScript", "Game UI"],
    featured: false,
    thumbImg: memoryMatchHero,
    links: {
      demo: "https://aakanksha778.github.io/matching-emoji-game/",
      github: "https://github.com/Aakanksha778/matching-emoji-game",
    },
  },
  {
    title: "Lung Cancer Deep Dive - Data Visualization",
    hook: "Exploratory analysis of lifestyle factors and symptoms associated with lung cancer using survey data and visual storytelling.",
    tags: ["Python", "Pandas", "Seaborn", "Matplotlib", "Jupyter"],
    featured: false,
    thumbImg: lungCancerHero,
    links: {
      github: "https://github.com/Aakanksha778/lung-cancer-data-viz",
      report:
        "https://nbviewer.org/github/Aakanksha778/lung-cancer-data-viz/blob/main/lungCancerReport_clean.ipynb",
    },
  },
  {
    title: "Living Conditions Around the World - Quality of Life Visualization",
    hook: "A visual exploration of global quality-of-life indicators (safety, health care, pollution, cost of living) using multiple chart types and storytelling.",
    tags: ["R", "ggplot2", "Data Viz", "EDA", "Mapping"],
    featured: false,
    thumbImg: lifeStatsHeatmap,
    links: {
      github: "https://github.com/Aakanksha778/living-conditions-analysis",
      report: "https://aakanksha778.github.io/living-conditions-analysis/",
    },
  },
];

export default function Projects() {
  return (
    <section id="work" className="section workSection">
      <div className="sectionHead">
        <h2>Projects</h2>
      </div>

      <div className="workGrid workGrid--equal">
        {projects.map((p, i) => {
          const hasActions =
            !!p.links?.caseStudy ||
            !!p.links?.report ||
            !!p.links?.github ||
            !!p.links?.demo;

          return (
            <article key={i} className="tile">
              <div className="tileMedia">
                <div className="thumb">
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

              <div className="tileBody">
                <div className="tileTop">
                  <h3>{p.title}</h3>
                  {p.featured && <span className="chip">featured</span>}
                </div>

                <p>{p.hook}</p>

                <div className="tagRow">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>

                {hasActions && (
                  <div className="tileActions">
                    {p.links?.caseStudy && (
                      <Link className="btnSmall" to={p.links.caseStudy}>
                        View the App
                      </Link>
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

      <div className="projectsCta">
      <p className="projectsCtaText">
        Explore more of my projects
      </p>

      <Link to="/projects" className="btn projectsCtaBtn">
        View All Projects
      </Link>
    </div>
    </section>
  );
}