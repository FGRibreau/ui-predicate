<template>
    <div class="ui-predicate__row--compound">
      <div class="ui-predicate__row">
        <div class="ui-predicate__col">
          <component
            class="ui-predicate__logic"
            v-if="predicate.logic"
            :is="getUIComponent(UITypes.LOGICAL_TYPES)"
            :predicate="predicate"
            :columns="columns"
            @change="changeLogic($event)"
          />
        </div>
        <div class="ui-predicate__col">
          <ui-predicate-options :predicate="predicate"></ui-predicate-options>
        </div>
      </div>
      <template v-for="(model, index) in predicate.predicates">
        <ui-predicate-compound
          :key="index"
          v-if="model.$_type === 'CompoundPredicate'"
          :predicate="model"
          :columns="columns">
        </ui-predicate-compound>
        <ui-predicate-comparison
          :key="index"
          v-if="model.$_type === 'ComparisonPredicate'"
          :predicate="model"
          :columns="columns">
        </ui-predicate-comparison>
      </template>
    </div>
</template>

<script>
export default {
  name: 'ui-predicate-compound',
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
  inject: ['add', 'setPredicateLogicalType_id', 'UITypes', 'getUIComponent'],
  methods: {
    changeLogic(logicalType_id) {
      this.setPredicateLogicalType_id(this.predicate, logicalType_id);
    },
  },
};
</script>
