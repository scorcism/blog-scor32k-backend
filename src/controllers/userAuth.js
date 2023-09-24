import { validationResult } from "express-validator";
import { prismaClient } from '../lib/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

const register = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors });
    }

    const { name, email, password } = req.body;

    try {
        let user = await prismaClient.user.count({ where: { email } });
        if (user) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSaltSync(10);
        const secPassword = await bcrypt.hash(password, salt);

        const newUser = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: secPassword
            }
        })

        return res.status(200).json({ success: true, message: newUser.id });

    } catch (error) {
        console.log("Regsiter: " + error);
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}

const login = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors });
    }

    const { email, password } = req.body;

    try {

        let user = await prismaClient.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ success: false, message: "Check your credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(404).json({ success: false, message: "Check your credentials" })
        }

        let data = {
            user: {
                id: user.id,
            }
        }

        let authToken = jwt.sign(data, process.env.JWT_SECRET);
        console.log(authToken)

        res.status(201).json({ succes: true, message: authToken })

    } catch (error) {
        console.log("Login: " + error);
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}

const currUserData = async (req, res) => {
    try {
        let id = req.user.id;

        let user = await prismaClient.user.findUnique({
            where: { id },
            select: { name: true, email: true }
        });

        if (!user) {
            return res.status(403).json({ success: false, message: "Not authorized" });
        }


        res.status(200).json({
            success: true,
            message: user
        })

    } catch (error) {
        console.log("Verify User: " + error);
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}

export {
    register,
    login,
    currUserData
}