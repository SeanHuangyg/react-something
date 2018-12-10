const npath = require('path');

module.exports = function (plop, data) {
    plop.setGenerator('vm-component', {

        prompts: [{
            type: 'input',
            name: 'compName',
            message: '组件名称是什么?',
        }, {
            type: 'list',
            default: 'no',
            choices: ['yes', 'no'],
            name: 'shouldInject',
            message: '是否需要注入某个自定义东东？'
        }],

        actions: [{
            type: 'add',
            data,
            path: '{{currentPath}}/{{properCase compName}}Component/index.js',
            templateFile: npath.resolve(__dirname, 'index.js.hbs')
        }, {
            type: 'add',
            data,
            path: '{{currentPath}}/{{properCase compName}}Component/index.css',
            templateFile: npath.resolve(__dirname, 'index.css.hbs')
        }]
    })
};
