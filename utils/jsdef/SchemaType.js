function SchemaType(name,
                    namespace,
                    rawTypeDef,
                    privateSchema,
                    injectedNamespace) {
    this.name = name;
    this.namespace = namespace;
    this.fullName = namespace === '~' ? `${namespace}/${name}` : name;

    this.privateSchema = privateSchema;
    this.injectedNamespace = injectedNamespace || {};

    this.childTypes = {};

    this.setTypeDef(rawTypeDef);
}

const schemaTypeUtis = {
    RGX_CODE: /([^\\]|^)~~~/g,

    trim(string) {
        return string
        // 可能使用的是 tab key
            .replace(/^[ \t]+/, '')
            .replace(/[ \t]+$/, '');
    },

    parseComments(rawComments) {
        return rawComments.map(
            comment => schemaTypeUtis.parseComment(comment)
        );
    },

    parseComment(content) {
        let lines = schemaTypeUtis
            .trim(content)
            .split(/\n/g);

        const rgxFirstIndex = new RegExp('^' + /^[ \t]*/.exec(lines[1])[0]);

        lines = lines
            .map(line => line.replace(rgxFirstIndex, ''))
            .map(line => line.replace(schemaTypeUtis.RGX_CODE, '$1```'));

        return lines.join('\n');
    },

    splitDefAndComment(content) {
        const index = content.indexOf('//');

        if (index === -1) {
            return [content];
        }
        else {
            return [
                content.slice(0, index),
                content.slice(index + 2)
            ];
        }
    }
};

SchemaType.prototype = {
    setTypeDef(rawTypeDef) {
        let typeDefArray;

        if (typeof rawTypeDef === 'string') {
            typeDefArray = [rawTypeDef];
        } else if (rawTypeDef && !(rawTypeDef instanceof Array) && typeof rawTypeDef === 'object') {
            typeDefArray = ['object'];
        }
        else {
            typeDefArray = rawTypeDef;
        }

        if (!typeDefArray.filter) {
            debugger
        }

        let defOrComments = typeDefArray;

        for (let i = defOrComments.length; i-- > 0;) {
            if (defOrComments[i] instanceof Array) {
                defOrComments.splice(i, 1, ...defOrComments[i]);
            }
        }

        defOrComments = defOrComments.filter(
            // @todo 未来这个可能需要考虑有其他的 def 元素, 如 Code, Example, i18n, 自定义类型等等
            def => typeof def !== 'object'
        );

        const defCheck = schemaTypeUtis.splitDefAndComment(defOrComments[0]);
        if (defCheck.length > 1) {
            defOrComments.shift();
            defOrComments.unshift(
                defCheck[0],
                defCheck[1]
            );
        }

        this.typeDef = defOrComments.shift();
        this.comments = schemaTypeUtis.parseComments(defOrComments);
    },

    setChildTypes(childTypes) {
        this.childTypes = childTypes;
    }
};

module.exports = SchemaType;
