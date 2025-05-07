<template>
    <AConfigProvider
        :theme="{
            token: {
                colorPrimary: '#C1E156',
                colorPrimaryHover: '#A8C84A',
                colorTextLightSolid: '#333333',
            },
        }"
    >
        <RouterView />
    </AConfigProvider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped></style>
