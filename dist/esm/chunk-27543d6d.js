import { c as constants } from './chunk-df3525b2.js';

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

export { format as f, getLocalization as g };
