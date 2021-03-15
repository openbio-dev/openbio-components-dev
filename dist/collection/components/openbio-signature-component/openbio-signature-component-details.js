import WS from '../../utils/websocket';
import { showImage } from '../../utils/canvas';
import { notify } from '../../utils/notifier';
import { setSignature } from '../../store/main.store';
import { getAnomalies, saveSignature, getSignatureSettings, saveSignatureFile } from "./api";
import { getLocalization } from '../../utils/utils';
import { getAppConfig } from '../../utils/api';
import constants from "../../utils/constants";
import changeDPI from "changedpi";
const BASE64_IMAGE = 'data:image/charset=UTF-8;png;base64,';
const EMPTY_IMAGE = '';
var TABS;
(function (TABS) {
    TABS[TABS["CAPTURE"] = 0] = "CAPTURE";
    TABS[TABS["RESULT"] = 1] = "RESULT";
})(TABS || (TABS = {}));
;
export class OpenbioSignatureComponentDetails {
    constructor() {
        this.ws = new WS();
        this.person = {
            id: 0
        };
        this.payload = {
            deviceName: "WACOM",
            deviceType: "signature",
            devicePosition: 0,
            action: undefined,
            data: undefined
        };
        this.deviceReady = false;
        this.deviceOpened = false;
        this.originalImage = EMPTY_IMAGE;
        this.rawImage = EMPTY_IMAGE;
        this.points = [];
        this.dpiValue = 0;
        this.tab = 0;
        this.anomalyOptions = [];
        this.signature = {
            originalImage: "",
            points: []
        };
        this.backendSession = undefined;
        this.showLoader = false;
        this.isCapturing = false;
        this.model = '';
        this.brand = '';
        this.serial = '';
        this.deviceStatus = false;
        this.serviceConfigs = undefined;
    }
    clearImages() {
        showImage(this.canvas, "");
        this.signature.originalImage = undefined;
    }
    clear() {
        this.stopPreview();
        this.startPreview();
    }
    startPreview(backToPreview = false) {
        if (this.isCapturing)
            return;
        this.clearImages();
        this.isCapturing = true;
        this.payload.action = "start";
        this.ws.respondToDeviceWS(this.payload);
        if (backToPreview) {
            this.setActiveTab(TABS.CAPTURE);
        }
    }
    close() {
        this.payload.action = "close";
        this.ws.respondToDeviceWS(this.payload);
    }
    stopPreview() {
        this.isCapturing = false;
        this.payload.action = "stop";
        this.ws.respondToDeviceWS(this.payload);
    }
    getFinishTitle() {
        return `${this.deviceReady ? "Clique aqui para finalizar" : "É necessário realizar a captura antes de finalizar"}`;
    }
    capture() {
        this.showLoader = true;
        this.payload.action = "capture";
        this.ws.respondToDeviceWS(this.payload);
    }
    open() {
        this.payload.action = "open";
        this.ws.respondToDeviceWS(this.payload);
        this.deviceOpened = true;
    }
    componentDidLoad() {
        this.showLoader = true;
        setTimeout(async () => {
            try {
                const faceSettings = await getSignatureSettings();
                this.dpiValue = constants.dpiValue[faceSettings.dpiOption] || 0;
                this.serviceConfigs = await getAppConfig();
                if (this.detached && this.isTagComponent) {
                    const _this = this;
                    window["getBiometryData"] = function () {
                        return _this.signature;
                    };
                    if (this.tempSignature)
                        this.signature = JSON.parse(this.tempSignature);
                    ;
                }
                else if (this.detached) {
                    this.emitLoadInformation();
                    const checkSessionInterval = setInterval(() => {
                        if (this.backendSession) {
                            clearInterval(checkSessionInterval);
                            this.originalImage = this.backendSession.signature;
                        }
                    }, 200);
                }
                else {
                    this.person = JSON.parse(this.tempPerson);
                    this.signature = JSON.parse(this.tempSignature);
                }
                this.anomalyOptions = await getAnomalies(constants.anomalyTypes.SIGNATURE_ANOMALY, !!this.detached);
                this.wsStatusInterval = setInterval(() => {
                    if (this.ws.status() === 1) {
                        clearInterval(this.wsStatusInterval);
                        if (!this.deviceReady) {
                            this.open();
                        }
                    }
                }, 1000);
                this.ws.componentSocket.addEventListener("message", (event) => {
                    const data = JSON.parse(event.data);
                    if (data.action === "session-data") {
                        this.backendSession = data.session;
                    }
                });
                this.ws.deviceSocket.addEventListener("message", (event) => {
                    const data = JSON.parse(event.data);
                    if (data.status === "initialized") {
                        this.deviceReady = true;
                        this.stopPreview();
                        this.startPreview();
                    }
                    if (data.status === "session-data-stored") {
                        this.backendSession = undefined;
                        this.emitLoadInformation();
                        const checkSessionInterval = setInterval(() => {
                            if (this.backendSession && this.backendSession.signature) {
                                clearInterval(checkSessionInterval);
                                this.showLoader = false;
                                this.setActiveTab(TABS.RESULT);
                            }
                        }, 200);
                    }
                    const deviceStatuses = data.deviceStatuses;
                    if (deviceStatuses) {
                        const previousStatus = JSON.parse(JSON.stringify(this.deviceStatus));
                        this.deviceStatus = deviceStatuses.signature && deviceStatuses.signature.initialized;
                        if (!this.deviceStatus) {
                            return;
                        }
                        else if (!previousStatus) {
                            if (!this.deviceOpened) {
                                this.open();
                                this.stopPreview();
                                this.startPreview();
                            }
                            return;
                        }
                    }
                    if (data.previewImage) {
                        showImage(this.canvas, data.previewImage);
                    }
                    else if (data.originalImage) {
                        this.isCapturing = false;
                        showImage(this.canvas, data.originalImage);
                        this.originalImage = data.originalImage;
                        this.points = data.points;
                        this.model = data.deviceInfo.modelName;
                        this.brand = data.deviceInfo.manufacturName;
                        this.serial = data.deviceInfo.serialNumber;
                        this.rawImage = data.rawImage;
                        this.saveSignature();
                    }
                });
                this.showLoader = false;
            }
            catch (e) {
                this.showLoader = false;
                console.error(e);
            }
        }, 1000);
    }
    componentDidUnload() {
        this.stopPreview();
    }
    acceptData() {
        if (this.isCapturing)
            return;
        this.payload.action = "close-component";
        this.payload.data = {
            type: "signature",
            owner: "default-user"
        };
        this.ws.respondToDeviceWS(this.payload);
    }
    emitLoadInformation() {
        this.payload.action = "component-opened";
        this.payload.data = {
            type: "signature"
        };
        const checkStatusInterval = setInterval(() => {
            if (this.ws.componentSocket.readyState === 1) {
                clearInterval(checkStatusInterval);
                this.ws.respondToComponentWS(this.payload);
            }
        }, 200);
    }
    sendBiometryInformation(signature) {
        this.payload.action = "store-session";
        this.payload.data = {
            type: "SIGNATURE",
            owner: "default-user",
            biometry: signature
        };
        this.ws.respondToDeviceWS(this.payload);
    }
    activeTabClass(num) {
        return this.tab === num ? "is-active" : "";
    }
    setActiveTab(num) {
        this.tab = num;
        if (num === TABS.CAPTURE && this.signature.originalImage !== undefined) {
            setTimeout(() => {
                showImage(this.canvas, this.signature.originalImage);
            }, 200);
        }
        this.componentContainer.forceUpdate();
    }
    setSelection(event) {
        const name = event.target.name;
        const value = event.target.value;
        this[name] = parseInt(value);
    }
    saveAnomaly() {
        if (!this.anomaly)
            return;
        this.stopPreview();
        this.saveSignature(true);
    }
    async saveSignature(saveAnomaly = false) {
        let localization = undefined;
        if (this.serviceConfigs && this.serviceConfigs.tools.geolocationService) {
            localization = await getLocalization();
        }
        const signature = {
            id: this.signature.id ? this.signature.id : null,
            data: this.originalImage ? (this.dpiValue ? changeDPI.changeDpiDataUrl(`data:image/png;base64,${this.originalImage}`, this.dpiValue).split(",")[1] : this.originalImage) : "",
            rawData: this.rawImage ? (this.dpiValue ? changeDPI.changeDpiDataUrl(`data:image/png;base64,${this.rawImage}`, this.dpiValue).split(",")[1] : this.rawImage) : "",
            anomalyId: saveAnomaly && this.anomaly ? this.anomaly : null,
            points: JSON.stringify(this.points),
            model: this.model,
            brand: this.brand,
            serial: this.serial,
            localization,
        };
        if (!this.detached) {
            const saveSignatureResult = await saveSignature({
                personId: this.person.id,
                signature: signature
            });
            await this.storeCapturedSignature({
                id: saveSignatureResult.id,
                data: saveSignatureResult.data,
                rawData: saveSignatureResult.rawData,
                anomalyId: saveSignatureResult.anomaly_id,
                model: saveSignatureResult.model,
                brand: saveSignatureResult.brand,
                serial: saveSignatureResult.serial,
                updatedAt: saveSignatureResult.updated_at,
                localization,
            });
        }
        else {
            if (!this.isTagComponent) {
                await this.sendBiometryInformation(signature);
            }
            await this.storeCapturedSignature(signature);
        }
        this.showLoader = false;
        notify(this.componentContainer, "success", "Captura realizada com sucesso");
    }
    storeCapturedSignature(parsedValue) {
        this.anomaly = 0;
        this.signature.id = parsedValue.id;
        this.signature.originalImage = parsedValue.data;
        this.signature.points = parsedValue.points;
        this.signature.anomalyId = parsedValue.anomalyId;
        this.signature.model = parsedValue.model;
        this.signature.brand = parsedValue.brand;
        this.signature.serial = parsedValue.serial;
        this.signature.localization = parsedValue.localization;
        setSignature(this.signature);
        this.componentContainer.forceUpdate();
    }
    onInputChange(files) {
        if (files.length > 0) {
            if (files[0].type !== 'image/png') {
                notify(this.componentContainer, "error", "Formato do arquivo inválido. Apenas imagens no formato png são aceitas");
                return;
            }
            if (files[0].type !== 'image/png') {
                notify(this.componentContainer, "error", "Formato do arquivo inválido. Apenas imagens no formato png são aceitas");
                return;
            }
            const image = new Image();
            const url = window.URL.createObjectURL(files[0]);
            image.onload = async () => {
                let localization = undefined;
                if (this.serviceConfigs && this.serviceConfigs.tools.geolocationService) {
                    localization = await getLocalization();
                }
                await saveSignatureFile({
                    personId: this.person.id,
                    signature: {
                        id: this.signature.id ? this.signature.id : null,
                        localization,
                    },
                }, files[0]);
                const reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.onload = () => {
                    this.signature.originalImage = reader.result.toString().split(",")[1];
                    notify(this.componentContainer, "success", "Assinatura carregada com sucesso");
                    this.tab = TABS.RESULT;
                };
                window.URL.revokeObjectURL(url);
            };
            image.src = url;
        }
    }
    render() {
        const anomalyOptions = (this.anomalyOptions || []).map((option) => {
            return (h("option", { value: option.id, selected: this.anomaly === option.id }, option.name));
        });
        return (h("div", { class: "window-size" },
            h("loader-component", { enabled: this.showLoader }),
            h("div", { id: "notification-container" }),
            h("div", { class: "tabs is-left is-boxed" },
                h("ul", null,
                    h("li", { class: this.activeTabClass(TABS.CAPTURE) },
                        h("a", { onClick: () => this.setActiveTab(TABS.CAPTURE) },
                            h("span", { class: "tab-title" }, "Captura"))),
                    h("li", { class: this.activeTabClass(TABS.RESULT) },
                        h("a", { onClick: () => this.setActiveTab(TABS.RESULT) },
                            h("span", { class: "tab-title" }, "Resultado"))))),
            this.tab === TABS.CAPTURE ? h("div", { class: "columns is-mobile" },
                h("div", { class: "column is-one-third" },
                    h("div", { class: "device-status-container" },
                        h("h6", { class: "title is-7" },
                            "ESTADO DO DISPOSITIVO: ",
                            this.deviceReady ? 'PRONTO' : 'NÃO CARREGADO')),
                    this.serviceConfigs && (this.serviceConfigs.signature.help.guideImage || this.serviceConfigs.signature.help.content) ?
                        h("help-component", { src: this.serviceConfigs.signature.help.guideImage, "help-text": this.serviceConfigs.signature.help.content }) : null),
                h("div", { class: "column text-align-left" },
                    h("canvas", { width: "460", height: "300", class: "canvas", ref: el => this.canvas = el }),
                    h("div", { class: "columns is-mobile action-buttons-container" },
                        h("div", { class: "column" },
                            h("a", { class: `button is-small is-pulled-left action-button ${this.deviceReady && this.isCapturing ? "disabled" : ""}`, onClick: () => this.startPreview() }, "INICIAR PREVIEW")),
                        h("div", { class: "column has-text-centered" },
                            h("a", { class: `button is-small action-button is-pulled-right ${this.deviceReady ? "" : "disabled"}`, title: "Clique aqui para limpar", onClick: () => this.clear() }, "LIMPAR")),
                        h("div", { class: "column has-text-centered" },
                            h("a", { class: `button is-small action-button is-pulled-right ${this.deviceReady && !this.signature.originalImage ? "" : "disabled"}`, title: `${this.deviceReady ? "Clique aqui para capturar" : "O dispositivo não está carregado"}`, onClick: () => this.capture() }, "CAPTURAR")),
                        this.detached && !this.isTagComponent ? h("div", { class: "column has-text-centered" },
                            h("a", { class: `button is-small is-pulled-left action-button ${!this.deviceReady || this.isCapturing || !this.originalImage || !this.signature.originalImage ? "disabled" : ""}`, title: this.getFinishTitle(), onClick: () => this.acceptData() }, "FINALIZAR")) : null),
                    h("div", { id: "capture-file", class: "file is-small is-info" },
                        h("label", { class: "file-label" },
                            h("input", { onChange: ($event) => this.onInputChange($event.target.files), class: "file-input", type: "file", name: "resume", accept: ".png" }),
                            h("span", { class: "file-cta" },
                                h("span", { class: "file-label" }, "Carregar arquivo")))),
                    h("div", { class: "columns is-mobile anomaly-buttons-container" },
                        h("div", { class: "column" },
                            h("div", { class: "select is-small inline is-pulled-left" },
                                h("select", { onChange: this.setSelection.bind(this), name: "anomaly" },
                                    h("option", { value: undefined }, "ESCOLHA EM CASO DE ANOMALIA"),
                                    anomalyOptions))),
                        h("div", { class: "column" },
                            h("a", { class: "button is-small action-button is-pulled-right", onClick: () => this.saveAnomaly() }, "SALVAR ANOMALIA"))))) : null,
            this.tab === TABS.RESULT ? h("div", { class: "tab-content" },
                h("div", { class: "columns" },
                    h("div", { class: "column has-text-centered preview-result" },
                        h("img", { src: `${BASE64_IMAGE}${this.detached ? (this.signature.originalImage || this.signature.formatedData) : this.signature.formatedData || this.signature.originalImage}` }),
                        h("div", { class: "columns is-mobile", style: { transform: "translate(30%, 0)", marginTop: "10px" } },
                            h("div", { class: "column is-narrow", style: { transform: "translate(24px, 0)" } },
                                h("div", null,
                                    h("img", { src: "./assets/general/signature-freehand.png", title: "Clique aqui para assinar novamente.", class: `fab-icon`, onClick: () => this.startPreview(true) }),
                                    h("br", null),
                                    h("span", { style: { padding: '6px', display: 'inline-block' } }, " Nova assinatura "))),
                            this.detached && !this.isTagComponent ?
                                h("div", { class: "column is-narrow", style: { transform: "translate(70px, 0)" } },
                                    h("div", null,
                                        h("img", { src: "./assets/general/check.png", class: "fab-icon", style: { float: 'right !important' }, onClick: () => this.acceptData() }),
                                        h("br", null),
                                        h("span", { style: { paddingLeft: '7px', display: 'inline-block' } }, " Finalizar "))) : null))),
                h("p", null, this.signature.anomalyId ? this.anomalyOptions.find((anomaly) => { return anomaly.id === this.signature.anomalyId; }).name : "")) : null));
    }
    static get is() { return "openbio-signature-details"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "anomaly": {
            "state": true
        },
        "anomalyOptions": {
            "state": true
        },
        "backendSession": {
            "state": true
        },
        "brand": {
            "state": true
        },
        "componentContainer": {
            "elementRef": true
        },
        "detached": {
            "type": Boolean,
            "attr": "detached"
        },
        "deviceOpened": {
            "state": true
        },
        "deviceReady": {
            "state": true
        },
        "deviceStatus": {
            "state": true
        },
        "dpiValue": {
            "state": true
        },
        "isCapturing": {
            "state": true
        },
        "isTagComponent": {
            "type": Boolean,
            "attr": "is-tag-component"
        },
        "model": {
            "state": true
        },
        "originalImage": {
            "state": true
        },
        "points": {
            "state": true
        },
        "rawImage": {
            "state": true
        },
        "serial": {
            "state": true
        },
        "serviceConfigs": {
            "state": true
        },
        "showLoader": {
            "state": true
        },
        "signature": {
            "state": true
        },
        "tab": {
            "state": true
        },
        "tempPerson": {
            "type": "Any",
            "attr": "temp-person"
        },
        "tempSignature": {
            "type": "Any",
            "attr": "temp-signature"
        }
    }; }
    static get style() { return "/**style-placeholder:openbio-signature-details:**/"; }
}
