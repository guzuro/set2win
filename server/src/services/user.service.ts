import HttpException from '../exceptions/HttpException'
import { SignInDto, SignUpDto } from '../models/auth.model'
import { userRepository } from '../repositiry/user.reposotiry'
import { CredentialsService } from './credentials.service'

class UserService {
    async get(login: string) {
        try {
            const [user]= await userRepository.getUserByLogin(login)

            if (user) {
                const {password, ...userFields} = user
                
                return userFields
            }

        } catch (error) {
            console.error('Error while creating user', error)

            throw error
        }
    }
}

export const userService = new UserService()
