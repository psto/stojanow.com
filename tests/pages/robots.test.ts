import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import {
  getRobotsTxt,
  getRobotsTxtFromAI,
  AI_ROBOTS_GITHUB_URL,
} from "../../src/pages/robots.txt";

const MOCK_AI_ROBOTS_CONTENT = `User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /private/`;

describe("robots.txt generation", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        text: () => Promise.resolve(MOCK_AI_ROBOTS_CONTENT),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    global.fetch = originalFetch;
  });

  describe("getRobotsTxt", () => {
    it("includes sitemap URL in output", async () => {
      const sitemapURL = new URL("https://example.com/sitemap-index.xml");
      const result = await getRobotsTxt(sitemapURL);

      expect(result).toContain(
        "Sitemap: https://example.com/sitemap-index.xml",
      );
    });

    it("includes AI robots.txt content", async () => {
      const sitemapURL = new URL("https://example.com/sitemap-index.xml");
      const result = await getRobotsTxt(sitemapURL);

      expect(result).toContain("User-agent: *");
      expect(result).toContain("Disallow: /api/");
    });

    it("appends sitemap after AI content", async () => {
      const sitemapURL = new URL("https://example.com/sitemap-index.xml");
      const result = await getRobotsTxt(sitemapURL);

      const lines = result.split("\n");
      const sitemapLineIndex = lines.findIndex((line) =>
        line.startsWith("Sitemap:"),
      );
      const disallowLineIndex = lines.findIndex((line) =>
        line.startsWith("Disallow:"),
      );

      expect(sitemapLineIndex).toBeGreaterThan(disallowLineIndex);
    });
  });

  describe("getRobotsTxtFromAI", () => {
    it("fetches from AI_ROBOTS_GITHUB_URL", async () => {
      await getRobotsTxtFromAI();

      expect(fetch).toHaveBeenCalledWith(AI_ROBOTS_GITHUB_URL);
    });

    it("returns text content from response", async () => {
      const result = await getRobotsTxtFromAI();

      expect(result).toBe(MOCK_AI_ROBOTS_CONTENT);
    });

    it("handles fetch errors", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockRejectedValue(new Error("Network error")),
      );

      await expect(getRobotsTxtFromAI()).rejects.toThrow("Network error");
    });
  });

  describe("getRobotsTxt with different URL types", () => {
    it("handles HTTPS URLs", async () => {
      const sitemapURL = new URL("https://secure.example.com/sitemap.xml");
      const result = await getRobotsTxt(sitemapURL);

      expect(result).toContain("https://secure.example.com/sitemap.xml");
    });

    it("handles URLs with ports", async () => {
      const sitemapURL = new URL("http://localhost:3000/sitemap.xml");
      const result = await getRobotsTxt(sitemapURL);

      expect(result).toContain("http://localhost:3000/sitemap.xml");
    });

    it("handles URLs with paths", async () => {
      const sitemapURL = new URL("https://example.com/blog/sitemap-index.xml");
      const result = await getRobotsTxt(sitemapURL);

      expect(result).toContain("https://example.com/blog/sitemap-index.xml");
    });
  });
});
