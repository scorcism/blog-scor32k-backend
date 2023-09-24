import express from 'express'
import { currUserData, login, register } from '../controllers/userAuth.js'
import { verifyUser } from '../middleware/verifyUser.js';
import { loginValidation, signUpValidation } from '../helpers/validationHelper.js';
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Working /api/user")
})

router.post("/register", signUpValidation, register)
router.post("/login", loginValidation, login)
router.get("/user-data", verifyUser, currUserData)


export default router;