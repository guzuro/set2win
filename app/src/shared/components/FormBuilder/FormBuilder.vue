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
            <template v-for="item in form.schema">
                <FormBuilderContainer
                    v-if="item.type === 'Container'"
                    :cols="item.fields.length"
                >
                    <template v-for="field in item.fields">
                        <slot
                            v-if="slots[field.field.model]"
                            :error="
                                $form[field.field.model]?.invalid
                                    ? $form[field.field.model].error.message
                                    : undefined
                            "
                            :field="field.field"
                            :name="field.field.model"
                        />
                        <FormField
                            v-else
                            :error="
                                $form[field.field.model]?.invalid
                                    ? $form[field.field.model].error.message
                                    : undefined
                            "
                            :field="field.field"
                        />
                    </template>
                </FormBuilderContainer>

                <template v-else>
                    <slot
                        v-if="slots[item.field.model]"
                        :error="
                            $form[item.field.model]?.invalid
                                ? $form[item.field.model].error.message
                                : undefined
                        "
                        :field="item.field"
                        :name="item.field.model"
                    />
                    <FormField
                        v-else
                        :error="
                            $form[item.field.model]?.invalid
                                ? $form[item.field.model].error.message
                                : undefined
                        "
                        :field="item.field"
                    />
                </template>
            </template>

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
import FormField from './FormField.vue'

import type { FormBuilderData } from './types'
import FormBuilderContainer from './FormBuilderContainer.vue'
import { useSlots } from 'vue'

const slots = useSlots()

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
