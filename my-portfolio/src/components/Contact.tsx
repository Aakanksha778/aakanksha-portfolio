export default function Contact() {
  return (
    <section id="contact" className="section contactSection">
      <div className="sectionHead">
        <h2>Contact</h2>
        <p className="muted">Let’s connect — quick links below.</p>
      </div>

      <div className="contactCard">
        <div className="contactCard__glow" aria-hidden="true" />

        <div className="contactCard__inner">
          <div className="contactIntro">
            <h3 className="contactTitle">Reach out</h3>
            <p className="contactSub">
              I’m always down to chat about projects, internships, data viz, and design-y dev work.
            </p>
          </div>

          <div className="contactGrid">
            <a className="contactItem" href="mailto:you@example.com">
              <span className="contactIcon" aria-hidden="true">✉️</span>
              <div className="contactMeta">
                <span className="contactLabel">Email</span>
                <span className="contactValue">you@example.com</span>
              </div>
              <span className="contactArrow" aria-hidden="true">↗</span>
            </a>

            <a className="contactItem" href="https://github.com/yourusername" target="_blank" rel="noreferrer">
              <span className="contactIcon" aria-hidden="true">💻</span>
              <div className="contactMeta">
                <span className="contactLabel">GitHub</span>
                <span className="contactValue">github.com/yourusername</span>
              </div>
              <span className="contactArrow" aria-hidden="true">↗</span>
            </a>

            <a className="contactItem" href="https://linkedin.com/in/yourname" target="_blank" rel="noreferrer">
              <span className="contactIcon" aria-hidden="true">🔗</span>
              <div className="contactMeta">
                <span className="contactLabel">LinkedIn</span>
                <span className="contactValue">linkedin.com/in/yourname</span>
              </div>
              <span className="contactArrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
