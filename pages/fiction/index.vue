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
      <hr>
    </div>
    <div class="relative mx-auto max-w-7xl">
      <div
        class="
          grid
          max-w-lg
          gap-5
          mx-auto
          mt-12
          md:grid-cols-2 md:max-w-none
          lg:grid-cols-3 lg:max-w-none
        "
      >
        <div
          v-for="story of fiction"
          :key="story.slug"
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
            :to="`/fiction/${story.slug}`"
            class="no-underline"
          >
            <PostsCard :post="story" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const fiction = await $content('fiction')
      .where({ published: { $ne: false } })
      .sortBy('date', 'desc')
      .fetch()
    return {
      fiction,
    }
  },
  data() {
    return {
      selectedTag: 'all',
      title: 'Fiction',
      description: "Piotr Stojanow's flash fiction and microfiction",
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
          href: 'https://stojanow.com/fiction',
        },
      ],
    }
  },
}
</script>
