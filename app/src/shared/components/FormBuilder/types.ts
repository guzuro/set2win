import type { Ref } from "vue"

export type FormBuilderData<M extends Record<string, unknown> = {}> = {
    model: FormModel<M>
    schema: FormSchema
    submit: FormSubmit
}
// export type FormSchema = Array<FormFields>
export type FormSchemaStructure = FormContainer | FormFields
export type FormContainer = {
    type: "Container"
    fields: Array<FormFields>
}

export type FormSchema = Array<FormSchemaStructure>
export type FormModel<M> = M

export type FormFields = {
    type: 'Text' | 'Password'
    label: string
    model: string
}

type FormSubmit = {
    label: string,
    loading?: Ref<boolean>
}
