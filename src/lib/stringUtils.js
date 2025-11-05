export function capitalizeFirstLetter(string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}


/**
 * If the input looks like a translation/key (no spaces, only letters/numbers/._-),
 * return its lowercase form; otherwise return the original string.
 */
export function toLowerIfKey(string) {
  if (!string) return string;
  // treat strings without whitespace as potential keys
  // Consider strings that contain only letters, numbers, spaces, dot, underscore or hyphen
  // as potential keys. We'll normalize accents and replace spaces with underscores.
  const keyLike = /^[A-Za-z0-9\s._-]+$/.test(string);
  if (!keyLike) return string;

  // remove accents/diacritics: decompose and strip combining marks
  const withoutAccents = string.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  // lowercase
  let normalized = withoutAccents.toLowerCase();
  // replace spaces with underscores
  normalized = normalized.replace(/\s+/g, "_");
  // remove any characters that are not a-z, 0-9, dot, underscore or hyphen
  normalized = normalized.replace(/[^a-z0-9._-]+/g, "");
  // collapse multiple underscores
  normalized = normalized.replace(/_+/g, "_");
  // trim leading/trailing underscores or dots or hyphens
  normalized = normalized.replace(/^[_\.-]+|[_\.-]+$/g, "");

  return normalized;
}