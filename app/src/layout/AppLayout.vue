<template>
    <div
        class="app-layout"
        :class="{
            'app-layout-inactive': !layoutState.mobileSidebar && !isSidebarActive,
            'mobile-active': layoutState.mobileSidebar && isSidebarActive,
        }"
    >
        <AppTopbar />

        <AppSidebar v-if="needRenderSidebar" />

        <div
            class="app-layout-mask"
            @click="toggleSidebar"
        />

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
import { useLayout } from './composables/useLayout'
import AppTopbar from './AppTopbar.vue'

const { isSidebarActive, layoutState, toggleSidebar, needRenderSidebar } = useLayout()
</script>

<style scoped lang="scss">
.app-layout {
    @apply flex w-full;

    &-inactive &-container {
        @apply ml-0;
    }

    &-inactive &-sidebar {
        @apply -translate-x-full left-0;
    }

    &-container {
        @apply w-full flex flex-col min-h-screen xl:ml-[28rem] py-28 px-8;
    }

    &-main {
        @apply flex-1;
    }

    &-sidebar {
        @apply fixed z-[999] overflow-y-auto select-none -translate-x-full left-0 top-[6rem] xl:left-20 xl:translate-x-0;

        transition:
            transform 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99),
            left 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99);
    }

    .mobile-active &-sidebar {
        @apply h-screen top-0 left-0 translate-x-0;
    }

    .mobile-active > &-mask {
        @apply fixed top-0 left-0 z-[998] w-full h-full bg-gray-600 bg-opacity-50;
    }
}
</style>
