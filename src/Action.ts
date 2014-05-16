import Server = require('./Server');
import express = require('express');

class Action {

  public server:Server;
  public req:express.Request;
  public res:express.Response;

  constructor() {

  }

  public execute():void {
    this.res.json(500, {status: 'error', reason: 'not_implemented_yet'});
  }

}

export = Action;