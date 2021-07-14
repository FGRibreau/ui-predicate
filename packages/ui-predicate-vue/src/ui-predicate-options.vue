<template>
  <div class="ui-predicate__options">
    <div class="ui-predicate__option">
      <component
        :is="getUIComponent(UITypes.PREDICATE_REMOVE)"
        @click="remove(predicate)"
        :predicate="predicate"
        :disabled="predicate.$canBeRemoved === false"
      />
    </div>
    <div class="ui-predicate__option">
      <component
        :is="getUIComponent(UITypes.PREDICATE_ADD)"
        @click="add(predicate)"
        :predicate="predicate"
        :isInAddCompoundMode="isInAddCompoundMode"
      />
    </div>
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
    },
  },
};
</script>
