import WS from '../../utils/websocket';
export class OpenbioSignatureComponent {
    constructor() {
        this.ws = new WS();
    }
    render() {
        const params = {};
        Object.keys(this.componentContainer.attributes).forEach((index) => {
            params[this.componentContainer.attributes[index].name] = this.componentContainer.attributes[index].value;
        });
        return (h("div", null,
            h("openbio-scanner-details", Object.assign({}, params))));
    }
    static get is() { return "openbio-scanner"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "componentContainer": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:openbio-scanner:**/"; }
}
