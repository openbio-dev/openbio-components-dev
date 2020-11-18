import { h } from '../openbio-components.core.js';

import { a as constants } from './chunk-d31d97be.js';

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

export { format as a, getLocalization as b };
