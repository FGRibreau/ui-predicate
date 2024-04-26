<template>
  <div>
    <input type="color" @change="$emit('change', $event.target.value)" :value="value" />
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
