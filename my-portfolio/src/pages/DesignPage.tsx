import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DesignPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".dp-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Nav />
      <div className="dp-root" ref={pageRef}>

        {/* Hero */}
        <div className="dp-heroBlock">
          <div className="dp-heroInner">
            <Link to="/" className="dp-back">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </Link>

            <div className="dp-heroText dp-reveal">
              <p className="dp-eyebrow">Selected Work</p>
              <h1 className="dp-title">Design &amp; Content</h1>
              <p className="dp-subtitle">
                Digital-first work across web, socials, and campaigns. Built for real
                audiences, within real brand constraints, with accessibility
                built in from the start.
              </p>
            </div>

            <div className="dp-toolsRow dp-reveal">
              {["Figma", "Canva Pro", "Adobe Suite", "DaVinci Resolve", "AODA Certified"].map((tool, i, arr) => (
                <span key={tool} className="dp-toolsRow__item">
                  {tool}{i < arr.length - 1 && <span className="dp-toolsRow__dot" aria-hidden="true">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="dp-cases">

          {/* 01 RDM */}
          <article className="dp-case dp-reveal">
            <div className="dp-caseInner">
              <header className="dp-caseHead">
                <span className="dp-caseNum">01</span>
                <div>
                  <h2 className="dp-caseTitle">Research Data Management Storage Finder</h2>
                  <p className="dp-caseMeta">Web · UX Design · Accessibility - Ontario Tech University</p>
                </div>
              </header>

              <div className="dp-caseImg">
                <img
                  src="/design/rdm-hero.png"
                  alt="RDM Storage Finder: two-panel layout with filter questions on the left and a card grid of storage providers on the right"
                />
              </div>

              <div className="dp-caseBody">
                <div className="dp-caseText">
                  <p>
                    Faculty researchers needed to sort through 12+ storage providers,
                    each with different eligibility rules based on data sensitivity,
                    type, and research goal. A static list was too dense to scan
                    quickly, so the tool needed to do the filtering work.
                  </p>
                  <p>
                    I designed a two-panel layout: a question set on the left
                    dynamically greys out ineligible cards on the right as answers
                    are selected. Chosen providers populate a comparison table with
                    export options (TXT, JSON, email to self). Four labelled steps
                    give users a clear mental model without needing written instructions.
                  </p>
                  <p>
                    Built to AODA standards: proper heading hierarchy, no
                    colour-only state changes, contextually embedded links, and
                    alt text on every image. The orange/navy button contrast was
                    chosen to meet WCAG AA while staying on-brand.
                  </p>
                </div>
                <aside className="dp-caseSidebar">
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Role</span>
                    <p>Designer &amp; Developer</p>
                  </div>
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Constraints</span>
                    <p>Ontario Tech brand · AODA · Ubuntu typeface · Existing CMS</p>
                  </div>
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Live</span>
                    <a className="dp-liveLink"
                      href="https://research.ontariotechu.ca/faculty/research-data-management/research-data-storage-finder/index.php"
                      target="_blank" rel="noreferrer">
                      View on Ontario Tech
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                        <path d="M2 9L9 2M9 2H4M9 2V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </aside>
              </div>
            </div>
          </article>

          {/* 02 Naturalink */}
          <article className="dp-case dp-reveal">
            <div className="dp-caseInner">
              <header className="dp-caseHead">
                <span className="dp-caseNum">02</span>
                <div>
                  <h2 className="dp-caseTitle">Naturalink - Patient Care App</h2>
                  <p className="dp-caseMeta">Figma · UI/UX Design · Accessibility - HCI Course Project</p>
                </div>
              </header>

              <div className="dp-threeGrid">
                <figure className="dp-threeGrid__fig dp-threeGrid__fig--main">
                  <img
                    src="/design/naturalink-03.png"
                    alt="Naturalink dashboard showing appointment cards, task list, previous visit summary, and a contextual action dropdown"
                  />
                  <figcaption>Dashboard</figcaption>
                </figure>
                <figure className="dp-threeGrid__fig">
                  <img
                    src="/design/naturalink-1.png"
                    alt="Tele AI chatbot screen with welcome message and voice command input"
                  />
                  <figcaption>Tele AI assistant</figcaption>
                </figure>
                <figure className="dp-threeGrid__fig">
                  <img
                    src="/design/naturalink-02.png"
                    alt="Naturalink onboarding screen with login and sign up options"
                  />
                  <figcaption>Onboarding</figcaption>
                </figure>
              </div>

              <div className="dp-caseBody">
                <div className="dp-caseText">
                  <p>
                    Naturalink was a Human-Computer Interaction course project
                    set during the COVID-19 pandemic. The brief: design a care
                    app for elderly patients who suddenly needed to manage
                    appointments, share prescriptions, and talk to doctors
                    remotely, many without prior experience with digital health tools.
                  </p>
                  <p>
                    Accessibility shaped every decision. Large touch targets,
                    plain language labels, minimal navigation depth, and a
                    single-focus dashboard kept cognitive load low. The screen
                    surfaces only what matters right now: upcoming appointments,
                    the last doctor visit, and a short task list.
                  </p>
                  <p>
                    Tele, the built-in AI assistant, let patients book or
                    reschedule appointments, call their doctor, and upload
                    documents by voice. For users with limited mobility or
                    vision, it removed the need to navigate menus entirely.
                  </p>
                </div>
                <aside className="dp-caseSidebar">
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Role</span>
                    <p>UI/UX Designer</p>
                  </div>
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Tools</span>
                    <p>Figma · Paper Sketching · Accessibility Review</p>
                  </div>
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Focus</span>
                    <p>Elderly users · Remote Care · Voice and AI interaction</p>
                  </div>
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Context</span>
                    <p>HCI course, Ontario Tech University</p>
                  </div>
                </aside>
              </div>
            </div>
          </article>

          {/* 03 Centsora */}
          <article className="dp-case dp-reveal">
            <div className="dp-caseInner">
              <header className="dp-caseHead">
                <span className="dp-caseNum">03</span>
                <div>
                  <h2 className="dp-caseTitle">Centsora - Personal Finance Tracker</h2>
                  <p className="dp-caseMeta">Web Design · UI/UX · Vue 3 - Course Project</p>
                </div>
              </header>

              <div className="dp-twoGrid">
                <figure className="dp-twoGrid__fig">
                  <img
                    src="/design/centsora-01.png"
                    alt="Centsora landing page: bold two-tone headline, budget health card with arched bar chart, and feature checkmarks on a cream background"
                  />
                  <figcaption>Landing page</figcaption>
                </figure>
                <figure className="dp-twoGrid__fig">
                  <img
                    src="/design/centsora-02.png"
                    alt="Centsora sign-up page: split layout with feature highlights left and a minimal account creation form right"
                  />
                  <figcaption>Sign up</figcaption>
                </figure>
              </div>

              <div className="dp-caseBody">
                <div className="dp-caseText">
                  <p>
                    Centsora is a personal finance tracker built for students
                    and families who find budgeting apps too complex. My role was the full UI and visual design.
                    The brief was simple: make
                    something that feels calm rather than stressful to open.
                  </p>
                  <p>
                    The design uses a cream and forest green palette that moves
                    away from the red/amber warning language most finance tools
                    default to. The landing page pairs a two-tone headline with
                    a live budget health card to show the product in context
                    immediately, without a separate demo flow.
                  </p>
                  <p>
                    The registration layout splits the screen: value props and
                    feature highlights on the left, a minimal sign-up form on
                    the right. Every screen was designed to stay focused, one
                    job per view, no sidebar clutter, no overwhelming dashboard
                    on first load.
                  </p>
                </div>
                <aside className="dp-caseSidebar">
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Role</span>
                    <p>UI Designer - Full Visual Design</p>
                  </div>
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Stack</span>
                    <p>Vue 3 · Vite · CSS · Bootstrap</p>
                  </div>
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Live</span>
                    <a className="dp-liveLink"
                      href="https://web-dev-proj-two.vercel.app/"
                      target="_blank" rel="noreferrer">
                      View live site
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                        <path d="M2 9L9 2M9 2H4M9 2V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">GitHub</span>
                    <a className="dp-liveLink"
                      href="https://github.com/Aakanksha778/web-dev-proj.git"
                      target="_blank" rel="noreferrer">
                      View source
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                        <path d="M2 9L9 2M9 2H4M9 2V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </aside>
              </div>
            </div>
          </article>

          {/* 04 Ontario Tech Social */}
          <article className="dp-case dp-reveal">
            <div className="dp-caseInner">
              <header className="dp-caseHead">
                <span className="dp-caseNum">04</span>
                <div>
                  <h2 className="dp-caseTitle">Social Media Campaign</h2>
                  <p className="dp-caseMeta">Instagram · Digital Content · Branding - Ontario Tech VP Research</p>
                </div>
              </header>

              <div className="dp-socialGrid">
                <figure className="dp-socialFig dp-socialFig--square">
                  <img src="/design/social-01.png" alt="Researcher spotlight: Aliyah Jimoh, orange-bordered portrait, NSERC USRA award, editorial navy layout" />
                </figure>
                <figure className="dp-socialFig dp-socialFig--square">
                  <img src="/design/social-02.png" alt="Funding Spotlight: four researchers in circular photo crops on a split navy and white composition" />
                </figure>
                <figure className="dp-socialFig dp-socialFig--portrait">
                  <img src="/design/social-03.png" alt="URA Instagram Story with full-bleed hexagonal background and Apply Now CTA" />
                </figure>
                <figure className="dp-socialFig dp-socialFig--portrait">
                  <img src="/design/social-04.png" alt="Guest Speaker story: Keisha Deoraj with white-bordered portrait on navy hexagonal background" />
                </figure>
              </div>

              <div className="dp-caseBody">
                <div className="dp-caseText">
                  <p>
                    The VP Research office needed a consistent visual system
                    across Instagram, Facebook, and X to market the Undergraduate
                    Research Awards and share departmental news. The audience was
                    students, which meant the content had to feel credible and
                    approachable at the same time.
                  </p>
                  <p>
                    I leaned on editorial layout conventions: split compositions,
                    circular photo crops, and clear typographic hierarchy. The
                    researcher spotlight format was built to feel like recognition,
                    not an announcement. The orange portrait border and short dash
                    before the name were small but deliberate choices to make
                    each person feel like the focus of the post.
                  </p>
                  <p>
                    Every post followed Ontario Tech brand standards with
                    AODA-compliant alt text, proper heading structure in captions,
                    and embedded links rather than bare URLs in copy.
                  </p>
                </div>
                <aside className="dp-caseSidebar">
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Platforms</span>
                    <p>Instagram · Facebook · X · Stories</p>
                  </div>
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Volume</span>
                    <p>Ongoing across four academic years</p>
                  </div>
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Result</span>
                    <p>Funding Spotlight liked by the main Ontario Tech account, 56+ organic engagements</p>
                  </div>
                </aside>
              </div>
            </div>
          </article>

          {/* 05 GDG */}
          <article className="dp-case dp-reveal">
            <div className="dp-caseInner">
              <header className="dp-caseHead">
                <span className="dp-caseNum">05</span>
                <div>
                  <h2 className="dp-caseTitle">Google Developer Group - Content & Reels</h2>
                  <p className="dp-caseMeta">Instagram · Motion · Branding - GDG Ontario Tech Chapter</p>
                </div>
              </header>

              <div className="dp-gdgGrid">
                <figure className="dp-gdgFig dp-gdgFig--tall">
                  <img src="/design/social-05.jpeg" alt="GDG Meet Our New Directors: large serif display type with Google colour semicircle border motif" />
                </figure>
                <figure className="dp-gdgFig dp-gdgFig--tall">
                  <img src="/design/social-06.jpeg" alt="GDG The Judges: dark background, multicolour gradient type, browser-frame photo treatment for Ken Wilson" />
                </figure>
                <figure className="dp-gdgFig dp-gdgFig--tall">
                  <img src="/design/social-07.jpeg" alt="GDG Exam De-Stress Night: dark background with multicolour letter treatment and Google-border photo frames" />
                </figure>
              </div>

              <div className="dp-caseBody">
                <div className="dp-caseText">
                  <p>
                    As content designer for the Google Developer Group chapter
                    at Ontario Tech, I made social graphics and motion reel
                    templates for events, announcements, and member spotlights.
                    The brief was always the same: stay inside Google's brand
                    system, but make it relatable and exciting to students
                  </p>
                  <p>
                    The main tension was Google's four-colour palette, which
                    reads as corporate by default. I pushed it in a different
                    direction: large per-letter gradient headlines, dark
                    backgrounds so the colours could pop at small sizes, and
                    Google's shape motifs used as structural framing instead
                    of decoration.
                  </p>
                  <p>
                    Reel templates were built in DaVinci Resolve to match the
                    static post aesthetic, so the visual identity stayed
                    consistent whether a post was a still or a video.
                  </p>
                </div>
                <aside className="dp-caseSidebar">
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Formats</span>
                    <p>Posts · Stories · Reels · Motion graphics</p>
                  </div>
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Tools</span>
                    <p>Canva Pro · DaVinci Resolve · Adobe Suite</p>
                  </div>
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Constraints</span>
                    <p>Google brand guidelines · Student audience · Volunteer context</p>
                  </div>
                </aside>
              </div>
            </div>
          </article>

          {/* 06 Funding Bulletin */}
          <article className="dp-case dp-reveal">
            <div className="dp-caseInner">
              <header className="dp-caseHead">
                <span className="dp-caseNum">06</span>
                <div>
                  <h2 className="dp-caseTitle">Funding Bulletin</h2>
                  <p className="dp-caseMeta">Content Design · Information Architecture · Accessibility - Ontario Tech University</p>
                </div>
              </header>

              <div className="dp-caseImg">
                <img
                  src="/design/funding-hero.png"
                  alt="Funding Bulletin page showing sidebar navigation, heading hierarchy, and a grant deadline table for Ontario Tech faculty"
                />
              </div>

              <div className="dp-caseBody">
                <div className="dp-caseText">
                  <p>
                    The Funding Bulletin is updated regularly by the Office of
                    Research Services and is the main page faculty use to track
                    active grant opportunities, internal deadlines, and agency
                    news. The content is dense and time-sensitive, so the goal
                    was clarity over everything else.
                  </p>
                  <p>
                    Working inside the university CMS and brand guidelines, I
                    structured the page with a proper heading hierarchy so
                    screen readers and keyboard users could navigate without
                    visual scanning. Links are embedded in context rather than
                    listed as bare URLs. The deadline table uses clear column
                    labels and alternating rows to reduce load without relying
                    on colour alone.
                  </p>
                  <p>
                    AODA compliance here was a structural decision, not a
                    checklist item. The content organisation itself is the
                    accessibility work.
                  </p>
                </div>
                <aside className="dp-caseSidebar">
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Role</span>
                    <p>Content Designer</p>
                  </div>
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Standards</span>
                    <p>AODA · WCAG 2.0 · Ontario Tech brand </p>
                  </div>
                  <div className="dp-sidebarBlock">
                    <span className="dp-sidebarLabel">Live</span>
                    <a className="dp-liveLink"
                      href="https://research.ontariotechu.ca/faculty/funding/funding-bulletin.php"
                      target="_blank" rel="noreferrer">
                      View on Ontario Tech
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                        <path d="M2 9L9 2M9 2H4M9 2V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </aside>
              </div>
            </div>
          </article>

        </div>

        {/* Footer CTA */}
        <div className="dp-footerCta dp-reveal">
          <p className="dp-footerCta__label">Want to work together?</p>
          <a className="dp-footerCta__btn" href="mailto:aakanksha.parekh@ontariotechu.net">
            Get in touch
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <footer className="footer" style={{ textAlign: "center" }}>
          © {new Date().getFullYear()} Aakanksha
        </footer>

      </div>
    </>
  );
}