import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isVercelBuild = process.env.VERCEL === "1" || process.env.VERCEL === "true";
  const useHashRouter = env.VITE_USE_HASH_ROUTER === "true" && !isVercelBuild;

  return {
    base: mode === "production" && useHashRouter ? "/MIND-MANTRA/" : "/",
    plugins: [react()],
    server: {
      port: 5173
    }
  };
});
