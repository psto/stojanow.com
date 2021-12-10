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
      <AppTitle v-if="error.statusCode === 404">
        Page not found 😣
      </AppTitle>
      <AppTitle v-else>
        A mysterious error occurred 🔮
      </AppTitle>
    </div>
    <div class="max-w-2xl px-4 pt-8 pb-16 mx-auto prose dark:prose-dark md:pt-0 text-center">
      <p>
        If this was my fault (like a bad link) I'd appreciate a
        <NuxtLink to="/contact">heads up</NuxtLink>.
        Go back <nuxt-link to="/">home 🏠</nuxt-link>.
      </p>
      <div class="items-center md:flex">
        <NuxtImg
          src="/images/Don_Quixote_by_Picasso.svg"
          alt="Don Quixote by Picasso"
          class="bg-white dark:bg-gray-200 rounded-xl"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
