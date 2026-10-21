# Weekend Lab

Weekend Lab is a React single-page application for discovering small, hands-on projects. It brings creative activities into one searchable catalog, with practical details about materials, difficulty, time, and estimated cost.

The catalog includes **120 original project records** across six categories: Paper & print, Drawing, Photography, Nature, Digital making, and Writing. Projects can be bookmarked for later, opened as individual detail pages, or added through a validated form.

## Features

- **Project library:** a responsive catalog with nine projects per page and dedicated detail views.
- **Search:** case-insensitive, multiword matching across titles, descriptions, categories, and materials.
- **Combined filters:** category, difficulty, maximum duration, and maximum materials budget.
- **Sorting:** featured order, newest first, title A–Z, quickest first, and lowest budget.
- **Saved collection:** persistent bookmarks with a separate saved-project view.
- **Project creation:** controlled inputs, field-level validation, submission feedback, and navigation to the newly created project.
- **Project checklists:** interactive steps with progress tracked while the detail view remains open.
- **Request feedback:** loading indicators, recoverable errors, empty-result views, and success notifications.
- **Catalog recovery:** restoration of the starter data after an explicit confirmation.
- **Accessible interface:** labeled controls, keyboard navigation, visible focus indicators, a skip link, and reduced-motion support.

## Technology

| Area | Tools |
| --- | --- |
| Interface | React 19, JavaScript, JSX |
| Development and production builds | Vite 7 |
| Styling and illustrations | Responsive CSS and local SVG artwork |
| Data | JSON seed data and browser localStorage |
| Testing | Vitest, React Testing Library, user-event, jsdom |
| Deployment | GitHub Actions and GitHub Pages |

## Data source

The application uses one simulated asynchronous API, implemented in `src/api/projects.js`. Promise-based operations and artificial delays model asynchronous requests, while `src/data/projects.json` provides the 120 initial records. The catalog is initialized in localStorage under the key `weekend-lab.projects.v1`.

The API supports listing, searching, filtering, sorting, pagination, individual record retrieval, project creation, bookmark updates, and catalog restoration. Search, filters, and sorting are applied before pagination so result counts and page contents remain consistent.

Added projects and bookmarks persist across refreshes within the same browser and site origin. Catalog data is local to each visitor; it is not shared between devices or users. Clearing site storage removes local changes. Storage failures produce an error instead of a successful-save notification.

Project durations represent estimated active time, and budgets are illustrative estimates in USD. Google Fonts supplies the display typography, with system-font fallbacks. The catalog and illustrations do not require an external API or backend server.

## Application structure

```text
src/
  App.jsx                  Application shell, navigation, and shared state
  main.jsx                 React entry point and StrictMode
  api/projects.js          Simulated API and form validation
  data/projects.json       Initial catalog records
  hooks/useProjects.js     Request, debounce, and bookmark hooks
  components/
    Catalog.jsx            List view and search controls
    FilterPanel.jsx        Category, duration, difficulty, and budget filters
    ProjectCard.jsx        Reusable project summary and bookmark control
    ProjectDetail.jsx      Detail view, materials, and step checklist
    ProjectForm.jsx        Controlled project-creation form
    Pagination.jsx         Page navigation
    Feedback.jsx           Loading, empty, and error feedback
    ProjectArt.jsx         Reusable project illustrations
    Icon.jsx               Shared SVG icons
    About.jsx              Catalog information and recovery controls
  styles.css               Responsive application theme
scripts/
  generate-seed.mjs        Reproducible catalog-data generator
tests/
  api.test.js              Data-source and validation tests
  app.test.jsx             React integration tests
.github/workflows/
  deploy.yml               Test, build, and GitHub Pages deployment
```

Components receive data and event handlers through props. Form values, filters, checklist progress, and request status are stored in their owning components or hooks. Shared catalog refreshes, statistics, and notifications are coordinated in `App`.

`useState` manages application and interface state. `useEffect` coordinates asynchronous requests, debounced search, routing, storage events, and notification timers. Cleanup cancels requests, clears timers, and removes event listeners. Active-request guards prevent late responses from replacing newer results.

Project IDs provide stable list keys. Detail content is keyed by project ID so checklist state resets when a different project opens. Catalog inputs remain mounted during navigation to preserve browsing state. Record and interface updates are immutable, and React renders the interface without direct DOM manipulation.

## Routes

| Hash route | View |
| --- | --- |
| `#/` | Project library |
| `#/saved` | Saved collection |
| `#/project/:id` | Project details |
| `#/add` | Add-project form |
| `#/about` | Catalog information and recovery |

Hash routing supports direct detail links and page refreshes on GitHub Pages without server-side route rewrites. Relative asset paths support deployment under a repository subpath.

## Development

**Requirements:** Node.js 22.12 or newer and npm.

```sh
npm ci
npm run dev
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm test` | Run the automated test suite |
| `npm run build` | Generate the production application in `dist/` |
| `npm run preview` | Serve the production build locally |
| `node scripts/generate-seed.mjs` | Rebuild the initial JSON catalog from its authored source |

## Testing

The automated suite contains 18 tests covering seed integrity, combined search and filters, sorting, pagination, persistent additions and bookmarks, validation, missing records, storage failures, catalog recovery, cancellation, and stale responses. React integration tests cover browsing, saved projects, form submission, error recovery, and checklist state reset. The catalog integration test also runs under React StrictMode.

## Deployment

The GitHub Pages workflow is available through manual dispatch; repository pushes do not start deployment. When explicitly run, it installs dependencies from the lockfile, runs the tests, creates the production build, and deploys the `dist/` artifact through GitHub Pages. No application secrets or separately deployed backend are required.
