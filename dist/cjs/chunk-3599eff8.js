'use strict';

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

exports.setFace = setFace;
exports.setFingers = setFingers;
exports.setSignature = setSignature;
