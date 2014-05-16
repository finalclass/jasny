import Config = require('./Config');
import ActionDefinition = require('./ActionDefinition');
import express = require('express');
import path = require('path');
import Action = require('./Action');
var bodyParser = require('body-parser');

class Server {

  public config:Config;
  private actionDefinitions:ActionDefinition[];
  private app:express.Application;

  constructor() {
    this.actionDefinitions = [];
    this.app = express();
    this.app.use(bodyParser());
    this.config = new Config();
  }

  public listen():void {
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
  }

  public addAction(method:string, path:string, actionSubDir:string, actionName:string):void {
    this.actionDefinitions.push(new ActionDefinition(method, path, actionSubDir, actionName));
  }

  private initAllActions() : void {
    this.actionDefinitions.forEach((def:ActionDefinition) => {
      var klass:new()=>Action = <new()=>Action>require(path.join(this.config.actionsDir, def.actionSubDir, def.className));

      this.app[def.method](def.urlPath, (req:express.Request, res:express.Response):void => {
        var action:Action = new klass();
        action.server = this;
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