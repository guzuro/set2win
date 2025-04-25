import type { InputTextProps, PasswordProps, SelectProps } from 'primevue'
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

type BaseFormFields<T extends Record<string, any> = {}> = {
    label: string
    model: string
    attrs?: T
}

export type FormFields = TextField | PasswordField | SelectField

type TextField = BaseFormFields<InputTextProps> & {
    type: 'Text'
}

type PasswordField = BaseFormFields<PasswordProps> & {
    type: 'Password'
}

type SelectField = BaseFormFields<SelectProps> & {
    type: 'Select',
}

type FormSubmit = {
    label: string
    loading?: Ref<boolean>
}
