// App.tsx
import "./styles.css";
import { HashRouter, Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import RundownDivider from "./components/Div";
import About from "./components/About";
import Projects from "./components/Proj";
import Board from "./components/Board";
import Contact from "./components/Contact";

import Aurora from "./pages/Aurora";
import ProjectsPage from "./pages/ProjectsPage";

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

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aurora" element={<Aurora />} />
         <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </HashRouter>
  );
}
