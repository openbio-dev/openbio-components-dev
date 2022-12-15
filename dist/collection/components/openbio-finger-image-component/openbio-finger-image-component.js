import { h } from '@stencil/core';
import { notify } from '../../utils/notifier';
import { TranslationUtils } from '../../locales/translation';
const BASE64_IMAGE = 'data:image/charset=UTF-8;png;base64,';
const DEFAULT_IMAGE = './assets/general/no-image.png';
export class OpenbioFingerImageComponent {
    constructor() {
        this.isModalShown = false;
        this.locale = 'pt';
    }
    async listenLocale(newValue) {
        TranslationUtils.setLocale(newValue);
        this.translations = await TranslationUtils.fetchTranslations();
        this.componentContainer.forceUpdate();
    }
    ;
    async componentWillLoad() {
        this.translations = await TranslationUtils.fetchTranslations();
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
                notify(this.parentComponentContext.componentContainer, "error", TranslationUtils.concatTranslate('FILE_FORMAT_NOT_ACCEPTED_DESC', ['png']));
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
                h("a", { class: "button is-small is-pulled-left action-button finger-button edit-button", onClick: () => this.editFingerCallback(this.parentComponentContext, this.finger) }, this.translations.EDIT),
                h("a", { class: "button is-small is-pulled-left action-button finger-button", onClick: () => this.showModal() }, this.translations.VIEW)) : null,
            h("div", { class: "is-light finger-box" },
                h("img", { src: this.finger && (this.finger.minutiateData || this.finger.data) ? `${BASE64_IMAGE}${this.finger.minutiateData || this.finger.data}` : DEFAULT_IMAGE })),
            h("div", { class: "anomaly-title" }, this.finger ? this.finger.anomaly : ""),
            h("div", { class: `modal ${this.isModalShown ? "show-modal" : ""}` },
                h("span", { class: "close", onClick: () => this.hideModal() }, "\u00D7"),
                h("img", { class: "modal-content", src: this.finger && (this.finger.minutiateData || this.finger.data) ? `${BASE64_IMAGE}${this.finger.minutiateData || this.finger.data}` : DEFAULT_IMAGE })),
            this.allowUpload ?
                h("div", { id: "capture-file", class: "file is-small is-info mt-10" },
                    h("label", { class: "file-label" },
                        h("input", { onChange: ($event) => this.onInputChange($event.target.files), class: "file-input", type: "file", name: "resume", accept: ".png" }),
                        h("span", { class: "file-cta" },
                            h("span", { class: "file-label" }, this.translations.LOAD_FILE)))) : null));
    }
    static get is() { return "openbio-finger-image-component"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["openbio-finger-image-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["openbio-finger-image-component.css"]
    }; }
    static get properties() { return {
        "finger": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "finger",
            "reflect": false
        },
        "fingerName": {
            "type": "string",
            "mutable": false,
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
            "attribute": "finger-name",
            "reflect": false
        },
        "fingerIndex": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "finger-index",
            "reflect": false
        },
        "editFingerCallback": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "edit-finger-callback",
            "reflect": false
        },
        "parentComponentContext": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "parent-component-context",
            "reflect": false
        },
        "uploadFingerImageCallback": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "upload-finger-image-callback",
            "reflect": false
        },
        "allowUpload": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "allow-upload",
            "reflect": false
        },
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
        "isModalShown": {},
        "captureInput": {},
        "translations": {}
    }; }
    static get elementRef() { return "componentContainer"; }
    static get watchers() { return [{
            "propName": "locale",
            "methodName": "listenLocale"
        }]; }
}
