<template>
    <select
        :value="predicate.operator.operator_id"
        @change="$emit('change', $event.target.value)">
        <option
            v-for="operator in predicate.target.$type.$operators"
            :key="operator.label"
            :value="operator.operator_id">{{operator.label}}
        </option>
    </select>
</template>

<script>
export default {
    props: {
        columns: {
            type: Object,
            required: true,
        },
        predicate: {
            type: Object,
            required: true,
        },
  },
}
</script>
