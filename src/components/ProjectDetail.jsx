import { useEffect, useState } from "react";
import { projectsApi } from "../api/projects";
import { useBookmark } from "../hooks/useProjects";
import Icon from "./Icon";
import ProjectArt from "./ProjectArt";
import { formatDuration } from "./ProjectCard";
import Feedback from "./Feedback";

function DetailContent({ project, setProject, onChange, onNotify }) {
  const [completed, setCompleted] = useState([]);
  const { busy, toggle } = useBookmark(
    project,
    (saved) => {
      setProject((previous) => ({ ...previous, saved }));
      onChange();
    },
    onNotify,
  );
  return (
    <>
      <div className="detail-heading">
        <div>
          <span className="eyebrow">
            {project.category} / A LITTLE PROJECT, A LITTLE POSSIBILITY
          </span>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <span className="byline">An idea by {project.author}</span>
        </div>
        <button
          className={`button ${project.saved ? "secondary" : "primary"}`}
          onClick={toggle}
          disabled={busy}
        >
          <Icon name="bookmark" />
          {busy
            ? "Saving…"
            : project.saved
              ? "Saved to your collection"
              : "Save this project"}
        </button>
      </div>
      <div className="detail-layout">
        <div>
          <ProjectArt category={project.category} hero />
          <div className="detail-facts">
            <div>
              <span>TIME TO SPARE</span>
              <strong>{formatDuration(project.duration)}</strong>
            </div>
            <div>
              <span>COMFORT LEVEL</span>
              <strong>{project.level}</strong>
            </div>
            <div>
              <span>MATERIALS BUDGET</span>
              <strong>
                {project.budget === 0
                  ? "No extra spend"
                  : `About $${project.budget}`}
              </strong>
            </div>
          </div>
          <p className="fine-print">
            Time and budget are estimates. Use what you already have; digital
            projects assume access to a computer or phone.
          </p>
          <section className="steps-section">
            <div className="steps-heading">
              <h2>Let’s make a start.</h2>
              <span>
                {completed.length} / {project.steps.length} steps
              </span>
            </div>
            <p className="muted">
              Check off each step as you go. Your progress stays for this visit.
            </p>
            <ol className="steps-list">
              {project.steps.map((step, index) => (
                <li
                  key={`${project.id}-step-${index}`}
                  className={completed.includes(index) ? "complete" : ""}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={completed.includes(index)}
                      onChange={(e) =>
                        setCompleted((previous) =>
                          e.target.checked
                            ? [...previous, index]
                            : previous.filter((n) => n !== index),
                        )
                      }
                    />
                    <span className="step-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </label>
                </li>
              ))}
            </ol>
            {completed.length === project.steps.length && (
              <div className="completion" role="status">
                <Icon name="check" />A little project, finished. Make a note of
                what you discovered.
              </div>
            )}
          </section>
        </div>
        <aside className="materials-panel">
          <span className="eyebrow">BEFORE YOU BEGIN</span>
          <h2>Gather a few things.</h2>
          <ul>
            {project.materials.map((material, index) => (
              <li key={`${project.id}-material-${index}`}>
                <Icon name="check" size={17} />
                {material}
              </li>
            ))}
          </ul>
          <div className="materials-note">
            <Icon name="spark" size={22} />
            <p>
              The best version is the one you actually try. Adapt the materials,
              make a mess, and make it yours.
            </p>
          </div>
          <a href="#/add" className="text-link">
            Have an idea of your own? <Icon name="arrow" size={16} />
          </a>
        </aside>
      </div>
    </>
  );
}

export default function ProjectDetail({ id, onChange, onNotify }) {
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setProject(null);
    setError("");
    projectsApi
      .get(id, { signal: controller.signal })
      .then((value) => {
        if (active) setProject(value);
      })
      .catch((reason) => {
        if (active && reason.name !== "AbortError") setError(reason.message);
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, [id, attempt]);
  return (
    <div className="page-content">
      <a className="back-link" href="#/">
        <Icon name="back" size={17} />
        Back to the library
      </a>
      {error ? (
        <Feedback
          title="We couldn’t open that project"
          error
          action={() => setAttempt((n) => n + 1)}
        >
          {error}
        </Feedback>
      ) : project ? (
        <DetailContent
          key={project.id}
          project={project}
          setProject={setProject}
          onChange={onChange}
          onNotify={onNotify}
        />
      ) : (
        <div className="detail-loading" role="status">
          Opening your project…
        </div>
      )}
    </div>
  );
}
