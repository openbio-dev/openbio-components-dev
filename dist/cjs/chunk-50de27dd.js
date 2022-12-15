'use strict';

const __chunk_6 = require('./chunk-128e8b8e.js');

function format(first, middle, last) {
    return ((first || '') +
        (middle ? ` ${middle}` : '') +
        (last ? ` ${last}` : ''));
}
async function getLocalization() {
    return new Promise(async (resolve, _) => {
        await fetch(__chunk_6.constants.IPINFO_ADDRESS)
            .then(res => res.json())
            .then(data => {
            delete data.hostname;
            delete data.org;
            delete data.postal;
            resolve(JSON.stringify(data));
        });
    });
}

exports.format = format;
exports.getLocalization = getLocalization;
