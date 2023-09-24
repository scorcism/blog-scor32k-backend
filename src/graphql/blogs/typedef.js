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
        published: Boolean!
        userId: User
    }
`
// tags: _tags,