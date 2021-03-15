import '../../stencil.core';
export declare class GuideImageComponent {
    src: string;
    helpText: string;
    isHelpModalActive: boolean;
    setHelpModalStatus(status: boolean): void;
    componentDidLoad(): void;
    render(): JSX.Element;
}
