import { describe, test, expect, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import ChannelItem from './ChannelItem.vue';
import type { Channel } from '@/interfaces/channel';

const CHANNEL_DEMO: Channel = {
    active: true,
    currentShow: {},
    logo_color: 'https://davinci.zappingtv.com/gato/media/256/canales/color/sony.jpg',
    logo_white: 'https://davinci.zappingtv.com/gato/media/256/canales/white/sony.png',
    name: 'Sony Channel',
    number: 103,
    video: '',
};

describe('Badge', () => {
    test('Default render (button)', () => {
        const wrapper = mount(ChannelItem, {
            global: {
                plugins: [
                    createTestingPinia({
                        createSpy: vi.fn,
                    }),
                ],
            },
            props: {
                ...CHANNEL_DEMO,
            },
        });
        expect(wrapper.html()).toMatchSnapshot();

        const title = wrapper.get('h3');
        expect(title).toBeDefined();
        expect(title.text()).toEqual(CHANNEL_DEMO.name);

        const channelNumner = wrapper.get('.channer__item__number');
        expect(channelNumner).toBeDefined();
        expect(channelNumner.text()).toBe(`${CHANNEL_DEMO.number}`);

        const channelLogo = wrapper.get('img');
        expect(channelLogo).toBeDefined();
        expect(channelLogo.attributes('src')).toBe(CHANNEL_DEMO.logo_color);

        expect([...wrapper.element.classList]).includes('channer__item');
    });
});
