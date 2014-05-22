jasny
=====

Jasny http web framework for nodejs written and for use with TypeScript.

Jasny is a TypeScript framework for making websites. It's best when you use it with your TypeScript projects although you don't have to use TypeScript in order to work with it.


## Example main file (index.ts):

```ts
/// <reference path="typings/jasny/jasny.d.ts" />
/// <reference path="typings/node/node.d.ts" />

import jasny = require('jasny');
import path = require('path');
import Config = require('./Config');

var server:jasny.Server = new jasny.Server();

server.config.publicDir = path.resolve(__dirname, '..', 'public');
server.config.port = 4601;
server.config.allowCORSFromAll = false;

server.di.register('config', new Config());

server.addRoute('GET /file/:fileName', require('./actions/file/GetFile'));

server.listen();
console.log('Gaad-TabUI listening on port '  + server.config.port);
export = server;

```

Let's examine the code above line by line.

```ts
/// <reference path="typings/jasny/jasny.d.ts" />
```
In this line we are making a reference to declaration file. This file is shipped to you with the module. You can create a symbolic link to point to node_modules/jasny/typings/jasny folder if you want to have it in your typeings directory.

```ts
var server:jasny.Server = new jasny.Server();
```

We are creating new instance of the Server class. This is the facade for our application.

```ts
server.config.publicDir = path.resolve(__dirname, '..', 'public');
```
If we set the publicDir property on the config then the server will start serving static files. If we don't want to serve statics then leave it blank.

```ts
server.config.port = 4601;
```
Port to listen to.

```ts
server.config.allowCORSFromAll = false;
```
If we want to allow Cross Origin Resource Sharing from every server then we can just set this variable to true.

```ts
server.di.register('config', new Config());
```
Here we are registering the config object into dependency injection container.

```ts
server.addRoute('GET /file/:fileName', require('./actions/file/GetFile'));
```
We are adding the route class. Every Route action has to be a class that inherits from jasny.Action.
You can use dependency injection in the Actions

```ts
server.listen();
```
Finally we start to listen.

## Example action class (GetFile.ts):

```ts
/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/jasny/jasny.d.ts" />

import jasny = require('jasny');
import fs = require('fs');
import Config = require('../../Config');

class GetFile extends jasny.Action {

  //We declare what we want to inject.
  //If the variable name is different then the registered bean name (for example: 'cfg') then
  //we should define it like that:
  //public inject:any[] = [{cfg: 'config'}];
  //otherwise:
  public inject:any[] = ['config'];

  private config:Config;

  constructor() {
    super();
  }

  private ready() : void {
    //the config variable is ready now
  }

  public execute():void {
    fs.readFile('file.txt', (buffer) => {
      this.res.send(buffer.toString());
    });
  }

}

export = GetFile;
```
