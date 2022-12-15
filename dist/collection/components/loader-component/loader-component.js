import { h } from '@stencil/core';
export class LoaderComponent {
    constructor() {
        this.enabled = false;
    }
    listenEnable(newValue) {
        const interval = 2000;
        let timeCount = 0;
        let checkStatusInterval;
        if (newValue) {
            checkStatusInterval = setInterval(() => {
                timeCount = timeCount + interval;
                if (timeCount >= 60000) {
                    this.enabled = false;
                    clearInterval(checkStatusInterval);
                }
            }, interval);
        }
        else {
            timeCount = 0;
            checkStatusInterval = undefined;
        }
    }
    render() {
        return (h("div", { class: "loading", style: { display: this.enabled ? 'inline' : 'none' } },
            h("div", { class: "spinner" })));
    }
    static get is() { return "loader-component"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["loader-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["loader-component.css"]
    }; }
    static get properties() { return {
        "enabled": {
            "type": "boolean",
            "mutable": true,
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
            "attribute": "enabled",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get watchers() { return [{
            "propName": "enabled",
            "methodName": "listenEnable"
        }]; }
}
