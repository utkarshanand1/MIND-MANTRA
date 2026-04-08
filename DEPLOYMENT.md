# Mind Mantra Deployment Guide

## Option 1: GitHub Pages + Render

Use this if you want to keep the frontend on GitHub Pages and deploy the API separately.

### Backend on Render

1. Create a new Web Service from this repo.
2. Set `Root Directory` to `server`.
3. Use:
   - `Build Command`: `npm install`
   - `Start Command`: `npm start`
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLIENT_ORIGIN=https://utkarshanand1.github.io`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
5. Deploy and copy the Render URL.

### Frontend on GitHub Pages

1. Copy `client/.env.github-pages.example` to `client/.env.production`.
2. Set `VITE_API_BASE_URL` to your Render backend URL.
3. Keep `VITE_USE_HASH_ROUTER=true`.
4. Run:
   ```bash
   npm run deploy
   ```

## Option 2: Vercel + Render

Use this if you want cleaner URLs on the frontend.

### Frontend on Vercel

1. Import this repo in Vercel.
2. Set `Root Directory` to `client`.
3. Framework preset: `Vite`.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add environment variables:
   - `VITE_USE_HASH_ROUTER=false`
   - `VITE_API_BASE_URL=https://your-render-service.onrender.com`
   - Firebase web config variables (`VITE_FIREBASE_*`)
7. Deploy.

### Backend on Render

Use the same Render setup described above.

## Important Notes

- Local MongoDB (`mongodb://127.0.0.1:27017/...`) only works on your machine.
- For public login/signup, use a hosted MongoDB connection string.
- Add your deployed frontend domain to Firebase Authentication authorized domains.
