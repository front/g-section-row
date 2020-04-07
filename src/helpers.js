export function getImageUrl (media, sizeSlug) {
  let url;

  // Keep compability with old versions of WP
  if (media && media.sizes && media.sizes[sizeSlug]) {
    url = media.sizes[sizeSlug].url;
  }

  if (media && media.media_details && media.media_details.sizes[sizeSlug]) {
    url = media.media_details.sizes[sizeSlug].source_url;
  }

  if (!url) {
    url = media.url;
  }

  if (!media || !url) {
    console.warn(`'${sizeSlug}' size not found`);
    return null;
  }

  return url;
}
