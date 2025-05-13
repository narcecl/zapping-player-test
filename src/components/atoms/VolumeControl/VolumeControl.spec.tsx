import { describe, test, expect, vi } from 'vitest';

import { mount } from '@vue/test-utils';
import VolumeControl from './VolumeControl.vue';
import { createTestingPinia } from '@pinia/testing';

describe('Badge', () => {
    test('Default render (button)', () => {
        const wrapper = mount(<VolumeControl>F</VolumeControl>, {
            global: {
                plugins: [
                    createTestingPinia({
                        createSpy: vi.fn,
                    }),
                ],
            },
        });
        expect(wrapper.html()).toMatchSnapshot();

        const icon = wrapper.get('svg');
        expect(icon).toBeDefined();
        expect([...wrapper.element.classList]).includes('volume__control');
    });
});
