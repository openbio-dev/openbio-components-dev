import { getFlowOptions, getAnomalies, saveFingers, getModalSettings, getPeople, fingerAuthenticate } from "./api";
import { setFingers } from '../../store/main.store';
import { showImage } from '../../utils/canvas';
import { notify } from '../../utils/notifier';
import { getAppConfig } from '../../utils/api';
import constants from "../../utils/constants";
import WS from '../../utils/websocket';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import { getLocalization } from '../../utils/utils';
var flowTypes;
(function (flowTypes) {
    flowTypes[flowTypes["FLOW_TYPE_TEN_FLAT_CAPTURES"] = 0] = "FLOW_TYPE_TEN_FLAT_CAPTURES";
    flowTypes[flowTypes["FLOW_TYPE_TEN_ROLLED_CAPTURES"] = 1] = "FLOW_TYPE_TEN_ROLLED_CAPTURES";
    flowTypes[flowTypes["FLOW_TYPE_FIVE_FLAT_CAPTURES"] = 2] = "FLOW_TYPE_FIVE_FLAT_CAPTURES";
    flowTypes[flowTypes["FLOW_TYPE_THREE_FLAT_CAPTURES"] = 3] = "FLOW_TYPE_THREE_FLAT_CAPTURES";
    flowTypes[flowTypes["FLOW_TYPE_SEQUENCE_CONTROL_CAPTURE"] = 4] = "FLOW_TYPE_SEQUENCE_CONTROL_CAPTURE";
    flowTypes[flowTypes["FLOW_TYPE_TWO_FLAT_SEQUENCE_CONTROL_CAPTURE"] = 5] = "FLOW_TYPE_TWO_FLAT_SEQUENCE_CONTROL_CAPTURE";
    flowTypes[flowTypes["FLOW_TYPE_FOUR_FLAT_SEQUENCE_CONTROL_CAPTURE"] = 6] = "FLOW_TYPE_FOUR_FLAT_SEQUENCE_CONTROL_CAPTURE";
    flowTypes[flowTypes["FLOW_TYPE_PINCH"] = 7] = "FLOW_TYPE_PINCH";
})(flowTypes || (flowTypes = {}));
var captureType;
(function (captureType) {
    captureType[captureType["ONE_FINGER_FLAT"] = 0] = "ONE_FINGER_FLAT";
    captureType[captureType["TWO_FINGER_FLAT"] = 1] = "TWO_FINGER_FLAT";
    captureType[captureType["ROLLED_FINGER"] = 2] = "ROLLED_FINGER";
    captureType[captureType["FOUR_FINGER_FLAT"] = 3] = "FOUR_FINGER_FLAT";
})(captureType || (captureType = {}));
const EMPTY_IMAGE = '';
const flatFlowTypes = [
    flowTypes.FLOW_TYPE_TEN_FLAT_CAPTURES,
    flowTypes.FLOW_TYPE_THREE_FLAT_CAPTURES,
    flowTypes.FLOW_TYPE_FIVE_FLAT_CAPTURES
];
const flatCaptureTypes = [
    captureType.ONE_FINGER_FLAT,
    captureType.TWO_FINGER_FLAT,
    captureType.FOUR_FINGER_FLAT
];
const UNMATCH_MESSAGE = 'Captura não condiz com dedo capturado anteriormente, por favor tente novamente';
const REPEAT_MESSAGE = 'Este dedo já foi capturado, por favor tente novamente';
const SMEAR_MESSAGE = 'Captura borrada, por favor tente novamente';
const NFIQ_QUALITY_MESSAGE = 'Qualidade da captura inferior ao permitido. Por favor tente novamente';
const ERROR_MESSAGE = 'Ocorreu um erro, por favor tente novamente';
export class OpenbioFingerComponent {
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
        this.person = {
            id: 0
        };
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
        this.capturedData = null;
        this.originalImage = EMPTY_IMAGE;
        this.deviceReady = false;
        this.nfiqScore = 0;
        this.captureType = 0;
        this.stepPhase = 0;
        this.flowType = 0;
        this.currentRollingStatus = 0;
        this.currentStatusLineX = 0;
        this.flowOptions = [];
        this.anomalyOptions = [];
        this.currentFingerNames = [];
        this.currentFingerSequence = [];
        this.fingerSequence = [];
        this.fingers = [];
        this.tab = 0;
        this.backendSession = undefined;
        this.disabledControls = false;
        this.modalSettings = {};
        this.unmatchCount = 0;
        this.repeatedCount = 0;
        this.smearCount = 0;
        this.badNfiqQualityCount = 0;
        this.model = '';
        this.brand = '';
        this.serial = '';
        this.opened = false;
        this.editingId = 0;
        this.isEditing = false;
        this.showLoader = false;
        this.showControlDisable = false;
        this.singleCaptureLoading = false;
    }
    clearImages() {
        showImage(this.canvas, "");
    }
    startPreview() {
        this.clearImages();
        this.payload.action = "start";
        this.payload.captureType = this.captureType;
        if (this.isEditing)
            this.payload.fingerIndex = this.currentFingerSequence[0];
        else
            this.payload.fingerIndex = undefined;
        this.ws.respondToDeviceWS(this.payload);
    }
    stopPreview() {
        this.payload.action = "stop";
        this.ws.respondToDeviceWS(this.payload);
    }
    stopPreviewprocessor() {
        this.payload.action = "stop-processor";
        this.ws.respondToDeviceWS(this.payload);
    }
    open() {
        this.payload.action = "open";
        this.ws.respondToDeviceWS(this.payload);
        this.opened = true;
    }
    executeRepetitionControl() {
        const fingers = [];
        for (const index in this.currentFingerSequence) {
            fingers.push({
                template: this.tempFingersData.templates[index],
                height: this.tempFingersData.heights[index],
                width: this.tempFingersData.widths[index],
                fingerIndex: this.currentFingerSequence[index]
            });
        }
        this.payload.action = "repetition-control";
        this.payload.data = {
            fingers: JSON.stringify(fingers),
            repetitionControl: this.repetitionControl,
            disabledControl: this.disabledControls || !!this.anomaly || this.singleCaptureSt
        };
        if (this.isEditing)
            this.payload.fingerIndex = this.currentFingerSequence[0];
        this.ws.respondToDeviceWS(this.payload);
    }
    executeMatch() {
        this.payload.action = "match";
        this.payload.data = {
            finger: {
                template: this.tempFingersData.templates[0],
                height: this.tempFingersData.heights[0],
                width: this.tempFingersData.widths[0],
                fingerIndex: this.currentFingerSequence[0]
            },
            disabledControl: this.disabledControls || !!this.anomaly || this.singleCaptureSt
        };
        this.ws.respondToDeviceWS(this.payload);
    }
    generateMinutiateData() {
        const fingers = [];
        for (const index in this.currentFingerSequence) {
            fingers.push({
                data: this.tempFingersData.images[index].image,
                fingerIndex: this.currentFingerSequence[index]
            });
        }
        ;
        this.payload.action = "generate-minutiate-data";
        this.payload.data = {
            fingers: JSON.stringify(fingers)
        };
        this.ws.respondToDeviceWS(this.payload);
    }
    setProcessorFingers() {
        const tempflatFingers = this.fingers.filter((finger) => {
            return flatCaptureTypes.includes(finger.captureType);
        });
        const flatFingers = tempflatFingers.map((finger) => {
            return {
                template: finger.template,
                height: finger.height,
                width: finger.width,
                fingerIndex: finger.fingerIndex
            };
        });
        this.payload.action = "set-processor-fingers";
        this.payload.data = { fingers: JSON.stringify(flatFingers) };
        this.ws.respondToDeviceWS(this.payload);
    }
    foundFlowType(sequence) {
        let foundFlow = this.modalSettings ? this.modalSettings.flowType : undefined;
        if (foundFlow === undefined) {
            this.flowOptions.forEach((flow, index) => {
                const key = Object.keys(flow)[0];
                const option = flow[key];
                const sortedSequence = Array.from(sequence);
                if (sequence.length === option.length && sortedSequence.sort().every(function (value, index) {
                    const optionCopy = Array.from(option);
                    return value === optionCopy.sort()[index];
                })) {
                    foundFlow = index;
                }
            });
        }
        return foundFlow;
    }
    prepareToPreview() {
        this.wsStatusInterval = setInterval(() => {
            if (this.ws.status() === 1) {
                clearInterval(this.wsStatusInterval);
                this.open();
            }
        }, 2000);
    }
    async confirmSaveWithException() {
        let anomalySelect = `<p>Deseja confirmar manualmente o salvamento desta coleta?</p>` +
            `<div class="select is-small inline">` +
            `<select id="swalAnomaly" name='anomaly'>` +
            `<option value="${undefined}">ESCOLHA EM CASO DE ANOMALIA</option>`;
        for (const anomaly of this.anomalyOptions) {
            anomalySelect += `<option value="${anomaly.id}">${anomaly.name}</option>`;
        }
        anomalySelect += `</select>` +
            `</div>`;
        return Swal.fire({
            type: "warning",
            html: anomalySelect,
            onOpen: () => {
                document.querySelector('#swalAnomaly').addEventListener('change', this.setSelection.bind(this));
            },
            onClose: () => {
                document.querySelector('#swalAnomaly').removeEventListener('change', this.setSelection.bind(this));
            },
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Salvar',
            cancelButtonText: 'Cancelar',
        });
    }
    callProcessors(data) {
        if (this.payload.processorName) {
            if (this.beginMatch() && this.match) {
                this.tempFingersData = data.fingersData;
                this.executeMatch();
            }
            else {
                this.tempFingersData = data.fingersData;
                this.executeRepetitionControl();
            }
        }
        else {
            this.tempFingersData = data.fingersData;
            this.generateMinutiateData();
        }
    }
    async nfiqEvaluation(data) {
        if (!!this.anomaly)
            return this.callProcessors(data);
        const configType = this.captureType === captureType.ROLLED_FINGER ? "rolled" : "flat";
        const nfiqEvaluation = this.failControl.attemptLimit[this.currentFingerSequence[0]][configType].nfiq;
        const nfiqEvaluationEnabled = nfiqEvaluation.enabled;
        const nfiqEvaluationThreshold = nfiqEvaluation.threshold;
        const attemptLimit = nfiqEvaluation.attemptLimit;
        if (nfiqEvaluation && nfiqEvaluationEnabled && data.nfiqScore > nfiqEvaluationThreshold) {
            this.showLoader = false;
            this.badNfiqQualityCount = this.badNfiqQualityCount + 1;
            if (this.badNfiqQualityCount === attemptLimit) {
                this.confirmSaveWithException()
                    .then((result) => {
                    if (result.value) {
                        this.smearEvaluation(data);
                    }
                    else {
                        notify(this.componentContainer, "warning", NFIQ_QUALITY_MESSAGE);
                        this.startPreview();
                        this.badNfiqQualityCount = 0;
                    }
                });
            }
            else if (this.badNfiqQualityCount > attemptLimit) {
                this.smearEvaluation(data);
            }
            else {
                notify(this.componentContainer, "warning", NFIQ_QUALITY_MESSAGE);
                this.startPreview();
            }
        }
        else {
            this.smearEvaluation(data);
        }
    }
    async smearEvaluation(data) {
        if (this.captureType === captureType.ROLLED_FINGER && data.imageError) {
            this.showLoader = false;
            this.smearCount = this.smearCount + 1;
            const attemptLimit = this.failControl.attemptLimit[this.currentFingerSequence[0]].rolled.smear;
            if (this.smearCount === attemptLimit) {
                this.confirmSaveWithException()
                    .then((result) => {
                    if (result.value) {
                        this.callProcessors(data);
                    }
                    else {
                        notify(this.componentContainer, "warning", SMEAR_MESSAGE);
                        this.startPreview();
                        this.smearCount = 0;
                    }
                });
            }
            else if (this.smearCount === attemptLimit) {
                this.callProcessors(data);
            }
            else {
                notify(this.componentContainer, "warning", SMEAR_MESSAGE);
                this.startPreview();
            }
        }
        else {
            this.callProcessors(data);
        }
    }
    async getPersonInfo() {
        this.personInfo = await getPeople(this.cpfSt, this.captureType === 0 ? 1 : this.captureType);
        try {
            const fingerprintBiometries = (this.personInfo.Biometries.find(item => item.biometry_type === 2)).FingerprintBiometries.map(item => item.finger_index).sort((a, b) => a - b);
            this.selectedFinger = { id: fingerprintBiometries[0], name: this.fingerNames[fingerprintBiometries[0]] };
            this.currentFingerSequence = [fingerprintBiometries[0]];
            this.stepPhase = fingerprintBiometries[0];
            this.currentFingerNames = this.currentFingerSequence.map((finger) => {
                return this.fingerNames[finger] + ", ";
            });
            this.setCurrentFingerImage();
        }
        catch (e) {
            console.log(e);
        }
    }
    async componentDidLoad() {
        this.singleCaptureLoading = true;
        this.showLoader = true;
        this.useOpenbioMatcherSt = this.useOpenbioMatcher;
        this.cpfSt = this.cpf;
        this.singleCaptureSt = this.singleCapture;
        setTimeout(async () => {
            try {
                if (this.useOpenbioMatcherSt && this.singleCaptureSt) {
                    this.getPersonInfo();
                }
                this.anomalyOptions = await getAnomalies(constants.anomalyTypes.MODAL_ANOMALY, !!this.detached);
                try {
                    this.flowOptions = await getFlowOptions();
                    console.log("this.flowOptions", this.flowOptions);
                }
                catch (e) {
                    console.log('error on getFlowOptions');
                    console.log(e);
                }
                try {
                    this.modalSettings = await getModalSettings();
                    this.storeOriginalImage = this.modalSettings.storeOriginalImage;
                    this.repetitionControl = this.modalSettings.repetitionControl;
                    this.generateBMP = this.modalSettings.generateBMP;
                    this.failControl = this.modalSettings.failControl;
                    this.match = this.modalSettings.match;
                    this.payload.deviceName = this.modalSettings.device ? constants.device[this.modalSettings.device] : constants.device.IB;
                    if (!this.singleCaptureSt) {
                        this.flowType = this.modalSettings.flowType;
                    }
                    if (this.detached && this.isTagComponent) {
                        const _this = this;
                        window["getBiometryData"] = function () {
                            return _this.fingers;
                        };
                        if (this.tempFingers) {
                            this.fingers = JSON.parse(this.tempFingers);
                        }
                        this.checkSessionData();
                        this.prepareToPreview();
                    }
                    else if (this.detached) {
                        this.emitLoadInformation();
                        this.setFingersFromBackendSession();
                    }
                    else {
                        this.singleCaptureLoading = false;
                        if (this.tempPerson) {
                            this.person = JSON.parse(this.tempPerson);
                        }
                        if (this.tempFingers) {
                            this.fingers = JSON.parse(this.tempFingers);
                        }
                        this.checkSessionData();
                        this.prepareToPreview();
                    }
                }
                catch (e) {
                    console.log('error on getModalSettings');
                    console.log(e);
                }
                this.ws.componentSocket.addEventListener("message", (event) => {
                    const data = JSON.parse(event.data);
                    if (data.action === "session-data") {
                        this.backendSession = data.session;
                        this.singleCaptureSt = this.backendSession.singleCapture;
                        this.cpfSt = this.backendSession.cpf;
                        this.useOpenbioMatcherSt = this.backendSession.useOpenbioMatcher;
                        if (this.useOpenbioMatcherSt && this.singleCaptureSt) {
                            this.getPersonInfo();
                        }
                        if (this.singleCaptureSt) {
                            this.captureType = captureType.ONE_FINGER_FLAT;
                        }
                        this.singleCaptureLoading = false;
                    }
                });
                this.ws.deviceSocket.addEventListener("message", (event) => {
                    const data = JSON.parse(event.data);
                    if (data.status === "initialized") {
                        if (this.payload.processorName) {
                            this.setProcessorFingers();
                        }
                        else {
                            this.stopPreview();
                            this.startPreview();
                        }
                        this.deviceReady = true;
                    }
                    if (data.status === "session-data-stored") {
                        this.backendSession = undefined;
                        this.emitLoadInformation();
                        const checkSessionInterval = setInterval(() => {
                            if (this.backendSession && this.backendSession.data.length === this.fingers.length) {
                                clearInterval(checkSessionInterval);
                                this.showLoader = false;
                            }
                        }, 200);
                    }
                    if (data.status === "match-success") {
                        this.generateMinutiateData();
                        this.unmatchCount = 0;
                    }
                    if (data.status === "minutiate-data-generated") {
                        this.minutiateFingers = JSON.parse(data.minutiateFingers);
                        this.saveFingers(this.tempFingersData);
                        this.tempFingersData = null;
                    }
                    if (data.status === "unmatched") {
                        this.showLoader = false;
                        this.unmatchCount = this.unmatchCount + 1;
                        const attemptLimit = this.failControl.attemptLimit[this.currentFingerSequence[0]].rolled.match;
                        if (this.unmatchCount === attemptLimit) {
                            this.confirmSaveWithException()
                                .then((result) => {
                                if (result.value) {
                                    this.generateMinutiateData();
                                }
                                else {
                                    notify(this.componentContainer, "warning", UNMATCH_MESSAGE);
                                    this.startPreview();
                                    this.unmatchCount = 0;
                                }
                            });
                        }
                        else if (this.unmatchCount > attemptLimit) {
                            this.generateMinutiateData();
                        }
                        else {
                            notify(this.componentContainer, "warning", UNMATCH_MESSAGE);
                            this.startPreview();
                        }
                    }
                    if (data.status === "repeated") {
                        this.showLoader = false;
                        this.repeatedCount = this.repeatedCount + 1;
                        const attemptLimit = this.failControl.attemptLimit[this.currentFingerSequence[0]].flat.repetition;
                        if (this.repeatedCount === attemptLimit) {
                            this.confirmSaveWithException()
                                .then((result) => {
                                if (result.value) {
                                    this.generateMinutiateData();
                                }
                                else {
                                    notify(this.componentContainer, "warning", REPEAT_MESSAGE);
                                    this.startPreview();
                                    this.repeatedCount = 0;
                                }
                            });
                        }
                        else if (this.repeatedCount > attemptLimit) {
                            this.generateMinutiateData();
                        }
                        else {
                            notify(this.componentContainer, "warning", REPEAT_MESSAGE);
                            this.startPreview();
                        }
                    }
                    if (data.status === "match-not-possible") {
                        this.showLoader = false;
                        return Swal.fire({
                            text: "Não é possível realizar o match nesta coleta, deseja salvar manualmente?",
                            type: "warning",
                            showCloseButton: true,
                            showCancelButton: true,
                            focusConfirm: false,
                            confirmButtonText: 'Salvar',
                            cancelButtonText: 'Cancelar',
                        }).then((result) => {
                            if (result.value) {
                                this.generateMinutiateData();
                            }
                            else {
                                notify(this.componentContainer, "warning", ERROR_MESSAGE);
                                this.startPreview();
                            }
                        });
                    }
                    if (data.status === "done-setting-fingers") {
                        this.startPreview();
                    }
                    if (data.rollingStatus) {
                        this.currentRollingStatus = data.rollingStatus;
                        this.currentStatusLineX = data.rollingLineX;
                    }
                    if (data.previewImage) {
                        showImage(this.canvas, data.previewImage, this.currentRollingStatus, this.currentStatusLineX);
                        this.nfiqScore = data.nfiqScore > 0 && data.nfiqScore <= 5 ? data.nfiqScore : 0;
                    }
                    else if (data.originalImage) {
                        this.showLoader = true;
                        if (data.fingersData.fingerCount > 1) {
                            showImage(this.canvas, data.originalImage, 0);
                        }
                        else {
                            showImage(this.canvas, data.fingersData.images[0].image, 0);
                        }
                        setTimeout(() => {
                            this.originalImage = data.originalImage;
                            this.model = data.deviceInfo.modelName;
                            this.brand = data.deviceInfo.manufacturName;
                            this.serial = data.deviceInfo.serialNumber;
                            this.currentRollingStatus = 0;
                            this.currentStatusLineX = data.rollingLineX;
                            this.nfiqEvaluation(data);
                        }, 1000);
                        if (this.singleCaptureSt) {
                            if (this.useOpenbioMatcherSt) {
                                this.showLoader = true;
                                fingerAuthenticate({ cpf: this.cpfSt, finger: { finger_index: this.currentFingerSequence[0], data: data.originalImage } }).then((result) => {
                                    this.showLoader = false;
                                    this.authenticationSimilarity = result.similarity;
                                    if (this.authenticationSimilarity > 40) {
                                        notify(this.componentContainer, "success", "Autenticado com sucesso");
                                    }
                                    else {
                                        notify(this.componentContainer, "error", "Falha na autenticação");
                                    }
                                    console.log(document);
                                    console.log(document.getElementById("auth-component"));
                                    const element = document.getElementById("auth-component");
                                    element.dispatchEvent(new CustomEvent("onOpenbioMatcher", {
                                        detail: {
                                            finger_index: this.currentFingerSequence[0],
                                            data: data.originalImage,
                                            nfiqScore: data.nfiqScore,
                                            similarity: result.similarity
                                        }
                                    }));
                                    if (this.onOpenbioMatcher) {
                                        this.onOpenbioMatcher({ finger_index: this.currentFingerSequence[0], data: data.originalImage, nfiqScore: data.nfiqScore, similarity: result.similarity });
                                    }
                                }, (error) => {
                                    console.log(error);
                                });
                            }
                            const element = document.getElementById("auth-component");
                            element.dispatchEvent(new CustomEvent("onCaptureFingerprint", {
                                detail: {
                                    finger_index: this.currentFingerSequence[0],
                                    data: data.originalImage,
                                    nfiqScore: data.nfiqScore
                                },
                            }));
                            if (this.onCaptureFingerprint) {
                                this.onCaptureFingerprint({ finger_index: this.currentFingerSequence[0], data: data.originalImage, nfiqScore: data.nfiqScore });
                            }
                        }
                    }
                });
                const serviceConfigs = await getAppConfig();
                if (serviceConfigs) {
                    this.showControlDisable = serviceConfigs.finger.showControlDisable;
                    this.componentContainer.forceUpdate();
                }
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
        this.stopPreviewprocessor();
        this.clearImages();
    }
    setFingersFromBackendSession() {
        const checkSessionInterval = setInterval(() => {
            if (this.backendSession) {
                clearInterval(checkSessionInterval);
                const captureData = this.backendSession.data.map((item) => {
                    return {
                        data: item.captureType === 2 ? item.imagePng : item.imageFlat,
                        nfiqScore: item.nfiqScore,
                        captureType: item.captureType,
                        fingerIndex: item.fingerIndex,
                        anomalyId: item.exceptionIndex
                    };
                });
                this.fingers = captureData;
                this.checkSessionData();
                if (!this.singleCaptureSt) {
                    this.setCaptureType();
                }
                this.prepareToPreview();
            }
        }, 200);
    }
    setCurrentFinger() {
        const fingerSessionData = this.getSequenceFingers();
        const orderedSequence = this.fingerSequence.reduce((a, b) => {
            return a.concat(b);
        }, []);
        let currentFingerSequence = [];
        const _this = this;
        if (fingerSessionData.length < orderedSequence.length) {
            this.fingerSequence.forEach((sequence, index) => {
                if (!currentFingerSequence.length) {
                    _this.stepPhase = index;
                    _this.setCaptureType();
                    const joinedSequence = sequence.join('');
                    const finger = fingerSessionData.find((finger) => {
                        const joinedSequenceContainsFinger = joinedSequence.includes(finger.fingerIndex);
                        if (_this.flowType !== flowTypes.FLOW_TYPE_SEQUENCE_CONTROL_CAPTURE &&
                            _this.flowType !== flowTypes.FLOW_TYPE_TWO_FLAT_SEQUENCE_CONTROL_CAPTURE &&
                            _this.flowType !== flowTypes.FLOW_TYPE_FOUR_FLAT_SEQUENCE_CONTROL_CAPTURE) {
                            return joinedSequenceContainsFinger;
                        }
                        else {
                            if (flatCaptureTypes.includes(this.captureType)) {
                                return joinedSequenceContainsFinger && flatCaptureTypes.includes(finger.captureType);
                            }
                            else {
                                return joinedSequenceContainsFinger && captureType.ROLLED_FINGER === finger.captureType;
                            }
                        }
                    });
                    if (!finger)
                        currentFingerSequence = sequence;
                }
            });
        }
        _this.currentFingerSequence = currentFingerSequence;
        _this.currentFingerNames = currentFingerSequence.map((finger) => {
            return _this.fingerNames[finger] + ", ";
        });
        this.setCurrentFingerImage();
    }
    setCurrentFingerImage() {
        let type = '';
        let joinedFingerStep = this.currentFingerSequence.join('');
        if (this.captureType === captureType.ROLLED_FINGER) {
            type = 'roll';
        }
        else if (this.captureType === captureType.ONE_FINGER_FLAT) {
            type = 'slap';
        }
        else if (this.captureType === captureType.TWO_FINGER_FLAT) {
            type = 'doublefinger';
        }
        else if (this.captureType === captureType.FOUR_FINGER_FLAT) {
            type = 'four';
        }
        this.currentFingerImage = `./assets/fingers/${type}/d${joinedFingerStep}.gif`;
    }
    currentFlowName() {
        const flowType = this.flowOptions[this.flowType];
        if (!flowType)
            return;
        return Object.keys(flowType)[0];
    }
    parseFingerSequence() {
        const currentFlow = this.flowOptions[this.flowType][this.currentFlowName()];
        if (currentFlow) {
            this.fingerSequence = currentFlow.map((item) => {
                if (Number.isInteger(item))
                    return [item];
                return item.split('').map(Number);
            });
        }
    }
    checkSessionData() {
        this.parseFingerSequence();
        this.setCurrentFinger();
    }
    setCaptureType() {
        if (this.flowType === flowTypes.FLOW_TYPE_TEN_FLAT_CAPTURES ||
            this.flowType === flowTypes.FLOW_TYPE_PINCH) {
            this.captureType = captureType.ONE_FINGER_FLAT;
        }
        if (this.flowType === flowTypes.FLOW_TYPE_TEN_ROLLED_CAPTURES) {
            this.captureType = captureType.ROLLED_FINGER;
        }
        if (this.flowType === flowTypes.FLOW_TYPE_FIVE_FLAT_CAPTURES) {
            this.captureType = captureType.TWO_FINGER_FLAT;
        }
        if (this.flowType === flowTypes.FLOW_TYPE_THREE_FLAT_CAPTURES) {
            this.captureType = this.stepPhase <= 1 ? captureType.FOUR_FINGER_FLAT : captureType.TWO_FINGER_FLAT;
        }
        if (this.flowType === flowTypes.FLOW_TYPE_SEQUENCE_CONTROL_CAPTURE) {
            this.captureType = this.stepPhase <= 9 ? captureType.ONE_FINGER_FLAT : captureType.ROLLED_FINGER;
        }
        if (this.flowType === flowTypes.FLOW_TYPE_TWO_FLAT_SEQUENCE_CONTROL_CAPTURE) {
            this.captureType = this.stepPhase <= 4 ? captureType.TWO_FINGER_FLAT : captureType.ROLLED_FINGER;
        }
        if (this.flowType === flowTypes.FLOW_TYPE_FOUR_FLAT_SEQUENCE_CONTROL_CAPTURE) {
            if (this.stepPhase <= 2)
                this.captureType = this.stepPhase <= 1 ? captureType.FOUR_FINGER_FLAT : captureType.TWO_FINGER_FLAT;
            else
                this.captureType = captureType.ROLLED_FINGER;
        }
        this.captureTypeName = this.captureType === captureType.ROLLED_FINGER ? "Role" : "Posicione";
    }
    isFlatSequence() {
        return this.captureType !== captureType.ROLLED_FINGER;
    }
    isRolledSequence() {
        return this.captureType === captureType.ROLLED_FINGER;
    }
    checkCaptureNeed() {
        return (this.isFlatSequence() && this.anomaly.requires_flat) || (this.isRolledSequence() && this.anomaly.requires_rolled);
    }
    saveAnomaly() {
        if (!this.anomaly)
            return;
        if (this.checkCaptureNeed()) {
            notify(this.componentContainer, "warning", "É necessário realizar a captura para este tipo de anomalia.");
            return;
        }
        this.showLoader = true;
        this.stopPreview();
        this.saveFingers();
    }
    clearSession() {
        this.payload.action = "session-clear-data";
        this.payload.data = {
            type: "MODAL",
            owner: "default-user",
            data: [],
        };
        this.ws.respondToDeviceWS(this.payload);
    }
    clearCapture() {
        this.originalImage = undefined;
        this.fingers = [];
        this.clearSession();
        this.startPreview();
    }
    beginMatch() {
        return (this.flowType === flowTypes.FLOW_TYPE_TWO_FLAT_SEQUENCE_CONTROL_CAPTURE && this.stepPhase > 4) ||
            (this.flowType === flowTypes.FLOW_TYPE_SEQUENCE_CONTROL_CAPTURE && this.stepPhase > 9) ||
            (this.flowType === flowTypes.FLOW_TYPE_FOUR_FLAT_SEQUENCE_CONTROL_CAPTURE && this.stepPhase > 2);
    }
    async saveFingers(fingersData) {
        const localization = await getLocalization();
        let fingers = [];
        for (const index in this.currentFingerSequence) {
            const fingerIndex = this.currentFingerSequence[index];
            let minutiateFinger = undefined;
            if (this.minutiateFingers) {
                minutiateFinger = this.minutiateFingers.find((finger) => {
                    return finger.fingerIndex === fingerIndex;
                });
            }
            fingers.push({
                id: this.isEditing ? this.editingId : null,
                data: fingersData ? (fingersData.bmpData.length > 0 ? fingersData.bmpData[index] : fingersData.images[index].image) : "",
                template: fingersData ? fingersData.templates[index] : "",
                wsqData: fingersData ? fingersData.images[index].wsqImage : "",
                minutiateData: minutiateFinger ? minutiateFinger.data : "",
                nfiqScore: fingersData ? fingersData.images[index].nfiqScore : null,
                captureType: this.captureType,
                fingerIndex: fingerIndex,
                anomalyId: this.anomaly ? this.anomaly.id : null,
                height: fingersData ? fingersData.heights[index] : 0,
                width: fingersData ? fingersData.widths[index] : 0,
                model: this.model,
                brand: this.brand,
                serial: this.serial,
                localization
            });
        }
        ;
        if (!this.detached) {
            if (this.person && !this.singleCaptureSt) {
                if (this.storeOriginalImage)
                    await this.saveOriginalImage();
                const saveFingersResult = await saveFingers({
                    personId: this.person.id,
                    fingers: JSON.stringify(fingers)
                });
                const parsedValue = await saveFingersResult.map((item) => {
                    return {
                        id: item.id,
                        data: item.data,
                        template: item.template,
                        wsqData: item.wsq_data,
                        minutiateData: item.minutiate_data,
                        nfiqScore: item.nfiq_score,
                        captureType: item.capture_type,
                        fingerIndex: item.finger_index,
                        anomalyId: item.anomaly_id,
                        height: item.height,
                        width: item.width,
                        model: item.model,
                        brand: item.brand,
                        serial: item.serial,
                        localization
                    };
                });
                await this.storeCapturedFinger(parsedValue);
            }
            this.showLoader = false;
        }
        else {
            const tempFingers = fingers.filter((finger) => {
                return this.currentFingerSequence.includes(finger.fingerIndex);
            });
            if (!this.isTagComponent)
                this.sendBiometryInformation(tempFingers);
            await this.storeCapturedFinger(tempFingers);
        }
    }
    async saveOriginalImage() {
        let fingerIndex = 0;
        if ([flowTypes.FLOW_TYPE_THREE_FLAT_CAPTURES, flowTypes.FLOW_TYPE_FOUR_FLAT_SEQUENCE_CONTROL_CAPTURE].includes(this.flowType)) {
            if (this.stepPhase === 0)
                fingerIndex = 12;
            if (this.stepPhase === 1)
                fingerIndex = 13;
            if (this.stepPhase === 2)
                fingerIndex = 14;
        }
        if (fingerIndex) {
            const fingersStructure = {
                personId: this.person.id,
                fingers: JSON.stringify([{
                        data: this.originalImage,
                        template: "",
                        wsqData: "",
                        minutiateData: "",
                        nfiqScore: null,
                        captureType: this.captureType,
                        fingerIndex: fingerIndex,
                        anomalyId: null,
                        model: this.model,
                        serial: this.serial,
                        brand: this.brand,
                    }])
            };
            await saveFingers(fingersStructure);
        }
    }
    storeCapturedFinger(saveFingersResult) {
        this.anomaly = undefined;
        if (this.isEditing) {
            const tempFinger = saveFingersResult[0];
            const index = this.fingers.findIndex((finger) => {
                return finger.fingerIndex === tempFinger.fingerIndex &&
                    ((flatCaptureTypes.includes(tempFinger.captureType) && flatCaptureTypes.includes(finger.captureType)) ||
                        (tempFinger.captureType === captureType.ROLLED_FINGER && finger.captureType === captureType.ROLLED_FINGER));
            });
            if (index >= 0)
                this.fingers.splice(index, 1);
            this.isEditing = false;
        }
        for (const finger of saveFingersResult) {
            this.fingers.push({
                id: finger.id,
                data: finger.data,
                template: finger.template,
                wsqData: finger.wsq_data,
                minutiateData: finger.minutiateData,
                nfiqScore: finger.nfiqScore,
                captureType: finger.captureType,
                fingerIndex: finger.fingerIndex,
                anomalyId: finger.anomalyId,
                anomaly: finger.anomalyId ? this.anomalyOptions.find((anomaly) => { return anomaly.id === finger.anomalyId; }).name : "",
                height: finger.height,
                width: finger.width,
                model: finger.model,
                brand: finger.brand,
                serial: finger.serial,
                localization: finger.localization
            });
        }
        ;
        setFingers(this.fingers);
        if (!this.singleCaptureSt) {
            this.setCurrentFinger();
        }
        this.badNfiqQualityCount = 0;
        this.smearCount = 0;
        this.unmatchCount = 0;
        this.repeatedCount = 0;
        if (!this.singleCaptureSt && this.currentFingerSequence.length > 0) {
            this.startPreview();
        }
    }
    getFlatFingerFromIndex(index) {
        const finger = this.fingers.find((finger) => {
            return finger.fingerIndex === index && flatCaptureTypes.includes(finger.captureType);
        });
        return finger;
    }
    getRolledFingerFromIndex(index) {
        const finger = this.fingers.find((finger) => {
            return finger.fingerIndex === index && finger.captureType === captureType.ROLLED_FINGER;
        });
        return finger;
    }
    getSequenceFingers() {
        if (flatFlowTypes.includes(this.flowType)) {
            return this.fingers.filter((finger) => { return flatCaptureTypes.includes(finger.captureType); });
        }
        else if (this.flowType === flowTypes.FLOW_TYPE_TEN_ROLLED_CAPTURES) {
            return this.fingers.filter((finger) => { return finger.captureType === captureType.ROLLED_FINGER; });
        }
        else {
            return this.fingers;
        }
    }
    acceptData() {
        this.stopPreview();
        this.payload.action = "close-component";
        this.payload.data = {
            type: "modal",
            owner: "default-user"
        };
        this.ws.respondToDeviceWS(this.payload);
    }
    emitLoadInformation() {
        this.payload.action = "component-opened";
        this.payload.data = {
            type: "modal"
        };
        const checkStatusInterval = setInterval(() => {
            if (this.ws.componentSocket.readyState === 1) {
                clearInterval(checkStatusInterval);
                this.ws.respondToComponentWS(this.payload);
            }
        }, 200);
    }
    sendBiometryInformation(fingers) {
        for (const finger of fingers) {
            this.payload.action = "store-session";
            this.payload.data = {
                type: "MODAL",
                owner: "default-user",
                biometry: finger
            };
            this.ws.respondToDeviceWS(this.payload);
        }
    }
    activeTabClass(num) {
        return this.tab === num ? "is-active" : "";
    }
    setActiveTab(num) {
        this.tab = num;
    }
    setSelection(event) {
        const name = event.target.name;
        const value = event.target.value;
        this[name] = this.anomalyOptions.find((a) => a.id === parseInt(value));
    }
    setSelectionCaptureType(event) {
        const name = event.target.name;
        const value = event.target.value;
        this[name] = parseInt(value, 10);
        this.setSelectionFingerList({ target: { name: "fingerList", value: this.stepPhase } });
        this.captureTypeName = this.captureType === captureType.ROLLED_FINGER ? "Role" : "Posicione";
        this.getPersonInfo();
        this.stopPreview();
        setTimeout(() => {
            this.startPreview();
        }, 100);
    }
    setSelectionFingerList(event) {
        const { name, value } = event.target;
        this[name] = { id: value, name: this.fingerNames[parseInt(value, 10)] };
        this.currentFingerSequence = [parseInt(value, 10)];
        this.stepPhase = parseInt(value, 10);
        this.currentFingerNames = this.currentFingerSequence.map((finger) => {
            return this.fingerNames[finger] + ", ";
        });
        this.setCurrentFingerImage();
    }
    updateDisabledControls() {
        this.disabledControls = !this.disabledControls;
    }
    capturedNfiq(index) {
        const fingers = this.fingers;
        const finger = fingers.find((finger) => finger.fingerIndex === index &&
            ((flatCaptureTypes.includes(this.captureType) && flatCaptureTypes.includes(finger.captureType)) ||
                (this.captureType === captureType.ROLLED_FINGER && finger.captureType === captureType.ROLLED_FINGER)));
        return finger ? finger.nfiqScore : 0;
    }
    editFinger(_this, finger) {
        _this.tab = 0;
        _this.isEditing = true;
        _this.editingId = finger.id;
        _this.stopPreview();
        _this.captureType = finger.captureType === captureType.ROLLED_FINGER ? captureType.ROLLED_FINGER : captureType.ONE_FINGER_FLAT;
        _this.currentFingerSequence = [finger.fingerIndex];
        _this.loadStepPhaseOnEdit(finger.fingerIndex);
        _this.currentFingerNames = _this.currentFingerSequence.map((finger) => {
            return _this.fingerNames[finger] + ", ";
        });
        _this.setCurrentFingerImage();
        _this.startPreview();
    }
    loadStepPhaseOnEdit(fingerIndex) {
        this.stepPhase = 0;
        if (this.captureType === captureType.ROLLED_FINGER) {
            if (this.flowType === flowTypes.FLOW_TYPE_TWO_FLAT_SEQUENCE_CONTROL_CAPTURE)
                this.stepPhase = fingerIndex + 5;
            if (this.flowType === flowTypes.FLOW_TYPE_FOUR_FLAT_SEQUENCE_CONTROL_CAPTURE)
                this.stepPhase = fingerIndex + 3;
            if (this.flowType === flowTypes.FLOW_TYPE_SEQUENCE_CONTROL_CAPTURE)
                this.stepPhase = fingerIndex + 10;
        }
    }
    render() {
        const personFaceBiometry = this.personInfo && this.personInfo.Biometries && this.personInfo.Biometries.find(item => item.biometry_type === 1);
        const anomalyOptions = (this.anomalyOptions || []).map((option) => {
            return (h("option", { value: option.id, selected: this.anomaly && this.anomaly.id === option.id }, option.name));
        });
        const fingerCaptureGuide = (h("div", { class: "info" },
            this.currentFingerNames.length > 0 ?
                h("span", null,
                    this.captureTypeName,
                    " o(s) dedo(s) ",
                    h("b", null,
                        this.currentFingerNames,
                        " "),
                    "sobre o leitor.") :
                h("span", null, "Coleta finalizada."),
            h("p", { class: "finger-image" },
                h("img", { alt: "", src: this.currentFingerImage }))));
        let personFingerList = undefined;
        if (this.singleCaptureSt && this.personInfo) {
            const personBiometries = this.personInfo.Biometries.find(item => item.biometry_type === 2) || {};
            personFingerList = personBiometries.FingerprintBiometries.map(item => {
                return (h("option", { value: item.finger_index, selected: this.selectedFinger && this.selectedFinger.id === item.finger_index }, this.fingerNames[item.finger_index]));
            });
        }
        else {
            personFingerList = this.fingerNames.map((item, index) => {
                return (h("option", { value: index, selected: this.selectedFinger && this.selectedFinger.id === index }, item));
            });
        }
        return (h("div", { id: 'auth-component' }, !this.singleCaptureLoading ?
            h("div", { class: "window-size" },
                h("loader-component", { enabled: this.showLoader }),
                h("div", { id: "notification-container" }),
                this.singleCaptureSt ? (h("div", { class: "card", style: { "box-shadow": "none", "padding-bottom": "10px" } },
                    h("div", { class: "card-content" },
                        h("div", { class: "media" },
                            (personFaceBiometry && personFaceBiometry.FaceBiometries[0] && personFaceBiometry.FaceBiometries[0].data) || (this.personImage) ? (h("div", { class: "media-left" },
                                h("figure", { class: "image is-128x128" },
                                    h("img", { style: { "max-width": "128px", "max-height": "128px" }, src: `data:image/png;base64, ${this.personImage || (personFaceBiometry && personFaceBiometry.FaceBiometries[0].data)}` })))) : undefined,
                            h("div", { class: "media-content" },
                                h("p", { class: "title is-4" }, this.personName || this.personInfo && this.personInfo.full_name),
                                this.cpfSt || this.personInfo && this.personInfo.cpf ?
                                    h("p", { class: "subtitle is-6" },
                                        "CPF: ",
                                        this.cpfSt || this.personInfo && this.personInfo.cpf) : undefined))))) : (h("div", { class: "tabs is-left is-boxed" },
                    h("ul", null,
                        h("li", { class: this.activeTabClass(0) },
                            h("a", { onClick: () => this.setActiveTab(0) },
                                h("span", { class: "tab-title" }, "Captura"))),
                        h("li", { class: this.activeTabClass(1) },
                            h("a", { onClick: () => this.setActiveTab(1) },
                                h("span", { class: "tab-title" }, "Dedos Rolados"))),
                        h("li", { class: this.activeTabClass(2) },
                            h("a", { onClick: () => this.setActiveTab(2) },
                                h("span", { class: "tab-title" }, "Dedos Pousados")))))),
                this.tab === 0 ? h("div", { class: "columns is-mobile" },
                    h("div", { class: "column is-one-third" },
                        h("div", { class: "device-status-container" },
                            h("h6", { class: "title is-7 has-text-left" },
                                "ESTADO DO DISPOSITIVO: ",
                                this.deviceReady ? 'PRONTO' : 'NÃO CARREGADO')),
                        this.singleCaptureSt ?
                            h("div", null,
                                h("p", { style: { marginBottom: "10px" } },
                                    h("span", { style: { fontSize: "14px" } }, "Tipo de captura: "),
                                    h("div", { class: "select is-small inline" },
                                        h("select", { onChange: this.setSelectionCaptureType.bind(this), name: "captureType", disabled: this.originalImage ? true : false },
                                            h("option", { value: "0" }, "Pousada"),
                                            h("option", { value: "2" }, "Rolada")))),
                                h("p", null,
                                    h("span", { style: { fontSize: "14px" } }, "Dedo: "),
                                    h("div", { class: "select is-small inline", style: { marginLeft: "5px", minWidth: "142px" } },
                                        h("select", { onChange: this.setSelectionFingerList.bind(this), name: "fingerList", disabled: this.originalImage ? true : false }, personFingerList)))) : null,
                        h("div", { class: "evaluation" },
                            fingerCaptureGuide,
                            !this.singleCaptureSt ?
                                h("div", null,
                                    h("div", { class: "hand-status" },
                                        h("p", { class: "margin-name-hand" },
                                            h("strong", null, "M\u00E3o direita")),
                                        h("ul", null,
                                            h("li", { class: `status-item status${this.capturedNfiq(0)}` }, this.capturedNfiq(0)),
                                            h("li", { class: `status-item status${this.capturedNfiq(1)}` }, this.capturedNfiq(1)),
                                            h("li", { class: `status-item status${this.capturedNfiq(2)}` }, this.capturedNfiq(2)),
                                            h("li", { class: `status-item status${this.capturedNfiq(3)}` }, this.capturedNfiq(3)),
                                            h("li", { class: `status-item status${this.capturedNfiq(4)}` }, this.capturedNfiq(4)))),
                                    h("div", { class: "hand-status" },
                                        h("p", { class: "margin-name-hand" },
                                            h("strong", null, "M\u00E3o esquerda")),
                                        h("ul", null,
                                            h("li", { class: `status-item status${this.capturedNfiq(5)}` }, this.capturedNfiq(5)),
                                            h("li", { class: `status-item status${this.capturedNfiq(6)}` }, this.capturedNfiq(6)),
                                            h("li", { class: `status-item status${this.capturedNfiq(7)}` }, this.capturedNfiq(7)),
                                            h("li", { class: `status-item status${this.capturedNfiq(8)}` }, this.capturedNfiq(8)),
                                            h("li", { class: `status-item status${this.capturedNfiq(9)}` }, this.capturedNfiq(9))))) : null)),
                    h("div", { class: "column text-align-left" },
                        h("span", { class: `status-item-line-in-canvas status-item status${this.nfiqScore}` }, this.nfiqScore),
                        h("canvas", { width: "460", height: "300", class: "canvas", ref: el => this.canvas = el }),
                        h("div", { class: "columns is-mobile action-buttons-container" },
                            this.detached && !this.isTagComponent ? h("div", { class: "column has-text-centered" },
                                h("a", { class: "button is-small is-pulled-right action-button", onClick: () => this.acceptData() }, "FINALIZAR")) : null,
                            this.singleCaptureSt && this.originalImage ?
                                h("div", { class: "column has-text-centered" },
                                    h("a", { class: "button is-small is-pulled-right action-button", onClick: () => this.clearCapture() }, "LIMPAR CAPTURA")) : null),
                        !this.singleCaptureSt ?
                            h("div", { class: "columns is-mobile anomaly-buttons-container" },
                                h("div", { class: "column" },
                                    h("div", { class: "select is-small inline is-pulled-left" },
                                        h("select", { onChange: this.setSelection.bind(this), name: "anomaly" },
                                            h("option", { value: undefined }, "ESCOLHA EM CASO DE ANOMALIA"),
                                            anomalyOptions))),
                                h("div", { class: "column" },
                                    h("a", { class: "button is-small is-pulled-right action-button", onClick: () => this.saveAnomaly() }, "SALVAR ANOMALIA"))) : null,
                        this.showControlDisable ?
                            h("div", { class: "columns is-mobile" },
                                h("div", { class: "column" },
                                    h("div", { class: "field" },
                                        h("input", { id: "disabledControls", type: "checkbox", name: "disabledControls", class: "switch is-rounded is-danger" }),
                                        h("label", { htmlFor: "disabledControls", onClick: this.updateDisabledControls.bind(this) }, "Controles desabilitados")))) : null)) : null,
                this.tab === 1 ? h("div", { class: "tab-content" },
                    h("div", { class: "capture-result-container" },
                        h("div", { class: "columns is-mobile is-multiline is-left" },
                            h("openbio-finger-image-component", { finger: this.getRolledFingerFromIndex(0), fingerName: this.fingerNames[0], editFingerCallback: this.editFinger, parentComponentContext: this }),
                            h("openbio-finger-image-component", { finger: this.getRolledFingerFromIndex(1), fingerName: this.fingerNames[1], editFingerCallback: this.editFinger, parentComponentContext: this }),
                            h("openbio-finger-image-component", { finger: this.getRolledFingerFromIndex(2), fingerName: this.fingerNames[2], editFingerCallback: this.editFinger, parentComponentContext: this }),
                            h("openbio-finger-image-component", { finger: this.getRolledFingerFromIndex(3), fingerName: this.fingerNames[3], editFingerCallback: this.editFinger, parentComponentContext: this }),
                            h("openbio-finger-image-component", { finger: this.getRolledFingerFromIndex(4), fingerName: this.fingerNames[4], editFingerCallback: this.editFinger, parentComponentContext: this })),
                        h("div", { class: "columns is-mobile is-multiline is-left" },
                            h("openbio-finger-image-component", { finger: this.getRolledFingerFromIndex(5), fingerName: this.fingerNames[5], editFingerCallback: this.editFinger, parentComponentContext: this }),
                            h("openbio-finger-image-component", { finger: this.getRolledFingerFromIndex(6), fingerName: this.fingerNames[6], editFingerCallback: this.editFinger, parentComponentContext: this }),
                            h("openbio-finger-image-component", { finger: this.getRolledFingerFromIndex(7), fingerName: this.fingerNames[7], editFingerCallback: this.editFinger, parentComponentContext: this }),
                            h("openbio-finger-image-component", { finger: this.getRolledFingerFromIndex(8), fingerName: this.fingerNames[8], editFingerCallback: this.editFinger, parentComponentContext: this }),
                            h("openbio-finger-image-component", { finger: this.getRolledFingerFromIndex(9), fingerName: this.fingerNames[9], editFingerCallback: this.editFinger, parentComponentContext: this })))) : null,
                this.tab === 2 ? h("div", { class: "tab-content" },
                    h("div", { class: "capture-result-container" },
                        h("div", { class: "columns is-mobile is-multiline is-left" },
                            h("openbio-finger-image-component", { finger: this.getFlatFingerFromIndex(0), fingerName: this.fingerNames[0], editFingerCallback: this.editFinger, parentComponentContext: this }),
                            h("openbio-finger-image-component", { finger: this.getFlatFingerFromIndex(1), fingerName: this.fingerNames[1], editFingerCallback: this.editFinger, parentComponentContext: this }),
                            h("openbio-finger-image-component", { finger: this.getFlatFingerFromIndex(2), fingerName: this.fingerNames[2], editFingerCallback: this.editFinger, parentComponentContext: this }),
                            h("openbio-finger-image-component", { finger: this.getFlatFingerFromIndex(3), fingerName: this.fingerNames[3], editFingerCallback: this.editFinger, parentComponentContext: this }),
                            h("openbio-finger-image-component", { finger: this.getFlatFingerFromIndex(4), fingerName: this.fingerNames[4], editFingerCallback: this.editFinger, parentComponentContext: this })),
                        h("div", { class: "columns is-mobile is-multiline is-left" },
                            h("openbio-finger-image-component", { finger: this.getFlatFingerFromIndex(5), fingerName: this.fingerNames[5], editFingerCallback: this.editFinger, parentComponentContext: this }),
                            h("openbio-finger-image-component", { finger: this.getFlatFingerFromIndex(6), fingerName: this.fingerNames[6], editFingerCallback: this.editFinger, parentComponentContext: this }),
                            h("openbio-finger-image-component", { finger: this.getFlatFingerFromIndex(7), fingerName: this.fingerNames[7], editFingerCallback: this.editFinger, parentComponentContext: this }),
                            h("openbio-finger-image-component", { finger: this.getFlatFingerFromIndex(8), fingerName: this.fingerNames[8], editFingerCallback: this.editFinger, parentComponentContext: this }),
                            h("openbio-finger-image-component", { finger: this.getFlatFingerFromIndex(9), fingerName: this.fingerNames[9], editFingerCallback: this.editFinger, parentComponentContext: this })))) : null) : h("loader-component", { enabled: this.showLoader })));
    }
    static get is() { return "openbio-finger-details"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "anomaly": {
            "state": true
        },
        "anomalyOptions": {
            "state": true
        },
        "authenticationSimilarity": {
            "state": true
        },
        "backendSession": {
            "state": true
        },
        "badNfiqQualityCount": {
            "state": true
        },
        "brand": {
            "state": true
        },
        "capturedData": {
            "state": true
        },
        "captureType": {
            "state": true
        },
        "captureTypeName": {
            "state": true
        },
        "componentContainer": {
            "elementRef": true
        },
        "cpf": {
            "type": String,
            "attr": "cpf"
        },
        "cpfSt": {
            "state": true
        },
        "currentFingerImage": {
            "state": true
        },
        "currentFingerNames": {
            "state": true
        },
        "currentFingerSequence": {
            "state": true
        },
        "currentRollingStatus": {
            "state": true
        },
        "currentStatusLineX": {
            "state": true
        },
        "detached": {
            "type": Boolean,
            "attr": "detached"
        },
        "deviceReady": {
            "state": true
        },
        "disabledControls": {
            "state": true
        },
        "editingId": {
            "state": true
        },
        "failControl": {
            "state": true
        },
        "fingerCaptureType": {
            "type": Number,
            "attr": "finger-capture-type"
        },
        "fingers": {
            "state": true
        },
        "fingerSequence": {
            "state": true
        },
        "flowOptions": {
            "state": true
        },
        "flowType": {
            "state": true
        },
        "generateBMP": {
            "state": true
        },
        "isEditing": {
            "state": true
        },
        "isTagComponent": {
            "type": Boolean,
            "attr": "is-tag-component"
        },
        "match": {
            "state": true
        },
        "modalSettings": {
            "state": true
        },
        "model": {
            "state": true
        },
        "nfiqScore": {
            "state": true
        },
        "onCaptureFingerprint": {
            "type": "Any",
            "attr": "on-capture-fingerprint"
        },
        "onOpenbioMatcher": {
            "type": "Any",
            "attr": "on-openbio-matcher"
        },
        "opened": {
            "state": true
        },
        "originalImage": {
            "state": true
        },
        "personImage": {
            "type": String,
            "attr": "person-image"
        },
        "personInfo": {
            "state": true
        },
        "personName": {
            "type": String,
            "attr": "person-name"
        },
        "repeatedCount": {
            "state": true
        },
        "repetitionControl": {
            "state": true
        },
        "selectedFinger": {
            "state": true
        },
        "serial": {
            "state": true
        },
        "showControlDisable": {
            "state": true
        },
        "showLoader": {
            "state": true
        },
        "singleCapture": {
            "type": Boolean,
            "attr": "single-capture"
        },
        "singleCaptureLoading": {
            "state": true
        },
        "singleCaptureSt": {
            "state": true
        },
        "smearCount": {
            "state": true
        },
        "stepPhase": {
            "state": true
        },
        "storeOriginalImage": {
            "state": true
        },
        "tab": {
            "state": true
        },
        "tempFingers": {
            "type": "Any",
            "attr": "temp-fingers"
        },
        "tempPerson": {
            "type": "Any",
            "attr": "temp-person"
        },
        "unmatchCount": {
            "state": true
        },
        "useOpenbioMatcher": {
            "type": Boolean,
            "attr": "use-openbio-matcher"
        },
        "useOpenbioMatcherSt": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:openbio-finger-details:**/"; }
}
