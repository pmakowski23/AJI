import { gql } from "apollo-server-core/dist/gql";

export const product = gql`
  type Product {
    id: ID! @id
    name: String!
    description: String!
    price: Float!
    weight: Int!
    category: Category! @relationship(type: "PRODUCT_IN_CAT", direction: IN)
  }
`;

export const extendProduct = gql`
  extend input ProductCreateInput {
    name: String! @constraint(minLength: 3)
    description: String! @constraint(minLength: 20)
    price: Float! @constraint(exclusiveMin: 0)
    weight: Int! @constraint(exclusiveMin: 0)
  }
`;
