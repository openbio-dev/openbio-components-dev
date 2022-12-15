import { h } from '@stencil/core';
import WS from '../../utils/websocket';
import { TranslationUtils } from '../../locales/translation';
// import { setMugshot } from '../../store/main.store';
import { getCameraSettingsOptions, getCameraSettings, saveCameraSettings, saveMugshotPhoto, deleteMugshotPhoto, getFaceSettings, } from "./api";
import { showImage } from '../../utils/canvas';
import { notify } from '../../utils/notifier';
import constants from "../../utils/constants";
import { getLocalization } from '../../utils/utils';
import { getAppConfig, getCameraPresets, saveServiceTime } from '../../utils/api';
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
        // private gammaTables: number;
        this.person = {
            id: 0
        };
        this.payload = {
            deviceName: constants.device.AKYSCAM,
            deviceType: "face",
            devicePosition: 0,
            action: undefined,
            data: undefined,
            doEvaluate: true,
            file: undefined,
            fileOptions: undefined,
            module: "face",
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
        this.rawImage = EMPTY_IMAGE;
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
        this.serviceConfigs = undefined;
        this.deviceStatus = false;
        this.showCameraConfiguration = true;
        this.serviceTime = {
            start: new Date().getTime(),
            hasCapture: false,
        };
        this.cameraPresetOptions = {
            presetNames: [],
            presetValues: {}
        };
        this.preset = 0;
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
            'aperture',
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
        this.aperture = cameraSettings.aperture;
        this.preset = cameraSettings.preset;
    }
    setPresetValues(event) {
        const value = parseInt(event.target.value);
        if (value) {
            this.preset = value;
            const presetSettings = this.cameraPresetOptions.presetValues[this.preset];
            for (const property in presetSettings) {
                this[property] = parseInt(presetSettings[property]);
            }
        }
        this.updateCameraSettings();
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
            this.serviceConfigs = await getAppConfig();
            if (this.serviceConfigs) {
                this.allowConfiguration = this.serviceConfigs.ui.allowDeviceConfiguration;
                this.showCameraConfiguration = this.serviceConfigs.ui.showCameraConfiguration;
                this.componentContainer.forceUpdate();
            }
            const faceSettings = await getFaceSettings();
            this.payload.deviceName = faceSettings.device ? constants.device[faceSettings.device] : constants.device.AKYSCAM;
            this.cameraPresetOptions = await getCameraPresets();
            this.crop = false;
            this.autoCapture = false;
            this.segmentation = false;
            if (this.detached && this.isTagComponent) {
                // Not implemented
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
                if (data.status === "settings-applied") {
                    this.startPreview();
                }
                const deviceStatuses = data.deviceStatuses;
                if (deviceStatuses) {
                    const previousStatus = JSON.parse(JSON.stringify(this.deviceStatus));
                    this.deviceStatus = deviceStatuses.face && deviceStatuses.face.initialized;
                    if (!this.deviceStatus) {
                        // notify(this.componentContainer, "error", "Dispositivo desconectado!");
                        return;
                    }
                    else if (!previousStatus && this.deviceStatus) {
                        this.applyCameraSettings();
                        this.stopPreview();
                        this.startPreview();
                        return;
                    }
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
                    this.rawImage = data.rawImage;
                    this.anomaly = 0;
                    this.serviceTime.hasCapture = true;
                    this.saveMugshotPhoto();
                }
            });
            this.showLoader = false;
        }, 1000);
    }
    componentDidUnload() {
        this.stopPreview();
        if (!this.detached && this.serviceTime.hasCapture) {
            saveServiceTime("MUGSHOT", new Date().getTime() - this.serviceTime.start, this.person.id);
        }
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
        if (!this.serviceConfigs.mugshot.useFlash) {
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
            aperture: this.aperture,
            preset: this.preset,
        };
        saveCameraSettings(tempCameraSettings);
    }
    setFeature(event) {
        this[event.target.name] = event.target.checked;
        if (event.target.name === "flashProperty") {
            event.target.value = event.target.checked ? 1 : 0;
            this.payload.action = "camera-properties";
            this.payload.data = {
                property: event.target.name,
                value: event.target.value
            };
            this.ws.respondToDeviceWS(this.payload);
            this.stopPreview();
        }
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
        let localization = undefined;
        if (this.serviceConfigs && this.serviceConfigs.tools.geolocationService) {
            localization = await getLocalization();
        }
        this.showLoader = true;
        const mugshotStructure = {
            photo: this.originalImage,
            rawImage: this.rawImage,
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
        notify(this.componentContainer, "success", this.translations.IMAGE_SAVE_SUCCESS);
        this.mugshotIndex = 0;
        this.mugshotDescription = "";
        this.showLoader = false;
    }
    storeCapturedMugshot(saveMugshotResult) {
        const { id, data, index, description, brand, model, serial, localization } = saveMugshotResult;
        const existentIndex = this.mugshotPhotos.findIndex((mugshot) => mugshot.mugshotIndex === index);
        const newMugshot = {
            id,
            data,
            index,
            description,
            brand,
            model,
            serial,
            localization
        };
        if (existentIndex >= 0) {
            this.mugshotPhotos[existentIndex] = newMugshot;
        }
        else {
            this.mugshotPhotos.push(newMugshot);
        }
    }
    acceptData() {
        this.stopPreview();
        this.payload.action = "close-component";
        this.payload.data = {
            type: "mugshot",
            owner: "default-user" // #TODO replace this with a authenticated user
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
        const presetOptions = (this.cameraSettingsOptions.presetOptions || []).map((option) => {
            const key = this.cameraPresetOptions.presetNames[option];
            return (h("option", { value: option, selected: this.preset === option }, key));
        });
        const mugshotPhotos = (this.mugshotPhotos || []).map((item, index) => {
            return (h("div", { class: "column" },
                h("div", { class: "button-hover" },
                    h("a", { class: "button is-small is-pulled-left action-button mugshot-remove-photo-button", onClick: () => this.deleteMugshotPhoto(item.id, index) }, this.translations.REMOVE)),
                h("div", { class: "mugshot-photo is-light" },
                    h("img", { src: `data:image/charset=UTF-8;png;base64,${item.data || item.output}` })),
                h("div", { class: "has-text-left" },
                    h("div", { class: "mugshot-photo-label" },
                        h("strong", null,
                            this.translations.INDEX,
                            ":"),
                        " ",
                        item.index || this.translations.UNKNOWN),
                    h("div", { class: "mugshot-photo-label" },
                        h("strong", null,
                            this.translations.DESCRIPTION,
                            ":"),
                        " ",
                        item.description || this.translations.NOT_INFORMED))));
        });
        return (h("div", { class: "window-size" },
            h("loader-component", { enabled: this.showLoader }),
            h("div", { id: "notification-container" }),
            h("div", { class: "tabs is-left is-boxed" },
                h("ul", null,
                    h("li", { class: this.activeTabClass(0) },
                        h("a", { onClick: () => this.setActiveTab(0) },
                            h("span", { class: "tab-title" }, this.translations.CAPTURE))),
                    h("li", { class: this.activeTabClass(2) },
                        h("a", { onClick: () => this.setActiveTab(2) },
                            h("span", { class: "tab-title" }, this.translations.FINAL_RESULT))),
                    this.allowConfiguration ?
                        h("li", { class: this.activeTabClass(3) },
                            h("a", { onClick: () => this.setActiveTab(3) },
                                h("span", { class: "tab-title" }, this.translations.SETTINGS))) : null,
                    this.showCameraConfiguration ?
                        h("li", { class: this.activeTabClass(tabs.CONFIG) },
                            h("a", { onClick: () => this.setActiveTab(tabs.CONFIG) },
                                h("span", { class: "tab-title" }, this.translations.SETTINGS))) : null)),
            h("div", { class: `columns is-mobile ${this.isActiveTab(0)}` },
                h("div", { class: "column is-one-third" },
                    h("div", { class: "device-status-container" },
                        h("h6", { class: "title is-7" },
                            this.translations.DEVICE_STATUS.toUpperCase(),
                            ": ",
                            this.deviceReady ? this.translations.READY.toUpperCase() : this.translations.NOT_LOADED.toUpperCase()),
                        h("progress", { class: "progress is-small", value: this.flashCharge, max: "100" }),
                        h("label", { class: "checkbox" },
                            h("input", { type: "checkbox", checked: this.flashProperty == 1, onChange: this.setFeature.bind(this), name: "flashProperty" }),
                            this.translations.USE_FLASH.toUpperCase()),
                        this.serviceConfigs && (this.serviceConfigs.mugshot.help.guideImage || this.serviceConfigs.mugshot.help.content) ?
                            h("help-component", { src: this.serviceConfigs.mugshot.help.guideImage, "help-text": this.serviceConfigs.mugshot.help.content }) : null,
                        h("div", { class: "mugshot-form" },
                            h("form", null,
                                h("label", null,
                                    this.translations.INDEX_REFERENCE,
                                    ":",
                                    h("br", null),
                                    h("input", { class: "input is-small", type: "number", value: this.mugshotIndex, name: "mugshotIndex", onInput: (event) => this.handleChange(event) })),
                                h("label", null,
                                    this.translations.DESCRIPTION,
                                    ":",
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
                            h("a", { class: `button is-small is-pulled-left action-button ${this.isCapturing ? "disabled" : ""}`, onClick: () => this.startPreview() }, this.translations.PREVIEW_INIT.toUpperCase())),
                        h("div", { class: "column has-text-centered" },
                            h("a", { class: "button is-small is-pulled-right action-button", onClick: () => this.capture() }, this.translations.MAKE_CAPTURE.toUpperCase())),
                        this.detached && !this.isTagComponent ? h("div", { class: "column has-text-centered" },
                            h("a", { class: "button is-small is-pulled-right action-button", onClick: () => this.acceptData() }, this.translations.FINISH.toUpperCase())) : null))),
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
                            h("label", { class: "label" }, this.translations.SHUTTER_SPEED),
                            h("div", { class: "control" },
                                h("div", { class: "select is-small inline" },
                                    h("select", { onChange: this.setCameraValue.bind(this), name: "shutterSpeed" },
                                        h("option", { value: "0" }, this.translations.SELECT_OPTION.toUpperCase()),
                                        shutterSpeedOptions)))),
                        h("div", { class: "field" },
                            h("label", { class: "label" }, this.translations.ISO.toUpperCase()),
                            h("div", { class: "control" },
                                h("div", { class: "select is-small inline" },
                                    h("select", { onChange: this.setCameraValue.bind(this), name: "isoValue" },
                                        h("option", { value: "0" }, this.translations.SELECT_OPTION.toUpperCase()),
                                        isoOptions)))),
                        h("div", { class: "field" },
                            h("label", { class: "label" }, this.translations.APERTURE.toUpperCase()),
                            h("div", { class: "control" },
                                h("div", { class: "select is-small inline" },
                                    h("select", { onChange: this.setCameraValue.bind(this), name: "aperture" },
                                        h("option", { value: "0" }, this.translations.SELECT_OPTION.toUpperCase()),
                                        apertureOptions))))),
                    h("div", { class: "column" },
                        h("div", { class: "field" },
                            h("label", { class: "label" }, this.translations.WHITE_BALANCE.toUpperCase()),
                            h("div", { class: "select is-small inline" },
                                h("select", { onChange: this.setCameraValue.bind(this), name: "whiteBalance" },
                                    h("option", { value: "0" }, this.translations.SELECT_OPTION.toUpperCase()),
                                    whiteBalanceOptions))),
                        h("div", { class: "field" },
                            h("label", { class: "label" }, this.translations.FORMAT.toUpperCase()),
                            h("div", { class: "select is-small inline" },
                                h("select", { onChange: this.setCameraValue.bind(this), name: "imageFormat" },
                                    h("option", { value: "0" }, this.translations.SELECT_OPTION.toUpperCase()),
                                    formatOptions)))),
                    h("div", { class: "column" },
                        h("div", { class: "field" },
                            h("label", { class: "label" }, this.translations.FLASH_STATUS.toUpperCase()),
                            h("div", { class: "select is-small inline" },
                                h("select", { onChange: this.setCameraValue.bind(this), name: "flashProperty" },
                                    h("option", { value: "0" }, this.translations.SELECT_OPTION.toUpperCase()),
                                    flashPropertyOptions))),
                        h("div", { class: "field" },
                            h("label", { class: "label" }, this.translations.FLASH_APERTURE.toUpperCase()),
                            h("div", { class: "select is-small inline" },
                                h("select", { onChange: this.setCameraValue.bind(this), name: "flashWidth" },
                                    h("option", { value: "0" }, this.translations.SELECT_OPTION.toUpperCase()),
                                    flashWidthOptions)))),
                    h("div", { class: "column" },
                        h("div", { class: "field" },
                            h("label", { class: "label" }, this.translations.PRESETS.toUpperCase()),
                            h("div", { class: "select is-small inline" },
                                h("select", { onChange: this.setPresetValues.bind(this), name: "preset" },
                                    h("option", { value: "0" }, this.translations.SELECT_OPTION.toUpperCase()),
                                    presetOptions))))),
                h("hr", null),
                h("div", { class: "columns" },
                    h("div", { class: "column has-text-left" },
                        h("div", null,
                            h("label", { class: "label" }, this.translations.ZOOM_CONTROL)),
                        h("a", { class: "button is-small action-button", style: { 'margin-right': '10px' }, onClick: this.increaseZoom.bind(this) }, this.translations.ZOOM_PLUS),
                        h("a", { class: "button is-small action-button", onClick: this.decreaseZoom.bind(this) }, this.translations.ZOOM_MINUS)))) : null));
    }
    static get is() { return "openbio-mugshot-details"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["openbio-mugshot-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["openbio-mugshot-component.css"]
    }; }
    static get properties() { return {
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
        "isTagComponent": {
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
            "attribute": "is-tag-component",
            "reflect": false
        },
        "tempPerson": {
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
            "attribute": "temp-person",
            "reflect": false
        },
        "tempMugshotPhotos": {
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
            "attribute": "temp-mugshot-photos",
            "reflect": false
        },
        "allowConfiguration": {
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
            "attribute": "allow-configuration",
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
        "capturedData": {},
        "deviceReady": {},
        "eyeAxisLocationRatio": {},
        "centerLineLocationRatio": {},
        "eyeSeparation": {},
        "poseAnglePitch": {},
        "eyeAxysAngle": {},
        "poseAngleYaw": {},
        "rightOrLeftEyeClosed": {},
        "originalImage": {},
        "croppedImage": {},
        "segmentedImage": {},
        "rawImage": {},
        "crop": {},
        "segmentation": {},
        "autoCapture": {},
        "flashCharge": {},
        "mugshotIndex": {},
        "mugshotDescription": {},
        "mugshotPhotos": {},
        "cameraSettingsOptions": {},
        "tab": {},
        "anomalyOptions": {},
        "anomaly": {},
        "backendSession": {},
        "showLoader": {},
        "flashProperty": {},
        "flashWidth": {},
        "aperture": {},
        "shutterSpeed": {},
        "imageFormat": {},
        "isoValue": {},
        "whiteBalance": {},
        "isCapturing": {},
        "model": {},
        "brand": {},
        "serial": {},
        "video": {},
        "track": {},
        "serviceConfigs": {},
        "deviceStatus": {},
        "showCameraConfiguration": {},
        "serviceTime": {},
        "translations": {},
        "cameraPresetOptions": {},
        "preset": {}
    }; }
    static get elementRef() { return "componentContainer"; }
    static get watchers() { return [{
            "propName": "locale",
            "methodName": "listenLocale"
        }]; }
}
