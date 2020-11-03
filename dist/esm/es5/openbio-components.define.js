
// OpenbioComponents: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './openbio-components.core.js';
import { COMPONENTS } from './openbio-components.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, COMPONENTS, opts);
}
