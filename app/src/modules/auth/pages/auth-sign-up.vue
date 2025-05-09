<template>
    <div class="auth-sign-up">
        <ACard title="Sign up">
            <FormBuilder
                :form="signUpData"
                layout="vertical"
                :rules="rules"
                @form-submit="signUp"
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
import type { FormResolverOptions } from '@primevue/forms'
import FormBuilder from '@/shared/components/FormBuilder/FormBuilder.vue'

const { signUp, isLoading, rules } = useAuth()

const signUpData: FormBuilderData<SignUpData> = {
    initialModel: defaultModel(),
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
            },
        },
        {
            type: 'Simple',
            field: {
                type: 'Password',
                label: 'Confirm password',
                model: 'passwordConfirm',
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
</script>

<style scoped></style>
