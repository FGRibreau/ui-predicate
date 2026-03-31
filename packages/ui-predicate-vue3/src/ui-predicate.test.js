/* eslint no-console: "off"*/
import UIPredicateCore from '../src/';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import { DEFAULT_CONFIG, DATASETS } from './__fixtures__';

describe('<ui-predicate/>', () => {
  describe('minimal-configuration', () => {
    it('works', () => {
      const wrapper = mount({
        template: '<ui-predicate />',
      }, {
        props: {
          columns: DEFAULT_CONFIG,
          modelValue: DATASETS.simple,
        },
        global: {
          plugins: [UIPredicateCore]
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('.ui-predicate__main').exists()).toBe(true);
    });

    // it('should have isCoreReady after initialization', async () => {
      //   // expect(wrapper.vm.isCoreReady).toBe(true);
    // });

    // TODO: Add more tests
  });
});
