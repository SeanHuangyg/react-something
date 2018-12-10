const SchemaType = require('./SchemaType');

const schemaMap = {};

function processTypes(types,
                      privateSchema,
                      namespace,
                      injectedNamespace,
                      globalSchemaMap) {
    const localSchemaMap = {};

    const typeKeys = Object.keys(types);

    typeKeys
        .forEach(typeName => {

            if (typeName === schema.orderKey) {
                localSchemaMap[schema.orderKey] = types[typeName];

                types[typeName]
                    .forEach(type => {
                        if (typeKeys.indexOf(type) === -1) {
                            throw new Error(`$order 中的 ${type} 字段属性没有找到相关定义.`);
                        }
                    });

                return;
            }

            const typeDef = types[typeName];

            const type = localSchemaMap[typeName] = new SchemaType(
                typeName,
                namespace,
                typeDef,
                privateSchema,
                injectedNamespace,
                globalSchemaMap
            );

            if (typeof typeDef === 'object' && typeDef) {
                let subTypeDef;

                if (typeDef instanceof Array) {
                    const subTypeDefList = typeDef.filter(subTypeDef =>
                        !(subTypeDef instanceof Array)
                        && typeof subTypeDef === 'object'
                        && subTypeDef
                    );

                    subTypeDef = subTypeDefList[0];
                }
                else {
                    subTypeDef = typeDef;
                }

                if (subTypeDef) {
                    type.setChildTypes(
                        processTypes(
                            subTypeDef,
                            privateSchema,
                            '~',
                            injectedNamespace,
                            globalSchemaMap
                        )
                    );
                }
            }
        });

    return localSchemaMap;
}

function schemaWPrivate(publicTypes, privateTypes, namespace, injectedNamespace) {
    const privateSchema = {};
    Object.assign(privateSchema, processTypes(
        privateTypes, privateSchema, namespace, injectedNamespace
        )
    );

    const currentDefSchemaMap = processTypes(
        publicTypes, privateSchema, namespace, injectedNamespace
    );

    Object
        .keys(currentDefSchemaMap)
        .forEach(typeFullName => {
            if (schemaMap.hasOwnProperty(typeFullName)) {
                console.warn(`${typeFullName} has double definitions.`)
            }

            schemaMap[typeFullName] = currentDefSchemaMap[typeFullName];
        });

    return currentDefSchemaMap;
}

function schema(...args) {
    if (typeof args[1] === 'string') {
        args.splice(1, 0, {});
    }

    return schemaWPrivate.apply(null, args);
}

schema.orderKey = '$order';

module.exports = schema;
