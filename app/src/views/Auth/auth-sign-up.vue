<template>
    <div class="auth-sign-up">
        <Card>
            <template #title>Sign up</template>

            <template #content>
                <FormBuilder
                    :form="signUpData"
                    :resolver="resolver"
                    @form-submit="onFormSubmit"
                />

                <div class="mt-5 text-center">
                    Already have an account?
                    <RouterLink
                        :to="{ name: 'SignIn' }"
                        class="text-blue-400"
                    >
                        Sign In
                    </RouterLink>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import type { FormBuilderData } from '@/components/FormBuilder/types'
import type { SignUpData } from '@/types/auth.types'
import type { FormResolverOptions, FormSubmitEvent } from '@primevue/forms'

const signUpData: FormBuilderData<SignUpData> = {
    model: {
        login: '',
        password: '',
        passwordConfirm: '',
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
        {
            type: 'Text',
            label: 'Confirm password',
            model: 'passwordConfirm',
        },
    ],
    submit: {
        label: 'Sign up',
    },
}

const resolver = ({ values }: FormResolverOptions) => {
    const errors: Partial<Record<keyof SignUpData, Array<{ message: string }>>> = {}

    const { login, password, passwordConfirm } = values

    if (!login) {
        errors.login = [{ message: 'Login is required.' }]
    }

    if (!password) {
        errors.password = [{ message: 'Password is required.' }]
    } else if (password && password.length < 5) {
        errors.password = [{ message: 'Password must be minimum 5 symbols' }]
    }

    if (passwordConfirm !== password) {
        errors.passwordConfirm = [{ message: 'Passwords are not equal.' }]
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

<style scoped></style>
