import { h, ref, watch, markRaw, defineComponent } from "vue";

export const DEFAULT_CONFIG = {
  // besides array list names, everything else follows convention https://github.com/FGRibreau/sql-convention
  operators: [
    {
      operator_id: 'is',
      label: 'is',
      argumentType_id: 'smallString',
    },
    {
      operator_id: 'contains',
      label: 'Contains',
      argumentType_id: 'smallString',
    },
    {
      operator_id: 'isLowerThan',
      label: '<',
      argumentType_id: 'number',
    },
    {
      operator_id: 'isEqualTo',
      label: '=',
      argumentType_id: 'number',
    },
    {
      operator_id: 'isHigherThan',
      label: '>',
      argumentType_id: 'number',
    },
    {
      operator_id: 'is_date',
      label: 'is',
      argumentType_id: 'datepicker',
    },
    {
      operator_id: 'isBetween_date',
      label: 'is between',
      argumentType_id: 'daterangepicker',
    },
    {
      operator_id: 'isBrighterThan',
      label: 'is brighter than',
      argumentType_id: 'colorpicker',
    },
    {
      operator_id: 'isDarkerThan',
      label: 'is darker than',
      argumentType_id: 'colorpicker',
    },
    {
      operator_id: 'is_color',
      label: 'is',
      argumentType_id: 'colorpicker',
    },
  ],
  types: [
    {
      type_id: 'int',
      operator_ids: ['isLowerThan', 'isEqualTo', 'isHigherThan'],
    },
    {
      type_id: 'string',
      operator_ids: ['is', 'contains'],
    },
    {
      type_id: 'datetime',
      operator_ids: ['is_date', 'isBetween_date'],
    },
    {
      type_id: 'color',
      operator_ids: ['isBrighterThan', 'isDarkerThan', 'is_color'],
    },
  ],
  targets: [
    {
      target_id: 'article.title',
      label: 'Article title',
      type_id: 'string',
    },
    {
      target_id: 'article.videoCount',
      label: 'Article video count',
      type_id: 'int',
    },
    {
      target_id: 'article.publishingAt',
      label: 'Article publish date',
      type_id: 'datetime',
    },
    {
      target_id: 'article.color',
      label: 'Article main color',
      type_id: 'color',
    },
  ],
  logicalTypes: [
    {
      logicalType_id: 'any',
      label: 'Any',
    },
    {
      logicalType_id: 'all',
      label: 'All',
    },
    {
      logicalType_id: 'none',
      label: 'None',
    },
  ],
  argumentTypes: [
    {
      argumentType_id: 'datepicker',
      component: getHTML5InputVueComponent('date'),
    },
    {
      argumentType_id: 'colorpicker',
      component: getHTML5InputVueComponent('color'),
    },
    {
      argumentType_id: 'daterangepicker',
      component: markRaw(
        defineComponent({
          name: "daterangepicker-argument",
          props: {
            value: {
              type: null,
              required: true,
            },
          },
          emits: ["change"],
          setup(props, { emit }) {
            // Initialize start and end values
            const start = ref(props.value?.[0] || "");
            const end = ref(props.value?.[1] || "");

            // Update emitted value when start or end changes
            const emitUpdatedValue = () => {
              emit("change", [start.value, end.value]);
            };

            // Watch for external prop changes and update local refs
            watch(
              () => props.value,
              (newValue) => {
                if (Array.isArray(newValue)) {
                  start.value = newValue[0] || "";
                  end.value = newValue[1] || "";
                }
              }
            );

            return {
              start,
              end,
              emitUpdatedValue,
            };
          },
          template: `
          <div style="display: flex; width: 270px;">
            <input type="date" @change="emitUpdatedValue" v-model="start">
            <span>and</span>
            <input type="date" @change="emitUpdatedValue" v-model="end">
          </div>
        `,
        })
      ),
    },
    {
      argumentType_id: 'smallString',
      component: getHTML5InputVueComponent('text'),
    },
    {
      argumentType_id: 'number',
      component: getHTML5InputVueComponent('number'),
    },
  ],
};

export const DATASETS = {
  simple: {
    logicalType_id: 'all',
    predicates: [
      {
        target_id: 'article.videoCount',
        operator_id: 'isHigherThan',
        argument: 10,
      },
    ],
  },
  advanced: {
    logicalType_id: 'all',
    predicates: [
      {
        target_id: 'article.title',
        operator_id: 'contains',
        argument: 'paradise',
      },
      {
        target_id: 'article.videoCount',
        operator_id: 'isHigherThan',
        argument: 2,
      },
      {
        logicalType_id: 'none',
        predicates: [
          {
            target_id: 'article.publishingAt',
            operator_id: 'isBetween_date',
            argument: ['2017-10-05', '2018-10-05'],
          },
          {
            target_id: 'article.publishingAt',
            operator_id: 'isBetween_date',
            argument: ['2010-10-05', '2011-10-05'],
          },
          {
            target_id: 'article.color',
            operator_id: 'is_color',
            argument: '#e20400',
          },
          {
            target_id: 'article.color',
            operator_id: 'isDarkerThan',
            argument: '#783d3e',
          },
        ],
      },
    ],
  },
};

function getHTML5InputVueComponent(type) {
  return markRaw(
    defineComponent({
      name: `${type}-argument`,
      props: {
        value: {
          type: null,
          required: true,
        },
      },
      emits: ["change"],
      setup(props, { emit }) {
        const onChange = (event) => {
          emit("change", event.target.value);
        };

        return () =>
          h("div", [
            h("input", {
              type: type,
              value: props.value,
              onChange: onChange,
            }),
          ]);
      },
    })
  );
}
