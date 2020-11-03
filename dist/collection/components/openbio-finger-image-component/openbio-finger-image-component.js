const BASE64_IMAGE = 'data:image/charset=UTF-8;png;base64,';
const DEFAULT_IMAGE = './assets/general/no-image.png';
export class OpenbioFingerImageComponent {
    constructor() {
        this.isModalShown = false;
    }
    showModal() {
        this.isModalShown = true;
    }
    hideModal() {
        this.isModalShown = false;
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
            h("div", { class: "modal " + (this.isModalShown ? "show-modal" : "") },
                h("span", { class: "close", onClick: () => this.hideModal() }, "\u00D7"),
                h("img", { class: "modal-content", src: this.finger && (this.finger.minutiateData || this.finger.data) ? `${BASE64_IMAGE}${this.finger.minutiateData || this.finger.data}` : DEFAULT_IMAGE }))));
    }
    static get is() { return "openbio-finger-image-component"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "editFingerCallback": {
            "type": "Any",
            "attr": "edit-finger-callback"
        },
        "finger": {
            "type": "Any",
            "attr": "finger"
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
        }
    }; }
    static get style() { return "/**style-placeholder:openbio-finger-image-component:**/"; }
}
