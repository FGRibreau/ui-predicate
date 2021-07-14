<script setup>
const props = defineProps({
    columns: {
        type: Object,
        required: true
    },
    predicate: {
        type: Object,
        required: true,
    },
    logical_type: {
        type: String,
        required: true,
    },
});

defineEmits(['update:logical_type']);
</script>

<template>
    <select
    :value="logical_type"
    @change="$emit('update:logical_type', $event.target.value)">
        <option
            v-for="logicalType in columns.logicalTypes"
            :key="logicalType.label"
            :value="logicalType.logicalType_id">{{logicalType.label}}
        </option>
    </select>
</template>

