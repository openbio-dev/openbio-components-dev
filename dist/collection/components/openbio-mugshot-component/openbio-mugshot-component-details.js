import WS from '../../utils/websocket';
import { getCameraSettingsOptions, getCameraSettings, saveCameraSettings, saveMugshotPhoto, deleteMugshotPhoto, getFaceSettings, } from "./api";
import { showImage } from '../../utils/canvas';
import { notify } from '../../utils/notifier';
import constants from "../../utils/constants";
import { getLocalization } from '../../utils/utils';
const BASE64_IMAGE = 'data:image/charset=UTF-8;png;base64,';
const EMPTY_IMAGE = '';
var tabs;
(function (tabs) {
    tabs[tabs["PREVIEW"] = 0] = "PREVIEW";
    tabs[tabs["VALIDATION"] = 1] = "VALIDATION";
    tabs[tabs["RESULT"] = 2] = "RESULT";
    tabs[tabs["CONFIG"] = 3] = "CONFIG";
})(tabs || (tabs = {}));
export class OpenbioMugshotComponentDetails {
    constructor() {
        this.ws = new WS();
        this.person = {
            id: 0
        };
        this.payload = {
            deviceName: constants.device.AKYSCAM,
            deviceType: "face",
            devicePosition: 0,
            action: undefined,
            data: undefined
        };
        this.capturedData = null;
        this.deviceReady = false;
        this.eyeAxisLocationRatio = '...';
        this.centerLineLocationRatio = '...';
        this.eyeSeparation = '...';
        this.poseAnglePitch = '...';
        this.eyeAxysAngle = '...';
        this.poseAngleYaw = '...';
        this.rightOrLeftEyeClosed = '...';
        this.originalImage = EMPTY_IMAGE;
        this.croppedImage = EMPTY_IMAGE;
        this.segmentedImage = EMPTY_IMAGE;
        this.flashCharge = 0;
        this.mugshotIndex = 0;
        this.mugshotDescription = '';
        this.mugshotPhotos = [];
        this.cameraSettingsOptions = {
            imageFormatOptions: [],
            flashWidthOptions: [],
            gammaTablesOptions: [],
            isoValueOptions: [],
            shutterSpeedOptions: [],
            whiteBalanceOptions: [],
            apertureOptions: []
        };
        this.tab = 0;
        this.anomalyOptions = [];
        this.backendSession = undefined;
        this.showLoader = false;
        this.flashProperty = 0;
        this.flashWidth = 0;
        this.aperture = 0;
        this.shutterSpeed = 0;
        this.imageFormat = 0;
        this.isoValue = 0;
        this.whiteBalance = 0;
        this.isCapturing = false;
        this.model = '';
        this.brand = '';
        this.serial = '';
        this.video = undefined;
        this.track = undefined;
    }
    open() {
        this.payload.action = "open";
        this.ws.respondToDeviceWS(this.payload);
    }
    async applyCameraSettings() {
        const currentCameraSettings = [
            'flashProperty',
            'flashWidth',
            'shutterSpeed',
            'imageFormat',
            'isoValue',
            'whiteBalance',
        ];
        currentCameraSettings.forEach((setting) => {
            this.payload.action = "camera-properties";
            this.payload.data = {
                property: setting,
                value: this[setting]
            };
            this.ws.respondToDeviceWS(this.payload);
        });
    }
    async fetchCurrentCameraSettings() {
        this.cameraSettingsOptions = await getCameraSettingsOptions();
        const cameraSettings = await getCameraSettings();
        this.flashProperty = cameraSettings.flash_property;
        this.flashWidth = cameraSettings.flash_width;
        this.shutterSpeed = cameraSettings.shutter_speed;
        this.imageFormat = cameraSettings.image_format;
        this.isoValue = cameraSettings.iso_value;
        this.whiteBalance = cameraSettings.white_balance;
    }
    isWebcam() {
        return this.payload.deviceName === constants.device.WEBCAM;
    }
    buildWebcam() {
        let width = 460;
        let height = 300;
        let loopFrame = null;
        const webcamCanvas = this.canvas;
        if (!webcamCanvas)
            return this.buildWebcam();
        const webcamContext = webcamCanvas.getContext('2d');
        this.video = document.createElement('video');
        this.video.setAttribute('autoplay', 'true');
        this.deviceReady = true;
        const loop = () => {
            if (!this.video)
                return;
            loopFrame = requestAnimationFrame(loop);
            webcamContext.save();
            webcamContext.scale(-1, 1);
            webcamContext.drawImage(this.video, 0, 0, -width, height);
            webcamContext.restore();
        };
        this.video.addEventListener('loadedmetadata', () => {
            webcamCanvas.width = width;
            webcamCanvas.height = height;
            loopFrame = loopFrame || requestAnimationFrame(loop);
        });
    }
    async componentDidLoad() {
        this.showLoader = true;
        setTimeout(async () => {
            this.fetchCurrentCameraSettings();
            const faceSettings = await getFaceSettings();
            this.payload.deviceName = faceSettings.device ? constants.device[faceSettings.device] : constants.device.AKYSCAM;
            this.crop = false;
            this.autoCapture = false;
            this.segmentation = false;
            if (this.detached && this.isTagComponent) {
            }
            if (this.detached) {
                this.emitLoadInformation();
                this.setMugshotsFromBackendSession();
            }
            else {
                this.person = JSON.parse(this.tempPerson);
                this.mugshotPhotos = JSON.parse(this.tempMugshotPhotos);
            }
            this.wsStatusInterval = setInterval(() => {
                if (this.ws.status() === 1) {
                    clearInterval(this.wsStatusInterval);
                    if (this.isWebcam()) {
                        this.buildWebcam();
                        this.stopPreview();
                        this.startPreview();
                    }
                    else {
                        this.open();
                        this.applyCameraSettings();
                        this.stopPreview();
                        this.startPreview();
                    }
                }
            }, 1000);
            this.ws.componentSocket.addEventListener("message", (event) => {
                const data = JSON.parse(event.data);
                if (data.action === "session-data") {
                    this.backendSession = data.session;
                }
                if (["session-data-stored", "session-data-cleared"].includes(data.status)) {
                    this.backendSession = undefined;
                    this.emitLoadInformation();
                    const checkSessionInterval = setInterval(() => {
                        if (this.backendSession && this.backendSession.data.length === this.mugshotPhotos.length) {
                            clearInterval(checkSessionInterval);
                            this.showLoader = false;
                        }
                    }, 200);
                }
            });
            this.ws.deviceSocket.addEventListener("message", (event) => {
                const data = JSON.parse(event.data);
                if (data.status === "initialized") {
                    this.deviceReady = true;
                }
                if (data.flashCharge) {
                    this.flashCharge = data.flashCharge;
                }
                const deviceStatuses = data.deviceStatuses;
                if (deviceStatuses && !deviceStatuses.face.initialized) {
                    notify(this.componentContainer, "error", "Dispositivo desconectado!");
                }
                if (data.previewImage) {
                    showImage(this.canvas, data.previewImage);
                }
                else if (data.originalImage) {
                    this.isCapturing = false;
                    const dataImage = data.originalImage;
                    showImage(this.canvas, undefined);
                    showImage(this.canvas, dataImage);
                    this.originalImage = data.originalImage;
                    this.model = data.deviceInfo.modelName;
                    this.brand = data.deviceInfo.manufacturName;
                    this.serial = data.deviceInfo.serialNumber;
                    this.anomaly = 0;
                    this.saveMugshotPhoto();
                }
            });
            this.showLoader = false;
        }, 1000);
    }
    componentDidUnload() {
        this.stopPreview();
    }
    setMugshotsFromBackendSession() {
        const checkSessionInterval = setInterval(() => {
            if (this.backendSession) {
                clearInterval(checkSessionInterval);
                const captureData = this.backendSession.mugshots.map((item) => {
                    return {
                        data: item.data,
                        index: item.index,
                        description: item.description,
                        brand: item.brand,
                        model: item.model,
                        serial: item.serial
                    };
                });
                this.mugshotPhotos = captureData;
            }
        }, 200);
    }
    findSetting(settings, name) {
        return settings.find((setting) => {
            return setting.field === name;
        });
    }
    clearImages() {
        showImage(this.canvas, "");
    }
    close() {
        this.payload.action = "close";
        this.ws.respondToDeviceWS(this.payload);
    }
    getWebcam() {
        navigator.getUserMedia({ video: true, audio: false }, (stream) => {
            this.video.srcObject = stream;
            this.track = stream.getTracks()[0];
        }, (e) => {
            console.error(e);
        });
    }
    startPreview() {
        if (this.isCapturing)
            return;
        this.clearImages();
        this.isCapturing = true;
        if (this.isWebcam()) {
            return this.getWebcam();
        }
        this.payload.action = "start";
        this.ws.respondToDeviceWS(this.payload);
    }
    stopPreview() {
        this.isCapturing = false;
        if (this.isWebcam()) {
            if (this.track) {
                this.track.stop();
            }
            return this.buildWebcam();
        }
        this.payload.action = "stop";
        this.ws.respondToDeviceWS(this.payload);
    }
    capture() {
        if (this.isWebcam()) {
            const dataImage = this.canvas.toDataURL('image/png');
            const base64 = dataImage.split(',')[1];
            this.originalImage = base64;
            this.stopPreview();
            return this.saveMugshotPhoto();
        }
        this.showLoader = true;
        this.stopPreview();
        this.payload.action = "capture";
        this.payload.data = {
            crop: this.crop,
            segmentation: this.segmentation
        };
        this.ws.respondToDeviceWS(this.payload);
    }
    setCameraValue(event) {
        const name = event.target.name;
        const value = event.target.value;
        this[name] = parseInt(value);
        this.updateCameraSettings();
        this.payload.action = "camera-properties";
        this.payload.data = {
            property: name,
            value: value
        };
        this.ws.respondToDeviceWS(this.payload);
    }
    increaseZoom() {
        this.payload.action = "increase-zoom";
        this.ws.respondToDeviceWS(this.payload);
    }
    decreaseZoom() {
        this.payload.action = "decrease-zoom";
        this.ws.respondToDeviceWS(this.payload);
    }
    updateCameraSettings() {
        const tempCameraSettings = {
            shutterSpeed: this.shutterSpeed,
            isoValue: this.isoValue,
            flashProperty: this.flashProperty,
            flashWidth: this.flashWidth,
            imageFormat: this.imageFormat,
            whiteBalance: this.whiteBalance,
        };
        saveCameraSettings(tempCameraSettings);
    }
    setFeature(event) {
        this[event.target.name] = event.target.checked;
    }
    emitLoadInformation() {
        this.payload.action = "component-opened";
        this.payload.data = {
            type: "mugshot"
        };
        const checkStatusInterval = setInterval(() => {
            if (this.ws.componentSocket.readyState === 1) {
                clearInterval(checkStatusInterval);
                this.ws.respondToComponentWS(this.payload);
            }
        }, 200);
    }
    sendBiometryInformation(mugshot) {
        this.payload.action = "store-session";
        this.payload.data = {
            type: "MUGSHOT",
            owner: "default-user",
            biometry: mugshot
        };
        this.ws.respondToDeviceWS(this.payload);
    }
    activeTabClass(num) {
        return this.tab === num ? "is-active" : "";
    }
    setActiveTab(num) {
        this.tab = num;
        this.componentContainer.forceUpdate();
    }
    isActiveTab(tab) {
        return this.tab === tab ? "is-flex" : "is-hidden";
    }
    setSelection(event) {
        const name = event.target.name;
        const value = event.target.value;
        this[name] = parseInt(value);
    }
    async saveMugshotPhoto() {
        const localization = await getLocalization();
        console.log(localization);
        this.showLoader = true;
        const mugshotStructure = {
            photo: this.originalImage,
            index: this.mugshotIndex,
            description: this.mugshotDescription,
            model: this.model,
            serial: this.serial,
            brand: this.brand,
            data: this.originalImage,
            localization
        };
        if (!this.detached) {
            const saveMugshotResult = await saveMugshotPhoto({
                personId: this.person.id,
                mugshot: mugshotStructure
            });
            await this.storeCapturedMugshot(saveMugshotResult);
        }
        else {
            if (!this.isTagComponent)
                this.sendBiometryInformation(mugshotStructure);
            await this.storeCapturedMugshot(mugshotStructure);
        }
        notify(this.componentContainer, "success", "Imagem salva com sucesso!");
        this.mugshotIndex = 0;
        this.mugshotDescription = "";
        this.showLoader = false;
    }
    storeCapturedMugshot(saveMugshotResult) {
        const { id, data, index, description, brand, model, serial, localization } = saveMugshotResult;
        this.mugshotPhotos.push({
            id,
            data,
            index,
            description,
            brand,
            model,
            serial,
            localization
        });
    }
    acceptData() {
        this.payload.action = "close-component";
        this.payload.data = {
            type: "mugshot",
            owner: "default-user"
        };
        this.ws.respondToDeviceWS(this.payload);
    }
    handleChange(event) {
        this[event.target.name] = event.target.value;
    }
    async deleteMugshotPhoto(id, index = null) {
        try {
            if (!this.detached) {
                await deleteMugshotPhoto(id);
                const photoIndex = this.mugshotPhotos.findIndex((item) => item.id === id);
                this.mugshotPhotos.splice(photoIndex, 1);
            }
            else {
                this.mugshotPhotos.splice(index, 1);
                await this.clearSessionData();
                await this.updateSessionData();
            }
            this.componentContainer.forceUpdate();
        }
        catch (error) {
            console.log(error);
        }
    }
    clearSessionData() {
        this.payload.action = "session-clear-data";
        this.payload.data = {
            type: "MUGSHOT",
            owner: "default-user"
        };
        this.ws.respondToComponentWS(this.payload);
    }
    updateSessionData() {
        this.mugshotPhotos.forEach((mp) => {
            this.sendBiometryInformation(mp);
        });
    }
    render() {
        const shutterSpeedOptions = (this.cameraSettingsOptions.shutterSpeedOptions || []).map((option) => {
            const key = Object.keys(option)[0];
            return (h("option", { value: option[key], selected: this.shutterSpeed === option[key] }, key));
        });
        const isoOptions = (this.cameraSettingsOptions.isoValueOptions || []).map((option) => {
            const key = Object.keys(option)[0];
            return (h("option", { value: option[key], selected: this.isoValue === option[key] }, key));
        });
        const whiteBalanceOptions = (this.cameraSettingsOptions.whiteBalanceOptions || []).map((option) => {
            const key = Object.keys(option)[0];
            return (h("option", { value: option[key], selected: this.whiteBalance === option[key] }, key));
        });
        const flashPropertyOptions = (this.cameraSettingsOptions.flashPropertyOptions || []).map((option) => {
            const key = Object.keys(option)[0];
            return (h("option", { value: option[key], selected: this.flashProperty === option[key] }, key));
        });
        const formatOptions = (this.cameraSettingsOptions.imageFormatOptions || []).map((option) => {
            const key = Object.keys(option)[0];
            return (h("option", { value: option[key], selected: this.imageFormat === option[key] }, key));
        });
        const flashWidthOptions = (this.cameraSettingsOptions.flashWidthOptions || []).map((option) => {
            const key = Object.keys(option)[0];
            return (h("option", { value: option[key], selected: this.flashWidth === option[key] }, key));
        });
        const apertureOptions = (this.cameraSettingsOptions.apertureOptions || []).map((option) => {
            const key = Object.keys(option)[0];
            return (h("option", { value: option[key], selected: this.aperture === option[key] }, key));
        });
        const mugshotPhotos = (this.mugshotPhotos || []).map((item, index) => {
            return (h("div", { class: "column" },
                h("div", { class: "button-hover" },
                    h("a", { class: "button is-small is-pulled-left action-button mugshot-remove-photo-button", onClick: () => this.deleteMugshotPhoto(item.id, index) }, "REMOVER")),
                h("div", { class: "mugshot-photo is-light" },
                    h("img", { src: `data:image/charset=UTF-8;png;base64,${item.data || item.output}` })),
                h("div", { class: "has-text-left" },
                    h("div", { class: "mugshot-photo-label" },
                        h("strong", null, "Index:"),
                        " ",
                        item.index || 'Desconhecido'),
                    h("div", { class: "mugshot-photo-label" },
                        h("strong", null, "Descri\u00E7\u00E3o:"),
                        " ",
                        item.description || 'Não informada'))));
        });
        return (h("div", { class: "window-size" },
            h("loader-component", { enabled: this.showLoader }),
            h("div", { id: "notification-container" }),
            h("div", { class: "tabs is-left is-boxed" },
                h("ul", null,
                    h("li", { class: this.activeTabClass(0) },
                        h("a", { onClick: () => this.setActiveTab(0) },
                            h("span", { class: "tab-title" }, "Captura"))),
                    h("li", { class: this.activeTabClass(2) },
                        h("a", { onClick: () => this.setActiveTab(2) },
                            h("span", { class: "tab-title" }, "Resultado final"))),
                    this.allowConfiguration ?
                        h("li", { class: this.activeTabClass(3) },
                            h("a", { onClick: () => this.setActiveTab(3) },
                                h("span", { class: "tab-title" }, "Configura\u00E7\u00F5es"))) : null)),
            h("div", { class: `columns is-mobile ${this.isActiveTab(0)}` },
                h("div", { class: "column is-one-third" },
                    h("div", { class: "device-status-container" },
                        h("h6", { class: "title is-7" },
                            "ESTADO DO DISPOSITIVO: ",
                            this.deviceReady ? 'PRONTO' : 'NÃO CARREGADO'),
                        h("progress", { class: "progress is-small", value: this.flashCharge, max: "100" }),
                        h("div", { class: "mugshot-form" },
                            h("form", null,
                                h("label", null,
                                    "Indice/Refer\u00EAncia:",
                                    h("br", null),
                                    h("input", { class: "input is-small", type: "number", value: this.mugshotIndex, name: "mugshotIndex", onInput: (event) => this.handleChange(event) })),
                                h("label", null,
                                    "Descri\u00E7\u00E3o:",
                                    h("br", null),
                                    h("input", { class: "input is-small", type: "text", value: this.mugshotDescription, name: "mugshotDescription", onInput: (event) => this.handleChange(event) })))))),
                h("div", { class: "column text-align-left" },
                    h("canvas", { width: "460", height: "300", class: "canvas", ref: el => {
                            this.canvas = el;
                            if (!this.isCapturing && this.originalImage) {
                                showImage(this.canvas, undefined);
                                showImage(this.canvas, this.originalImage);
                            }
                        } }),
                    h("div", { class: "columns is-mobile action-buttons-container" },
                        h("div", { class: "column" },
                            h("a", { class: `button is-small is-pulled-left action-button ${this.isCapturing ? "disabled" : ""}`, onClick: () => this.startPreview() }, "INICIAR PREVIEW")),
                        h("div", { class: "column has-text-centered" },
                            h("a", { class: "button is-small is-pulled-right action-button", onClick: () => this.capture() }, "CAPTURAR")),
                        this.detached && !this.isTagComponent ? h("div", { class: "column has-text-centered" },
                            h("a", { class: "button is-small is-pulled-right action-button", onClick: () => this.acceptData() }, "FINALIZAR")) : null))),
            this.tab === tabs.RESULT ? h("div", { class: "tab-content" },
                h("div", { class: "columns" },
                    h("div", { class: "column has-text-centered preview-result" },
                        this.originalImage ? h("img", { src: `${BASE64_IMAGE}${this.originalImage}` }) : null,
                        h("hr", null),
                        h("div", { class: "has-text-centered mugshot-preview-result" },
                            h("div", { class: "columns is-multiline" }, mugshotPhotos))))) : null,
            this.tab === tabs.VALIDATION ? h("div", null) : null,
            this.tab === tabs.CONFIG ? h("div", { class: "tab-content" },
                h("div", { class: "columns is-mobile settings-container" },
                    h("div", { class: "column" },
                        h("div", { class: "field" },
                            h("label", { class: "label" }, "Velocidade do Obturador"),
                            h("div", { class: "control" },
                                h("div", { class: "select is-small inline" },
                                    h("select", { onChange: this.setCameraValue.bind(this), name: "shutterSpeed" },
                                        h("option", { value: "0" }, "SELECIONE UMA OP\u00C7\u00C3O"),
                                        shutterSpeedOptions)))),
                        h("div", { class: "field" },
                            h("label", { class: "label" }, "ISO"),
                            h("div", { class: "control" },
                                h("div", { class: "select is-small inline" },
                                    h("select", { onChange: this.setCameraValue.bind(this), name: "isoValue" },
                                        h("option", { value: "0" }, "SELECIONE UMA OP\u00C7\u00C3O"),
                                        isoOptions)))),
                        h("div", { class: "field" },
                            h("label", { class: "label" }, "Abertura"),
                            h("div", { class: "select is-small inline" },
                                h("select", { onChange: this.setCameraValue.bind(this), name: "aperture" },
                                    h("option", { value: "0" }, "SELECIONE UMA OP\u00C7\u00C3O"),
                                    apertureOptions)))),
                    h("div", { class: "column" },
                        h("div", { class: "field" },
                            h("label", { class: "label" }, "Balan\u00E7o de Branco"),
                            h("div", { class: "select is-small inline" },
                                h("select", { onChange: this.setCameraValue.bind(this), name: "whiteBalance" },
                                    h("option", { value: "0" }, "SELECIONE UMA OP\u00C7\u00C3O"),
                                    whiteBalanceOptions))),
                        h("div", { class: "field" },
                            h("label", { class: "label" }, "Formato"),
                            h("div", { class: "select is-small inline" },
                                h("select", { onChange: this.setCameraValue.bind(this), name: "imageFormat" },
                                    h("option", { value: "0" }, "SELECIONE UMA OP\u00C7\u00C3O"),
                                    formatOptions)))),
                    h("div", { class: "column" },
                        h("div", { class: "field" },
                            h("label", { class: "label" }, "Status do Flash"),
                            h("div", { class: "select is-small inline" },
                                h("select", { onChange: this.setCameraValue.bind(this), name: "flashProperty" },
                                    h("option", { value: "0" }, "SELECIONE UMA OP\u00C7\u00C3O"),
                                    flashPropertyOptions))),
                        h("div", { class: "field" },
                            h("label", { class: "label" }, "Abertura do Flash"),
                            h("div", { class: "select is-small inline" },
                                h("select", { onChange: this.setCameraValue.bind(this), name: "flashWidth" },
                                    h("option", { value: "0" }, "SELECIONE UMA OP\u00C7\u00C3O"),
                                    flashWidthOptions))))),
                h("hr", null),
                h("div", { class: "columns" },
                    h("div", { class: "column has-text-left" },
                        h("div", null,
                            h("label", { class: "label" }, "Controle de Zoom")),
                        h("a", { class: "button is-small action-button", style: { 'margin-right': '10px' }, onClick: this.increaseZoom.bind(this) }, "Zoom +"),
                        h("a", { class: "button is-small action-button", onClick: this.decreaseZoom.bind(this) }, "Zoom -")))) : null));
    }
    static get is() { return "openbio-mugshot-details"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "allowConfiguration": {
            "type": "Any",
            "attr": "allow-configuration"
        },
        "anomaly": {
            "state": true
        },
        "anomalyOptions": {
            "state": true
        },
        "aperture": {
            "state": true
        },
        "autoCapture": {
            "state": true
        },
        "backendSession": {
            "state": true
        },
        "brand": {
            "state": true
        },
        "cameraSettingsOptions": {
            "state": true
        },
        "capturedData": {
            "state": true
        },
        "centerLineLocationRatio": {
            "state": true
        },
        "componentContainer": {
            "elementRef": true
        },
        "crop": {
            "state": true
        },
        "croppedImage": {
            "state": true
        },
        "detached": {
            "type": Boolean,
            "attr": "detached"
        },
        "deviceReady": {
            "state": true
        },
        "eyeAxisLocationRatio": {
            "state": true
        },
        "eyeAxysAngle": {
            "state": true
        },
        "eyeSeparation": {
            "state": true
        },
        "flashCharge": {
            "state": true
        },
        "flashProperty": {
            "state": true
        },
        "flashWidth": {
            "state": true
        },
        "imageFormat": {
            "state": true
        },
        "isCapturing": {
            "state": true
        },
        "isoValue": {
            "state": true
        },
        "isTagComponent": {
            "type": Boolean,
            "attr": "is-tag-component"
        },
        "model": {
            "state": true
        },
        "mugshotDescription": {
            "state": true
        },
        "mugshotIndex": {
            "state": true
        },
        "mugshotPhotos": {
            "state": true
        },
        "originalImage": {
            "state": true
        },
        "poseAnglePitch": {
            "state": true
        },
        "poseAngleYaw": {
            "state": true
        },
        "rightOrLeftEyeClosed": {
            "state": true
        },
        "segmentation": {
            "state": true
        },
        "segmentedImage": {
            "state": true
        },
        "serial": {
            "state": true
        },
        "showLoader": {
            "state": true
        },
        "shutterSpeed": {
            "state": true
        },
        "tab": {
            "state": true
        },
        "tempMugshotPhotos": {
            "type": "Any",
            "attr": "temp-mugshot-photos"
        },
        "tempPerson": {
            "type": "Any",
            "attr": "temp-person"
        },
        "track": {
            "state": true
        },
        "video": {
            "state": true
        },
        "whiteBalance": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:openbio-mugshot-details:**/"; }
}
