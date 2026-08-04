import { defineConfig } from 'astro/config';

// La web se publica en https://antroc.github.io/VenQueTeLoCuento/, es decir,
// dentro de una subcarpeta. Por eso el build necesita el prefijo `base`.
//
// En `npm run dev` no se aplica, para que localhost:4321 y localhost:4321/admin
// sigan funcionando igual que siempre.
//
// CUANDO TENGAS EL DOMINIO: pon `site: 'https://venquetelocuento.es'`,
// `base: '/'` y crea el fichero public/CNAME. No hay que tocar nada más.
const enProduccion = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://antroc.github.io',
  base: enProduccion ? '/VenQueTeLoCuento' : '/',
  output: 'static',
});
