import { notify } from '../../utils/notifier';
import WS from '../../utils/websocket';
import { saveSignatureFile } from './api';
export class OpenbioSignatureComponent {
    constructor() {
        this.ws = new WS();
        this.deviceReady = false;
        this.forceLoadComponent = false;
    }
    componentDidLoad() {
        this.ws.deviceSocket.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            this.deviceReady = data.deviceStatuses && data.deviceStatuses.signature.initialized;
        });
        this.captureInput.onchange = () => {
            if (this.captureInput.files.length > 0) {
                if (this.captureInput.files[0].type !== 'image/png') {
                    notify(this.componentContainer, "error", "Formato do arquivo inválido. Apenas imagens no formato png são aceitas");
                    this.captureInput.files = undefined;
                    this.captureInput.value = '';
                    return;
                }
                const image = new Image();
                const url = window.URL.createObjectURL(this.captureInput.files[0]);
                image.onload = async () => {
                    try {
                        await saveSignatureFile({
                            personId: 34,
                            signature: {},
                        }, this.captureInput.files[0]);
                    }
                    catch (e) {
                        console.log(e);
                    }
                    window.URL.revokeObjectURL(url);
                };
                image.src = url;
            }
        };
    }
    render() {
        const params = {};
        Object.keys(this.componentContainer.attributes).forEach((index) => {
            params[this.componentContainer.attributes[index].name] = this.componentContainer.attributes[index].value;
        });
        return (h("div", null, this.deviceReady || this.forceLoadComponent ?
            h("openbio-signature-details", Object.assign({}, params)) :
            h("div", { class: "center-container" },
                h("img", { src: "../assets/general/connection.png" }),
                h("span", null, "Dispositivo desconectado"),
                h("a", { class: "button is-small action-button", style: { 'margin-top': '20px' }, onClick: () => this.forceLoadComponent = true }, "Continuar sem dispositivo"))));
    }
    static get is() { return "openbio-signature"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "captureInput": {
            "state": true
        },
        "componentContainer": {
            "elementRef": true
        },
        "deviceReady": {
            "state": true
        },
        "forceLoadComponent": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:openbio-signature:**/"; }
}
