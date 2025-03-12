<template>
  <button type="button" :disabled="disabled">-</button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  predicate: {
    type: Object,
  },
});
</script>
