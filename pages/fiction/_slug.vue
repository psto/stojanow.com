<template>
  <PostContent :page="story" />
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const slug = params.slug || 'index'
    const story = await $content('fiction', slug).fetch()
    return {
      story,
    }
  },
  head() {
    return {
      title: this.story.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.story.description,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://stojanow.com/essays/${this.$route.params.slug}`,
        },
      ],
    }
  },
}
</script>
