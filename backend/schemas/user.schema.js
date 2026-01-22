const z = require('zod');

const registerSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(20).regex(/[A-Za-z0-9!@#$%^&*()_+]{6,}/, 'Password must contain at least one special character or number')
})

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20).regex(/[A-Za-z0-9!@#$%^&*()_+]{6,}/, 'Password must contain at least one special character or number')
})


module.exports = { registerSchema, loginSchema };