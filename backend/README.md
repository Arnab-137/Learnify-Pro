# Study Tracker Backend

Production-ready backend for the existing Study Tracker / Learnify Pro frontend.

## Stack

- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- JWT authentication
- bcrypt password hashing
- CORS, Helmet, rate limiting, validation

## Folder Structure

```text
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
  seed/
  services/
  utils/
  .env.example
  app.js
  package.json
  server.js
```

## Features

- secure signup/login with hashed passwords
- JWT-protected APIs
- subject and lecture APIs
- user-specific completion tracking
- progress summary with subject-wise breakdown
- recent completions and streaks
- friends search and friend request workflow
- global and friends-only leaderboard
- analytics endpoints for daily, weekly, and subject progress
- optional Resend email notifications
- optional Hugging Face study suggestions
- optional QuickChart chart-image URLs
- DiceBear avatar URLs for every user
- optional YouTube metadata and thumbnails
- daily motivation quote fallback support
- admin routes for subject and lecture creation
- seed script for initial data

## Setup

1. Copy `.env.example` to `.env`
2. Fill in:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `FRONTEND_URLS`
   - `ADMIN_API_KEY`
   - `AUTH_RATE_LIMIT_MAX`
   - optional API keys if you want external integrations:
     - `RESEND_API_KEY`
     - `EMAIL_FROM`
     - `HUGGINGFACE_API_KEY`
     - `HUGGINGFACE_MODEL`
     - `YOUTUBE_API_KEY`
     - `APP_TIMEZONE`
3. Install dependencies:

```bash
npm install
```

4. Seed data:

```bash
npm run seed
```

5. Start development server:

```bash
npm run dev
```

6. Start production server:

```bash
npm start
```

## API Base URL

```text
/api
```

## Auth Endpoints

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

## Subject and Lecture Endpoints

- `GET /api/subjects`
- `GET /api/subjects/:subjectId/lectures`

Optional query params for lectures:

- `date=YYYY-MM-DD`
- `search=term`

## Completion Endpoints

- `POST /api/completions/toggle`
- `GET /api/completions/summary`
- `GET /api/completions/recent`

`POST /api/completions/toggle` body:

```json
{
  "lectureId": "lecture_object_id",
  "completed": true
}
```

Use `"completed": false` to mark a lecture incomplete.

## Friend Endpoints

- `GET /api/friends/search?q=arnab`
- `POST /api/friends/request/:userId`
- `POST /api/friends/accept/:userId`
- `POST /api/friends/reject/:userId`
- `GET /api/friends/list`
- `GET /api/friends/requests`

## Leaderboard Endpoints

- `GET /api/leaderboard/global`
- `GET /api/leaderboard/friends`

## Analytics Endpoints

- `GET /api/analytics/overview`
- `GET /api/analytics/daily?days=14`
- `GET /api/analytics/weekly?weeks=8`
- `GET /api/analytics/subjects`
- `GET /api/analytics/quote`
- `GET /api/analytics/insights`

These are designed for Chart.js on the frontend and also include a free QuickChart image URL where useful.

## Admin Endpoints

Protected by `x-admin-key` header:

- `POST /api/admin/subjects`
- `POST /api/admin/lectures`

## Deployment

### Render

1. Create a new Web Service from this repo
2. Set `Root Directory` to `backend`
3. Build command:

```bash
npm install
```

4. Start command:

```bash
npm start
```

5. Add environment variables from `.env.example`

### Railway

1. Create a new project
2. Point the service at the `backend` folder
3. Add environment variables
4. Deploy using:
   - Build: `npm install`
   - Start: `npm start`

## Notes for Frontend Integration

- Send JWT in `Authorization` header:

```text
Bearer <token>
```

- The backend returns structured JSON with:
  - `success`
  - `message`
  - `data`

- `AUTH_RATE_LIMIT_MAX=0` disables the auth limiter entirely
- set `AUTH_RATE_LIMIT_MAX` to a positive number later if you want to re-enable throttling

- Subject and lecture data are shared for all authenticated users
- Completion, friends, and leaderboard personalization depend on the authenticated user
- If an external API fails, the core app still works and returns fallback-friendly data

## External Services

### Resend

- Sends welcome email on signup
- Sends login alert email
- Sends friend request notification email
- Safely skips email if API keys are missing

### QuickChart

- Backend returns prebuilt chart URLs for daily, weekly, and subject progress
- Useful for image-based reporting or export features

### Hugging Face

- Optional study tip enhancement
- Falls back to built-in rule-based suggestions when unavailable

### DiceBear

- Auto-generated avatars using the user's name or email
- No upload flow required

### Quotable

- Daily motivational quote endpoint
- Falls back to a local quote if the public API is unavailable

### YouTube Data API

- Optional lecture video metadata enrichment
- Thumbnail fallback works even without an API key for standard YouTube links
