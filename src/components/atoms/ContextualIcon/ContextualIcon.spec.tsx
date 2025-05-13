import { describe, test, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import ContextualIcon from './ContextualIcon.vue';

describe('Badge', () => {
    test('Default render (button)', () => {
        const wrapper = mount(<ContextualIcon>F</ContextualIcon>);
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.text()).toContain('F');
        expect([...wrapper.element.classList]).includes('contextual_icon');
    });
});
