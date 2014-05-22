import IBean = require('./IBean');

class BeanDefinition {

  constructor(private _name:string, private _bean:IBean) {

  }

  public get name():string {
    return this._name;
  }

  public get bean():IBean {
    return this._bean;
  }

}

export = BeanDefinition;