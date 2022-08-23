<script lang="ts" setup>
import TheLogo from '~/components/TheLogo.vue';
import ToggleTheme from '~/components/ToggleTheme.vue';
import { ref } from 'vue';

const open = ref(false);
const navLinks = ref([
  {
    url: '/about',
    label: 'about',
  },
  {
    url: '/essays',
    label: 'essays',
  },
  {
    url: '/fiction',
    label: 'fiction',
  },
  {
    url: '/notes',
    label: 'notes',
  },
  {
    url: 'https://wiki.stojanow.com',
    label: 'wiki',
  },
]);

function toggle() {
  open.value = !open.value;
}
</script>
<template>
  <nav>
    <div class="container mx-auto max-w-6xl px-6 py-4 md:flex md:items-center md:justify-between">
      <div class="flex items-center justify-between">
        <div>
          <a href="/" aria-label="stojanow.com logo">
            <TheLogo />
          </a>
        </div>
        <!-- Mobile menu button -->
        <div class="flex md:hidden" @click="toggle">
          <button type="button"
            class="text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400"
            aria-label="toggle menu">
            <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
              <path fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <div class="items-center md:flex" :class="{ hidden: !open }">
        <ul class="flex flex-col items-center justify-center md:mx-6 md:flex-row">
          <li v-for="nav in navLinks" :key="nav.label"
            class="my-2 font-medium text-brand-red dark:text-brand-red-dark filter hover:brightness-125 md:ml-6"
            @click="toggle">
            <a :href="`${nav.url}`">
              {{ nav.label }}
            </a>
          </li>
          <li
            class="my-2 font-medium grid px-2 text-brand-red dark:text-brand-red-dark filter hover:brightness-125 md:ml-6">

            <ToggleTheme class="text-brand-red dark:text-brand-red-dark filter hover:brightness-125" />
          </li>
          <li
            class="my-2 font-medium text-center justify-center items-center flex text-brand-red dark:text-brand-red-dark filter hover:brightness-125 md:ml-6">
            <a class="block rounded-lg bg-brand-red dark:bg-brand-red-dark dark:text-black px-3 py-2 text-center font-semibold text-white filter hover:brightness-125 transition transform duration-300"
              href="/subscribe">
              Subscribe
            </a>
          </li>
        </ul>


      </div>
    </div>
  </nav>
</template>
