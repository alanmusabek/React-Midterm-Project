import { useEffect, useState } from "react";
import { PAGE_SIZE } from "../api/projects";
import { useDebouncedValue, useProjects } from "../hooks/useProjects";
import FilterPanel from "./FilterPanel";
import ProjectCard from "./ProjectCard";
import Pagination from "./Pagination";
import Feedback, { LoadingCards } from "./Feedback";
import Icon from "./Icon";

const defaults = {
  category: "All",
  level: "All",
  duration: "All",
  budget: "All",
  sort: "featured",
  page: 1,
};
export default function Catalog({
  savedOnly,
  revision,
  onStats,
  onChange,
  onNotify,
}) {
  const [filters, setFilters] = useState(defaults);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query);
  const { status, data, error, retry } = useProjects(
    { ...filters, query: debouncedQuery, savedOnly },
    revision,
  );
  const change = (name, value) =>
    setFilters((previous) => ({ ...previous, [name]: value, page: 1 }));
  const reset = () => {
    setFilters(defaults);
    setQuery("");
  };
  useEffect(() => {
    if (data) onStats({ total: data.catalogTotal, saved: data.savedCount });
  }, [data, onStats]);
  useEffect(() => {
    setFilters((previous) => ({ ...previous, page: 1 }));
  }, [savedOnly]);
  const active = [
    filters.category !== "All",
    filters.level !== "All",
    filters.duration !== "All",
    filters.budget !== "All",
  ].filter(Boolean).length;
  return (
    <section className="catalog-section" aria-labelledby="catalog-title">
      <div className="section-intro">
        <div>
          <span className="eyebrow">THE PROJECT LIBRARY</span>
          <h2 id="catalog-title">
            {savedOnly
              ? "Your next little adventures."
              : "What will you make today?"}
            <span className="title-dot">↗</span>
          </h2>
          <p>
            {savedOnly
              ? "Good ideas, kept for a free afternoon."
              : "Pick a project. Try something new. See where it takes you."}
          </p>
        </div>
        <span className="collection-label">
          <span /> {data?.catalogTotal ?? 120} ideas and counting
        </span>
      </div>
      <div className="catalog-layout">
        <FilterPanel
          filters={filters}
          onChange={change}
          onReset={reset}
          counts={data?.categoryCounts}
          total={data?.catalogTotal}
        />
        <div className="catalog-results">
          <div className="search-toolbar">
            <label className="search-box">
              <Icon name="search" size={20} />
              <span className="sr-only">Search projects</span>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  change("page", 1);
                }}
                placeholder="A notebook, a photo walk, something new…"
              />
            </label>
            <label className="sort-control">
              <span className="sr-only">Sort projects</span>
              <select
                value={filters.sort}
                onChange={(e) => change("sort", e.target.value)}
              >
                <option value="featured">Featured first</option>
                <option value="newest">Newest first</option>
                <option value="title">Title: A to Z</option>
                <option value="quickest">Quickest first</option>
                <option value="budget">Lowest budget</option>
              </select>
            </label>
          </div>
          <div className="results-caption" aria-live="polite">
            <span>
              {status === "loading" ? (
                "Finding your next project…"
              ) : status === "error" ? (
                "Catalog unavailable"
              ) : data.total ? (
                <>
                  <strong>
                    {(data.page - 1) * PAGE_SIZE + 1}–
                    {Math.min(data.page * PAGE_SIZE, data.total)}
                  </strong>{" "}
                  of <strong>{data.total}</strong>{" "}
                  {savedOnly ? "saved projects" : "projects"}
                </>
              ) : (
                "0 projects"
              )}
              {active > 0 &&
                ` · ${active} ${active === 1 ? "filter" : "filters"} applied`}
            </span>
            {(active > 0 || query) && (
              <button className="text-button" onClick={reset}>
                Clear all
              </button>
            )}
          </div>
          {status === "loading" && <LoadingCards />}
          {status === "error" && (
            <Feedback title="A little interruption" error action={retry}>
              {error}
            </Feedback>
          )}
          {status === "success" &&
            (data.items.length ? (
              <>
                <div className="card-grid">
                  {data.items.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onChange={onChange}
                      onNotify={onNotify}
                    />
                  ))}
                </div>
                <Pagination
                  page={data.page}
                  pages={data.pages}
                  onChange={(page) =>
                    setFilters((previous) => ({ ...previous, page }))
                  }
                />
              </>
            ) : (
              <Feedback
                title={
                  savedOnly && !active && !query
                    ? "A space for your next idea"
                    : "No projects found"
                }
                action={
                  savedOnly && !active && !query
                    ? () => {
                        window.location.hash = "/";
                      }
                    : reset
                }
                actionLabel={
                  savedOnly && !active && !query
                    ? "Explore projects"
                    : "Clear search & filters"
                }
              >
                {savedOnly && !active && !query
                  ? "Tap the bookmark on any project to keep it here for later."
                  : "Try a different search or give your filters a little more room."}
              </Feedback>
            ))}
        </div>
      </div>
    </section>
  );
}
