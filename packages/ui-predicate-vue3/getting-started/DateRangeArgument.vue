<template>
  <div class="ui-predicate__date__range__argument">
    <input type="date" v-model="start" @change="emitUpdatedValue" />
    <span>and</span>
    <input type="date" v-model="end" @change="emitUpdatedValue" />
  </div>
</template>
<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  value: {
    type: null,
    required: true,
  },
});

const emit = defineEmits(["change"]);

const start = ref(props.value?.[0] || "");
const end = ref(props.value?.[1] || "");

// Watch for external prop changes and update local refs
watch(
  () => props.value,
  (newValue) => {
    if (Array.isArray(newValue)) {
      start.value = newValue[0] || "";
      end.value = newValue[1] || "";
    }
  }
);

const emitUpdatedValue = () => {
  emit("change", [start.value, end.value]);
};
</script>
<style scoped>
.ui-predicate__date__range__argument {
  display: flex;
  align-items: center;
}
</style>
