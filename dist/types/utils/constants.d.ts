declare const constants: {
    SERVER_HOST: string;
    WS_HOST: string;
    IPINFO_ADDRESS: string;
    anomalyTypes: {
        SIGNATURE_ANOMALY: number;
        FACE_ANOMALY: number;
        MODAL_ANOMALY: number;
        DOCUMENT_ANOMALY: number;
    };
    settingTypes: {
        PERSON_REQUIRED_FIELD: number;
        MODAL_SETTINGS: number;
        FACE_SETTINGS: number;
        SIGNATURE_SETTINGS: number;
    };
    device: {
        AKYSCAM: string;
        WEBCAM: string;
        IB: string;
        MSP: string;
        SECUGEN: string;
        WACOM: string;
        CANON: string;
    };
    processor: {
        AWPREFACE: string;
        IDKIT: string;
        AK_MATCHER: string;
    };
    valueTypes: {
        INTEGER: number;
        STRING: number;
        BOOLEAN: number;
    };
    dpiValue: {
        1: number;
    };
};
export default constants;
