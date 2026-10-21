import { useEffect, useRef, useState } from "react";
import { projectsApi } from "../api/projects";

export function useDebouncedValue(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export function useProjects(filters, revision) {
  const [result, setResult] = useState({
    status: "loading",
    data: null,
    error: "",
  });
  const [attempt, setAttempt] = useState(0);
  const { query, category, level, duration, budget, savedOnly, sort, page } =
    filters;
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setResult((previous) => ({ ...previous, status: "loading", error: "" }));
    projectsApi
      .list(
        { query, category, level, duration, budget, savedOnly, sort, page },
        { signal: controller.signal },
      )
      .then((data) => {
        if (active) setResult({ status: "success", data, error: "" });
      })
      .catch((error) => {
        if (active && error.name !== "AbortError")
          setResult({ status: "error", data: null, error: error.message });
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, [
    query,
    category,
    level,
    duration,
    budget,
    savedOnly,
    sort,
    page,
    revision,
    attempt,
  ]);
  return { ...result, retry: () => setAttempt((n) => n + 1) };
}

export function useBookmark(project, onChange, onNotify) {
  const [busy, setBusy] = useState(false);
  // A new controller is made per operation; cleanup also covers leaving a card
  // while a save request is pending. StrictMode effect replay is safe.
  const request = useRef(null);
  useEffect(() => () => request.current?.abort(), []);
  async function toggle() {
    if (busy) return;
    const current = new AbortController();
    request.current = current;
    setBusy(true);
    try {
      await projectsApi.setSaved(project.id, !project.saved, {
        signal: current.signal,
      });
      if (!current.signal.aborted) {
        onChange(!project.saved);
        onNotify(
          project.saved
            ? "Removed from your saved projects."
            : "Project saved for your next free afternoon.",
        );
      }
    } catch (error) {
      if (error.name !== "AbortError") onNotify(error.message, "error");
    } finally {
      if (!current.signal.aborted) setBusy(false);
    }
  }
  return { busy, toggle };
}
