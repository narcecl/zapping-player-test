<template>
    <div class="contextual_icon">
        <slot />
    </div>
</template>

<style lang="scss">
.contextual_icon {
    align-items: center;
    background-color: rgba(white, 0.1);
    border-radius: 4px;
    display: inline-flex;
    padding: 0 12px;
    height: 24px;
    justify-content: center;
    transition: all 0.3s ease;
    border: 1px solid rgba(white, 0.1);
    color: white;
    font-size: 0.625rem;
}
</style>
