import { gql } from "apollo-server-core/dist/gql";

export default gql`
  type User {
    id: ID! @id
    username: String! @constraint(minLength: 5)
    email: String! @constraint(format: "email")
    phoneNumber: String! @constraint(pattern: "[0-9]{9}")
    role: Role!
    orders: [Order] @relationship(type: "MADE", direction: OUT)
  }

  enum Role {
    USER
    ADMIN
  }
`