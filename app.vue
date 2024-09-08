<template>
    <div>
        <div class="text-red-400">
            {{ t("UnoCSSIntegrated") }}
        </div>
        <NuxtRouteAnnouncer />
        <NuxtWelcome />
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>
