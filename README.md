# Mind Mantra

A mental wellness web app with guided meditation, yoga routines, and stress-management resources. Built with the MERN stack.

## Monorepo layout
- `client` - React + Vite frontend
- `server` - Node + Express + MongoDB API

## Quick start
1. Install dependencies
   - `npm install`
2. Configure env
   - `cp client/.env.example client/.env`
   - `cp server/.env.example server/.env`
   - Set Firebase client/admin values and `JWT_SECRET`
3. Run dev servers
   - `npm run dev`

## Scripts
- `npm run dev` - runs client and server together
- `npm run dev:client` - runs client only
- `npm run dev:server` - runs server only
- `npm run build` - builds client
- `npm run start` - starts server

## Notes
- The API base URL in the client is `http://localhost:5001` by default in dev.
- Update `server/.env` with MongoDB and Firebase Admin credentials.
- Authentication endpoints:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/firebase`
  - `GET /api/auth/me` (Bearer token required)
## LINK - https://github.com/utkarshanand1/MIND-MANTRA
