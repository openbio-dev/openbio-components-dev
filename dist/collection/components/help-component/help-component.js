import { h } from '@stencil/core';
import { TranslationUtils } from '../../locales/translation';
export class GuideImageComponent {
    constructor() {
        this.isHelpModalActive = false;
        this.locale = 'pt';
    }
    async listenLocale(newValue) {
        this.setI18nParameters(newValue);
    }
    ;
    async componentWillLoad() {
        this.setI18nParameters(this.locale);
    }
    setHelpModalStatus(status) {
        this.isHelpModalActive = status;
    }
    async setI18nParameters(locale) {
        TranslationUtils.setLocale(locale);
        this.translations = await TranslationUtils.fetchTranslations();
        this.componentContainer.forceUpdate();
    }
    componentDidLoad() {
        if (this.helpText) {
            fetch(`file://${this.helpText}`)
                .then(response => response.text())
                .then(text => this.helpText = text);
        }
    }
    render() {
        return (h("div", null,
            this.helpText ?
                h("div", { style: { position: 'relative' } },
                    h("span", { class: `status-item is-pulled-right hover-cursor`, onClick: () => { this.setHelpModalStatus(true); } }, "?"),
                    h("div", { class: `${this.isHelpModalActive ? 'is-active' : ''} modal` },
                        h("div", { class: "modal-background" }),
                        h("div", { class: "modal-card" },
                            h("header", { class: "modal-card-head" },
                                h("p", { class: "modal-card-title" }, this.translations.HELP),
                                h("button", { class: "delete", "aria-label": "close", onClick: () => { this.setHelpModalStatus(false); } })),
                            h("section", { class: "modal-card-body bottom-border-radius-5" },
                                h("span", { innerHTML: this.helpText }))))) : null,
            this.src ?
                h("div", null,
                    h("p", null,
                        h("img", { alt: "custom-guide-image", src: `file://${this.src}` }))) : null));
    }
    static get is() { return "help-component"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["help-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["help-component.css"]
    }; }
    static get properties() { return {
        "src": {
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
            "attribute": "src",
            "reflect": false
        },
        "helpText": {
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
            "attribute": "help-text",
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
        "isHelpModalActive": {},
        "translations": {}
    }; }
    static get elementRef() { return "componentContainer"; }
    static get watchers() { return [{
            "propName": "locale",
            "methodName": "listenLocale"
        }]; }
}
