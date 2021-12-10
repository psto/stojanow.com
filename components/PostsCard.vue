<template>
  <div class="bg-white dark:bg-dark-light">
    <div class="flex-shrink-0">
      <NuxtImg
        :src="post.image"
        :alt="post.imageAlt"
        class="object-cover w-full h-64 rounded-t-xl"
      />
    </div>
    <div class="flex flex-col justify-between flex-1 p-6">
      <div class="flex-1">
        <div class="block mt-2">
          <p
            class="
              text-xl
              font-semibold
              text-brand-red
              hover:text-gray-900
              dark:hover:text-white
            "
          >
            {{ post.title }}
          </p>
          <p class="mt-3 text-base dark:text-gray-400">
            {{ post.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col content-end flex-1 p-6 pt-0">
      <p
        class="
          text-brand-red
          hover:text-black
          dark:text-white dark:hover:text-brand-red
        "
      >
        Read More
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>
