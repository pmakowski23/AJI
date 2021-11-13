import { Resolvers } from "./types";
import { UserResolvers } from "./resolvers/user";

const resolvers: Resolvers = {
	Query: {
		...UserResolvers.Query,
	}, 
	Mutation: {
		...UserResolvers.Mutation,
	}
};

export default resolvers;
