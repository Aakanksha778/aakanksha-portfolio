import React, { useEffect, useState } from "react";

type NoteStyle = "pin" | "tape";
type NoteSize = "note--sm" | "note--md" | "note--lg";

type BoardNote =
  | {
      title: string;
      body: string;
      color: string;
      size: NoteSize;
      x: string;
      y: string;
      r: string;
      style: NoteStyle;
      kind: "link";
      href: string;
      targetBlank?: boolean;
    }
  | {
      title: string;
      body: string;
      color: string;
      size: NoteSize;
      x: string;
      y: string;
      r: string;
      style: NoteStyle;
      kind: "modal";
      modalTitle: string;
      modalContent: React.ReactNode;
    };

const boardNotes = [
  {
    title: "Funding Bulletin",
    body: "Updated weekly with new funding opportunities for researchers, maintained using CMS.",
    color: "note-butter",
    size: "note--lg",
    x: "18",
    y: "26",
    r: "-7deg",
    style: "pin",
    kind: "link",
    href: "https://research.ontariotechu.ca/faculty/funding/funding-bulletin.php",
    targetBlank: true,
  },
  {
    title: "RDM Finder",
    body: "A research data storage finder for Ontario Tech researchers! Live and actively maintained.",
    color: "note-sky",
    size: "note--md",
    x: "49",
    y: "16",
    r: "6deg",
    style: "tape",
    kind: "link",
    href: "https://research.ontariotechu.ca/faculty/research-data-management/research-data-storage-finder/index.php",
    targetBlank: true,
  },
  {
    title: "Digital Marketing",
    body: "Content creation across Instagram, YouTube, X, and Facebook for OT Research.",
    color: "note-rose",
    size: "note--sm",
    x: "77",
    y: "28",
    r: "9deg",
    style: "pin",
    kind: "modal",
    modalTitle: "ORS Socials I have managed",
    modalContent: (
      <div className="boardModalBody">
        <p className="muted" style={{ marginTop: 0 }}>
          Channels I managed and published for:
        </p>
        <ul className="boardModalList">
          <li>
            <a href="https://www.instagram.com/ot_vpresearch/" target="_blank" rel="noreferrer noopener">
              Instagram
            </a>
          </li>
          <li>
            <a href="https://x.com/OT_VPResearch" target="_blank" rel="noreferrer noopener">
              X (Twitter)
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/otvpresearch/" target="_blank" rel="noreferrer noopener">
              Facebook
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@OT_VPResearch" target="_blank" rel="noreferrer noopener">
              YouTube
            </a>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Event Hosting",
    body: "URA Student Research Awards as co-organizer and host for 3 consecutive years.",
    color: "note-mint",
    size: "note--md",
    x: "62",
    y: "55",
    r: "-5deg",
    style: "pin",
    kind: "modal",
    modalTitle: "URA Student Research Awards - Co-Organizer (3 Years)",
    modalContent: (
      <div className="boardModalBody">
        <ul className="boardModalList">
          <li>
            Led end-to-end planning and execution of a large-scale academic awards
            event, coordinating stakeholders across research, administration, and student teams.
          </li>
          <li>
            Managed sponsor relationships, communications, and on-site requirements,
            ensuring deliverables, visibility, and smooth collaboration.
          </li>
          <li>
            Oversaw event logistics including schedules, venue setup, volunteer
            coordination, and real-time issue resolution during live sessions.
          </li>
          <li>
            Planned and coordinated food services and external vendors, balancing
            budget constraints, accessibility needs, and attendee experience.
          </li>
          <li>
            Directed social media strategy across pre-event promotion, live coverage,
            and post-event reporting to maximize engagement and reach.
          </li>
          <li>
            Served as co-organizer across three consecutive years, contributing to
            strategic planning, task delegation, and continuous process improvement.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "University Clubs",
    body: "Design, marketing, community work and workshops across campus clubs.",
    color: "note-mango",
    size: "note--lg",
    x: "33",
    y: "62",
    r: "4deg",
    style: "tape",
    kind: "modal",
    modalTitle: "University Club Socials I have managed",
    modalContent: (
      <div className="boardModalBody">
        <p className="muted" style={{ marginTop: 0 }}>
          Quick links:
        </p>
        <ul className="boardModalList">
          <li>
            <a href="https://www.instagram.com/otu_gdg/" target="_blank" rel="noreferrer noopener">
              GDG Ontario Tech — Instagram
            </a>
          </li>
          <li>
            <a href="https://ca.linkedin.com/company/otu-gddon" target="_blank" rel="noreferrer noopener">
              GDG Ontario Tech — LinkedIn
            </a>
          </li>
          <li>
            <a href="https://linktr.ee/otu.gdsc" target="_blank" rel="noreferrer noopener">
              GDG Ontario Tech — Linktree
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/ot_poetsociety/" target="_blank" rel="noreferrer noopener">
              Poets Society — Instagram
            </a>
          </li>
          <li>
            <a href="https://linktr.ee/otpoetsociety" target="_blank" rel="noreferrer noopener">
              Poets Society — Linktree
            </a>
          </li>
        </ul>
      </div>
    ),
  },
] as const satisfies readonly BoardNote[];

function BoardModal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="boardModalOverlay" role="presentation" onMouseDown={onClose}>
      <div
        className="boardModal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="boardModalHead">
          <h3 className="boardModalTitle">{title}</h3>
          <button className="boardModalClose" onClick={onClose} aria-label="Close">
            x
          </button>
        </div>
        <div className="boardModalContent">{children}</div>
      </div>
    </div>
  );
}

export default function Board() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <section id="board" className="section boardSection">
      <div className="sectionHead">
        <h2>Beyond the Classroom</h2>
      </div>

      <div className="boardWrap">
        <div className="board" role="list" aria-label="Other work board">
          {boardNotes.map((n, i) => {
            const isTape = n.style === "tape";
            const className = `note ${n.color} ${isTape ? "isTape" : "isPin"} ${n.size}`;

            const styleVars = {
              ["--x" as any]: `${n.x}%`,
              ["--y" as any]: `${n.y}%`,
              ["--r" as any]: n.r,
            } as React.CSSProperties;

            if (n.kind === "link") {
              const openNewTab = "targetBlank" in n && n.targetBlank;

              return (
                <a
                  key={i}
                  className={className}
                  href={n.href}
                  style={styleVars}
                  target={openNewTab ? "_blank" : undefined}
                  rel={openNewTab ? "noreferrer noopener" : undefined}
                >
                  {n.style === "pin" && <span className="pin" aria-hidden="true" />}
                  <h3>{n.title}</h3>
                  <p>{n.body}</p>
                </a>
              );
            }

            return (
              <a
                key={i}
                className={className}
                href="#"
                style={styleVars}
                onClick={(e) => {
                  e.preventDefault();
                  openModal(n.modalTitle, n.modalContent);
                }}
              >
                {n.style === "pin" && <span className="pin" aria-hidden="true" />}
                <h3>{n.title}</h3>
                <p>{n.body}</p>
              </a>
            );
          })}
        </div>
      </div>

      <BoardModal open={modalOpen} title={modalTitle} onClose={closeModal}>
        {modalContent}
      </BoardModal>
    </section>
  );
}