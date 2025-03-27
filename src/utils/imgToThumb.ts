export const imgToThumb = (url: string, size: number): string => {
  if (url.endsWith('.svg')) {
    return url;
  } else {
    return url + '-' + size;
  }
};
