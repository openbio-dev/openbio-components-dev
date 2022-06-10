import { h } from '../openbio-components.core.js';

import { a as constants } from './chunk-c112ef87.js';

const url = `http://${constants.WS_HOST}`;
let config, servicesUrl;
getAppConfig().then((response) => {
    config = response;
    servicesUrl = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
});
function getAppConfig() {
    return fetch(`${url}/db/api/config`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json());
}
function getCameraPresets() {
    return fetch(`${url}/db/api/camera-presets`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json());
}
async function saveServiceTime(type, time, personId) {
    const config = await getAppConfig();
    const serviceUrl = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
    return fetch(`${serviceUrl}/db/api/service-time`, {
        method: 'post',
        body: JSON.stringify({ type, time, personId }),
        headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json());
}

function showImage(canvas, data, rollStatus, lineX, manualEyeSelection) {
    const context = canvas && canvas.getContext('2d');
    if (context) {
        if (!data) {
            context.clearRect(0, 0, 460, 300);
            return;
        }
        const imageObj = new Image();
        const base64 = 'data:image/charset=UTF-8;png;base64,' + data;
        context.drawVerticalLine = function (left, top, height, color) {
            this.fillStyle = color;
            this.fillRect(left, top, 1, height);
        };
        const fitImageOn = function (canvas, imageObj) {
            const imageAspectRatio = imageObj.width / imageObj.height;
            const canvasAspectRatio = canvas.width / canvas.height;
            let renderableHeight, renderableWidth, xStart, yStart;
            if (imageAspectRatio < canvasAspectRatio) {
                renderableHeight = canvas.height;
                renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
                xStart = (canvas.width - renderableWidth) / 2;
                yStart = 0;
            }
            else if (imageAspectRatio > canvasAspectRatio) {
                renderableWidth = canvas.width;
                renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
                xStart = 0;
                yStart = (canvas.height - renderableHeight) / 2;
            }
            else {
                renderableHeight = canvas.height;
                renderableWidth = canvas.width;
                xStart = 0;
                yStart = 0;
            }
            const img = context.createImageData(canvas.width, canvas.height);
            for (let i = img.data.length; --i >= 0;) {
                img.data[i] = 0;
            }
            context.putImageData(img, 0, 0);
            context.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
            if (lineX && rollStatus) {
                context.drawVerticalLine((460 / 800) * lineX, xStart - 60, renderableHeight, rollStatus > 1 ? "green" : "red");
            }
            if (rollStatus === 0) {
                context.drawVerticalLine(0, 0, renderableHeight, "white");
            }
            if (manualEyeSelection && manualEyeSelection.eyes.length > 0) {
                manualEyeSelection.eyes.forEach((eye) => {
                    context.strokeStyle = "red";
                    context.beginPath();
                    context.arc(eye.x, eye.y, 5, 0, 2 * Math.PI);
                    context.stroke();
                });
            }
        };
        imageObj.onload = function () {
            fitImageOn(canvas, imageObj);
        };
        imageObj.src = base64;
    }
}

export { getAppConfig as a, getCameraPresets as b, showImage as c, saveServiceTime as d };
