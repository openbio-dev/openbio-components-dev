import '../../stencil.core';
import WS from "../../utils/websocket";
declare enum FlowTypes {
    FLOW_TYPE_TEN_FLAT_CAPTURES = 0,
    FLOW_TYPE_TEN_ROLLED_CAPTURES = 1,
    FLOW_TYPE_FIVE_FLAT_CAPTURES = 2,
    FLOW_TYPE_THREE_FLAT_CAPTURES = 3,
    FLOW_TYPE_SEQUENCE_CONTROL_CAPTURE = 4,
    FLOW_TYPE_TWO_FLAT_SEQUENCE_CONTROL_CAPTURE = 5,
    FLOW_TYPE_FOUR_FLAT_SEQUENCE_CONTROL_CAPTURE = 6,
    FLOW_TYPE_PINCH = 7
}
declare type ModalSettings = {
    storeOriginalImage: boolean;
    repetitionControl: any;
    generateBMP: boolean;
    failControl: object;
    match?: any;
    device?: string;
    flowType: FlowTypes;
};
declare enum CaptureType {
    FLAT = 0,
    ROLLED = 1
}
declare enum Finger {
    RIGHT_THUMB = 0,
    RIGHT_INDEX = 1,
    RIGHT_MIDDLE = 2,
    RIGHT_RING = 3,
    RIGHT_LITTLE = 4,
    LEFT_THUMB = 5,
    LEFT_INDEX = 6,
    LEFT_MIDDLE = 7,
    LEFT_RING = 8,
    LEFT_LITTLE = 9
}
export declare class OpenbioFingerAuthComponent {
    ws: WS;
    private wsStatusInterval;
    private fingerPreviewCanvas?;
    private fingerNames;
    useOpenbioMatcher: boolean;
    cpf: string;
    onMatcherResult: Function;
    onCaptureFingerprintResult: Function;
    isDebug: boolean;
    personName: string;
    personImage: string;
    componentContainer: HTMLStencilElement;
    showFullscreenLoader: boolean;
    modalSettings: ModalSettings;
    fingerPreviewCurrentRollingStatus: any;
    fingerPreviewCurrentStatusLineX: any;
    fingerNfiqScore: number | string;
    fingerAuthenticationSimilarity: number;
    fingerOriginalImage: string;
    deviceModel: string;
    deviceBrand: string;
    deviceSerial: string;
    captureType: CaptureType;
    selectedFinger: {
        index: Finger;
        name: string;
    };
    currentFingerImage: string;
    captureStep: boolean;
    useOpenbioMatcherState: boolean;
    cpfState: string;
    personNameState: string;
    personImageState: string;
    debug: boolean;
    person: any;
    private payload;
    clearCanvasFingerImage(): void;
    session: {
        store: (authentication: any) => void;
    };
    device: {
        open: () => void;
        prepareToPreview: () => void;
        startPreview: () => void;
        stopPreview: () => void;
        stopPreviewProcessor: () => void;
        clearCapture: () => void;
    };
    getModalSettings(): Promise<void>;
    loadWebsocketListeners(): void;
    getPerson(): Promise<void>;
    setCurrentFingerImage(): void;
    setSelectionCaptureType(event: any): void;
    setSelectionFingerList(event: any): void;
    changeCaptureStep(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    render(): JSX.Element;
}
export {};
