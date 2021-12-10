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
      <NuxtImg
        src="/images/dove.svg"
        alt="A flying dove"
        class="bg-white dark:bg-gray-200 rounded-xl"
      />
    </div>
    <div class="relative mx-auto mt-12 max-w-2xl prose dark:prose-dark text-center">
      <p>
        <strong>piotr</strong><span class="text-gray-300">&</span><strong>stojanow@gmail.com</strong>
        <span class="text-gray-300">(without the &)</span>
        <br>
        Get in touch on
        <a
          href="http://twitter.com/piotrstojanow"
          style="color: #1da1f2"
          target="_blank"
          class="no-underline filter hover:brightness-125"
        >🐦 twitter</a>
        <br>
        <a
          href="https://stojanow.substack.com/subscribe?simple=true&next=https%3A%2F%2Fstojanow.substack.com"
          target="_blank"
          class="no-underline"
        >🔔 subscribe</a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: 'Contact',
      description: 'Contact Piotr Stojanow by email or twitter.',
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
          href: `https://stojanow.com/contact`,
        },
      ],
    }
  },
}
</script>
