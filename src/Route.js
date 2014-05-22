/// <reference path="../typings/tsd.d.ts" />
var Route = (function () {
    function Route(_route, _Action) {
        this._Action = _Action;
        var parts = _route.split(' ');
        this._method = parts[0].toLowerCase();
        this._urlPath = parts[1];
    }
    Object.defineProperty(Route.prototype, "method", {
        get: function () {
            return this._method;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Route.prototype, "urlPath", {
        get: function () {
            return this._urlPath;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Route.prototype, "Action", {
        get: function () {
            return this._Action;
        },
        enumerable: true,
        configurable: true
    });
    return Route;
})();

module.exports = Route;
//# sourceMappingURL=Route.js.map
