import type { CollectionEntry, getCollection } from "astro:content";

export function formatDate(dateStr: string | Date) {
  return new Date(dateStr).toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

type CollectionKey = Parameters<typeof getCollection>[0]
type CollectionEntries<TCollection> = TCollection extends CollectionKey ? CollectionEntry<TCollection> : never;

export function formatContent<TCollection extends CollectionKey>(posts: CollectionEntries<TCollection>[], {
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

  const filteredPosts = posts.reduce((acc: CollectionEntries<TCollection>[], post) => {
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
