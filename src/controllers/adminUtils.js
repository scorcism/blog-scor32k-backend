import { validationResult } from "express-validator";
import { prismaClient } from '../lib/db.js'


// Get all the posts - admin
const getPosts = async (req, res) => {
    try {
        let userId = req.user.id;

        let posts = await prismaClient.post.findMany({
            where: { userId }
        })

        res.status(200).json({ success: true, message: posts })

    } catch (error) {
        console.log("get Posts: " + error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const updatePostStatus = async (req, res) => {
    try {
        let userId = req.user.id;
        let postId = req.params.id;

        let post = await prismaClient.post.findFirst({
            where: { userId: userId, id: postId }
        })

        if (!post) {
            return res.status(403).json({ success: true, message: "Not autorized" })
        }

        const updatePost = await prismaClient.post.update({
            where: {
                id: postId,
                userId: userId
            },
            data: {
                published: true,
            }
        })  

        console.log(updatePost)

        res.status(200).json({ success: true, message: "updated" })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export {
    getPosts,
    updatePostStatus
}