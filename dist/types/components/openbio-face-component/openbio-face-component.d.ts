import '../../stencil.core';
import WS from '../../utils/websocket';
export declare class OpenbioFaceComponent {
    ws: WS;
    componentContainer: HTMLStencilElement;
    deviceReady: boolean;
    forceLoadComponent: boolean;
    componentDidLoad(): void;
    render(): JSX.Element;
}
