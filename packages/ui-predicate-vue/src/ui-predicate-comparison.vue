<template>
  <div class="ui-predicate__row ui-predicate__row--comparison">
      <div class="ui-predicate__col ui-predicate__col--targets">
        <component
          :is="getUIComponent(UITypes.TARGETS)"
          :columns="columns"
          :predicate="predicate"
          @change="changeTarget($event)"
        />
      </div>
      <div class="ui-predicate__col ui-predicate__col--operators">
        <component
          :is="getUIComponent(UITypes.OPERATORS)"
          :columns="columns"
          :predicate="predicate"
          @change="changeOperator($event)"
        />
      </div>
      <div class="ui-predicate__col ui-predicate__col--arguments">
        <ui-predicate-comparison-argument :predicate="predicate"></ui-predicate-comparison-argument>
      </div>
      <div class="ui-predicate__col ui-predicate__col--option">
        <ui-predicate-options :predicate="predicate"></ui-predicate-options>
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
