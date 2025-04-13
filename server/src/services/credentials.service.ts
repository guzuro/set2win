import { compare, hash } from 'bcrypt'

export class CredentialsService {
    static hashValue(value: string | Buffer) {
        return hash(value, 10)
    }

    static async verivyHash(value: string | Buffer, hash: string) {
        return await compare(value, hash)
    }
}
