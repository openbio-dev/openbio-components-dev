import { h } from '../openbio-components.core.js';

const constants = {
    SERVER_HOST: "localhost:4000",
    WS_HOST: "localhost:5000",
    IPINFO_ADDRESS: "http://ipinfo.io/json?token=61ed945b6baf67",
    anomalyTypes: {
        SIGNATURE_ANOMALY: 0,
        FACE_ANOMALY: 1,
        MODAL_ANOMALY: 2,
        DOCUMENT_ANOMALY: 3
    },
    settingTypes: {
        PERSON_REQUIRED_FIELD: 0,
        MODAL_SETTINGS: 1,
        FACE_SETTINGS: 2,
        SIGNATURE_SETTINGS: 3
    },
    device: {
        AKYSCAM: "AKYSCAM",
        WEBCAM: "WEBCAM",
        IB: "IB",
        MSP: "MSP",
        SECUGEN: "SECUGEN",
        WACOM: "WACOM",
        CANON: "CANON"
    },
    processor: {
        AWPREFACE: "AWPREFACE",
        IDKIT: "IDKIT",
        AK_MATCHER: "AK_MATCHER"
    },
    valueTypes: {
        INTEGER: 0,
        STRING: 1,
        BOOLEAN: 2
    },
    dpiValue: {
        1: 300
    }
};

function format(first, middle, last) {
    return ((first || '') +
        (middle ? ` ${middle}` : '') +
        (last ? ` ${last}` : ''));
}
async function getLocalization() {
    return new Promise(async (resolve, _) => {
        await fetch(constants.IPINFO_ADDRESS)
            .then(res => res.json())
            .then(data => {
            delete data.hostname;
            delete data.org;
            delete data.postal;
            resolve(JSON.stringify(data));
        });
    });
}

export { format as a, constants as b, getLocalization as c };
