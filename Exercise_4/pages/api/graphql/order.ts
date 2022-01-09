import { gql } from "apollo-server-core/dist/gql";

export const order = gql`
  type Order {
    id: ID! @id
    state: OrderState!
    user: User! @relationship(type: "MADE", direction: IN)
    createdAt: DateTime! @timestamp(operations: [CREATE])
    products: [Product!] @relationship(type: "INCLUDE", direction: OUT)
  }

  enum OrderState {
    UNAPPROVED
    APPROVED
    CANCELLED
    FULFILLED
  }
`;

export const extendOrder = gql`
  extend input OrderCreateInput {
    state: OrderState!
  }
`;
