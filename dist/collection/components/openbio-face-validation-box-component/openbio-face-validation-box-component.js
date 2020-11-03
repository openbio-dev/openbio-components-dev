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
};
const COLORS = {
    success: "#00C851",
    danger: "#CC0000"
};
export class OpenbioFaceValidationBoxComponent {
    getStatusMessage() {
        let message = "";
        switch (this.type) {
            case "background":
                message = this.status === 1 ? "OK" : "O fundo está poluído";
                break;
            case "brightness":
                message = this.status === "OK" ? "OK" : "A imagem está muito clara";
                break;
            case "centerlineLocationRatio":
                message = this.status === "OK" ? "OK" : status === "Fail Low" ? "Mova a cabeça para esquerda" : "Mova a cabeça para direita";
                break;
            case "eyeAxisAngle":
                message = this.status === "OK" ? "OK" : this.status === "Fail Low" ? "Gire a cabeça sentido anti-horário" : "Gire a cabeça sentido horário";
                break;
            case "eyeAxisLocationRatio":
                message = this.status === "OK" ? "OK" : this.status === "Fail Low" ? "Mova a cabeça para cima" : "Mova a cabeça para baixo";
                break;
            case "eyeSeparation":
                message = this.status === "OK" ? "OK" : "Aproxime-se da câmera";
                break;
            case "glasses":
                message = this.status === "OK" ? "OK" : "Óculos escuros ou cobrindo os olhos";
                break;
            case "poseAngleYaw":
                message = this.status === "OK" ? "OK" : this.status === "Fail Low" ? "Gire o rosto para esquerda" : "Gire o rosto para direita";
                break;
            case "saturation":
                message = this.status === "OK" ? "OK" : "A saturação da imagem não está adequada";
                break;
            case "sharpness":
                message = this.status === "OK" ? "OK" : "A foto não está nítida";
                break;
            case "smile":
                message = this.status === "OK" ? "OK" : "Boca aberta ou sorrindo";
                break;
        }
        return message;
    }
    getClasses() {
        let direction = this.leftIcon ? "left" : "right";
        let status = this.status === "OK" || this.status === 1 ? "success" : "danger";
        return `${direction}-box ${direction}-box-border-${status} ${this.detached && direction === "left" ? "width-detached" : "width"}`;
    }
    render() {
        if (this.leftIcon) {
            return (h("div", { class: "columns has-text-centered" },
                h("img", { class: "is-inline-block validation-icons", src: VALIDATION_ICONS[this.type], style: { background: this.status === "OK" || this.status === 1 ? COLORS.success : COLORS.danger, position: 'absolute' }, title: this.typeTitle }),
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
            h("img", { class: "is-inline-block validation-icons", src: VALIDATION_ICONS[this.type], style: { background: this.status === "OK" || this.status === 1 ? COLORS.success : COLORS.danger, position: 'absolute', right: '-7px' }, title: this.typeTitle })));
    }
    static get is() { return "openbio-face-validation-box-component"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "detached": {
            "type": Boolean,
            "attr": "detached"
        },
        "leftIcon": {
            "type": Boolean,
            "attr": "left-icon"
        },
        "status": {
            "type": "Any",
            "attr": "status"
        },
        "statusMessage": {
            "state": true
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "typeTitle": {
            "type": String,
            "attr": "type-title"
        }
    }; }
    static get style() { return "/**style-placeholder:openbio-face-validation-box-component:**/"; }
}
