/// <reference path="typings/tsd.d.ts" />

import path = require('path');

class ActionDefinition {

  constructor(
    private _method:string,
    private _urlPath:string,
    private _actionSubDir:string,
    private _className:string
  ) {
    this._actionSubDir = path.basename(this._actionSubDir);
    this._className = path.basename(this._className);
  }

  public get method() : string {
    return this._method;
  }

  public get urlPath() : string {
    return this._urlPath;
  }

  public get actionSubDir() : string {
    return this._actionSubDir;
  }

  public get className() : string {
    return this._className;
  }

}

export = ActionDefinition;