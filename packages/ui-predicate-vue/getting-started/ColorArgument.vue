<template>
  <div>
    <input type="color" @change="_onChange" :value="value" />
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const name = "color-argument";

const _onChange = ({ target: { value: newValue } }) => {
  emit("change", newValue);
};

const emit = defineEmits(["change"]);

const props = {
  value: {
    type: null,
    required: true,
  },
};
</script>
