import Icon from "./Icon";
import ProjectArt from "./ProjectArt";
import { useBookmark } from "../hooks/useProjects";

export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;
  return minutes % 60
    ? `${Math.floor(minutes / 60)} hr ${minutes % 60} min`
    : `${minutes / 60} hr`;
}
export default function ProjectCard({ project, index, onChange, onNotify }) {
  const { busy, toggle } = useBookmark(project, onChange, onNotify);
  return (
    <article className="project-card">
      <a
        className="art-link"
        href={`#/project/${project.id}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProjectArt category={project.category} variant={index} />
      </a>
      <button
        className={`bookmark ${project.saved ? "is-saved" : ""}`}
        aria-label={`${project.saved ? "Unsave" : "Save"} ${project.title}`}
        aria-pressed={project.saved}
        disabled={busy}
        onClick={toggle}
      >
        <Icon name="bookmark" size={19} />
      </button>
      <div className="card-body">
        <div className="card-eyebrow">
          <span>{project.category}</span>
          <span className="level">
            <span />
            {project.level}
          </span>
        </div>
        <h3>
          <a href={`#/project/${project.id}`}>{project.title}</a>
        </h3>
        <p>{project.description}</p>
        <div className="card-meta">
          <span>
            <Icon name="clock" size={15} />
            {formatDuration(project.duration)}
          </span>
          <span>
            {project.budget === 0
              ? "No extra spend"
              : `Est. $${project.budget}`}
          </span>
          <a
            href={`#/project/${project.id}`}
            aria-label={`View ${project.title}`}
          >
            <Icon name="arrow" size={19} />
          </a>
        </div>
      </div>
    </article>
  );
}
