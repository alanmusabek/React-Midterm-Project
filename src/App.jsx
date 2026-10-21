import { useCallback, useEffect, useState } from "react";
import { STORAGE_KEY } from "./api/projects";
import Icon from "./components/Icon";
import ProjectArt from "./components/ProjectArt";
import Catalog from "./components/Catalog";
import ProjectDetail from "./components/ProjectDetail";
import ProjectForm from "./components/ProjectForm";
import About from "./components/About";
import Feedback from "./components/Feedback";

function useRoute() {
  const [route, setRoute] = useState(() =>
    window.location.hash.startsWith("#/") ? window.location.hash.slice(1) : "/",
  );
  useEffect(() => {
    const update = () => {
      if (window.location.hash === "#main-content") return;
      setRoute(window.location.hash.slice(1) || "/");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return route;
}

function Header({ route, saved }) {
  return (
    <header className="site-header">
      <a className="brand" href="#/" aria-label="Weekend Lab home">
        <span className="brand-mark">
          <Icon name="flask" size={25} />
        </span>
        <span>
          weekend<span className="brand-light">lab</span>
        </span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#/" aria-current={route === "/" ? "page" : undefined}>
          Explore
        </a>
        <a
          href="#/saved"
          aria-current={route === "/saved" ? "page" : undefined}
        >
          <Icon name="bookmark" size={16} />
          Saved<span className="nav-count">{saved}</span>
        </a>
        <a
          href="#/about"
          aria-current={route === "/about" ? "page" : undefined}
        >
          About the lab
        </a>
      </nav>
      <a className="button primary header-add" href="#/add">
        <Icon name="plus" size={17} />
        <span>Add a project</span>
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">
          <span className="tiny-spark">✳</span> FOR THE JOY OF TRYING SOMETHING
          NEW
        </span>
        <h1>
          Less scrolling.
          <br />
          More <em>making.</em>
        </h1>
        <p>
          A little inspiration for your time off. Discover small, hands-on
          projects that turn a free afternoon into something good.
        </p>
        <div className="hero-caption">
          <span className="hero-avatar">
            <Icon name="spark" size={17} />
          </span>
          <span>
            No expertise needed.
            <br />
            <strong>Just a curious mind.</strong>
          </span>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-stamp">
          A GOOD WEEKEND
          <br />
          <span>starts with an idea</span>
          <Icon name="spark" size={21} />
        </div>
        <div className="hero-feature">
          <ProjectArt category="Paper & print" hero />
          <div>
            <span>YOUR NEXT LITTLE ADVENTURE</span>
            <h2>A pocket-sized notebook</h2>
            <p>One sheet. Eight pages. Endless possibilities.</p>
            <a href="#/project/lab-001">
              Give it a try <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
        <span className="hero-scribble">make time to make things ↗</span>
      </div>
    </section>
  );
}

export default function App() {
  const route = useRoute();
  const [revision, setRevision] = useState(0);
  const [stats, setStats] = useState({ total: 120, saved: 0 });
  const [notice, setNotice] = useState(null);
  const refresh = useCallback(() => setRevision((n) => n + 1), []);
  const notify = useCallback(
    (message, type = "success") => setNotice({ message, type }),
    [],
  );
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(
      () => setNotice(null),
      notice.type === "error" ? 9000 : 5000,
    );
    return () => clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    const sync = (e) => {
      if (e.key === STORAGE_KEY || e.key === null) refresh();
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [refresh]);
  const isCatalog = route === "/" || route === "/saved";
  const detailId = route.startsWith("/project/")
    ? route.slice("/project/".length)
    : null;
  const isKnown =
    isCatalog || detailId || route === "/add" || route === "/about";
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="site-shell">
        <Header route={route} saved={stats.saved} />
        <main id="main-content">
          {route === "/" && <Hero />}
          <div hidden={!isCatalog}>
            <Catalog
              savedOnly={route === "/saved"}
              revision={revision}
              onStats={setStats}
              onChange={refresh}
              onNotify={notify}
            />
          </div>
          {detailId && (
            <ProjectDetail
              key={detailId}
              id={detailId}
              onChange={refresh}
              onNotify={notify}
            />
          )}
          {route === "/add" && (
            <ProjectForm onCreate={refresh} onNotify={notify} />
          )}
          {route === "/about" && <About onChange={refresh} onNotify={notify} />}
          {!isKnown && (
            <Feedback
              title="This path leads somewhere else"
              action={() => {
                window.location.hash = "/";
              }}
              actionLabel="Back to the library"
            >
              Let’s get you back to a good idea.
            </Feedback>
          )}
        </main>
        <footer className="site-footer">
          <a className="footer-brand" href="#/">
            <Icon name="flask" size={20} />
            weekendlab
          </a>
          <p>Small projects. Good weekends.</p>
          <a href="#/about">
            Made for curious minds <Icon name="arrow" size={15} />
          </a>
        </footer>
      </div>
      {notice && (
        <div
          className={`toast ${notice.type}`}
          role={notice.type === "error" ? "alert" : "status"}
        >
          <Icon name={notice.type === "error" ? "info" : "check"} size={20} />
          <span>{notice.message}</span>
          <button
            aria-label="Dismiss notification"
            onClick={() => setNotice(null)}
          >
            <Icon name="close" size={17} />
          </button>
        </div>
      )}
    </>
  );
}
