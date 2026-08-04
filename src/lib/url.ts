// Todas las rutas internas de la web (enlaces e imágenes) pasan por aquí.
//
// Hace falta porque la web se publica dentro de una subcarpeta
// (antroc.github.io/VenQueTeLoCuento/) y no en la raíz de un dominio: sin este
// prefijo, un enlace a "/blog" apuntaría a antroc.github.io/blog, que no existe.
//
// El día que la web se mude a su dominio propio, basta con cambiar `base` en
// astro.config.mjs: estas funciones devolverán las rutas sin prefijo solas.

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
