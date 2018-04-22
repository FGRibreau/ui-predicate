<template>
    <div class="ui-predicate compound">
      <div compound class="ui-predicate">
        <select>
          <option>{{ compound.logic }}</option>
        </select>
        <ui-predicate-options v-bind:predicate="compound"></ui-predicate-options>
      </div>
      <div class="ui-predicate predicates">
        <div class="ui-predicate predicate" v-for="(model, index) in compound.predicates">
          <ui-predicate-compound
            v-if="model.$_type === 'CompoundPredicate'"
            v-bind:compound="model"
          ></ui-predicate-compound>
          <ui-predicate-comparison
            v-if="model.$_type === 'ComparisonPredicate'"
            v-bind:predicate="model"
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
  },
  inject: ['add'],
  mounted() {
    console.log('compound', this.compound);
  },
  destroyed() {
    console.log('destroyed');
  },
};
</script>

<style scoped>
.ui-predicate.compound {
  border: 1px solid black;
  margin-left: 10px;
}
</style>
