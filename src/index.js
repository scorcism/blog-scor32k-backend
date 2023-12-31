import express from "express";
import bodyParser from 'body-parser';
import cors from "cors"
import userRoute from './routes/user.js'
import postRoute from './routes/post.js'
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGQLServer from "./graphql/index.js";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8000;


async function init() {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.set('trust proxy', true);

    app.get("/", (req, res) => {
        res.status(200).json({ message: "Working home" })
    })

    app.use("/api/admin/auth", userRoute)
    app.use("/api/admin/post", postRoute)

    app.use("/api/graphql", expressMiddleware(await createApolloGQLServer()));

    app.listen(PORT, (req, res) => {
        console.log(`App listening on http://localhost:${PORT}`)
    })

}


init();