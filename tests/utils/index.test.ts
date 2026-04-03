import { describe, it, expect } from "vitest";
import { formatDate, formatContent } from "~/utils/index";
import type { CollectionEntry } from "astro:content";

describe("formatDate", () => {
  it("formats ISO date string", () => {
    expect(formatDate("2024-01-15")).toBe("January 15, 2024");
  });

  it("formats Date object", () => {
    expect(formatDate(new Date(2024, 0, 15))).toBe("January 15, 2024");
  });

  it("formats single digit day", () => {
    expect(formatDate("2024-06-01")).toBe("June 1, 2024");
  });

  it("formats end of year", () => {
    expect(formatDate("2024-12-31")).toBe("December 31, 2024");
  });
});

describe("formatContent", () => {
  const createMockPost = (
    id: string,
    date: string,
    draft = false,
  ): CollectionEntry<"essays"> =>
    ({
      id,
      data: {
        title: `Post ${id}`,
        date,
        description: `Description ${id}`,
        draft,
      },
      collection: "essays",
    }) as CollectionEntry<"essays">;

  it("filters out drafts", () => {
    const posts = [
      createMockPost("1", "2024-01-01", false),
      createMockPost("2", "2024-01-02", true),
      createMockPost("3", "2024-01-03", false),
    ];

    const result = formatContent<"essays">(posts, { filterOutDrafts: true });

    expect(result).toHaveLength(2);
    expect(result.map((p) => p.id)).toEqual(["3", "1"]);
  });

  it("filters out future posts", () => {
    const pastDate = "2020-01-01";
    const futureDate = "2099-01-01";

    const posts = [
      createMockPost("past", pastDate),
      createMockPost("future", futureDate),
    ];

    const result = formatContent<"essays">(posts, {
      filterOutFuturePosts: true,
    });

    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe("past");
  });

  it("sorts by date descending", () => {
    const posts = [
      createMockPost("old", "2024-01-01"),
      createMockPost("new", "2024-12-31"),
      createMockPost("mid", "2024-06-15"),
    ];

    const result = formatContent<"essays">(posts, { sortByDate: true });

    expect(result.map((p) => p.id)).toEqual(["new", "mid", "old"]);
  });

  it("limits results", () => {
    const posts = [
      createMockPost("1", "2024-01-01"),
      createMockPost("2", "2024-01-02"),
      createMockPost("3", "2024-01-03"),
    ];

    const result = formatContent<"essays">(posts, { limit: 2 });

    expect(result).toHaveLength(2);
  });

  it("returns all when filters disabled", () => {
    const posts = [
      createMockPost("1", "2024-01-01", true),
      createMockPost("2", "2099-01-01"),
    ];

    const result = formatContent<"essays">(posts, {
      filterOutDrafts: false,
      filterOutFuturePosts: false,
    });

    expect(result).toHaveLength(2);
  });

  it("handles empty array", () => {
    const result = formatContent<"essays">([]);
    expect(result).toEqual([]);
  });

  it("handles mixed content correctly", () => {
    const posts = [
      createMockPost("published", "2024-01-01", false),
      createMockPost("draft", "2024-01-02", true),
      createMockPost("future", "2099-01-01", false),
    ];

    const result = formatContent<"essays">(posts);

    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe("published");
  });
});
