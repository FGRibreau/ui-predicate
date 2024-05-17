<template>
  <input
    type="text"
    :value="value"
    @change="$emit('change', $event.target.value)">
</template>

<script>
export default {
  emits: ['change'],
  props: {
    value: {
      type: null,
      required: true,
    }
  },
}
</script>
