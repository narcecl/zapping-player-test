<script setup lang="ts">
import { computed } from 'vue';
import { useLanguageStore } from '@/stores';
import ChannelLogo from '@/components/atoms/ChannelLogo/ChannelLogo.vue';
import type { Channel } from '@/interfaces/channel';

const { name, active } = defineProps<Channel>();
const { $t } = useLanguageStore();

const componentClasses = computed(() => ({
    channer__item: true,
    'channer__item--active': active,
}));
</script>

<template>
    <button :class="componentClasses" :aria-label="$t('accessibility_change_channel', name)">
        <p class="channer__item__number">
            {{ number }}
        </p>

        <ChannelLogo :name="name" :logo="logo_color" size="large" />

        <h3 class="channer__item__name text-primary">
            {{ name }}
        </h3>
    </button>
</template>

<style lang="scss" scoped>
.channer__item {
    width: 100%;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    border: 2px solid transparent;
    display: flex;
    gap: 16px;
    padding: 24px 32px;
    transition: all 0.3s ease;
    opacity: 0.6;
    cursor: pointer;

    &__number,
    &__name {
        color: white;
    }

    &__number {
        min-width: 32px;
        text-align: center;
    }

    &__name {
        text-align: left;
        max-width: 110px;
    }

    &:hover {
        opacity: 1;
    }

    &--active {
        background: rgba(255, 255, 255, 0.1);
        border-color: white;
        opacity: 1;
    }
}
</style>
