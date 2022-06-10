import '../../stencil.core';
import WS from '../../utils/websocket';
export declare class OpenbioFaceComponent {
    ws: WS;
    componentContainer: HTMLStencilElement;
    deviceReady: boolean;
    forceLoadComponent: boolean;
    translations: any;
    locale: string;
    listenLocale(newValue: string): Promise<void>;
    componentWillLoad(): Promise<void>;
    addCustomLink(url: any): void;
    setI18nParameters(locale: any): Promise<void>;
    componentDidLoad(): void;
    render(): JSX.Element;
}
