<script>
export default {
    name: 'operators-component'
}
</script>
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
    operator: {
        type: String,
        required: true,
    },
});

defineEmits(['update:operator']);
</script>

<template>
    <select
        @change="$emit('update:operator', $event.target.value)"
        :value="predicate.operator.operator_id">
        <option
            v-for="operator in predicate.target.$type.$operators"
            :key="operator.label"
            :value="operator.operator_id">{{operator.label}}
        </option>
    </select>
</template>
