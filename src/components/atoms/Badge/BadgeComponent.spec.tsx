import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import Badge from './BadgeComponent.vue';

describe('Badge', () => {
    it('Default render', () => {
        const wrapper = mount(<Badge>Hello Vitest</Badge>);
        expect(wrapper.text()).toContain('Hello Vitest');
    });
});
