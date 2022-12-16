var session = {
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
export { setFingers as a, setSignature as b, setFace as s };
