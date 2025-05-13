<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
    <Transition name="fade">
        <RouterView />
    </Transition>
</template>

<style lang="scss" scoped>
.fade {
    &-enter-active {
        transition:
            transform 0.5s ease,
            opacity 0.5s ease;
    }

    &-enter-from {
        opacity: 0;
    }

    &-enter-to {
        opacity: 1;
    }

    &-leave-active {
        transition: opacity 0.5s ease;
    }

    &-leave-from {
        opacity: 1;
    }

    &-leave-to {
        opacity: 0;
    }
}
</style>
