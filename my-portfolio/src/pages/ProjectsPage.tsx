import Nav from "../components/Nav";
import { Link } from "react-router-dom";

import auroraHero       from "../assets/aurora/login1.png";
import lungCancerHero   from "../assets/proj_pics/lungcancer-hero.png";
import lifeStatsHeatmap from "../assets/proj_pics/livingCon-hero.png";
import dataMiningHero   from "../assets/proj_pics/data-mining-hero.png";
import memoryMatchHero  from "../assets/proj_pics/memorymatch-hero.png";
import rdmHero          from "../assets/proj_pics/rdm-finder-pic.png";
import censoraHero      from "../assets/proj_pics/centsora-pic.png";
import fundingHero      from "../assets/proj_pics/funding-bulletin-pic.png";

type ProjectCard = {
  title: string;
  hook: string;
  stack: string[];
  thumbImg?: string;
  inProgress?: boolean;
  links?: {
    github?: string;
    demo?: string;
    report?: string;
    live?: string;
    caseStudy?: string;
  };
};

type Section = {
  heading: string;
  intro: string;
  projects: ProjectCard[];
};

const sections: Section[] = [
  {
    heading: "Web & UX/UI",
    intro: "Interactive web projects, CMS work, and user-facing experiences built for clarity and engagement.",
    projects: [
      {
        title: "RDM Finder",
        hook: "A research support tool for Ontario Tech University that helps researchers filter and discover dataset and repository options for storing and organising research data.",
        stack: ["HTML", "CSS", "JavaScript", "CMS"],
        thumbImg: rdmHero,
        links: {
          live: "https://research.ontariotechu.ca/faculty/research-data-management/research-data-storage-finder/index.php",
        },
      },
      {
        title: "Centsora",
        hook: "A personal finance tracker that visualises spending patterns and helps users build better money habits over time.",
        stack: ["React", "CSS", "Finance", "Data Viz"],
        thumbImg: censoraHero,
        links: {
          live:   "https://web-dev-proj-two.vercel.app/",
          github: "https://github.com/Aakanksha778/web-dev-proj.git",
        },
      },
      {
        title: "Memory Match - Emoji Game",
        hook: "A playful memory game where players flip emoji cards to find matching pairs while tracking moves and time.",
        stack: ["HTML", "CSS", "JavaScript"],
        thumbImg: memoryMatchHero,
        links: {
          demo:   "https://aakanksha778.github.io/matching-emoji-game/",
          github: "https://github.com/Aakanksha778/matching-emoji-game",
        },
      },
      {
        title: "Funding Bulletin",
        hook: "A CMS-based bulletin page used to share new funding opportunities, deadlines, and research support updates for Ontario Tech researchers.",
        stack: ["CMS", "Web Content", "Research Support"],
        thumbImg: fundingHero,
        links: {
          live: "https://research.ontariotechu.ca/faculty/funding/funding-bulletin.php",
        },
      },
    ],
  },
  {
    heading: "Apps",
    intro: "Mobile and app-focused builds centred on thoughtful design, interaction, and usability.",
    projects: [
      {
        title: "Aurora - Mental Health Support App",
        hook: "A calm, supportive mental-health app with journaling, grounding tools, and an AI companion built for moments that feel overwhelming.",
        stack: ["Flutter", "Firebase", "Firestore", "Gemini API"],
        thumbImg: auroraHero,
        links: {
          caseStudy: "/aurora",
          github:    "https://github.com/sunnypatell/csci4100u-aurora",
        },
      },
      {
        title: "Upcoming App",
        hook: "Something new is in the works. Stay tuned.",
        stack: ["TBD"],
        inProgress: true,
      },
    ],
  },
  {
    heading: "Data Visualization",
    intro: "Visual storytelling and analysis projects that turn raw data into accessible, human insights.",
    projects: [
      {
        title: "Lung Cancer Deep Dive",
        hook: "Exploratory analysis of lifestyle factors and symptoms associated with lung cancer, using survey data and layered visual storytelling.",
        stack: ["Python", "Pandas", "Seaborn", "Matplotlib", "Jupyter"],
        thumbImg: lungCancerHero,
        links: {
          github: "https://github.com/Aakanksha778/lung-cancer-data-viz",
          report: "https://nbviewer.org/github/Aakanksha778/lung-cancer-data-viz/blob/main/lungCancerReport_clean.ipynb",
        },
      },
      {
        title: "Living Conditions Around the World",
        hook: "A visual exploration of global quality-of-life indicators like safety, health care, pollution, and cost of living.",
        stack: ["R", "ggplot2", "EDA", "Mapping"],
        thumbImg: lifeStatsHeatmap,
        links: {
          github: "https://github.com/Aakanksha778/living-conditions-analysis",
          report: "https://aakanksha778.github.io/living-conditions-analysis/",
        },
      },
      {
        title: "Data Mining Visualizations",
        hook: "A collection of visualisations from data mining labs exploring patterns, comparisons, and model-related insights across real-world datasets.",
        stack: ["Python", "Jupyter Notebook", "Data Mining"],
        thumbImg: dataMiningHero,
        links: {
          github: "https://github.com/Aakanksha778/data-mining-L3-L4.git",
        },
      },
    ],
  },
];

