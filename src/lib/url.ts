// Todas las rutas internas de la web (enlaces e imágenes) pasan por aquí.
//
// Hoy la web se publica en la raíz de venquetelocuento.es (`base: '/'` en
// astro.config.mjs), así que estas funciones devuelven las rutas tal cual.
// Se mantienen porque hasta agosto de 2026 la web vivía en la subcarpeta
// antroc.github.io/VenQueTeLoCuento/ y, si algún día vuelve a una subcarpeta,
// basta con cambiar `base` en astro.config.mjs para que todo siga funcionando.

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Convierte una ruta interna ("/blog") en la ruta pública real. */
export function url(path: string): string {
  return base + (path.startsWith('/') ? path : `/${path}`);
}

/** Quita el prefijo a una ruta del navegador, para poder compararla en el menú. */
export function sinBase(pathname: string): string {
  const limpia = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return limpia || '/';
}
