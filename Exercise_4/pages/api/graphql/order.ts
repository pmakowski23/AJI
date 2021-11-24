import { gql } from "apollo-server-core/dist/gql";

export default gql`
  type Order {
    id: ID! @id
    state: OrderState!
    user: User! @relationship(type: "MADE", direction: IN)
    createdAt: String!
    products: [Product!] @relationship(type: "INCLUDE", direction: OUT)
  }

  enum OrderState {
    UNAPPROVED
    APPROVED
    CANCELLED
    FULLFIELD
  }
`