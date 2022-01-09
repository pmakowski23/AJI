import { gql } from "apollo-server-core/dist/gql";

export const category = gql`
  type Category {
    id: ID! @id
    name: String!
    description: String!
    products: [Product] @relationship(type: "PRODUCT_IN_CAT", direction: OUT)
  }
`;

export const extendCategory = gql`
  extend input CategoryCreateInput {
    name: String! @constraint(minLength: 5)
    description: String! @constraint(minLength: 20)
  }
`;