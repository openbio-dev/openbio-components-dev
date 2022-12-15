'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-5ff55b14.js');
require('./chunk-128e8b8e.js');
const __chunk_7 = require('./chunk-50de27dd.js');

class MyComponent {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
    }
    getText() {
        return __chunk_7.format(this.first, this.middle, this.last);
    }
    render() {
        return __chunk_1.h("div", null, "Hello, World! I'm ", this.getText());
    }
    static get style() { return ""; }
}

exports.my_component = MyComponent;
