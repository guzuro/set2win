export const isImage = (type: File['type']) => {
    return ['image/jpeg', 'image/png', 'image/webp'].includes(type)
}
