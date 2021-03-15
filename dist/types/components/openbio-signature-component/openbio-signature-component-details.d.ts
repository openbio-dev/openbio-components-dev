import '../../stencil.core';
import WS from '../../utils/websocket';
export declare class OpenbioSignatureComponentDetails {
    ws: WS;
    private wsStatusInterval;
    private canvas?;
    private person;
    private payload;
    componentContainer: HTMLStencilElement;
    detached: boolean;
    isTagComponent: boolean;
    tempPerson: any;
    tempSignature: any;
    deviceReady: boolean;
    deviceOpened: boolean;
    originalImage: string;
    rawImage: string;
    points: any[];
    dpiValue: number;
    tab: number;
    anomalyOptions: Array<any>;
    anomaly: number;
    signature: any;
    backendSession: any;
    showLoader: boolean;
    isCapturing: boolean;
    model: string;
    brand: string;
    serial: string;
    deviceStatus: boolean;
    serviceConfigs: any;
    clearImages(): void;
    clear(): void;
    startPreview(backToPreview?: boolean): void;
    close(): void;
    stopPreview(): void;
    getFinishTitle(): string;
    capture(): void;
    open(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    acceptData(): void;
    emitLoadInformation(): void;
    sendBiometryInformation(signature: any): void;
    activeTabClass(num: number): "" | "is-active";
    setActiveTab(num: number): void;
    setSelection(event: any): void;
    saveAnomaly(): void;
    saveSignature(saveAnomaly?: boolean): Promise<void>;
    storeCapturedSignature(parsedValue: any): void;
    onInputChange(files: any): void;
    render(): JSX.Element;
}
