<script setup>
defineEmits(['change']);

defineProps({
  predicate: {
    type: Object,
    required: true,
  },
  columns: {
    type: Object,
    required: true,
  },
});

</script>

<template>
  <select
  :value="predicate.logic.logicalType_id"
  @change="$emit('change', $event.target.value)">
    <option
    v-for="logicalType in columns.logicalTypes"
    :key="logicalType.label"
    :value="logicalType.logicalType_id">
      {{ logicalType.label }}
    </option>
  </select>
</template>
