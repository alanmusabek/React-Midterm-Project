import Icon from "./Icon";
export default function Feedback({
  title,
  children,
  error = false,
  action,
  actionLabel = "Try again",
}) {
  return (
    <div
      className={`feedback ${error ? "error" : ""}`}
      role={error ? "alert" : "status"}
    >
      <span className="feedback-icon">
        <Icon name={error ? "info" : "search"} size={26} />
      </span>
      <h2>{title}</h2>
      <p>{children}</p>
      {action && (
        <button className="button secondary" onClick={action}>
          {actionLabel}
          <Icon name="arrow" size={16} />
        </button>
      )}
    </div>
  );
}
export function LoadingCards() {
  return (
    <div
      role="status"
      aria-label="Loading projects"
      className="card-grid skeleton-grid"
    >
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="skeleton-card">
          <div />
          <span />
          <span />
          <span />
        </div>
      ))}
    </div>
  );
}
