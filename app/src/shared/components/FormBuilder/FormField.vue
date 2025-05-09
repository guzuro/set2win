<template>
    <div class="form-field">
        <AInput
            v-if="field.type === 'Text'"
            v-model:value="model"
            v-bind="field.attrs"
        />
        <AInputPassword
            v-if="field.type === 'Password'"
            v-model:value="model"
            v-bind="field.attrs"
        />
        <ASelect
            v-if="field.type === 'Select'"
            v-model:value="model"
            v-bind="field.attrs"
        />
        <ADatePicker
            v-if="field.type === 'DatePicker'"
            v-model:value="model"
            v-bind="field.attrs"
        />
        <!-- <FileUploadInput
            v-if="field.type === 'FileUpload'"
            :name="field.model"
            :label="field.label"
            :error="error"
            v-bind="field.attrs"
        /> -->
    </div>
</template>

<script setup lang="ts">
import type { FormFields } from './types'

defineProps<{
    field: FormFields
    error?: string
}>()

const model = defineModel<any>()
</script>

<style scoped></style>
