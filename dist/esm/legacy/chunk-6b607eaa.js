function showImage(canvas, data, rollStatus, lineX, manualEyeSelection) {
    var context = canvas && canvas.getContext('2d');
    if (context) {
        if (!data) {
            context.clearRect(0, 0, 460, 300);
            return;
        }
        var imageObj_1 = new Image();
        var base64 = 'data:image/charset=UTF-8;png;base64,' + data;
        context.drawVerticalLine = function (left, top, height, color) {
            this.fillStyle = color;
            this.fillRect(left, top, 1, height);
        };
        var fitImageOn_1 = function (canvas, imageObj) {
            var imageAspectRatio = imageObj.width / imageObj.height;
            var canvasAspectRatio = canvas.width / canvas.height;
            var renderableHeight, renderableWidth, xStart, yStart;
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
            var img = context.createImageData(canvas.width, canvas.height);
            for (var i = img.data.length; --i >= 0;) {
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
                manualEyeSelection.eyes.forEach(function (eye) {
                    context.strokeStyle = "red";
                    context.beginPath();
                    context.arc(eye.x, eye.y, 5, 0, 2 * Math.PI);
                    context.stroke();
                });
            }
        };
        imageObj_1.onload = function () {
            fitImageOn_1(canvas, imageObj_1);
        };
        imageObj_1.src = base64;
    }
}
export { showImage as s };
