import { gql } from "apollo-server-core";

export const user = gql`
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
`;

export const extendUser = gql`
  extend input UserCreateInput {
    username: String! @constraint(minLength: 5)
    email: String! @constraint(format: "email")
    phoneNumber: String! @constraint(pattern: "[0-9]{9}")
  }
`;
