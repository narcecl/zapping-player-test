import { describe, test, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import Badge from './BadgeComponent.vue';

describe('Badge', () => {
    test('Default render (button)', () => {
        const wrapper = mount(<Badge>Hello Vitest</Badge>);
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.text()).toContain('Hello Vitest');
        expect([...wrapper.element.classList]).includes('badge');
    });
});
