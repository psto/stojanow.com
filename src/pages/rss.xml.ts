import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import site from '~/config/site';

const { siteDescription, siteTitle, siteUrl } = site;

export async function get() {
  const posts = await getCollection('essays');

  return rss({
    title: siteTitle,
    stylesheet: true,
    description: siteDescription,
    site: siteUrl,
    customData: `<language>en-gb</language>`,
    items: posts
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        link: `${siteUrl}/${post.slug}/`,
        pubDate: new Date(post.data.date),
      }))
      .sort((postA, postB) => postB.pubDate.getTime() - postA.pubDate.getTime()),
  });
}
