import { useEffect, useRef, useState } from "react";
import { projectsApi } from "../api/projects";
import Icon from "./Icon";

export default function About({ onChange, onNotify }) {
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const request = useRef(null);
  useEffect(() => () => request.current?.abort(), []);
  async function reset() {
    request.current = new AbortController();
    setBusy(true);
    try {
      await projectsApi.reset({ signal: request.current.signal });
      if (!request.current.signal.aborted) {
        onChange();
        onNotify("The 120 starter projects have been restored.");
        setConfirm(false);
      }
    } catch (error) {
      if (error.name !== "AbortError") onNotify(error.message, "error");
    } finally {
      if (!request.current.signal.aborted) setBusy(false);
    }
  }
  return (
    <div className="page-content about-page">
      <a href="#/" className="back-link">
        <Icon name="back" size={17} />
        Back to the library
      </a>
      <span className="eyebrow">A LITTLE MORE ABOUT THE LAB</span>
      <h1>
        Curiosity looks
        <br />
        good on you.
      </h1>
      <p className="about-lead">
        Weekend Lab is a place to find a small project and make an ordinary
        afternoon a little more interesting.
      </p>
      <div className="about-grid">
        <section>
          <Icon name="spark" size={26} />
          <h2>Start somewhere small.</h2>
          <p>
            Explore 120 starter ideas across paper, drawing, photography,
            nature, digital making, and writing. Narrow them down by time,
            budget, and comfort level, then follow the steps at your own pace.
          </p>
        </section>
        <section>
          <Icon name="bookmark" size={26} />
          <h2>Make it your own.</h2>
          <p>
            Save ideas for later or add a project of your own. Budget and time
            are estimates. The catalog is original demonstration content; it is
            not a live community or an external marketplace.
          </p>
        </section>
        <section>
          <Icon name="info" size={26} />
          <h2>A browser-sized library.</h2>
          <p>
            One simulated asynchronous API reads the starter JSON and stores the
            catalog in localStorage. Your additions and bookmarks stay on this
            browser and device. They are not shared with other visitors.
            Clearing browser storage removes them.
          </p>
        </section>
        <section className="restore-section">
          <Icon name="flask" size={26} />
          <h2>A fresh start.</h2>
          <p>
            Restore the original 120 projects if you want a clean catalog or
            need to recover damaged stored data. This removes your additions and
            bookmarks from this browser.
          </p>
          {confirm ? (
            <div
              className="restore-confirm"
              role="group"
              aria-label="Confirm catalog reset"
            >
              <p>Remove your additions and bookmarks?</p>
              <button className="button danger" disabled={busy} onClick={reset}>
                {busy ? "Restoring…" : "Yes, restore starter catalog"}
              </button>
              <button
                className="text-button"
                disabled={busy}
                onClick={() => setConfirm(false)}
              >
                Keep my catalog
              </button>
            </div>
          ) : (
            <button
              className="button secondary"
              onClick={() => setConfirm(true)}
            >
              Restore starter catalog
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
