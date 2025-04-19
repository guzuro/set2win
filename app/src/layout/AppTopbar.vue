<template>
    <div class="app-topbar">
        <div class="app-topbar-inner">
            <Button
                v-if="needRenderSidebar"
                class="app-topbar__toggle"
                icon="pi pi-align-justify"
                aria-label="Toggle sidebar"
                size="small"
                @click="toggleSidebar"
            />

            <span class="app-topbar__title"> Set2Win</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLayout } from '../shared/composables/useLayout'

const { toggleSidebar, needRenderSidebar } = useLayout()
</script>

<style scoped lang="scss">
.app-topbar {
    @apply fixed top-0 bg-white p-4 left-0 right-0 h-20;

    &-inner {
        @apply px-3 md:px-10 h-full gap-2 flex items-center;
    }

    &__toggle {
    }

    &__title {
        @apply text-2xl;
    }
}
</style>
