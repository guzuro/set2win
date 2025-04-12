export type SignInData = {
    login: string
    password: string
}

export type SignUpData = SignInData & {
    passwordConfirm: string
}
