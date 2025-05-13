import { describe, test, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import ActionButton from './ActionButton.vue';

describe('ActionButton', () => {
    test('Default render (button)', () => {
        const wrapper = mount(<ActionButton>Hello Vitest</ActionButton>);
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.text()).toContain('Hello Vitest');
        expect([...wrapper.element.classList]).includes('action_button');
    });

    test('Default render (link)', () => {
        const wrapper = mount(<ActionButton>Hello Vitest</ActionButton>, {
            global: {
                stubs: {
                    RouterLink: {
                        template: '<a><slot /></a>',
                    },
                },
            },
            props: {
                to: { name: 'channel_view', params: { channelNumber: 1 } },
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.text()).toContain('Hello Vitest');
        expect(wrapper.element.tagName).toBe('A');
    });
});
