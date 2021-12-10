<template>
  <div
    class="
      max-w-2xl
      px-4
      pt-8
      pb-16
      mx-auto
      prose
      dark:prose-dark
      text-center
      lg:prose-lg
      md:pt-0
    "
  >
    <AppTitle>Subscribe</AppTitle>

    <SubscriptionForm />

    <p>
      Newsletter link if can't see the form:
      <a
        href="https://stojanow.substack.com/subscribe?simple=true&next=https%3A%2F%2Fstojanow.substack.com"
        target="_blank"
        class="no-underline"
      >subscribe 🔔</a>
    </p>
    <p>
      If you prefer "ancient" web technology - <b>RSS</b> 😉 - then a
      <a
        href="/feed.xml"
        target="_blank"
        class="no-underline"
      >feed is available ✅</a>
    </p>
    <p>
      Also, you can find me on
      <a
        href="http://twitter.com/piotrstojanow"
        style="color: #1da1f2"
        target="_blank"
        class="no-underline"
      >🐦 twitter</a>
      or get in touch through
      <NuxtLink
        to="/contact"
        class="no-underline"
      >
        email 📧
      </NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Subscribe",
      description: "Subscribe to Stojanow.com newsletter",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description,
        },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `https://stojanow.com/subscribe`,
        },
      ],
    };
  },
};
</script>
