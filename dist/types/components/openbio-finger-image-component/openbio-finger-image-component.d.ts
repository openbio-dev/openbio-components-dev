import '../../stencil.core';
export declare class OpenbioFingerImageComponent {
    finger: any;
    fingerName: string;
    fingerIndex: number;
    editFingerCallback: any;
    parentComponentContext: any;
    uploadFingerImageCallback: any;
    isModalShown: boolean;
    captureInput: HTMLInputElement;
    componentDidLoad(): Promise<void>;
    showModal(): void;
    hideModal(): void;
    render(): JSX.Element;
}
