<template>
  <div class="relative px-4 pt-16 pb-20 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div
      class="
        max-w-2xl
        px-4
        mx-auto
        prose
        text-center
        dark:prose-dark
        lg:prose-lg
        md:pt-0
      "
    >
      <AppTitle>{{ title }}</AppTitle>
      <p>
        Constantly updated list of books I've read with
        <strong>detailed notes</strong>.
      </p>
      <p>
        If you are certain that I'll enjoy a book,
        <NuxtLink to="/contact">
          email me
        </NuxtLink> a recommendation!
      </p>
      <p>
        I also keep notes at my <a href="https://wiki.stojanow.com">wiki</a>.
      </p>
      <hr>
    </div>
    <div class="relative mx-auto max-w-7xl">
      <div
        class="
          grid
          max-w-lg
          gap-6
          mx-auto
          mt-12
          md:grid-cols-2 md:max-w-none
          lg:grid-cols-3 lg:max-w-none
        "
      >
        <div
          v-for="note of notes"
          :key="note.slug"
          class="
            flex flex-col
            overflow-hidden
            transition-all
            duration-500
            transform
            rounded-lg
            shadow-lg
            dark:bg-dark-light
            hover:scale-105 hover:shadow-2xl
          "
        >
          <NuxtLink
            :to="`/notes/${note.slug}`"
            class="no-underline"
          >
            <PostsCard :post="note" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const notes = await $content('notes')
      .where({ published: { $ne: false } })
      .sortBy('date', 'desc')
      .fetch()
    return {
      notes,
    }
  },
  data() {
    return {
      selectedTag: 'all',
      title: 'Book Notes',
      description:
        "Piotr Stojanow's book notes. Detailed notes on books I've read. If a book is here, then it's recommended.",
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://stojanow.com/notes',
        },
      ],
    }
  },
}
</script>
