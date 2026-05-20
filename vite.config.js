import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite dev server's fallback redirects unknown paths to the SPA index.html.
// `/final/` (the static brand manual) needs to be resolved to its own
// `public/final/index.html` BEFORE that fallback runs. This middleware does
// nothing in production: Vercel/static hosts already resolve directory
// indexes natively and the `vercel.json` rewrite excludes `/final/*`.
const finalIndexFallback = {
  name: 'serve-final-index',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === '/final' || req.url === '/final/') {
        req.url = '/final/index.html';
      }
      next();
    });
  },
};

export default defineConfig({
  plugins: [react(), finalIndexFallback],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
