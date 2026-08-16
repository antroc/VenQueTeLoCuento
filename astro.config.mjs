import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// La web se publica en https://venquetelocuento.es (dominio propio, servido
// por GitHub Pages; el dominio se configura en Settings → Pages del repo y
// queda documentado en public/CNAME). Al vivir en la raíz del dominio no hace
// falta ningún prefijo de subcarpeta: `base` es '/'.
//
// Antes se publicaba en https://antroc.github.io/VenQueTeLoCuento/ y el build
// llevaba `base: '/VenQueTeLoCuento'`. Las rutas internas siguen pasando por el
// helper url() de src/lib/url.ts, que con base '/' las devuelve tal cual; si
// algún día la web volviera a una subcarpeta, bastaría con cambiar `base` aquí.
export default defineConfig({
  site: 'https://venquetelocuento.es',
  base: '/',
  output: 'static',
  integrations: [
    // Genera sitemap-index.xml en cada build, con todas las páginas
    // menos el editor local /admin (que además lleva noindex).
    sitemap({
      filter: (pagina) => !pagina.includes('/admin'),
    }),
  ],
  // Si la variable PORT existe (la pone la herramienta de previsualización
  // cuando el 4321 está ocupado), el servidor de desarrollo la respeta.
  server: { port: process.env.PORT ? Number(process.env.PORT) : 4321 },
});
