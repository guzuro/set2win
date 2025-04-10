<template>
    <div class="auth-page">
        <Card class="auth-page-card">
            <template #title>Sign in</template>

            <template #content>
                <FormBuilder
                    :form="formData.model"
                    :schema="formData.schema"
                    :resolver="resolver"
                    @form-submit="onFormSubmit"
                />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import FormBuilder from '@/components/FormBuilder/FormBuilder.vue'
import type { FormBuilderData } from '@/components/FormBuilder/types'
import type { SignInData } from '@/types/auth.types'

import { type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms'

const formData: FormBuilderData<SignInData> = {
    model: {
        login: '',
        password: '',
    },
    schema: [
        {
            type: 'Text',
            label: 'Login',
            model: 'login',
        },
        {
            type: 'Text',
            label: 'Password',
            model: 'password',
        },
    ],
}

const resolver = ({ values }: FormResolverOptions) => {
    const errors: Partial<Record<keyof SignInData, Array<{ message: string }>>> = {}

    const { login, password } = values

    if (!login) {
        errors.login = [{ message: 'Login is required.' }]
    }

    if (!password) {
        errors.password = [{ message: 'Password is required.' }]
    } else if (password && password.length < 5) {
        errors.password = [{ message: 'Password must be minimum 5 symbols' }]
    }

    return {
        values,
        errors,
    }
}

const onFormSubmit = (payload: FormSubmitEvent) => {
    if (payload.valid) {
        console.log('ok')
    }
}
</script>

<style scoped lang="scss">
.auth-page {
    @apply w-full flex justify-center items-center h-full;

    &-card {
        @apply w-full;

        max-width: 50%;
    }
}
</style>
