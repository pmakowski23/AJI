This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run it locally you need to:

- if want to run db locally:
	- run ./neo4j-apoc.sh by copying command to terminal with docker running or executing this script
- create .env.local

example as if run locally:
```
NEO4J_URI='bolt://localhost:7687'
NEO4J_USER=neo4j
NEO4J_PASSWORD=s3cr3t
```
- start next app with `yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Open [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql) with your browser to see graphQl playground.

