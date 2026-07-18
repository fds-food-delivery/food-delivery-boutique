// En mode mock, `image` est déjà une URL locale résolue par Vite (import d'asset,
// donc absolue ou en /src/assets/...). En mode API réelle, `image` est juste un
// nom de fichier à concaténer avec l'URL du backend/S3.
export const resolveImageUrl = (image, base) => {
  if (!image) return null;
  if (/^(https?:)?\/\//.test(image) || image.startsWith("/") || image.startsWith("data:")) {
    return image;
  }
  return `${base}/${image}`;
};
