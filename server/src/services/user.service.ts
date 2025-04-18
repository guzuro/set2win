import { userRepository } from '../repositiry/user.reposotiry'

class UserService {
    async get(id: string) {
        try {
            const [user] = await userRepository.getUserById(id)

            if (user) {
                const {password, ...userFields} = user
                
                return userFields
            }

        } catch (error) {
            throw error
        }
    }
}

export const userService = new UserService()
