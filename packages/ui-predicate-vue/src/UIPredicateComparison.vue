<template>
  <div class="ui-predicate--row comparison">
      <div class="ui-predicate--col">
        <select :value="predicate.target.target_id" @change="changeTarget">
          <option v-for="target in columns.targets" :value="target.target_id">{{target.label}}</option>
        </select>
      </div>
      <div class="ui-predicate--col">
        <select :value="predicate.operator.operator_id" @change="changeOperator">
          <option v-for="operator in predicate.target.$type.$operators" :value="operator.operator_id">{{operator.label}}</option>
        </select>
      </div>
      <div class="ui-predicate--col">
        <input type="text" :value="predicate.arguments"></input>
      </div>
      <UIPredicateOptions :predicate="predicate"></UIPredicateOptions>
    </div>
</template>

<script>
import UIPredicateOptions from './UIPredicateOptions';
module.exports = {
  name: 'UIPredicateComparison',
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
  inject: ['add', 'setPredicateTarget_id', 'setPredicateOperator_id'],
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
