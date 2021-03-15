import WS from '../../utils/websocket';
import { showImage } from '../../utils/canvas';
import { getAppConfig } from '../../utils/api';
import { loadFingerForm, loadPalmForm, scannerScan } from './api';
import { notify } from '../../utils/notifier';
import constants from '../../utils/constants';
var FORM_TYPE;
(function (FORM_TYPE) {
    FORM_TYPE[FORM_TYPE["UNDEFINED"] = -1] = "UNDEFINED";
    FORM_TYPE[FORM_TYPE["DECADACTILAR"] = 0] = "DECADACTILAR";
    FORM_TYPE[FORM_TYPE["PALMAR"] = 1] = "PALMAR";
})(FORM_TYPE || (FORM_TYPE = {}));
var PALM_TYPES;
(function (PALM_TYPES) {
    PALM_TYPES[PALM_TYPES["UNDEFINED"] = -1] = "UNDEFINED";
    PALM_TYPES[PALM_TYPES["RIGHT_PALM"] = 1] = "RIGHT_PALM";
    PALM_TYPES[PALM_TYPES["RIGHT_HYPOTHENAR"] = 2] = "RIGHT_HYPOTHENAR";
    PALM_TYPES[PALM_TYPES["LEFT_PALM"] = 3] = "LEFT_PALM";
    PALM_TYPES[PALM_TYPES["LEFT_HYPOTHENAR"] = 4] = "LEFT_HYPOTHENAR";
})(PALM_TYPES || (PALM_TYPES = {}));
var PALM_NAMES;
(function (PALM_NAMES) {
    PALM_NAMES[PALM_NAMES["Palma direita"] = 1] = "Palma direita";
    PALM_NAMES[PALM_NAMES["Hipotenar direita"] = 2] = "Hipotenar direita";
    PALM_NAMES[PALM_NAMES["Palma esquerda"] = 3] = "Palma esquerda";
    PALM_NAMES[PALM_NAMES["Hipotenar esquerda"] = 4] = "Hipotenar esquerda";
})(PALM_NAMES || (PALM_NAMES = {}));
export class OpenbioSignatureComponentDetails {
    constructor() {
        this.ws = new WS();
        this.payload = {
            action: undefined,
            data: undefined
        };
        this.imgTest = undefined;
        this.deviceReady = false;
        this.deviceOpened = false;
        this.backendSession = undefined;
        this.showLoader = false;
        this.isCapturing = false;
        this.model = '';
        this.brand = '';
        this.serial = '';
        this.deviceStatus = false;
        this.serviceConfigs = undefined;
        this.person = {};
        this.modal = {
            src: "",
            active: false,
        };
        this.form = {
            canvas: {
                width: 327,
                height: 450,
            },
            isActive: false,
            file: undefined,
            fileData: {},
            src: undefined,
            autoNext: true,
            fingerSelections: [
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 0, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 1, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 2, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 3, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 4, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 5, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 6, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 7, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 8, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 9, collected: false },
            ],
            palmSelection: {
                collected: false,
                topLeft: { x: 0, y: 0 },
                bottomRight: { x: 0, y: 0 },
            },
            requiresManualSelection: true,
            selectedFinger: undefined,
            success: undefined,
            croppedFingers: [],
            croppedPalm: {},
            palms: [],
        };
        this.deviceList = [];
        this.selectedDevice = undefined;
        this.formType = FORM_TYPE.UNDEFINED;
        this.palmType = PALM_TYPES.UNDEFINED;
    }
    clearImages() {
        showImage(this.canvas, "");
    }
    start() {
        this.payload.action = "scanner-start";
        this.ws.respondToDeviceWS(this.payload);
    }
    async capture() {
        this.showLoader = true;
        if (!this.canCapture()) {
            notify(this.componentContainer, "warning", "Selecione o tipo de ficha e categoria (caso a ficha seja palmar)");
            return;
        }
        scannerScan().then((result) => {
            function _base64ToArrayBuffer(base64) {
                var binary_string = window.atob(base64);
                var len = binary_string.length;
                var bytes = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                    bytes[i] = binary_string.charCodeAt(i);
                }
                return bytes.buffer;
            }
            const buffer = _base64ToArrayBuffer(result.data);
            const tempFile = new File([buffer], "temp_scan.bmp", {
                type: "image/bmp",
            });
            this.loadForm(tempFile);
        });
    }
    close() {
        this.payload.action = "scanner-close";
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
                this.serviceConfigs = await getAppConfig();
                if (this.serviceConfigs) {
                    this.form.configs = this.serviceConfigs.form;
                }
                if (this.detached && this.isTagComponent) {
                    window["getBiometryData"] = () => {
                        return;
                    };
                }
                else if (this.detached) {
                }
                else {
                    this.person = JSON.parse(this.tempPerson);
                }
                this.wsStatusInterval = setInterval(() => {
                    if (this.ws.status() === 1) {
                        clearInterval(this.wsStatusInterval);
                        if (this.deviceReady) {
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
                    }
                    if (data.status === "scanner-get-device-list") {
                        this.deviceList = data.deviceList;
                    }
                    const deviceStatuses = data.deviceStatuses;
                    if (deviceStatuses) {
                        const previousStatus = JSON.parse(JSON.stringify(this.deviceStatus));
                        this.deviceStatus = deviceStatuses.signature && deviceStatuses.signature.initialized;
                        if (!this.deviceStatus) {
                            return;
                        }
                        else if (!previousStatus && this.deviceStatus) {
                            if (!this.deviceOpened) {
                                this.open();
                            }
                            return;
                        }
                    }
                    if (data.originalImage) {
                        this.isCapturing = false;
                        showImage(this.canvas, data.originalImage);
                        this.model = data.deviceInfo.modelName;
                        this.brand = data.deviceInfo.manufacturName;
                        this.serial = data.deviceInfo.serialNumber;
                    }
                });
                this.start();
                this.showLoader = false;
                this.captureInput.onchange = () => {
                    if (this.captureInput.files.length > 0) {
                        this.loadForm(this.captureInput.files[0]);
                    }
                };
            }
            catch (e) {
                this.showLoader = false;
                console.error(e);
            }
        }, 1000);
    }
    componentDidUnload() {
        this.payload.action = "scanner-kill-service";
        this.ws.respondToDeviceWS(this.payload);
    }
    toggleFormModal() {
        this.form.isActive = !this.form.isActive;
        if (!this.form.isActive) {
            this.resetForm();
        }
        this.screenUpdate();
    }
    clearRects() {
        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.form.canvas.width, this.form.canvas.height);
        ctx.drawImage(this.form.fileData.image, 0, 0, this.form.fileData.image.width, this.form.fileData.image.height, 0, 0, this.form.canvas.width, this.form.canvas.height);
    }
    loadForm(file) {
        console.log(file, typeof file);
        const image = new Image();
        const url = window.URL.createObjectURL(file);
        image.onerror = () => {
            notify(this.componentContainer, "error", `A imagem carregada está fora dos padrões. Verifique se o arquivo selecionado está nos padrões:\n
      Tipo: ${this.form.configs.imageType.toUpperCase()} /
      Nível de cinza: ${this.form.configs.bitDepth} /
      DPI Vertical: ${this.form.configs.dpiVertical} /
      DPI Horizontal: ${this.form.configs.dpiHorizontal}
      `);
            return;
        };
        image.onload = () => {
            this.toggleFormModal();
            this.form.canvas.width = this.formType === FORM_TYPE.DECADACTILAR ? 450 : 327;
            this.form.canvas.height = this.formType === FORM_TYPE.DECADACTILAR ? 327 : 450;
            setTimeout(() => {
                this.form.file = file;
                this.form.fileData = {
                    image: image,
                    width: image.width,
                    height: image.height,
                    type: image.type,
                    size: file.size,
                    resizeParameters: {
                        width: this.form.canvas.width,
                        height: this.form.canvas.height,
                    }
                };
                const formData = new FormData();
                formData.append("form_file", this.form.file);
                formData.set("dataOptions", JSON.stringify(this.form.fileData));
                if (this.person.id) {
                    formData.set("personId", JSON.stringify(this.person.id));
                }
                this.showLoader = true;
                if (this.formType === FORM_TYPE.DECADACTILAR) {
                    loadFingerForm(formData).then((result) => {
                        if (result.message) {
                            notify(this.componentContainer, "warning", result.message);
                            this.showLoader = false;
                            this.toggleFormModal();
                            return;
                        }
                        this.form.success = result && result.length > 0;
                        this.form.requiresManualSelection = !this.form.success;
                        if (this.form.success) {
                            this.form.croppedFingers = result;
                            if (this.detached) {
                                this.saveFingersToSession();
                            }
                        }
                        else {
                            notify(this.componentContainer, "warning", "Não foi possível realizar o recorte automático das digitais. Realize as marcações e tente novamente");
                        }
                        this.showLoader = false;
                    });
                }
                else {
                    formData.set("palmType", JSON.stringify(this.palmType));
                    loadPalmForm(formData).then((result) => {
                        if (result.message) {
                            notify(this.componentContainer, "warning", result.message);
                            this.showLoader = false;
                            this.toggleFormModal();
                            return;
                        }
                        this.form.success = result.hasOwnProperty("palm");
                        this.form.requiresManualSelection = !this.form.success;
                        if (this.form.success) {
                            this.form.croppedPalm = result.palm;
                            const palm = { type_id: this.palmType, data: this.form.croppedPalm };
                            if (this.detached) {
                                this.savePalmToSession(palm);
                            }
                            this.insertPalm(palm);
                        }
                        else {
                            notify(this.componentContainer, "warning", "Não foi possível realizar o recorte automático da palma. Realize a marcação e tente novamente");
                        }
                        this.showLoader = false;
                    });
                }
            }, 1000);
            setTimeout(() => {
                if (this.canvas.getContext) {
                    const ctx = this.canvas.getContext('2d');
                    ctx.strokeStyle = "red";
                    ctx.lineWidth = 1;
                    const canvasOffset = this.canvas.getBoundingClientRect();
                    const offsetX = canvasOffset.left;
                    const offsetY = canvasOffset.top;
                    let isDown = false;
                    let startX;
                    let startY;
                    const handleMouseDown = (e) => {
                        if (this.formType === FORM_TYPE.DECADACTILAR && this.form.selectedFinger === undefined) {
                            return;
                        }
                        e.preventDefault();
                        e.stopPropagation();
                        startX = e.clientX - offsetX;
                        startY = e.clientY - offsetY;
                        isDown = true;
                    };
                    const handleMouseUp = (e) => {
                        if (this.formType === FORM_TYPE.DECADACTILAR && this.form.selectedFinger === undefined) {
                            notify(this.componentContainer, "warning", "Selecione um dedo para iniciar a marcação");
                            return;
                        }
                        e.preventDefault();
                        e.stopPropagation();
                        isDown = false;
                        if (this.formType === FORM_TYPE.DECADACTILAR) {
                            this.form.fingerSelections[this.form.selectedFinger] = {
                                topLeft: { x: startX, y: startY },
                                bottomRight: { x: e.offsetX, y: e.offsetY },
                                index: this.form.selectedFinger,
                                collected: true
                            };
                            if (this.form.autoNext) {
                                if (this.form.selectedFinger < 9) {
                                    this.form.selectedFinger = this.form.selectedFinger + 1;
                                }
                                else {
                                    this.form.selectedFinger = undefined;
                                }
                            }
                        }
                        else {
                            this.form.palmSelection = {
                                topLeft: { x: startX, y: startY },
                                bottomRight: { x: e.offsetX, y: e.offsetY },
                                collected: true
                            };
                        }
                        this.screenUpdate();
                    };
                    const handleMouseOut = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        isDown = false;
                    };
                    const handleMouseMove = (e) => {
                        let mouseX, mouseY;
                        e.preventDefault();
                        e.stopPropagation();
                        if (!isDown) {
                            return;
                        }
                        mouseX = e.clientX - offsetX;
                        mouseY = e.clientY - offsetY;
                        ctx.clearRect(0, 0, this.form.canvas.width, this.form.canvas.height);
                        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, this.form.canvas.width, this.form.canvas.height);
                        const width = mouseX - startX;
                        const height = mouseY - startY;
                        ctx.strokeRect(startX, startY, width, height);
                    };
                    this.canvas.addEventListener('mousedown', (e) => {
                        handleMouseDown(e);
                    });
                    this.canvas.addEventListener('mousemove', (e) => {
                        handleMouseMove(e);
                    });
                    this.canvas.addEventListener('mouseup', (e) => {
                        handleMouseUp(e);
                    });
                    this.canvas.addEventListener('mouseout', (e) => {
                        handleMouseOut(e);
                    });
                    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, this.form.canvas.width, this.form.canvas.height);
                    this.screenUpdate();
                }
            }, 1000);
        };
        image.src = url;
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
    sendFingersInformation(finger) {
        this.payload.action = "store-session";
        this.payload.data = {
            type: "MODAL",
            owner: "default-user",
            biometry: finger
        };
        this.ws.respondToDeviceWS(this.payload);
    }
    saveFingersToSession() {
        this.form.croppedFingers.forEach((finger) => {
            finger.captureType = constants.captureTypes.ONE_FINGER_FLAT;
            finger.wsqData = finger.wsq.data;
            finger.nfiqScore = finger.wsq.nfiqScore;
            finger.fingerIndex = finger.index;
            this.sendFingersInformation(finger);
        });
    }
    savePalmToSession(palm) {
        this.payload.action = "store-session";
        this.payload.data = {
            type: "PALM",
            owner: "default-user",
            biometry: palm
        };
        this.ws.respondToDeviceWS(this.payload);
    }
    insertPalm(palm) {
        const index = this.form.palms.findIndex((p) => {
            return p.type_id === palm.type_id;
        });
        if (index >= 0) {
            this.form.palms[index] = palm;
        }
        else {
            this.form.palms.push(palm);
        }
    }
    setDeviceSelection(event) {
        this.selectedDevice = event.target.value;
    }
    setFormTypeSelection(event) {
        this.formType = parseInt(event.target.value, 10);
        this.palmType = PALM_TYPES.UNDEFINED;
    }
    setPalmarTypeSelection(event) {
        this.palmType = parseInt(event.target.value, 10);
    }
    setAutoNextSelection(event) {
        this.form.autoNext = event.target.checked;
    }
    resetForm() {
        this.form = {
            configs: this.form.configs,
            canvas: {
                width: 327,
                height: 450,
            },
            isActive: false,
            file: undefined,
            fileData: {},
            src: undefined,
            autoNext: true,
            fingerSelections: [
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 0, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 1, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 2, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 3, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 4, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 5, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 6, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 7, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 8, collected: false },
                { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 }, index: 9, collected: false },
            ],
            palmSelection: {
                collected: false,
                topLeft: { x: 0, y: 0 },
                bottomRight: { x: 0, y: 0 },
            },
            requiresManualSelection: true,
            selectedFinger: undefined,
            success: false,
            croppedFingers: [],
            palms: this.form.palms
        };
    }
    closeFingerModal() {
        this.form.isActive = false;
        this.screenUpdate();
        this.captureInput.files = undefined;
        this.captureInput.value = '';
        this.resetForm();
    }
    manualCrop() {
        this.clearRects();
        this.showLoader = true;
        const formData = new FormData();
        formData.append("form_file", this.form.file);
        formData.set("dataOptions", JSON.stringify(this.form.fileData));
        if (this.person.id) {
            formData.set("personId", JSON.stringify(this.person.id));
        }
        if (this.formType === FORM_TYPE.DECADACTILAR) {
            formData.set("fingerSelections", JSON.stringify(this.form.fingerSelections));
            loadFingerForm(formData).then((result) => {
                this.form.success = result && result.length > 0;
                if (this.form.success) {
                    this.form.croppedFingers = result;
                    if (this.detached) {
                        this.saveFingersToSession();
                    }
                }
                else {
                    notify(this.componentContainer, "warning", "Não foi possível realizar o recorte das digitais. Verifique as marcações e tente novamente");
                }
                this.showLoader = false;
            });
        }
        else {
            formData.set("palmSelection", JSON.stringify(this.form.palmSelection));
            formData.set("palmType", JSON.stringify(this.palmType));
            loadPalmForm(formData).then((result) => {
                this.form.success = result.hasOwnProperty("palm");
                if (this.form.success) {
                    this.form.croppedPalm = result.palm;
                    const palm = { type_id: this.palmType, data: this.form.croppedPalm };
                    if (this.detached) {
                        this.savePalmToSession(palm);
                    }
                    this.insertPalm(palm);
                }
                else {
                    notify(this.componentContainer, "warning", "Não foi possível realizar o recorte automático da palma. Realize a marcação e tente novamente");
                }
                this.showLoader = false;
            });
        }
    }
    screenUpdate() {
        this.componentContainer.forceUpdate();
    }
    canCapture() {
        return (this.formType === FORM_TYPE.DECADACTILAR || (this.formType === FORM_TYPE.PALMAR && this.palmType !== PALM_TYPES.UNDEFINED));
    }
    canUpload() {
        return this.formType === FORM_TYPE.DECADACTILAR || (this.formType === FORM_TYPE.PALMAR && this.palmType !== PALM_TYPES.UNDEFINED);
    }
    showFingerSelectionRect(finger) {
        this.form.selectedFinger = finger.index;
        if (this.canvas && this.canvas.getContext) {
            const ctx = this.canvas.getContext('2d');
            ctx.clearRect(0, 0, this.form.canvas.width, this.form.canvas.height);
            ctx.drawImage(this.form.fileData.image, 0, 0, this.form.fileData.width, this.form.fileData.height, 0, 0, this.form.canvas.width, this.form.canvas.height);
            const topLeftX = this.form.fingerSelections[finger.index].topLeft.x;
            const topLeftY = this.form.fingerSelections[finger.index].topLeft.y;
            const width = this.form.fingerSelections[finger.index].bottomRight.x - this.form.fingerSelections[finger.index].topLeft.x;
            const height = this.form.fingerSelections[finger.index].bottomRight.y - this.form.fingerSelections[finger.index].topLeft.y;
            ctx.strokeRect(topLeftX, topLeftY, width, height);
            this.screenUpdate();
        }
    }
    fingerSelection(rightHand = false) {
        let handFingers = [];
        if (rightHand) {
            handFingers = this.form.fingerSelections.slice(0, 5);
        }
        else {
            handFingers = this.form.fingerSelections.slice(5, 10);
        }
        return handFingers.map((finger) => {
            return (h("div", { class: "control" },
                h("label", { class: "radio", style: { marginTop: "2px" } },
                    h("input", { type: "radio", name: "selectedFinger", value: this.form.selectedFinger, onChange: () => this.showFingerSelectionRect(finger), checked: this.form.selectedFinger === finger.index }),
                    constants.fingerNames[finger.index]),
                h("span", { style: { fontSize: "12px", color: `${finger.collected ? "rgb(0, 183, 39)" : "rgba(255, 0, 0, 0.7)"}` } },
                    " (",
                    finger.collected ? "Marcado" : "Não marcado",
                    ") ")));
        });
    }
    fingerResult(rightHand = false) {
        let handFingers = [];
        if (rightHand) {
            handFingers = this.form.croppedFingers.slice(0, 5);
        }
        else {
            handFingers = this.form.croppedFingers.slice(5, 10);
        }
        return handFingers.map((finger) => {
            return (h("div", { class: "column has-text-centered" },
                h("p", null,
                    " ",
                    constants.fingerNames[finger.index],
                    " "),
                h("div", { style: { minWidth: "150px", maxWidth: "150px", minHeight: "170px", maxHeight: "170px", alignItems: "center", display: "flex", justifyContent: "center" } },
                    h("img", { src: `data:image/charset=UTF-8;png;base64,${finger.data}`, style: { border: "1px solid #0000003d", maxHeight: "170px", maxWidth: "170px" } })),
                h("p", null,
                    " NFiq: ",
                    finger.nfiq,
                    " ")));
        });
    }
    retryManualCrop() {
        this.form.requiresManualSelection = true;
        this.form.success = false;
        this.screenUpdate();
    }
    getResult() {
        if (this.formType === FORM_TYPE.DECADACTILAR) {
            return (h("div", null,
                h("h6", null, " M\u00E3o direita "),
                h("div", { style: { display: "flex", justifyContent: "space-around" } }, this.fingerResult(true)),
                h("h6", null, " M\u00E3o esquerda "),
                h("div", { style: { display: "flex", justifyContent: "space-around" } }, this.fingerResult())));
        }
        else {
            return (h("div", null,
                h("div", { class: "column has-text-centered" },
                    h("p", null,
                        " ",
                        PALM_NAMES[this.palmType],
                        " "),
                    h("div", { style: { alignItems: "center", display: "flex", justifyContent: "center" } },
                        h("img", { src: `data:image/charset=UTF-8;png;base64,${this.form.croppedPalm}`, style: { border: "1px solid #0000003d", maxHeight: "170px", maxWidth: "170px" } })))));
        }
    }
    isPalmCaptured(type) {
        return this.form.palms.findIndex((palm) => palm.type_id === type) >= 0;
    }
    showModal(type) {
        const palm = this.form.palms.find((palm) => {
            return palm.type_id === type;
        });
        this.modal.src = `data:image/charset=UTF-8;png;base64,${palm.data}`;
        this.modal.active = true;
        this.componentContainer.forceUpdate();
    }
    hideModal() {
        this.modal.src = "";
        this.modal.active = false;
        this.componentContainer.forceUpdate();
    }
    palmCaptures() {
        return (h("div", { class: "columns is-mobile", style: { justifyContent: "space-evenly", marginTop: "10px", marginBottom: "20px" } },
            h("div", { class: "is-narrow" },
                h("div", null,
                    h("img", { src: "./assets/general/left_hand_writer.png", title: "Hipotenar esquerda", class: `fab-icon is-pulled-left ${this.isPalmCaptured(PALM_TYPES.LEFT_HYPOTHENAR) ? "" : "not-captured"}`, onClick: () => this.showModal(PALM_TYPES.LEFT_HYPOTHENAR) }))),
            h("div", { class: "is-narrow" },
                h("div", null,
                    h("img", { src: "./assets/general/left_hand_palm.png", title: "Palma esquerda", class: `fab-icon is-pulled-left ${this.isPalmCaptured(PALM_TYPES.LEFT_PALM) ? "" : "not-captured"}`, onClick: () => this.showModal(PALM_TYPES.LEFT_PALM) }))),
            h("div", { class: "is-narrow" },
                h("div", null,
                    h("img", { src: "./assets/general/right_hand_palm.png", title: "Palma direita", class: `fab-icon is-pulled-left ${this.isPalmCaptured(PALM_TYPES.RIGHT_PALM) ? "" : "not-captured"}`, onClick: () => this.showModal(PALM_TYPES.RIGHT_PALM) }))),
            h("div", { class: "is-narrow" },
                h("div", null,
                    h("img", { src: "./assets/general/right_hand_writer.png", title: "Hipotenar direita", class: `fab-icon is-pulled-left ${this.isPalmCaptured(PALM_TYPES.RIGHT_HYPOTHENAR) ? "" : "not-captured"}`, onClick: () => this.showModal(PALM_TYPES.RIGHT_HYPOTHENAR) })))));
    }
    render() {
        return (h("div", { class: "window-size" },
            h("loader-component", { enabled: this.showLoader }),
            h("div", { id: "notification-container" }),
            h("div", { class: "columns is-mobile" },
                h("div", { class: "column is-half" },
                    h("h6", { class: "mb-10 is-6 has-text-info has-text-weight-semibold" }, "Tipo de ficha"),
                    h("div", { class: "mb-10" },
                        h("div", { class: "select is-small inline" },
                            h("select", { onChange: this.setFormTypeSelection.bind(this) },
                                h("option", { value: FORM_TYPE.UNDEFINED }, " Selecione o tipo de ficha "),
                                h("option", { value: FORM_TYPE.DECADACTILAR }, " Decadactilar Pousada "),
                                h("option", { value: FORM_TYPE.PALMAR }, " Palmar ")))),
                    this.formType === FORM_TYPE.PALMAR ?
                        h("div", { class: "mb-10" },
                            h("div", { class: "select is-small inline" },
                                h("select", { onChange: this.setPalmarTypeSelection.bind(this) },
                                    h("option", { value: PALM_TYPES.UNDEFINED }, " Selecione a categoria "),
                                    h("option", { value: PALM_TYPES.RIGHT_PALM }, " Palma direita "),
                                    h("option", { value: PALM_TYPES.RIGHT_HYPOTHENAR }, " Hipotenar direita "),
                                    h("option", { value: PALM_TYPES.LEFT_PALM }, " Palma esquerda "),
                                    h("option", { value: PALM_TYPES.LEFT_HYPOTHENAR }, " Hipotenar esquerda ")))) : null,
                    this.formType === FORM_TYPE.PALMAR ?
                        h("div", null,
                            h("h6", { class: "mb-10 is-6 has-text-info has-text-weight-semibold" }, "Estado das capturas"),
                            this.palmCaptures()) : null,
                    h("div", { class: "mb-10" },
                        h("h6", { class: "mb-10 is-6 has-text-info has-text-weight-semibold" }, "Scanner")),
                    h("div", { class: "mb-10" },
                        h("a", { class: `button is-small action-button ${this.canCapture() ? "" : "disabled"}`, title: `${this.deviceReady ? "Clique aqui para realizar a captura" : "Inicialize um dispositivo antes de capturar"}`, onClick: () => this.capture() }, "Capturar")),
                    h("h6", { class: "mb-10 is-6 has-text-info has-text-weight-semibold" }, "Arquivo"),
                    h("div", { class: "mb-10" },
                        h("div", { id: "capture-file", class: `file is-small is-info ${this.canUpload() ? "" : "disabled"}` },
                            h("label", { class: "file-label" },
                                h("input", { ref: (el) => this.captureInput = el, class: "file-input", type: "file", name: "resume", accept: `image/${(this.form.configs && this.form.configs.imageType) || 'bmp'}`, disabled: !this.canUpload() }),
                                h("span", { class: "button is-small action-button" },
                                    h("span", { class: "file-label" }, "Carregar arquivo"))))))),
            h("div", { class: `modal ${this.modal.active ? "show-modal" : ""}` },
                h("span", { class: "close", onClick: () => this.hideModal() }, "\u00D7"),
                h("img", { class: "modal-content-view mt-20", src: this.modal.src })),
            h("div", { class: `${this.form.isActive ? 'is-active' : ''} modal modal-full-screen modal-fx-fadeInScale` }, this.form.isActive ?
                h("div", { class: "modal-content modal-card model-content-margin-fix w-100 h-100" },
                    h("header", { class: "modal-card-head no-border-radius" },
                        h("p", { class: "modal-card-title" }, `${this.formType === FORM_TYPE.DECADACTILAR ? "Ficha Decadactilar Pousada" : "Ficha Palmar"}`),
                        h("button", { class: "modal-button-close delete", onClick: () => this.closeFingerModal() })),
                    h("section", { class: "modal-card-body section-body" },
                        h("div", { class: "canvas-container" },
                            h("canvas", { ref: (el) => this.canvas = el, width: this.form.canvas.width, height: this.form.canvas.height, id: "formCanvas", class: "canvas" })),
                        this.form.requiresManualSelection && this.form.success === false ?
                            h("div", null,
                                h("p", null,
                                    h("div", { class: "selection-container" },
                                        this.formType === FORM_TYPE.DECADACTILAR ?
                                            h("div", null,
                                                h("h6", { class: "title is-6 has-text-info has-text-weight-semibold" }, "Marca\u00E7\u00F5es"),
                                                h("label", { class: "checkbox" },
                                                    h("input", { type: "checkbox", checked: this.form.autoNext, onChange: this.setAutoNextSelection.bind(this) }),
                                                    "Avan\u00E7ar sele\u00E7\u00E3o automaticamente")) : null,
                                        h("a", { onClick: () => this.manualCrop(), class: "button is-small action-button is-pulled-right finish-retry-button" }, "Finalizar marca\u00E7\u00F5es")),
                                    this.formType === FORM_TYPE.DECADACTILAR ?
                                        h("div", { class: "d-flex columns mt-10" },
                                            h("div", { style: { marginLeft: "10px", marginRight: "10px" } },
                                                h("h6", null, " M\u00E3o direita "),
                                                h("div", { style: { marginTop: "10px", marginLeft: "10px" } }, this.fingerSelection(true))),
                                            h("div", { style: { marginLeft: "10px", marginRight: "10px" } },
                                                h("h6", null, " M\u00E3o esquerda "),
                                                h("div", { style: { marginTop: "10px", marginLeft: "10px" } }, this.fingerSelection())))
                                        : h("div", null,
                                            h("span", { style: { fontSize: "12px", color: `${this.form.palmSelection.collected ? "rgb(0, 183, 39)" : "rgba(255, 0, 0, 0.7)"}` } },
                                                " (",
                                                this.form.palmSelection.collected ? "Marcado" : "Não marcado",
                                                ") "))))
                            : null,
                        this.form.success ?
                            h("div", null,
                                h("hr", { style: { margin: "15px !important" } }),
                                h("div", { style: { display: "flex", marginTop: "10px", position: "relative" } },
                                    h("h6", { class: "title is-6 has-text-info has-text-weight-semibold" }, "Resultado"),
                                    h("a", { onClick: () => this.retryManualCrop(), class: "button is-small action-button is-pulled-right", style: { marginTop: "8px", right: "0", position: "absolute" } }, "Revisar marca\u00E7\u00F5es")),
                                this.getResult())
                            : null))
                : null)));
    }
    static get is() { return "openbio-scanner-details"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "backendSession": {
            "state": true
        },
        "brand": {
            "state": true
        },
        "captureInput": {
            "state": true
        },
        "componentContainer": {
            "elementRef": true
        },
        "detached": {
            "type": Boolean,
            "attr": "detached"
        },
        "deviceList": {
            "state": true
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
        "form": {
            "state": true
        },
        "formType": {
            "state": true
        },
        "imgTest": {
            "state": true
        },
        "isCapturing": {
            "state": true
        },
        "isTagComponent": {
            "type": Boolean,
            "attr": "is-tag-component"
        },
        "modal": {
            "state": true
        },
        "model": {
            "state": true
        },
        "palmType": {
            "state": true
        },
        "person": {
            "state": true
        },
        "selectedDevice": {
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
        "tempPerson": {
            "type": "Any",
            "attr": "temp-person"
        }
    }; }
    static get style() { return "/**style-placeholder:openbio-scanner-details:**/"; }
}
