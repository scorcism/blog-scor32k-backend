import express from 'express'
import { verifyUser } from '../middleware/verifyUser.js';
import { getPosts, updatePostStatus } from '../controllers/adminUtils.js';
import { ExpressValidator, body, validationResult } from "express-validator";
import slugify from 'slugify';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import { prismaClient } from '../lib/db.js'

const router = express.Router();

router.get("/", verifyUser, getPosts)
router.put("/update-status/:id", verifyUser, updatePostStatus)


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESSS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

router.post("/", verifyUser, [
    body("title", "Title req").isLength({ min: 5 }),
    body("desc", "Desc req").isLength({ min: 5 }),
    body("blog", "Blog req").isLength({ min: 5 }),
], upload.single('image'), async (req, res) => {

    const errors = validationResult(req.body);

    const { title, tags, desc, blog } = req.body;

    if (!title || !tags || !desc || !blog || title.length < 5 || desc.length < 5 || blog.length < 5) {
        return res.status(400).json({ success: false, message: "Missing Data" })
    }

    try {

        let userId = req.user.id;

        let slug = slugify(title, { lower: true, strict: true });
        let suffix = ["73636f7233326b", "616268697368656b", "73636f727368656b", "73636f726369736d"];
        let suffixIndex = Math.floor(Math.random() * suffix.length);
        slug += suffix[suffixIndex];

        const imageBuffer = req.file.buffer;
        const imageName = `${title}-${uuid()}-scor32k.png`;

        const s3Params = {
            Bucket: 'scor32-blog',
            Key: imageName,
            Body: imageBuffer,
            ACL: 'private'
        }

        const uploadResult = await s3.upload(s3Params).promise();

        const imageUrl = uploadResult.Location;


        let _tags = JSON.parse(tags);
        let newPost = await prismaClient.post.create({
            data: {
                slug,
                title,
                desc,
                blog,
                published: false,
                tags: _tags,
                imgUrl: imageUrl,
                userId
            }
        })

        res.status(201).json({
            success: true,
            message: newPost.slug
        })

    } catch (error) {
        console.log("postBlog: " + error);
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
})


export default router;