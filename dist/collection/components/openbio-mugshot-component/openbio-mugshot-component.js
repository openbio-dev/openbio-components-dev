import { h } from '@stencil/core';
import WS from '../../utils/websocket';
import { TranslationUtils } from '../../locales/translation';
export class OpenbioMugshotComponent {
    constructor() {
        this.ws = new WS();
        this.deviceReady = false;
        this.forceLoadComponent = false;
        this.locale = 'pt';
    }
    async listenLocale(newValue) {
        this.setI18nParameters(newValue);
    }
    ;
    async componentWillLoad() {
        this.setI18nParameters(this.locale);
    }
    async setI18nParameters(locale) {
        TranslationUtils.setLocale(locale);
        this.translations = await TranslationUtils.fetchTranslations();
        this.componentContainer.forceUpdate();
    }
    componentDidLoad() {
        this.ws.deviceSocket.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            this.deviceReady = data.deviceStatuses && data.deviceStatuses.face.initialized;
        });
    }
    render() {
        const params = {};
        Object.keys(this.componentContainer.attributes).forEach((index) => {
            params[this.componentContainer.attributes[index].name] = this.componentContainer.attributes[index].value;
        });
        return (h("div", null, this.deviceReady || this.forceLoadComponent ?
            h("openbio-mugshot-details", Object.assign({}, params)) :
            h("div", { class: "center-container", style: { 'padding-bottom': '50px' } },
                h("img", { src: "../assets/general/connection.png" }),
                h("span", null, this.translations.DEVICE_DISCONNECTED),
                h("a", { class: "button is-small action-button", style: { 'margin-top': '20px' }, onClick: () => this.forceLoadComponent = true }, this.translations.CONTINUE_WITHOUT_DEVICE))));
    }
    static get is() { return "openbio-mugshot"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["openbio-mugshot-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["openbio-mugshot-component.css"]
    }; }
    static get properties() { return {
        "locale": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "locale",
            "reflect": false,
            "defaultValue": "'pt'"
        }
    }; }
    static get states() { return {
        "deviceReady": {},
        "forceLoadComponent": {},
        "translations": {}
    }; }
    static get elementRef() { return "componentContainer"; }
    static get watchers() { return [{
            "propName": "locale",
            "methodName": "listenLocale"
        }]; }
}
