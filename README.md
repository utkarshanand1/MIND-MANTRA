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

## Production setup
1. Deploy backend from `server/` to Render.
2. Use a public MongoDB URI for production. Local MongoDB will not work for other devices.
3. Copy `client/.env.production.example` to `client/.env.production` and set `VITE_API_BASE_URL` to your deployed backend URL.
4. Set `CLIENT_ORIGIN=https://utkarshanand1.github.io` in the backend environment.
5. Redeploy GitHub Pages with `npm run deploy`.

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
## LINK - https://utkarshanand1.github.io/MIND-MANTRA/
