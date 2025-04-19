<template>
    <div class="form-builder">
        <Form
            v-slot="$form"
            :form
            :initialValues="form.model"
            :resolver="resolver"
            class="flex flex-col gap-4 w-full"
            @submit="submitRaw"
        >
            <div v-for="field in form.schema">
                <TextInput
                    v-if="field.type === 'Text'"
                    :name="field.model"
                    :label="field.label"
                    :error="
                        $form[field.model]?.invalid ? $form[field.model].error.message : undefined
                    "
                />
                <PasswordInput
                    v-if="field.type === 'Password'"
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
                :loading="form.submit.loading?.value ?? false"
                :label="form.submit.label"
            />
        </Form>
    </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { Form, type FormSubmitEvent, type FormProps } from '@primevue/forms'

import TextInput from '../controls/TextInput.vue'
import type { FormBuilderData } from './types'
import PasswordInput from '../controls/PasswordInput.vue';

defineProps<{
    form: FormBuilderData<T>
    resolver: FormProps['resolver']
}>()

const emits = defineEmits<{
    'form-submit': [FormSubmitEvent<T>]
}>()

function submitRaw(e: FormSubmitEvent<Record<string, any>>) {
    submit(e as FormSubmitEvent<T>)
}

function submit(payload: FormSubmitEvent<T>) {
    emits('form-submit', payload)
}
</script>

<style scoped lang="scss"></style>
