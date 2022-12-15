/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from './stencil.core';


export namespace Components {
  interface CnhPreview {
    'inputSignature': any;
    'person': any;
    'photo': any;
    'size': PreviewSize;
  }
  interface HelpComponent {
    'helpText': string;
    'locale': string;
    'src': string;
  }
  interface ImageCropperComponent {
    'aspectRatio': any;
    'cropBoxResizable': boolean;
    'cropCallback': any;
    'currentElementTag': string;
    'locale': string;
    'parentComponentContext': any;
    'parentElementTag': string;
    'src': string;
  }
  interface ImageFilterComponent {
    'currentElementTag': string;
    'filterCallback': any;
    'locale': string;
    'parentComponentContext': any;
    'parentElementTag': string;
    'src': string;
  }
  interface ImageSegmentationAdjustmentComponent {
    'currentElementTag': string;
    'imageAdjustmentCallback': any;
    'originalImage': any;
    'parentComponentContext': any;
    'parentElementTag': string;
    'saveAdjustedImageCallback': any;
    'segmentedImage': any;
  }
  interface LoaderComponent {
    'enabled': boolean;
  }
  interface MyComponent {
    /**
    * The first name
    */
    'first': string;
    /**
    * The last name
    */
    'last': string;
    /**
    * The middle name
    */
    'middle': string;
  }
  interface NotificationComponent {
    'notificationType': string;
    'text': string;
  }
  interface OpenbioFace {
    'locale': string;
  }
  interface OpenbioFaceAuth {
    'cpf': string;
    'hiddenCamera': boolean;
    'isDebug': boolean;
    'locale': string;
    'personImage': string;
    'personName': string;
    'useOpenbioMatcher': boolean;
  }
  interface OpenbioFaceDetails {
    'detached': boolean;
    'isTagComponent': boolean;
    'locale': string;
    'tempFace': any;
    'tempPerson': any;
  }
  interface OpenbioFaceValidationBoxComponent {
    'detached': boolean;
    'leftIcon': boolean;
    'locale': string;
    'status': any;
    'type': string;
    'typeTitle': string;
  }
  interface OpenbioFinger {
    'locale': string;
  }
  interface OpenbioFingerAuth {
    'cpf': string;
    'isDebug': boolean;
    'locale': string;
    'personImage': string;
    'personName': string;
    'useOpenbioMatcher': boolean;
  }
  interface OpenbioFingerDetails {
    'cpf': string;
    'detached': boolean;
    'fingerCaptureType': number;
    'isTagComponent': boolean;
    'locale': string;
    'onCaptureFingerprint': Function;
    'onOpenbioMatcher': Function;
    'personImage': string;
    'personName': string;
    'singleCapture': boolean;
    'tempFingers': any;
    'tempPerson': any;
    'useOpenbioMatcher': boolean;
  }
  interface OpenbioFingerImageComponent {
    'allowUpload': boolean;
    'editFingerCallback': any;
    'finger': any;
    'fingerIndex': number;
    'fingerName': string;
    'locale': string;
    'parentComponentContext': any;
    'uploadFingerImageCallback': any;
  }
  interface OpenbioMugshot {
    'locale': string;
  }
  interface OpenbioMugshotDetails {
    'allowConfiguration': any;
    'detached': boolean;
    'isTagComponent': boolean;
    'locale': string;
    'tempMugshotPhotos': any;
    'tempPerson': any;
  }
  interface OpenbioOmaFace {
    'action': 'REGISTER' | 'VERIFY';
    'allowLivenessNoncompliance': boolean;
    'allowNoncomplianceRecordUpdate': boolean;
    'callback': Function;
    'cameraHeight': number;
    'cameraWidth': number;
    'containerBackgroundColor': string;
    'headerTitle': string;
    'livenessMin': number;
    'locale': string;
    'primaryColor': string;
    'projectId': string;
    'recordId': string;
    'requestKey': string;
    'showHeader': boolean;
    'textColor': string;
    'token': string;
  }
  interface OpenbioScanner {}
  interface OpenbioScannerDetails {
    'detached': boolean;
    'isTagComponent': boolean;
    'locale': string;
    'tempPerson': any;
  }
  interface OpenbioSignature {
    'locale': string;
  }
  interface OpenbioSignatureDetails {
    'detached': boolean;
    'isTagComponent': boolean;
    'locale': string;
    'tempPerson': any;
    'tempSignature': any;
  }
}

