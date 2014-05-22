/// <reference path="../typings/HashTable.d.ts" />

import BeanDefinition = require('./BeanDefinition');
import IBean = require('./IBean');

class DependencyInjectionContainer {

  private beans:HashTable<BeanDefinition>;
  private unresolvedBeans:HashTable<BeanDefinition>;

  constructor() {
    this.beans = {};
    this.unresolvedBeans = {};
  }

  public register(name:string, bean:any):void {
    this.unresolvedBeans[name] = new BeanDefinition(name, bean);
    setTimeout(() => this.resolve());
  }

  private resolve():void {
    var numLoops:number = 0;

    do {
      var keys = Object.keys(this.unresolvedBeans);

      keys.forEach((beanName:string) => {
        var isResolved:boolean = this.resolveBean(this.unresolvedBeans[beanName].bean);
        if (isResolved) {
          this.beans[beanName] = this.unresolvedBeans[beanName];
          delete this.unresolvedBeans[beanName];
        }
      });

      numLoops += 1;
      if (numLoops === 100) {
        throw new Error('Unresolved dependencies');
      }
    } while (keys.length > 0);
  }

  public resolveBean(bean:IBean) : boolean {
    var injectables:Object[] = bean.inject || [];
    
    for (var item:any = injectables[0]; injectables.length > 0; item = injectables.pop()) {
      if (typeof item === 'string') {
        var varName:string = item;
        var beanName:string = item;
      } else {
        var varName:string = Object.keys(item).pop();
        var beanName:string = item[varName];
      }

      console.log(varName, beanName);
      var beanDefToInject:BeanDefinition = this.findDefinition(beanName);
      if (!beanDefToInject) {
        return false;
      }

      bean[varName] = beanDefToInject.bean;
    }

    if (bean.ready) {
      bean.ready();
    }

    return true;
  }

  public findDefinition(name:string) : BeanDefinition {
    return this.beans[name] ? this.beans[name] : this.unresolvedBeans[name];
  }

}

export = DependencyInjectionContainer;