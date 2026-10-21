import seed from "../data/projects.json";

export const STORAGE_KEY = "weekend-lab.projects.v1";
export const CATEGORIES = [
  "Paper & print",
  "Drawing",
  "Photography",
  "Nature",
  "Digital making",
  "Writing",
];
export const LEVELS = ["Beginner", "Intermediate"];
export const PAGE_SIZE = 9;

export class ApiError extends Error {}

function delay(signal, milliseconds = 320) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted)
      return reject(new DOMException("Request cancelled", "AbortError"));
    const finish = () => {
      signal?.removeEventListener("abort", abort);
      resolve();
    };
    const timer = setTimeout(finish, milliseconds);
    const abort = () => {
      clearTimeout(timer);
      signal.removeEventListener("abort", abort);
      reject(new DOMException("Request cancelled", "AbortError"));
    };
    signal?.addEventListener("abort", abort, { once: true });
  });
}

function write(records) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    throw new ApiError(
      "Your browser could not save the catalog. Allow site storage or free some space, then retry.",
    );
  }
}

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      write(seed);
      return structuredClone(seed);
    }
    const records = JSON.parse(raw);
    if (
      !Array.isArray(records) ||
      !records.every(validRecord) ||
      new Set(records.map((p) => p.id)).size !== records.length
    ) {
      throw new Error("Invalid catalog");
    }
    return records;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      "The saved catalog could not be read. Allow site storage or restore the starter catalog in About.",
    );
  }
}

function validRecord(p) {
  return (
    p &&
    typeof p.id === "string" &&
    typeof p.title === "string" &&
    typeof p.description === "string" &&
    CATEGORIES.includes(p.category) &&
    LEVELS.includes(p.level) &&
    Number.isFinite(p.duration) &&
    p.duration > 0 &&
    Number.isFinite(p.budget) &&
    p.budget >= 0 &&
    Array.isArray(p.materials) &&
    p.materials.every((x) => typeof x === "string") &&
    Array.isArray(p.steps) &&
    p.steps.every((x) => typeof x === "string") &&
    typeof p.saved === "boolean" &&
    typeof p.author === "string" &&
    Number.isFinite(Date.parse(p.createdAt))
  );
}

export function validateProject(values) {
  const errors = {};
  if (values.title.trim().length < 5 || values.title.trim().length > 80)
    errors.title = "Use between 5 and 80 characters.";
  if (
    values.description.trim().length < 20 ||
    values.description.trim().length > 300
  )
    errors.description = "Use between 20 and 300 characters.";
  if (!CATEGORIES.includes(values.category))
    errors.category = "Choose a category.";
  if (!LEVELS.includes(values.level)) errors.level = "Choose a difficulty.";
  if (
    !Number.isInteger(Number(values.duration)) ||
    Number(values.duration) < 10 ||
    Number(values.duration) > 1440
  )
    errors.duration = "Enter a whole number from 10 to 1440 minutes.";
  if (
    values.budget === "" ||
    !Number.isFinite(Number(values.budget)) ||
    Number(values.budget) < 0 ||
    Number(values.budget) > 1000
  )
    errors.budget = "Enter a budget from $0 to $1,000.";
  const materials = values.materials
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  if (
    !materials.length ||
    materials.length > 20 ||
    values.materials.length > 500
  )
    errors.materials = "List 1–20 materials in at most 500 characters.";
  const steps = values.steps
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
  if (
    steps.length < 2 ||
    steps.length > 10 ||
    steps.some((x) => x.length < 10) ||
    values.steps.length > 3000
  )
    errors.steps =
      "Add 2–10 steps, one per line, with at least 10 characters each (3,000 total max).";
  if (values.author.trim().length < 2 || values.author.trim().length > 50)
    errors.author = "Use between 2 and 50 characters.";
  return errors;
}

// The single data source: Promise-based operations, JSON seed, latency, and
// localStorage persistence. Read-modify-write happens AFTER the delay with no
// intervening await, so concurrent operations in this tab do not lose updates.
export const projectsApi = {
  async list(
    {
      query = "",
      category = "All",
      level = "All",
      duration = "All",
      budget = "All",
      savedOnly = false,
      sort = "featured",
      page = 1,
    } = {},
    { signal } = {},
  ) {
    await delay(signal);
    const records = read();
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let filtered = records.filter((p) => {
      const haystack = [p.title, p.description, p.category, ...p.materials]
        .join(" ")
        .toLowerCase();
      return (
        terms.every((term) => haystack.includes(term)) &&
        (category === "All" || p.category === category) &&
        (level === "All" || p.level === level) &&
        (duration === "All" || p.duration <= Number(duration)) &&
        (budget === "All" || p.budget <= Number(budget)) &&
        (!savedOnly || p.saved)
      );
    });
    const comparisons = {
      featured: (a, b) =>
        (a.featuredOrder ?? 1000) - (b.featuredOrder ?? 1000) ||
        a.id.localeCompare(b.id),
      newest: (a, b) =>
        b.createdAt.localeCompare(a.createdAt) || a.id.localeCompare(b.id),
      title: (a, b) =>
        a.title.localeCompare(b.title) || a.id.localeCompare(b.id),
      quickest: (a, b) =>
        a.duration - b.duration || a.title.localeCompare(b.title),
      budget: (a, b) => a.budget - b.budget || a.title.localeCompare(b.title),
    };
    filtered = [...filtered].sort(comparisons[sort] ?? comparisons.featured);
    const total = filtered.length;
    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const currentPage = Math.min(Math.max(1, page), pages);
    return {
      items: filtered.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
      ),
      total,
      page: currentPage,
      pages,
      catalogTotal: records.length,
      savedCount: records.filter((p) => p.saved).length,
      categoryCounts: Object.fromEntries(
        CATEGORIES.map((c) => [
          c,
          records.filter((p) => p.category === c).length,
        ]),
      ),
    };
  },
  async get(id, { signal } = {}) {
    await delay(signal);
    const project = read().find((p) => p.id === id);
    if (!project)
      throw new ApiError(
        "This project could not be found. It may have been removed from this browser.",
      );
    return project;
  },
  async create(values, { signal } = {}) {
    await delay(signal, 450);
    if (Object.keys(validateProject(values)).length)
      throw new ApiError("Check the form fields before adding your project.");
    const project = {
      id: `user-${crypto.randomUUID()}`,
      title: values.title.trim(),
      description: values.description.trim(),
      category: values.category,
      level: values.level,
      duration: Number(values.duration),
      budget: Number(values.budget),
      materials: values.materials
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
      steps: values.steps
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean),
      author: values.author.trim(),
      createdAt: new Date().toISOString(),
      saved: false,
    };
    write([project, ...read()]);
    return project;
  },
  async setSaved(id, saved, { signal } = {}) {
    await delay(signal, 180);
    const records = read();
    if (!records.some((p) => p.id === id))
      throw new ApiError("This project could not be found.");
    write(records.map((p) => (p.id === id ? { ...p, saved } : p)));
    return { id, saved };
  },
  async reset({ signal } = {}) {
    await delay(signal);
    write(seed);
  },
};
