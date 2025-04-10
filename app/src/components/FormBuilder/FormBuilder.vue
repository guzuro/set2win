<template>
    <div class="form-builder">
        <Form
            v-slot="$form"
            :form
            :initialValues="form"
            :resolver="resolver"
            class="flex flex-col gap-4 w-full"
            @submit="submit"
        >
            <div v-for="field in schema">
                <TextInput
                    v-if="field.type === 'Text'"
                    :name="field.model"
                    :label="field.label"
                    :error="
                        $form[field.model]?.invalid ? $form[field.model].error.message : undefined
                    "
                />
            </div>

            <Button
                type="submit"
                severity="secondary"
                label="Submit"
            />
        </Form>
    </div>
</template>

<script setup lang="ts">
import { Form, type FormSubmitEvent, type FormProps } from '@primevue/forms'

import TextInput from '../controls/TextInput.vue'
import type { FormBuilderData } from './types'

defineProps<{
    schema: FormBuilderData['schema']
    form: FormBuilderData['model']
    resolver: FormProps['resolver']
}>()

const emits = defineEmits<{
    'form-submit': [FormSubmitEvent]
}>()

function submit(payload: FormSubmitEvent) {
    emits('form-submit', payload)
}
</script>

<style scoped lang="scss"></style>
