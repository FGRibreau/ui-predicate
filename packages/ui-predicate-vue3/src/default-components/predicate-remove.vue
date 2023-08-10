<template>
    <button @click="$emit('click')" type="button" :disabled="disabled">-</button>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['click']
}
</script>
