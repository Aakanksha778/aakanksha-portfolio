import Nav from "../components/Nav";
import { Link } from "react-router-dom";

import auroraHero from "../assets/aurora/login1.png";
import memoryMatchHero from "../assets/proj_pics/memorymatch-hero.png";
import lungCancerHero from "../assets/proj_pics/lungcancer-hero.png";
import lifeStatsHeatmap from "../assets/proj_pics/livingCon-hero.png";
import dataMiningHero from "../assets/proj_pics/data-mining-hero.png";

type ProjectCard = {
  title: string;
  hook: string;
  tags: string[];
  thumbImg?: string;
  status?: "Completed" | "In Progress";
  links?: {
    github?: string;
    demo?: string;
    report?: string;
    live?: string;
    caseStudy?: string;
  };
};

type Section = {
  title: string;
  intro: string;
  projects: ProjectCard[];
};

const sections: Section[] = [
  {
    title: "Apps",
    intro: "Mobile and app-focused builds centered on thoughtful design, interaction, and usability.",
    projects: [
      {
        title: "Aurora - Mental Health Support App",
        hook: "A calm, supportive mental-health app with journaling, grounding tools, and an AI companion.",
        tags: ["Flutter", "Firebase", "UX Design", "Mental Health"],
        thumbImg: auroraHero,
        status: "Completed",
        links: {
          caseStudy: "/aurora",
          github: "https://github.com/sunnypatell/csci4100u-aurora",
        },
      },
      {
        title: "Upcoming App",
        hook: "TBD",
        tags: ["TBD", "TBD", "TBD"],
        status: "In Progress",
      },
    ],
  },
  {
    title: "Web & UX/UI",
    intro: "Interactive web projects, CMS work, and user-facing experiences built for clarity and engagement.",
    projects: [
      {
        title: "Memory Match - Emoji Game",
        hook: "A playful memory game built with HTML, CSS, and JavaScript where players flip emoji cards to find matching pairs while tracking moves and time.",
        tags: ["HTML", "CSS", "JavaScript", "Game UI"],
        thumbImg: memoryMatchHero,
        status: "Completed",
        links: {
          demo: "https://aakanksha778.github.io/matching-emoji-game/",
          github: "https://github.com/Aakanksha778/matching-emoji-game",
        },
      },
      {
        title: "Funding Bulletin",
        hook: "A CMS-based bulletin page used to share new funding opportunities, deadlines, and research support updates for Ontario Tech researchers.",
        tags: ["CMS", "Web Content", "Research Support"],
        status: "Completed",
        links: {
          live: "https://research.ontariotechu.ca/faculty/funding/funding-bulletin.php",
        },
      },
      {
        title: "RDM Finder",
        hook: "A research support tool for Ontario Tech University that helps researchers filter and discover dataset and repository options for storing and organizing research data.",
        tags: ["HTML", "CSS", "JavaScript", "CMS"],
        status: "In Progress",
      },
    ],
  },
  {
    title: "Data Visualization",
    intro: "Visual storytelling and analysis projects that turn data into accessible insights.",
    projects: [
      {
        title: "Lung Cancer Deep Dive - Data Visualization",
        hook: "Exploratory analysis of lifestyle factors and symptoms associated with lung cancer using survey data and visual storytelling.",
        tags: ["Python", "Pandas", "Seaborn", "Matplotlib", "Jupyter"],
        thumbImg: lungCancerHero,
        status: "Completed",
        links: {
          github: "https://github.com/Aakanksha778/lung-cancer-data-viz",
          report:
            "https://nbviewer.org/github/Aakanksha778/lung-cancer-data-viz/blob/main/lungCancerReport_clean.ipynb",
        },
      },
      {
        title: "Living Conditions Around the World - Quality of Life Visualization",
        hook: "A visual exploration of global quality-of-life indicators including safety, health care, pollution, and cost of living using multiple chart types and storytelling.",
        tags: ["R", "ggplot2", "Data Viz", "EDA", "Mapping"],
        thumbImg: lifeStatsHeatmap,
        status: "Completed",
        links: {
          github: "https://github.com/Aakanksha778/living-conditions-analysis",
          report: "https://aakanksha778.github.io/living-conditions-analysis/",
        },
      },
      {
        title: "Data Mining Visualizations",
        hook: "A collection of small visualizations created for data mining labs and practice work, exploring patterns, comparisons, and model-related insights.",
        tags: ["Python", "Jupyter Notebook", "Data Mining", "Visualization"],
        thumbImg: dataMiningHero,
        status: "Completed",
        links: {
          github: "https://github.com/Aakanksha778/data-mining-L3-L4.git",
        },
      },
    ],
  },
];

