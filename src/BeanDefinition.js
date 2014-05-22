var BeanDefinition = (function () {
    function BeanDefinition(_name, _bean) {
        this._name = _name;
        this._bean = _bean;
    }
    Object.defineProperty(BeanDefinition.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(BeanDefinition.prototype, "bean", {
        get: function () {
            return this._bean;
        },
        enumerable: true,
        configurable: true
    });
    return BeanDefinition;
})();

module.exports = BeanDefinition;
//# sourceMappingURL=BeanDefinition.js.map
