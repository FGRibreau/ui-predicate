<template>
  <div class="ui-predicate comparison">
    <div>
      <p>
        <select v-bind:value="predicate.target.target_id" @change="changeTarget">
          <option v-for="target in columns.targets" v-bind:value="target.target_id">{{target.label}}</option>
        </select>
      </p>
      <p>
        <select v-bind:value="predicate.operator.operator_id" @change="changeOperator">
          <option v-for="operator in predicate.target.$type.$operators" v-bind:value="operator.operator_id">{{operator.label}}</option>
        </select>
      </p>
      <p>
        <input type="text" v-bind:value="predicate.arguments"></input>
      </p>
      <ui-predicate-options v-bind:predicate="predicate"></ui-predicate-options>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: 'ui-predicate-comparison',
  props: {
    predicate: {
      type: Object,
      required: true,
    },
  },
  inject: [
    'columns',
    'add',
    'setPredicateTarget_id',
    'setPredicateOperator_id',
  ],
  methods: {
    changeTarget: function({ target: { value: target_id } }) {
      this.setPredicateTarget_id(this.predicate, target_id);
    },
    changeOperator: function({ target: { value: operator_id } }) {
      this.setPredicateOperator_id(this.predicate, operator_id);
    },
  },
  mounted() {
    window.addEventListener('keyup', this.onAltReleased);
    window.addEventListener('keydown', this.onAltPressed);
  },
  destroyed() {
    window.removeEventListener('keyup', this.onAltReleased);
    window.removeEventListener('keydown', this.onAltPressed);
  },
};
</script>

<style scoped>
.ui-predicate.comparison {
  border: 1px solid black;
}

.ui-predicate.comparison p {
  display: inline-block;
}
</style>
