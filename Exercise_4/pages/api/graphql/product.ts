import { gql } from "apollo-server-core/dist/gql";

export default gql`
  type Product {
    id: ID! @id
    name: String! @constraint(minLength: 3)
    description: String! @constraint(minLength: 20)
    price: Float! @constraint(exclusiveMin: 0)
    weight: Int! @constraint(exclusiveMin: 0)
    category: Category! @relationship(type: "PRODUCT_IN_CAT", direction: IN)
  }
`