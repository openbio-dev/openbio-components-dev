export default class WS {
    deviceSocket: any;
    componentSocket: any;
    interfaceSocket: any;
    constructor();
    private init;
    respondToDeviceWS(message: any): void;
    respondToComponentWS(message: any): void;
    changeModuleTo(message: any): void;
    status(): number;
}
