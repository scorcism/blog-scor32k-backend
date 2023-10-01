export const typedef = `#graphql
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Blog {
        id: ID!
        title: String!
        desc: String!
        blog: String!
        imgUrl: String!,
        tags: [String]!
        published: Boolean!
        slug: String!
        createdAt: String!
        userId: String!
        user: User
    }
`
// tags: _tags,