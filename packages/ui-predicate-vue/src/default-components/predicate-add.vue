<template>
    <button type="button">{{ isInAddCompoundMode ? '…' : '+'  }}</button>
</template>

<script>
export default {
    props: {
        isInAddCompoundMode: {
            type: Boolean,
            default: false,
        },
    }
}
</script>
