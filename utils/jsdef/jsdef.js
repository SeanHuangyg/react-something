import {schema} from 'frontend/module/UIDemoModule/wrapper';

export default schema({
    schema: ['woPrivate | wPrivate', `主要方法, 有两种调用方式`, {
        woPrivate: ['(public, namespace, injectedNamespaces) => @SchemaTypeGroup()', {
            'public': '@TypeDef',

            namespace: ['string',
                `用来指定当前 schema 定义所在的命名空间, 后续的所有类型定义,
                都会默认定义到这个命名空间里.`
            ],

            injectedNamespace: [`{shortKey: fullNamespace}`, {
                shortKey: `objectKey 
                // 其他 namespace 的缩略名, 用于提供很方便的创建链接. 
                
                如: ~~~{o: 'mySpace/myTypes'}, @o.TypeA => @mySpace/myTypes/TypeA~~~`,

                fullNamespace: `string 
                // 这里对应最终的目标命名空间`
            }]
        }],
        wPrivate: ['(public, private, namespace, injectedNamespaces) => @SchemaTypeGroup()', {
            'private': '@TypeDef'
        }],
    },
        [`
        一个鲜活的例子: ;)
        
        ~~~
        schema({
            world: 'primitive // 一个基础类型',
            
            TypeString: 'string',
            TypeNumber: 'number',
            
            TypeObject: {hello: 'world'},
            
            TypeArray1: ['array', '可以这么定义'],
            TypeArray2: ['[ string ]', '也可以这样...'],
            TypeArray3: ['[ string | boolean ]', '其实... 真的没什么特别的约束, 看团队内规范喜好, 最重要是可读性',
            
            TypeFunction: ['function(personId, onError) => person', {
                personId: 'number',
                onError: '(error) => undefined',
                person: '@Person'
            }],
            
            Person: {
                firstName: 'string',
                lastName: 'string',
                age: 'number',
                
                extra: '@PrivateClass',
                
                company: ['@o/Company', 'company 使用的是 otherNamespace/common/Company']
            }
        }, {
            PrivateClass: ['class', {
                members: {
                    id: 'number',
                    title: 'string'
                },
                prototype: {
                    setTitle: ['(string) => status', {
                        status: 'string: fail | ok'
                    }],
                    fetchTitle: '(id) => promise'
                }
            }, 'PrivateClass 是一个定义下可以被引用到的定义, 但是, 其他定义过程将不可见'],
        }, 'myNamespace', {
            o: 'otherNamespace/common'
        })
        ~~~`]
    ],

    SchemaType: ['class', {
        constructor: `name, namespace, privateSchema, injectedNamespace`,
        members: {
            fullName: 'string',
            namespace: 'string',
            name: 'string',

            typeDef: 'string',

            comments: ['[string | @Code())]',
                `对于任意的字符串内容, 会当成 markdown 来转义.
                
                注: 目前 @Code() 的方式还没有被实现出来, 包括其他可能的扩展.`
            ],

            childTypes: `{typeName: @SchemaType()}`,
            privateSchema: `{typeName: @SchemaType()}`,

            injectedNamespace: `@schema/*/injectedNamespaces //
                对应注入的命名空间缩略名匹配表.
            `,
        }
    }],

    code: [`string => @Code() // 将某段字符串内容显式地包装成一个 code 块`],

    TypeDef: ['{typeName: (@TypeDef | defString | defArray)}', {
        typeName: 'objectKey // 类型的名称',
        defString: [`string = typeDefExplanation, (\\s+, comment)?`,
            {
                typeDefExplanation: `stringPart //
                非常自由的一个类型定义 (或成为描述?), 由基础类型 (primitive), 类型 (@SomeType) 
                以及一些自用文本组成.
                
                如果类型定义等于 ~~~primitive~~~ 则这个类型将可以被很方便地被其他定义引用 
                (不需要在前面写 '@'), 理论上, 都是推荐基础类型不要带有任何的命名空间, 
                否则就丧失了原本的意义.
                
                例子:
                ~~~
                specialType: ['primitive', '一个特别的基础类型'],
                path/to/specialType: ['primitive', '有命名空间的基础类型']
                
                otherType: 'specialType' => 对应 specialType 类型
                anotherType: 'path/to/specialType' => 对应另一个类型
                ~~~
                
                如果任何关键词前面带有 ~~~@~~~, 那么它将会被当成类型来解析.
                
                注: 目前解析和一些特殊的类型交互还未实现. 第一版将交付一个简单的类型定义渲染能力.
                `,

                comment: `stringPart // 
                
                此部分可选, 规则是 ~~~// $COMMENT_CONTENT~~~
                
                第一个 // 将成为分割符, 但后续的 // 将被自然显示.
                
                注释中的所有 \\~~~ 将被替换成 \\\`\`\` 
                
                注释中的第一个空白符缩进, 将被用于对齐所有后续注释的缩进 (移除这部分).`
            }],

        defArray: ['[defString, subTypeDefs, ...comments]', {
            defString: '@../defString',
            subTypeDefs: '{subTypeName: @TypeDef}',
            comments: '[string | @Code()]'
        }],
    }],

    SchemaTypeGroup: {
        members: ['{typeName: @SchemaType()}', {
            typeName: 'string // refering to @.schema.typeName'
        }]
    },

    Code: ['class', {
        members: {
            content: 'string'
        }
    }],

    getAllSchemas: ['promise', {
        then: ['process => promise', {
            process: ['schemaList => any | promise', {
                schemaList: 'array<@SchemaType>'
            }]
        }],
        catch: ['err => promise']
    }]
}, 'jsDef');
