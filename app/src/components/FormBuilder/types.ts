export type FormBuilderData<M extends Record<string, unknown> = {}> = {
    model: FormModel<M>
    schema: FormSchema
}
export type FormSchema = Array<FormFields>
export type FormModel<M> = M

type FormFields = {
    type: 'Text'
    label: string
    model: string
}
