<template>
    <div class="field-wrapper">
        <span class="field-wrapper__help-message">
            <label :for="label">{{ label }}</label>
            <sup
                v-if="helpMessage"
                v-tooltip.top="helpMessage"
            >
                <i class="pi pi-question-circle"></i>
            </sup>
        </span>

        <slot></slot>

        <Message
            v-if="error"
            class="field-wrapper__error"
            size="small"
            severity="error"
            variant="simple"
        >
            {{ error }}
        </Message>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    label: string
    helpMessage?: string
    error?: string
}>()
</script>

<style scoped lang="scss">
.field-wrapper {
    @apply flex flex-col gap-2;
}
</style>
