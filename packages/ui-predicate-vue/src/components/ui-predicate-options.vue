<template>
  <div class="ui-predicate--col">
    <button type="button" name="button" v-on:click="remove(predicate)" :disabled="predicate.$canBeRemoved === false">-</button>
    <button type="button" name="button" v-on:click="add(predicate)">{{ isInAddCompoundMode ? '…' : '+'  }}</button>
  </div>
</template>

<script>
module.exports = {
  name: 'ui-predicate-options',
  props: {
    predicate: {
      type: Object,
      required: true,
    },
  },
  data: function() {
    return {
      isInAddCompoundMode: this.getAddCompoundMode(),
    };
  },
  inject: ['remove', 'add', 'getAddCompoundMode'],
  methods: {
    isInAddCompoundModeChanged: function(isInAddCompoundMode) {
      this.isInAddCompoundMode = isInAddCompoundMode;
    },
  },
  mounted() {
    this.$root.$on('isInAddCompoundMode', this.isInAddCompoundModeChanged);
  },
  destroyed() {
    this.$root.$off('isInAddCompoundMode', this.isInAddCompoundModeChanged);
  },
};
</script>
