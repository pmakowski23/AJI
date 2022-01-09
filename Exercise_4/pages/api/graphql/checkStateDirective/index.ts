import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import {
  GraphQLFieldConfig,
  GraphQLInputFieldConfig,
  GraphQLEnumType,
  isScalarType,
  isNonNullType,
  isEnumType,
  GraphQLEnumValueConfigMap,
} from "graphql";
import { GraphQLSchema } from "graphql/type/schema";
// import { gql } from "apollo-server-core/dist/gql";
// import { ValidationError } from "apollo-server-errors";
// import { makeExecutableSchema } from "@graphql-tools/schema";
// import { defaultFieldResolver } from "graphql/execution/execute";
// import { ogm } from "../../graphql";

// export const checkStateDirectiveTypeDefs = gql`
//   directive @checkState on INPUT_FIELD_DEFINITION
// `;

// export function checkStateDirective(): (
//   schema: GraphQLSchema
// ) => GraphQLSchema {
//   return (schema) =>
//     mapSchema(schema, {
//       [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
//         const checkStateDirective = getDirective(
//           schema,
//           fieldConfig,
//           "checkState"
//         )?.[0];
//         if (checkStateDirective) {
//           const { resolve = defaultFieldResolver } = fieldConfig;
//           fieldConfig.resolve = async function (source, args, context, info) {
//             if (info.operation.operation === "mutation") {
//               if (info.variableValues.update && source.state) {
//                 const states = [
//                   "UNAPPROVED",
//                   "APPROVED",
//                   "CANCELLED",
//                   "FULLFIELD",
//                 ];
//                 const Parent = ogm.model(info.parentType.name);
//                 const id = source.id;
//                 const currentState = states.indexOf(
//                   await Parent.find({ where: { id } })
//                 );
//                 const updatedState = states.indexOf(
//                   (info.variableValues.update as any).state
//                 );
//                 if (updatedState < currentState) {
//                   throw new ValidationError(
//                     "Can't update value with previous state."
//                   );
//                 }
//               }
//             }
//             const result = await resolve(source, args, context, info);
//             return result;
//           };
//           return fieldConfig;
//         }
//       },
//     });
// }

function checkStateDirective(directiveName: string) {
  class CheckStateType extends GraphQLEnumType {
    constructor(type: GraphQLEnumType) {
      super({
        name: `${type.name}WithCheckState`,
        values: {
          [MapperKind.ENUM_TYPE]: (fieldConfig) => {
            return fieldConfig;
          },
        },
      });
    }
  }

  const limitedLengthTypes: Record<
    string,
    Record<number, GraphQLEnumType>
  > = {};

  function getCheckStateType(
    type: GraphQLEnumType,
    maxLength: number
  ): GraphQLEnumType {
    const limitedLengthTypesByTypeName = limitedLengthTypes[type.name];
    if (!limitedLengthTypesByTypeName) {
      const newType = new CheckStateType(type, maxLength);
      limitedLengthTypes[type.name] = {};
      limitedLengthTypes[type.name][maxLength] = newType;
      return newType;
    }

    const limitedLengthType = limitedLengthTypesByTypeName[maxLength];
    if (!limitedLengthType) {
      const newType = new CheckStateType(type, maxLength);
      limitedLengthTypesByTypeName[maxLength] = newType;
      return newType;
    }

    return limitedLengthType;
  }

  function wrapType<
    F extends GraphQLFieldConfig<any, any> | GraphQLInputFieldConfig
  >(fieldConfig: F, directiveArgumentMap: Record<string, any>): void {
    if (
      isNonNullType(fieldConfig.type) &&
      isEnumType(fieldConfig.type.ofType)
    ) {
      fieldConfig.type = getCheckStateType(
        fieldConfig.type.ofType,
        directiveArgumentMap["max"]
      );
    } else if (isEnumType(fieldConfig.type)) {
      fieldConfig.type = getCheckStateType(
        fieldConfig.type,
        directiveArgumentMap["max"]
      );
    } else {
      throw new Error(`Not a scalar type: ${fieldConfig.type.toString()}`);
    }
  }

  return {
    checkStateDirectiveTypeDefs: `directive @${directiveName}(max: Int) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION`,
    checkStateDirectiveTransformer: () => (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.FIELD]: (fieldConfig) => {
          const checkStateDirective = getDirective(
            schema,
            fieldConfig,
            directiveName
          )?.[0];
          if (checkStateDirective) {
            wrapType(fieldConfig, checkStateDirective);
            return fieldConfig;
          }
        },
      }),
  };
}

export const { checkStateDirectiveTypeDefs, checkStateDirectiveTransformer } =
  checkStateDirective("checkState");
