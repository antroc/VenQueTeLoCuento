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

// Los artículos del blog llevan rutas absolutas ("/img/...", "/pdf/...") dentro
// de su markdown. Las plantillas .astro pasan sus rutas por el helper url(),
// pero el HTML que sale del markdown no, así que este plugin añade el prefijo
// de la subcarpeta al generar cada página. En desarrollo no hace nada.
function rehypePrefijoBase() {
  const prefijo = enProduccion ? '/VenQueTeLoCuento' : '';
  const procesa = nodo => {
    if (nodo.type === 'element' && nodo.properties) {
      for (const attr of ['src', 'href']) {
        const valor = nodo.properties[attr];
        if (typeof valor === 'string' && valor.startsWith('/') && !valor.startsWith('//')) {
          nodo.properties[attr] = prefijo + valor;
        }
      }
    }
    if (nodo.type === 'raw' && typeof nodo.value === 'string') {
      nodo.value = nodo.value
        .replaceAll('src="/', `src="${prefijo}/`)
        .replaceAll('href="/', `href="${prefijo}/`);
    }
    (nodo.children || []).forEach(procesa);
  };
  return tree => {
    if (prefijo) procesa(tree);
  };
}

export default defineConfig({
  site: 'https://antroc.github.io',
  base: enProduccion ? '/VenQueTeLoCuento' : '/',
  output: 'static',
  markdown: {
    rehypePlugins: [rehypePrefijoBase],
  },
  // Si la variable PORT existe (la pone la herramienta de previsualización
  // cuando el 4321 está ocupado), el servidor de desarrollo la respeta.
  server: { port: process.env.PORT ? Number(process.env.PORT) : 4321 },
});
