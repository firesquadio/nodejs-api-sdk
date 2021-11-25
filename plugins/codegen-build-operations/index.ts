import fs from 'fs'
import path from 'path'
import { pascalCase } from 'change-case-all'
import { CodegenPlugin } from '@graphql-codegen/plugin-helpers'
import { buildOperationNodeForField } from '@graphql-tools/utils'
import {
  print,
  TypeNode,
  GraphQLSchema,
  OperationTypeNode,
  OperationDefinitionNode,
} from 'graphql'

function resolveType(type: string, scalars?: Record<string, string>) {
  if (['ID', 'String', 'Boolean', 'Int', 'Float'].includes(type))
    return `Scalars['${type}']`

  if (scalars && Object.keys(scalars).includes(type)) {
    return `Scalars['${type}']`
  }

  return pascalCase(type)
}

function buildType(
  type: TypeNode,
  scalars?: Record<string, string>,
  required?: boolean
) {
  if (type.kind === 'ListType') {
    return `Array<${buildType(type.type, scalars)}>`
  }

  if (type.kind === 'NonNullType') {
    return buildType(type.type, scalars, true)
  }

  if (type.kind === 'NamedType') {
    const typeValue = resolveType(type.name.value, scalars)
    return required ? typeValue : `Maybe<${typeValue}>`
  }
}

function buildOperation(
  schema: GraphQLSchema,
  operation: OperationDefinitionNode,
  scalars?: Record<string, string>
) {
  const field =
    operation.operation === 'mutation'
      ? schema.getMutationType().getFields()[operation.name.value]
      : schema.getQueryType().getFields()[operation.name.value]

  const variables = operation.variableDefinitions.map((_) => ({
    name: _.variable.name.value,
    type: buildType(_.type, scalars),
  }))

  const returnString = `'${operation.name.value}', { ${
    operation.name.value
  }: ${buildType(field.astNode.type)} }`
  const variableDefinitionString = variables
    .map((_) => `${_.name}: ${_.type}`)
    .join(', ')
  const variablePayloadString =
    '{ ' + variables.map((_) => _.name).join(', ') + ' }'

  return `
  ${field.description ? `/** ${field.description} */` : ''}
  public async ${operation.name.value}(${variableDefinitionString}) {
    return await this.doRequest<${returnString}>({
      query: \`${print(operation)}\`,
      variables: ${variablePayloadString},
      operationName: "${operation.name.value}"
    })
  }`
}

const plugin: CodegenPlugin<{
  scalars?: Record<string, string>
  templateName: string
}> = {
  validate: (schema, documents, config) => {
    if (!('templateName' in config)) {
      throw new Error(`'templateName' not found in config.`)
    }
  },
  plugin: (schema, documents, config, info) => {
    const queryFields = schema.getQueryType().getFields()
    const mutationFields = schema.getMutationType().getFields()

    const queryOperations = Object.keys(queryFields).map((_) => {
      const op = buildOperationNodeForField({
        schema,
        field: _,
        depthLimit: 10,
        kind: OperationTypeNode.QUERY,
      })

      return buildOperation(
        schema,
        { ...op, name: { ...op.name, value: _ } },
        config.scalars
      )
    })

    const mutationOperations = Object.keys(mutationFields).map((_) => {
      const op = buildOperationNodeForField({
        schema,
        field: _,
        depthLimit: 10,
        kind: OperationTypeNode.MUTATION,
      })

      return buildOperation(
        schema,
        { ...op, name: { ...op.name, value: _ } },
        config.scalars
      )
    })

    const template = fs.readFileSync(
      path.join(process.cwd(), config.templateName),
      'utf-8'
    )
    const payload = `
      ${queryOperations.join('\n')}
      ${mutationOperations.join('\n')}
    `

    return template.replace('/* $REPLACE$ */', payload)
  },
}

export = plugin
