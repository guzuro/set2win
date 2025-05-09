<template>
    <div class="form-builder">
        <AForm
            :model="formState"
            class="flex flex-col gap-4 w-full"
            v-bind="props"
            @finish="emits('form-submit', $event)"
        >
            <template v-for="item in form.schema">
                <FormBuilderContainer
                    v-if="item.type === 'Container'"
                    :cols="item.fields.length"
                >
                    <AFormItem
                        v-for="field in item.fields"
                        :name="field.field.model"
                        :label="field.field.label"
                    >
                        <slot
                            v-if="slots[field.field.model]"
                            :field="field.field"
                        />
                        <FormField
                            v-else
                            v-model="formState[field.field.model]"
                            :field="field.field"
                        />
                    </AFormItem>
                </FormBuilderContainer>

                <AFormItem
                    v-else
                    :name="item.field.model"
                    :label="item.field.label"
                >
                    <slot
                        v-if="slots[item.field.model]"
                        :field="item.field"
                    />
                    <FormField
                        v-else
                        v-model="formState[item.field.model]"
                        :field="item.field"
                    />
                </AFormItem>
            </template>

            <AFormItem>
                <AButton
                    html-type="submit"
                    :loading="form.submit.loading?.value ?? false"
                >
                    {{ form.submit.label }}
                </AButton>
            </AFormItem>
        </AForm>
    </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import FormField from './FormField.vue'
import type { FormBuilderData } from './types'
import FormBuilderContainer from './FormBuilderContainer.vue'
import { reactive, useSlots } from 'vue'
import type { FormProps } from 'ant-design-vue'

const slots = useSlots()

type FormBuilderProps = { form: FormBuilderData<T> } & Omit<FormProps, 'model'>

const { form, ..._props } = defineProps<FormBuilderProps>()
const formState = reactive({ ...form.initialModel })
const props = reactive(_props)

const emits = defineEmits<{
    'form-submit': [T]
}>()
</script>

<style scoped lang="scss"></style>
