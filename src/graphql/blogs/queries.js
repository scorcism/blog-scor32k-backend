export const queries = `#graphql
    getBlogs: [Blog]
    getBlog(slug: String!): Blog
    getBlogsAll: [Blog]
`