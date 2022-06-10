export class LoaderComponent {
    constructor() {
        this.enabled = false;
    }
    listenEnable(newValue) {
        const interval = 2000;
        let timeCount = 0;
        let checkStatusInterval;
        if (newValue) {
            checkStatusInterval = setInterval(() => {
                timeCount = timeCount + interval;
                if (timeCount >= 60000) {
                    this.enabled = false;
                    clearInterval(checkStatusInterval);
                }
            }, interval);
        }
        else {
            timeCount = 0;
            checkStatusInterval = undefined;
        }
    }
    render() {
        return (h("div", { class: "loading", style: { display: this.enabled ? 'inline' : 'none' } },
            h("div", { class: "spinner" })));
    }
    static get is() { return "loader-component"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "enabled": {
            "type": Boolean,
            "attr": "enabled",
            "mutable": true,
            "watchCallbacks": ["listenEnable"]
        }
    }; }
    static get style() { return "/**style-placeholder:loader-component:**/"; }
}
