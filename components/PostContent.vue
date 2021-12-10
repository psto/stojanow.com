<template>
  <div class="relative px-4 pt-16 pb-20 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div class="mx-auto">
      <article
        class="max-w-2xl px-4 pt-8 pb-16 mx-auto prose dark:prose-dark md:pt-0"
      >
        <PostHeader :post="page" />

        <NuxtImg
          :src="page.image"
          :alt="page.imageAlt"
          class="rounded"
        />

        <nuxt-content
          :document="page"
          class="prose dark:prose-dark"
        />

        <hr>
        <SubscriptionForm />
      </article>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      required: true,
      validator: (page) => {
        return (
          Object.prototype.hasOwnProperty.call(page, 'image') &&
          Object.prototype.hasOwnProperty.call(page, 'imageAlt')
        )
      },
    },
  },
}
</script>
