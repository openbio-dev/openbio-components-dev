import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import { h } from "@stencil/core";
import * as faceapi from 'face-api.js';
import OMA from './api';
import { TranslationUtils } from '../../locales/translation';
const VERSION = 3.7;
var ACTIONS;
(function (ACTIONS) {
    ACTIONS["REGISTER"] = "REGISTER";
    ACTIONS["VERIFY"] = "VERIFY";
    ACTIONS["IDENTIFY"] = "IDENTIFY";
})(ACTIONS || (ACTIONS = {}));
var RESULT_STATUS;
(function (RESULT_STATUS) {
    RESULT_STATUS[RESULT_STATUS["REGISTERED"] = 0] = "REGISTERED";
    RESULT_STATUS[RESULT_STATUS["REGISTER_FAILED"] = 1] = "REGISTER_FAILED";
    RESULT_STATUS[RESULT_STATUS["VERIFIED"] = 2] = "VERIFIED";
    RESULT_STATUS[RESULT_STATUS["VERIFICATION_FAILED"] = 3] = "VERIFICATION_FAILED";
    RESULT_STATUS[RESULT_STATUS["REMOVED"] = 4] = "REMOVED";
    RESULT_STATUS[RESULT_STATUS["REMOVE_FAILED"] = 5] = "REMOVE_FAILED";
    RESULT_STATUS[RESULT_STATUS["UPDATED"] = 6] = "UPDATED";
    RESULT_STATUS[RESULT_STATUS["UPDATE_FAILED"] = 7] = "UPDATE_FAILED";
    RESULT_STATUS[RESULT_STATUS["MATCH_FOUND"] = 8] = "MATCH_FOUND";
    RESULT_STATUS[RESULT_STATUS["NO_MATCH_FOUND"] = 9] = "NO_MATCH_FOUND";
    RESULT_STATUS[RESULT_STATUS["MATCH_FAILED"] = 10] = "MATCH_FAILED";
    RESULT_STATUS[RESULT_STATUS["POOR_IMAGE_QUALITY"] = 11] = "POOR_IMAGE_QUALITY";
    RESULT_STATUS[RESULT_STATUS["ID_EXISTS"] = 12] = "ID_EXISTS";
    RESULT_STATUS[RESULT_STATUS["ID_DOES_NOT_EXISTS"] = 13] = "ID_DOES_NOT_EXISTS";
    RESULT_STATUS[RESULT_STATUS["SEARCH_FAIL"] = 14] = "SEARCH_FAIL";
})(RESULT_STATUS || (RESULT_STATUS = {}));
export class OpenbioFaceOmaComponent {
    constructor() {
        this.DEBUG = false;
        this.MODEL_URL = 'https://openbio-components-files.s3.sa-east-1.amazonaws.com/models/';
        this.defaultWidth = 640;
        this.defaultHeight = 480;
        this.livenessMin = 0.8;
        this.allowNoncomplianceRecordUpdate = false;
        this.locale = 'pt';
        this.showHeader = false;
        this.showFullscreenLoader = false;
        this.captured = false;
        this.videoInterval = undefined;
        this.lowerCameraQualityDetected = false;
        this.isMobile = false;
        this.mobileCameraStartControl = 0;
    }
    async listenLocale(newValue) {
        this.setI18nParameters(newValue);
    }
    ;
    // ===========================================
    // COMPONENT GENERAL
    // ===========================================
    async setI18nParameters(locale) {
        TranslationUtils.setLocale(locale);
        this.translations = await TranslationUtils.fetchTranslations();
        this.screenUpdate();
    }
    addCustomLink(url) {
        let element = document.querySelector(`link[href="${url}"]`);
        if (!element) {
            element = document.createElement('link');
            element.setAttribute('rel', 'stylesheet');
            element.setAttribute('href', url);
            document.head.appendChild(element);
        }
    }
    async componentWillLoad() {
        this.setI18nParameters(this.locale);
        this.addCustomLink("https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css");
        this.addCustomLink("https://cdn.jsdelivr.net/npm/@mdi/font@6.6.96/css/materialdesignicons.min.css");
        this.addCustomLink("https://fonts.googleapis.com/css?family=Poppins");
    }
    checkMobile() {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];
        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    }
    showHelpModal() {
        const html = `
      - Limpe a área da câmera <br/>
      - Procure um local com boa iluminação <br/>
      - Capture uma imagem que apareça somente você <br/>
      - Todo o seu rosto deve estar visível <br/>
    `;
        return Swal.fire({
            type: "info",
            html,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonColor: this.primaryColor || '#0D3F56',
            confirmButtonText: 'Entendi',
        });
    }
    componentDidLoad() {
        this.getDeviceList();
        this.isMobile = this.checkMobile();
        if (this.isMobile) {
            this.showHelpModal();
            this.startCamera();
        }
        else {
            this.startFaceApi();
        }
    }
    screenUpdate() {
        this.componentContainer.forceUpdate();
    }
    startFaceApi() {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(this.MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(this.MODEL_URL),
        ]).then(() => this.startCamera());
    }
    getDeviceList() {
        if (navigator.mediaDevices.enumerateDevices) {
            navigator.mediaDevices.enumerateDevices().then((devices) => {
                this.deviceList = devices.filter((d) => d.kind === 'videoinput');
                this.screenUpdate();
            });
        }
    }
    startCamera() {
        this.captured = false;
        const videoElement = document.getElementsByTagName("openbio-oma-face")[0].lastElementChild.getElementsByClassName("webcam-video")[0];
        videoElement.setAttribute('autoplay', '');
        videoElement.setAttribute('muted', '');
        videoElement.setAttribute('playsinline', '');
        if (this.currentStream) {
            this.currentStream.getTracks().forEach((track) => {
                track.stop();
            });
        }
        if (navigator.mediaDevices.getUserMedia) {
            console.log("Starting camera...");
            navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1440 },
                    height: { ideal: 1080 },
                    deviceId: { exact: this.selectedDevice || undefined },
                },
            })
                .then((stream) => {
                this.currentStream = stream;
                this.getDeviceList();
                videoElement.srcObject = stream;
                setTimeout(async () => {
                    if (!this.isMobile) {
                        faceapi.env.setEnv(Object.assign({}, faceapi.env.createBrowserEnv()));
                    }
                    videoElement.play();
                    this.videoSettings = stream.getVideoTracks()[0].getSettings();
                    this.selectedDevice = this.videoSettings.deviceId;
                    if (this.isMobile && this.mobileCameraStartControl === 0) {
                        this.setDevice({ target: { value: this.selectedDevice } });
                        this.mobileCameraStartControl++;
                    }
                    this.screenUpdate();
                    this.lowerCameraQualityDetected = this.videoSettings.height < 1080;
                    const canvas = document.getElementsByTagName("openbio-oma-face")[0].lastElementChild.getElementsByClassName("face-canvas")[0];
                    if (!this.isMobile) {
                        const displaySize = { width: 640, height: 480 };
                        faceapi.matchDimensions(canvas, displaySize);
                        this.videoInterval = setInterval(async () => {
                            this.screenUpdate();
                            const detections = await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions());
                            const resizedDetections = faceapi.resizeResults(detections, displaySize);
                            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                            faceapi.draw.drawDetections(canvas, resizedDetections);
                            if (resizedDetections.length) {
                                const { box } = resizedDetections[0];
                                const x1 = box.topLeft.x;
                                const x2 = box.topRight.x;
                                const y1 = box.topLeft.y;
                                const y2 = box.bottomLeft.y;
                                const frameWidth = 640 * 0.3;
                                const frameHeight = 480 * 0.15;
                                const isInside = x1 > frameWidth && x2 < (frameWidth + 250) && y1 > frameHeight && y2 < (frameHeight + 333);
                                const drawOptions = {
                                    lineWidth: 2,
                                    boxColor: 'red',
                                };
                                if (isInside) {
                                    const alertType = box.width > 250 || box.width < 125 ? -1 :
                                        box.width > 125 && box.width < 185 ? 0 : 1;
                                    drawOptions.boxColor = alertType === -1 ? 'red' : alertType === 0 ? 'yellow' : 'green';
                                    drawOptions.label = alertType === -1 ? 'Muito distante' : alertType === 0 ? 'Aproxime-se da câmera' : 'Posição OK';
                                    if (alertType === 0) {
                                        drawOptions.drawLabelOptions = {
                                            fontColor: 'black'
                                        };
                                    }
                                }
                                else {
                                    drawOptions.label = 'Fora de enquadramento';
                                }
                                const drawBox = new faceapi.draw.DrawBox(box, drawOptions);
                                drawBox.draw(canvas);
                            }
                        }, 100);
                    }
                }, 1 * 1000);
            })
                .catch((e) => {
                alert(e);
                console.error(e);
            });
        }
    }
    stopVideo() {
        clearInterval(this.videoInterval);
        this.videoInterval = undefined;
        this.videoElement.pause();
        this.screenUpdate();
    }
    getVideoAspectRatio() {
        return this.videoSettings.width / this.videoSettings.height;
    }
    async getImageFromVideo() {
        return new Promise(async (resolve) => {
            // if (this.isMobile) {
            //   const canvas = document.createElement('canvas');
            //   canvas.width = this.videoElement.videoWidth;
            //   canvas.height = this.videoElement.videoHeight;
            //   const ctx = canvas.getContext('2d');
            //   ctx.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);
            //   canvas.toBlob((blob) => {
            //     var reader = new FileReader();
            //     reader.onload = () => {
            //       this.capturedImage = {
            //         data: canvas.toDataURL('image/jpeg', 1),
            //         file: new File([reader.result], "image.jpeg", { type: blob.type })
            //       }
            //       resolve(true);
            //     };
            //     reader.readAsArrayBuffer(blob);
            //   });
            // } else {
            const canvas = document.createElement('canvas');
            const finalWidth = this.lowerCameraQualityDetected || this.isMobile ? this.videoSettings.width : 1440;
            const finalHeight = this.lowerCameraQualityDetected || this.isMobile ? this.videoSettings.height : 1080;
            canvas.width = finalWidth; // this.cameraWidth || this.defaultWidth;
            canvas.height = finalHeight; // this.cameraHeight || this.defaultHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);
            const aspectRatio = this.getVideoAspectRatio();
            const maskPositionX = this.isMobile ? 0.15 : 0.30;
            const maskPositionY = this.isMobile || aspectRatio.toFixed(2) === '1.33' ? 0.15 : 0.04;
            const srcX = finalWidth * maskPositionX;
            const srcY = finalHeight * maskPositionY;
            const srcWidth = 250;
            const srcHeight = 333;
            const cropWidth = (finalWidth * srcWidth) / (this.isMobile ? 340 : this.defaultWidth);
            const cropHeight = (finalHeight * srcHeight) / (this.isMobile || aspectRatio.toFixed(2) === '1.33' ? this.defaultHeight : ((this.videoSettings.height / 2) - 5));
            const cropCanvas = document.createElement('canvas');
            cropCanvas.width = cropWidth;
            cropCanvas.height = cropHeight;
            const ctxCrop = cropCanvas.getContext('2d');
            ctxCrop.drawImage(canvas, srcX, srcY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
            cropCanvas.toBlob((blob) => {
                var reader = new FileReader();
                reader.onload = () => {
                    this.capturedImage = {
                        data: cropCanvas.toDataURL('image/jpeg', 1),
                        file: new File([reader.result], "image.jpeg", { type: blob.type })
                    };
                    resolve(true);
                };
                reader.readAsArrayBuffer(blob);
            });
            // }
        });
    }
    setResultImage() {
        const snapShotElement = document.getElementsByTagName("openbio-oma-face")[0].lastElementChild.getElementsByClassName("webcam-snapshot")[0];
        snapShotElement.src = this.capturedImage.data;
        this.captured = true;
        this.screenUpdate();
        setTimeout(() => {
            this.showFullscreenLoader = false;
        }, 1000);
    }
    getCaptureText() {
        return this.captured ? this.translations.TRY_AGAIN : this.translations.MANUAL_CAPTURE;
    }
    // ===========================================
    // BUSINESS RULES AND API CALLS
    // ===========================================
    confirmPicture() {
        const html = `
      <div>
        <img src="${this.capturedImage.data}" class="object-fit-contain" style="max-height: 300px;" />
        <div class="swal2-content">
          <h2 style="display: flex;
            justify-content: center;
            font-size: 1.4em;
            font-weight: 600;
            margin: 20px;
            word-wrap: break-word;"
          >${this.translations.CONFIRM_CAPTURE}</h2>
          <div id="swal2-content" style="display: block;">${this.translations.MAKE_SURE_PHOTO_WELL_FRAME}</div>
        </div>
      </div>
    `;
        return Swal.fire({
            html,
            type: "warning",
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonColor: this.primaryColor || '#0D3F56',
            confirmButtonText: this.translations.CONFIRM,
            cancelButtonText: this.translations.BACK,
        }).then((result) => {
            return result.value;
        });
    }
    showLivenessError() {
        Swal.fire({
            type: "warning",
            title: 'Falha ao verificar vivacidade',
            text: 'Verifique a iluminação e tente refazer a coleta',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonColor: this.primaryColor || '#0D3F56',
            confirmButtonText: this.translations.CONFIRM,
        }).then(() => {
            this.startCamera();
        });
    }
    getOMAMatcherBody() {
        return {
            images: [{ faceType: "front", faceData: this.capturedImage.data }],
            projectID: this.projectId,
            registrationID: this.recordId,
            requestKey: this.requestKey,
            componentVersion: VERSION,
        };
    }
    getOMALivenessBody() {
        const omaLivenessBody = new FormData();
        omaLivenessBody.append('Image', this.capturedImage.file);
        omaLivenessBody.append('data', this.capturedImage.file);
        omaLivenessBody.append('requestKey', this.requestKey);
        omaLivenessBody.append('componentVersion', String(VERSION));
        return omaLivenessBody;
    }
    async checkLiveness() {
        return new Promise(async (resolve) => {
            this.showFullscreenLoader = true;
            const resolveLiveness = await OMA.checkLiveness(this.getOMALivenessBody(), this.token);
            this.showFullscreenLoader = false;
            const msg = `
        [INFO] Liveness min definido: ${this.livenessMin}\n
        [PROP] Tipo Liveness min definido: ${typeof this.livenessMin}\n
        [PROP] Cast Liveness min definido: ${Number(this.livenessMin)}\n
        [PROP] Tipo pós-cast Liveness min definido: ${typeof Number(this.livenessMin)}\n
        [INFO] Liveness prob: ${resolveLiveness.liveness_prob}\n
        [INFO] Liveness ok? ${Number(resolveLiveness.liveness_prob) >= Number(this.livenessMin) ? 'Sim' : 'Não'}
      `;
            if (this.DEBUG) {
                alert(msg);
            }
            resolve(Number(resolveLiveness.liveness_prob) >= Number(this.livenessMin));
        });
    }
    async confirmImageUpdate() {
        Swal.fire({
            type: "warning",
            title: 'Cadastro já existente',
            text: 'Você deseja atualizar o cadastro com a nova captura?',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonColor: this.primaryColor || '#0D3F56',
            confirmButtonText: this.translations.CONFIRM,
            cancelButtonText: this.translations.BACK,
        }).then((result) => {
            if (result.value) {
                this.updateRecord();
            }
        });
    }
    async updateRecord() {
        this.showFullscreenLoader = true;
        if (await this.verify()) {
            this.showFullscreenLoader = true;
            OMA.update(this.getOMAMatcherBody(), this.token).then(() => {
                this.showFullscreenLoader = false;
                if (this.callback) {
                    this.callback({ recordId: this.recordId, image: this.capturedImage.data });
                }
                return Swal.fire({
                    type: "success",
                    title: 'Cadastro atualizado',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonColor: this.primaryColor || '#0D3F56',
                });
            });
        }
        else {
            this.showFullscreenLoader = false;
            return Swal.fire({
                type: "error",
                title: 'Falha ao atualizar cadastro. Autenticidade não verificada.',
                text: 'O ID fornecido já está vinculado a outra pessoa',
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonColor: this.primaryColor || '#0D3F56',
                confirmButtonText: this.translations.BACK,
            });
        }
    }
    async verifyRecordIdExistency() {
        return new Promise(async (resolve) => {
            this.showFullscreenLoader = true;
            const resolveContains = await OMA.contains({ projectID: this.projectId, registrationID: this.recordId, requestKey: this.requestKey }, this.token);
            this.showFullscreenLoader = false;
            if (resolveContains.ResultStatus === RESULT_STATUS.ID_EXISTS) {
                this.confirmImageUpdate();
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    }
    async register() {
        if (await this.checkLiveness()) {
            if (!await this.verifyRecordIdExistency()) {
                this.showFullscreenLoader = true;
                await OMA.register(this.getOMAMatcherBody(), this.token);
                this.showFullscreenLoader = false;
                if (this.callback) {
                    this.callback({ recordId: this.recordId, image: this.capturedImage.data });
                }
                return Swal.fire({
                    type: "success",
                    title: 'Cadastrado com sucesso',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonColor: this.primaryColor || '#0D3F56',
                });
            }
        }
        else {
            return Swal.fire({
                type: "error",
                title: 'Falha na verificação de vivacidade',
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonColor: this.primaryColor || '#0D3F56',
            });
        }
    }
    async verify() {
        return await OMA.verify(this.getOMAMatcherBody(), this.token).then(async (resolve) => {
            this.showFullscreenLoader = false;
            const isMatchOk = resolve.ResultStatus === RESULT_STATUS.VERIFIED;
            if (!isMatchOk) {
                return Swal.fire({
                    type: 'error',
                    title: 'Falha na verificação de autenticidade do registro.',
                    text: this.allowNoncomplianceRecordUpdate ? 'Deseja substituir a foto mesmo assim?' : '',
                    showCloseButton: true,
                    showCancelButton: this.allowNoncomplianceRecordUpdate,
                    focusConfirm: false,
                    confirmButtonColor: this.primaryColor || '#0D3F56',
                }).then((result) => {
                    if (result.value) {
                        return this.allowNoncomplianceRecordUpdate;
                    }
                });
            }
            const livenessOk = await this.checkLiveness();
            if (livenessOk) {
                if (this.callback) {
                    this.callback({ recordId: this.recordId, match: isMatchOk, liveness: livenessOk });
                    return Swal.fire({
                        type: 'success',
                        title: 'Autenticado',
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonColor: this.primaryColor || '#0D3F56',
                    });
                }
                else {
                    return isMatchOk;
                }
            }
            else {
                return Swal.fire({
                    type: 'warning',
                    title: 'Registro verificado. Falha na verificação de vivacidade.',
                    showCloseButton: true,
                    showCancelButton: this.allowLivenessNoncompliance,
                    focusConfirm: false,
                    cancelButtonText: 'Voltar',
                    confirmButtonText: this.allowLivenessNoncompliance ? 'Estou de acordo' : 'OK',
                    confirmButtonColor: this.primaryColor || '#0D3F56',
                }).then((result) => {
                    if (result.value) {
                        if (this.callback) {
                            return this.callback({ recordId: this.recordId, match: isMatchOk, liveness: livenessOk });
                        }
                        else {
                            return isMatchOk;
                        }
                    }
                });
            }
        });
    }
    async takeSnapShot() {
        this.stopVideo();
        await this.getImageFromVideo();
        if (await this.confirmPicture()) {
            this.showFullscreenLoader = true;
            if (this.action === ACTIONS.REGISTER) {
                this.register();
            }
            else {
                this.verify();
            }
            this.setResultImage();
        }
        else {
            this.startCamera();
        }
    }
    setDevice(event) {
        const value = event.target.value;
        this.selectedDevice = value;
        this.stopVideo();
        this.startCamera();
    }
    // ===========================================
    // RENDER
    // ===========================================
    render() {
        const deviceOptions = (this.deviceList || []).map((device) => {
            return (h("option", { value: device.deviceId, selected: this.selectedDevice === device.deviceId }, device.label || device.deviceId));
        });
        const overlay = () => {
            return h("svg", { width: "100%", height: "100%", viewBox: this.isMobile ? "0 0 360 480" : "0 0 640 480", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
                h("defs", null,
                    h("mask", { id: "overlay-mask", x: "0", y: "0", width: "100%", height: "100%" },
                        h("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: "#fff" }),
                        h("rect", { x: this.isMobile ? "15%" : "30%", y: "15%", width: "250", height: "333" }))),
                h("rect", { x: "0", y: "0", width: "100%", height: "99%", mask: "url(#overlay-mask)" }));
        };
        return (h("div", { style: { "background-color": this.containerBackgroundColor || "#FFFFFF" } },
            h("div", { class: "window-size", style: { "padding": '0' } },
                h("loader-component", { enabled: this.showFullscreenLoader }),
                h("div", { id: "notification-container" }),
                this.showHeader && h("nav", { class: 'navbar', style: { "background-color": this.primaryColor || "#0D3F56" } },
                    h("div", { class: 'title is-3 has-text-centered', style: { "width": "100%", "color": this.textColor || "#FFFFFF", "padding-top": "7px" } }, this.headerTitle || this.translations.BIOMETRIC_AUTHENTICATION)),
                h("div", { class: 'level', style: { "margin-top": "30px" } },
                    h("div", { class: 'rows has-text-centered', style: { width: "100%" } },
                        this.deviceList && this.deviceList.length > 0 &&
                            h("div", { class: "columns is-mobile is-centered" },
                                h("div", { class: "column" },
                                    h("span", { style: { fontSize: '0.9em' } }, " C\u00E2mera: "),
                                    h("div", { class: "select is-small inline" },
                                        h("select", { onChange: this.setDevice.bind(this), name: "device" }, deviceOptions)))),
                        h("div", { class: "row", style: { display: "inline-block" } },
                            h("div", { style: {
                                    position: "relative",
                                    width: `${this.cameraWidth}px` || `${this.defaultWidth}px`,
                                    height: `${this.cameraHeight}px` || `${this.defaultHeight}px`,
                                    display: this.captured ? "none" : "inline-block"
                                } },
                                h("canvas", { class: "face-canvas", width: "333", height: "250", style: { display: "inline-block" } }),
                                h("video", { id: "video", ref: el => { this.videoElement = el; }, class: "webcam-video", autoplay: true, muted: true, style: {
                                        display: this.captured ? "none" : "inline-block",
                                        height: '480px !important'
                                    } }),
                                h("div", { style: { position: "absolute", top: "0", right: "0", bottom: "0", left: "0", opacity: "0.7" } }, overlay()),
                                this.lowerCameraQualityDetected &&
                                    h("div", { style: { position: "absolute", top: "0", right: "0", bottom: "0", left: "0", opacity: "0.7", backgroundColor: "red", height: "30px", color: "white", paddingTop: "2px", fontWeight: "600" } },
                                        h("img", { src: "./assets/general/alert-outline.png", class: "icon-24", style: { marginRight: "5px" }, "aria-hidden": "true" }),
                                        "A c\u00E2mera detectada n\u00E3o possui o requisito m\u00EDnimo recomendado de 1080p")),
                            h("img", { id: "img", height: "300px", class: "webcam-snapshot object-fit-contain", style: {
                                    maxWidth: `${this.cameraWidth || this.defaultWidth}px !important`,
                                    maxHeight: `${this.cameraHeight || this.defaultHeight}px !important`,
                                    height: `300px`,
                                    display: this.captured ? "inline" : "none",
                                    marginBottom: "5px",
                                    objectFit: 'contain'
                                } })),
                        h("div", { class: "row has-text-centered", style: { 'margin-top': '1vh', 'padding-bottom': '2vh' } },
                            h("a", { class: `btn-primary`, style: {
                                    "background-color": this.primaryColor || "#0D3F56",
                                    "border": `1px solid ${this.primaryColor || "#0D3F56"}`,
                                    "color": this.textColor || "#FFFFFF"
                                }, onClick: () => this.captured ? this.startCamera() : this.takeSnapShot() }, this.getCaptureText())))))));
    }
    static get is() { return "openbio-oma-face"; }
    static get originalStyleUrls() { return {
        "$": ["openbio-oma-face-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["openbio-oma-face-component.css"]
    }; }
    static get properties() { return {
        "projectId": {
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
            "attribute": "project-id",
            "reflect": false
        },
        "recordId": {
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
            "attribute": "record-id",
            "reflect": false
        },
        "requestKey": {
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
            "attribute": "request-key",
            "reflect": false
        },
        "token": {
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
            "attribute": "token",
            "reflect": false
        },
        "livenessMin": {
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
            "attribute": "liveness-min",
            "reflect": false,
            "defaultValue": "0.8"
        },
        "allowNoncomplianceRecordUpdate": {
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
            "attribute": "allow-noncompliance-record-update",
            "reflect": false,
            "defaultValue": "false"
        },
        "allowLivenessNoncompliance": {
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
            "attribute": "allow-liveness-noncompliance",
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
        },
        "headerTitle": {
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
            "attribute": "header-title",
            "reflect": false
        },
        "action": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'REGISTER' | 'VERIFY'",
                "resolved": "\"REGISTER\" | \"VERIFY\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "action",
            "reflect": false
        },
        "showHeader": {
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
            "attribute": "show-header",
            "reflect": false,
            "defaultValue": "false"
        },
        "primaryColor": {
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
            "attribute": "primary-color",
            "reflect": false
        },
        "textColor": {
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
            "attribute": "text-color",
            "reflect": false
        },
        "containerBackgroundColor": {
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
            "attribute": "container-background-color",
            "reflect": false
        },
        "cameraWidth": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "camera-width",
            "reflect": false
        },
        "cameraHeight": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "camera-height",
            "reflect": false
        },
        "callback": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Function",
                "resolved": "Function",
                "references": {
                    "Function": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
    static get states() { return {
        "showFullscreenLoader": {},
        "translations": {},
        "captured": {},
        "videoInterval": {},
        "videoElement": {},
        "capturedImage": {},
        "deviceList": {},
        "lowerCameraQualityDetected": {},
        "videoSettings": {},
        "selectedDevice": {},
        "currentStream": {},
        "isMobile": {},
        "mobileCameraStartControl": {}
    }; }
    static get elementRef() { return "componentContainer"; }
    static get watchers() { return [{
            "propName": "locale",
            "methodName": "listenLocale"
        }]; }
}
