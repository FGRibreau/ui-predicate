<template>
  <div class="ui-predicate__row ui-predicate__row--comparison">
      <div class="ui-predicate__col">
        <component
          class="ui-predicate__targets"
          :is="getUIComponent(UITypes.TARGETS)"
          :columns="columns"
          :predicate="predicate"
          @change="changeTarget($event)"
        />
      </div>
      <div class="ui-predicate__col">
        <component
          class="ui-predicate__operators"
          :is="getUIComponent(UITypes.OPERATORS)"
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
        <ui-predicate-options :predicate="predicate" />
      </div>
    </div>
</template>

<script>
export default {
  name: 'ui-predicate-comparison',
  props: {
    predicate: {
      type: Object,
      required: true,
    },
    columns: {
      type: Object,
      required: true,
    },
  },
  inject: [
    'add',
    'setPredicateTarget_id',
    'setPredicateOperator_id',
    'UITypes',
    'getUIComponent',
  ],
  methods: {
    changeTarget(target_id) {
      this.setPredicateTarget_id(this.predicate, target_id);
    },
    changeOperator(operator_id) {
      this.setPredicateOperator_id(this.predicate, operator_id);
    },
  },
};
</script>
