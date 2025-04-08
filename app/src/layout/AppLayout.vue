<template>
    <div class="app-layout">
        <AppSidebar />

        <div class="app-layout-container">
            <div class="app-layout-main">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from './AppSidebar.vue'
</script>

<style scoped lang="scss"></style>
