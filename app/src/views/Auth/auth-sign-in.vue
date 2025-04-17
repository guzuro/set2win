<template>
    <div class="auth-sign-in">
        <Card>
            <template #title>Sign in</template>

            <template #content>
                <FormBuilder
                    :form="signInData"
                    :resolver="resolver"
                    @form-submit="onFormSubmit"
                />

                <div class="mt-5 text-center">
                    Dont have an account?
                    <RouterLink
                        :to="{ name: 'SignUp' }"
                        class="text-blue-400"
                    >
                        Sign Up
                    </RouterLink>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import type { FormBuilderData } from '@/components/FormBuilder/types'
import type { SignInData } from '@/types/auth.types'
import type { FormResolverOptions, FormSubmitEvent } from '@primevue/forms'
import FormBuilder from '@/components/FormBuilder/FormBuilder.vue'
import useAuth from '@/layout/composables/useAuth'

const { signIn, isLoading } = useAuth()

const signInData: FormBuilderData<SignInData> = {
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
    submit: {
        label: 'Sign in',
        loading: isLoading
    },
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


const onFormSubmit = (payload: FormSubmitEvent<SignInData>) => {
    if (payload.valid) {
        signIn(payload.values)
    }
}
</script>

<style></style>