declare global {


  interface HTMLCnhPreviewElement extends Components.CnhPreview, HTMLStencilElement {}
  var HTMLCnhPreviewElement: {
    prototype: HTMLCnhPreviewElement;
    new (): HTMLCnhPreviewElement;
  };

  interface HTMLHelpComponentElement extends Components.HelpComponent, HTMLStencilElement {}
  var HTMLHelpComponentElement: {
    prototype: HTMLHelpComponentElement;
    new (): HTMLHelpComponentElement;
  };

  interface HTMLImageCropperComponentElement extends Components.ImageCropperComponent, HTMLStencilElement {}
  var HTMLImageCropperComponentElement: {
    prototype: HTMLImageCropperComponentElement;
    new (): HTMLImageCropperComponentElement;
  };

  interface HTMLImageFilterComponentElement extends Components.ImageFilterComponent, HTMLStencilElement {}
  var HTMLImageFilterComponentElement: {
    prototype: HTMLImageFilterComponentElement;
    new (): HTMLImageFilterComponentElement;
  };

  interface HTMLImageSegmentationAdjustmentComponentElement extends Components.ImageSegmentationAdjustmentComponent, HTMLStencilElement {}
  var HTMLImageSegmentationAdjustmentComponentElement: {
    prototype: HTMLImageSegmentationAdjustmentComponentElement;
    new (): HTMLImageSegmentationAdjustmentComponentElement;
  };

  interface HTMLLoaderComponentElement extends Components.LoaderComponent, HTMLStencilElement {}
  var HTMLLoaderComponentElement: {
    prototype: HTMLLoaderComponentElement;
    new (): HTMLLoaderComponentElement;
  };

  interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {}
  var HTMLMyComponentElement: {
    prototype: HTMLMyComponentElement;
    new (): HTMLMyComponentElement;
  };

  interface HTMLNotificationComponentElement extends Components.NotificationComponent, HTMLStencilElement {}
  var HTMLNotificationComponentElement: {
    prototype: HTMLNotificationComponentElement;
    new (): HTMLNotificationComponentElement;
  };

  interface HTMLOpenbioFaceElement extends Components.OpenbioFace, HTMLStencilElement {}
  var HTMLOpenbioFaceElement: {
    prototype: HTMLOpenbioFaceElement;
    new (): HTMLOpenbioFaceElement;
  };

  interface HTMLOpenbioFaceAuthElement extends Components.OpenbioFaceAuth, HTMLStencilElement {}
  var HTMLOpenbioFaceAuthElement: {
    prototype: HTMLOpenbioFaceAuthElement;
    new (): HTMLOpenbioFaceAuthElement;
  };

  interface HTMLOpenbioFaceDetailsElement extends Components.OpenbioFaceDetails, HTMLStencilElement {}
  var HTMLOpenbioFaceDetailsElement: {
    prototype: HTMLOpenbioFaceDetailsElement;
    new (): HTMLOpenbioFaceDetailsElement;
  };

  interface HTMLOpenbioFaceValidationBoxComponentElement extends Components.OpenbioFaceValidationBoxComponent, HTMLStencilElement {}
  var HTMLOpenbioFaceValidationBoxComponentElement: {
    prototype: HTMLOpenbioFaceValidationBoxComponentElement;
    new (): HTMLOpenbioFaceValidationBoxComponentElement;
  };

  interface HTMLOpenbioFingerElement extends Components.OpenbioFinger, HTMLStencilElement {}
  var HTMLOpenbioFingerElement: {
    prototype: HTMLOpenbioFingerElement;
    new (): HTMLOpenbioFingerElement;
  };

  interface HTMLOpenbioFingerAuthElement extends Components.OpenbioFingerAuth, HTMLStencilElement {}
  var HTMLOpenbioFingerAuthElement: {
    prototype: HTMLOpenbioFingerAuthElement;
    new (): HTMLOpenbioFingerAuthElement;
  };

  interface HTMLOpenbioFingerDetailsElement extends Components.OpenbioFingerDetails, HTMLStencilElement {}
  var HTMLOpenbioFingerDetailsElement: {
    prototype: HTMLOpenbioFingerDetailsElement;
    new (): HTMLOpenbioFingerDetailsElement;
  };

  interface HTMLOpenbioFingerImageComponentElement extends Components.OpenbioFingerImageComponent, HTMLStencilElement {}
  var HTMLOpenbioFingerImageComponentElement: {
    prototype: HTMLOpenbioFingerImageComponentElement;
    new (): HTMLOpenbioFingerImageComponentElement;
  };

  interface HTMLOpenbioMugshotElement extends Components.OpenbioMugshot, HTMLStencilElement {}
  var HTMLOpenbioMugshotElement: {
    prototype: HTMLOpenbioMugshotElement;
    new (): HTMLOpenbioMugshotElement;
  };

  interface HTMLOpenbioMugshotDetailsElement extends Components.OpenbioMugshotDetails, HTMLStencilElement {}
  var HTMLOpenbioMugshotDetailsElement: {
    prototype: HTMLOpenbioMugshotDetailsElement;
    new (): HTMLOpenbioMugshotDetailsElement;
  };

  interface HTMLOpenbioOmaFaceElement extends Components.OpenbioOmaFace, HTMLStencilElement {}
  var HTMLOpenbioOmaFaceElement: {
    prototype: HTMLOpenbioOmaFaceElement;
    new (): HTMLOpenbioOmaFaceElement;
  };

  interface HTMLOpenbioScannerElement extends Components.OpenbioScanner, HTMLStencilElement {}
  var HTMLOpenbioScannerElement: {
    prototype: HTMLOpenbioScannerElement;
    new (): HTMLOpenbioScannerElement;
  };

  interface HTMLOpenbioScannerDetailsElement extends Components.OpenbioScannerDetails, HTMLStencilElement {}
  var HTMLOpenbioScannerDetailsElement: {
    prototype: HTMLOpenbioScannerDetailsElement;
    new (): HTMLOpenbioScannerDetailsElement;
  };

  interface HTMLOpenbioSignatureElement extends Components.OpenbioSignature, HTMLStencilElement {}
  var HTMLOpenbioSignatureElement: {
    prototype: HTMLOpenbioSignatureElement;
    new (): HTMLOpenbioSignatureElement;
  };

  interface HTMLOpenbioSignatureDetailsElement extends Components.OpenbioSignatureDetails, HTMLStencilElement {}
  var HTMLOpenbioSignatureDetailsElement: {
    prototype: HTMLOpenbioSignatureDetailsElement;
    new (): HTMLOpenbioSignatureDetailsElement;
  };
  interface HTMLElementTagNameMap {
    'cnh-preview': HTMLCnhPreviewElement;
    'help-component': HTMLHelpComponentElement;
    'image-cropper-component': HTMLImageCropperComponentElement;
    'image-filter-component': HTMLImageFilterComponentElement;
    'image-segmentation-adjustment-component': HTMLImageSegmentationAdjustmentComponentElement;
    'loader-component': HTMLLoaderComponentElement;
    'my-component': HTMLMyComponentElement;
    'notification-component': HTMLNotificationComponentElement;
    'openbio-face': HTMLOpenbioFaceElement;
    'openbio-face-auth': HTMLOpenbioFaceAuthElement;
    'openbio-face-details': HTMLOpenbioFaceDetailsElement;
    'openbio-face-validation-box-component': HTMLOpenbioFaceValidationBoxComponentElement;
    'openbio-finger': HTMLOpenbioFingerElement;
    'openbio-finger-auth': HTMLOpenbioFingerAuthElement;
    'openbio-finger-details': HTMLOpenbioFingerDetailsElement;
    'openbio-finger-image-component': HTMLOpenbioFingerImageComponentElement;
    'openbio-mugshot': HTMLOpenbioMugshotElement;
    'openbio-mugshot-details': HTMLOpenbioMugshotDetailsElement;
    'openbio-oma-face': HTMLOpenbioOmaFaceElement;
    'openbio-scanner': HTMLOpenbioScannerElement;
    'openbio-scanner-details': HTMLOpenbioScannerDetailsElement;
    'openbio-signature': HTMLOpenbioSignatureElement;
    'openbio-signature-details': HTMLOpenbioSignatureDetailsElement;
  }
}