function ProjectActions({ project }: { project: ProjectCard }) {
  const hasActions =
    !!project.links?.caseStudy ||
    !!project.links?.demo ||
    !!project.links?.report ||
    !!project.links?.live ||
    !!project.links?.github;

  if (!hasActions) return null;

  return (
    <div className="tileActions">
      {project.links?.caseStudy && (
        <Link className="btnSmall" to={project.links.caseStudy}>
            View Case Study
        </Link>
    )}

      {project.links?.demo && (
        <a
          className="btnSmall"
          href={project.links.demo}
          target="_blank"
          rel="noreferrer"
        >
          Play Game
        </a>
      )}

      {project.links?.report && (
        <a
          className="btnSmall"
          href={project.links.report}
          target="_blank"
          rel="noreferrer"
        >
          View Report
        </a>
      )}

      {project.links?.live && (
        <a
          className="btnSmall"
          href={project.links.live}
          target="_blank"
          rel="noreferrer"
        >
          Visit Page
        </a>
      )}

      {project.links?.github && (
        <a
          className="btnSmall ghost"
          href={project.links.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      )}
    </div>
  );
}

function ProjectCardItem({ project }: { project: ProjectCard }) {
  const isInProgress = project.status === "In Progress";

  return (
    <article className={`tile projectPageTile ${isInProgress ? "projectPageTile--muted" : ""}`}>
      <div className="tileMedia">
        <div className="thumb">
          <div className="thumb__shine" aria-hidden="true" />

          {project.thumbImg ? (
            <>
              <img
                className="thumb__img"
                src={project.thumbImg}
                alt={`${project.title} preview`}
              />
              <div className="thumb__overlay" aria-hidden="true" />
            </>
          ) : (
            <div className="projectThumbPlaceholder">
              <span>{isInProgress ? "Coming Soon" : "Project Preview"}</span>
            </div>
          )}
        </div>
      </div>

      <div className="tileBody">
        <div className="tileTop">
          <h3>{project.title}</h3>
          {project.status && (
            <span className={`chip ${isInProgress ? "chip--progress" : ""}`}>
              {project.status === "In Progress" ? "in progress" : "completed"}
            </span>
          )}
        </div>

        <p>{project.hook}</p>

        <div className="tagRow">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {!isInProgress && <ProjectActions project={project} />}
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <Nav />

      <div className="page projectsPage" id="top">
        <main className="projectsPageMain">
          <section className="section projectsHeroSection">
            <div className="projectsHeroCard paper">
              <div className="projectsHeroText">
                <h1 className="projectsHeroTitle">Projects</h1>
                <p className="projectsHeroIntro">
                  A collection of my work across app development, web experiences,
                  and data visualization. You can also explore more of my builds,
                  coursework, and experiments on GitHub.
                </p>
              </div>

              <div className="projectsHeroActions">
                <a
                  className="btn"
                  href="https://github.com/Aakanksha778"
                  target="_blank"
                  rel="noreferrer"
                >
                  View GitHub
                </a>
              </div>
            </div>
          </section>

          {sections.map((section) => (
            <section key={section.title} className="section projectCategorySection">
              <div className="projectCategoryHead">
                <h2>{section.title}</h2>
                <p className="muted">{section.intro}</p>
              </div>

              <div className="projectCategoryGrid">
                {section.projects.map((project) => (
                  <ProjectCardItem key={project.title} project={project} />
                ))}
              </div>
            </section>
          ))}
        </main>

        <footer className="footer">© {new Date().getFullYear()} Aakanksha</footer>
      </div>
    </>
  );
}