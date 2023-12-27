import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import site from "~/config/site";
import { formatContent } from "~/utils";

const { siteDescription, siteTitle, siteUrl } = site;

export async function GET() {
  const posts = await getCollection("essays");
  const formatedPosts = formatContent<"essays">(posts);

  return rss({
    title: siteTitle,
    stylesheet: true,
    description: siteDescription,
    site: siteUrl,
    customData: `<language>en-gb</language>`,
    items: formatedPosts
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        link: `${siteUrl}/${post.slug}/`,
        pubDate: new Date(post.data.date),
      }))
      .sort(
        (postA, postB) => postB.pubDate.getTime() - postA.pubDate.getTime()
      ),
  });
}
