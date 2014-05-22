/// <reference path="../typings/tsd.d.ts" />
var Action = (function () {
    function Action() {
        this.inject = [];
    }
    Action.prototype.ready = function () {
    };

    Action.prototype.execute = function () {
        this.res.json(500, { status: 'error', reason: 'not_implemented_yet' });
    };
    return Action;
})();

module.exports = Action;
//# sourceMappingURL=Action.js.map
