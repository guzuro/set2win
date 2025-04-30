import type { DatePickerProps, InputTextProps, PasswordProps, SelectProps, FileUploadProps } from 'primevue'
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

export type FormFields = TextField | PasswordField | SelectField | DatePickerField | FileUploadField

type TextField = BaseFormFields<InputTextProps> & {
    type: 'Text'
}

type PasswordField = BaseFormFields<PasswordProps> & {
    type: 'Password'
}

type SelectField = BaseFormFields<SelectProps> & {
    type: 'Select'
}

type DatePickerField = BaseFormFields<DatePickerProps> & {
    type: 'DatePicker'
}

type FileUploadField = BaseFormFields<FileUploadProps> & {
    type: 'FileUpload'
}

type FormSubmit = {
    label: string
    loading?: Ref<boolean>
}
