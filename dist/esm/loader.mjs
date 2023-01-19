import { a as patchEsm, b as bootstrapLazy } from './chunk-9fbbfcf9.js';

const defineCustomElements = (win, options) => {
  return patchEsm().then(() => {
    bootstrapLazy([["notification-component",[[1,"notification-component",{"notificationType":[1,"notification-type"],"text":[1]}]]],["loader-component_2",[[0,"openbio-oma-face",{"projectId":[1,"project-id"],"recordId":[1,"record-id"],"requestKey":[1,"request-key"],"token":[1],"livenessMin":[8,"liveness-min"],"allowNoncomplianceRecordUpdate":[4,"allow-noncompliance-record-update"],"allowLivenessNoncompliance":[4,"allow-liveness-noncompliance"],"locale":[1025],"headerTitle":[1,"header-title"],"action":[1],"showHeader":[4,"show-header"],"primaryColor":[1,"primary-color"],"textColor":[1,"text-color"],"containerBackgroundColor":[1,"container-background-color"],"cameraWidth":[2,"camera-width"],"cameraHeight":[2,"camera-height"],"callback":[16],"showFullscreenLoader":[32],"translations":[32],"captured":[32],"videoInterval":[32],"videoElement":[32],"capturedImage":[32],"deviceList":[32],"lowerCameraQualityDetected":[32],"videoSettings":[32],"selectedDevice":[32],"currentStream":[32],"isMobile":[32],"mobileCameraStartControl":[32]}],[1,"loader-component",{"enabled":[1028]}]]]], options);
  });
};

export { defineCustomElements };
