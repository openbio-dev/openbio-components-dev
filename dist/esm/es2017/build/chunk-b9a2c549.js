import { h } from '../openbio-components.core.js';

const session = {
    person: {
        id: 0
    },
    document: {},
    signature: {},
    face: {},
    modal: {
        fingers: []
    },
    mugshot: []
};
function setFingers(data) {
    return session.modal.fingers = data;
}
function setFace(data) {
    return session.face = data;
}
function setSignature(data) {
    return session.signature = data;
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

export { setFace as a, createCommonjsModule as b, unwrapExports as c, commonjsGlobal as d, setFingers as e, setSignature as f };
