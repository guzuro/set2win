import type { Ref } from "vue"

export type FormBuilderData<M extends Record<string, unknown> = {}> = {
    model: FormModel<M>
    schema: FormSchema
    submit: FormSubmit
}
export type FormSchema = Array<FormFields>
export type FormModel<M> = M

type FormFields = {
    type: 'Text'
    label: string
    model: string
}

type FormSubmit = {
    label: string,
    loading?: Ref<boolean>
}
