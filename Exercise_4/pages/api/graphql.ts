import { ApolloServer } from 'apollo-server-micro'
import "graphql-import-node";
import userTypeDefs from '../../src/graphql/schemas/user.graphql';
import schemaTypeDefs from "../../src/graphql/schema.graphql";
import resolvers from "../../src/graphql/resolvers";
import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb";

const apolloServer = new ApolloServer({ typeDefs: [DIRECTIVES, userTypeDefs, schemaTypeDefs], resolvers })

const startServer = apolloServer.start()

export default async function handler(req: any, res: any) {
	res.setHeader('Access-Control-Allow-Credentials', 'true')
	res.setHeader(
		'Access-Control-Allow-Origin',
		'https://studio.apollographql.com'
	)
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	if (req.method === 'OPTIONS') {
		res.end()
		return false
	}

	await startServer
	await apolloServer.createHandler({
		path: '/api/graphql',
	})(req, res)
}

export const config = {
	api: {
		bodyParser: false,
	},
}