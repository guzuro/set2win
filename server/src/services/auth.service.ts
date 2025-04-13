import HttpException from '../exceptions/HttpException'
import { SignInDto, SignUpDto } from '../models/auth.model'
import { userRepository } from '../repositiry/user.reposotiry'
import { CredentialsService } from './credentials.service'

class AuthService {
    async signup({ login, password }: SignUpDto) {
        try {
            const hashedPass = await CredentialsService.hashValue(password)

            return await userRepository.createUser({
                login,
                password: hashedPass,
            })
        } catch (error) {
            console.error('Error while creating user', error)

            throw error
        }
    }

    async signin(payload: SignInDto) {
        const [user] = await userRepository.getUserByLogin(payload.login)

        if (user) {
            const passwordOk = await CredentialsService.verivyHash(payload.password, user.password)

            if (passwordOk) {
                const { password, ...userFields } = user

                return userFields
            } else {
                throw new HttpException(403, 'Password in wrong')
            }
        } else {
            throw new HttpException(404, 'User with this login not found')
        }
    }
}

export const authService = new AuthService()
