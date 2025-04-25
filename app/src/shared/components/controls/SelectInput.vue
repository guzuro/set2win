<template>
    <FieldWrapper
        class="select-input"
        :error="error"
        :help-message="helpMessage"
        :label="label"
    >
        <Select
            :id="label"
            v-model="model"
            :name="name"
            :aria-describedby="`${label}-help`"
            v-bind="$props"
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
        </Select>
    </FieldWrapper>
</template>

<script setup lang="ts">
import type { SelectProps, SelectSlots } from 'primevue'
import FieldWrapper from './components/FieldWrapper.vue'

const model = defineModel<string>()

const slots = defineSlots<SelectSlots>()

interface SelectInputsProps extends SelectProps {
    label: string
    helpMessage?: string
    error?: string
    name?: string
}

const props = defineProps<SelectInputsProps>()
</script>

<style scoped></style>
