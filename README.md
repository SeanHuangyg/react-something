# 项目启动
1、安装依赖 npm i 
2、运行项目 npm start
# plop快速新建项目模板
1、cd 到想要创建模块的地方 执行 plop
2、输入项目名称
3、项目自定义的扩展 yes/no (不影响)
4、然后你就会在目录里看到生成的模板
# plop
基本：（官文上面的）
module.exports = function (plop) {
    // create your generators here
    plop.setGenerator('basics', {
        description: 'this is a skeleton plopfile',
        prompts: [], // array of inquirer prompts
        actions: []  // array of actions
    });
}
详细请看 https://www.npmjs.com/package/plop