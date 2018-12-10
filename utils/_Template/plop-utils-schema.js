const schema = require('../jsdef/schema');

module.exports = schema({
    plopUtils: {
        loadGenerators: [`(path, plop) => undefined`, {
            path: `string // generators 的文件夹所在,
            利用其位置, 得到一系列 generator 的文件夹, 
            使用其内部 plop.js 进行初始化, plop.js 的规则与 plopfile.js 一致`,

            plop: `PlopInstance
            // plopfile.js 传入得到的 plop 对象`
        }]
    }
}, 'plop');
