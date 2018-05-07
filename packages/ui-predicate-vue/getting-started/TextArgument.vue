<template>
  <div>
    <input type="text" @change="_onChange" :value="value">
  </div>
</template>

<script>
module.exports = {
  name: 'text-argument',
  methods: {
    _onChange({ target: { value: newValue } }) {
      this.$emit('change', newValue);
    },
  },
  props: {
    value: {
      type: null,
      required: true,
    },
  },
};
</script>
