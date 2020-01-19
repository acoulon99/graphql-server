const { ApolloServer, gql } = require('apollo-server')

const BOOKS = [
  {
    title: 'Title1',
  },
  {
    title: 'Title2',
  },
]

const AUTHORS = [
  {
    name: 'Arther',
  },
  {
    name: 'Betty',
  },
]

// The GraphQL schema
const typeDefs = gql`
  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    books: [Book]
  }

  type Query {
    authors: [Author]
  }
`

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    authors(parent, args, context, info){
      console.log('authors', parent, args)
      return AUTHORS
    }
  },
  Author: {
    books(parent, args, context, info){
      console.log('books', parent, args)
      return BOOKS
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) =>
  console.log(`🚀 Server ready at ${url}`))