declare namespace LocalJSX {
  interface CnhPreview extends JSXBase.HTMLAttributes<HTMLCnhPreviewElement> {
    'inputSignature'?: any;
    'person'?: any;
    'photo'?: any;
    'size'?: PreviewSize;
  }
  interface HelpComponent extends JSXBase.HTMLAttributes<HTMLHelpComponentElement> {
    'helpText'?: string;
    'locale'?: string;
    'src'?: string;
  }
  interface ImageCropperComponent extends JSXBase.HTMLAttributes<HTMLImageCropperComponentElement> {
    'aspectRatio'?: any;
    'cropBoxResizable'?: boolean;
    'cropCallback'?: any;
    'currentElementTag'?: string;
    'locale'?: string;
    'parentComponentContext'?: any;
    'parentElementTag'?: string;
    'src'?: string;
  }
  interface ImageFilterComponent extends JSXBase.HTMLAttributes<HTMLImageFilterComponentElement> {
    'currentElementTag'?: string;
    'filterCallback'?: any;
    'locale'?: string;
    'parentComponentContext'?: any;
    'parentElementTag'?: string;
    'src'?: string;
  }
  interface ImageSegmentationAdjustmentComponent extends JSXBase.HTMLAttributes<HTMLImageSegmentationAdjustmentComponentElement> {
    'currentElementTag'?: string;
    'imageAdjustmentCallback'?: any;
    'originalImage'?: any;
    'parentComponentContext'?: any;
    'parentElementTag'?: string;
    'saveAdjustedImageCallback'?: any;
    'segmentedImage'?: any;
  }
  interface LoaderComponent extends JSXBase.HTMLAttributes<HTMLLoaderComponentElement> {
    'enabled'?: boolean;
  }
  interface MyComponent extends JSXBase.HTMLAttributes<HTMLMyComponentElement> {
    /**
    * The first name
    */
    'first'?: string;
    /**
    * The last name
    */
    'last'?: string;
    /**
    * The middle name
    */
    'middle'?: string;
  }
  interface NotificationComponent extends JSXBase.HTMLAttributes<HTMLNotificationComponentElement> {
    'notificationType'?: string;
    'text'?: string;
  }
  interface OpenbioFace extends JSXBase.HTMLAttributes<HTMLOpenbioFaceElement> {
    'locale'?: string;
  }
  interface OpenbioFaceAuth extends JSXBase.HTMLAttributes<HTMLOpenbioFaceAuthElement> {
    'cpf'?: string;
    'hiddenCamera'?: boolean;
    'isDebug'?: boolean;
    'locale'?: string;
    'onOnMatcherResult'?: (event: CustomEvent<any>) => void;
    'personImage'?: string;
    'personName'?: string;
    'useOpenbioMatcher'?: boolean;
  }
  interface OpenbioFaceDetails extends JSXBase.HTMLAttributes<HTMLOpenbioFaceDetailsElement> {
    'detached'?: boolean;
    'isTagComponent'?: boolean;
    'locale'?: string;
    'tempFace'?: any;
    'tempPerson'?: any;
  }
  interface OpenbioFaceValidationBoxComponent extends JSXBase.HTMLAttributes<HTMLOpenbioFaceValidationBoxComponentElement> {
    'detached'?: boolean;
    'leftIcon'?: boolean;
    'locale'?: string;
    'status'?: any;
    'type'?: string;
    'typeTitle'?: string;
  }
  interface OpenbioFinger extends JSXBase.HTMLAttributes<HTMLOpenbioFingerElement> {
    'locale'?: string;
  }
  interface OpenbioFingerAuth extends JSXBase.HTMLAttributes<HTMLOpenbioFingerAuthElement> {
    'cpf'?: string;
    'isDebug'?: boolean;
    'locale'?: string;
    'onOnCaptureFingerprintResult'?: (event: CustomEvent<any>) => void;
    'onOnMatcherResult'?: (event: CustomEvent<any>) => void;
    'personImage'?: string;
    'personName'?: string;
    'useOpenbioMatcher'?: boolean;
  }
  interface OpenbioFingerDetails extends JSXBase.HTMLAttributes<HTMLOpenbioFingerDetailsElement> {
    'cpf'?: string;
    'detached'?: boolean;
    'fingerCaptureType'?: number;
    'isTagComponent'?: boolean;
    'locale'?: string;
    'onCaptureFingerprint'?: Function;
    'onOpenbioMatcher'?: Function;
    'personImage'?: string;
    'personName'?: string;
    'singleCapture'?: boolean;
    'tempFingers'?: any;
    'tempPerson'?: any;
    'useOpenbioMatcher'?: boolean;
  }
  interface OpenbioFingerImageComponent extends JSXBase.HTMLAttributes<HTMLOpenbioFingerImageComponentElement> {
    'allowUpload'?: boolean;
    'editFingerCallback'?: any;
    'finger'?: any;
    'fingerIndex'?: number;
    'fingerName'?: string;
    'locale'?: string;
    'parentComponentContext'?: any;
    'uploadFingerImageCallback'?: any;
  }
  interface OpenbioMugshot extends JSXBase.HTMLAttributes<HTMLOpenbioMugshotElement> {
    'locale'?: string;
  }
  interface OpenbioMugshotDetails extends JSXBase.HTMLAttributes<HTMLOpenbioMugshotDetailsElement> {
    'allowConfiguration'?: any;
    'detached'?: boolean;
    'isTagComponent'?: boolean;
    'locale'?: string;
    'tempMugshotPhotos'?: any;
    'tempPerson'?: any;
  }
  interface OpenbioOmaFace extends JSXBase.HTMLAttributes<HTMLOpenbioOmaFaceElement> {
    'action'?: 'REGISTER' | 'VERIFY';
    'allowLivenessNoncompliance'?: boolean;
    'allowNoncomplianceRecordUpdate'?: boolean;
    'callback'?: Function;
    'cameraHeight'?: number;
    'cameraWidth'?: number;
    'containerBackgroundColor'?: string;
    'headerTitle'?: string;
    'livenessMin'?: number;
    'locale'?: string;
    'primaryColor'?: string;
    'projectId'?: string;
    'recordId'?: string;
    'requestKey'?: string;
    'showHeader'?: boolean;
    'textColor'?: string;
    'token'?: string;
  }
  interface OpenbioScanner extends JSXBase.HTMLAttributes<HTMLOpenbioScannerElement> {}
  interface OpenbioScannerDetails extends JSXBase.HTMLAttributes<HTMLOpenbioScannerDetailsElement> {
    'detached'?: boolean;
    'isTagComponent'?: boolean;
    'locale'?: string;
    'tempPerson'?: any;
  }
  interface OpenbioSignature extends JSXBase.HTMLAttributes<HTMLOpenbioSignatureElement> {
    'locale'?: string;
  }
  interface OpenbioSignatureDetails extends JSXBase.HTMLAttributes<HTMLOpenbioSignatureDetailsElement> {
    'detached'?: boolean;
    'isTagComponent'?: boolean;
    'locale'?: string;
    'tempPerson'?: any;
    'tempSignature'?: any;
  }

