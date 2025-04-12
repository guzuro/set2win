export class PasswordNotMatchException extends Error {
    constructor() {
        super('Passwords are not equal')
    }
}