import rss from '@astrojs/rss';
import { getSlugFromPathname } from '~/utils';
import site from '~/config/site';

const { siteTitle, siteUrl } = site;

export async function get() {
  const postModules = await import.meta.glob('../content/essays/*.md');
  const posts = await Promise.all(Object.keys(postModules).map((path) => postModules[path]()));

  return rss({
    title: siteTitle,
    stylesheet: true,
    description: siteTitle,
    site: siteUrl,
    customData: `<language>en-gb</language>`,
    items: posts
      .sort(
        (
          { frontmatter: { date: dateA } },
          { frontmatter: { date: dateB } },
        ) => Date.parse(dateA) - Date.parse(dateB),
      )
      .map(
        ({
          file,
          frontmatter: { date, title, description },
        }) => {
          const slug = getSlugFromPathname(file);

          return {
            title,
            description,
            link: `${siteUrl}/${slug}/`,
            pubDate: new Date(date),
          };
        },
      ),
  });
}
