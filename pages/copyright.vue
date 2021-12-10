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
    </div>

    <div class="relative mx-auto mt-12 max-w-2xl prose dark:prose-dark">
      <p>
        All text on this site is licensed under the
        <a
          href="https://creativecommons.org/licenses/by-nc/4.0/"
        >Creative Commons Attribution-NonCommercial International License</a>. That means:
      </p>

      <h3>You are free to:</h3>

      <p>
        <strong>Share</strong> — copy and redistribute the material in any medium
        or format
      </p>
      <p>
        <strong>Adapt</strong> — remix, transform, and build upon the material
      </p>

      <h3>Under the following terms:</h3>

      <p>
        <b>Attribution</b> — You must give appropriate credit, provide a link to
        the license, and indicate if changes were made. You may do so in any
        reasonable manner, but not in any way that suggests the licensor endorses
        you or your use.
      </p>
      <p>
        <b>NonCommercial</b> — You may not use the material for commercial
        purposes.
      </p>

      <p>
        However, I would be grateful if you asked permission before republishing
        anything (<NuxtLink to="/contact">
          get in touch
        </NuxtLink>). Thanks!
      </p>

      <p>
        Whenever I can I try to cite sources for images. If by accident I misused
        your content, <NuxtLink to="/contact">
          contact me
        </NuxtLink> and I'll fix
        it ASAP.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Copyright',
      description:
        'Stojanow.com copyright information. All content is released under Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0).',
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
          href: `https://stojanow.com/copyright`,
        },
      ],
    }
  },
}
</script>
