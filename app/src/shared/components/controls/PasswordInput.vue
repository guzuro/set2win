<template>
    <FieldWrapper
        class="password-input"
        :error="error"
        :help-message="helpMessage"
        :label="label"
    >
        <Password
            :id="label"
            :aria-describedby="`${label}-help`"
            v-bind="props"
            @update:model-value="$emit('update:modelValue', $event)"
        >
            <template
                v-for="(_, name) in slots"
                #[name]="slotProps"
            >
                <slot
                    :name="name"
                    v-bind="slotProps || {}"
                />
            </template>
        </Password>
    </FieldWrapper>
</template>

<script setup lang="ts">
import type { PasswordProps, PasswordSlots } from 'primevue'
import FieldWrapper from './components/FieldWrapper.vue'

interface PasswordInputProps extends PasswordProps {
    label: string
    helpMessage?: string
    error?: string
    name?: string
}

const props = defineProps<PasswordInputProps>()
const slots = defineSlots<PasswordSlots>()
</script>

<style scoped></style>
