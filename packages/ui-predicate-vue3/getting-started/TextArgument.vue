<template>
  <div>
    <input type="text" @input="onChange" v-model="value" >
  </div>
</template>

<script setup>
import { defineEmits, shallowRef } from "vue";

const value = shallowRef("");

const onChange = (event) => {
  emit("change", event.target.value);
};

const emit = defineEmits(["change"]);
</script>
