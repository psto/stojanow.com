import type { APIRoute } from 'astro';

const aiRobotsGithubURL = "https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/refs/heads/main/robots.txt";

const getRobotsTxtFromAI = async () => {
  const response = await fetch(aiRobotsGithubURL);
  return response.text();
};

const getRobotsTxt = async (sitemapURL: URL) => {
  const aiRobotsGithubTxt = await getRobotsTxtFromAI();

  return `${aiRobotsGithubTxt}

Sitemap: ${sitemapURL.href}
`;
};

export const GET: APIRoute = async ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(await getRobotsTxt(sitemapURL));
};
