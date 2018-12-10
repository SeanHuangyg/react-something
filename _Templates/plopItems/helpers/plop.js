module.exports = function (plop) {
    plop.setHelper('eq', function (v1, v2) {
        return v1 === v2;
    });

    plop.setHelper('ne', function (v1, v2) {
        return v1 !== v2;
    });

    plop.setHelper('lt', function (v1, v2) {
        return v1 < v2;
    });

    plop.setHelper('gt', function (v1, v2) {
        return v1 > v2;
    });

    plop.setHelper('lte', function (v1, v2) {
        return v1 <= v2;
    });

    plop.setHelper('gte', function (v1, v2) {
        return v1 >= v2;
    });

    plop.setHelper('and', function () {
        return Array.prototype.slice.call(arguments).every(Boolean);
    });

    plop.setHelper('or', function () {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    });

    plop.setHelper('not', function(v1) {
         return !v1;
    });
};
