const z = require('zod');

const passwordValidator = z
    .string()
    .min(6)
    .max(20)
    .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,20}$/,
        "Password must include at least one capital letter, one special character and one number "
  );

const signUpValidator = z.object({
    username: z.string().min(3).max(20).trim(),
    email: z.string().email().trim(),
    password: passwordValidator
})

const loginValidator = z.object({
    email: z.string().email().trim(),
    password: z.string().min(1) //not needed again as its set during register
})

module.exports = { signUpValidator, loginValidator };