<template>
  <div>
    <input type="date" @change="$emit('change', $event.target.value)" :value="value" />
  </div>
</template>

<script setup>
defineEmits(["change"])

defineProps({
  value: {
    type: null,
    required: true,
  },
});
</script>
