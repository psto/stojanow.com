<script setup lang="ts">
import { ref } from 'vue';
import { formatDate } from '~/utils';
import type { Post } from '~/types';

const props = defineProps<{
  initialPosts: number,
  posts?: Post[]
}>()

const posts = ref(props.posts);

const initialPosts = props.initialPosts || 5;

const showPosts = ref(initialPosts);
const displayPosts = posts?.value.slice(0, showPosts.value);
</script>

<template>
  <div v-for="{ date, title, description, slug } in displayPosts" :key="date">
    <div class="flex items-baseline">
      <div class="flex mr-8 text-sm leading-5 text-zinc-700 dark:text-zinc-400">
        <time :datetime="date">
          {{ formatDate(date) }}
        </time>
      </div>
    </div>

    <a :href="`/${slug}`" class="group">
      <h3
        class="mt-4 text-xl font-semibold leading-7 text-brand-red dark:text-brand-red-dark filter hover:brightness-125">
        {{ title }}
      </h3>

      <p class="mt-3 text-base leading-6 text-zinc-700 dark:text-zinc-200">
        {{ description }}
      </p>
    </a>
  </div>
</template>
