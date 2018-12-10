const plopUtils = require('../utils/_Template/plop-utils');
const npath = require('path');

module.exports = function (plop) {

    plopUtils.loadGenerators(
        npath.resolve(__dirname, 'plopItems'),
        plop
    );
};
