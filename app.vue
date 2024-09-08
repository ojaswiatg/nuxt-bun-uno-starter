<template>
    <NuxtLoadingIndicator
        :duration="60000"
        class="global-loader"
    />

    <NuxtPage :key="reloadKey" />
</template>
