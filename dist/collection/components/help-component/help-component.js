export class GuideImageComponent {
    constructor() {
        this.isHelpModalActive = false;
    }
    setHelpModalStatus(status) {
        this.isHelpModalActive = status;
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
                                h("p", { class: "modal-card-title" }, "Ajuda"),
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
    static get properties() { return {
        "helpText": {
            "type": String,
            "attr": "help-text",
            "mutable": true
        },
        "isHelpModalActive": {
            "state": true
        },
        "src": {
            "type": String,
            "attr": "src"
        }
    }; }
    static get style() { return "/**style-placeholder:help-component:**/"; }
}
