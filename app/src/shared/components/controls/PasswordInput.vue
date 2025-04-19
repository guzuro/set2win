<template>
    <div class="password-input flex flex-col gap-2">
        <span>
            <label :for="label">{{ label }}</label>
            <sup
                v-if="helpMessage"
                v-tooltip.top="helpMessage"
            >
                <i class="pi pi-question-circle"></i>
            </sup>
        </span>
        <Password
            :id="label"
            v-model="model"
            :name="name"
            toggleMask
            fluid
            :aria-describedby="`${label}-help`"
        />
        <Message
            v-if="error"
            size="small"
            severity="error"
            variant="simple"
        >
            {{ error }}
        </Message>
    </div>
</template>

<script setup lang="ts">
const model = defineModel<string>()

defineProps<{
    label: string
    helpMessage?: string
    error?: string
    name?: string
}>()
</script>

<style scoped></style>
