// Miniaturas de los reels reducidas en el build.
//
// Las fotos originales viven en public/img/reels/ tal como las sube Carmen
// (1200-1600 px de lado, ~160 KB cada una). En la página de vídeos y en el
// popup del mapa se pintan a ~200 px de ancho, así que aquí se generan
// versiones de 480 px en webp (~30-40 KB) con el servicio de imágenes de
// Astro. Si la foto todavía no existe, se devuelve null y la página cae al
// comportamiento de siempre (ruta original → icono de la categoría).
//
// La ruta que llega es la que hay en reels.json ("/img/reels/001-x.jpg").
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

// Astro procesa cualquier imagen importada por ESM, esté donde esté, así que
// las fotos pueden seguir en public/ sin cambiar el flujo de trabajo del README.
const originales = import.meta.glob<ImageMetadata>(
  '../../public/img/reels/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' },
);

const porRuta = new Map<string, ImageMetadata>(
  Object.entries(originales).map(([clave, meta]) => ['/img/reels/' + clave.split('/').pop(), meta]),
);

const ANCHO = 480;

/** URL de la miniatura reducida (webp, 480 px de ancho), o null si la foto no existe. */
export async function miniatura(ruta: string): Promise<string | null> {
  const meta = porRuta.get(ruta);
  if (!meta) return null;
  // Sin ampliar: si la foto original es más pequeña, se deja a su tamaño
  // (ampliarla solo la haría más borrosa y más pesada).
  const width = Math.min(ANCHO, meta.width);
  const img = await getImage({ src: meta, width, format: 'webp', quality: 78 });
  return img.src;
}

/** Miniaturas reducidas de una lista de reels, indexadas por id. */
export async function miniaturas(
  reels: { id: string; miniatura: string }[],
): Promise<Record<string, string>> {
  const pares = await Promise.all(
    reels.map(async (r) => [r.id, await miniatura(r.miniatura)] as const),
  );
  const resultado: Record<string, string> = {};
  for (const [id, src] of pares) if (src) resultado[id] = src;
  return resultado;
}