// ── Action buttons ────────────────────────────────────────────────────────────
function ProjectActions({ project }: { project: ProjectCard }) {
  const { links } = project;
  if (!links) return null;
  const hasAny = links.caseStudy || links.demo || links.report || links.live || links.github;
  if (!hasAny) return null;

  return (
    <div className="proj-actions">
      {links.caseStudy && (
        <Link className="proj-btn" to={links.caseStudy}>Case Study</Link>
      )}
      {links.demo && (
        <a className="proj-btn" href={links.demo} target="_blank" rel="noreferrer">Play Game</a>
      )}
      {links.report && (
        <a className="proj-btn" href={links.report} target="_blank" rel="noreferrer">View Report</a>
      )}
      {links.live && (
        <a className="proj-btn" href={links.live} target="_blank" rel="noreferrer">Visit Page</a>
      )}
      {links.github && (
        <a className="proj-btn proj-btn--ghost" href={links.github} target="_blank" rel="noreferrer">GitHub</a>
      )}
    </div>
  );
}

// ── Single card ───────────────────────────────────────────────────────────────
function Card({ project }: { project: ProjectCard }) {
  const { inProgress } = project;

  return (
    <article className={`proj-card${inProgress ? " proj-card--wip" : ""}`}>
      <div className="proj-card__media">
        <div className="proj-card__thumb">
          <div className="thumb__shine" aria-hidden="true" />
          {project.thumbImg ? (
            <>
              <img className="thumb__img" src={project.thumbImg} alt={`${project.title} preview`} />
              <div className="thumb__overlay" aria-hidden="true" />
            </>
          ) : (
            <div className="proj-card__thumb-placeholder">
              {inProgress ? "Coming soon" : "Preview"}
            </div>
          )}
        </div>
      </div>

      <div className="proj-card__body">
        <div className="proj-card__title-row">
          <h3 className="proj-card__title">{project.title}</h3>
          {inProgress && <span className="proj-card__wip-dot" aria-label="In progress" />}
        </div>

        {project.stack[0] !== "TBD" && (
          <p className="proj-card__stack">
            {project.stack.join("  ·  ")}
          </p>
        )}

        <p className="proj-card__hook">{project.hook}</p>

        {!inProgress && <ProjectActions project={project} />}

        {inProgress && (
          <p className="proj-card__wip-label">In progress</p>
        )}
      </div>
    </article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <div className="page projectsPage" id="top">
        <main className="projectsPageMain">

          {/* Hero */}
          <section className="section proj-hero-section">
            <div className="proj-hero">
              <div className="proj-hero__text">
                <h1 className="proj-hero__title">Projects</h1>
                <p className="proj-hero__sub">
                  A collection of my work across web experiences, app development, and data visualisation. More experiments and coursework live on GitHub.
                </p>
              </div>
              <a
                className="proj-hero__github"
                href="https://github.com/Aakanksha778"
                target="_blank"
                rel="noreferrer"
              >
                <svg width="17" height="17" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                GitHub
              </a>
            </div>
          </section>

          {/* Project sections */}
          {sections.map((section) => (
            <section key={section.heading} className="section proj-category">
              <div className="proj-category__head">
                <h2 className="proj-category__heading">{section.heading}</h2>
                <p className="proj-category__intro">{section.intro}</p>
              </div>
              <div className="proj-grid">
                {section.projects.map((project) => (
                  <Card key={project.title} project={project} />
                ))}
              </div>
            </section>
          ))}

          {/* Design callout */}
          <section className="section dp-projectsCallout">
            <div className="dp-projectsCalloutInner">
              <p className="dp-projectsCalloutEye">Also</p>
              <h3 className="dp-projectsCalloutTitle">Design &amp; Content Work</h3>
              <p className="dp-projectsCalloutText">
                Social media campaigns, web content, and digital design from four years at
                Ontario Tech University — including AODA-compliant web tools and
                multi-platform content systems.
              </p>
              <Link to="/design" className="dp-projectsCalloutLink">
                View design portfolio &#8599;
              </Link>
            </div>
          </section>

        </main>
        <footer className="footer">© {new Date().getFullYear()} Aakanksha</footer>
      </div>
    </>
  );
}