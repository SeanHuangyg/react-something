const fs = require('fs');
const npath = require('path');
const moment = require('moment');
const _ = require('lodash');

const plopUtils = {
    cursor(tagName) {
        return new RegExp('(\\/\\*<' + tagName + '>\\*\\/)', 'g')
    },

    preset: {
        yesNoChoices: ['yes', 'no'],
    },

    template(dirname, fileName) {
        const content = fs
            .readFileSync(
                npath.resolve(dirname, fileName)
            )
            .toString();

        return content
            .replace(/\/\*plop/g, '')
            .replace(/plop\*\//g, '')
            .replace(/\/\*(\{\{[^]+?\}\})\*\//g, '$1')
    },

    validators: {
        required(keyName) {
            return function (input) {
                const done = this.async();

                if (!_.trim(input)) {
                    done(`${keyName} 不能为空`);
                }
                else {
                    done(null, true);
                }
            }
        }
    },

    ensureLocalFileFromExample: function (path, examplePath) {
        examplePath = examplePath || path + '.example'

        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, fs.readFileSync(examplePath));
        }
    },

    loadGenerators(path, plop) {
        const currentPath = npath.resolve('.');
        const extraData = {
            currentPath,
            today: moment().format('YYYY-MM-DD'),
            ...globalConfig
        };

        const files = fs.readdirSync(path);

        files.forEach(file => {
            const generatorPlopFile = npath.resolve(path, file, 'plop.js');
            if (fs.existsSync(generatorPlopFile)) {
                try {
                    require(generatorPlopFile)(plop, extraData, plopUtils);
                }
                catch (ex) {
                    console.error('遇到错误', ex);
                    console.error('路径为 : ', generatorPlopFile);
                }
            }
        })
    }
};

const globalConfigPath = npath.resolve(__dirname, './plop.config.js');
plopUtils.ensureLocalFileFromExample(
    globalConfigPath
);

const globalConfig = require(globalConfigPath);

if (globalConfig.userName === 'SET_YOUR_USERNAME') {
    throw new Error(`请修改 ${globalConfigPath} 中的配置.`);
}

module.exports = plopUtils;
