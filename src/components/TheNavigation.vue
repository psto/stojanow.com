<script lang="ts" setup>
import TheLogo from "~/components/TheLogo.vue";
import ToggleTheme from "~/components/ToggleTheme.vue";
import { ref } from "vue";

const open = ref(false);
const navLinks = ref([
  {
    url: "/about",
    label: "about",
    externalLink: false,
  },
  {
    url: "/essays",
    label: "essays",
    externalLink: false,
  },
  {
    url: "/fiction",
    label: "fiction",
    externalLink: false,
  },
  {
    url: "/notes",
    label: "notes",
    externalLink: false,
  },
  {
    url: "https://wiki.stojanow.com",
    label: "wiki",
    externalLink: true,
  },
]);

function toggle() {
  open.value = !open.value;
}
</script>
<template>
  <nav>
    <div
      class="container mx-auto max-w-6xl px-6 py-4 md:flex md:items-center md:justify-between"
    >
      <div class="flex items-center justify-between">
        <div>
          <a href="/" aria-label="stojanow.com logo">
            <TheLogo />
          </a>
        </div>
        <!-- Mobile menu button -->
        <div class="flex md:hidden" @click="toggle">
          <button
            type="button"
            class="p-2 text-gray-500 hover:text-brand-red focus:text-brand-red focus:outline-none dark:text-zinc-200 dark:hover:text-brand-red-dark dark:focus:text-brand-red-dark"
            aria-label="toggle menu"
          >
            <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <div class="items-center md:flex" :class="{ hidden: !open }">
        <ul
          class="flex flex-col items-center justify-center md:mx-6 md:flex-row"
        >
          <li
            v-for="nav in navLinks"
            :key="nav.label"
            class="my-2 font-medium text-brand-red filter hover:brightness-125 dark:text-brand-red-dark md:ml-6"
            @click="toggle"
          >
            <a
              v-if="nav.externalLink"
              :href="`${nav.url}`"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              {{ nav.label }}
            </a>
            <a v-else :href="`${nav.url}`">
              {{ nav.label }}
            </a>
          </li>
          <li
            class="my-2 grid px-2 font-medium text-brand-red filter hover:brightness-125 dark:text-brand-red-dark md:ml-6"
          >
            <ToggleTheme
              class="text-brand-red filter hover:brightness-125 dark:text-brand-red-dark"
            />
          </li>
          <li
            class="my-2 flex items-center justify-center text-center font-medium text-brand-red filter hover:brightness-125 dark:text-brand-red-dark md:ml-6"
          >
            <a
              class="block transform rounded-lg bg-brand-red px-3 py-2 text-center font-semibold text-white filter transition duration-300 hover:brightness-125 dark:bg-brand-red-dark dark:text-black"
              href="/subscribe"
            >
              Subscribe
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
