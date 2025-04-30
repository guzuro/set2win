<template>
    <FieldWrapper
        class="datepicker-input"
        :error="error"
        :help-message="helpMessage"
        :label="label"
    >
        <FileUpload
            :id="label"
            toggleMask
            fluid
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
        </FileUpload>
    </FieldWrapper>
</template>

<script setup lang="ts">
import { FileUpload, type FileUploadProps, type FileUploadSlots } from 'primevue'
import FieldWrapper from './components/FieldWrapper.vue'

interface FileUploadInputProps extends FileUploadProps {
    label: string
    helpMessage?: string
    error?: string
    name?: string
}

const slots = defineSlots<FileUploadSlots>()
const props = defineProps<FileUploadInputProps>()
</script>

<style scoped></style>
