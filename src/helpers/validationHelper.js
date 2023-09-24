import { check } from 'express-validator'

const signUpValidation = [
    check("name", "Name Required").exists(),
    check("email", "Email Required").isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check("password", "Password length should be >6").isLength({ min: 6 }),
]

const loginValidation = [
    check("email", "Email Required").isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check("password", "Password length should be >6").isLength({ min: 6 })
]

export {
    signUpValidation,
    loginValidation,
}
