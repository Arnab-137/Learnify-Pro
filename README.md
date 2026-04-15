# Study Tracker

This workspace now contains:

- the existing frontend in the project root
- a new production-ready backend in [backend](C:\Users\arnab\OneDrive\Documents\New project\backend)

## Frontend

The current frontend still runs as static files:

- [index.html](C:\Users\arnab\OneDrive\Documents\New project\index.html)
- [dashboard.html](C:\Users\arnab\OneDrive\Documents\New project\dashboard.html)
- [subjects.html](C:\Users\arnab\OneDrive\Documents\New project\subjects.html)
- [lectures.html](C:\Users\arnab\OneDrive\Documents\New project\lectures.html)

## Backend

The backend is built with:

- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- JWT authentication
- bcrypt password hashing

Backend docs and setup instructions are in [backend/README.md](C:\Users\arnab\OneDrive\Documents\New project\backend\README.md).

## Deploy Live On Render

This repo now includes [render.yaml](C:\Users\arnab\OneDrive\Documents\New project\render.yaml) for both services:

- `study-tracker-backend` as a Node web service
- `learnify-pro-frontend` as a static site

### Steps

1. Open your GitHub repo on Render and choose `New +` -> `Blueprint`.
2. Select this repository.
3. Render will detect [render.yaml](C:\Users\arnab\OneDrive\Documents\New project\render.yaml) and create both services.
4. Fill in backend environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `FRONTEND_URLS`
   - `ADMIN_API_KEY`
5. Deploy the blueprint.
6. After the frontend gets its live URL, update backend `FRONTEND_URLS` to that exact frontend URL.
7. Open the live frontend, go to `Settings`, and set `API base URL` to:

```text
https://study-tracker-backend.onrender.com/api
```

If Render assigns a slightly different backend hostname, use that exact URL instead.

### MongoDB Atlas

Before deploying live, make sure your Atlas project allows connections from Render and that your production database password is current and secure.
