<template>
  <div class="ui-predicate--row">
      <div class="ui-predicate--col targets">
        <component
          :is="getUIComponent(UITypes.TARGETS)"
          :columns="columns"
          :predicate="predicate"
          @change="changeTarget($event)"
        />
      </div>
      <div class="ui-predicate--col operators">
        <component
          :is="getUIComponent(UITypes.OPERATORS)"
          :columns="columns"
          :predicate="predicate"
          @change="changeOperator($event)"
        />
      </div>
      <div class="ui-predicate--col arguments">
        <ui-predicate-comparison-argument :predicate="predicate"></ui-predicate-comparison-argument>
      </div>
      <ui-predicate-options :predicate="predicate"></ui-predicate-options>
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
  inject: ['add', 'setPredicateTarget_id', 'setPredicateOperator_id', 'UITypes', 'getUIComponent'],
  methods: {
    changeTarget: function(target_id) {
      this.setPredicateTarget_id(this.predicate, target_id);
    },
    changeOperator: function(operator_id) {
      this.setPredicateOperator_id(this.predicate, operator_id);
    },
  },
};
</script>
