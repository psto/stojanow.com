import path from 'path';

export function formatDate(dateStr: string | Date) {
  return new Date(dateStr).toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const getSlugFromPathname = (pathname: string) =>
  path.basename(pathname, path.extname(pathname));
