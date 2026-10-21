import React from "react";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import App from "../src/App";
import ProjectDetail from "../src/components/ProjectDetail";
import { projectsApi, STORAGE_KEY } from "../src/api/projects";
import { useProjects } from "../src/hooks/useProjects";

it("renders loading, a paginated catalog, category filtering, and an empty result with recovery", async () => {
  const user = userEvent.setup();
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  expect(
    screen.getByRole("status", { name: "Loading projects" }),
  ).toBeInTheDocument();
  expect(await screen.findAllByRole("article")).toHaveLength(9);
  await user.click(screen.getByRole("button", { name: "Next page" }));
  await waitFor(() =>
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    ),
  );
  await user.click(screen.getByRole("button", { name: "Nature 20" }));
  await waitFor(() =>
    expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute(
      "aria-current",
      "page",
    ),
  );
  expect(
    (await screen.findAllByRole("article")).every((a) =>
      within(a).getByText("Nature"),
    ),
  ).toBe(true);
  await user.type(
    screen.getByRole("searchbox", { name: "Search projects" }),
    "unmatchablezzzz",
  );
  expect(
    await screen.findByRole("heading", { name: "No projects found" }),
  ).toBeInTheDocument();
  await user.click(
    screen.getByRole("button", { name: "Clear search & filters" }),
  );
  expect(await screen.findAllByRole("article")).toHaveLength(9);
}, 15000);

it("saves a project and shows it in the saved collection", async () => {
  const user = userEvent.setup();
  render(<App />);
  const save = await screen.findByRole("button", {
    name: "Save A pocket-sized notebook",
  });
  await user.click(save);
  expect(await screen.findByRole("status", { name: "" })).toHaveTextContent(
    "Project saved",
  );
  await user.click(await screen.findByRole("link", { name: /Saved 1/ }));
  await waitFor(() =>
    expect(
      screen.getByRole("heading", { name: /Your next little adventures/ }),
    ).toBeInTheDocument(),
  );
  expect(await screen.findAllByRole("article")).toHaveLength(1);
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY))[0].saved).toBe(true);
}, 10000);

it("validates controlled fields and creates a persistent project with a detail route", async () => {
  const user = userEvent.setup();
  window.history.replaceState(null, "", "/#/add");
  render(<App />);
  await user.click(screen.getByRole("button", { name: "Add to the library" }));
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Check the highlighted fields",
  );
  await user.type(
    screen.getByLabelText("Project title"),
    "My little weekend journal",
  );
  await user.type(
    screen.getByLabelText("The little idea"),
    "Make a small illustrated journal to remember a favorite weekend.",
  );
  await user.selectOptions(screen.getByLabelText("Category"), "Writing");
  await user.type(
    screen.getByLabelText("What to gather"),
    "Paper, pencil, colored pens",
  );
  await user.type(
    screen.getByLabelText("How to get started"),
    "Fold paper to create a small booklet.\nDraw a favorite memory on each page.",
  );
  await user.type(
    screen.getByLabelText("Your name or nickname"),
    "A curious maker",
  );
  await user.click(screen.getByRole("button", { name: "Add to the library" }));
  expect(
    await screen.findByRole("heading", {
      level: 1,
      name: "My little weekend journal",
    }),
  ).toBeInTheDocument();
  expect(window.location.hash).toMatch(/^#\/project\/user-/);
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
  expect(stored).toHaveLength(121);
  expect(stored[0].author).toBe("A curious maker");
}, 15000);

it("shows a recoverable error when catalog storage is damaged", async () => {
  localStorage.setItem(STORAGE_KEY, "broken");
  render(<App />);
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "could not be read",
  );
  expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
  localStorage.removeItem(STORAGE_KEY);
  fireEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(await screen.findAllByRole("article")).toHaveLength(9);
});

it("resets checklist state when switching project identity", async () => {
  const { rerender } = render(
    <ProjectDetail id="lab-001" onChange={vi.fn()} onNotify={vi.fn()} />,
  );
  const boxes = await screen.findAllByRole("checkbox");
  fireEvent.click(boxes[0]);
  expect(boxes[0]).toBeChecked();
  rerender(
    <ProjectDetail id="lab-002" onChange={vi.fn()} onNotify={vi.fn()} />,
  );
  await screen.findByRole("heading", { name: "Print with a potato stamp" });
  expect(screen.getAllByRole("checkbox").every((box) => !box.checked)).toBe(
    true,
  );
});

it("aborts replaced requests and ignores late responses even if the source ignores cancellation", async () => {
  const pending = [];
  vi.spyOn(projectsApi, "list").mockImplementation(
    (filters, options) =>
      new Promise((resolve) =>
        pending.push({ filters, signal: options.signal, resolve }),
      ),
  );
  const { result, rerender, unmount } = renderHook(
    ({ query }) =>
      useProjects(
        {
          query,
          category: "All",
          level: "All",
          duration: "All",
          budget: "All",
          savedOnly: false,
          sort: "featured",
          page: 1,
        },
        0,
      ),
    { initialProps: { query: "old" } },
  );
  rerender({ query: "new" });
  expect(pending[0].signal.aborted).toBe(true);
  await act(async () => {
    pending[1].resolve({ items: [{ id: "new" }] });
  });
  await act(async () => {
    pending[0].resolve({ items: [{ id: "old" }] });
  });
  expect(result.current.data.items[0].id).toBe("new");
  unmount();
  expect(pending[1].signal.aborted).toBe(true);
});
