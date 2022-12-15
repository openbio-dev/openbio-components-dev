import { h } from '@stencil/core';
import { TranslationUtils } from '../../locales/translation';
import hexToRgba from 'hex-to-rgba';
export class ImageSegmentationAdjustmentComponent {
    constructor() {
        this.area_select = false;
        this.isPress = false;
        this.imagesArray = [];
        this.index = 0;
        this.color = "#ffffff";
        this.undo_disabled = true;
        this.redo_disable = true;
        this.brush_radius = 10;
        this.eraser_radius = 10;
        this.paint_radius = 10;
        this.restorer_radius = 10;
        this.tooltip = false;
        this.selected_area = false;
    }
    async componentWillLoad() {
        this.translations = await TranslationUtils.fetchTranslations();
        this.addCustomLink("https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css");
        this.addCustomLink("https://cdn.jsdelivr.net/npm/@mdi/font@6.6.96/css/materialdesignicons.min.css");
        this.addCustomLink("https://fonts.googleapis.com/css?family=Poppins");
    }
    addCustomLink(url) {
        let element = document.querySelector(`link[href="${url}"]`);
        if (!element) {
            element = document.createElement('link');
            element.setAttribute('rel', 'stylesheet');
            element.setAttribute('href', url);
            document.head.appendChild(element);
        }
    }
    componentDidLoad() {
        const parentElement = this.parentElementTag ? document.getElementsByTagName(this.parentElementTag)[0].shadowRoot.lastElementChild : document;
        const currentElement = this.currentElementTag ? parentElement.getElementsByTagName(this.currentElementTag)[0].shadowRoot.lastElementChild : parentElement;
        this.backgroundContext = this.backgroundCanvas.getContext('2d');
        this.overlayContext = this.overlayCanvas.getContext('2d');
        this.backgroundImage = new Image();
        this.backgroundImage.src = 'data:image/jpeg;base64, ' + this.originalImage;
        this.overlayImage = new Image();
        this.overlayImage.src = 'data:image/jpeg;base64, ' + this.segmentedImage;
        this.backgroundImage.onload = async () => {
            let width = 326; // this.backgroundImage.width;
            let height = 435;
            this.backgroundImage.height;
            this.backgroundCanvas.width = width;
            this.backgroundCanvas.height = height;
            this.overlayCanvas.width = width;
            this.overlayCanvas.height = height;
            this.backgroundCanvas.style.backgroundImage = "url('" + this.backgroundImage.src + "')";
            this.backgroundContext.drawImage(this.overlayImage, 0, 0, width, height);
            let imageURL = this.backgroundContext.getImageData(0, 0, width, height);
            this.imagesArray.push(imageURL);
        };
    }
    chooseTool(tool) {
        this.tool = tool;
        if (this.tooltip === true && this.tool !== 'restore' && this.tool !== 'brush' && this.tool !== 'eraser') {
            this.tooltip = false;
            this.rangeContainer.style.display = "none";
        }
        if (this.tool === 'undo') {
            this.imageRestore('undo');
        }
        else if (this.tool === 'redo') {
            this.imageRestore('redo');
        }
        else if (this.tool === 'eraser') {
            this.color = "#ffffff";
            this.tooltip = true;
            this.rangeContainer.style.marginTop = '195px';
            this.rangeContainer.style.display = 'block';
            this.brush_radius = this.eraser_radius;
        }
        else if (this.tool === 'restore') {
            this.tooltip = true;
            this.rangeContainer.style.marginTop = '20px';
            this.rangeContainer.style.display = 'block';
            this.brush_radius = this.restorer_radius;
        }
        else if (this.tool === 'brush') {
            this.tooltip = true;
            this.rangeContainer.style.marginTop = '100px';
            this.rangeContainer.style.display = 'block';
            this.brush_radius = this.paint_radius;
        }
        else if (this.tool === 'area_select') {
            this.area_select = true;
            if (!this.area_select) {
                this.overlayContext.clearRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
            }
        }
    }
    useTool(e) {
        let x = e.offsetX;
        let y = e.offsetY;
        this.isPress = true;
        this.old = { x: e.offsetX, y: e.offsetY };
        if (this.tooltip) {
            this.tooltip = false;
            this.rangeContainer.style.display = "none";
        }
        if (this.isPress && this.tool === 'restore') {
            this.backgroundContext.globalCompositeOperation = 'destination-out';
            if (this.area_select) {
                let cursor_x = +this.x_select + +12;
                let cursor_y = +this.y_select + +12;
                this.backgroundContext.clearRect(cursor_x, cursor_y, this.x_old - this.x_select, this.y_old - this.y_select);
                this.overlayContext.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
                this.selected_area = false;
            }
            else if (!this.area_select) {
                const cursor_style = this.backgroundContext.createRadialGradient(x, y, (this.restorer_radius - 5), (x + 1), (y + 1), (this.restorer_radius + 5));
                let transparent = hexToRgba(this.color, '0.05');
                cursor_style.addColorStop(1, transparent);
                this.backgroundContext.beginPath();
                this.backgroundContext.fillStyle = cursor_style;
                let cursor_x = +x + +12;
                let cursor_y = +y + +12;
                this.backgroundContext.arc(cursor_x, cursor_y, this.restorer_radius, 0, 2 * Math.PI, true);
                this.backgroundContext.fill();
            }
        }
        else if (this.isPress && this.tool === 'brush') {
            this.backgroundContext.globalCompositeOperation = 'source-over';
            if (this.area_select) {
                let cursor_x = +this.x_select + +12;
                let cursor_y = +this.y_select + +12;
                this.backgroundContext.beginPath();
                this.backgroundContext.fillStyle = this.color;
                this.backgroundContext.fillRect(cursor_x, cursor_y, this.x_old - this.x_select, this.y_old - this.y_select);
                this.overlayContext.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
                this.selected_area = false;
            }
            else if (!this.area_select) {
                let cursor_x = +x + +12;
                let cursor_y = +y + +12;
                const cursor_style = this.backgroundContext.createRadialGradient(cursor_x, cursor_y, (this.paint_radius * 0.1), (cursor_x + 1), (cursor_y + 1), (this.paint_radius), true);
                let transparent = hexToRgba(this.color, '0.05');
                let transparent_1 = hexToRgba(this.color, '0.1');
                let transparent_2 = hexToRgba(this.color, '0.15');
                let transparent_3 = hexToRgba(this.color, '0.2');
                let transparent_4 = hexToRgba(this.color, '0.25');
                cursor_style.addColorStop(0.1, transparent_4);
                cursor_style.addColorStop(0.2, transparent_3);
                cursor_style.addColorStop(0.3, transparent_2);
                cursor_style.addColorStop(0.5, transparent_1);
                cursor_style.addColorStop(1, transparent);
                this.backgroundContext.beginPath();
                this.backgroundContext.fillStyle = cursor_style;
                this.backgroundContext.arc(cursor_x, cursor_y, this.paint_radius, 0, 2 * Math.PI, true);
                this.backgroundContext.fill();
            }
        }
        else if (this.isPress && this.tool === 'eraser') {
            this.backgroundContext.globalCompositeOperation = 'source-over';
            if (this.area_select) {
                let cursor_x = +this.x_select + +12;
                let cursor_y = +this.y_select + +12;
                this.backgroundContext.beginPath();
                this.backgroundContext.fillStyle = this.color;
                this.backgroundContext.fillRect(cursor_x, cursor_y, this.x_old - this.x_select, this.y_old - this.y_select);
                this.overlayContext.clearRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
                this.selected_area = false;
            }
            else if (!this.area_select) {
                let cursor_x = +x + +12;
                let cursor_y = +y + +12;
                const cursor_style = this.backgroundContext.createRadialGradient(cursor_x, cursor_y, (this.eraser_radius * 0.1), (cursor_x + 1), (cursor_y + 1), (this.eraser_radius), true);
                let transparent = hexToRgba(this.color, '0.05');
                let transparent_1 = hexToRgba(this.color, '0.15');
                let transparent_2 = hexToRgba(this.color, '0.25');
                cursor_style.addColorStop(0, transparent_2);
                cursor_style.addColorStop(0.5, transparent_1);
                cursor_style.addColorStop(1, transparent);
                this.backgroundContext.beginPath();
                this.backgroundContext.fillStyle = cursor_style;
                this.backgroundContext.arc(cursor_x, cursor_y, this.eraser_radius, 0, 2 * Math.PI);
                this.backgroundContext.fill();
            }
        }
        else if (this.isPress && this.area_select && !this.selected_area) {
            this.x_select = x;
            this.y_select = y;
        }
        else if (this.isPress && this.area_select && this.selected_area) {
            this.x_select = x;
            this.y_select = y;
            this.overlayContext.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
            this.selected_area = false;
        }
    }
    keepUsingTool(e) {
        let x = e.offsetX;
        let y = e.offsetY;
        if (this.isPress && this.tool === 'restore' && !this.area_select) {
            this.backgroundContext.globalCompositeOperation = 'destination-out';
            const cursor_style = this.backgroundContext.createRadialGradient(x, y, (this.restorer_radius), (x + 1), (y + 1), (this.restorer_radius));
            let transparent = hexToRgba(this.color, '0.05');
            cursor_style.addColorStop(1, transparent);
            this.backgroundContext.beginPath();
            this.backgroundContext.fillStyle = cursor_style;
            let cursor_x = +x + +12;
            let cursor_y = +y + +12;
            this.backgroundContext.arc(cursor_x, cursor_y, this.restorer_radius, 0, 2 * Math.PI, true);
            this.backgroundContext.fill();
        }
        else if (this.isPress && this.tool === 'brush' && !this.area_select) {
            this.backgroundContext.globalCompositeOperation = 'source-over';
            let cursor_x = +x + +12;
            let cursor_y = +y + +12;
            const cursor_style = this.backgroundContext.createRadialGradient(cursor_x, cursor_y, (this.paint_radius * 0.1), (cursor_x + 1), (cursor_y + 1), (this.paint_radius), true);
            let transparent = hexToRgba(this.color, '0.05');
            let transparent_1 = hexToRgba(this.color, '0.1');
            let transparent_2 = hexToRgba(this.color, '0.15');
            let transparent_3 = hexToRgba(this.color, '0.2');
            let transparent_4 = hexToRgba(this.color, '0.25');
            cursor_style.addColorStop(0.1, transparent_4);
            cursor_style.addColorStop(0.2, transparent_3);
            cursor_style.addColorStop(0.3, transparent_2);
            cursor_style.addColorStop(0.5, transparent_1);
            cursor_style.addColorStop(1, transparent);
            this.backgroundContext.beginPath();
            this.backgroundContext.fillStyle = cursor_style;
            this.backgroundContext.arc(cursor_x, cursor_y, this.paint_radius, 0, 2 * Math.PI, true);
            this.backgroundContext.fill();
        }
        else if (this.isPress && this.tool === 'eraser' && !this.area_select) {
            let cursor_x = +x + +12;
            let cursor_y = +y + +12;
            const cursor_style = this.backgroundContext.createRadialGradient(cursor_x, cursor_y, (this.eraser_radius * 0.1), (cursor_x + 1), (cursor_y + 1), (this.eraser_radius), true);
            let transparent = hexToRgba(this.color, '0.05');
            let transparent_1 = hexToRgba(this.color, '0.15');
            let transparent_2 = hexToRgba(this.color, '0.25');
            cursor_style.addColorStop(0, transparent_2);
            cursor_style.addColorStop(0.5, transparent_1);
            cursor_style.addColorStop(1, transparent);
            this.backgroundContext.beginPath();
            this.backgroundContext.fillStyle = cursor_style;
            this.backgroundContext.arc(cursor_x, cursor_y, this.eraser_radius, 0, 2 * Math.PI, true);
            this.backgroundContext.fill();
        }
        else if (this.isPress && this.tool === 'area_select') {
            this.overlayContext.setLineDash([4, 2]);
            this.overlayContext.clearRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
            this.overlayContext.setLineDash([4, 2]);
            let cursor_x = +this.x_select + +12;
            let cursor_y = +this.y_select + +12;
            this.overlayContext.strokeRect(cursor_x, cursor_y, x - this.x_select, y - this.y_select);
            this.old = { x: x, y: y };
        }
    }
    stopUsingTool(event) {
        event.stopImmediatePropagation();
        this.isPress = false;
        this.undo_disabled = false;
        if (this.tool !== 'undo' && this.tool !== 'redo' && this.tool !== 'area_select') {
            let imageURL = this.backgroundContext.getImageData(0, 0, 480, 640);
            this.imagesArray.push(imageURL);
            this.index = this.imagesArray.length - 1;
            const dataImage = this.backgroundCanvas.toDataURL('image/png');
            this.imageAdjustmentCallback(this.parentComponentContext, true, dataImage);
            this.area_select = false;
        }
        else if (this.tool === 'area_select' && !this.selected_area) {
            this.x_old = this.old.x;
            this.y_old = this.old.y;
            this.selected_area = true;
        }
    }
    imageRestore(tool) {
        if (this.index >= 0) {
            this.index === 0 ? this.undo_disabled = true : this.undo_disabled = false;
            if (tool === 'redo') {
                this.undo_disabled = false;
                this.index = this.index + 1;
                let imageURL = this.imagesArray[this.index];
                this.backgroundContext.putImageData(imageURL, 0, 0);
                const dataImage = this.backgroundCanvas.toDataURL('image/png');
                this.imageAdjustmentCallback(this.parentComponentContext, true, dataImage);
                this.redo_disable = this.index === (this.imagesArray.length - 1);
            }
            else {
                this.redo_disable = false;
                this.index = this.index - 1;
                let imageURL = this.imagesArray[this.index];
                this.backgroundContext.putImageData(imageURL, 0, 0);
                const dataImage = this.backgroundCanvas.toDataURL('image/png');
                this.imageAdjustmentCallback(this.parentComponentContext, true, dataImage);
                this.undo_disabled = this.index === 0;
            }
        }
        if (this.index < 0) {
            this.index = 0;
            return;
        }
        else if (this.index === 0) {
            this.imageAdjustmentCallback(this.parentComponentContext, false, '');
        }
    }
    updateBrushRadius() {
        this.brush_radius = this.radius.value;
        if (this.tool === 'brush') {
            this.paint_radius = this.brush_radius;
        }
        else if (this.tool === 'eraser') {
            this.eraser_radius = this.brush_radius;
        }
        else if (this.tool === 'restore') {
            this.restorer_radius = this.brush_radius;
        }
    }
    colorPicker() {
        this.inputColor.click();
        if (this.tooltip === true) {
            this.tooltip = false;
            this.rangeContainer.style.display = "none";
        }
    }
    updateColor() {
        this.color = this.inputColor.value;
    }
    render() {
        return (h("div", { id: "container" },
            h("div", { class: "canvas-container" },
                h("canvas", { id: "backgroundCanvas", ref: el => {
                        this.backgroundCanvas = el;
                    } }),
                h("canvas", { id: "overlayCanvas", onMouseDown: (e) => this.useTool(e), onMouseMove: (e) => this.keepUsingTool(e), onMouseUp: (e) => this.stopUsingTool(e), ref: el => {
                        this.overlayCanvas = el;
                    } })),
            h("div", { class: "range-slider-container", style: { display: "none" }, ref: el => {
                    this.rangeContainer = el;
                } },
                h("label", { id: "brush-radius-label" }, this.tool === 'eraser' ? 'tamanho ' : this.translations.BRUSH_RADIUS),
                h("label", { id: "brush-radius", title: "radius" }, this.brush_radius),
                h("input", { type: "range", id: "radius", name: "volume", min: "1", max: "80", value: this.brush_radius, onChange: () => this.updateBrushRadius(), ref: el => {
                        this.radius = el;
                    } })),
            h("button", { class: "button is-success", id: "button", onClick: () => { this.saveAdjustedImageCallback(this.parentComponentContext); } },
                h("span", { class: "icon is-small" },
                    h("i", { class: "mdi mdi-check icon-24", style: { color: "white" }, "aria-hidden": "true", title: this.translations.SAVE_IMAGE })),
                h("span", null, this.translations.FINISH)),
            h("div", { class: "toolbox-container" },
                h("div", { class: "button-container", onClick: () => this.chooseTool('restore'), style: { boxShadow: this.tool === 'restore' ? '0 0 1em black' : '0 0 0' } },
                    h("i", { class: "mdi mdi-auto-fix icon-24", "aria-hidden": "true", title: this.translations.RESTORE })),
                h("div", { class: "button-container", onClick: () => this.chooseTool('brush'), style: { boxShadow: this.tool === 'brush' ? '0 0 1em black' : '0 0 0' } },
                    h("i", { class: "mdi mdi-brush icon-24", "aria-hidden": "true", title: this.translations.BRUSH })),
                h("div", { class: "button-container", onClick: () => this.chooseTool('eraser'), style: { boxShadow: this.tool === 'eraser' ? '0 0 1em black' : '0 0 0' } },
                    h("i", { class: "mdi mdi-eraser icon-24", "aria-hidden": "true", title: this.translations.ERASER })),
                h("div", { class: "button-container", onClick: () => this.chooseTool('area_select'), style: { boxShadow: this.tool === 'area_select' ? '0 0 1em black' : '0 0 0' } },
                    h("i", { class: "mdi mdi-selection icon-24", "aria-hidden": "true", title: this.translations.AREA_SELECTION })),
                h("div", { class: "button-container", onClick: () => this.chooseTool('undo'), style: { boxShadow: this.tool === 'undo' ? '0 0 1em black' : '0 0 0' } },
                    h("i", { class: "mdi mdi-undo icon-24", "aria-hidden": "true", title: this.translations.UNDO })),
                h("div", { class: "button-container", onClick: () => this.chooseTool('redo'), style: { boxShadow: this.tool === 'redo' ? '0 0 1em black' : '0 0 0' } },
                    h("i", { class: "mdi mdi-redo icon-24", "aria-hidden": "true", title: this.translations.REDO })),
                h("div", { class: "button-container", id: "color-picker", onClick: () => this.colorPicker() },
                    h("i", { class: "mdi mdi-palette icon-24", "aria-hidden": "true", title: this.translations.COLORS }))),
            h("input", { type: "color", id: "input-color", onChange: () => this.updateColor(), style: { visibility: "hidden" }, ref: el => {
                    this.inputColor = el;
                } })));
    }
    static get is() { return "image-segmentation-adjustment-component"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["image-segmentation-adjustment-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["image-segmentation-adjustment-component.css"]
    }; }
    static get properties() { return {
        "originalImage": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "original-image",
            "reflect": false
        },
        "segmentedImage": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "segmented-image",
            "reflect": false
        },
        "parentElementTag": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "parent-element-tag",
            "reflect": false
        },
        "currentElementTag": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "current-element-tag",
            "reflect": false
        },
        "parentComponentContext": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "parent-component-context",
            "reflect": false
        },
        "imageAdjustmentCallback": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "image-adjustment-callback",
            "reflect": false
        },
        "saveAdjustedImageCallback": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "save-adjusted-image-callback",
            "reflect": false
        }
    }; }
    static get states() { return {
        "translations": {},
        "tool": {},
        "backgroundCanvas": {},
        "overlayCanvas": {},
        "area_select": {},
        "backgroundContext": {},
        "overlayContext": {},
        "isPress": {},
        "backgroundImage": {},
        "overlayImage": {},
        "imagesArray": {},
        "index": {},
        "color": {},
        "undo_disabled": {},
        "redo_disable": {},
        "x_select": {},
        "y_select": {},
        "x_old": {},
        "y_old": {},
        "old": {},
        "brush_radius": {},
        "eraser_radius": {},
        "paint_radius": {},
        "restorer_radius": {},
        "radius": {},
        "inputColor": {},
        "rangeContainer": {},
        "tooltip": {},
        "selected_area": {}
    }; }
    static get elementRef() { return "componentContainer"; }
}
