<template>
  <div class="ui-predicate">
    <ui-predicate-compound
      v-if="isCoreReady"
      :predicate="root"
      :columns="columns"
    />
  </div>
</template>

<script>
import { UITypes } from 'ui-predicate-core';
import { UIPredicateCoreVue } from './UIPredicateCoreVue';

export default {
  name: 'ui-predicate',
  props: {
    data: {
      type: Object,
      defaut: () => ({})
    },
    columns: {
      type: Object,
      required: true,
    },
    ui: {
      type: Object,
      required: false,
    },
  },
  model: {
    prop: 'data',
    event: 'change'
  },
  data: function() {
    return {
      isCoreReady: false,
      root: {},
      isInAddCompoundMode: false,
    };
  },
  provide: function() {
    const vm = this;
    return {
      UITypes,
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
      getArgumentTypeComponentById: function(argumentType_id) {
        return vm.ctrl.getArgumentTypeComponentById(argumentType_id);
      },
      setArgumentValue: function(predicate, value) {
        return vm.ctrl.setArgumentValue(predicate, value);
      },
      getUIComponent(name) {
        return vm.ctrl.getUIComponent(name);
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
    triggerChanged() {
      // emit 'changed' event
      this.$emit('change', this.ctrl.toJSON());
    },
  },
  created() {
    const vm = this;

    UIPredicateCoreVue({
      data: this.data,
      columns: this.columns,
      ui: this.ui,
    }).then(
      ctrl => {
        vm.ctrl = ctrl;
        vm.root = ctrl.root;

        ctrl.on('changed', vm.triggerChanged);

        // Will allow to render root component when UiPredicateCore is ready.
        vm.isCoreReady = true;

        vm.$emit('initialized', ctrl);
      },
      err => {
        console.error(err);
      }
    );

    window.addEventListener('keyup', this.onAltReleased);
    window.addEventListener('keydown', this.onAltPressed);
  },
  destroyed() {
    if (this.ctrl) {
      this.ctrl.off();
    }
    window.removeEventListener('keyup', this.onAltReleased);
    window.removeEventListener('keydown', this.onAltPressed);
  },
};
</script>
