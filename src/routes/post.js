import express from 'express'
import { verifyUser } from '../middleware/verifyUser.js';
import { postBlogValidation } from '../helpers/validationHelper.js';
import { postBlog } from '../controllers/userPost.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Working /api/post")
})

router.post("/", verifyUser, postBlogValidation, postBlog)

export default router;