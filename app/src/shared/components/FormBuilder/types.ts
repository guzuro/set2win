import type { Ref } from 'vue'

export type FormBuilderData<M extends Record<string, unknown> = {}> = {
    model: FormModel<M>
    schema: FormSchema
    submit: FormSubmit
}

export type FormModel<M> = M

export type FormSchema = Array<FormContainer | FormField>

export type FormContainer = {
    type: 'Container'
    fields: Array<FormField>
}

export type FormField = {
    type: 'Simple'
    field: FormFields
}

export type FormFields = {
    type: 'Text' | 'Password'
    label: string
    model: string
}

type FormSubmit = {
    label: string
    loading?: Ref<boolean>
}
