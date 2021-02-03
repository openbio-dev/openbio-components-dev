import '../../stencil.core';
export declare class OpenbioFaceComponentDetails {
    private ws;
    private wsStatusInterval;
    private canvas?;
    private person;
    private payload;
    private keysForEvaluate;
    constructor();
    componentContainer: HTMLStencilElement;
    detached: boolean;
    isTagComponent: boolean;
    tempPerson: any;
    tempFace: any;
    deviceReady: boolean;
    eyeAxisLocationRatio: string;
    centerLineLocationRatio: string;
    eyeSeparation: string;
    offAngleGaze: string;
    eyeAxysAngle: string;
    poseAngleYaw: string;
    rightOrLeftEyeClosed: string;
    originalImage: string;
    croppedImage: string;
    segmentedImage: string;
    crop: boolean;
    segmentation: boolean;
    autoCapture: boolean;
    autoCaptureCount: number;
    autoCapturing: boolean;
    autoCaptureInterval: any;
    dpiValue: number;
    flashCharge: number;
    cameraSettingsOptions: any;
    tab: number;
    anomalyOptions: Array<any>;
    anomaly: number;
    face: any;
    validation: any;
    backendSession: any;
    showLoader: boolean;
    cameraPresetOptions: any;
    flashProperty: number;
    flashWidth: number;
    aperture: number;
    shutterSpeed: number;
    imageFormat: number;
    isoValue: number;
    whiteBalance: number;
    preset: number;
    previewSize: number;
    previewType: number;
    isCapturing: boolean;
    isPreviewing: boolean;
    model: string;
    brand: string;
    serial: string;
    video: any;
    track: any;
    allowConfiguration: boolean;
    showCameraConfiguration: boolean;
    showPreviewTemplate: boolean;
    manualEyeSelection: any;
    faceDetected: boolean;
    deviceStatus: boolean;
    shallCapture: boolean;
    evaluations: Array<Object>;
    serviceConfigs: any;
    clearManualEyeSelection(): void;
    toggleManualEyeSelection(): void;
    cropWithEyesCoords(): void;
    eyeAxisLocationRatioMessage(status: string): void;
    centerLineLocationRatioMessage(status: string): void;
    eyeSeparationMessage(score: number): void;
    offAngleGazeMessage(status: string): void;
    eyeAxysAngleMessage(status: string): void;
    poseAngleYawMessage(status: string): void;
    rightEyeClosedMessage(status: string): void;
    leftEyeClosedMessage(status: string): void;
    setEvaluateMessageFor(type: any, status: any): void;
    checkInvalidEvaluations(): Object;
    tryAutoCapture(): void;
    open(): void;
    applyCameraSettings(): Promise<void>;
    fetchCurrentCameraSettings(): Promise<void>;
    isWebcam(): boolean;
    buildWebcam(): any;
    resetAutoCapturing(): void;
    componentDidLoad(): Promise<void>;
    configureSegmentation(): void;
    componentDidUnload(): void;
    findSetting(settings: any, name: string): any;
    clearImages(): void;
    close(): void;
    getWebcam(): void;
    startPreview(backToPreview?: boolean): void;
    restartPreview(): void;
    stopPreview(): any;
    capture(manual?: boolean): Promise<void>;
    setPresetValues(event: any): void;
    setCameraValue(event: any): void;
    increaseZoom(): void;
    decreaseZoom(): void;
    updateCameraSettings(): void;
    setFeature(event: any): void;
    acceptData(): void;
    emitLoadInformation(): void;
    sendBiometryInformation(face: any): void;
    activeTabClass(num: number): string;
    setActiveTab(num: number): void;
    setSelection(event: any): void;
    saveAnomaly(): void;
    saveFace(): Promise<void>;
    storeCapturedFace(saveFaceResult: any): void;
    render(): JSX.Element;
}
