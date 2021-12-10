<template>
  <section class="py-12 overflow-hidden md:py-20 lg:py-24">
    <div class="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <svg
        class="
          absolute
          transform
          top-full
          right-full
          translate-x-1/3
          -translate-y-1/4
          lg:translate-x-1/2
          xl:-translate-y-1/2
        "
        width="404"
        height="404"
        fill="none"
        viewBox="0 0 404 404"
        role="img"
        aria-labelledby="svg-workcation"
      >
        <defs>
          <pattern
            id="ad119f34-7694-4c31-947f-5c9d249b21f3"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              class="text-gray-200 dark:text-gray-800"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)"
        />
      </svg>

      <div class="relative">
        <blockquote class="text-gray-900 dark:text-white">
          <div class="mb-4 flex items-center justify-center">
            <NuxtImg
              src="/images/avatar.png"
              class="rounded-full"
            />
          </div>
          <div
            class="max-w-3xl mx-auto text-2xl font-medium leading-9 text-center"
          >
            <p>
              Hi, I’m
              <a
                href="https://twitter.com/piotrstojanow"
                class="text-brand-red filter hover:brightness-125"
              >Piotr Stojanow</a>. Welcome to my online home. I write on the intersection of
              technology and history. Want to learn more about me?
            </p>
            <NuxtLink to="/about">
              <AppButton :cta="heroCTA" />
            </NuxtLink>
          </div>

          <!-- Comment
          <footer class="mt-4">
            <div class="md:flex md:items-center md:justify-center">
              <div class="md:flex-shrink-0">
                <AppAvatar />
              </div>
              <div
                class="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center"
              >
                <div class="text-base font-medium">Piotr Stojanow</div>
              </div>
            </div>
          </footer>
          -->
        </blockquote>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      heroCTA: 'Start Here',
    }
  },
}
</script>
