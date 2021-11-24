import { gql } from "apollo-server-core/dist/gql";

export default gql`
  type User {
    id: ID! @id
    username: String!
    email: String!
    phoneNumber: String!
    role: Role!
    orders: [Order] @relationship(type: "MADE", direction: OUT)
  }

  enum Role {
    USER
    ADMIN
  }
`