import { gql } from "apollo-server-core/dist/gql";

export default gql`
  type Category {
    id: ID! @id
    name: String!
    description: String!
    products: [Product] @relationship(type: "PRODUCT_IN_CAT", direction: OUT)
  }
`
