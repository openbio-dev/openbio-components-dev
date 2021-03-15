import '../../stencil.core';
import WS from '../../utils/websocket';
export declare class OpenbioSignatureComponent {
    ws: WS;
    componentContainer: HTMLStencilElement;
    deviceReady: boolean;
    forceLoadComponent: boolean;
    captureInput: HTMLInputElement;
    componentDidLoad(): void;
    render(): JSX.Element;
}
