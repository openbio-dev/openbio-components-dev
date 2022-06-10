import WS from '../../utils/websocket';
import { TranslationUtils } from '../../locales/translation';
export class OpenbioFingerComponent {
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
        this.translations = await TranslationUtils.fetchTranslations();
        this.addCustomLink("https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css");
        this.addCustomLink("https://cdn.jsdelivr.net/npm/@mdi/font@6.6.96/css/materialdesignicons.min.css");
        this.addCustomLink("https://fonts.googleapis.com/css?family=Poppins");
    }
    addCustomLink(url) {
        let element = document.querySelector(`link[href="${url}"]`);
        if (!element) {
            element = document.createElement('link');
            element.setAttribute('rel', 'stylesheet');
            element.setAttribute('href', url);
            document.head.appendChild(element);
        }
    }
    async setI18nParameters(locale) {
        TranslationUtils.setLocale(locale);
        this.translations = await TranslationUtils.fetchTranslations();
        this.componentContainer.forceUpdate();
    }
    componentDidLoad() {
        this.ws.deviceSocket.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            this.deviceReady = data.deviceStatuses && data.deviceStatuses.modal.initialized;
        });
    }
    render() {
        const params = {};
        Object.keys(this.componentContainer.attributes).forEach((index) => {
            params[this.componentContainer.attributes[index].name] = this.componentContainer.attributes[index].value;
        });
        return (h("div", null, this.deviceReady || this.forceLoadComponent ?
            h("openbio-finger-details", Object.assign({}, params)) :
            h("div", { class: "center-container", style: { 'padding-bottom': '50px' } },
                h("div", { class: "flex-center" },
                    h("span", { class: "icon" },
                        h("i", { class: "mdi mdi-connection icon-24", style: { color: "#767676" }, "aria-hidden": "true" }))),
                h("div", { class: "flex-center" },
                    h("span", null, this.translations.DEVICE_DISCONNECTED)),
                h("a", { class: "button is-small action-button", style: { 'margin-top': '20px' }, onClick: () => this.forceLoadComponent = true }, this.translations.CONTINUE_WITHOUT_DEVICE))));
    }
    static get is() { return "openbio-finger"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "componentContainer": {
            "elementRef": true
        },
        "deviceReady": {
            "state": true
        },
        "forceLoadComponent": {
            "state": true
        },
        "locale": {
            "type": String,
            "attr": "locale",
            "mutable": true,
            "watchCallbacks": ["listenLocale"]
        },
        "translations": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:openbio-finger:**/"; }
}
