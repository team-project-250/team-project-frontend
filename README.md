# Team Project — Frontend

Client application for the Team Project, built with **React + Vite + TypeScript**.

Backend repository: [`team-project-backend`](https://github.com/glor1ee/team-project-backend) ·
Development plan: [`DEVELOPMENT_PLAN.md`](https://github.com/glor1ee/team-project-backend/blob/main/DEVELOPMENT_PLAN.md)

---

## Tech stack

| Area | Choice |
| --- | --- |
| Language | TypeScript (strict) |
| Framework | React 19 |
| Build tool | Vite |
| UI library | [Mantine](https://mantine.dev) |
| Linter | [oxlint](https://oxc.rs) (Vite default) |
| Formatter | Prettier |
| CI | GitHub Actions |
| Deploy | Vercel |

---

## Getting started

### 1. Clone and enter the project

```bash
git clone https://github.com/glor1ee/team-project-frontend.git
cd team-project-frontend
```

### 2. Install dependencies

Node.js **20+** is required.

```bash
npm install
```

### 3. Create the environment file (optional for local dev)

```bash
cp .env.example .env.local
```

Leave `VITE_API_URL` empty locally — Vite proxies `/api` to the backend.

### 4. Start the backend

The start page calls the API, so run the backend first — see
[`team-project-backend`](https://github.com/glor1ee/team-project-backend):

```bash
uvicorn app.main:app --reload
```

### 5. Start the dev server

```bash
npm run dev
```

The app opens at <http://localhost:5173>.

---

## Sanity check

Open <http://localhost:5173>. You should see:

- the heading **Hello world!**
- a green **connected** badge with the message returned by the backend

If the badge is red, the backend is not running on `http://127.0.0.1:8000`.

---

## Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint with oxlint |
| `npm run lint:fix` | Lint and auto-fix |
| `npm run typecheck` | Type-check without emitting |
| `npm run format` | Format everything with Prettier |
| `npm run format:check` | Verify formatting (used by CI) |

CI runs lint, format check, type check and build on every push and pull request
to `main` and `develop`.

---

## Environment variables

| Variable | Default | Description |
| --- | --- | --- |
| `VITE_API_URL` | _(empty)_ | Base URL of the backend. Empty in development (Vite proxy handles it); set to the deployed backend URL in production. |

Only variables prefixed with `VITE_` are exposed to the client bundle.
Never put secrets here — everything in the bundle is public.

---

## Project structure

```
team-project-frontend/
├── src/
│   ├── api/
│   │   ├── client.ts       # Typed fetch wrapper + ApiError
│   │   ├── sanity.ts       # Calls to the sanity endpoints
│   │   └── types.ts        # Response types shared with the backend
│   ├── components/
│   │   └── BackendStatus.tsx
│   ├── App.tsx             # Start page
│   ├── main.tsx            # Entry point + MantineProvider
│   ├── theme.ts            # Design tokens
│   └── index.css
├── .github/
│   ├── workflows/ci.yml
│   └── pull_request_template.md
├── .env.example
├── .prettierrc
├── .oxlintrc.json
├── postcss.config.cjs      # Required by Mantine
├── vite.config.ts          # Dev server + /api proxy
└── vercel.json             # Vercel deployment config
```

---

## Git Flow

The team follows Git Flow. Two long-lived branches:

- **`main`** — production-ready code only. Never commit directly.
- **`develop`** — integration branch. All feature work merges here first.

Short-lived branches:

| Prefix | Purpose | Branch off | Merge into |
| --- | --- | --- | --- |
| `feature/*` | New functionality | `develop` | `develop` |
| `fix/*` | Bug fixes | `develop` | `develop` |
| `hotfix/*` | Urgent production fixes | `main` | `main` **and** `develop` |
| `release/*` | Release preparation | `develop` | `main` **and** `develop` |

### Typical workflow

```bash
git checkout develop
git pull origin develop

git checkout -b feature/login-page
# ... work, commit, work, commit ...
git push -u origin feature/login-page
# then open a Pull Request into develop
```

### Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add login page
fix: keep the header visible while scrolling on mobile
style: align the card paddings with the design
refactor: extract the API client
chore: bump vite to 8.2
```

Keep the history clean — one logical change per commit.

---

## Deployment (Vercel)

1. Push the repository to GitHub.
2. In Vercel, **Add New → Project** and import this repository.
3. Vercel detects Vite automatically; [`vercel.json`](vercel.json) pins the settings.
4. Add the environment variable `VITE_API_URL` = deployed backend URL
   (e.g. `https://team-project-backend.onrender.com`).
5. Add the resulting Vercel URL to `CORS_ORIGINS` on the backend.

---

## Team

| Name | Role | GitHub |
| --- | --- | --- |
| _TBD_ | Frontend | [@username](https://github.com/username) |
| _TBD_ | Backend | [@username](https://github.com/username) |
