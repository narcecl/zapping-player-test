<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, type LocationAsRelativeRaw } from 'vue-router';

interface ActionButtonProps {
    to?: LocationAsRelativeRaw;
}

defineProps<ActionButtonProps>();

const componentClasses = computed(() => ({
    action_button: true,
}));
</script>

<template>
    <RouterLink v-if="to" :to="to" :class="componentClasses">
        <slot />
    </RouterLink>
    <button v-else :class="componentClasses">
        <slot />
    </button>
</template>

<style lang="scss">
.action_button {
    align-items: center;
    background-color: rgba(white, 0.1);
    border-radius: 100%;
    cursor: pointer;
    display: inline-flex;
    height: 52px;
    justify-content: center;
    transition: all 0.3s ease;
    width: 52px;

    &:hover {
        background-color: rgba(white, 0.2);
    }
}
</style>
