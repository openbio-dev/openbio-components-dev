import WS from '../../utils/websocket';
import { setFace } from '../../store/main.store';
import { getAnomalies, getCameraSettingsOptions, getCameraSettings, saveCameraSettings, saveFace, getFaceSettings } from "./api";
import { showImage } from '../../utils/canvas';
import { notify } from '../../utils/notifier';
import constants from "../../utils/constants";
import changeDPI from "changedpi";
import { getAppConfig } from '../../utils/api';
import { getLocalization } from '../../utils/utils';
const EYE_AXIS_LOCATION_RATIO = "Eye Axis Location Ratio";
const CENTER_LINE_LOCATION_RATIO = "Centerline Location Ratio";
const EYE_SEPARATION_SCORE = "Eye Separation Score";
const OFF_ANGLE_GAZE = "Off-Angle Gaze";
const EYE_AXIS_ANGLE = "Eye Axis Angle";
const POSE_ANGLE_YAW = "Pose-Angle Yaw";
const RIGHT_EYE_CLOSED = "Right Eye Closed";
const LEFT_EYE_CLOSED = "Left Eye Closed";
const BASE64_IMAGE = 'data:image/charset=UTF-8;png;base64,';
const EMPTY_IMAGE = undefined;
const FACE_TEMPLATE = './assets/face/face-template.png';
const UNPLUGGED_ERROR = -201;
const NO_FACE_DETECTED_ERROR = -50;
var tabs;
(function (tabs) {
    tabs[tabs["PREVIEW"] = 0] = "PREVIEW";
    tabs[tabs["VALIDATION"] = 1] = "VALIDATION";
    tabs[tabs["RESULT"] = 2] = "RESULT";
    tabs[tabs["CONFIG"] = 3] = "CONFIG";
})(tabs || (tabs = {}));
const evaluationList = [
    EYE_AXIS_LOCATION_RATIO,
    CENTER_LINE_LOCATION_RATIO,
    EYE_SEPARATION_SCORE,
    OFF_ANGLE_GAZE,
    EYE_AXIS_ANGLE,
    POSE_ANGLE_YAW,
    RIGHT_EYE_CLOSED,
    LEFT_EYE_CLOSED
];
function orderEyes(a, b) {
    if (a.x > b.x) {
        return -1;
    }
    if (a.x < b.x) {
        return 1;
    }
    return 0;
}
export class OpenbioFaceComponent {
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
            data: undefined,
            doEvaluate: true,
        };
        this.keysForEvaluate = new Map();
        this.deviceReady = false;
        this.eyeAxisLocationRatio = '...';
        this.centerLineLocationRatio = '...';
        this.eyeSeparation = '...';
        this.offAngleGaze = '...';
        this.eyeAxysAngle = '...';
        this.poseAngleYaw = '...';
        this.rightOrLeftEyeClosed = '...';
        this.originalImage = EMPTY_IMAGE;
        this.croppedImage = EMPTY_IMAGE;
        this.segmentedImage = EMPTY_IMAGE;
        this.autoCaptureCount = 0;
        this.autoCapturing = false;
        this.autoCaptureInterval = null;
        this.dpiValue = 0;
        this.flashCharge = 0;
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
        this.face = {
            originalImage: "",
            croppedImage: "",
            segmentedImage: "",
        };
        this.validation = {
            background: "",
            brightness: "",
            eyeAxisAngle: "",
            eyeAxisLocationRatio: "",
            eyeSeparation: "",
            glasses: "",
            heightWidthRatio: "",
            poseAngleYaw: "",
            saturation: "",
            sharpness: "",
            smile: "",
        };
        this.backendSession = undefined;
        this.showLoader = false;
        this.cameraPresetOptions = {
            presetNames: [],
            presetValues: {}
        };
        this.flashProperty = 0;
        this.flashWidth = 0;
        this.aperture = 0;
        this.shutterSpeed = 0;
        this.imageFormat = 0;
        this.isoValue = 0;
        this.whiteBalance = 0;
        this.preset = 0;
        this.previewSize = 2;
        this.previewType = 2;
        this.isCapturing = false;
        this.model = '';
        this.brand = '';
        this.serial = '';
        this.video = undefined;
        this.track = undefined;
        this.allowConfiguration = false;
        this.showPreviewTemplate = true;
        this.manualEyeSelection = {
            enabled: false,
            eyes: [],
        };
        this.faceDetected = true;
        this.deviceStatus = false;
        this.shallCapture = false;
        this.evaluations = [];
        this.keysForEvaluate.set(EYE_AXIS_LOCATION_RATIO, { message: this.eyeAxisLocationRatioMessage.bind(this) });
        this.keysForEvaluate.set(CENTER_LINE_LOCATION_RATIO, { message: this.centerLineLocationRatioMessage.bind(this) });
        this.keysForEvaluate.set(EYE_SEPARATION_SCORE, { message: this.eyeSeparationMessage.bind(this) });
        this.keysForEvaluate.set(OFF_ANGLE_GAZE, { message: this.offAngleGazeMessage.bind(this) });
        this.keysForEvaluate.set(EYE_AXIS_ANGLE, { message: this.eyeAxysAngleMessage.bind(this) });
        this.keysForEvaluate.set(POSE_ANGLE_YAW, { message: this.poseAngleYawMessage.bind(this) });
        this.keysForEvaluate.set(RIGHT_EYE_CLOSED, { message: this.rightEyeClosedMessage.bind(this) });
        this.keysForEvaluate.set(LEFT_EYE_CLOSED, { message: this.leftEyeClosedMessage.bind(this) });
    }
    clearManualEyeSelection() {
        this.manualEyeSelection.eyes = [];
        this.componentContainer.forceUpdate();
    }
    toggleManualEyeSelection() {
        this.manualEyeSelection.enabled = !this.manualEyeSelection.enabled;
        if (this.manualEyeSelection.enabled) {
            this.canvas.addEventListener("mousedown", (e) => {
                if (!this.manualEyeSelection.enabled || this.manualEyeSelection.eyes.length === 2) {
                    return;
                }
                this.manualEyeSelection.eyes.push({ x: e.offsetX, y: e.offsetY });
                if (this.manualEyeSelection.eyes.length === 2) {
                    if (this.manualEyeSelection.eyes[0].x === this.manualEyeSelection.eyes[1].x && this.manualEyeSelection.eyes[0].y === this.manualEyeSelection.eyes[1].y) {
                        this.manualEyeSelection.eyes.splice(1, 1);
                    }
                    else {
                        this.manualEyeSelection.enabled = false;
                        this.manualEyeSelection.eyes.sort(orderEyes);
                    }
                }
                this.componentContainer.forceUpdate();
            });
        }
        else {
            this.canvas.removeEventListener("mousedown", (e) => {
                if (!this.manualEyeSelection.enabled || this.manualEyeSelection.eyes.length === 2) {
                    return;
                }
                this.manualEyeSelection.eyes.push({ x: e.offsetX, y: e.offsetY });
                if (this.manualEyeSelection.eyes.length === 2) {
                    if (this.manualEyeSelection.eyes[0].x === this.manualEyeSelection.eyes[1].x && this.manualEyeSelection.eyes[0].y === this.manualEyeSelection.eyes[1].y) {
                        this.manualEyeSelection.eyes.splice(1, 1);
                    }
                    else {
                        this.manualEyeSelection.enabled = false;
                        this.manualEyeSelection.eyes.sort(orderEyes);
                    }
                }
                this.componentContainer.forceUpdate();
            });
        }
        this.componentContainer.forceUpdate();
    }
    cropWithEyesCoords() {
        this.showLoader = true;
        this.stopPreview();
        this.payload.action = "crop-with-eyes-coords";
        this.payload.data = {
            crop: this.crop,
            segmentation: this.segmentation,
            eyes: this.manualEyeSelection.eyes,
        };
        this.ws.respondToDeviceWS(this.payload);
    }
    eyeAxisLocationRatioMessage(status) {
        let message;
        if (status === "OK")
            message = status;
        else
            message = status === "Fail Low" ? "Mova a cabeça para cima" : "Mova a cabeça para baixo";
        this.eyeAxisLocationRatio = message;
    }
    centerLineLocationRatioMessage(status) {
        let message;
        if (status === "OK")
            message = status;
        else
            message = status === "Fail Low" ? "Mova a cabeça para esquerda" : "Mova a cabeça para direita";
        this.centerLineLocationRatio = message;
    }
    eyeSeparationMessage(score) {
        this.eyeSeparation = 3.827 * score > 120 ? "OK" : "Aproxime-se da câmera";
    }
    offAngleGazeMessage(status) {
        let message;
        if (status === "OK")
            message = status;
        else
            message = "Olhe para a câmera";
        this.offAngleGaze = message;
    }
    eyeAxysAngleMessage(status) {
        let message;
        if (status === "OK")
            message = status;
        else
            message = status === "Fail Low" ? "Gire a cabeça sentido anti-horário" : "Gire a cabeça sentido horário";
        this.eyeAxysAngle = message;
    }
    poseAngleYawMessage(status) {
        let message;
        if (status === "OK")
            message = status;
        else
            message = status === "Fail Low" ? "Gire o rosto para esquerda" : "Gire o rosto para direita";
        this.poseAngleYaw = message;
    }
    rightEyeClosedMessage(status) {
        const message = status === "Fail Low" ? "Abra os olhos" : "OK";
        this.rightOrLeftEyeClosed = message;
    }
    leftEyeClosedMessage(status) {
        const message = status === "Fail Low" ? "Abra os olhos" : "OK";
        this.rightOrLeftEyeClosed = message;
    }
    setEvaluateMessageFor(type, status) {
        if (this.keysForEvaluate.get(type)) {
            this.keysForEvaluate.get(type).message(status);
        }
    }
    checkInvalidEvaluations() {
        return this.evaluations.find((result) => (result[0] !== "Eye Separation Score" && result[1] !== "OK") || (result[0] === "Eye Separation Score" && result[1] * 3.827 < 120));
    }
    tryAutoCapture() {
        if (this.originalImage || this.checkInvalidEvaluations()) {
            this.resetAutoCapturing();
            return;
        }
        this.autoCapturing = true;
        if (!this.autoCaptureInterval) {
            this.autoCaptureInterval = setInterval(() => {
                if (this.checkInvalidEvaluations() || this.originalImage || !this.shallCapture) {
                    this.resetAutoCapturing();
                    return;
                }
                else if (this.shallCapture) {
                    if (Math.floor(this.autoCaptureCount) === 3) {
                        clearInterval(this.autoCaptureInterval);
                        this.autoCaptureInterval = null;
                        this.capture();
                    }
                    else {
                        this.autoCaptureCount += 0.01;
                    }
                }
            }, 10);
        }
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
            'previewSize',
            'previewType',
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
        this.flashProperty = cameraSettings.flash_property;
        this.flashWidth = cameraSettings.flash_width;
        this.shutterSpeed = cameraSettings.shutter_speed;
        this.imageFormat = cameraSettings.image_format;
        this.isoValue = cameraSettings.iso_value;
        this.whiteBalance = cameraSettings.white_balance;
        this.preset = cameraSettings.preset;
        this.previewSize = cameraSettings.previewSize || 2;
        this.previewType = cameraSettings.previewType || 2;
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
    resetAutoCapturing() {
        this.autoCapturing = false;
        this.autoCaptureCount = 0;
        this.shallCapture = false;
        if (this.autoCaptureInterval) {
            clearInterval(this.autoCaptureInterval);
            this.autoCaptureInterval = null;
        }
        this.componentContainer.forceUpdate();
    }
    async componentDidLoad() {
        this.showLoader = true;
        this.anomalyOptions = await getAnomalies(constants.anomalyTypes.FACE_ANOMALY, !!this.detached);
        this.fetchCurrentCameraSettings();
        const faceSettings = await getFaceSettings();
        this.crop = faceSettings.crop;
        this.segmentation = faceSettings.segmentation;
        this.autoCapture = faceSettings.autoCapture;
        this.dpiValue = constants.dpiValue[faceSettings.dpiOption] || 0;
        this.cameraPresetOptions = faceSettings.cameraPresetOptions;
        this.payload.deviceName = faceSettings.device ? constants.device[faceSettings.device] : constants.device.AKYSCAM;
        const serviceConfigs = await getAppConfig();
        if (serviceConfigs) {
            this.allowConfiguration = serviceConfigs.tools.allowDeviceConfiguration;
            this.showPreviewTemplate = serviceConfigs.face.showPreviewTemplate;
            this.componentContainer.forceUpdate();
        }
        if (this.detached && this.isTagComponent) {
            const _this = this;
            window["getBiometryData"] = function () {
                return _this.face;
            };
            if (this.tempFace) {
                this.face = JSON.parse(this.tempFace);
                this.originalImage = this.face.originalImage;
                this.croppedImage = this.face.croppedImage;
                this.segmentedImage = this.face.segmentedImage;
            }
        }
        else if (this.detached) {
            this.emitLoadInformation();
            const checkSessionInterval = setInterval(() => {
                if (this.backendSession) {
                    clearInterval(checkSessionInterval);
                    this.originalImage = this.backendSession.photo;
                }
            }, 200);
        }
        else {
            this.person = JSON.parse(this.tempPerson);
            this.face = JSON.parse(this.tempFace);
        }
        this.wsStatusInterval = setInterval(() => {
            if (this.ws.status() === 1) {
                clearInterval(this.wsStatusInterval);
                if (this.isWebcam()) {
                    this.buildWebcam();
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
        });
        this.ws.deviceSocket.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            if (data.status === "initialized") {
                if (data.deviceInfo.ready) {
                    this.deviceReady = true;
                }
                else {
                    notify(this.componentContainer, "error", `Dispositivo sem ${!data.deviceInfo.serialNumber ? "serial number" : "part number"}`);
                }
            }
            if (data.status === "session-data-stored") {
                this.backendSession = undefined;
                this.emitLoadInformation();
                const checkSessionInterval = setInterval(() => {
                    if (this.backendSession && this.backendSession.photo) {
                        clearInterval(checkSessionInterval);
                        this.showLoader = false;
                    }
                }, 200);
            }
            if (data.status === "settings-applied") {
                this.startPreview();
            }
            if (data.flashCharge) {
                this.flashCharge = data.flashCharge;
            }
            const deviceStatuses = data.deviceStatuses;
            if (deviceStatuses) {
                const previousStatus = JSON.parse(JSON.stringify(this.deviceStatus));
                this.deviceStatus = deviceStatuses.face && deviceStatuses.face.initialized;
                if (!this.deviceStatus) {
                    notify(this.componentContainer, "error", "Dispositivo desconectado!");
                    this.resetAutoCapturing();
                    return;
                }
                else if (!previousStatus && this.deviceStatus) {
                }
            }
            const evaluation = data.evaluation;
            if (evaluation && evaluation !== UNPLUGGED_ERROR) {
                this.shallCapture = true;
                if (["capture", "crop-with-eyes-coords"].includes(data.action)) {
                    this.validation.background = evaluation["Background Type Score"];
                    this.validation.brightness = evaluation["Brightness Score"];
                    this.validation.centerlineLocationRatio = evaluation["Centerline Location Ratio"];
                    this.validation.eyeAxisAngle = evaluation["Eye Axis Angle"];
                    this.validation.eyeAxisLocationRatio = evaluation["Eye Axis Location Ratio"];
                    this.validation.eyeSeparation = evaluation["Eye Separation"];
                    this.validation.glasses = evaluation["Glasses"];
                    this.validation.poseAngleYaw = evaluation["Pose-Angle Yaw"];
                    this.validation.saturation = evaluation["Facial Saturation"];
                    this.validation.sharpness = evaluation["Sharpness"];
                    this.validation.smile = evaluation["Smile"];
                }
                const evaluateEntries = Object.entries(evaluation);
                this.evaluations = evaluateEntries.filter((result) => evaluationList.includes(result[0]));
                if (this.autoCapture && !this.autoCapturing) {
                    this.tryAutoCapture();
                }
                this.evaluations.forEach((evaluate) => {
                    this.setEvaluateMessageFor(evaluate[0], evaluate[1]);
                });
            }
            else if (data.status === NO_FACE_DETECTED_ERROR) {
                this.resetAutoCapturing();
                clearInterval(this.autoCaptureInterval);
                this.autoCaptureInterval = null;
            }
            if (data.previewImage) {
                showImage(this.canvas, data.previewImage, null, null, this.manualEyeSelection);
            }
            else if (data.originalImage) {
                this.isCapturing = false;
                this.resetAutoCapturing();
                if (this.crop && data.cropResultCode !== 0) {
                    showImage(this.canvas, undefined, null, null, this.manualEyeSelection);
                    showImage(this.canvas, data.originalImage, null, null, this.manualEyeSelection);
                    this.originalImage = data.originalImage;
                    this.croppedImage = data.originalImage;
                    this.segmentedImage = data.originalImage;
                    this.showLoader = false;
                    this.faceDetected = false;
                    notify(this.componentContainer, "error", "Face não detectada. Refaça a foto ou tente marcar os olhos manualmente!", 6000);
                }
                else {
                    const dataImage = data.segmentedImage || data.croppedImage || data.originalImage;
                    showImage(this.canvas, undefined, null, null, this.manualEyeSelection);
                    showImage(this.canvas, dataImage, null, null, this.manualEyeSelection);
                    this.originalImage = data.originalImage;
                    this.croppedImage = data.croppedImage;
                    this.segmentedImage = data.segmentedImage;
                    this.model = data.deviceInfo.modelName;
                    this.brand = data.deviceInfo.manufacturName;
                    this.serial = data.deviceInfo.serialNumber;
                    this.saveFace();
                    this.setActiveTab(1);
                }
            }
        });
        this.showLoader = false;
    }
    componentDidUnload() {
        this.stopPreview();
    }
    findSetting(settings, name) {
        return settings.find((setting) => {
            return setting.field === name;
        });
    }
    clearImages() {
        this.originalImage = EMPTY_IMAGE;
        this.croppedImage = EMPTY_IMAGE;
        this.segmentedImage = EMPTY_IMAGE;
        showImage(this.canvas, EMPTY_IMAGE, null, null, this.manualEyeSelection);
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
    startPreview(backToPreview = false) {
        if (this.isCapturing)
            return;
        this.clearImages();
        this.isCapturing = true;
        this.faceDetected = true;
        this.clearManualEyeSelection();
        this.manualEyeSelection.enabled = false;
        if (this.isWebcam()) {
            return this.getWebcam();
        }
        if (this.autoCapture) {
            this.autoCaptureCount = 0;
            clearInterval(this.autoCaptureInterval);
            this.autoCaptureInterval = null;
        }
        this.payload.action = "start";
        this.payload.doEvaluate = this.autoCapture;
        this.ws.respondToDeviceWS(this.payload);
        if (backToPreview) {
            this.setActiveTab(0);
        }
    }
    restartPreview() {
        this.stopPreview();
        this.startPreview();
    }
    stopPreview() {
        this.isCapturing = false;
        if (this.isWebcam()) {
            this.track.stop();
            return this.buildWebcam();
        }
        this.payload.action = "stop";
        this.ws.respondToDeviceWS(this.payload);
    }
    capture(manual = false) {
        if (manual) {
            this.resetAutoCapturing();
        }
        this.stopPreview();
        this.showLoader = true;
        if (this.isWebcam()) {
            const dataImage = this.canvas.toDataURL('image/png');
            const base64 = dataImage.split(',')[1];
            this.originalImage = base64;
            this.stopPreview();
            return this.saveFace();
        }
        this.showLoader = true;
        this.payload.action = "capture";
        this.payload.data = {
            crop: this.crop,
            segmentation: this.segmentation
        };
        this.ws.respondToDeviceWS(this.payload);
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
    setCameraValue(event) {
        this.stopPreview();
        this.preset = 0;
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
            segmentation: this.segmentation,
            autoCapture: this.autoCapture,
            preset: this.preset
        };
        saveCameraSettings(tempCameraSettings);
    }
    setFeature(event) {
        this[event.target.name] = event.target.checked;
        if (event.target.name === "autoCapture") {
            this.stopPreview();
            this.startPreview();
        }
        this.updateCameraSettings();
    }
    acceptData() {
        this.payload.action = "close-component";
        this.payload.data = {
            type: "face",
            owner: "default-user"
        };
        this.ws.respondToDeviceWS(this.payload);
    }
    emitLoadInformation() {
        this.payload.action = "component-opened";
        this.payload.data = {
            type: "face"
        };
        const checkStatusInterval = setInterval(() => {
            if (this.ws.componentSocket.readyState === 1) {
                clearInterval(checkStatusInterval);
                this.ws.respondToComponentWS(this.payload);
            }
        }, 200);
    }
    sendBiometryInformation(face) {
        this.payload.action = "store-session";
        this.payload.data = {
            type: "FACE",
            owner: "default-user",
            biometry: face
        };
        this.ws.respondToDeviceWS(this.payload);
    }
    activeTabClass(num) {
        let classes = this.tab === num ? "is-active" : "";
        if ((num === tabs.VALIDATION || num === tabs.RESULT) && !this.originalImage) {
            classes += ` disabled`;
        }
        return classes;
    }
    setActiveTab(num) {
        if (num === tabs.PREVIEW && this.isWebcam()) {
            setTimeout(() => {
                this.restartPreview();
            }, 1000);
        }
        if ((num === tabs.VALIDATION || num === tabs.RESULT) && !this.originalImage) {
            return;
        }
        this.tab = num;
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
        this.saveFace();
    }
    async saveFace() {
        const localization = await getLocalization();
        let croppedImage = "";
        let originalImage = "";
        let segmentedImage = "";
        if (this.croppedImage) {
            if (this.dpiValue) {
                croppedImage = changeDPI.changeDpiDataUrl(`data:image/png;base64,${this.croppedImage}`, this.dpiValue).split(",")[1];
            }
            else {
                croppedImage = this.croppedImage;
            }
        }
        if (this.originalImage) {
            if (this.dpiValue) {
                originalImage = changeDPI.changeDpiDataUrl(`data:image/png;base64,${this.originalImage}`, this.dpiValue).split(",")[1];
            }
            else {
                originalImage = this.originalImage;
            }
        }
        if (this.segmentedImage) {
            if (this.dpiValue) {
                segmentedImage = changeDPI.changeDpiDataUrl(`data:image/png;base64,${this.segmentedImage}`, this.dpiValue).split(",")[1];
            }
            else {
                segmentedImage = this.segmentedImage;
            }
        }
        const face = {
            id: this.face.id ? this.face.id : null,
            data: croppedImage,
            originalImage,
            segmentedImage,
            anomalyId: this.anomaly ? this.anomaly : null,
            model: this.model,
            serial: this.serial,
            brand: this.brand,
            localization,
        };
        this.clearManualEyeSelection();
        this.manualEyeSelection.enabled = false;
        this.faceDetected = true;
        if (!this.detached) {
            const saveFaceResult = await saveFace({
                personId: this.person.id,
                face: face
            });
            await this.storeCapturedFace({
                id: saveFaceResult.id,
                data: saveFaceResult.cropped_data,
                originalImage: saveFaceResult.original_data,
                segmentedImage: saveFaceResult.segmented_data,
                anomalyId: saveFaceResult.original_data.anomaly_id,
                model: saveFaceResult.model,
                serial: saveFaceResult.serial,
                brand: saveFaceResult.brand,
                localization
            });
            this.showLoader = false;
        }
        else {
            if (!this.isTagComponent)
                this.sendBiometryInformation(face);
            await this.storeCapturedFace(face);
        }
        notify(this.componentContainer, "success", "Captura realizada com sucesso");
    }
    storeCapturedFace(saveFaceResult) {
        this.anomaly = 0;
        this.face.id = saveFaceResult.id;
        this.face.originalImage = saveFaceResult.originalImage;
        this.face.croppedImage = saveFaceResult.data;
        this.face.segmentedImage = saveFaceResult.segmentedImage;
        this.face.anomalyId = saveFaceResult.anomalyId;
        this.face.model = saveFaceResult.model;
        this.face.serial = saveFaceResult.serial;
        this.face.brand = saveFaceResult.brand;
        this.face.localization = saveFaceResult.localization;
        setFace(this.face);
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
        const anomalyOptions = (this.anomalyOptions || []).map((option) => {
            return (h("option", { value: option.id, selected: this.anomaly === option.id }, option.name));
        });
        return (h("div", { class: "window-size" },
            h("loader-component", { enabled: this.showLoader }),
            h("div", { id: "notification-container" }),
            h("div", { class: "tabs is-left is-boxed" },
                h("ul", null,
                    h("li", { class: this.activeTabClass(0) },
                        h("a", { onClick: () => this.setActiveTab(0) },
                            h("span", { class: "tab-title" }, "Captura"))),
                    h("li", { class: this.activeTabClass(1) },
                        h("a", { onClick: () => this.setActiveTab(1) },
                            h("span", { class: "tab-title" }, "Valida\u00E7\u00E3o"))),
                    h("li", { class: this.activeTabClass(2) },
                        h("a", { onClick: () => this.setActiveTab(2) },
                            h("span", { class: "tab-title" }, "Resultado final"))),
                    h("li", { class: this.activeTabClass(3) },
                        h("a", { onClick: () => this.setActiveTab(3) },
                            h("span", { class: "tab-title" }, "Configura\u00E7\u00F5es"))))),
            this.tab === tabs.PREVIEW ? h("div", { class: "columns is-mobile" },
                h("div", { class: "column is-one-quarter" },
                    h("div", { class: "device-status-container" },
                        h("h6", { class: "title is-7" },
                            "ESTADO DO DISPOSITIVO: ",
                            this.deviceReady ? 'PRONTO' : 'NÃO CARREGADO'),
                        h("progress", { class: "progress is-small", value: this.flashCharge, max: "100" })),
                    this.autoCapture && !this.originalImage ?
                        h("div", { class: "evaluation" },
                            h("hr", { style: { margin: "10px 0 10px 0" } }),
                            h("div", null,
                                h("h6", { class: "is-7" }, this.autoCapturing ? "Auto captura iniciada" : "Verifique os itens abaixo para iniciar a auto-captura")),
                            h("hr", { style: { margin: "10px 0 20px 0" } }),
                            h("div", { class: "info" },
                                h("div", null,
                                    h("strong", null, "POSI\u00C7\u00C3O DA FACE")),
                                h("span", null,
                                    "status: ",
                                    this.eyeAxisLocationRatio)),
                            h("div", { class: "info" },
                                h("div", null,
                                    h("strong", null, "DIRE\u00C7\u00C3O DA FACE")),
                                h("span", null,
                                    "status: ",
                                    this.centerLineLocationRatio)),
                            h("div", { class: "info" },
                                h("div", null,
                                    h("strong", null, "PROXIMIDADE")),
                                h("span", null,
                                    "status: ",
                                    this.eyeSeparation)),
                            h("div", { class: "info" },
                                h("div", null,
                                    h("strong", null, "DIRE\u00C7\u00C3O DOS OLHOS")),
                                h("span", null,
                                    "status: ",
                                    this.offAngleGaze)),
                            h("div", { class: "info" },
                                h("div", null,
                                    h("strong", null, "ANGLO DA FACE")),
                                h("span", null,
                                    "status: ",
                                    this.eyeAxysAngle)),
                            h("div", { class: "info" },
                                h("div", null,
                                    h("strong", null, "INCLINA\u00C7\u00C3O DA FACE")),
                                h("span", null,
                                    "status: ",
                                    this.poseAngleYaw)),
                            h("div", { class: "info" },
                                h("div", null,
                                    h("strong", null, "SITUA\u00C7\u00C3O DOS OLHOS")),
                                h("span", null,
                                    "status: ",
                                    this.rightOrLeftEyeClosed))) : null),
                h("div", { class: "column text-align-left", style: { maxWidth: '486px' } },
                    this.autoCapturing ?
                        h("div", { class: "overlay" },
                            h("span", null,
                                " ",
                                3 - Math.floor(this.autoCaptureCount),
                                " ")) : null,
                    this.isCapturing && this.showPreviewTemplate && !this.autoCapturing ? h("div", { class: this.isWebcam() ? "face-template" : "face-template-akyscam" },
                        h("img", { src: `${FACE_TEMPLATE}` })) : null,
                    h("canvas", { width: "460", height: "300", class: `canvas`, ref: el => {
                            this.canvas = el;
                            if (!this.isCapturing && this.originalImage) {
                                showImage(this.canvas, undefined, null, null, this.manualEyeSelection);
                                showImage(this.canvas, this.segmentedImage || this.croppedImage || this.originalImage, null, null, this.manualEyeSelection);
                            }
                        } }),
                    h("div", { class: "columns is-mobile anomaly-buttons-container" },
                        h("div", { class: "column" },
                            h("div", { class: "select is-small inline is-pulled-left" },
                                h("select", { onChange: this.setSelection.bind(this), name: "anomaly" },
                                    h("option", { value: undefined }, "ESCOLHA EM CASO DE ANOMALIA"),
                                    anomalyOptions))),
                        h("div", { class: "column" },
                            h("a", { class: "button is-small is-pulled-right", onClick: () => this.saveAnomaly() }, "SALVAR ANOMALIA")))),
                h("div", { class: "columns is-mobile action-buttons-container" },
                    h("span", null,
                        " ",
                        this.manualEyeSelection.enabled,
                        " "),
                    h("div", { class: "column has-text-left" },
                        h("div", { class: "is-full" },
                            h("img", { src: "./assets/general/image-search-outline.png", class: `fab-icon  is-pulled-left ${this.isCapturing ? "disabled" : ""} `, onClick: () => this.restartPreview() }),
                            h("span", { class: "icon-text" }, " Pr\u00E9-visualiza\u00E7\u00E3o ")),
                        h("div", { class: "is-full" },
                            h("img", { src: "./assets/general/camera.png", class: "fab-icon is-pulled-left", onClick: () => this.capture(true) }),
                            h("span", { class: "icon-text" }, " Capturar ")),
                        !this.faceDetected ? h("hr", null) : null,
                        !this.faceDetected ?
                            h("div", { class: "is-full" },
                                h("img", { src: "./assets/general/eye-outline.png", title: "Clique aqui para ativar e desativar o modo de sele\u00E7\u00E3o de olhos", class: `fab-icon is-pulled-left ${this.manualEyeSelection.enabled ? "fab-icon-active" : ""}`, onClick: () => this.toggleManualEyeSelection() }),
                                h("span", { class: "icon-text" }, " Marcar olhos ")) : null,
                        !this.faceDetected ?
                            h("div", { class: "is-full" },
                                h("img", { src: "./assets/general/camera-retake-outline.png", title: "Clique aqui para tentar novamente a detec\u00E7\u00E3o de face atrav\u00E9s da marca\u00E7\u00E3o manual de olhos", class: `fab-icon is-pulled-left ${this.manualEyeSelection.eyes.length === 2 ? "" : "disabled"}`, onClick: () => this.cropWithEyesCoords() }),
                                h("span", { class: "icon-text" }, " Validar marca\u00E7\u00E3o ")) : null,
                        !this.faceDetected ?
                            h("div", { class: "is-full" },
                                h("img", { src: "./assets/general/eye-minus-outline.png", title: "Clique para limpar a marca\u00E7\u00E3o de olhos", class: `fab-icon is-pulled-left ${this.manualEyeSelection.eyes.length > 0 ? "" : "disabled"}`, onClick: () => this.clearManualEyeSelection() }),
                                h("span", { class: "icon-text" }, " Limpar olhos ")) : null,
                        this.detached && !this.isTagComponent ?
                            h("div", { class: "is-full" },
                                h("img", { src: "./assets/general/check.png", class: "fab-icon is-pulled-left", onClick: () => this.acceptData() }),
                                h("span", { class: "icon-text" }, " Finalizar ")) : null))) : null,
            this.tab === tabs.VALIDATION ?
                h("div", { class: "columns is-mobile" },
                    h("div", { class: "column is-4", style: { height: '280px', marginTop: '6%' } },
                        h("openbio-face-validation-box-component", { detached: this.detached, leftIcon: false, status: this.validation.centerlineLocationRatio, type: "centerlineLocationRatio", typeTitle: "Enquadramento" }),
                        h("openbio-face-validation-box-component", { detached: this.detached, leftIcon: false, status: this.validation.brightness, type: "brightness", typeTitle: "Brilho" }),
                        h("openbio-face-validation-box-component", { detached: this.detached, leftIcon: false, status: this.validation.saturation, type: "saturation", typeTitle: "Satura\u00E7\u00E3o" }),
                        h("openbio-face-validation-box-component", { detached: this.detached, leftIcon: false, status: this.validation.sharpness, type: "sharpness", typeTitle: "N\u00EDtidez" }),
                        h("openbio-face-validation-box-component", { detached: this.detached, leftIcon: false, status: this.validation.background, type: "background", typeTitle: "Fundo" })),
                    h("div", { class: "column" },
                        h("div", { class: "has-text-centered preview-result", style: { paddingTop: '5px' } },
                            h("img", { src: `${BASE64_IMAGE}${this.segmentedImage || this.croppedImage || this.originalImage}` })),
                        h("div", { class: "columns is-mobile", style: { marginTop: "-25px" } },
                            h("div", { class: "column is-narrow", style: { transform: "translate(24px, 0)" } },
                                h("div", { class: "is-pulled-left" },
                                    h("img", { src: "./assets/general/camera-retake-outline.png", title: "Clique aqui para tirar uma nova foto.", class: `fab-icon is-pulled-left ${this.isCapturing ? "disabled" : ""} `, style: { transform: "translate(24px, 0)" }, onClick: () => this.startPreview(true) }),
                                    h("br", null),
                                    h("span", { style: { padding: '6px', display: 'inline-block' } }, " Nova foto "))),
                            this.detached && !this.isTagComponent ?
                                h("div", { class: "column is-narrow", style: { transform: "translate(70px, 0)" } },
                                    h("div", { class: "is-pulled-right" },
                                        h("img", { src: "./assets/general/check.png", class: "fab-icon", style: { float: 'right !important', transform: "translate(17px, 0)" }, onClick: () => this.acceptData() }),
                                        h("br", null),
                                        h("span", { style: { paddingLeft: '7px', display: 'inline-block' } }, " Finalizar "))) : null)),
                    h("div", { class: "column is-4", style: { marginTop: '3%' } },
                        h("openbio-face-validation-box-component", { detached: this.detached, leftIcon: true, status: this.validation.poseAngleYaw, type: "poseAngleYaw", typeTitle: "Alinhamento esquerda-direita" }),
                        h("openbio-face-validation-box-component", { detached: this.detached, leftIcon: true, status: this.validation.eyeAxisLocationRatio, type: "eyeAxisLocationRatio", typeTitle: "Alinhamento cima-baixo" }),
                        h("openbio-face-validation-box-component", { detached: this.detached, leftIcon: true, status: this.validation.eyeAxisAngle, type: "eyeAxisAngle", typeTitle: "\u00C2ngulo" }),
                        h("openbio-face-validation-box-component", { detached: this.detached, leftIcon: true, status: this.validation.smile, type: "smile", typeTitle: "Boca" }),
                        h("openbio-face-validation-box-component", { detached: this.detached, leftIcon: true, status: this.validation.glasses, type: "glasses", typeTitle: "\u00D3culos" }),
                        h("openbio-face-validation-box-component", { detached: this.detached, leftIcon: true, status: this.validation.eyeSeparation, type: "eyeSeparation", typeTitle: "Olhos" })))
                : null,
            this.tab === tabs.RESULT ? h("div", { class: "tab-content" },
                h("div", { class: "columns" },
                    h("div", { class: "column has-text-centered preview-result" },
                        h("img", { src: `${BASE64_IMAGE}${this.detached ? this.originalImage : (this.face.originalImage || this.originalImage)}` })),
                    h("div", { class: "column has-text-centered preview-result" },
                        h("img", { src: `${BASE64_IMAGE}${this.detached ? this.croppedImage : (this.face.croppedImage || this.croppedImage)}` })),
                    h("div", { class: "column has-text-centered preview-result" },
                        h("img", { src: `${BASE64_IMAGE}${this.detached ? this.segmentedImage : (this.face.segmentedImage || this.segmentedImage)}` }))),
                h("p", null, this.face.anomalyId ? this.anomalyOptions.find((anomaly) => { return anomaly.id === this.face.anomalyId; }).name : "")) : null,
            this.tab === tabs.CONFIG ? h("div", { class: "tab-content" },
                h("div", { class: "columns is-mobile settings-container" },
                    this.allowConfiguration ?
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
                                        apertureOptions)))) : null,
                    this.allowConfiguration ?
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
                                        formatOptions)))) : null,
                    this.allowConfiguration ?
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
                                        flashWidthOptions)))) : null,
                    h("div", { class: "column" },
                        h("div", { class: "field" },
                            h("label", { class: "label" }, "Presets"),
                            h("div", { class: "select is-small inline" },
                                h("select", { onChange: this.setPresetValues.bind(this), name: "preset" },
                                    h("option", { value: "0" }, "SELECIONE UMA OP\u00C7\u00C3O"),
                                    presetOptions))))),
                this.allowConfiguration ?
                    h("div", { class: "columns" },
                        h("div", { class: "column" },
                            h("label", { class: "checkbox" },
                                h("input", { type: "checkbox", checked: this.segmentation, onChange: this.setFeature.bind(this), name: "segmentation" }),
                                "SEGMENTA\u00C7\u00C3O"),
                            h("label", { class: "checkbox" },
                                h("input", { type: "checkbox", checked: this.autoCapture, onChange: this.setFeature.bind(this), name: "autoCapture" }),
                                "CAPTURA AUTOM\u00C1TICA"))) : null,
                h("hr", null),
                this.allowConfiguration ?
                    h("div", { class: "columns" },
                        h("div", { class: "column has-text-left" },
                            h("div", null,
                                h("label", { class: "label" }, "Controle de Zoom")),
                            h("a", { class: "button is-small action-button", style: { 'margin-right': '10px' }, onClick: this.increaseZoom.bind(this) }, "Zoom +"),
                            h("a", { class: "button is-small action-button", onClick: this.decreaseZoom.bind(this) }, "Zoom -"))) : null) : null));
    }
    static get is() { return "openbio-face"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "allowConfiguration": {
            "state": true
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
        "autoCaptureCount": {
            "state": true
        },
        "autoCaptureInterval": {
            "state": true
        },
        "autoCapturing": {
            "state": true
        },
        "backendSession": {
            "state": true
        },
        "brand": {
            "state": true
        },
        "cameraPresetOptions": {
            "state": true
        },
        "cameraSettingsOptions": {
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
        "deviceStatus": {
            "state": true
        },
        "dpiValue": {
            "state": true
        },
        "evaluations": {
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
        "face": {
            "state": true
        },
        "faceDetected": {
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
        "manualEyeSelection": {
            "state": true
        },
        "model": {
            "state": true
        },
        "offAngleGaze": {
            "state": true
        },
        "originalImage": {
            "state": true
        },
        "poseAngleYaw": {
            "state": true
        },
        "preset": {
            "state": true
        },
        "previewSize": {
            "state": true
        },
        "previewType": {
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
        "shallCapture": {
            "state": true
        },
        "showLoader": {
            "state": true
        },
        "showPreviewTemplate": {
            "state": true
        },
        "shutterSpeed": {
            "state": true
        },
        "tab": {
            "state": true
        },
        "tempFace": {
            "type": "Any",
            "attr": "temp-face"
        },
        "tempPerson": {
            "type": "Any",
            "attr": "temp-person"
        },
        "track": {
            "state": true
        },
        "validation": {
            "state": true
        },
        "video": {
            "state": true
        },
        "whiteBalance": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:openbio-face:**/"; }
}
