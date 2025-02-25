<template>
  <div class="ui-predicate__main">
    <ui-predicate-compound
      v-if="isCoreReady"
      :key="compoundKey"
      :predicate="root"
      :columns="columns"
    />
  </div>
</template>

<script setup>
import InitialisationFailed from "./errors";
import { UITypes } from 'ui-predicate-core';
import _sampleSize from 'lodash/sampleSize';
import { UIPredicateCoreVue } from './UIPredicateCoreVue';
import { ref, toRaw, provide, onMounted, shallowRef, onBeforeUnmount } from 'vue';

/**
* ui-predicate-vue is a rules editor, predicates component, for Vue JS 3.
* It aims to provide a clean, semantic and reusable component that make building your filtering or rules user interface a breeze.
*/

const model = defineModel({ required: true });

const props = defineProps({
  columns: {
    type: Object,
    required: true,
  },
  ui: {
    type: Object,
    required: false,
  },
});

const emit = defineEmits(['change', 'initialized', 'error', 'isInAddCompoundMode']);

// Reactive state
const isCoreReady = ref(false);
const isInAddCompoundMode = ref(false);
const compoundKey = ref(null);
const ctrl = shallowRef(null);
const root = shallowRef({});

provide('UITypes', UITypes);
provide('getAddCompoundMode', () => isInAddCompoundMode.value);
provide('add', (predicate) => {
  return ctrl.value.add({
    // convert to plain object since ui-predicate-core doesn't handle js Proxies for now)
    where: toRaw(predicate),
    how: 'after',
    type: isInAddCompoundMode.value ? 'CompoundPredicate' : 'ComparisonPredicate',
  });
});
provide('remove', (predicate) => ctrl.value.remove(toRaw(predicate)));
provide('setPredicateLogicalType_id', (predicate, logicalType_id) =>
  ctrl.value.setPredicateLogicalType_id(predicate, logicalType_id)
);
provide('setPredicateTarget_id', (predicate, target_id) =>
  ctrl.value.setPredicateTarget_id(predicate, target_id)
);
provide('setPredicateOperator_id', (predicate, operator_id) =>
  ctrl.value.setPredicateOperator_id(predicate, operator_id)
);
provide('getArgumentTypeComponentById', (argumentType_id) =>
  ctrl.value.getArgumentTypeComponentById(argumentType_id)
);
provide('setArgumentValue', (predicate, value) => ctrl.value.setArgumentValue(predicate, value));
provide('getUIComponent', (name) => ctrl.value.getUIComponent(name));

const setIsInAddCompoundMode = (state) => {
  isInAddCompoundMode.value = state;

  emit('isInAddCompoundMode', state);
}

const onAltPressed = (event) => {
  // If alt was pressed...
  if (event.keyCode === 18) setIsInAddCompoundMode(true);
}

const onAltReleased = (event) => {
  // If alt was released...
  if (event.keyCode === 18) setIsInAddCompoundMode(false);
}

const triggerChanged = () => {
  const jsonValue = ctrl.value.toJSON();
  /**
   * Emitted when the predicate is changed.
   * @event change
   * @type {Object}
  */
  emit("change", jsonValue);
  model.value = jsonValue;

   // A small hack (for now) to handle reactivity (since ui-predicate-core doesn't handle js Proxies for now)
  compoundKey.value = _sampleSize('0123456789abcd', 8).join('');
}

onMounted(() => {
  window.addEventListener('keyup', onAltReleased);
  window.addEventListener('keydown', onAltPressed);

  UIPredicateCoreVue({
    data: model.value,
    columns: props.columns,
    ui: props.ui,
  }).then(
    (_ctrl) => {
      ctrl.value = _ctrl;
      root.value = _ctrl.root;
      ctrl.value.on('changed', triggerChanged);
      // Will allow to render root component when UiPredicateCore is ready.
      isCoreReady.value = true;
      emit('initialized', ctrl.value);
    },
    (err) => {
      const initialisationFailedError = Object.assign(new InitialisationFailed(), { cause: err });
      emit('error', initialisationFailedError);
      return Promise.reject(initialisationFailedError);
    }
  );
});

onBeforeUnmount(() => {
  if (ctrl) {
    ctrl.value.off();
  }
  window.removeEventListener('keyup', onAltReleased);
  window.removeEventListener('keydown', onAltPressed);
});
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
