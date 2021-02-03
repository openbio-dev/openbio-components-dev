import { showImage } from "../../utils/canvas";
import constants from "../../utils/constants";
import { notify } from '../../utils/notifier';
import WS from "../../utils/websocket";
import { fingerAuthenticate, getModalSettings, getPeople } from '../openbio-finger-component/api';
var FlowTypes;
(function (FlowTypes) {
    FlowTypes[FlowTypes["FLOW_TYPE_TEN_FLAT_CAPTURES"] = 0] = "FLOW_TYPE_TEN_FLAT_CAPTURES";
    FlowTypes[FlowTypes["FLOW_TYPE_TEN_ROLLED_CAPTURES"] = 1] = "FLOW_TYPE_TEN_ROLLED_CAPTURES";
    FlowTypes[FlowTypes["FLOW_TYPE_FIVE_FLAT_CAPTURES"] = 2] = "FLOW_TYPE_FIVE_FLAT_CAPTURES";
    FlowTypes[FlowTypes["FLOW_TYPE_THREE_FLAT_CAPTURES"] = 3] = "FLOW_TYPE_THREE_FLAT_CAPTURES";
    FlowTypes[FlowTypes["FLOW_TYPE_SEQUENCE_CONTROL_CAPTURE"] = 4] = "FLOW_TYPE_SEQUENCE_CONTROL_CAPTURE";
    FlowTypes[FlowTypes["FLOW_TYPE_TWO_FLAT_SEQUENCE_CONTROL_CAPTURE"] = 5] = "FLOW_TYPE_TWO_FLAT_SEQUENCE_CONTROL_CAPTURE";
    FlowTypes[FlowTypes["FLOW_TYPE_FOUR_FLAT_SEQUENCE_CONTROL_CAPTURE"] = 6] = "FLOW_TYPE_FOUR_FLAT_SEQUENCE_CONTROL_CAPTURE";
    FlowTypes[FlowTypes["FLOW_TYPE_PINCH"] = 7] = "FLOW_TYPE_PINCH";
})(FlowTypes || (FlowTypes = {}));
var CaptureType;
(function (CaptureType) {
    CaptureType[CaptureType["FLAT"] = 0] = "FLAT";
    CaptureType[CaptureType["ROLLED"] = 1] = "ROLLED";
})(CaptureType || (CaptureType = {}));
var Finger;
(function (Finger) {
    Finger[Finger["RIGHT_THUMB"] = 0] = "RIGHT_THUMB";
    Finger[Finger["RIGHT_INDEX"] = 1] = "RIGHT_INDEX";
    Finger[Finger["RIGHT_MIDDLE"] = 2] = "RIGHT_MIDDLE";
    Finger[Finger["RIGHT_RING"] = 3] = "RIGHT_RING";
    Finger[Finger["RIGHT_LITTLE"] = 4] = "RIGHT_LITTLE";
    Finger[Finger["LEFT_THUMB"] = 5] = "LEFT_THUMB";
    Finger[Finger["LEFT_INDEX"] = 6] = "LEFT_INDEX";
    Finger[Finger["LEFT_MIDDLE"] = 7] = "LEFT_MIDDLE";
    Finger[Finger["LEFT_RING"] = 8] = "LEFT_RING";
    Finger[Finger["LEFT_LITTLE"] = 9] = "LEFT_LITTLE";
})(Finger || (Finger = {}));
const PayloadAction = {
    OPEN: "open",
    START: "start",
    STOP: "stop",
    STOP_PROCESSOR: "stop-processor"
};
const WebsocketStatus = {
    INITIALIZED: "initialized",
    DONE_SETTING_FINGERS: "done-setting-fingers"
};
export class OpenbioFingerAuthComponent {
    constructor() {
        this.ws = new WS();
        this.fingerNames = [
            "Polegar direito",
            "Indicador direito",
            "Médio direito",
            "Anelar direito",
            "Mínimo direito",
            "Polegar esquerdo",
            "Indicador esquerdo",
            "Médio esquerdo",
            "Anelar esquerdo",
            "Mínimo esquerdo"
        ];
        this.showFullscreenLoader = false;
        this.captureType = CaptureType.FLAT;
        this.selectedFinger = { index: 0, name: this.fingerNames[0] };
        this.payload = {
            deviceName: constants.device.IB,
            deviceType: "modal",
            processorName: constants.processor.AK_MATCHER,
            devicePosition: 0,
            captureType: 0,
            fingerIndex: undefined,
            action: undefined,
            data: undefined
        };
        this.device = {
            open: () => {
                this.payload.action = PayloadAction.OPEN;
                this.ws.respondToDeviceWS(this.payload);
            },
            prepareToPreview: () => {
                this.wsStatusInterval = setInterval(() => {
                    if (this.ws.status() === 1) {
                        clearInterval(this.wsStatusInterval);
                        this.device.open();
                    }
                }, 2000);
            },
            startPreview: () => {
                this.clearCanvasFingerImage();
                this.payload.action = PayloadAction.START;
                this.payload.captureType = this.captureType;
                this.payload.fingerIndex = undefined;
                this.ws.respondToDeviceWS(this.payload);
            },
            stopPreview: () => {
                this.payload.action = PayloadAction.STOP;
                this.ws.respondToDeviceWS(this.payload);
            },
            stopPreviewProcessor: () => {
                this.payload.action = PayloadAction.STOP_PROCESSOR;
                this.ws.respondToDeviceWS(this.payload);
            },
            clearCapture: () => {
                this.fingerOriginalImage = undefined;
                this.fingerAuthenticationSimilarity = undefined;
                this.device.startPreview();
            }
        };
    }
    clearCanvasFingerImage() {
        showImage(this.fingerPreviewCanvas, "");
    }
    async getModalSettings() {
        try {
            this.modalSettings = await getModalSettings();
            this.payload.deviceName = this.modalSettings.device ? constants.device[this.modalSettings.device] : constants.device.IB;
        }
        catch (e) {
            console.log('[ERROR] getModalSettings: ', e);
        }
    }
    loadWebsocketListeners() {
        this.ws.deviceSocket.addEventListener("message", (event) => {
            if (!event.data || !JSON.parse(event.data)) {
                return;
            }
            const { status, previewImage, originalImage, rollingStatus, rollingLineX, nfiqScore, fingersData, deviceInfo } = JSON.parse(event.data);
            if (status === WebsocketStatus.INITIALIZED) {
                this.device.stopPreview();
                this.device.startPreview();
            }
            else if (status === WebsocketStatus.DONE_SETTING_FINGERS) {
                this.device.startPreview();
            }
            if (rollingStatus) {
                this.fingerPreviewCurrentRollingStatus = rollingStatus;
                this.fingerPreviewCurrentStatusLineX = rollingLineX;
            }
            if (previewImage) {
                showImage(this.fingerPreviewCanvas, previewImage, this.fingerPreviewCurrentRollingStatus, this.fingerPreviewCurrentStatusLineX);
                this.fingerNfiqScore = nfiqScore > 0 && nfiqScore <= 5 ? nfiqScore : 0;
            }
            else if (originalImage) {
                this.showFullscreenLoader = true;
                if (fingersData.fingerCount > 1) {
                    showImage(this.fingerPreviewCanvas, originalImage, 0);
                }
                else {
                    showImage(this.fingerPreviewCanvas, fingersData.images[0].image, 0);
                }
                setTimeout(() => {
                    this.fingerOriginalImage = originalImage;
                    this.deviceModel = deviceInfo.modelName;
                    this.deviceBrand = deviceInfo.manufacturName;
                    this.deviceSerial = deviceInfo.serialNumber;
                    this.fingerPreviewCurrentRollingStatus = 0;
                    this.fingerPreviewCurrentStatusLineX = rollingLineX;
                }, 1000);
                if (this.useOpenbioMatcherState) {
                    fingerAuthenticate({
                        cpf: this.cpfState,
                        finger: {
                            finger_index: this.selectedFinger.index,
                            data: originalImage
                        }
                    }).then((resolve) => {
                        this.showFullscreenLoader = false;
                        this.fingerAuthenticationSimilarity = resolve.similarity;
                        if (resolve && resolve.similarity > 40) {
                            notify(this.componentContainer, "success", "Autenticado com sucesso");
                        }
                        else {
                            notify(this.componentContainer, "error", "Falha na autenticação");
                            this.device.clearCapture();
                        }
                        if (this.onMatcherResult) {
                            this.onMatcherResult({
                                finger_index: this.selectedFinger.index,
                                data: originalImage,
                                nfiqScore: nfiqScore,
                                similarity: resolve.similarity
                            });
                        }
                    }, (reject) => {
                        this.showFullscreenLoader = false;
                        this.clearCanvasFingerImage();
                        this.device.clearCapture();
                        console.log(reject);
                    });
                }
                if (this.onCaptureFingerprintResult) {
                    this.onCaptureFingerprintResult({
                        finger_index: this.selectedFinger.index,
                        data: originalImage,
                        nfiqScore: nfiqScore
                    });
                }
                this.showFullscreenLoader = false;
            }
        });
    }
    async getPerson() {
        if (!this.useOpenbioMatcherState) {
            return;
        }
        try {
            this.person = await getPeople(this.cpfState, this.captureType === CaptureType.FLAT ? 1 : 2);
            const fingerBiometries = (this.person.Biometries.find(item => item.biometry_type === 2))
                .FingerprintBiometries.map(item => item.finger_index)
                .sort((a, b) => a - b);
            this.selectedFinger = {
                index: fingerBiometries[0],
                name: this.fingerNames[fingerBiometries[0]]
            };
        }
        catch (e) {
            console.log(e);
        }
    }
    setCurrentFingerImage() {
        this.currentFingerImage = `./assets/fingers/${this.captureType === CaptureType.ROLLED ? "roll" : "slap"}/d${this.selectedFinger.index}.gif`;
    }
    setSelectionCaptureType(event) {
        const name = event.target.name;
        const value = event.target.value;
        this[name] = parseInt(value, 10);
        this.setSelectionFingerList({ target: { name: "fingerList", value: this.selectedFinger.index } });
        this.getPerson();
        this.device.stopPreview();
        setTimeout(() => {
            this.device.startPreview();
        }, 100);
    }
    setSelectionFingerList(event) {
        const { name, value } = event.target;
        this.selectedFinger = { index: value, name: this.fingerNames[parseInt(value, 10)] };
        this[name] = this.selectedFinger;
        this.setCurrentFingerImage();
    }
    componentDidLoad() {
        this.useOpenbioMatcherState = this.useOpenbioMatcher;
        this.cpfState = this.cpf;
        this.getPerson();
        this.getModalSettings();
        this.setCurrentFingerImage();
        this.loadWebsocketListeners();
        this.device.prepareToPreview();
    }
    componentDidUnload() {
        this.device.stopPreview();
        this.device.stopPreviewProcessor();
        this.clearCanvasFingerImage();
    }
    render() {
        const personFaceBiometry = this.person && this.person.Biometries && this.person.Biometries.find(item => item.biometry_type === 1);
        let personFingerList = undefined;
        if (this.person) {
            const personBiometries = this.person.Biometries.find(item => item.biometry_type === 2) || {};
            personFingerList = personBiometries.FingerprintBiometries.map(item => {
                return (h("option", { value: item.finger_index, selected: this.selectedFinger && this.selectedFinger.index === item.finger_index }, this.fingerNames[item.finger_index]));
            });
            if (!this.selectedFinger) {
                this.selectedFinger = {
                    index: personBiometries[0].finger_index,
                    name: this.fingerNames[personBiometries[0].finger_index]
                };
            }
        }
        else {
            personFingerList = this.fingerNames.map((item, index) => {
                return (h("option", { value: index, selected: this.selectedFinger && this.selectedFinger.index === index }, item));
            });
        }
        return (h("div", null,
            h("div", { class: "window-size" },
                h("loader-component", { enabled: this.showFullscreenLoader }),
                h("div", { id: "notification-container" }),
                h("div", { class: "card", style: { "box-shadow": "none", "padding-bottom": "10px" } },
                    h("div", { class: "card-content" },
                        h("div", { class: "media" },
                            (personFaceBiometry && personFaceBiometry.FaceBiometries[0] && personFaceBiometry.FaceBiometries[0].data) || (this.personImage) ? (h("div", { class: "media-left" },
                                h("figure", { class: "image is-128x128" },
                                    h("img", { style: { "max-width": "128px", "max-height": "128px" }, src: `data:image/png;base64, ${this.personImage || (personFaceBiometry && personFaceBiometry.FaceBiometries[0].data)}` })))) : undefined,
                            h("div", { class: "media-content" },
                                h("p", { class: "title is-4" }, this.personName || this.person && this.person.full_name),
                                this.cpfState || this.person && this.person.cpf ?
                                    h("p", { class: "subtitle is-6" },
                                        "CPF: ",
                                        this.cpfState || this.person && this.person.cpf) : undefined)))),
                h("div", { class: "columns is-mobile" },
                    h("div", { class: "column is-one-third" },
                        h("div", null,
                            h("p", { style: { marginBottom: "10px" } },
                                h("span", { style: { fontSize: "14px" } }, "Tipo de captura: "),
                                h("div", { class: "select is-small inline" },
                                    h("select", { onChange: this.setSelectionCaptureType.bind(this), name: "captureType" },
                                        h("option", { value: "0" }, "Pousada"),
                                        h("option", { value: "2" }, "Rolada")))),
                            h("p", null,
                                h("span", { style: { fontSize: "14px" } }, "Dedo: "),
                                h("div", { class: "select is-small inline", style: { marginLeft: "5px", minWidth: "142px" } },
                                    h("select", { onChange: this.setSelectionFingerList.bind(this), name: "fingerList" }, personFingerList)))),
                        this.selectedFinger ?
                            h("div", { class: "info" },
                                h("span", null,
                                    this.captureType === CaptureType.ROLLED ? "Role" : "Posicione",
                                    " o dedo ",
                                    h("b", null,
                                        this.selectedFinger.name,
                                        " "),
                                    "sobre o leitor."),
                                h("p", { class: "finger-image" },
                                    h("img", { alt: "", src: this.currentFingerImage }))) : null),
                    h("div", { class: "column text-align-left" },
                        h("span", { class: `status-item-line-in-canvas status-item status${this.fingerNfiqScore}` }, this.fingerNfiqScore),
                        h("canvas", { width: "460", height: "300", class: "canvas", ref: el => this.fingerPreviewCanvas = el }),
                        h("div", { class: "columns is-mobile action-buttons-container" }, this.fingerAuthenticationSimilarity < 40 ?
                            h("div", { class: "column has-text-centered" },
                                h("a", { class: "button is-small is-pulled-right action-button", onClick: () => this.device.clearCapture() }, "TENTAR NOVAMENTE")) : null))))));
    }
    static get is() { return "openbio-finger-auth"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "captureType": {
            "state": true
        },
        "componentContainer": {
            "elementRef": true
        },
        "cpf": {
            "type": String,
            "attr": "cpf"
        },
        "cpfState": {
            "state": true
        },
        "currentFingerImage": {
            "state": true
        },
        "deviceBrand": {
            "state": true
        },
        "deviceModel": {
            "state": true
        },
        "deviceSerial": {
            "state": true
        },
        "fingerAuthenticationSimilarity": {
            "state": true
        },
        "fingerNfiqScore": {
            "state": true
        },
        "fingerOriginalImage": {
            "state": true
        },
        "fingerPreviewCurrentRollingStatus": {
            "state": true
        },
        "fingerPreviewCurrentStatusLineX": {
            "state": true
        },
        "modalSettings": {
            "state": true
        },
        "onCaptureFingerprintResult": {
            "type": "Any",
            "attr": "on-capture-fingerprint-result"
        },
        "onMatcherResult": {
            "type": "Any",
            "attr": "on-matcher-result"
        },
        "person": {
            "state": true
        },
        "personImage": {
            "type": String,
            "attr": "person-image"
        },
        "personName": {
            "type": String,
            "attr": "person-name"
        },
        "selectedFinger": {
            "state": true
        },
        "showFullscreenLoader": {
            "state": true
        },
        "useOpenbioMatcher": {
            "type": Boolean,
            "attr": "use-openbio-matcher"
        },
        "useOpenbioMatcherState": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:openbio-finger-auth:**/"; }
}
