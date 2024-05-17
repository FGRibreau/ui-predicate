import { h } from 'vue'

/**
 * This is a component adapter that can load any sub-components
 * as long as these UIcomponents were registered in UIPredicateCore ArgumentType registry
 * @type {Vue.Component}
 */
export default {
  render() {
    return h(
      this.getArgumentTypeComponentById(
        this.predicate.operator.argumentType_id
      ), {
      value: this.predicate.argument,
      predicate: this.predicate,
      onChange: this._setArgumentValue
    })
  },
  inject: ['getArgumentTypeComponentById', 'setArgumentValue'],
  methods: {
    _setArgumentValue(value) {
      this.setArgumentValue(this.predicate, value);
    },
  },
  props: {
    predicate: {
      type: Object,
      required: true,
    },
  },
};
