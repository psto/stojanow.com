<template>
  <header>
    <div class="flex py-2 content">
      <div class="flex-1">
        <a :href="note.amazon">
          <NuxtImg
            :src="note.image"
            :alt="`${note.title} cover`"
            class="border-2 border-gray-200 dark:border-gray-600 mr-4 rounded"
          />
        </a>
      </div>
      <div class="flex-1 px-2 item-body">
        <h2 class="mb-4 text-center md:text-4xl p-name lg:mb-8">
          {{ note.title }}
        </h2>
      </div>
    </div>
    <div>
      <small>
        Date read:
        <time
          :datetime="note.dateRead"
          class="italic"
        >
          {{ note.dateRead | formatDate }}
        </time>
        <br>
        Check out <a :href="note.amazon">Amazon</a> for more details and
        reviews.
      </small>
      <p>{{ note.description }}</p>
    </div>

    <hr>
  </header>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true,
      validator: (note) => {
        return (
          Object.prototype.hasOwnProperty.call(note, 'title') &&
          Object.prototype.hasOwnProperty.call(note, 'date') &&
          Object.prototype.hasOwnProperty.call(note, 'image') &&
          Object.prototype.hasOwnProperty.call(note, 'amazon') &&
          Object.prototype.hasOwnProperty.call(note, 'description')
        )
      },
    },
  },
}
</script>
