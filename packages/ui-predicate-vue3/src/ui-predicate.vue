<template>
  <div class="ui-predicate__main">
    <ui-predicate-compound
      v-if="isCoreReady"
      :predicate="root"
      :columns="columns"
    />
  </div>
</template>

<script>
import UIPredicateCoreVue from "./UIPredicateCoreVue";
import InitialisationFailed from "./errors";
import { UITypes } from "ui-predicate-core";

export default {
  name: "ui-predicate",
  props: {
    data: {
      type: Object,
      default: () => ({}),
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
  data() {
    return {
      isCoreReady: false,
      root: {},
      isInAddCompoundMode: false,
    };
  },
  created() {
    const vm = this;
    window.addEventListener("keyup", this.onAltReleased);
    window.addEventListener("keydown", this.onAltPressed);

    UIPredicateCoreVue({
      data: this.data,
      columns: this.columns,
      ui: this.ui,
    }).then(
      (ctrl) => {

        vm.ctrl = ctrl;
        vm.root = ctrl.root;

        ctrl.on("changed", vm.triggerChanged);

        // Will allow to render root component when UiPredicateCore is ready.
        vm.isCoreReady = true;

        vm.$emit("initialized", ctrl);
      },
      (err) => {
        // wrap ui-predicate-core error in InitialisationFailed error
        const initialisationFailedError = Object.assign(
          new InitialisationFailed(),
          { cause: err }
        );

        // prior to Vue 2.6, we should use emit error to notify that component initialisation failed
        vm.$emit("error", initialisationFailedError);

        // since Vue 2.6, Promise can be also returned from lifecycle hooks to notify error
        return Promise.reject(initialisationFailedError);
      }
    );
  },
  emits: ["initialized", "error", "change"],
  methods: {
    setIsInAddCompoundMode(state) {
      this.isInAddCompoundMode = state;
      this.$root.$emit("isInAddCompoundMode", state);
    },
    onAltPressed(event) {
      // If alt was pressed...
      if (event.keyCode === 18) this.setIsInAddCompoundMode(true);
    },
    onAltReleased(event) {
      // If alt was released...
      if (event.keyCode === 18) this.setIsInAddCompoundMode(false);
    },
    triggerChanged() {
      // emit 'changed' event when some predicates where changed
      this.$emit("change", this.ctrl.toJSON());
    },
  },
  provide() {
    const vm = this;
    return {
      UITypes,
      getAddCompoundMode() {
        return vm.isInAddCompoundMode;
      },
      add(predicate) {
        return vm.ctrl.add({
          where: predicate,
          how: 'after',
          type: vm.isInAddCompoundMode
            ? 'CompoundPredicate'
            : 'ComparisonPredicate',
        });
      },
      remove(predicate) {
        return vm.ctrl.remove(predicate);
      },
      setPredicateLogicalType_id(predicate, logicalType_id) {
        return vm.ctrl.setPredicateLogicalType_id(predicate, logicalType_id);
      },
      setPredicateTarget_id(predicate, target_id) {
        return vm.ctrl.setPredicateTarget_id(predicate, target_id);
      },
      setPredicateOperator_id(predicate, operator_id) {
        return vm.ctrl.setPredicateOperator_id(predicate, operator_id);
      },
      getArgumentTypeComponentById(argumentType_id) {
        return vm.ctrl.getArgumentTypeComponentById(argumentType_id);
      },
      setArgumentValue(predicate, value) {
        return vm.ctrl.setArgumentValue(predicate, value);
      },
      getUIComponent(name) {
        return vm.ctrl.getUIComponent(name);
      },
    };
  },
  unmounted() {
    if (this.ctrl) this.ctrl.off();

    window.removeEventListener("keyup", this.onAltReleased);
    window.removeEventListener("keydown", this.onAltPressed);
  },
};
</script>

<style>
.ui-predicate__main {
  display: flex;
}
.ui-predicate__row {
  flex-direction: row;
}
.ui-predicate__col {
  display: inline-block;
}
.ui-predicate__options {
  display: flex;
}
</style>
