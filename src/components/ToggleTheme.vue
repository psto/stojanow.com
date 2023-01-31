<script lang="ts" setup>
import RiMoonLine from "~icons/ri/moon-line";
import RiSunLine from "~icons/ri/sun-line";
import { useThemeSwitcher } from "~/composables/useThemeSwitcher";

const { theme, toggleTheme } = useThemeSwitcher();
</script>

<template>
  <button
    @click="toggleTheme()"
    class="transition duration-300"
    :class="{ 'rotate-[360deg]': theme === 'light' }"
    aria-label="toggle theme"
  >
    <ri-moon-line id="moon" v-show="theme === 'light'" />
    <ri-sun-line v-show="theme === 'dark'" />
  </button>
</template>
