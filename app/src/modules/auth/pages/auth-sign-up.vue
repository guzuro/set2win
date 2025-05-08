<template>
    <div class="auth-sign-up">
        <ACard title="Sign up">
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
        </ACard>
    </div>
</template>

<script setup lang="ts">
import type { FormBuilderData } from '@/shared/components/FormBuilder/types'
import useAuth from '../composables/useAuth'
import type { SignUpData } from '@/modules/auth/types/auth.types'
import type { FormResolverOptions, FormSubmitEvent } from '@primevue/forms'
import FormBuilder from '@/shared/components/FormBuilder/FormBuilder.vue'

const { signUp, isLoading, validateLogin, validatePassword, validatePasswordConfirm } = useAuth()

const signUpData: FormBuilderData<SignUpData> = {
    model: defaultModel(),
    schema: [
        {
            type: 'Simple',
            field: {
                type: 'Text',
                label: 'Login',
                model: 'login',
            },
        },
        {
            type: 'Simple',
            field: {
                type: 'Password',
                label: 'Password',
                model: 'password',
                attrs: {
                    fluid: true,
                },
            },
        },
        {
            type: 'Simple',
            field: {
                type: 'Password',
                label: 'Confirm password',
                model: 'passwordConfirm',
                attrs: {
                    fluid: true,
                },
            },
        },
    ],
    submit: {
        label: 'Sign up',
        loading: isLoading,
    },
}

function defaultModel(): SignUpData {
    return {
        login: '',
        password: '',
        passwordConfirm: '',
    }
}

function resolver({ values }: FormResolverOptions) {
    const errors: Partial<Record<keyof SignUpData, Array<{ message: string }>>> = {}

    const { login, password, passwordConfirm } = values

    errors.login = validateLogin(login)
    errors.password = validatePassword(password)
    errors.passwordConfirm = validatePasswordConfirm(password, passwordConfirm)

    return {
        values,
        errors,
    }
}

function onFormSubmit(payload: FormSubmitEvent<SignUpData>) {
    if (payload.valid) {
        signUp(payload.values)
    }
}
</script>

<style scoped></style>