  interface IntrinsicElements {
    'cnh-preview': CnhPreview;
    'help-component': HelpComponent;
    'image-cropper-component': ImageCropperComponent;
    'image-filter-component': ImageFilterComponent;
    'image-segmentation-adjustment-component': ImageSegmentationAdjustmentComponent;
    'loader-component': LoaderComponent;
    'my-component': MyComponent;
    'notification-component': NotificationComponent;
    'openbio-face': OpenbioFace;
    'openbio-face-auth': OpenbioFaceAuth;
    'openbio-face-details': OpenbioFaceDetails;
    'openbio-face-validation-box-component': OpenbioFaceValidationBoxComponent;
    'openbio-finger': OpenbioFinger;
    'openbio-finger-auth': OpenbioFingerAuth;
    'openbio-finger-details': OpenbioFingerDetails;
    'openbio-finger-image-component': OpenbioFingerImageComponent;
    'openbio-mugshot': OpenbioMugshot;
    'openbio-mugshot-details': OpenbioMugshotDetails;
    'openbio-oma-face': OpenbioOmaFace;
    'openbio-scanner': OpenbioScanner;
    'openbio-scanner-details': OpenbioScannerDetails;
    'openbio-signature': OpenbioSignature;
    'openbio-signature-details': OpenbioSignatureDetails;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


