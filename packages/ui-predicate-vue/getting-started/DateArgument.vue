<template>
  <div>
    <input type="date" @change="_onChange" :value="value" />
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = {
  value: {
    type: null,
    required: true,
  },
};

const _onChange = (event) => {
  emit("change", event.target.value);
};

const emit = defineEmits(["change"]);
</script>
