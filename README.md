# EasyRent — Frontend

Website for **EasyRent**, a cleaning-equipment rental service (Kärcher pressure
washers, vacuums, floor scrubbers and more in Lutsk, Lviv, Kyiv and Odesa), built
with **React + TypeScript + Vite**.

**Live demo:** <https://team-project-250.github.io/team-project-frontend/>

The project lives in **two repositories**:

| Repository | What it is |
| --- | --- |
| **team-project-frontend** (this repo) | The website: catalog, product pages, booking form, info pages |
| [**team-project-backend**](https://github.com/team-project-250/team-project-backend) | Django REST API + admin panel: catalog, availability, bookings with price and conflict checks, editable site content |

Development plan for both repositories: [`DEVELOPMENT_PLAN.md`](https://github.com/team-project-250/team-project-backend/blob/develop/DEVELOPMENT_PLAN.md).

## Project status

The site is a **finished, responsive UI** that currently runs on **mock data**.
The backend API for every screen is ready; **connecting the site to it is the next
step** (Stage 3b in the development plan).

| Page / feature | UI | Data source today | API endpoint it will use |
| --- | --- | --- | --- |
| Home: hero, popular equipment, how to rent, reviews | ✅ | `src/data/*.ts` | `GET /api/home/` |
| Catalog with category filter and sorting (rating, price, name) | ✅ | `src/data/equipmentData.ts` | `GET /api/equipment/` |
| Product page: gallery, specs, "suitable for" | ✅ | `src/data/equipmentDetails.ts` | `GET /api/equipment/{slug}/` |
| Availability calendar | ✅ | mock dates (`availableUntil`) | `GET /api/equipment/{slug}/availability/` |
| Booking form with validation and price | ✅ | booking kept in browser memory only | `POST /api/bookings/` |
| "1-click" booking | ✅ | not sent anywhere | `POST /api/callback-requests/` |
| City selector, pickup points | ✅ | `src/data/cities.ts`, `cityData.ts` | `GET /api/cities/` |
| About, rental terms, delivery, FAQ, contacts | ✅ | static content | `GET /api/content/...` |

The mock data and the backend's demo data (`python manage.py seed_demo`) contain the
same catalog, cities and reviews.

---

## Tech stack

| Area | Choice |
| --- | --- |
| Language | TypeScript |
| Framework | React 19 |
| Build tool | Vite |
| Routing | React Router (`HashRouter`, works on GitHub Pages) |
| UI library | [Mantine](https://mantine.dev) (date picker, popovers) |
| Styles | SCSS, BEM |
| State | React Context (selected city, bookings) |
| Lint / format | oxlint, Prettier |
| CI | GitHub Actions (lint, format, type-check, build) |
| Deploy | GitHub Pages |

---

## Getting started

```bash
git clone https://github.com/team-project-250/team-project-frontend.git
cd team-project-frontend
npm install
npm run dev
```

Open <http://localhost:5173/team-project-frontend/>. The site works on its own —
the backend is not needed yet, because every page still uses mock data.

To run the backend alongside (for API work), follow the
[backend README](https://github.com/team-project-250/team-project-backend#getting-started);
Vite proxies `/api` to `http://127.0.0.1:8000`.

---

## Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` / `lint:fix` | Lint with oxlint |
| `npm run format` / `format:check` | Format with Prettier |
| `npm run typecheck` | Type-check without emitting |

---

## Environment variables

| Variable | Default | Description |
| --- | --- | --- |
| `VITE_API_URL` | _(empty)_ | Backend URL. Empty in development (the Vite proxy handles `/api`); set to the deployed backend once the site talks to the API. |

---

## Project structure

```
src/
├── api/          # fetch wrapper (client.ts) — ready for the API integration
├── components/   # UI blocks: Header, Catalog, EquipmentDetails, Booking, BookingCalendar, …
├── context/      # React Context: selected city, bookings
├── data/         # mock data: equipment, details, cities, reviews, steps, terms
├── pages/        # one folder per route
├── styles/       # shared SCSS (variables, mixins, typography)
├── types/        # shared TypeScript types
└── Root.tsx      # routes
public/img/       # product photos, icons, avatars
```

Routes: `/`, `/catalog`, `/catalog/:id`, `/booking/:id`, `/booking-success`,
`/about`, `/rental-terms`, `/delivery`, `/questions`, `/contacts`.

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

## Deployment (GitHub Pages)

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and publishes it to
<https://team-project-250.github.io/team-project-frontend/>. The Vite `base` is
`/team-project-frontend/` and routing uses `HashRouter`, so deep links work on
GitHub Pages without server rewrites.

Once the site uses the API, set `VITE_API_URL` in the deploy workflow and add
`https://team-project-250.github.io` to `CORS_ORIGINS` on the backend.

---

## Team

| Name | Role | GitHub |
| --- | --- | --- |
| Alexey Kravets | Frontend | [@kravets111](https://github.com/kravets111) |
| Taras Mosiichuk | Backend | [@tarasmosiichuk01-ship-it](https://github.com/tarasmosiichuk01-ship-it) |
