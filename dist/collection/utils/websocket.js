import moment from "moment";
import constants from "./constants";
export default class WS {
    constructor() {
        this.init();
    }
    connectionCheck() {
        if (this.connected)
            return;
        this.connectionInterval = setInterval(() => {
            if (this.connected) {
                return clearInterval(this.connectionInterval);
            }
            else {
                this.init();
            }
        }, 2000);
    }
    init() {
        console.warn("websocket connection closed", moment().format());
        try {
            this.deviceSocket = new WebSocket(`ws://${constants.WS_HOST}/device`);
        }
        catch (error) {
            console.log('Component WS error', error);
        }
        this.deviceSocket.addEventListener("close", () => {
            this.connected = false;
            this.connectionCheck();
            console.info("device websocket connection closed", moment().format());
        });
        this.deviceSocket.addEventListener("open", () => {
            this.connected = true;
            console.info("device websocket connection opened", moment().format());
        });
        this.componentSocket = new WebSocket(`ws://${constants.WS_HOST}/component`);
        this.componentSocket.addEventListener("close", () => {
            this.connected = false;
            this.connectionCheck();
        });
        this.componentSocket.addEventListener("open", () => {
            this.connected = true;
            console.info("component websocket connection opened", moment().format());
        });
        this.interfaceSocket = new WebSocket(`ws://${constants.WS_HOST}/interface`);
        this.interfaceSocket.addEventListener("close", () => {
            this.connected = false;
            this.connectionCheck();
        });
        this.interfaceSocket.addEventListener("open", () => {
            this.connected = true;
            console.info("interface websocket connection opened", moment().format());
        });
    }
    respondToDeviceWS(message) {
        if (message instanceof ArrayBuffer && message.byteLength !== undefined) {
            this.deviceSocket.send(message);
        }
        else {
            this.deviceSocket.send(JSON.stringify(message));
        }
    }
    respondToComponentWS(message) {
        this.componentSocket.send(JSON.stringify(message));
    }
    changeModuleTo(message) {
        this.interfaceSocket.send(JSON.stringify(message));
    }
    status() {
        return this.deviceSocket.readyState;
    }
}
