/// <reference path="../typings/tsd.d.ts" />
var Config = require('./Config');
var Route = require('./Route');
var express = require('express');

var DependencyInjectionContainer = require('./DependencyInjectionContainer');
var bodyParser = require('body-parser');

var Server = (function () {
    function Server() {
        this.routes = [];
        this.app = express();
        this.app.use(bodyParser());
        this.config = new Config();
        this._di = new DependencyInjectionContainer();
    }
    Server.prototype.listen = function () {
        if (this.config.allowCORSFromAll) {
            this.allowCORSFromAll();
        }

        if (this.config.publicDir) {
            this.enableStaticFileAccess();
        }

        this.initAllRoutes();
        this.app.listen(this.config.port);
    };

    Server.prototype.addRoute = function (route, Action) {
        this.routes.push(new Route(route, Action));
    };

    Object.defineProperty(Server.prototype, "di", {
        get: function () {
            return this._di;
        },
        enumerable: true,
        configurable: true
    });

    Server.prototype.initAllRoutes = function () {
        var _this = this;
        this.routes.forEach(function (route) {
            _this.app[route.method](route.urlPath, function (req, res) {
                var action = new route.Action();
                if (!_this.di.resolveBean(action)) {
                    throw new Error('Unresolved dependencies while injecting into action');
                }
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
