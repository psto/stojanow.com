import type { CollectionEntry } from "astro:content";
import { collections } from "~/content/config";

export function formatDate(dateStr: string | Date) {
  return new Date(dateStr).toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

type CollectionsKey = keyof typeof collections;

export function formatContent<TCollection extends CollectionsKey>(posts: CollectionEntry<TCollection>[], {
  filterOutDrafts = true,
  filterOutFuturePosts = true,
  sortByDate = true,
  limit = undefined,
}: {
  filterOutDrafts?: boolean,
  filterOutFuturePosts?: boolean,
  sortByDate?: boolean,
  limit?: undefined | number,
} = {}) {

  const filteredPosts = posts.reduce((acc: CollectionEntry<TCollection>[], post) => {
    const { date, draft } = post.data;
    if (filterOutDrafts && draft) return acc;

    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

    acc.push(post)
    return acc;
  }, [])

  // sort by date or randomize
  if (sortByDate) {
    filteredPosts.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf())
  } else {
    filteredPosts.sort(() => Math.random() - 0.5)
  }

  // limit if number is passed
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;
}
