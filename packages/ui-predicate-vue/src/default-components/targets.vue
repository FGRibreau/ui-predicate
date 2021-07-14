<script>
export default {
    name: 'targets-component'
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
    target: {
        type: String,
        required: true,
    },
})

defineEmits(['update:target']);
</script>

<template>
    <select
        :value="target"
        @change="$emit('update:target', $event.target.value)">
        <option
            v-for="target in columns.targets"
            :key="target.label"
            :value="target.target_id">{{target.label}}
        </option>
    </select>
</template>
