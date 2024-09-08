<template>
    <p>Welcome to Nuxt JS</p>
    <p class="text-red-400">
        {{ t("UnoCSSIntegrated") }}
    </p>
    <DemoComponent />
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style lang="scss">
p {
    font-size: 2rem;
}
</style>
