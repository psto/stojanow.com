<template>
  <Button
    class="
      mt-4
      inline-flex
      items-center
      px-8
      py-4
      text-xl
      font-medium
      leading-6
      border
      rounded-md
      text-brand-red
      border-brand-red
      filter
      bg-white
      dark:bg-dark
      hover:brightness-125 hover:bg-brand-red hover:text-white
      dark:hover:bg-brand-red
    "
  >
    {{ cta }}
  </Button>
</template>
<script>
export default {
  props: {
    cta: {
      type: String,
      required: true,
    },
  },
}
</script>
