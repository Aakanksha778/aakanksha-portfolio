import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Experience data

const experience = [
  {
    period: "Sept 2022 - Apr 2026",
    role: "Marketing & Administrative Assistant",
    place: "Ontario Tech University",
    blurb:
      "Supporting faculty research initiatives, data collection and analysis, project coordination, and administrative operations across multiple departments.",
  },
  {
    period: "Sept 2022 - Oct 2026",
    role: "B.Sc. Computer Science · Data Science",
    place: "Ontario Tech University",
    blurb:
      "Core focus on machine learning, data visualization, algorithms, and web development.",
  },
];

// Skills data

const skills = [
  {
    category: "Languages",
    items: [
      { slug: "python",     label: "python" },
      { slug: "java",       label: "java" },
      { slug: "sql",        label: "sql" },
      { slug: "r",          label: "r" },
      { slug: "typescript", label: "typescript" },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { slug: "react",    label: "react" },
      { slug: "flutter",  label: "flutter" },
      { slug: "firebase", label: "firebase" },
      { slug: "pandas",   label: "pandas" },
      { slug: "ggplot2",  label: "ggplot2" },
    ],
  },
  {
    category: "Visualization",
    items: [
      { slug: "powerbi",    label: "power_bi" },
      { slug: "matplotlib", label: "matplotlib" },
      { slug: "seaborn",    label: "seaborn" },
      { slug: "plotly",     label: "plotly" },
    ],
  },
  {
    category: "Practices",
    items: [
      { slug: "eda",          label: "eda" },
      { slug: "storytelling", label: "data_storytelling" },
      { slug: "uxdesign",     label: "ux_design" },
      { slug: "research",     label: "research_methods" },
    ],
  },
];

// Component

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector(".sectionHead"), {
        y: 22, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 82%", once: true },
      });
      gsap.from(section.querySelectorAll(".bentoCard"), {
        y: 36, opacity: 0, duration: 0.65, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: section, start: "top 76%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section section--alt" ref={sectionRef}>
      <div className="sectionHead">
        <h2>About</h2>
      </div>

      <div className="aboutGrid">

        {/* Intro card */}
        <div className="bentoCard bentoCard--intro">
          <p className="aboutIntroText">
            Data, design, and the space between them. I'm a Computer Science grad
            who spent four years at Ontario Tech building things that try to be as
            thoughtful to look at as they are to use — data visualizations that
            actually communicate, interfaces that don't make people think too hard,
            and marketing content that holds attention.
          </p>
          <p className="aboutIntroText" style={{ marginTop: 14 }}>
            I care about the full picture: clean code, considered typography, and
            that moment when a chart finally clicks for someone who couldn't read
            the raw numbers. Still learning a lot, but always working on something
            that sits at the intersection of front-end development, data, and design.
          </p>
        </div>

        {/* Timeline card */}
        <div className="aboutRight">
          <div className="bentoCard bentoCard--timeline">
            <p className="bentoLabel">Experience</p>
            <ul className="timeline">
              {experience.map((item, i) => (
                <li key={i} className="timelineItem">
                  <span className="timelineDot" />
                  <div className="timelineContent">
                    <span className="timelinePeriod">{item.period}</span>
                    <strong className="timelineRole">{item.role}</strong>
                    <span className="timelinePlace">{item.place}</span>
                    <p className="timelineBlurb">{item.blurb}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Skills card */}
        <div className="bentoCard bentoCard--skills">
          <p className="bentoLabel">Skills &amp; Tools</p>
          <div className="skillsGrid">
            {skills.map((group) => (
              <div key={group.category} className="skillGroup">
                <span className="skillGroupName">{group.category}</span>
                <ul className="skillList">
                  {group.items.map((item) => (
                    <li key={item.slug} className="skillChip">
                      <span className="skillChip__name">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}