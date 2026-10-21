import { CATEGORIES } from "../api/projects";
import Icon, { categoryIcon } from "./Icon";

export default function FilterPanel({
  filters,
  onChange,
  counts = {},
  total = 120,
  onReset,
}) {
  return (
    <aside className="filter-panel" aria-label="Filter projects">
      <div className="filter-heading">
        <h2>
          <Icon name="sliders" size={17} />
          Filters
        </h2>
        <button className="text-button" onClick={onReset}>
          Reset
        </button>
      </div>
      <fieldset className="categories">
        <legend>YOUR KIND OF CURIOUS</legend>
        <button
          className={filters.category === "All" ? "selected" : ""}
          onClick={() => onChange("category", "All")}
          aria-pressed={filters.category === "All"}
        >
          <Icon name="grid" size={17} />
          <span>All projects</span>
          <small>{total}</small>
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={filters.category === category ? "selected" : ""}
            aria-pressed={filters.category === category}
            onClick={() => onChange("category", category)}
          >
            <Icon name={categoryIcon[category]} size={17} />
            <span>{category}</span>
            <small>{counts[category] ?? 20}</small>
          </button>
        ))}
      </fieldset>
      <div className="filter-selects">
        <label>
          Time to spare
          <select
            value={filters.duration}
            onChange={(e) => onChange("duration", e.target.value)}
          >
            <option value="All">Any duration</option>
            <option value="30">30 minutes or less</option>
            <option value="60">1 hour or less</option>
            <option value="120">2 hours or less</option>
          </select>
        </label>
        <label>
          Comfort level
          <select
            value={filters.level}
            onChange={(e) => onChange("level", e.target.value)}
          >
            <option value="All">All levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
          </select>
        </label>
        <label>
          Materials budget
          <select
            value={filters.budget}
            onChange={(e) => onChange("budget", e.target.value)}
          >
            <option value="All">Any budget</option>
            <option value="0">No extra spend</option>
            <option value="5">Up to $5</option>
            <option value="10">Up to $10</option>
          </select>
        </label>
      </div>
      <div className="sidebar-note">
        <Icon name="spark" size={23} />
        <h3>
          A little time.
          <br />A new possibility.
        </h3>
        <p>You don’t need to be an expert. Just bring your curiosity.</p>
      </div>
    </aside>
  );
}
