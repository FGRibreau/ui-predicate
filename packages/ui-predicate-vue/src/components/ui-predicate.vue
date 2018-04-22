<template>
  <div class="">
    <div class="ui-predicate main">
      <ui-predicate-compound v-bind:compound="root" v-bind:level="0"></ui-predicate-compound>
    </div>
  </div>
</template>

<script>
const { PredicateCore } = require('ui-predicate-core');

module.exports = {
  name: 'ui-predicate',
  props: {
    columns: {
      type: Object,
      required: false,
    },
    data: {
      type: Object,
      required: false,
    },
  },
  data: function() {
    this.core = new PredicateCore({
      data: this.data,
      columns: this.columns,
    });
    return {
      root: this.core.root,
      isInAddCompoundMode: false,
    };
  },
  provide: function() {
    const vm = this;
    const core = vm.core;
    return {
      columns: this.columns,
      core: this.core,
      getAddCompoundMode: function() {
        return vm.isInAddCompoundMode;
      },
      add: function(predicate) {
        core.add({
          where: predicate,
          how: 'after',
          type: vm.isInAddCompoundMode
            ? 'CompoundPredicate'
            : 'ComparisonPredicate',
        });
      },
      remove: function(predicate) {
        // noop
      },
      setPredicateTarget_id: function(predicate, target_id) {
        core.setPredicateTarget_id(predicate, target_id);
      },
      setPredicateOperator_id: function(predicate, operator_id) {
        core.setPredicateOperator_id(predicate, operator_id);
      },
    };
  },
  methods: {
    setIsInAddCompoundMode: function(state) {
      this.isInAddCompoundMode = state;
      this.$root.$emit('isInAddCompoundMode', state);
    },
    onAltPressed(event) {
      // If alt was pressed...
      if (event.keyCode == 18) {
        this.setIsInAddCompoundMode(true);
      }
    },
    onAltReleased(event) {
      // If alt was pressed...
      if (event.keyCode == 18) {
        this.setIsInAddCompoundMode(false);
      }
    },
  },
  mounted() {
    window.addEventListener('keyup', this.onAltReleased);
    window.addEventListener('keydown', this.onAltPressed);
  },
  destroyed() {
    window.removeEventListener('keyup', this.onAltReleased);
    window.removeEventListener('keydown', this.onAltPressed);
  },
};
</script>

<style scoped>
.ui-predicate.main {
  border: 1px solid red;
}
</style>
