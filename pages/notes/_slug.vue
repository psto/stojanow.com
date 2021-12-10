<template>
  <div class="flex mt-4">
    <div class="mx-auto">
      <article
        class="max-w-2xl px-4 pt-8 pb-16 mx-auto prose dark:prose-dark md:pt-0"
      >
        <NotesHeader :note="page" />

        <nuxt-content
          :document="page"
          class="prose dark:prose-dark"
        />

        <SubscriptionForm />
      </article>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const slug = params.slug || 'index'
    const page = await $content('notes', slug).fetch()
    return {
      page,
    }
  },
  head() {
    return {
      title: this.page.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.description,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://stojanow.com/notes/${this.$route.params.slug}`,
        },
      ],
    }
  },
}
</script>
