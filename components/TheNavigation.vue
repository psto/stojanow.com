<template>
  <nav>
    <div
      class="
        container
        max-w-4xl
        px-6
        py-4
        mx-auto
        md:flex md:justify-between md:items-center
      "
    >
      <div class="flex items-center justify-between">
        <div>
          <NuxtLink to="/">
            <TheLogo />
          </NuxtLink>
        </div>
        <!-- Mobile menu button -->
        <div
          class="flex md:hidden"
          @click="toggle"
        >
          <button
            type="button"
            class="
              text-gray-500
              dark:text-gray-200
              hover:text-gray-600
              dark:hover:text-gray-400
              focus:outline-none focus:text-gray-600
              dark:focus:text-gray-400
            "
            aria-label="toggle menu"
          >
            <svg
              viewBox="0 0 24 24"
              class="w-6 h-6 fill-current"
            >
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <div
        class="items-center md:flex"
        :class="{ hidden: !open }"
      >
        <ul class="flex flex-col md:flex-row md:mx-6">
          <li
            v-for="(nav, index) in navLinks"
            :key="index"
            class="
              my-2
              font-medium
              text-brand-red
              filter
              hover:brightness-125
              md:ml-6
            "
            @click="toggle"
          >
            <NuxtLink :to="nav.url">
              {{ nav.link }}
            </NuxtLink>
          </li>
          <li
            class="
              my-2
              font-medium
              text-brand-red
              filter
              hover:brightness-125
              md:ml-6
            "
            @click="toggle"
          >
            <a
              href="https://wiki.stojanow.com"
              target="_blank"
            >wiki</a>
          </li>
        </ul>

        <AppDarkModeToggle
          class="
            block
            my-2
            mr-6
            text-center text-brand-red
            filter
            hover:brightness-125
          "
        />

        <div
          class="flex my-4 md:block"
          @click="toggle"
        >
          <NuxtLink
            class="
              block
              px-3
              py-2
              font-semibold
              text-center text-white
              rounded-lg
              bg-brand-red
              filter
              hover:brightness-125
            "
            to="/subscribe"
          >
            Subscribe
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      navLinks: [
        {
          url: '/about',
          link: 'about',
        },
        {
          url: '/essays',
          link: 'essays',
        },
        {
          url: '/fiction',
          link: 'fiction',
        },
        {
          url: '/notes',
          link: 'notes',
        },
      ],
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
  },
}
</script>
