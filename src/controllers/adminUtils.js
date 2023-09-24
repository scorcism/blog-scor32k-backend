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

export {
    getPosts,
}