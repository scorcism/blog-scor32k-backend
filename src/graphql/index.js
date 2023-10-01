import { ApolloServer } from "@apollo/server";
import { Bloggql } from './blogs/index.js'
import { prismaClient } from "../lib/db.js";

async function createApolloGQLServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
            ${Bloggql.typedef}

            type Query{
                ${Bloggql.queries}
            }
        `,

        resolvers: {
            Blog: {
                user: async (blog) => await prismaClient.user.findFirst({ where: { id: blog.userId } })
            },
            Query: {
                getBlogs: async () => await prismaClient.post.findMany({ where: { published: false } })
            },
        }
    })

    await gqlServer.start();

    return gqlServer;
}

export default createApolloGQLServer;