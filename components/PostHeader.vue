<template>
  <header>
    <div class="lg:prose-lg">
      <AppTitle>{{ post.title }}</AppTitle>
    </div>

    <div class="flex justify-center">
      <time
        :datetime="post.date"
        class="block text-sm italic text-center text-gray-400"
      >
        {{ post.date | formatDate }}
      </time>
    </div>

    <div class="flex justify-center">
      <div class="flex items-center">
        <AppAvatar class="mr-2" />

        <dl class="text-sm font-medium text-gray-700 whitespace-nowrap">
          <dt class="sr-only">
            Name
          </dt>
          <dd>
            <NuxtLink
              to="/"
              class="text-gray-700 dark:text-gray-300 no-underline"
            >
              Piotr Stojanow
            </NuxtLink>
          </dd>
          <dt class="sr-only">
            Twitter
          </dt>
          <dd>
            <a
              href="https://twitter.com/@piotrstojanow"
              class="no-underline text-primary-600 hover:text-primary-700"
            >@piotrstojanow</a>
          </dd>
        </dl>
      </div>
    </div>

    <hr>
  </header>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
      validator: (post) => {
        return (
          Object.prototype.hasOwnProperty.call(post, 'title') &&
          Object.prototype.hasOwnProperty.call(post, 'date')
        )
      },
    },
  },
}
</script>
