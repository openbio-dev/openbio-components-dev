import moment from "moment";
import constants from "./constants";

export default class WS {
  public deviceSocket: any;
  public componentSocket: any;
  public interfaceSocket: any;
  private connected: boolean;
  private connectionInterval: any;

  constructor() {
    this.init();
  }

  private connectionCheck(): void {
    if(this.connected) return;

    this.connectionInterval = setInterval(() => {
      if (this.connected) {
        return clearInterval(this.connectionInterval);
      } else {
        this.init();
      }
    }, 2000);
  }

  private init(): void {
    console.warn("websocket connection closed", moment().format());

    try {
      this.deviceSocket = new WebSocket(`ws://${constants.WS_HOST}/device`);
    } catch (error) {
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

  respondToDeviceWS(message): void {
    this.deviceSocket.send(JSON.stringify(message));
  }

  respondToComponentWS(message): void {
    this.componentSocket.send(JSON.stringify(message));
  }

  changeModuleTo(message): void {
    this.interfaceSocket.send(JSON.stringify(message));
  }

  status(): number {
    return this.deviceSocket.readyState;
  }

}
