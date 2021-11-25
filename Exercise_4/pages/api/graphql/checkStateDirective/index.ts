import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils"
import { gql } from "apollo-server-core/dist/gql";
import { ValidationError } from "apollo-server-errors";
import { defaultFieldResolver } from "graphql/execution/execute";
import { GraphQLSchema } from "graphql/type/schema"
import { ogm } from "../../graphql";

export const checkStateDirectiveTypeDefs = gql`
	directive @checkState on FIELD_DEFINITION
`

export function checkStateDirective(): (schema: GraphQLSchema) => GraphQLSchema {
	return schema =>
		mapSchema(schema, {
			[MapperKind.OBJECT_FIELD]: fieldConfig => {
				const checkStateDirective = getDirective(schema, fieldConfig, 'checkState')?.[0]
				if (checkStateDirective) {
					const { resolve = defaultFieldResolver } = fieldConfig
					fieldConfig.resolve = async function (source, args, context, info) {
						if (info.operation.operation === 'mutation') {
							if (info.variableValues.update && source.state) {
								const states = ['UNAPPROVED', 'APPROVED', 'CANCELLED', 'FULLFIELD']
								const Parent = ogm.model(info.parentType.name);
								const id = source.id
								const currentState = states.indexOf(await Parent.find({ where: { id } }))
								const updatedState = states.indexOf((info.variableValues.update as any).state)
								if (updatedState < currentState) {
									throw new ValidationError("Can't update value with previous state.")
								}
							}
						}
						const result = await resolve(source, args, context, info)
						return result
					}
					return fieldConfig
				}
			}
		})
}