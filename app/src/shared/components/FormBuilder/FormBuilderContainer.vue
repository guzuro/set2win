<template>
    <div
        class="form-builder-container"
        :class="`grid gap-2 ${containerColumns}`"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { cols } = defineProps({
    cols: Number,
})

const containerColumns = computed(() => {
    if (cols === 1) {
        return 'grid-cols-1'
    } else if (cols === 2) {
        return 'grid-cols-2'
    } else if (cols === 3) {
        return 'grid-cols-3'
    } else {
        return ''
    }
})
</script>

<style scoped></style>
