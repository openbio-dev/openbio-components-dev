import { h } from '../openbio-components.core.js';

import './chunk-d17f9802.js';
import { a as format } from './chunk-d8965f19.js';

class MyComponent {
    getText() {
        return format(this.first, this.middle, this.last);
    }
    render() {
        return h("div", null,
            "Hello, World! I'm ",
            this.getText());
    }
    static get is() { return "my-component"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "first": {
            "type": String,
            "attr": "first"
        },
        "last": {
            "type": String,
            "attr": "last"
        },
        "middle": {
            "type": String,
            "attr": "middle"
        }
    }; }
    static get style() { return ""; }
}

export { MyComponent };
