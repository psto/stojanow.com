<template>
  <PostContent :page="essay" />
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const slug = params.slug || 'index'
    const essay = await $content('essays', slug).fetch()
    return {
      essay,
    }
  },
  head() {
    return {
      title: this.essay.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.essay.description,
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
