import { r as registerInstance, h } from './chunk-654cd872.js';
import './chunk-df3525b2.js';
import { f as format } from './chunk-27543d6d.js';
var MyComponent = /** @class */ (function () {
    function MyComponent(hostRef) {
        registerInstance(this, hostRef);
    }
    MyComponent.prototype.getText = function () {
        return format(this.first, this.middle, this.last);
    };
    MyComponent.prototype.render = function () {
        return h("div", null, "Hello, World! I'm ", this.getText());
    };
    Object.defineProperty(MyComponent, "style", {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    return MyComponent;
}());
export { MyComponent as my_component };
