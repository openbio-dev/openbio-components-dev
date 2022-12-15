import { h } from '@stencil/core';
import { TranslationUtils } from '../../locales/translation';
const VALIDATION_ICONS = {
    background: './assets/general/bkgd.png',
    brightness: './assets/general/brgt.png',
    centerlineLocationRatio: './assets/general/frmw.png',
    eyeAxisAngle: './assets/general/angle.png',
    eyeAxisLocationRatio: './assets/general/up_down.png',
    eyeSeparation: './assets/general/eyes.png',
    glasses: './assets/general/glss.png',
    poseAngleYaw: './assets/general/left_right.png',
    saturation: './assets/general/sat.png',
    sharpness: './assets/general/shpnss.png',
    smile: './assets/general/mouth.png',
    openedEyes: './assets/general/openedEyes.png',
};
const COLORS = {
    success: "#00C851",
    danger: "#CC0000"
};
export class OpenbioFaceValidationBoxComponent {
    constructor() {
        this.locale = 'pt';
    }
    async listenLocale(newValue) {
        this.setI18nParameters(newValue);
    }
    ;
    async componentWillLoad() {
        this.setI18nParameters(this.locale);
    }
    async setI18nParameters(locale) {
        TranslationUtils.setLocale(locale);
        this.translations = await TranslationUtils.fetchTranslations();
        this.componentContainer.forceUpdate();
    }
    getStatusMessage() {
        let message = "";
        switch (this.type) {
            case "background":
                message = this.status === 1 ? this.translations.OK.toUpperCase() : this.translations.BACKGROUND_POLLUTED;
                break;
            case "brightness":
                message = this.status === "OK" ? this.translations.OK.toUpperCase() : this.translations.IMAGE_TOO_LIGHT;
                break;
            case "centerlineLocationRatio":
                message = this.status === "OK" ? this.translations.OK.toUpperCase() : status === "Fail Low" ? this.translations.MOVE_HEAD_LEFT : this.translations.MOVE_HEAD_RIGHT;
                break;
            case "eyeAxisAngle":
                message = this.status === "OK" ? this.translations.OK.toUpperCase() : this.status === "Fail Low" ? this.translations.TURN_HEAD_COUNTERCLOCKWISE : this.translations.TURN_HEAD_CLOCKWISE;
                break;
            case "eyeAxisLocationRatio":
                message = this.status === "OK" ? this.translations.OK.toUpperCase() : this.status === "Fail Low" ? this.translations.MOVE_HEAD_UP : this.translations.MOVE_HEAD_DOWN;
                break;
            case "eyeSeparation":
                message = this.status === "OK" ? this.translations.OK.toUpperCase() : this.translations.GET_CLOSER_TO_CAMERA;
                break;
            case "glasses":
                message = this.status === "OK" ? this.translations.OK.toUpperCase() : this.translations.SUN_GLASSES_OR_EYES_COVERED;
                break;
            case "poseAngleYaw":
                message = this.status === "OK" ? this.translations.OK.toUpperCase() : this.status === "Fail Low" ? this.translations.TURN_FACE_LEFT : this.translations.TURN_FACE_RIGHT;
                break;
            case "saturation":
                message = this.status === "OK" ? this.translations.OK.toUpperCase() : this.translations.SATURATION_NOT_ADEQUATE;
                break;
            case "sharpness":
                message = this.status === "OK" ? this.translations.OK.toUpperCase() : this.translations.PHOTO_NOT_CLEAR;
                break;
            case "smile":
                message = this.status === "OK" ? this.translations.OK.toUpperCase() : this.translations.OPEN_MOUTH_OR_SMILING;
                break;
            case "openedEyes":
                message = this.status === true ? this.translations.OK.toUpperCase() : this.translations.VERIFY_EYE_OPENING;
                break;
        }
        return message;
    }
    getClasses() {
        let direction = this.leftIcon ? "left" : "right";
        let status = this.status === "OK" || this.status === 1 || this.status === true ? "success" : "danger";
        return `${direction}-box ${direction}-box-border-${status} ${this.detached && direction === "left" ? "width-detached" : "width"}`;
    }
    render() {
        if (this.leftIcon) {
            return (h("div", { class: "columns has-text-centered" },
                h("img", { class: "is-inline-block validation-icons", src: VALIDATION_ICONS[this.type], style: { background: this.status === true || this.status === "OK" || this.status === 1 ? COLORS.success : COLORS.danger, position: 'absolute' }, title: this.typeTitle }),
                h("div", { class: this.getClasses() },
                    h("strong", null, this.typeTitle),
                    h("br", null),
                    h("span", null, this.getStatusMessage()))));
        }
        return (h("div", { class: "columns has-text-centered", style: { position: 'relative' } },
            h("div", { class: this.getClasses() },
                h("strong", null, this.typeTitle),
                h("br", null),
                h("span", null, this.getStatusMessage())),
            h("img", { class: "is-inline-block validation-icons", src: VALIDATION_ICONS[this.type], style: { background: this.status === true || this.status === "OK" || this.status === 1 ? COLORS.success : COLORS.danger, position: 'absolute', right: '-7px' }, title: this.typeTitle })));
    }
    static get is() { return "openbio-face-validation-box-component"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["openbio-face-validation-box-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["openbio-face-validation-box-component.css"]
    }; }
    static get properties() { return {
        "leftIcon": {
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
            "attribute": "left-icon",
            "reflect": false
        },
        "status": {
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
            "attribute": "status",
            "reflect": false
        },
        "type": {
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
            "attribute": "type",
            "reflect": false
        },
        "typeTitle": {
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
            "attribute": "type-title",
            "reflect": false
        },
        "detached": {
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
            "attribute": "detached",
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
        "statusMessage": {},
        "translations": {}
    }; }
    static get elementRef() { return "componentContainer"; }
    static get watchers() { return [{
            "propName": "locale",
            "methodName": "listenLocale"
        }]; }
}
