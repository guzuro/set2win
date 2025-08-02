import { compare, hash } from 'bcrypt'

export const hashValue = (value: string | Buffer) => hash(value, 10)
export const verivyHash = async (value: string | Buffer, hash: string) => await compare(value, hash)
