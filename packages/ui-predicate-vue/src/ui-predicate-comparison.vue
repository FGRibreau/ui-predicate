<template>
  <div class="ui-predicate__row ui-predicate__row--comparison">
    <div class="ui-predicate__col">
      <component
        class="ui-predicate__targets"
        :is="getUIComponent(UITypes.TARGETS)"
        :columns="columns"
        :predicate="predicate"
        v-model:target="target_id"
        @change="changeTarget($event)"
      />
    </div>
    <div class="ui-predicate__col">
      <component
        class="ui-predicate__operators"
        :is="getUIComponent(UITypes.OPERATORS)"
        :columns="columns"
        :predicate="predicate"
        v-model:operator="operator_id"
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
  data() {
    return {
      operator_id: this.predicate.operator.operator_id,
      target_id: this.predicate.target.target_id,
    };
  },
  inject: [
    'add',
    'setPredicateTarget_id',
    'setPredicateOperator_id',
    'UITypes',
    'getUIComponent',
  ],
  methods: {
    changeTarget(event) {
      this.setPredicateTarget_id(this.predicate, this.target_id);
    },
    changeOperator(event) {
      this.setPredicateOperator_id(this.predicate, this.operator_id);
    },
  },
};
</script>
