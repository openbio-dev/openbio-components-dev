import { r as registerInstance, h } from './chunk-654cd872.js';
import './chunk-df3525b2.js';
import { f as format } from './chunk-27543d6d.js';

class MyComponent {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    getText() {
        return format(this.first, this.middle, this.last);
    }
    render() {
        return h("div", null, "Hello, World! I'm ", this.getText());
    }
    static get style() { return ""; }
}

export { MyComponent as my_component };
