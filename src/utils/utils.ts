import constants from "./constants";

export function format(first: string, middle: string, last: string): string {
  return (
    (first || '') +
    (middle ? ` ${middle}` : '') +
    (last ? ` ${last}` : '')
  );
}

export async function getLocalization() {
  return new Promise(async (resolve, _) => {
    await fetch(constants.IPINFO_ADDRESS)
    .then(res => res.json())
    .then(data => {
      delete data.hostname;
      delete data.org;
      delete data.postal;
      resolve(JSON.stringify(data)) });
  });
};