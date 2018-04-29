<template>
    <div class="ui-predicate ui-predicate--row compound">

      <div class="ui-predicate ui-predicate--row">
        <div class="ui-predicate--col">
          <select v-if="compound.logic" :value="compound.logic.logicalType_id" @change="changeLogic">
            <option v-for="logicalType in columns.logicalTypes" :value="logicalType.logicalType_id">{{logicalType.label}}</option>
          </select>
        </div>
        <UIPredicateOptions :predicate="compound"></UIPredicateOptions>
      </div>

      <div class="ui-predicate predicates ui-predicate--row">
        <div class="ui-predicate predicate" v-for="(model, index) in compound.predicates">
          <UIPredicateCompound
            v-if="model.$_type === 'CompoundPredicate'"
            :compound="model"
            :columns="columns"
          ></UIPredicateCompound>
          <UIPredicateComparison
            v-if="model.$_type === 'ComparisonPredicate'"
            :predicate="model"
            :columns="columns"
          ></UIPredicateComparison>
        </div>
      </div>
    </div>
</template>

<script>
import UIPredicateComparison from './UIPredicateComparison';
import UIPredicateOptions from './UIPredicateOptions';
module.exports = {
  name: 'UIPredicateCompound',
  props: {
    compound: {
      type: Object,
      required: true,
    },
    columns: {
      type: Object,
      required: true,
    },
  },
  inject: ['add', 'setPredicateLogicalType_id'],
  methods: {
    changeLogic: function({ target: { value: logicalType_id } }) {
      this.setPredicateLogicalType_id(this.compound, logicalType_id);
    },
  },
};
</script>
