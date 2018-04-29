<template>
  <div class="">
    <div class="ui-predicate main">
      <UIPredicateCompound v-bind:compound="root" v-bind:columns="columns"></UIPredicateCompound>
    </div>
  </div>
</template>

<script>
import { PredicateCore } from 'ui-predicate-core';

module.exports = {
  name: 'UIPredicate',
  props: {
    config: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      required: false,
    },
  },
  data: function() {
    return {
      root: {},
      columns: {},
      isInAddCompoundMode: false,
    };
  },
  provide: function() {
    const vm = this;
    return {
      getAddCompoundMode: function() {
        return vm.isInAddCompoundMode;
      },
      add: function(predicate) {
        return vm.ctrl.add({
          where: predicate,
          how: 'after',
          type: vm.isInAddCompoundMode
            ? 'CompoundPredicate'
            : 'ComparisonPredicate',
        });
      },
      remove: function(predicate) {
        return vm.ctrl.remove(predicate);
      },
      setPredicateLogicalType_id: function(predicate, logicalType_id) {
        return vm.ctrl.setPredicateLogicalType_id(predicate, logicalType_id);
      },
      setPredicateTarget_id: function(predicate, target_id) {
        return vm.ctrl.setPredicateTarget_id(predicate, target_id);
      },
      setPredicateOperator_id: function(predicate, operator_id) {
        return vm.ctrl.setPredicateOperator_id(predicate, operator_id);
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
    const vm = this;

    PredicateCore({
      data: this.data,
      columns: this.config,
    }).then(
      ctrl => {
        vm.ctrl = ctrl;
        vm.root = ctrl.root;
        vm.columns = ctrl.columns;
      },
      err => {
        console.error(err);
        debugger;
      }
    );

    window.addEventListener('keyup', this.onAltReleased);
    window.addEventListener('keydown', this.onAltPressed);
  },
  destroyed() {
    window.removeEventListener('keyup', this.onAltReleased);
    window.removeEventListener('keydown', this.onAltPressed);
  },
};
</script>

<style>
.ui-predicate.main {
  display: flex;
}

.ui-predicate--row {
  flex-direction: row;
}
.ui-predicate--col {
  display: inline-block;
}
</style>
