EasyRent — Frontend

The frontend application for EasyRent, an equipment rental service. Users can browse equipment, filter the catalog by city, view equipment details, explore related equipment, and create booking requests.

Project status: In development.

Project Links

* Frontend repository: team-project-frontend
* Backend repository: team-project-backend
* Live application: EasyRent on GitHub Pages
* Production API: EasyRent API
* API documentation: Swagger UI
* Backend development plan: DEVELOPMENT_PLAN.md

Features

* Equipment catalog loaded from the backend REST API.
* City-based catalog filtering.
* Equipment details loaded by equipment slug.
* Related equipment fetched from the API.
* Equipment categories fetched from the API.
* Booking creation through the backend API.
* Booking confirmation page.
* Application pages for the home page, catalog, equipment details, booking, delivery, contacts, rental terms, FAQ, and about information.
* Shared application state for city selection and booking.
* Automated quality checks and deployment through GitHub Actions.

Current Scope and Limitations

* Reviews, rental terms, and some informational sections use static frontend data.
* In the catalog mapper, the equipment description is currently set to an empty string. The equipment details endpoint provides a separate description field.
* Equipment images depend on the data returned by the backend.
* The project is under active development. Not every possible user flow is necessarily complete.

Tech Stack

* React 19
* TypeScript
* Vite
* React Router
* Mantine
* Sass
* oxlint
* Prettier
* GitHub Actions
* GitHub Pages

API Integration

The frontend communicates with the backend through a REST API. The base URL is configured using the VITE_API_URL environment variable.

Purpose	Method and endpoint
Equipment catalog by city	GET /equipment/?city={citySlug}
Equipment details	GET /equipment/{slug}/
Related equipment	GET /equipment/{slug}/related/
Equipment categories	GET /categories/
Create a booking	POST /bookings/

Production API URL: https://easyrent-rental-api.onrender.com/api

Getting Started

Prerequisites

* Node.js 22
* npm
* A running backend instance for API-dependent features

1. Clone the repository

git clone https://github.com/glor1ee/team-project-frontend.git
cd team-project-frontend

2. Install dependencies

npm ci

3. Configure the API URL

Create a local environment file:

cp .env.example .env

The example configuration points to a locally running backend:

VITE_API_URL=http://127.0.0.1:8000/api

Make sure the backend is running at http://127.0.0.1:8000. If it runs at a different address, update VITE_API_URL accordingly.

4. Start the development server

npm run dev

Open the local URL printed by Vite. The Vite configuration uses the base path /team-project-frontend/, so the development URL may include that path.

Keep the backend running while testing API-dependent functionality.

Available Scripts

Command	Description
npm run dev	Start the Vite development server
npm run build	Run TypeScript build checks and create a production build in dist/
npm run preview	Preview the production build locally
npm run lint	Run oxlint
npm run lint:fix	Automatically fix supported lint issues
npm run typecheck	Run TypeScript checks without emitting build output
npm run format	Format files with Prettier
npm run format:check	Check formatting without modifying files

Before submitting changes, run:

npm run lint
npm run format:check
npm run typecheck
npm run build

Project Structure

src/
├── api/          # API client, endpoints, response types, and mappers
├── components/   # Reusable UI components
├── context/      # Shared application state and providers
├── data/         # Static content used by the interface
├── pages/        # Application pages
├── types/        # Shared TypeScript types
└── ...

CI and Deployment

GitHub Actions runs the quality workflow on pushes and pull requests targeting main and develop. The workflow checks:

* Linting
* Formatting
* TypeScript types
* Production build

A separate workflow deploys the application to GitHub Pages when changes are pushed to main.

The production build uses:

https://easyrent-rental-api.onrender.com/api

Development Workflow

The project uses main and develop branches. Feature work and fixes should be submitted through pull requests according to the team’s agreed workflow.

Keep this README synchronized with the implementation. Update it whenever API behavior, setup requirements, project status, or deployment configuration changes.
