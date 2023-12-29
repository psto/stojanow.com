import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import site from "~/config/site";
import { formatContent } from "~/utils";

const { siteDescription, siteTitle, siteUrl } = site;

export async function GET() {
  const essays = await getCollection("essays");
  const fiction = await getCollection("fiction");
  const posts = [...essays, ...fiction];
  const formatedPosts = formatContent<"essays" | "fiction">(posts);

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
