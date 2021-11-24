import { ApolloServer } from "apollo-server-micro";
import { constraintDirective, constraintDirectiveTypeDefs } from '@karavaan/graphql-constraint-directive'
import { checkStateDirective, checkStateDirectiveTypeDefs } from "./graphql/checkStateDirective";
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import { NextApiRequest, NextApiResponse } from "next";
import category from "./graphql/category";
import order from "./graphql/order";
import product from "./graphql/product";
import user from "./graphql/user";

// DB: https://console.neo4j.io/#databases

export const typeDefs = [category, order, product, user, constraintDirectiveTypeDefs, checkStateDirectiveTypeDefs]

const { NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD } = process.env

if (!NEO4J_URI || !NEO4J_USER || !NEO4J_PASSWORD) {
	throw new Error('Provide neo4j db auth values')
}

export const driver = neo4j.driver(
	NEO4J_URI,
	neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
);

const schemaTransforms = [constraintDirective(), checkStateDirective()]

const neoSchema = new Neo4jGraphQL({ typeDefs, driver, schemaTransforms });

const apolloServer = new ApolloServer({ schema: neoSchema.schema });

const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Origin", "https://studio.apollographql.com");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	if (req.method === "OPTIONS") {
		res.end();
		return false;
	}

	await startServer;
	await apolloServer.createHandler({
		path: "/api/graphql",
	})(req, res);
}

export const config = {
	api: {
		bodyParser: false,
	},
};