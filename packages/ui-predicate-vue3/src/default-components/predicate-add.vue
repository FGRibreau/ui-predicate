<template>
  <button type="button">{{ isInAddCompoundMode ? '…' : '+' }}</button>
</template>

<script setup>
defineProps({
  isInAddCompoundMode: {
    type: Boolean,
    default: false,
  },
  predicate: {
    type: Object,
    required: true,
  },
})
</script>
