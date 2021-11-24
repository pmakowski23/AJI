import { gql } from "apollo-server-core/dist/gql";

export default gql`
  type Product {
    id: ID! @id
    name: String!
    description: String!
    price: Float!
    weight: Int!
    category: Category! @relationship(type: "PRODUCT_IN_CAT", direction: IN)
  }
`