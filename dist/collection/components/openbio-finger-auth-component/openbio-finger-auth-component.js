import { showImage } from "../../utils/canvas";
import constants from "../../utils/constants";
import { notify } from '../../utils/notifier';
import WS from "../../utils/websocket";
import { fingerAuthenticate, getModalSettings, authLog } from '../openbio-finger-component/api';
import { getPeople } from './api';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import { TranslationUtils } from '../../locales/translation';
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
    CLOSE: "close",
    START: "start",
    STOP: "stop",
    STOP_PROCESSOR: "stop-processor"
};
const WebsocketStatus = {
    INITIALIZED: "initialized",
    DONE_SETTING_FINGERS: "done-setting-fingers",
    FINGER_CAPTURE: "finger-capture"
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
        this.showFullscreenLoader = true;
        this.fingerNfiqScore = 0;
        this.captureType = CaptureType.FLAT;
        this.fingerAuthenticate = undefined;
        this.thresholdAuthenticate = 1;
        this.captureMessage = "Aguardando captura da digital";
        this.ready = false;
        this.locale = 'pt';
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
        this.session = {
            store: (authentication) => {
                this.payload.action = "store-session";
                this.payload.data = {
                    type: "AUTH",
                    owner: "default-user",
                    biometry: authentication
                };
                this.ws.respondToDeviceWS(this.payload);
            }
        };
        this.device = {
            open: () => {
                this.payload.action = PayloadAction.OPEN;
                this.ws.respondToDeviceWS(this.payload);
                this.session.store({ result: "aborted" });
            },
            close: () => {
                this.payload.action = PayloadAction.CLOSE;
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
                this.device.stopPreview();
                this.device.startPreview();
            }
        };
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
        this.fingerNames = [this.translations.RIGHT_THUMB, this.translations.RIGHT_INDICATOR, this.translations.MIDDLE_RIGHT, this.translations.RIGHT_RING, this.translations.MINIMUM_RIGHT, this.translations.LEFT_THUMB, this.translations.LEFT_INDICATOR, this.translations.MIDDLE_LEFT, this.translations.LEFT_RING, this.translations.MINIMUM_LEFT];
        this.componentContainer.forceUpdate();
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
    closeComponent() {
        this.device.stopPreview();
        this.device.stopPreviewProcessor();
        this.device.close();
        this.payload.action = "close-component";
        this.payload.data = {
            type: "authenticate",
            owner: "default-user"
        };
        this.ws.respondToDeviceWS(this.payload);
    }
    saveLog(authLogBody) {
        authLogBody.type = "FINGER";
        authLogBody.cpf = this.cpfState || this.cpf;
        authLog(authLogBody);
    }
    loadWebsocketListeners() {
        this.ws.deviceSocket.addEventListener("message", (event) => {
            if (!event.data || !JSON.parse(event.data)) {
                return;
            }
            const { status, previewImage, originalImage, wsqImage, rollingStatus, rollingLineX, nfiqScore, fingersData, deviceInfo, imageError } = JSON.parse(event.data);
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
            if (status === WebsocketStatus.FINGER_CAPTURE) {
                this.showFullscreenLoader = true;
            }
            if (previewImage) {
                if (!["DIGITALPERSONA", "SECUGEN", "M421"].includes(deviceInfo.manufacturName.toUpperCase())) {
                    showImage(this.fingerPreviewCanvas, previewImage, this.fingerPreviewCurrentRollingStatus, this.fingerPreviewCurrentStatusLineX);
                }
                this.fingerNfiqScore = nfiqScore > 0 && nfiqScore <= 5 ? nfiqScore : 0;
            }
            else if (originalImage) {
                this.showFullscreenLoader = true;
                this.device.stopPreview();
                if (imageError && deviceInfo.manufacturName.toUpperCase() !== "SECUGEN") {
                    notify(this.componentContainer, "error", this.translations.VERIFY_EYE_OPENING);
                    this.fingerAuthenticate = false;
                    this.captureMessage = `${this.translations.VERIFY_EYE_OPENING}. ${this.translations.TRY_AGAIN}.`;
                    this.device.clearCapture();
                    this.saveLog({ status: "fail", description: "spoof", matchImage: originalImage });
                    if (this.thresholdAuthenticate >= 3) {
                        const authResult = { result: false };
                        this.session.store(authResult);
                        this.closeComponent();
                    }
                    this.thresholdAuthenticate += 1;
                    this.showFullscreenLoader = false;
                    return;
                }
                this.componentContainer.forceUpdate();
                if (fingersData.fingerCount > 1) {
                    showImage(this.fingerPreviewCanvas, originalImage, 0);
                }
                else {
                    showImage(this.fingerPreviewCanvas, fingersData.images[0].image, 0);
                }
                this.fingerOriginalImage = originalImage;
                this.deviceModel = deviceInfo.modelName;
                this.deviceBrand = deviceInfo.manufacturName;
                this.deviceSerial = deviceInfo.serialNumber;
                this.fingerPreviewCurrentRollingStatus = 0;
                this.fingerPreviewCurrentStatusLineX = rollingLineX;
                if (this.useOpenbioMatcherState) {
                    if (this.selectedFinger && this.selectedFinger.index !== undefined && originalImage && originalImage.length > 0) {
                        if (this.debug) {
                            const similarity = Math.round(Math.random()) === 0 ? Math.random() * 24 : Math.random() * (75 - 26) + 26;
                            const authResult = { result: similarity > 25 };
                            this.session.store(authResult);
                            this.fingerAuthenticationSimilarity = similarity;
                            if (similarity > 25) {
                                notify(this.componentContainer, "success", this.translations.AUTHENTICATION_SUCCESS);
                                this.fingerAuthenticate = true;
                                this.captureMessage = this.translations.AUTHENTICATION_SUCCESS;
                                this.saveLog({ status: "success" });
                                setTimeout(() => {
                                    this.closeComponent();
                                }, 1000);
                            }
                            else {
                                notify(this.componentContainer, "error", this.translations.AUTHENTICATION_ERROR);
                                this.fingerAuthenticate = false;
                                this.captureMessage = this.translations.AUTHENTICATION_ERROR_TRY_AGAIN;
                                this.saveLog({ status: "fail", description: "match failed" });
                                this.device.clearCapture();
                                if (this.thresholdAuthenticate >= 3) {
                                    this.closeComponent();
                                }
                                this.thresholdAuthenticate += 1;
                            }
                            this.onMatcherResult.emit(authResult);
                            this.showFullscreenLoader = false;
                            this.componentContainer.forceUpdate();
                        }
                        else {
                            fingerAuthenticate({
                                cpf: this.cpfState,
                                finger: {
                                    finger_index: this.selectedFinger.index,
                                    data: wsqImage
                                },
                                debug: this.debug,
                            }).then((resolve) => {
                                if (resolve.message) {
                                    notify(this.componentContainer, "error", resolve.message);
                                    return;
                                }
                                this.fingerAuthenticationSimilarity = resolve.similarity;
                                const authResult = { result: resolve && resolve.similarity > 25 };
                                this.session.store(authResult);
                                if (resolve && resolve.similarity > 25) {
                                    notify(this.componentContainer, "success", this.translations.AUTHENTICATION_SUCCESS);
                                    this.fingerAuthenticate = true;
                                    this.captureMessage = this.translations.AUTHENTICATION_SUCCESS;
                                    this.saveLog({ status: "success", matchImage: originalImage, score: resolve.similarity });
                                    setTimeout(() => {
                                        this.closeComponent();
                                    }, 1.5 * 1000);
                                }
                                else {
                                    notify(this.componentContainer, "error", this.translations.AUTHENTICATION_ERROR);
                                    this.fingerAuthenticate = false;
                                    this.captureMessage = this.translations.AUTHENTICATION_ERROR_TRY_AGAIN;
                                    this.saveLog({ status: "fail", description: "match failed", matchImage: originalImage, score: resolve.similarity });
                                    this.device.clearCapture();
                                    if (this.thresholdAuthenticate >= 3) {
                                        setTimeout(() => {
                                            this.closeComponent();
                                        }, 1.5 * 1000);
                                    }
                                    this.thresholdAuthenticate += 1;
                                }
                                this.onMatcherResult.emit(authResult);
                                this.showFullscreenLoader = false;
                                this.componentContainer.forceUpdate();
                            }, (reject) => {
                                this.showFullscreenLoader = false;
                                this.componentContainer.forceUpdate();
                                this.clearCanvasFingerImage();
                                this.device.clearCapture();
                                console.log(reject);
                            });
                        }
                    }
                    else {
                        this.clearCanvasFingerImage();
                        this.device.clearCapture();
                        this.showFullscreenLoader = false;
                        this.componentContainer.forceUpdate();
                    }
                }
                else {
                    const authResult = {
                        finger_index: this.selectedFinger && this.selectedFinger.index,
                        data: originalImage,
                        nfiqScore: nfiqScore,
                    };
                    this.session.store(authResult);
                    this.closeComponent();
                }
                this.onCaptureFingerprintResult.emit({
                    finger_index: this.selectedFinger.index,
                    data: originalImage,
                    nfiqScore: nfiqScore
                });
            }
        });
    }
    async getPerson() {
        if (!this.useOpenbioMatcherState) {
            this.showFullscreenLoader = false;
            this.ready = true;
            return;
        }
        try {
            this.person = await getPeople(this.cpfState);
            if (this.person.error) {
                this.showFullscreenLoader = false;
                Swal.fire({
                    type: "error",
                    text: this.person.error,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                }).then(() => {
                    this.closeComponent();
                });
                return;
            }
            const fingerBiometry = this.person.Biometries.find(item => item.biometry_type === 2);
            if (!fingerBiometry || (fingerBiometry.FingerprintBiometries && fingerBiometry.FingerprintBiometries.length === 0)) {
                this.showFullscreenLoader = false;
                Swal.fire({
                    type: "warning",
                    text: "Este cadastro não possui digitais cadastradas.",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                }).then(() => {
                    this.closeComponent();
                });
                return;
            }
            this.selectedFinger = {
                index: -1,
                name: ""
            };
            this.showFullscreenLoader = false;
            this.ready = true;
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
        this.selectedFinger = { index: parseInt(value, 10), name: this.fingerNames[parseInt(value, 10)] };
        this[name] = this.selectedFinger;
        this.setCurrentFingerImage();
        this.device.stopPreview();
        setTimeout(() => {
            this.device.startPreview();
        }, 100);
    }
    componentDidLoad() {
        let location = undefined;
        let queryObj = undefined;
        window.global = window;
        const _global = window || global;
        if (_global) {
            console.log(_global);
            location = _global.location;
        }
        if (location) {
            const { search } = location;
            if (search !== "") {
                queryObj = JSON.parse('{"' + decodeURI(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
            }
        }
        this.useOpenbioMatcherState = queryObj ? queryObj.useOpenbioMatcher === "true" : this.useOpenbioMatcher;
        if (this.isDebug !== undefined) {
            this.debug = this.isDebug;
        }
        this.cpfState = queryObj ? queryObj.cpf : this.cpf;
        this.personNameState = queryObj ? queryObj.personName : this.personName;
        this.personImageState = queryObj ? queryObj.personImage : this.personImage;
        this.debug = queryObj ? queryObj.debug : !!this.debug;
        if (!this.debug) {
            this.getPerson();
        }
        else {
            this.selectedFinger = { index: 0, name: this.fingerNames[0] };
            this.showFullscreenLoader = false;
            this.ready = true;
        }
        this.getModalSettings();
        this.loadWebsocketListeners();
        this.device.prepareToPreview();
    }
    componentDidUnload() {
        this.device.close();
        this.device.stopPreview();
        this.device.stopPreviewProcessor();
        this.clearCanvasFingerImage();
    }
    applyCpfMask(cpf) {
        cpf = cpf.replace(/\D/g, '');
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/g, "$1.$2.$3-$4");
    }
    getPersonPhoto() {
        const personFaceBiometry = this.person && this.person.Biometries && this.person.Biometries.find(item => item.biometry_type === 1);
        if (this.debug ||
            !personFaceBiometry ||
            (personFaceBiometry && personFaceBiometry.FaceBiometries.length === 0) ||
            (personFaceBiometry && (!personFaceBiometry.FaceBiometries[0].data && !personFaceBiometry.FaceBiometries[0].segmented_data))) {
            return './assets/face-empty.jpg';
        }
        return `data:image/jpeg;base64, ${this.personImageState || (personFaceBiometry && (personFaceBiometry.FaceBiometries[0].segmented_data || personFaceBiometry.FaceBiometries[0].data))}`;
    }
    render() {
        const personFaceBiometry = this.person && this.person.Biometries && this.person.Biometries.find(item => item.biometry_type === 1);
        return (h("div", null,
            h("div", { class: "window-size margin-left-fix" },
                this.showFullscreenLoader ? h("loader-component", { enabled: this.showFullscreenLoader }) : null,
                h("div", { id: "notification-container" }),
                h("nav", { class: 'navbar', style: { "background-color": "#0D3F56" } },
                    h("div", { class: 'title is-3 has-text-centered', style: { "width": "100%", "color": "#fff", "padding-top": "7px" } }, this.translations.BIOMETRIC_AUTHENTICATION.toUpperCase())),
                this.ready ?
                    h("div", { class: 'level', style: { "margin-top": "30px" } },
                        h("div", { class: 'level-item has-text-centered', style: { width: "50%" } },
                            h("div", { class: 'section' },
                                h("section", { class: "section" },
                                    h("figure", { class: "image" },
                                        h("img", { class: "is-rounded", style: { "width": "100%", "max-width": "250px", "max-height": "250px", "object-fit": "cover" }, src: this.getPersonPhoto() }))),
                                h("div", { class: "media-content" },
                                    h("p", { class: "title is-4 has-text-weight-semibold", style: { textAlign: "center" } }, this.debug ? 'Ana Júlia Teste' : (this.personNameState || this.person && this.person.full_name)),
                                    this.cpfState || this.person && this.person.cpf ?
                                        h("p", { class: "title is-6 has-text-grey", style: { textAlign: "center" } }, this.applyCpfMask(this.cpfState || (this.person && this.person.cpf)))
                                        : undefined))),
                        h("div", { class: 'level-item has-text-centered' },
                            h("div", { style: { "border-left": "1px solid #16658a", "height": "500px" } })),
                        h("div", { class: 'level-item has-text-centered', style: { width: "50%" } },
                            h("section", { class: "section" },
                                h("figure", { class: "image", style: { padding: "23px 0" } },
                                    h("img", { class: "is-rounded", style: { "width": "300px", "height": "300px" }, src: this.fingerAuthenticate === true ? './assets/fingerprint-success.gif' : this.fingerAuthenticate === false ? './assets/fingerprint-outline-error.gif' : './assets/fingerprint-outline.gif' })),
                                h("p", { class: "title is-5 has-text-weight-semibold", style: { "margin-top": "10px" } }, this.captureMessage),
                                !this.fingerAuthenticate ? h("p", null,
                                    " ",
                                    (this.selectedFinger && this.selectedFinger.name) || "",
                                    " ") : null,
                                h("canvas", { width: "300", height: "300", style: { "display": "none" }, class: "canvas", ref: el => this.fingerPreviewCanvas = el }))))
                    : null)));
    }
    static get is() { return "openbio-finger-auth"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "captureMessage": {
            "state": true
        },
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
        "debug": {
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
        "fingerAuthenticate": {
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
        "isDebug": {
            "type": Boolean,
            "attr": "is-debug"
        },
        "locale": {
            "type": String,
            "attr": "locale",
            "mutable": true,
            "watchCallbacks": ["listenLocale"]
        },
        "modalSettings": {
            "state": true
        },
        "person": {
            "state": true
        },
        "personImage": {
            "type": String,
            "attr": "person-image"
        },
        "personImageState": {
            "state": true
        },
        "personName": {
            "type": String,
            "attr": "person-name"
        },
        "personNameState": {
            "state": true
        },
        "ready": {
            "state": true
        },
        "selectedFinger": {
            "state": true
        },
        "showFullscreenLoader": {
            "state": true
        },
        "thresholdAuthenticate": {
            "state": true
        },
        "translations": {
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
    static get events() { return [{
            "name": "onMatcherResult",
            "method": "onMatcherResult",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "onCaptureFingerprintResult",
            "method": "onCaptureFingerprintResult",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:openbio-finger-auth:**/"; }
}
