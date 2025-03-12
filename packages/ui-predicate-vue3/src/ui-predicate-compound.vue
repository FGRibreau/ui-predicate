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
        v-if="model.$_type === 'CompoundPredicate'"
        :predicate="model"
        :key="index"
        :columns="columns">
      </ui-predicate-compound>
      <ui-predicate-comparison
        v-if="model.$_type === 'ComparisonPredicate'"
        :predicate="model"
        :key="index"
        :columns="columns">
      </ui-predicate-comparison>
    </template>
  </div>
</template>

<script setup>
import { inject } from "vue";

const props = defineProps({
  predicate: {
    type: Object,
    required: true,
  },
  columns: {
    type: Object,
    required: true,
  },
});


const setPredicateLogicalType_id = inject("setPredicateLogicalType_id");
const UITypes = inject("UITypes");
const getUIComponent = inject("getUIComponent");

const changeLogic = (logicalType_id) => setPredicateLogicalType_id(props.predicate, logicalType_id);
</script>
