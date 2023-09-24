import { ApolloServer } from "@apollo/server";


async function createApolloGQLServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String
          }
        
        `,
        resolvers: {
            Query: {
                hello: () => 'world',
            },
        }
    })

    await gqlServer.start();

    return gqlServer;
}

export default createApolloGQLServer;