<template>
    <div class="ui-predicate ui-predicate--row compound">

      <div class="ui-predicate ui-predicate--row">
        <div class="ui-predicate--col">
          <select v-bind:value="compound.logic.logicalType_id" @change="changeLogic">
            <option v-for="logicalType in columns.logicalTypes" v-bind:value="logicalType.logicalType_id">{{logicalType.label}}</option>
          </select>
        </div>
        <ui-predicate-options v-bind:predicate="compound"></ui-predicate-options>
      </div>

      <div class="ui-predicate predicates ui-predicate--row">
        <div class="ui-predicate predicate" v-for="(model, index) in compound.predicates">
          <ui-predicate-compound
            v-if="model.$_type === 'CompoundPredicate'"
            v-bind:compound="model"
            v-bind:columns="columns"
          ></ui-predicate-compound>
          <ui-predicate-comparison
            v-if="model.$_type === 'ComparisonPredicate'"
            v-bind:predicate="model"
            v-bind:columns="columns"
          ></ui-predicate-comparison>
        </div>
      </div>
    </div>
</template>

<script>
module.exports = {
  name: 'ui-predicate-compound',
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
  mounted() {},
  methods: {
    changeLogic: function({ target: { value: logicalType_id } }) {
      this.setPredicateLogicalType_id(this.compound, logicalType_id);
    },
  },
};
</script>

<style scoped>
.ui-predicate.compound {
  margin-left: 10px;
}
</style>
