import { randomUUID } from 'crypto'
import Elysia, { error } from 'elysia'
import { writeFile } from 'fs/promises'
import path from 'path'
import { isImage } from '../../../utils/isImage'

const AVATAR_DIR = path.join('public', 'static', 'avatars')
export const AVATAR_PUBLIC_URL = 'static/avatars'

const staticRoutes = new Elysia().group('upload', (app) =>
    app.post('/avatar', async ({ request, cookie }) => {
        try {
            const fd = await request.formData()
            const file = fd.get('file') as File | undefined

            if (!file) {
                return error(400)
            }

            if (!isImage(file.type)) {
                return error(415)
            }

            const extension = file.name.split('.').pop()
            const fileName = `${randomUUID()}.${extension}`
            const filePath = path.join(AVATAR_DIR, fileName)
            const buffer = Buffer.from(await file.arrayBuffer())

            await writeFile(filePath, buffer)

            return { url: `${AVATAR_PUBLIC_URL}/${fileName}` }
        } catch (e) {
            return error(500, e instanceof Error ? e.message : 'Internal server error')
        }
    })
)

export default staticRoutes
