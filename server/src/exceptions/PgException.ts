import HttpException from './HttpException'

const DUPLICATE_KEY_CODE = '23505'
const FK_RECORD_NOT_FOUND = '23503'

export default class TypeOrmException extends HttpException {
    constructor(error: any) {
        if (error.code) {
            if (error.code === DUPLICATE_KEY_CODE) {
                super(409, error.detail)
            } else if (error.code == FK_RECORD_NOT_FOUND) {
                super(404, error.detail)
            } else {
                super(500, error.detail)
            }
        } else {
            super(500, error.message)
        }
    }
}
