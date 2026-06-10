// App.tsx
import "./styles.css";
import { useLayoutEffect, useRef } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import RundownDivider from "./components/Div";
import About from "./components/About";
import Projects from "./components/Proj";
import Board from "./components/Board";
import Contact from "./components/Contact";
import Aurora from "./pages/Aurora";
import ProjectsPage from "./pages/ProjectsPage";
import DesignPage from "./pages/DesignPage";

// ── Page transition wrapper ──────────────────────────────────────────────────
function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          clearProps: "all",
        }
      );
    }, el);
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  return <div ref={ref}>{children}</div>;
}

// ── Home page ────────────────────────────────────────────────────────────────
function Home() {
  return (
    <>
      <Nav />
      <div className="page" id="top">
        <main>
          <Hero />
          <RundownDivider />
          <About />
          <Projects />
          <Board />
          <Contact />
        </main>
        <footer className="footer">© {new Date().getFullYear()} Aakanksha</footer>
      </div>
    </>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/aurora"
          element={
            <PageTransition>
              <Aurora />
            </PageTransition>
          }
        />
        <Route
          path="/projects"
          element={
            <PageTransition>
              <ProjectsPage />
            </PageTransition>
          }
        />
        <Route
          path="/design"
          element={
            <PageTransition>
              <DesignPage />
            </PageTransition>
          }
        />
      </Routes>
    </HashRouter>
  );
}