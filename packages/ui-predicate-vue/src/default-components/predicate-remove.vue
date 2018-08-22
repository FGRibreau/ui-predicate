<template>
    <button type="button" :disabled="disabled">-</button>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    }
}
</script>
