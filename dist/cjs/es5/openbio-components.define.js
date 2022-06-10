"use strict";
// OpenbioComponents: Custom Elements Define Library, ES Module/es5 Target
Object.defineProperty(exports, "__esModule", { value: true });
var openbio_components_core_js_1 = require("./openbio-components.core.js");
var openbio_components_components_js_1 = require("./openbio-components.components.js");
function defineCustomElements(win, opts) {
    return openbio_components_core_js_1.defineCustomElement(win, openbio_components_components_js_1.COMPONENTS, opts);
}
exports.defineCustomElements = defineCustomElements;
