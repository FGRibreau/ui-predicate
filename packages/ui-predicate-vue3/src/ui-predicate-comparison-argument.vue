<template>
  <component
    :is="getArgumentTypeComponentById(predicate.operator.argumentType_id)"
    :value="predicate.argument"
    :predicate="predicate"
    @change="_setArgumentValue"
  />
</template>

<script>
export default {
  props: {
    predicate: {
      type: Object,
      required: true,
    },
  },
  inject: ["getArgumentTypeComponentById", "setArgumentValue"],
  methods: {
    _setArgumentValue(value) {
      this.setArgumentValue(this.predicate, value);
    },
  },
};
</script>
