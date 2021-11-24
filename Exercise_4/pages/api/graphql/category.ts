import { gql } from "apollo-server-core/dist/gql";

export default gql`
  type Category {
    id: ID! @id
    name: String! @constraint(minLength: 5)
    description: String! @constraint(minLength: 20)
    products: [Product] @relationship(type: "PRODUCT_IN_CAT", direction: OUT)
  }
`
