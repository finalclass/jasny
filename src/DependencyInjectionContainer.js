/// <reference path="../typings/HashTable.d.ts" />
var BeanDefinition = require('./BeanDefinition');

var DependencyInjectionContainer = (function () {
    function DependencyInjectionContainer() {
        this.beans = {};
        this.unresolvedBeans = {};
        this.isResolveOrdered = false;
    }
    DependencyInjectionContainer.prototype.register = function (name, bean) {
        this.unresolvedBeans[name] = new BeanDefinition(name, bean);
        this.orderResolving();
    };

    DependencyInjectionContainer.prototype.orderResolving = function () {
        var _this = this;
        if (!this.isResolveOrdered) {
            setTimeout(function () {
                _this.isResolveOrdered = false;
                _this.resolve();
            });
        }
    };

    DependencyInjectionContainer.prototype.resolve = function () {
        var _this = this;
        var numLoops = 0;

        do {
            var keys = Object.keys(this.unresolvedBeans);

            keys.forEach(function (beanName) {
                var isResolved = _this.resolveBean(_this.unresolvedBeans[beanName].bean);
                if (isResolved) {
                    _this.beans[beanName] = _this.unresolvedBeans[beanName];
                    delete _this.unresolvedBeans[beanName];
                }
            });

            numLoops += 1;
            if (numLoops === 100) {
                throw new Error('Unresolved dependencies');
            }
        } while(keys.length > 0);
    };

    DependencyInjectionContainer.prototype.resolveBean = function (bean) {
        var injectables = bean.inject || [];

        for (var item = injectables[0]; injectables.length > 0; item = injectables.pop()) {
            if (typeof item === 'string') {
                var varName = item;
                var beanName = item;
            } else {
                var varName = Object.keys(item).pop();
                var beanName = item[varName];
            }

            var beanDefToInject = this.findDefinition(beanName);
            if (!beanDefToInject) {
                return false;
            }

            bean[varName] = beanDefToInject.bean;
        }

        if (bean.ready) {
            bean.ready();
        }

        return true;
    };

    DependencyInjectionContainer.prototype.findDefinition = function (name) {
        return this.beans[name] ? this.beans[name] : this.unresolvedBeans[name];
    };
    return DependencyInjectionContainer;
})();

module.exports = DependencyInjectionContainer;
//# sourceMappingURL=DependencyInjectionContainer.js.map
