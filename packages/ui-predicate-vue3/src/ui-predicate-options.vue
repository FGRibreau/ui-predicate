<template>
  <div class="ui-predicate__options">
    <div class="ui-predicate__option">
      <component
        :is="getUIComponent(UITypes.PREDICATE_REMOVE)"
        :predicate="predicate"
        :disabled="predicate.$canBeRemoved === false"
        @click="remove(predicate)"
      />
    </div>
    <div class="ui-predicate__option">
      <component
        :is="getUIComponent(UITypes.PREDICATE_ADD)"
        :predicate="predicate"
        :is-in-add-compound-mode="isInAddCompoundMode"
        @click="add(predicate)"
      />
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from "vue";

defineProps({
  predicate: {
    type: Object,
    required: true
  }
});

const remove = inject("remove");
const add = inject("add");
const getAddCompoundMode = inject("getAddCompoundMode");
const UITypes = inject("UITypes");
const getUIComponent = inject("getUIComponent");

const isInAddCompoundMode = computed(() => getAddCompoundMode());
</script>
