import { useEffect, useRef, useState } from "react";
import {
  CATEGORIES,
  LEVELS,
  projectsApi,
  validateProject,
} from "../api/projects";
import Icon from "./Icon";

const initialValues = {
  title: "",
  description: "",
  category: "",
  level: "Beginner",
  duration: "30",
  budget: "0",
  materials: "",
  steps: "",
  author: "",
};

function Field({ name, label, error, hint, children }) {
  return (
    <div className={`form-field ${error ? "has-error" : ""}`}>
      <label htmlFor={name}>{label}</label>
      {children}
      {error ? (
        <p className="field-error" id={`${name}-help`}>
          {error}
        </p>
      ) : (
        hint && (
          <p className="field-hint" id={`${name}-help`}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}

export default function ProjectForm({ onCreate, onNotify }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const request = useRef(null);
  useEffect(() => () => request.current?.abort(), []);
  const change = (e) => {
    const { name, value } = e.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    setError("");
  };
  const inputProps = (name) => ({
    name,
    id: name,
    value: values[name],
    onChange: change,
    "aria-invalid": !!errors[name],
    "aria-describedby": `${name}-help`,
    required: true,
  });
  async function submit(e) {
    e.preventDefault();
    if (status === "saving") return;
    const nextErrors = validateProject(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setError(
        "A few details need your attention. Check the highlighted fields below.",
      );
      return;
    }
    const controller = new AbortController();
    request.current = controller;
    setStatus("saving");
    setError("");
    try {
      const project = await projectsApi.create(values, {
        signal: controller.signal,
      });
      if (!controller.signal.aborted) {
        onCreate();
        onNotify("Your idea is in the library. Time to make something!");
        window.location.hash = `/project/${project.id}`;
      }
    } catch (reason) {
      if (reason.name !== "AbortError") {
        setError(reason.message);
        setStatus("idle");
      }
    }
  }
  return (
    <div className="page-content form-page">
      <a href="#/" className="back-link">
        <Icon name="back" size={17} />
        Back to the library
      </a>
      <div className="form-intro">
        <span className="eyebrow">PASS THE CURIOSITY ON</span>
        <h1>
          A good idea deserves
          <br />a little company.
        </h1>
        <p>Add a hands-on project someone could try in a free afternoon.</p>
      </div>
      <div className="form-layout">
        <form onSubmit={submit} noValidate>
          {error && (
            <div className="form-error" role="alert">
              <Icon name="info" size={19} />
              <span>{error}</span>
            </div>
          )}
          <fieldset disabled={status === "saving"} className="form-fields">
            <legend className="sr-only">New project details</legend>
            <Field
              name="title"
              label="Project title"
              error={errors.title}
              hint="A clear, inviting title. 5–80 characters."
            >
              <input
                {...inputProps("title")}
                maxLength={80}
                placeholder="e.g. A tiny illustrated travel journal"
              />
            </Field>
            <Field
              name="description"
              label="The little idea"
              error={errors.description}
              hint="What will someone make or discover? 20–300 characters."
            >
              <textarea
                {...inputProps("description")}
                rows={3}
                maxLength={300}
                placeholder="Give your project a short introduction…"
              />
            </Field>
            <div className="field-row">
              <Field
                name="category"
                label="Category"
                error={errors.category}
                hint="Choose the closest match."
              >
                <select {...inputProps("category")}>
                  <option value="">Choose a category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field
                name="level"
                label="Comfort level"
                error={errors.level}
                hint="Who can give this a try?"
              >
                <select {...inputProps("level")}>
                  {LEVELS.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="field-row">
              <Field
                name="duration"
                label="Time needed (minutes)"
                error={errors.duration}
                hint="10–1,440 minutes. Count active time."
              >
                <input
                  {...inputProps("duration")}
                  type="number"
                  min="10"
                  max="1440"
                  step="1"
                />
              </Field>
              <Field
                name="budget"
                label="Estimated materials budget (USD)"
                error={errors.budget}
                hint="0 for materials already on hand."
              >
                <input
                  {...inputProps("budget")}
                  type="number"
                  min="0"
                  max="1000"
                  step="0.01"
                />
              </Field>
            </div>
            <Field
              name="materials"
              label="What to gather"
              error={errors.materials}
              hint="Separate materials with commas. Up to 500 characters."
            >
              <textarea
                {...inputProps("materials")}
                rows={2}
                maxLength={500}
                placeholder="Paper, pencil, a favorite photograph"
              />
            </Field>
            <Field
              name="steps"
              label="How to get started"
              error={errors.steps}
              hint="2–10 steps, one per line. At least 10 characters per step."
            >
              <textarea
                {...inputProps("steps")}
                rows={5}
                maxLength={3000}
                placeholder={
                  "Gather your materials and choose a quiet workspace.\nMake a first draft and try one small variation."
                }
              />
            </Field>
            <Field
              name="author"
              label="Your name or nickname"
              error={errors.author}
              hint="2–50 characters. This appears beside your project."
            >
              <input
                {...inputProps("author")}
                maxLength={50}
                autoComplete="nickname"
                placeholder="What should we call you?"
              />
            </Field>
            <div className="form-actions">
              <a className="button secondary" href="#/">
                Cancel
              </a>
              <button className="button primary" type="submit">
                {status === "saving"
                  ? "Adding your idea…"
                  : "Add to the library"}
                <Icon name="arrow" size={18} />
              </button>
            </div>
          </fieldset>
        </form>
        <aside className="form-note">
          <Icon name="flask" size={34} />
          <h2>
            Small is a<br />
            great place to start.
          </h2>
          <p>
            A clear idea, a few materials, and a couple of helpful steps. That’s
            all it takes.
          </p>
          <hr />
          <h3>Your own little library</h3>
          <p>
            This is a demo catalog. Projects you add and save are stored in this
            browser, on this device. Other visitors have their own copy.
          </p>
        </aside>
      </div>
    </div>
  );
}
