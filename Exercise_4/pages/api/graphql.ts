import { NextApiRequest, NextApiResponse } from "next";
import { printSchema } from "graphql";
import { ApolloServer } from "apollo-server-micro";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { getResolversFromSchema } from "@graphql-tools/utils";
import { OGM } from "@neo4j/graphql-ogm";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  checkStateDirectiveTransformer,
  checkStateDirectiveTypeDefs,
} from "./graphql/checkStateDirective";
import neo4j from "neo4j-driver";
import { category, extendCategory } from "./graphql/category";
import { extendOrder, order } from "./graphql/order";
import { product, extendProduct } from "./graphql/product";
import { user, extendUser } from "./graphql/user";
import {
  constraintDirective,
  constraintDirectiveTypeDefs,
} from "@karavaan/graphql-constraint-directive";

export const typeDefs = [category, order, product, user];

const schemaTransforms = [
  constraintDirective(),
  // checkStateDirectiveTransformer(),
];

const { NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD } = process.env;

if (!NEO4J_URI || !NEO4J_USER || !NEO4J_PASSWORD) {
  throw new Error("Provide neo4j db auth values");
}

export const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
);

export const ogm = new OGM({ typeDefs, driver });

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const extendedTypeDefs = [
  extendCategory,
  extendOrder,
  extendProduct,
  extendUser,
];

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(
    [
      constraintDirectiveTypeDefs,
      // checkStateDirectiveTypeDefs,
      printSchema(neoSchema.schema),
      extendedTypeDefs,
    ],
    { ignoreFieldConflicts: true }
  ),
  resolvers: getResolversFromSchema(neoSchema.schema),
  schemaTransforms,
});

const apolloServer = new ApolloServer({ schema });

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await neoSchema.assertIndexesAndConstraints({ options: { create: true } });

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
