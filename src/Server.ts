/// <reference path="../typings/tsd.d.ts" />

import Config = require('./Config');
import Route = require('./Route');
import express = require('express');
import path = require('path');
import Action = require('./Action');
import DependencyInjectionContainer = require('./DependencyInjectionContainer');
var bodyParser = require('body-parser');

class Server {

  public config:Config;
  private routes:Route[];
  private app:express.Application;
  private _di:DependencyInjectionContainer

  constructor() {
    this.routes = [];
    this.app = express();
    this.app.use(bodyParser());
    this.config = new Config();
    this._di = new DependencyInjectionContainer();
  }

  public listen():void {
    if (this.config.allowCORSFromAll) {
      this.allowCORSFromAll();
    }

    if (this.config.publicDir) {
      this.enableStaticFileAccess();
    }

    this.initAllRoutes();
    this.app.listen(this.config.port);
  }

  public addRoute(route:string, Action:new()=>Action) {
    this.routes.push(new Route(route, Action));
  }

  public get di() : DependencyInjectionContainer {
    return this._di;
  }

  private initAllRoutes() : void {
    this.routes.forEach((route:Route) => {
      this.app[route.method](route.urlPath, (req:express.Request, res:express.Response):void => {
        var action:Action = new route.Action();
        if (!this.di.resolveBean(action)) {
          throw new Error('Unresolved dependencies while injecting into action');
        }
        action.req = req;
        action.res = res;
        action.execute();
      });
    });
  }

  private enableStaticFileAccess() : void {
    this.app.use(express.static(this.config.publicDir));
  }

  private allowCORSFromAll() : void {
    this.app.use(function (req:express.Request, res:express.Response, next:(err?:Error) => void) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });
  }

}

export = Server;