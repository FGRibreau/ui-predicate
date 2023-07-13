/* eslint no-console: "off"*/
import UIPredicateCore, { UIPredicate } from '..';

import { mount, createLocalVue /* , shallow*/ } from '@vue/test-utils';

import DEFAULT_CONFIG from './__fixtures__';

describe('<ui-predicate/>', () => {
  describe('minimal-configuration', () => {
    // it('requires :config prop', () => {
    //   expect(() => {
    //     shallow(UIPredicate, { propsData: { config: DEFAULT_CONFIG } });
    //   }).toThrow();
    // });

    it('works', () => {
      const localVue = createLocalVue();
      localVue.use(UIPredicateCore);
      const wrapper = mount(UIPredicate, {
        propsData: { config: DEFAULT_CONFIG },
        // stubs: UIPredicateCore.components,
        localVue,
      });

      console.log(wrapper.text());
    });
  });
});
