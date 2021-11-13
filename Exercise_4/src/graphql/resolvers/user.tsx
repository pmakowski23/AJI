import { ObjectId } from "mongodb";
import { UserDbObject } from "../../dao/types";
import { fromDbObject, getCollection } from "../resolvers";
import { Resolvers } from "../types";

export const UserResolvers: Resolvers = {
  Query: {
    allUsers: async () => {
      const collection = await getCollection("users");
      return await collection.find().map(fromDbObject).toArray();
    },
    User: async (_: any, { userId }) => {
      const collection = await getCollection("users");
      const dbObject = await collection.findOne({
        _id: ObjectId.createFromHexString(userId),
      });

      if (!dbObject) return null;

      return fromDbObject(dbObject);
    },
  },
  Mutation: {
    createUser: async (_: any, { username, email, role }) => {
      const data: Omit<UserDbObject, "_id"> = {
        username,
        email,
        role,
      };

      const collection = await getCollection("users");
      const document = await collection.insertOne(data);
      return fromDbObject({
        ...data,
        _id: document.insertedId,
      });
    },
    updateUser: async (_: any, { userId, data }) => {
      const collection = await getCollection("users");
      if (!data) return null;
      const result = await collection.findOneAndUpdate(
        {
          _id: ObjectId.createFromHexString(userId),
        },
        { $set: data as UserDbObject },
        { returnDocument: "after" }
      );

      if (!result.value) return null;

      return fromDbObject(result.value);
    },
  },
};