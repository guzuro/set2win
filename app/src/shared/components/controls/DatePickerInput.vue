<template>
    <FieldWrapper
        class="datepicker-input"
        :error="error"
        :help-message="helpMessage"
        :label="label"
    >
        <DatePicker
            :id="label"
            v-model="model"
            :fluid="props.fluid"
            :name="name"
            :disabled="props.disabled"
            :aria-describedby="`${label}-help`"
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
        </DatePicker>
    </FieldWrapper>
</template>

<script setup lang="ts">
import { DatePicker, type DatePickerProps, type DatePickerSlots } from 'primevue'
import FieldWrapper from './components/FieldWrapper.vue'

interface DatePickerInputProps extends DatePickerProps {
    label: string
    helpMessage?: string
    error?: string
    name?: string
}

const slots = defineSlots<DatePickerSlots>()
const model = defineModel<DatePickerProps['modelValue']>()
const props = defineProps<DatePickerInputProps>()
</script>

<style scoped></style>
