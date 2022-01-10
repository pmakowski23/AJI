import { ValidationError } from "apollo-server-micro";
import { IMiddleware } from "graphql-middleware";
import { Order } from "pages/api/graphql";

export const checkStateMiddleware: IMiddleware = {
  Mutation: {
    updateOrders: async (resolve, parent, args, ctx, info) => {
      const { where, update } = args;

      const [existing] = await Order.find({
        ...where,
      });

      const states = ["UNAPPROVED", "APPROVED", "CANCELLED", "FULLFIELD"];

      const currentState = states.indexOf(existing.state);
      const toBeUpdatedState = states.indexOf(update.state);

      if (toBeUpdatedState < currentState) {
        throw new ValidationError("Can't update value with previous state.");
      }

      return resolve(parent, args);
    },
  },
};
