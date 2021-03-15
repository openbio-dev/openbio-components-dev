import { notify } from '../../utils/notifier';
const BASE64_IMAGE = 'data:image/charset=UTF-8;png;base64,';
const DEFAULT_IMAGE = './assets/general/no-image.png';
export class OpenbioFingerImageComponent {
    constructor() {
        this.isModalShown = false;
    }
    async componentDidLoad() {
    }
    showModal() {
        this.isModalShown = true;
    }
    hideModal() {
        this.isModalShown = false;
    }
    onInputChange(files) {
        if (files.length > 0) {
            if (files[0].type !== 'image/png') {
                notify(this.parentComponentContext.componentContainer, "error", "Formato do arquivo inválido. Apenas imagens no formato png são aceitas");
                return;
            }
            const file = files[0];
            const image = new Image();
            const url = window.URL.createObjectURL(file);
            image.onload = async () => {
                this.uploadFingerImageCallback(this.parentComponentContext, this.fingerIndex, files[0], { height: image.height, width: image.width });
                window.URL.revokeObjectURL(url);
            };
            image.src = url;
        }
    }
    render() {
        return (h("div", { class: "column is-narrow" },
            h("div", { class: "finger-name" }, this.fingerName),
            h("div", { class: "status-item-line" },
                h("li", { class: `status-item status${this.finger ? this.finger.nfiqScore : 0}` }, this.finger ? this.finger.nfiqScore : 0)),
            this.finger ? h("div", { class: "button-hover" },
                h("a", { class: "button is-small is-pulled-left action-button finger-button edit-button", onClick: () => this.editFingerCallback(this.parentComponentContext, this.finger) }, "EDITAR"),
                h("a", { class: "button is-small is-pulled-left action-button finger-button", onClick: () => this.showModal() }, "VISUALIZAR")) : null,
            h("div", { class: "is-light finger-box" },
                h("img", { src: this.finger && (this.finger.minutiateData || this.finger.data) ? `${BASE64_IMAGE}${this.finger.minutiateData || this.finger.data}` : DEFAULT_IMAGE })),
            h("div", { class: "anomaly-title" }, this.finger ? this.finger.anomaly : ""),
            h("div", { class: `modal ${this.isModalShown ? "show-modal" : ""}` },
                h("span", { class: "close", onClick: () => this.hideModal() }, "\u00D7"),
                h("img", { class: "modal-content", src: this.finger && (this.finger.minutiateData || this.finger.data) ? `${BASE64_IMAGE}${this.finger.minutiateData || this.finger.data}` : DEFAULT_IMAGE })),
            h("div", { id: "capture-file", class: "file is-small is-info mt-10" },
                h("label", { class: "file-label" },
                    h("input", { onChange: ($event) => this.onInputChange($event.target.files), class: "file-input", type: "file", name: "resume", accept: ".png" }),
                    h("span", { class: "file-cta" },
                        h("span", { class: "file-label" }, "Carregar arquivo"))))));
    }
    static get is() { return "openbio-finger-image-component"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "captureInput": {
            "state": true
        },
        "editFingerCallback": {
            "type": "Any",
            "attr": "edit-finger-callback"
        },
        "finger": {
            "type": "Any",
            "attr": "finger"
        },
        "fingerIndex": {
            "type": Number,
            "attr": "finger-index"
        },
        "fingerName": {
            "type": String,
            "attr": "finger-name"
        },
        "isModalShown": {
            "state": true
        },
        "parentComponentContext": {
            "type": "Any",
            "attr": "parent-component-context"
        },
        "uploadFingerImageCallback": {
            "type": "Any",
            "attr": "upload-finger-image-callback"
        }
    }; }
    static get style() { return "/**style-placeholder:openbio-finger-image-component:**/"; }
}
