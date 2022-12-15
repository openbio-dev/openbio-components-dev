import { h } from '@stencil/core';
export class NotificationComponent {
    render() {
        return (h("div", { class: `notification notification-${this.notificationType}` },
            h("div", { class: "notification-message" }, this.text)));
    }
    static get is() { return "notification-component"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["notification-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["notification-component.css"]
    }; }
    static get properties() { return {
        "notificationType": {
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
            "attribute": "notification-type",
            "reflect": false
        },
        "text": {
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
            "attribute": "text",
            "reflect": false
        }
    }; }
}
