<template>
  <div class="ui-predicate--col option">
    <component
      :is="getUIComponent(UITypes.PREDICATE_REMOVE)"
      @click.native="remove(predicate)"
      :predicate="predicate"
      :disabled="predicate.$canBeRemoved === false"
    />
    <component
      :is="getUIComponent(UITypes.PREDICATE_ADD)"
      @click.native="add(predicate)"
      :predicate="predicate"
      :is-in-add-compound-mode="isInAddCompoundMode"
    />
  </div>
</template>

<script>
export default {
  name: 'ui-predicate-options',
  props: {
    predicate: {
      type: Object,
      required: true,
    },
  },
  inject: ['remove', 'add', 'getAddCompoundMode', 'UITypes', 'getUIComponent'],
  computed: {
    isInAddCompoundMode() {
      return this.getAddCompoundMode();
    }
  },
};
</script>
