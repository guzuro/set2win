<template>
    <FieldWrapper
        class="text-input"
        :error="error"
        :help-message="helpMessage"
        :label="label"
    >
        <InputText
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
        </InputText>
    </FieldWrapper>
</template>

<script setup lang="ts">
import type { InputTextProps, InputTextSlots } from 'primevue'
import FieldWrapper from './components/FieldWrapper.vue'

interface TextInputProps extends InputTextProps {
    label: string
    helpMessage?: string
    error?: string
    name?: string
}

const slots = defineSlots<InputTextSlots>()
const props = defineProps<TextInputProps>()
</script>

<style scoped></style>
