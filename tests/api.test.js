import { beforeEach, describe, expect, it, vi } from "vitest";
import seed from "../src/data/projects.json";
import {
  CATEGORIES,
  PAGE_SIZE,
  STORAGE_KEY,
  projectsApi,
  validateProject,
} from "../src/api/projects";

const valid = {
  title: "A beautiful test project",
  description: "Create a tiny test project from a sheet of paper.",
  category: "Paper & print",
  level: "Beginner",
  duration: "45",
  budget: "0",
  materials: "Paper, pencil",
  steps:
    "Gather a sheet of recycled paper.\nFold the paper to make a simple booklet.",
  author: "Test maker",
};
const finish = async (promise) => {
  await vi.runAllTimersAsync();
  return promise;
};
beforeEach(() => {
  vi.useFakeTimers();
});

describe("single simulated data source", () => {
  it("starts with 120 complete JSON records and unique stable IDs", async () => {
    expect(seed).toHaveLength(120);
    expect(new Set(seed.map((p) => p.id)).size).toBe(120);
    for (const category of CATEGORIES)
      expect(seed.filter((p) => p.category === category)).toHaveLength(20);
    expect(
      seed.every((p) => p.steps.length >= 3 && p.description.length > 20),
    ).toBe(true);
    const result = await finish(projectsApi.list());
    expect(result.total).toBe(120);
    expect(result.items).toHaveLength(PAGE_SIZE);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))).toHaveLength(120);
  });
  it("searches case-insensitively and combines filters before pagination", async () => {
    const found = await finish(
      projectsApi.list({ query: "POCKET-SIZED notebook" }),
    );
    expect(found.items.map((p) => p.id)).toEqual(["lab-001"]);
    const filtered = await finish(
      projectsApi.list({
        category: "Photography",
        duration: "30",
        budget: "0",
        level: "Beginner",
      }),
    );
    expect(filtered.total).toBeGreaterThan(0);
    expect(
      filtered.items.every(
        (p) =>
          p.category === "Photography" &&
          p.duration <= 30 &&
          p.budget === 0 &&
          p.level === "Beginner",
      ),
    ).toBe(true);
  });
  it("paginates all records exactly once and clamps an out-of-range page", async () => {
    const seen = [];
    for (let page = 1; page <= 14; page++) {
      const result = await finish(projectsApi.list({ page }));
      seen.push(...result.items.map((p) => p.id));
    }
    expect(new Set(seen).size).toBe(120);
    expect(seen).toHaveLength(120);
    const result = await finish(
      projectsApi.list({ category: "Nature", page: 99 }),
    );
    expect(result.page).toBe(3);
    expect(result.items).toHaveLength(2);
  });
  it("sorts by title, duration, budget, and newest date", async () => {
    for (const [sort, key] of [
      ["title", "title"],
      ["quickest", "duration"],
      ["budget", "budget"],
    ]) {
      const result = await finish(projectsApi.list({ sort }));
      const values = result.items.map((p) => p[key]);
      expect(values).toEqual(
        [...values].sort(
          key === "title" ? (a, b) => a.localeCompare(b) : (a, b) => a - b,
        ),
      );
    }
    const created = await finish(projectsApi.create(valid));
    const newest = await finish(projectsApi.list({ sort: "newest" }));
    expect(newest.items[0].id).toBe(created.id);
  });
  it("persists new items and bookmarks without mutating seed data", async () => {
    const created = await finish(projectsApi.create(valid));
    expect(created.id).toMatch(/^user-/);
    expect((await finish(projectsApi.get(created.id))).materials).toEqual([
      "Paper",
      "pencil",
    ]);
    await finish(projectsApi.setSaved("lab-001", true));
    const saved = await finish(projectsApi.list({ savedOnly: true }));
    expect(saved.items.map((p) => p.id)).toEqual(["lab-001"]);
    expect(seed[0].saved).toBe(false);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))).toHaveLength(121);
    await finish(projectsApi.setSaved("lab-001", false));
    expect((await finish(projectsApi.list({ savedOnly: true }))).total).toBe(0);
  });
  it("does not lose concurrent creates in the same tab", async () => {
    const pending = Promise.all([
      projectsApi.create(valid),
      projectsApi.create({ ...valid, title: "Another test project" }),
    ]);
    const projects = await finish(pending);
    expect(projects[0].id).not.toBe(projects[1].id);
    expect((await finish(projectsApi.list())).catalogTotal).toBe(122);
  });
  it("cancels requests and prevents an aborted write", async () => {
    const controller = new AbortController();
    const pending = projectsApi.create(valid, { signal: controller.signal });
    const rejected = expect(pending).rejects.toHaveProperty(
      "name",
      "AbortError",
    );
    controller.abort();
    await rejected;
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
  it("returns an empty success response for an unmatched search", async () => {
    const result = await finish(projectsApi.list({ query: "unmatchablezzzz" }));
    expect(result.items).toEqual([]);
    expect(result.total).toBe(0);
    expect(result.pages).toBe(1);
  });
  it("reports a missing detail item", async () => {
    const assertion = expect(projectsApi.get("not-a-project")).rejects.toThrow(
      "could not be found",
    );
    await vi.runAllTimersAsync();
    await assertion;
  });
  it("reports malformed storage and supports explicit recovery", async () => {
    localStorage.setItem(STORAGE_KEY, "{bad json");
    const assertion = expect(projectsApi.list()).rejects.toThrow(
      "could not be read",
    );
    await vi.runAllTimersAsync();
    await assertion;
    await finish(projectsApi.reset());
    expect((await finish(projectsApi.list())).total).toBe(120);
  });
  it("does not silently discard data when browser writes fail", async () => {
    const spy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("Quota");
      });
    const assertion = expect(projectsApi.create(valid)).rejects.toThrow(
      "could not save",
    );
    await vi.runAllTimersAsync();
    await assertion;
    spy.mockRestore();
  });
  it("validates required text, numeric bounds, categories, materials, and steps", () => {
    expect(validateProject(valid)).toEqual({});
    const errors = validateProject({
      ...valid,
      title: "a",
      description: "",
      category: "invalid",
      duration: "2.5",
      budget: "-1",
      materials: ", ,",
      steps: "short",
      author: "",
    });
    expect(Object.keys(errors).sort()).toEqual([
      "author",
      "budget",
      "category",
      "description",
      "duration",
      "materials",
      "steps",
      "title",
    ]);
  });
});
