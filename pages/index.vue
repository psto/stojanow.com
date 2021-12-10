<template>
  <div>
    <TheHero />
    <div>
      <div
        class="
          relative
          max-w-6xl
          px-4
          pt-16
          pb-20
          mx-auto
          sm:px-6
          lg:pt-24 lg:pb-28 lg:px-8
        "
      >
        <div>
          <h2
            class="
              text-3xl
              font-extrabold
              leading-9
              tracking-tight
              text-gray-900
              dark:text-white
              sm:text-4xl sm:leading-10
            "
          >
            Recent articles
          </h2>
        </div>
        <div
          class="
            grid
            gap-16
            pt-12
            mt-12
            border-t-2 border-gray-200
            dark:border-gray-800
            lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16
          "
        >
          <div
            v-for="(essay, index) of essays"
            :key="index"
          >
            <div class="flex items-baseline">
              <div
                class="
                  flex
                  mr-8
                  text-sm
                  leading-5
                  text-gray-700
                  dark:text-gray-400
                "
              >
                <time :datetime="essay.date">
                  {{ essay.date | formatDate }}
                </time>
              </div>
            </div>

            <NuxtLink
              :to="`/essays/${essay.slug}`"
              class="group"
            >
              <h3
                class="
                  mt-4
                  text-xl
                  font-semibold
                  leading-7
                  text-brand-red
                  filter
                  hover:brightness-125
                "
              >
                {{ essay.title }}
              </h3>

              <p
                class="
                  mt-3
                  text-base
                  leading-6
                  text-gray-700
                  dark:text-gray-200
                "
              >
                {{ essay.description }}
              </p>
            </NuxtLink>
          </div>

          <div class="flex items-center mx-auto">
            <NuxtLink to="/essays">
              <AppButton :cta="recentCTA" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <SubscriptionForm />
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const essays = await $content('essays')
      .only(['title', 'description', 'slug', 'date'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return {
      essays,
    }
  },
  data() {
    return {
      recentCTA: 'Read More →',
    }
  },
  head() {
    return {
      title: "Hi, I'm Piotr Stojanow.",
      titleTemplate: '',
    }
  },
}
</script>
