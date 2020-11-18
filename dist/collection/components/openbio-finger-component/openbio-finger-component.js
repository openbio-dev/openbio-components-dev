import WS from '../../utils/websocket';
export class OpenbioFingerComponent {
    constructor() {
        this.ws = new WS();
        this.deviceReady = false;
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
        return (h("div", null, this.deviceReady ?
            h("openbio-finger-details", Object.assign({}, params)) :
            h("div", { class: "center-container" },
                h("img", { src: "../assets/general/connection.png" }),
                h("span", null, "Dispositivo desconectado"))));
    }
    static get is() { return "openbio-finger"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "componentContainer": {
            "elementRef": true
        },
        "deviceReady": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:openbio-finger:**/"; }
}
