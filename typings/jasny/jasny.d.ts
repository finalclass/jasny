/// <reference path="../express/express.d.ts" />

declare module "jasny" {
  import express = require('express');
  interface IBean {
    inject?: Object[];
    ready?: Function;
  }
  class BeanDefinition {
    private _name;
    private _bean;
    constructor(_name: string, _bean: IBean);
    public name : string;
    public bean : IBean;
  }
  class DependencyInjectionContainer {
    private beans;
    private unresolvedBeans;
    constructor();
    public register(name: string, bean: any): void;
    private resolve();
    public resolveBean(beanDefinition);
    public findDefinition(name: string): BeanDefinition;
  }
  class Route {
    private _Action;
    private _method;
    private _urlPath;
    constructor(_route: string, _Action: new() => Action);
    public method : string;
    public urlPath : string;
    public Action : new() => Action;
  }
  class Config {
    public publicDir: string;
    public port: number;
    public allowCORSFromAll: boolean;
    constructor();
  }
  class Server {
    public config: Config;
    private routes;
    private app;
    private _di;
    constructor();
    public listen(): void;
    public addRoute(route: string, Action: new() => Action): void;
    public di : DependencyInjectionContainer;
    private initAllRoutes();
    private enableStaticFileAccess();
    private allowCORSFromAll();
  }
  export class Action implements IBean {
    public req: express.Request;
    public res: express.Response;
    constructor();
    public execute(): void;
  }
}