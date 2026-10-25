# NOVA MARKET — Corrected Dual-Engine E-Commerce Store

## Canonical files
- `index.html` + `css/style.css` + `js/app.js` — customer storefront
- `admin-login.html` + `admin-login.css` + `admin-login.js` — admin login
- `admin-dashboard.html` + `css/admin-dashboard.css` + `admin-dashboard.js` — admin dashboard
- `backend/` — Express + MongoDB API

## Important fixes
- Removed duplicate legacy admin dashboard files.
- Added `store` and `brand` fields to the Product model.
- Fixed admin dashboard file paths.
- Added admin JWT protection to product create/update/delete.
- Added admin JWT protection to order list/details/status/delete.
- Fixed backend middleware location.
- Added proper product update and delete API routes.
- Added setup-key protection for the one-time admin creation endpoint.
- Fixed backend startup so database connection errors are reported clearly.
- The cart and checkout code uses numeric-safe price/quantity calculations to prevent NaN totals.

## Before running
1. Open `backend/.env`.
2. Verify your MongoDB connection string.
3. Change `JWT_SECRET` to a long random secret.
4. Change `ADMIN_SETUP_KEY` to a private one-time setup key.
5. Inside `backend`, run:
   `npm install`
6. Start the backend:
   `npm run dev`
7. Open `admin-login.html` through a local frontend server.

## Deploying the complete site on Render

The repository-root `render.yaml` deploys the storefront, admin pages, and API
as one Node web service, so the frontend uses the deployed API automatically.

1. Push the repository to GitHub and create a MongoDB Atlas database. Configure
   Atlas network access for Render and copy the database connection string.
2. In Render, choose **New → Blueprint**, connect the repository, and apply
   `render.yaml` at the repository root.
3. Set `MONGO_URI` to the Atlas connection string in the Render service's
   environment settings. Keep database credentials out of GitHub and chat.
   Render generates `JWT_SECRET` and `ADMIN_SETUP_KEY` for the service.
4. Wait for the `/health` check to pass. Open the Render service URL for the
   storefront and append `/admin-login.html` for the admin login.
5. Sign in with the existing admin account in the configured MongoDB database.
   Do not call `/api/auth/create-admin` when an admin already exists.

The free Render service may sleep when idle, so its first request after a period
of inactivity can take longer. Change any temporary or weak admin password
before using the deployed store.
