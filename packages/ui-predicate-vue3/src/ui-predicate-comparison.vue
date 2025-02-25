<template>
  <div class="ui-predicate__row ui-predicate__row--comparison">
    <div class="ui-predicate__col">
      <component
        :is="getUIComponent(UITypes.TARGETS)"
        class="ui-predicate__targets"
        :columns="columns"
        :predicate="predicate"
        @change="changeTarget($event)"
      />
    </div>
    <div class="ui-predicate__col">
      <component
        :is="getUIComponent(UITypes.OPERATORS)"
        class="ui-predicate__operators"
        :columns="columns"
        :predicate="predicate"
        @change="changeOperator($event)"
      />
    </div>
    <div class="ui-predicate__col">
      <ui-predicate-comparison-argument
        class="ui-predicate__arguments"
        :predicate="predicate"
      />
    </div>
    <div class="ui-predicate__col">
      <ui-predicate-options :predicate="predicate"></ui-predicate-options>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const props = defineProps({
  predicate: {
    type: Object,
    required: true,
  },
  columns: {
    type: Object,
    required: true,
  },
});

const add = inject('add');
const setPredicateTarget_id = inject('setPredicateTarget_id');
const setPredicateOperator_id = inject('setPredicateOperator_id');
const UITypes = inject('UITypes');
const getUIComponent = inject('getUIComponent');

const changeTarget = (target_id) => {
  setPredicateTarget_id(props.predicate, target_id);
};

const changeOperator = (operator_id) => {
  setPredicateOperator_id(props.predicate, operator_id);
};
</script>
