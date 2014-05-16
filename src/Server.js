var Config = require('./Config');
var ActionDefinition = require('./ActionDefinition');
var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

var Server = (function () {
    function Server() {
        this.actionDefinitions = [];
        this.app = express();
        this.app.use(bodyParser());
        this.config = new Config();
    }
    Server.prototype.listen = function () {
        if (this.config.allowCORSFromAll) {
            this.allowCORSFromAll();
        }
        if (this.config.actionsDir) {
            this.initAllActions();
        }
        if (this.config.publicDir) {
            this.enableStaticFileAccess();
        }

        this.app.listen(this.config.port);
    };

    Server.prototype.addAction = function (method, path, actionSubDir, actionName) {
        this.actionDefinitions.push(new ActionDefinition(method, path, actionSubDir, actionName));
    };

    Server.prototype.initAllActions = function () {
        var _this = this;
        this.actionDefinitions.forEach(function (def) {
            var klass = require(path.join(_this.config.actionsDir, def.actionSubDir, def.className));

            _this.app[def.method](def.urlPath, function (req, res) {
                var action = new klass();
                action.server = _this;
                action.req = req;
                action.res = res;
                action.execute();
            });
        });
    };

    Server.prototype.enableStaticFileAccess = function () {
        this.app.use(express.static(this.config.publicDir));
    };

    Server.prototype.allowCORSFromAll = function () {
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
    };
    return Server;
})();

module.exports = Server;
//# sourceMappingURL=Server.js.map
