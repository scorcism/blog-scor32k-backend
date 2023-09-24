import { validationResult } from "express-validator";
import slugify from 'slugify'
import { prismaClient } from '../lib/db.js'


const postBlog = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors });
    }

    const { title, tags, desc, imgUrl, blog } = req.body;

    try {

        let userId = req.user.id;
        let slug = slugify(title, { lower: true, strict: true });

        let suffix = ["73636f7233326b", "616268697368656b", "73636f727368656b", "73636f726369736d"];
        let suffixIndex = Math.floor(Math.random() * suffix.length);

        slug += suffix[suffixIndex];

        let newPost = await prismaClient.post.create({
            data: {
                slug,
                title,
                desc,
                blog,
                published: false,
                tags,
                imgUrl,
                userId
            }
        })

        console.log(newPost);
        res.status(201).json({
            success: true,
            message: newPost.slug
        })

    } catch (error) {
        console.log("postBlog: " + error);
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}

export {
    postBlog,
}