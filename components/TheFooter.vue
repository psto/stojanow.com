<template>
  <footer class="max-w-3xl px-4 pt-8 pb-8 mx-auto mt-auto md:pt-0">
    <div class="py-12 mx-auto">
      <div class="flex items-baseline justify-center text-brand-red">
        <NuxtLink
          to="/contact"
          class="
            box-border
            p-0
            mr-4
            no-underline
            align-baseline
            border-0
            sm:mr-2
            filter
            hover:brightness-125
          "
        >
          📧 contact
        </NuxtLink>
        <a
          href="http://twitter.com/piotrstojanow"
          target="_blank"
          class="p-0 mr-4 no-underline sm:mr-2 filter hover:brightness-125"
        >🐦 twitter</a>
        <a
          href="https://github.com/psto"
          target="_blank"
          class="p-0 mr-4 no-underline sm:mr-2 filter hover:brightness-125"
        >🐙 github</a>
        <a
          href="https://wiki.stojanow.com"
          target="_blank"
          class="p-0 mr-4 no-underline sm:mr-2 filter hover:brightness-125"
        >📖 wiki</a>
        <a
          href="https://stojanow.substack.com/subscribe?simple=true&next=https%3A%2F%2Fstojanow.substack.com"
          target="_blank"
          class="p-0 m-0 no-underline filter hover:brightness-125"
        >🔔 subscribe</a>
      </div>
      <div
        class="block p-2 m-0 text-sm leading-normal text-center text-gray-600"
      >
        All text licensed under the Creative Commons Attribution-NonCommercial
        4.0 International License (<NuxtLink
          to="/copyright"
          class="text-brand-red filter hover:brightness-125"
        >
          copyright
        </NuxtLink>)
      </div>
    </div>
  </footer>
</template>
