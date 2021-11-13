import { Resolvers, Role, User } from "./types";
import dbPromise from "../dao";
import { UserDbObject } from "../dao/types";
import { UserResolvers } from "./resolvers/user";

export const getCollection = async (collection: string) => {
	const db = await dbPromise;
	return db.collection<UserDbObject>(collection);
};

export const fromDbObject = ({ _id: id, username, email, role }: UserDbObject): User => ({
	id: id.toHexString(),
	username,
	email,
	role: role as Role,
});

const resolvers: Resolvers = {
	Query: {
		...UserResolvers.Query,
	}, 
	Mutation: {
		...UserResolvers.Mutation,
	}
};

export default resolvers;
