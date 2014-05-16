/// <reference path="typings/tsd.d.ts" />
var path = require('path');

var ActionDefinition = (function () {
    function ActionDefinition(_method, _urlPath, _actionSubDir, _className) {
        this._method = _method;
        this._urlPath = _urlPath;
        this._actionSubDir = _actionSubDir;
        this._className = _className;
        this._actionSubDir = path.basename(this._actionSubDir);
        this._className = path.basename(this._className);
    }
    Object.defineProperty(ActionDefinition.prototype, "method", {
        get: function () {
            return this._method;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(ActionDefinition.prototype, "urlPath", {
        get: function () {
            return this._urlPath;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(ActionDefinition.prototype, "actionSubDir", {
        get: function () {
            return this._actionSubDir;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(ActionDefinition.prototype, "className", {
        get: function () {
            return this._className;
        },
        enumerable: true,
        configurable: true
    });
    return ActionDefinition;
})();

module.exports = ActionDefinition;
//# sourceMappingURL=ActionDefinition.js.map
