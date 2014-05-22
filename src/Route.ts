/// <reference path="../typings/tsd.d.ts" />

import path = require('path');
import Action = require('./Action');

class Route {

  private _method:string;
  private _urlPath:string;

  constructor(_route:string, private _Action:new()=>Action) {
    var parts:string[] = _route.split(' ');
    this._method = parts[0].toLowerCase();
    this._urlPath = parts[1];
  }

  public get method() : string {
    return this._method;
  }

  public get urlPath() : string {
    return this._urlPath;
  }

  public get Action() : new()=>Action {
    return this._Action
  }

}

export = Route;