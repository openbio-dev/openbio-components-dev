import WS from '../../utils/websocket';
import { HTMLStencilElement } from '../../stencil.core';
export declare class OpenbioSignatureComponent {
    ws: WS;
    componentContainer: HTMLStencilElement;
    deviceReady: boolean;
    forceLoadComponent: boolean;
    captureInput: HTMLInputElement;
    translations: any;
    locale: string;
    listenLocale(newValue: string): Promise<void>;
    componentWillLoad(): Promise<void>;
    addCustomLink(url: any): void;
    setI18nParameters(locale: any): Promise<void>;
    componentDidLoad(): void;
    render(): any;
}
