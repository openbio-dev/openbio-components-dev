import { IOMAMatcherImagelessBody, IOMAMatcherBody } from './interfaces';
declare function register(data: IOMAMatcherBody, token: string): Promise<any>;
declare function verify(data: IOMAMatcherBody, token: string): Promise<any>;
declare function checkLiveness(data: FormData, token: string): Promise<any>;
declare function contains(data: IOMAMatcherImagelessBody, token: string): Promise<any>;
declare function update(data: IOMAMatcherBody, token: string): Promise<any>;
declare const _default: {
    checkLiveness: typeof checkLiveness;
    contains: typeof contains;
    register: typeof register;
    verify: typeof verify;
    update: typeof update;
};
export default _default;
