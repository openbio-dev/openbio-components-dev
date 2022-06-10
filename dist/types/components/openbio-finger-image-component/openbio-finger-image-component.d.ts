import '../../stencil.core';
export declare class OpenbioFingerImageComponent {
    componentContainer: HTMLStencilElement;
    finger: any;
    fingerName: string;
    fingerIndex: number;
    editFingerCallback: any;
    parentComponentContext: any;
    uploadFingerImageCallback: any;
    allowUpload: boolean;
    isModalShown: boolean;
    captureInput: HTMLInputElement;
    translations: any;
    locale: string;
    listenLocale(newValue: string): Promise<void>;
    componentWillLoad(): Promise<void>;
    componentDidLoad(): Promise<void>;
    showModal(): void;
    hideModal(): void;
    onInputChange(files: any): void;
    render(): JSX.Element;
}
