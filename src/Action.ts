/// <reference path="../typings/tsd.d.ts" />

import express = require('express');

class Action {

  public inject:Object[] = [];

  public req:express.Request;
  public res:express.Response;

  constructor() {

  }

  public ready():void {

  }

  public execute():void {
    this.res.json(500, {status: 'error', reason: 'not_implemented_yet'});
  }

}

export = Action;