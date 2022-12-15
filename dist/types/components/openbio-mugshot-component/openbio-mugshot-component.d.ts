import WS from '../../utils/websocket';
import { HTMLStencilElement } from '../../stencil.core';
export declare class OpenbioMugshotComponent {
    ws: WS;
    componentContainer: HTMLStencilElement;
    deviceReady: boolean;
    forceLoadComponent: boolean;
    translations: any;
    locale: string;
    listenLocale(newValue: string): Promise<void>;
    componentWillLoad(): Promise<void>;
    setI18nParameters(locale: any): Promise<void>;
    componentDidLoad(): void;
    render(): any;
}
