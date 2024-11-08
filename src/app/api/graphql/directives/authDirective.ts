import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { getDirective, mapSchema, MapperKind } from '@graphql-tools/utils';
import { writeLogEntry } from '../../../../lib/utils/logging';

export const authDirective = () => {
  return {
    authDirectiveTypeDefs: `directive @auth on FIELD_DEFINITION | ENUM_VALUE`,
    authDirectiveTransformer: (schema: GraphQLSchema) => {
      return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          // Check if the field has the @auth directive
          const authDirective = getDirective(schema, fieldConfig, 'auth')?.[0];

          // If the directive is not found, skip the auth logic for this field
          if (!authDirective) {
            return fieldConfig;
          }

          const { resolve = defaultFieldResolver } = fieldConfig;
          fieldConfig.resolve = function (source, args, context, info) {
            if (context.user.role === 'optometrist') {
              writeLogEntry(
                'User is not authorized to perform this action ' +
                  JSON.stringify(context.user),
                'NOTICE',
              );
              throw new Error('not authorized');
            }
            return resolve(source, args, context, info);
          };
          return fieldConfig;
        },
      });
    },
  };
};
