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

const postBlogValidation = [
    check("title", "Title required").isLength({ min: 5 }),
    check("desc", "Desc length should be >15").isLength({ min: 1 }),
    check("blog", "Blog length should be >50").isLength({ min: 1 }),
    check("tags", "Tags should exists").exists(),
    check("imgUrl", "Image should be present").exists()
]


export {
    signUpValidation,
    loginValidation,
    postBlogValidation
}
