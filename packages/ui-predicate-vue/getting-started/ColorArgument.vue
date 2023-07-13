<template>
  <div>
    <input type="color" @change="_onChange" :value="value">
  </div>
</template>

<script>
module.exports = {
  name: 'color-argument',
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
