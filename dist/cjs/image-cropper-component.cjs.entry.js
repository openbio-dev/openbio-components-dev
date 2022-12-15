'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-5ff55b14.js');
const __chunk_2 = require('./chunk-02c088c7.js');
const __chunk_4 = require('./chunk-c5f2ac0b.js');

var cropper = __chunk_2.createCommonjsModule(function (module, exports) {
/*!
 * Cropper.js v1.5.13
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2022-11-20T05:30:46.114Z
 */

(function (global, factory) {
  module.exports = factory();
})(__chunk_2.commonjsGlobal, (function () {
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
  var WINDOW = IS_BROWSER ? window : {};
  var IS_TOUCH_DEVICE = IS_BROWSER && WINDOW.document.documentElement ? 'ontouchstart' in WINDOW.document.documentElement : false;
  var HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in WINDOW : false;
  var NAMESPACE = 'cropper';

  // Actions
  var ACTION_ALL = 'all';
  var ACTION_CROP = 'crop';
  var ACTION_MOVE = 'move';
  var ACTION_ZOOM = 'zoom';
  var ACTION_EAST = 'e';
  var ACTION_WEST = 'w';
  var ACTION_SOUTH = 's';
  var ACTION_NORTH = 'n';
  var ACTION_NORTH_EAST = 'ne';
  var ACTION_NORTH_WEST = 'nw';
  var ACTION_SOUTH_EAST = 'se';
  var ACTION_SOUTH_WEST = 'sw';

  // Classes
  var CLASS_CROP = "".concat(NAMESPACE, "-crop");
  var CLASS_DISABLED = "".concat(NAMESPACE, "-disabled");
  var CLASS_HIDDEN = "".concat(NAMESPACE, "-hidden");
  var CLASS_HIDE = "".concat(NAMESPACE, "-hide");
  var CLASS_INVISIBLE = "".concat(NAMESPACE, "-invisible");
  var CLASS_MODAL = "".concat(NAMESPACE, "-modal");
  var CLASS_MOVE = "".concat(NAMESPACE, "-move");

  // Data keys
  var DATA_ACTION = "".concat(NAMESPACE, "Action");
  var DATA_PREVIEW = "".concat(NAMESPACE, "Preview");

  // Drag modes
  var DRAG_MODE_CROP = 'crop';
  var DRAG_MODE_MOVE = 'move';
  var DRAG_MODE_NONE = 'none';

  // Events
  var EVENT_CROP = 'crop';
  var EVENT_CROP_END = 'cropend';
  var EVENT_CROP_MOVE = 'cropmove';
  var EVENT_CROP_START = 'cropstart';
  var EVENT_DBLCLICK = 'dblclick';
  var EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
  var EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
  var EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend touchcancel' : 'mouseup';
  var EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
  var EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
  var EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup pointercancel' : EVENT_TOUCH_END;
  var EVENT_READY = 'ready';
  var EVENT_RESIZE = 'resize';
  var EVENT_WHEEL = 'wheel';
  var EVENT_ZOOM = 'zoom';

  // Mime types
  var MIME_TYPE_JPEG = 'image/jpeg';

  // RegExps
  var REGEXP_ACTIONS = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/;
  var REGEXP_DATA_URL = /^data:/;
  var REGEXP_DATA_URL_JPEG = /^data:image\/jpeg;base64,/;
  var REGEXP_TAG_NAME = /^img|canvas$/i;

  // Misc
  // Inspired by the default width and height of a canvas element.
  var MIN_CONTAINER_WIDTH = 200;
  var MIN_CONTAINER_HEIGHT = 100;

  var DEFAULTS = {
    // Define the view mode of the cropper
    viewMode: 0,
    // 0, 1, 2, 3

    // Define the dragging mode of the cropper
    dragMode: DRAG_MODE_CROP,
    // 'crop', 'move' or 'none'

    // Define the initial aspect ratio of the crop box
    initialAspectRatio: NaN,
    // Define the aspect ratio of the crop box
    aspectRatio: NaN,
    // An object with the previous cropping result data
    data: null,
    // A selector for adding extra containers to preview
    preview: '',
    // Re-render the cropper when resize the window
    responsive: true,
    // Restore the cropped area after resize the window
    restore: true,
    // Check if the current image is a cross-origin image
    checkCrossOrigin: true,
    // Check the current image's Exif Orientation information
    checkOrientation: true,
    // Show the black modal
    modal: true,
    // Show the dashed lines for guiding
    guides: true,
    // Show the center indicator for guiding
    center: true,
    // Show the white modal to highlight the crop box
    highlight: true,
    // Show the grid background
    background: true,
    // Enable to crop the image automatically when initialize
    autoCrop: true,
    // Define the percentage of automatic cropping area when initializes
    autoCropArea: 0.8,
    // Enable to move the image
    movable: true,
    // Enable to rotate the image
    rotatable: true,
    // Enable to scale the image
    scalable: true,
    // Enable to zoom the image
    zoomable: true,
    // Enable to zoom the image by dragging touch
    zoomOnTouch: true,
    // Enable to zoom the image by wheeling mouse
    zoomOnWheel: true,
    // Define zoom ratio when zoom the image by wheeling mouse
    wheelZoomRatio: 0.1,
    // Enable to move the crop box
    cropBoxMovable: true,
    // Enable to resize the crop box
    cropBoxResizable: true,
    // Toggle drag mode between "crop" and "move" when click twice on the cropper
    toggleDragModeOnDblclick: true,
    // Size limitation
    minCanvasWidth: 0,
    minCanvasHeight: 0,
    minCropBoxWidth: 0,
    minCropBoxHeight: 0,
    minContainerWidth: MIN_CONTAINER_WIDTH,
    minContainerHeight: MIN_CONTAINER_HEIGHT,
    // Shortcuts of events
    ready: null,
    cropstart: null,
    cropmove: null,
    cropend: null,
    crop: null,
    zoom: null
  };

  var TEMPLATE = '<div class="cropper-container" touch-action="none">' + '<div class="cropper-wrap-box">' + '<div class="cropper-canvas"></div>' + '</div>' + '<div class="cropper-drag-box"></div>' + '<div class="cropper-crop-box">' + '<span class="cropper-view-box"></span>' + '<span class="cropper-dashed dashed-h"></span>' + '<span class="cropper-dashed dashed-v"></span>' + '<span class="cropper-center"></span>' + '<span class="cropper-face"></span>' + '<span class="cropper-line line-e" data-cropper-action="e"></span>' + '<span class="cropper-line line-n" data-cropper-action="n"></span>' + '<span class="cropper-line line-w" data-cropper-action="w"></span>' + '<span class="cropper-line line-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-e" data-cropper-action="e"></span>' + '<span class="cropper-point point-n" data-cropper-action="n"></span>' + '<span class="cropper-point point-w" data-cropper-action="w"></span>' + '<span class="cropper-point point-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-ne" data-cropper-action="ne"></span>' + '<span class="cropper-point point-nw" data-cropper-action="nw"></span>' + '<span class="cropper-point point-sw" data-cropper-action="sw"></span>' + '<span class="cropper-point point-se" data-cropper-action="se"></span>' + '</div>' + '</div>';

  /**
   * Check if the given value is not a number.
   */
  var isNaN = Number.isNaN || WINDOW.isNaN;

  /**
   * Check if the given value is a number.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a number, else `false`.
   */
  function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }

  /**
   * Check if the given value is a positive number.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a positive number, else `false`.
   */
  var isPositiveNumber = function isPositiveNumber(value) {
    return value > 0 && value < Infinity;
  };

  /**
   * Check if the given value is undefined.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
   */
  function isUndefined(value) {
    return typeof value === 'undefined';
  }

  /**
   * Check if the given value is an object.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is an object, else `false`.
   */
  function isObject(value) {
    return _typeof(value) === 'object' && value !== null;
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  /**
   * Check if the given value is a plain object.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
   */
  function isPlainObject(value) {
    if (!isObject(value)) {
      return false;
    }
    try {
      var _constructor = value.constructor;
      var prototype = _constructor.prototype;
      return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if the given value is a function.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a function, else `false`.
   */
  function isFunction(value) {
    return typeof value === 'function';
  }
  var slice = Array.prototype.slice;

  /**
   * Convert array-like or iterable object to an array.
   * @param {*} value - The value to convert.
   * @returns {Array} Returns a new array.
   */
  function toArray(value) {
    return Array.from ? Array.from(value) : slice.call(value);
  }

  /**
   * Iterate the given data.
   * @param {*} data - The data to iterate.
   * @param {Function} callback - The process function for each element.
   * @returns {*} The original data.
   */
  function forEach(data, callback) {
    if (data && isFunction(callback)) {
      if (Array.isArray(data) || isNumber(data.length) /* array-like */) {
        toArray(data).forEach(function (value, key) {
          callback.call(data, value, key, data);
        });
      } else if (isObject(data)) {
        Object.keys(data).forEach(function (key) {
          callback.call(data, data[key], key, data);
        });
      }
    }
    return data;
  }

  /**
   * Extend the given object.
   * @param {*} target - The target object to extend.
   * @param {*} args - The rest objects for merging to the target object.
   * @returns {Object} The extended object.
   */
  var assign = Object.assign || function assign(target) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (isObject(target) && args.length > 0) {
      args.forEach(function (arg) {
        if (isObject(arg)) {
          Object.keys(arg).forEach(function (key) {
            target[key] = arg[key];
          });
        }
      });
    }
    return target;
  };
  var REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;

  /**
   * Normalize decimal number.
   * Check out {@link https://0.30000000000000004.com/}
   * @param {number} value - The value to normalize.
   * @param {number} [times=100000000000] - The times for normalizing.
   * @returns {number} Returns the normalized number.
   */
  function normalizeDecimalNumber(value) {
    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100000000000;
    return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
  }
  var REGEXP_SUFFIX = /^width|height|left|top|marginLeft|marginTop$/;

  /**
   * Apply styles to the given element.
   * @param {Element} element - The target element.
   * @param {Object} styles - The styles for applying.
   */
  function setStyle(element, styles) {
    var style = element.style;
    forEach(styles, function (value, property) {
      if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
        value = "".concat(value, "px");
      }
      style[property] = value;
    });
  }

  /**
   * Check if the given element has a special class.
   * @param {Element} element - The element to check.
   * @param {string} value - The class to search.
   * @returns {boolean} Returns `true` if the special class was found.
   */
  function hasClass(element, value) {
    return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
  }

  /**
   * Add classes to the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be added.
   */
  function addClass(element, value) {
    if (!value) {
      return;
    }
    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        addClass(elem, value);
      });
      return;
    }
    if (element.classList) {
      element.classList.add(value);
      return;
    }
    var className = element.className.trim();
    if (!className) {
      element.className = value;
    } else if (className.indexOf(value) < 0) {
      element.className = "".concat(className, " ").concat(value);
    }
  }

  /**
   * Remove classes from the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be removed.
   */
  function removeClass(element, value) {
    if (!value) {
      return;
    }
    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        removeClass(elem, value);
      });
      return;
    }
    if (element.classList) {
      element.classList.remove(value);
      return;
    }
    if (element.className.indexOf(value) >= 0) {
      element.className = element.className.replace(value, '');
    }
  }

  /**
   * Add or remove classes from the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be toggled.
   * @param {boolean} added - Add only.
   */
  function toggleClass(element, value, added) {
    if (!value) {
      return;
    }
    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        toggleClass(elem, value, added);
      });
      return;
    }

    // IE10-11 doesn't support the second parameter of `classList.toggle`
    if (added) {
      addClass(element, value);
    } else {
      removeClass(element, value);
    }
  }
  var REGEXP_CAMEL_CASE = /([a-z\d])([A-Z])/g;

  /**
   * Transform the given string from camelCase to kebab-case
   * @param {string} value - The value to transform.
   * @returns {string} The transformed value.
   */
  function toParamCase(value) {
    return value.replace(REGEXP_CAMEL_CASE, '$1-$2').toLowerCase();
  }

  /**
   * Get data from the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to get.
   * @returns {string} The data value.
   */
  function getData(element, name) {
    if (isObject(element[name])) {
      return element[name];
    }
    if (element.dataset) {
      return element.dataset[name];
    }
    return element.getAttribute("data-".concat(toParamCase(name)));
  }

  /**
   * Set data to the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to set.
   * @param {string} data - The data value.
   */
  function setData(element, name, data) {
    if (isObject(data)) {
      element[name] = data;
    } else if (element.dataset) {
      element.dataset[name] = data;
    } else {
      element.setAttribute("data-".concat(toParamCase(name)), data);
    }
  }

  /**
   * Remove data from the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to remove.
   */
  function removeData(element, name) {
    if (isObject(element[name])) {
      try {
        delete element[name];
      } catch (error) {
        element[name] = undefined;
      }
    } else if (element.dataset) {
      // #128 Safari not allows to delete dataset property
      try {
        delete element.dataset[name];
      } catch (error) {
        element.dataset[name] = undefined;
      }
    } else {
      element.removeAttribute("data-".concat(toParamCase(name)));
    }
  }
  var REGEXP_SPACES = /\s\s*/;
  var onceSupported = function () {
    var supported = false;
    if (IS_BROWSER) {
      var once = false;
      var listener = function listener() {};
      var options = Object.defineProperty({}, 'once', {
        get: function get() {
          supported = true;
          return once;
        },
        /**
         * This setter can fix a `TypeError` in strict mode
         * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
         * @param {boolean} value - The value to set
         */
        set: function set(value) {
          once = value;
        }
      });
      WINDOW.addEventListener('test', listener, options);
      WINDOW.removeEventListener('test', listener, options);
    }
    return supported;
  }();

  /**
   * Remove event listener from the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Function} listener - The event listener.
   * @param {Object} options - The event options.
   */
  function removeListener(element, type, listener) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var handler = listener;
    type.trim().split(REGEXP_SPACES).forEach(function (event) {
      if (!onceSupported) {
        var listeners = element.listeners;
        if (listeners && listeners[event] && listeners[event][listener]) {
          handler = listeners[event][listener];
          delete listeners[event][listener];
          if (Object.keys(listeners[event]).length === 0) {
            delete listeners[event];
          }
          if (Object.keys(listeners).length === 0) {
            delete element.listeners;
          }
        }
      }
      element.removeEventListener(event, handler, options);
    });
  }

  /**
   * Add event listener to the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Function} listener - The event listener.
   * @param {Object} options - The event options.
   */
  function addListener(element, type, listener) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var _handler = listener;
    type.trim().split(REGEXP_SPACES).forEach(function (event) {
      if (options.once && !onceSupported) {
        var _element$listeners = element.listeners,
          listeners = _element$listeners === void 0 ? {} : _element$listeners;
        _handler = function handler() {
          delete listeners[event][listener];
          element.removeEventListener(event, _handler, options);
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          listener.apply(element, args);
        };
        if (!listeners[event]) {
          listeners[event] = {};
        }
        if (listeners[event][listener]) {
          element.removeEventListener(event, listeners[event][listener], options);
        }
        listeners[event][listener] = _handler;
        element.listeners = listeners;
      }
      element.addEventListener(event, _handler, options);
    });
  }

  /**
   * Dispatch event on the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Object} data - The additional event data.
   * @returns {boolean} Indicate if the event is default prevented or not.
   */
  function dispatchEvent(element, type, data) {
    var event;

    // Event and CustomEvent on IE9-11 are global objects, not constructors
    if (isFunction(Event) && isFunction(CustomEvent)) {
      event = new CustomEvent(type, {
        detail: data,
        bubbles: true,
        cancelable: true
      });
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(type, true, true, data);
    }
    return element.dispatchEvent(event);
  }

  /**
   * Get the offset base on the document.
   * @param {Element} element - The target element.
   * @returns {Object} The offset data.
   */
  function getOffset(element) {
    var box = element.getBoundingClientRect();
    return {
      left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
      top: box.top + (window.pageYOffset - document.documentElement.clientTop)
    };
  }
  var location = WINDOW.location;
  var REGEXP_ORIGINS = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;

  /**
   * Check if the given URL is a cross origin URL.
   * @param {string} url - The target URL.
   * @returns {boolean} Returns `true` if the given URL is a cross origin URL, else `false`.
   */
  function isCrossOriginURL(url) {
    var parts = url.match(REGEXP_ORIGINS);
    return parts !== null && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
  }

  /**
   * Add timestamp to the given URL.
   * @param {string} url - The target URL.
   * @returns {string} The result URL.
   */
  function addTimestamp(url) {
    var timestamp = "timestamp=".concat(new Date().getTime());
    return url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp;
  }

  /**
   * Get transforms base on the given object.
   * @param {Object} obj - The target object.
   * @returns {string} A string contains transform values.
   */
  function getTransforms(_ref) {
    var rotate = _ref.rotate,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      translateX = _ref.translateX,
      translateY = _ref.translateY;
    var values = [];
    if (isNumber(translateX) && translateX !== 0) {
      values.push("translateX(".concat(translateX, "px)"));
    }
    if (isNumber(translateY) && translateY !== 0) {
      values.push("translateY(".concat(translateY, "px)"));
    }

    // Rotate should come first before scale to match orientation transform
    if (isNumber(rotate) && rotate !== 0) {
      values.push("rotate(".concat(rotate, "deg)"));
    }
    if (isNumber(scaleX) && scaleX !== 1) {
      values.push("scaleX(".concat(scaleX, ")"));
    }
    if (isNumber(scaleY) && scaleY !== 1) {
      values.push("scaleY(".concat(scaleY, ")"));
    }
    var transform = values.length ? values.join(' ') : 'none';
    return {
      WebkitTransform: transform,
      msTransform: transform,
      transform: transform
    };
  }

  /**
   * Get the max ratio of a group of pointers.
   * @param {string} pointers - The target pointers.
   * @returns {number} The result ratio.
   */
  function getMaxZoomRatio(pointers) {
    var pointers2 = _objectSpread2({}, pointers);
    var maxRatio = 0;
    forEach(pointers, function (pointer, pointerId) {
      delete pointers2[pointerId];
      forEach(pointers2, function (pointer2) {
        var x1 = Math.abs(pointer.startX - pointer2.startX);
        var y1 = Math.abs(pointer.startY - pointer2.startY);
        var x2 = Math.abs(pointer.endX - pointer2.endX);
        var y2 = Math.abs(pointer.endY - pointer2.endY);
        var z1 = Math.sqrt(x1 * x1 + y1 * y1);
        var z2 = Math.sqrt(x2 * x2 + y2 * y2);
        var ratio = (z2 - z1) / z1;
        if (Math.abs(ratio) > Math.abs(maxRatio)) {
          maxRatio = ratio;
        }
      });
    });
    return maxRatio;
  }

  /**
   * Get a pointer from an event object.
   * @param {Object} event - The target event object.
   * @param {boolean} endOnly - Indicates if only returns the end point coordinate or not.
   * @returns {Object} The result pointer contains start and/or end point coordinates.
   */
  function getPointer(_ref2, endOnly) {
    var pageX = _ref2.pageX,
      pageY = _ref2.pageY;
    var end = {
      endX: pageX,
      endY: pageY
    };
    return endOnly ? end : _objectSpread2({
      startX: pageX,
      startY: pageY
    }, end);
  }

  /**
   * Get the center point coordinate of a group of pointers.
   * @param {Object} pointers - The target pointers.
   * @returns {Object} The center point coordinate.
   */
  function getPointersCenter(pointers) {
    var pageX = 0;
    var pageY = 0;
    var count = 0;
    forEach(pointers, function (_ref3) {
      var startX = _ref3.startX,
        startY = _ref3.startY;
      pageX += startX;
      pageY += startY;
      count += 1;
    });
    pageX /= count;
    pageY /= count;
    return {
      pageX: pageX,
      pageY: pageY
    };
  }

  /**
   * Get the max sizes in a rectangle under the given aspect ratio.
   * @param {Object} data - The original sizes.
   * @param {string} [type='contain'] - The adjust type.
   * @returns {Object} The result sizes.
   */
  function getAdjustedSizes(_ref4) {
    var aspectRatio = _ref4.aspectRatio,
      height = _ref4.height,
      width = _ref4.width;
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'contain';
    var isValidWidth = isPositiveNumber(width);
    var isValidHeight = isPositiveNumber(height);
    if (isValidWidth && isValidHeight) {
      var adjustedWidth = height * aspectRatio;
      if (type === 'contain' && adjustedWidth > width || type === 'cover' && adjustedWidth < width) {
        height = width / aspectRatio;
      } else {
        width = height * aspectRatio;
      }
    } else if (isValidWidth) {
      height = width / aspectRatio;
    } else if (isValidHeight) {
      width = height * aspectRatio;
    }
    return {
      width: width,
      height: height
    };
  }

  /**
   * Get the new sizes of a rectangle after rotated.
   * @param {Object} data - The original sizes.
   * @returns {Object} The result sizes.
   */
  function getRotatedSizes(_ref5) {
    var width = _ref5.width,
      height = _ref5.height,
      degree = _ref5.degree;
    degree = Math.abs(degree) % 180;
    if (degree === 90) {
      return {
        width: height,
        height: width
      };
    }
    var arc = degree % 90 * Math.PI / 180;
    var sinArc = Math.sin(arc);
    var cosArc = Math.cos(arc);
    var newWidth = width * cosArc + height * sinArc;
    var newHeight = width * sinArc + height * cosArc;
    return degree > 90 ? {
      width: newHeight,
      height: newWidth
    } : {
      width: newWidth,
      height: newHeight
    };
  }

  /**
   * Get a canvas which drew the given image.
   * @param {HTMLImageElement} image - The image for drawing.
   * @param {Object} imageData - The image data.
   * @param {Object} canvasData - The canvas data.
   * @param {Object} options - The options.
   * @returns {HTMLCanvasElement} The result canvas.
   */
  function getSourceCanvas(image, _ref6, _ref7, _ref8) {
    var imageAspectRatio = _ref6.aspectRatio,
      imageNaturalWidth = _ref6.naturalWidth,
      imageNaturalHeight = _ref6.naturalHeight,
      _ref6$rotate = _ref6.rotate,
      rotate = _ref6$rotate === void 0 ? 0 : _ref6$rotate,
      _ref6$scaleX = _ref6.scaleX,
      scaleX = _ref6$scaleX === void 0 ? 1 : _ref6$scaleX,
      _ref6$scaleY = _ref6.scaleY,
      scaleY = _ref6$scaleY === void 0 ? 1 : _ref6$scaleY;
    var aspectRatio = _ref7.aspectRatio,
      naturalWidth = _ref7.naturalWidth,
      naturalHeight = _ref7.naturalHeight;
    var _ref8$fillColor = _ref8.fillColor,
      fillColor = _ref8$fillColor === void 0 ? 'transparent' : _ref8$fillColor,
      _ref8$imageSmoothingE = _ref8.imageSmoothingEnabled,
      imageSmoothingEnabled = _ref8$imageSmoothingE === void 0 ? true : _ref8$imageSmoothingE,
      _ref8$imageSmoothingQ = _ref8.imageSmoothingQuality,
      imageSmoothingQuality = _ref8$imageSmoothingQ === void 0 ? 'low' : _ref8$imageSmoothingQ,
      _ref8$maxWidth = _ref8.maxWidth,
      maxWidth = _ref8$maxWidth === void 0 ? Infinity : _ref8$maxWidth,
      _ref8$maxHeight = _ref8.maxHeight,
      maxHeight = _ref8$maxHeight === void 0 ? Infinity : _ref8$maxHeight,
      _ref8$minWidth = _ref8.minWidth,
      minWidth = _ref8$minWidth === void 0 ? 0 : _ref8$minWidth,
      _ref8$minHeight = _ref8.minHeight,
      minHeight = _ref8$minHeight === void 0 ? 0 : _ref8$minHeight;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var maxSizes = getAdjustedSizes({
      aspectRatio: aspectRatio,
      width: maxWidth,
      height: maxHeight
    });
    var minSizes = getAdjustedSizes({
      aspectRatio: aspectRatio,
      width: minWidth,
      height: minHeight
    }, 'cover');
    var width = Math.min(maxSizes.width, Math.max(minSizes.width, naturalWidth));
    var height = Math.min(maxSizes.height, Math.max(minSizes.height, naturalHeight));

    // Note: should always use image's natural sizes for drawing as
    // imageData.naturalWidth === canvasData.naturalHeight when rotate % 180 === 90
    var destMaxSizes = getAdjustedSizes({
      aspectRatio: imageAspectRatio,
      width: maxWidth,
      height: maxHeight
    });
    var destMinSizes = getAdjustedSizes({
      aspectRatio: imageAspectRatio,
      width: minWidth,
      height: minHeight
    }, 'cover');
    var destWidth = Math.min(destMaxSizes.width, Math.max(destMinSizes.width, imageNaturalWidth));
    var destHeight = Math.min(destMaxSizes.height, Math.max(destMinSizes.height, imageNaturalHeight));
    var params = [-destWidth / 2, -destHeight / 2, destWidth, destHeight];
    canvas.width = normalizeDecimalNumber(width);
    canvas.height = normalizeDecimalNumber(height);
    context.fillStyle = fillColor;
    context.fillRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);
    context.rotate(rotate * Math.PI / 180);
    context.scale(scaleX, scaleY);
    context.imageSmoothingEnabled = imageSmoothingEnabled;
    context.imageSmoothingQuality = imageSmoothingQuality;
    context.drawImage.apply(context, [image].concat(_toConsumableArray(params.map(function (param) {
      return Math.floor(normalizeDecimalNumber(param));
    }))));
    context.restore();
    return canvas;
  }
  var fromCharCode = String.fromCharCode;

  /**
   * Get string from char code in data view.
   * @param {DataView} dataView - The data view for read.
   * @param {number} start - The start index.
   * @param {number} length - The read length.
   * @returns {string} The read result.
   */
  function getStringFromCharCode(dataView, start, length) {
    var str = '';
    length += start;
    for (var i = start; i < length; i += 1) {
      str += fromCharCode(dataView.getUint8(i));
    }
    return str;
  }
  var REGEXP_DATA_URL_HEAD = /^data:.*,/;

  /**
   * Transform Data URL to array buffer.
   * @param {string} dataURL - The Data URL to transform.
   * @returns {ArrayBuffer} The result array buffer.
   */
  function dataURLToArrayBuffer(dataURL) {
    var base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, '');
    var binary = atob(base64);
    var arrayBuffer = new ArrayBuffer(binary.length);
    var uint8 = new Uint8Array(arrayBuffer);
    forEach(uint8, function (value, i) {
      uint8[i] = binary.charCodeAt(i);
    });
    return arrayBuffer;
  }

  /**
   * Transform array buffer to Data URL.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
   * @param {string} mimeType - The mime type of the Data URL.
   * @returns {string} The result Data URL.
   */
  function arrayBufferToDataURL(arrayBuffer, mimeType) {
    var chunks = [];

    // Chunk Typed Array for better performance (#435)
    var chunkSize = 8192;
    var uint8 = new Uint8Array(arrayBuffer);
    while (uint8.length > 0) {
      // XXX: Babel's `toConsumableArray` helper will throw error in IE or Safari 9
      // eslint-disable-next-line prefer-spread
      chunks.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
      uint8 = uint8.subarray(chunkSize);
    }
    return "data:".concat(mimeType, ";base64,").concat(btoa(chunks.join('')));
  }

  /**
   * Get orientation value from given array buffer.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to read.
   * @returns {number} The read orientation value.
   */
  function resetAndGetOrientation(arrayBuffer) {
    var dataView = new DataView(arrayBuffer);
    var orientation;

    // Ignores range error when the image does not have correct Exif information
    try {
      var littleEndian;
      var app1Start;
      var ifdStart;

      // Only handle JPEG image (start by 0xFFD8)
      if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
        var length = dataView.byteLength;
        var offset = 2;
        while (offset + 1 < length) {
          if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
            app1Start = offset;
            break;
          }
          offset += 1;
        }
      }
      if (app1Start) {
        var exifIDCode = app1Start + 4;
        var tiffOffset = app1Start + 10;
        if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
          var endianness = dataView.getUint16(tiffOffset);
          littleEndian = endianness === 0x4949;
          if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
            if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
              var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
              if (firstIFDOffset >= 0x00000008) {
                ifdStart = tiffOffset + firstIFDOffset;
              }
            }
          }
        }
      }
      if (ifdStart) {
        var _length = dataView.getUint16(ifdStart, littleEndian);
        var _offset;
        var i;
        for (i = 0; i < _length; i += 1) {
          _offset = ifdStart + i * 12 + 2;
          if (dataView.getUint16(_offset, littleEndian) === 0x0112 /* Orientation */) {
            // 8 is the offset of the current tag's value
            _offset += 8;

            // Get the original orientation value
            orientation = dataView.getUint16(_offset, littleEndian);

            // Override the orientation with its default value
            dataView.setUint16(_offset, 1, littleEndian);
            break;
          }
        }
      }
    } catch (error) {
      orientation = 1;
    }
    return orientation;
  }

  /**
   * Parse Exif Orientation value.
   * @param {number} orientation - The orientation to parse.
   * @returns {Object} The parsed result.
   */
  function parseOrientation(orientation) {
    var rotate = 0;
    var scaleX = 1;
    var scaleY = 1;
    switch (orientation) {
      // Flip horizontal
      case 2:
        scaleX = -1;
        break;

      // Rotate left 180°
      case 3:
        rotate = -180;
        break;

      // Flip vertical
      case 4:
        scaleY = -1;
        break;

      // Flip vertical and rotate right 90°
      case 5:
        rotate = 90;
        scaleY = -1;
        break;

      // Rotate right 90°
      case 6:
        rotate = 90;
        break;

      // Flip horizontal and rotate right 90°
      case 7:
        rotate = 90;
        scaleX = -1;
        break;

      // Rotate left 90°
      case 8:
        rotate = -90;
        break;
    }
    return {
      rotate: rotate,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }

  var render = {
    render: function render() {
      this.initContainer();
      this.initCanvas();
      this.initCropBox();
      this.renderCanvas();
      if (this.cropped) {
        this.renderCropBox();
      }
    },
    initContainer: function initContainer() {
      var element = this.element,
        options = this.options,
        container = this.container,
        cropper = this.cropper;
      var minWidth = Number(options.minContainerWidth);
      var minHeight = Number(options.minContainerHeight);
      addClass(cropper, CLASS_HIDDEN);
      removeClass(element, CLASS_HIDDEN);
      var containerData = {
        width: Math.max(container.offsetWidth, minWidth >= 0 ? minWidth : MIN_CONTAINER_WIDTH),
        height: Math.max(container.offsetHeight, minHeight >= 0 ? minHeight : MIN_CONTAINER_HEIGHT)
      };
      this.containerData = containerData;
      setStyle(cropper, {
        width: containerData.width,
        height: containerData.height
      });
      addClass(element, CLASS_HIDDEN);
      removeClass(cropper, CLASS_HIDDEN);
    },
    // Canvas (image wrapper)
    initCanvas: function initCanvas() {
      var containerData = this.containerData,
        imageData = this.imageData;
      var viewMode = this.options.viewMode;
      var rotated = Math.abs(imageData.rotate) % 180 === 90;
      var naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
      var naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
      var aspectRatio = naturalWidth / naturalHeight;
      var canvasWidth = containerData.width;
      var canvasHeight = containerData.height;
      if (containerData.height * aspectRatio > containerData.width) {
        if (viewMode === 3) {
          canvasWidth = containerData.height * aspectRatio;
        } else {
          canvasHeight = containerData.width / aspectRatio;
        }
      } else if (viewMode === 3) {
        canvasHeight = containerData.width / aspectRatio;
      } else {
        canvasWidth = containerData.height * aspectRatio;
      }
      var canvasData = {
        aspectRatio: aspectRatio,
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        width: canvasWidth,
        height: canvasHeight
      };
      this.canvasData = canvasData;
      this.limited = viewMode === 1 || viewMode === 2;
      this.limitCanvas(true, true);
      canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
      canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
      canvasData.left = (containerData.width - canvasData.width) / 2;
      canvasData.top = (containerData.height - canvasData.height) / 2;
      canvasData.oldLeft = canvasData.left;
      canvasData.oldTop = canvasData.top;
      this.initialCanvasData = assign({}, canvasData);
    },
    limitCanvas: function limitCanvas(sizeLimited, positionLimited) {
      var options = this.options,
        containerData = this.containerData,
        canvasData = this.canvasData,
        cropBoxData = this.cropBoxData;
      var viewMode = options.viewMode;
      var aspectRatio = canvasData.aspectRatio;
      var cropped = this.cropped && cropBoxData;
      if (sizeLimited) {
        var minCanvasWidth = Number(options.minCanvasWidth) || 0;
        var minCanvasHeight = Number(options.minCanvasHeight) || 0;
        if (viewMode > 1) {
          minCanvasWidth = Math.max(minCanvasWidth, containerData.width);
          minCanvasHeight = Math.max(minCanvasHeight, containerData.height);
          if (viewMode === 3) {
            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          }
        } else if (viewMode > 0) {
          if (minCanvasWidth) {
            minCanvasWidth = Math.max(minCanvasWidth, cropped ? cropBoxData.width : 0);
          } else if (minCanvasHeight) {
            minCanvasHeight = Math.max(minCanvasHeight, cropped ? cropBoxData.height : 0);
          } else if (cropped) {
            minCanvasWidth = cropBoxData.width;
            minCanvasHeight = cropBoxData.height;
            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          }
        }
        var _getAdjustedSizes = getAdjustedSizes({
          aspectRatio: aspectRatio,
          width: minCanvasWidth,
          height: minCanvasHeight
        });
        minCanvasWidth = _getAdjustedSizes.width;
        minCanvasHeight = _getAdjustedSizes.height;
        canvasData.minWidth = minCanvasWidth;
        canvasData.minHeight = minCanvasHeight;
        canvasData.maxWidth = Infinity;
        canvasData.maxHeight = Infinity;
      }
      if (positionLimited) {
        if (viewMode > (cropped ? 0 : 1)) {
          var newCanvasLeft = containerData.width - canvasData.width;
          var newCanvasTop = containerData.height - canvasData.height;
          canvasData.minLeft = Math.min(0, newCanvasLeft);
          canvasData.minTop = Math.min(0, newCanvasTop);
          canvasData.maxLeft = Math.max(0, newCanvasLeft);
          canvasData.maxTop = Math.max(0, newCanvasTop);
          if (cropped && this.limited) {
            canvasData.minLeft = Math.min(cropBoxData.left, cropBoxData.left + (cropBoxData.width - canvasData.width));
            canvasData.minTop = Math.min(cropBoxData.top, cropBoxData.top + (cropBoxData.height - canvasData.height));
            canvasData.maxLeft = cropBoxData.left;
            canvasData.maxTop = cropBoxData.top;
            if (viewMode === 2) {
              if (canvasData.width >= containerData.width) {
                canvasData.minLeft = Math.min(0, newCanvasLeft);
                canvasData.maxLeft = Math.max(0, newCanvasLeft);
              }
              if (canvasData.height >= containerData.height) {
                canvasData.minTop = Math.min(0, newCanvasTop);
                canvasData.maxTop = Math.max(0, newCanvasTop);
              }
            }
          }
        } else {
          canvasData.minLeft = -canvasData.width;
          canvasData.minTop = -canvasData.height;
          canvasData.maxLeft = containerData.width;
          canvasData.maxTop = containerData.height;
        }
      }
    },
    renderCanvas: function renderCanvas(changed, transformed) {
      var canvasData = this.canvasData,
        imageData = this.imageData;
      if (transformed) {
        var _getRotatedSizes = getRotatedSizes({
            width: imageData.naturalWidth * Math.abs(imageData.scaleX || 1),
            height: imageData.naturalHeight * Math.abs(imageData.scaleY || 1),
            degree: imageData.rotate || 0
          }),
          naturalWidth = _getRotatedSizes.width,
          naturalHeight = _getRotatedSizes.height;
        var width = canvasData.width * (naturalWidth / canvasData.naturalWidth);
        var height = canvasData.height * (naturalHeight / canvasData.naturalHeight);
        canvasData.left -= (width - canvasData.width) / 2;
        canvasData.top -= (height - canvasData.height) / 2;
        canvasData.width = width;
        canvasData.height = height;
        canvasData.aspectRatio = naturalWidth / naturalHeight;
        canvasData.naturalWidth = naturalWidth;
        canvasData.naturalHeight = naturalHeight;
        this.limitCanvas(true, false);
      }
      if (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) {
        canvasData.left = canvasData.oldLeft;
      }
      if (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) {
        canvasData.top = canvasData.oldTop;
      }
      canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
      canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
      this.limitCanvas(false, true);
      canvasData.left = Math.min(Math.max(canvasData.left, canvasData.minLeft), canvasData.maxLeft);
      canvasData.top = Math.min(Math.max(canvasData.top, canvasData.minTop), canvasData.maxTop);
      canvasData.oldLeft = canvasData.left;
      canvasData.oldTop = canvasData.top;
      setStyle(this.canvas, assign({
        width: canvasData.width,
        height: canvasData.height
      }, getTransforms({
        translateX: canvasData.left,
        translateY: canvasData.top
      })));
      this.renderImage(changed);
      if (this.cropped && this.limited) {
        this.limitCropBox(true, true);
      }
    },
    renderImage: function renderImage(changed) {
      var canvasData = this.canvasData,
        imageData = this.imageData;
      var width = imageData.naturalWidth * (canvasData.width / canvasData.naturalWidth);
      var height = imageData.naturalHeight * (canvasData.height / canvasData.naturalHeight);
      assign(imageData, {
        width: width,
        height: height,
        left: (canvasData.width - width) / 2,
        top: (canvasData.height - height) / 2
      });
      setStyle(this.image, assign({
        width: imageData.width,
        height: imageData.height
      }, getTransforms(assign({
        translateX: imageData.left,
        translateY: imageData.top
      }, imageData))));
      if (changed) {
        this.output();
      }
    },
    initCropBox: function initCropBox() {
      var options = this.options,
        canvasData = this.canvasData;
      var aspectRatio = options.aspectRatio || options.initialAspectRatio;
      var autoCropArea = Number(options.autoCropArea) || 0.8;
      var cropBoxData = {
        width: canvasData.width,
        height: canvasData.height
      };
      if (aspectRatio) {
        if (canvasData.height * aspectRatio > canvasData.width) {
          cropBoxData.height = cropBoxData.width / aspectRatio;
        } else {
          cropBoxData.width = cropBoxData.height * aspectRatio;
        }
      }
      this.cropBoxData = cropBoxData;
      this.limitCropBox(true, true);

      // Initialize auto crop area
      cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
      cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);

      // The width/height of auto crop area must large than "minWidth/Height"
      cropBoxData.width = Math.max(cropBoxData.minWidth, cropBoxData.width * autoCropArea);
      cropBoxData.height = Math.max(cropBoxData.minHeight, cropBoxData.height * autoCropArea);
      cropBoxData.left = canvasData.left + (canvasData.width - cropBoxData.width) / 2;
      cropBoxData.top = canvasData.top + (canvasData.height - cropBoxData.height) / 2;
      cropBoxData.oldLeft = cropBoxData.left;
      cropBoxData.oldTop = cropBoxData.top;
      this.initialCropBoxData = assign({}, cropBoxData);
    },
    limitCropBox: function limitCropBox(sizeLimited, positionLimited) {
      var options = this.options,
        containerData = this.containerData,
        canvasData = this.canvasData,
        cropBoxData = this.cropBoxData,
        limited = this.limited;
      var aspectRatio = options.aspectRatio;
      if (sizeLimited) {
        var minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
        var minCropBoxHeight = Number(options.minCropBoxHeight) || 0;
        var maxCropBoxWidth = limited ? Math.min(containerData.width, canvasData.width, canvasData.width + canvasData.left, containerData.width - canvasData.left) : containerData.width;
        var maxCropBoxHeight = limited ? Math.min(containerData.height, canvasData.height, canvasData.height + canvasData.top, containerData.height - canvasData.top) : containerData.height;

        // The min/maxCropBoxWidth/Height must be less than container's width/height
        minCropBoxWidth = Math.min(minCropBoxWidth, containerData.width);
        minCropBoxHeight = Math.min(minCropBoxHeight, containerData.height);
        if (aspectRatio) {
          if (minCropBoxWidth && minCropBoxHeight) {
            if (minCropBoxHeight * aspectRatio > minCropBoxWidth) {
              minCropBoxHeight = minCropBoxWidth / aspectRatio;
            } else {
              minCropBoxWidth = minCropBoxHeight * aspectRatio;
            }
          } else if (minCropBoxWidth) {
            minCropBoxHeight = minCropBoxWidth / aspectRatio;
          } else if (minCropBoxHeight) {
            minCropBoxWidth = minCropBoxHeight * aspectRatio;
          }
          if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
            maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
          } else {
            maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
          }
        }

        // The minWidth/Height must be less than maxWidth/Height
        cropBoxData.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth);
        cropBoxData.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight);
        cropBoxData.maxWidth = maxCropBoxWidth;
        cropBoxData.maxHeight = maxCropBoxHeight;
      }
      if (positionLimited) {
        if (limited) {
          cropBoxData.minLeft = Math.max(0, canvasData.left);
          cropBoxData.minTop = Math.max(0, canvasData.top);
          cropBoxData.maxLeft = Math.min(containerData.width, canvasData.left + canvasData.width) - cropBoxData.width;
          cropBoxData.maxTop = Math.min(containerData.height, canvasData.top + canvasData.height) - cropBoxData.height;
        } else {
          cropBoxData.minLeft = 0;
          cropBoxData.minTop = 0;
          cropBoxData.maxLeft = containerData.width - cropBoxData.width;
          cropBoxData.maxTop = containerData.height - cropBoxData.height;
        }
      }
    },
    renderCropBox: function renderCropBox() {
      var options = this.options,
        containerData = this.containerData,
        cropBoxData = this.cropBoxData;
      if (cropBoxData.width > cropBoxData.maxWidth || cropBoxData.width < cropBoxData.minWidth) {
        cropBoxData.left = cropBoxData.oldLeft;
      }
      if (cropBoxData.height > cropBoxData.maxHeight || cropBoxData.height < cropBoxData.minHeight) {
        cropBoxData.top = cropBoxData.oldTop;
      }
      cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
      cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);
      this.limitCropBox(false, true);
      cropBoxData.left = Math.min(Math.max(cropBoxData.left, cropBoxData.minLeft), cropBoxData.maxLeft);
      cropBoxData.top = Math.min(Math.max(cropBoxData.top, cropBoxData.minTop), cropBoxData.maxTop);
      cropBoxData.oldLeft = cropBoxData.left;
      cropBoxData.oldTop = cropBoxData.top;
      if (options.movable && options.cropBoxMovable) {
        // Turn to move the canvas when the crop box is equal to the container
        setData(this.face, DATA_ACTION, cropBoxData.width >= containerData.width && cropBoxData.height >= containerData.height ? ACTION_MOVE : ACTION_ALL);
      }
      setStyle(this.cropBox, assign({
        width: cropBoxData.width,
        height: cropBoxData.height
      }, getTransforms({
        translateX: cropBoxData.left,
        translateY: cropBoxData.top
      })));
      if (this.cropped && this.limited) {
        this.limitCanvas(true, true);
      }
      if (!this.disabled) {
        this.output();
      }
    },
    output: function output() {
      this.preview();
      dispatchEvent(this.element, EVENT_CROP, this.getData());
    }
  };

  var preview = {
    initPreview: function initPreview() {
      var element = this.element,
        crossOrigin = this.crossOrigin;
      var preview = this.options.preview;
      var url = crossOrigin ? this.crossOriginUrl : this.url;
      var alt = element.alt || 'The image to preview';
      var image = document.createElement('img');
      if (crossOrigin) {
        image.crossOrigin = crossOrigin;
      }
      image.src = url;
      image.alt = alt;
      this.viewBox.appendChild(image);
      this.viewBoxImage = image;
      if (!preview) {
        return;
      }
      var previews = preview;
      if (typeof preview === 'string') {
        previews = element.ownerDocument.querySelectorAll(preview);
      } else if (preview.querySelector) {
        previews = [preview];
      }
      this.previews = previews;
      forEach(previews, function (el) {
        var img = document.createElement('img');

        // Save the original size for recover
        setData(el, DATA_PREVIEW, {
          width: el.offsetWidth,
          height: el.offsetHeight,
          html: el.innerHTML
        });
        if (crossOrigin) {
          img.crossOrigin = crossOrigin;
        }
        img.src = url;
        img.alt = alt;

        /**
         * Override img element styles
         * Add `display:block` to avoid margin top issue
         * Add `height:auto` to override `height` attribute on IE8
         * (Occur only when margin-top <= -height)
         */
        img.style.cssText = 'display:block;' + 'width:100%;' + 'height:auto;' + 'min-width:0!important;' + 'min-height:0!important;' + 'max-width:none!important;' + 'max-height:none!important;' + 'image-orientation:0deg!important;"';
        el.innerHTML = '';
        el.appendChild(img);
      });
    },
    resetPreview: function resetPreview() {
      forEach(this.previews, function (element) {
        var data = getData(element, DATA_PREVIEW);
        setStyle(element, {
          width: data.width,
          height: data.height
        });
        element.innerHTML = data.html;
        removeData(element, DATA_PREVIEW);
      });
    },
    preview: function preview() {
      var imageData = this.imageData,
        canvasData = this.canvasData,
        cropBoxData = this.cropBoxData;
      var cropBoxWidth = cropBoxData.width,
        cropBoxHeight = cropBoxData.height;
      var width = imageData.width,
        height = imageData.height;
      var left = cropBoxData.left - canvasData.left - imageData.left;
      var top = cropBoxData.top - canvasData.top - imageData.top;
      if (!this.cropped || this.disabled) {
        return;
      }
      setStyle(this.viewBoxImage, assign({
        width: width,
        height: height
      }, getTransforms(assign({
        translateX: -left,
        translateY: -top
      }, imageData))));
      forEach(this.previews, function (element) {
        var data = getData(element, DATA_PREVIEW);
        var originalWidth = data.width;
        var originalHeight = data.height;
        var newWidth = originalWidth;
        var newHeight = originalHeight;
        var ratio = 1;
        if (cropBoxWidth) {
          ratio = originalWidth / cropBoxWidth;
          newHeight = cropBoxHeight * ratio;
        }
        if (cropBoxHeight && newHeight > originalHeight) {
          ratio = originalHeight / cropBoxHeight;
          newWidth = cropBoxWidth * ratio;
          newHeight = originalHeight;
        }
        setStyle(element, {
          width: newWidth,
          height: newHeight
        });
        setStyle(element.getElementsByTagName('img')[0], assign({
          width: width * ratio,
          height: height * ratio
        }, getTransforms(assign({
          translateX: -left * ratio,
          translateY: -top * ratio
        }, imageData))));
      });
    }
  };

  var events = {
    bind: function bind() {
      var element = this.element,
        options = this.options,
        cropper = this.cropper;
      if (isFunction(options.cropstart)) {
        addListener(element, EVENT_CROP_START, options.cropstart);
      }
      if (isFunction(options.cropmove)) {
        addListener(element, EVENT_CROP_MOVE, options.cropmove);
      }
      if (isFunction(options.cropend)) {
        addListener(element, EVENT_CROP_END, options.cropend);
      }
      if (isFunction(options.crop)) {
        addListener(element, EVENT_CROP, options.crop);
      }
      if (isFunction(options.zoom)) {
        addListener(element, EVENT_ZOOM, options.zoom);
      }
      addListener(cropper, EVENT_POINTER_DOWN, this.onCropStart = this.cropStart.bind(this));
      if (options.zoomable && options.zoomOnWheel) {
        addListener(cropper, EVENT_WHEEL, this.onWheel = this.wheel.bind(this), {
          passive: false,
          capture: true
        });
      }
      if (options.toggleDragModeOnDblclick) {
        addListener(cropper, EVENT_DBLCLICK, this.onDblclick = this.dblclick.bind(this));
      }
      addListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove = this.cropMove.bind(this));
      addListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd = this.cropEnd.bind(this));
      if (options.responsive) {
        addListener(window, EVENT_RESIZE, this.onResize = this.resize.bind(this));
      }
    },
    unbind: function unbind() {
      var element = this.element,
        options = this.options,
        cropper = this.cropper;
      if (isFunction(options.cropstart)) {
        removeListener(element, EVENT_CROP_START, options.cropstart);
      }
      if (isFunction(options.cropmove)) {
        removeListener(element, EVENT_CROP_MOVE, options.cropmove);
      }
      if (isFunction(options.cropend)) {
        removeListener(element, EVENT_CROP_END, options.cropend);
      }
      if (isFunction(options.crop)) {
        removeListener(element, EVENT_CROP, options.crop);
      }
      if (isFunction(options.zoom)) {
        removeListener(element, EVENT_ZOOM, options.zoom);
      }
      removeListener(cropper, EVENT_POINTER_DOWN, this.onCropStart);
      if (options.zoomable && options.zoomOnWheel) {
        removeListener(cropper, EVENT_WHEEL, this.onWheel, {
          passive: false,
          capture: true
        });
      }
      if (options.toggleDragModeOnDblclick) {
        removeListener(cropper, EVENT_DBLCLICK, this.onDblclick);
      }
      removeListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove);
      removeListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd);
      if (options.responsive) {
        removeListener(window, EVENT_RESIZE, this.onResize);
      }
    }
  };

  var handlers = {
    resize: function resize() {
      if (this.disabled) {
        return;
      }
      var options = this.options,
        container = this.container,
        containerData = this.containerData;
      var ratioX = container.offsetWidth / containerData.width;
      var ratioY = container.offsetHeight / containerData.height;
      var ratio = Math.abs(ratioX - 1) > Math.abs(ratioY - 1) ? ratioX : ratioY;

      // Resize when width changed or height changed
      if (ratio !== 1) {
        var canvasData;
        var cropBoxData;
        if (options.restore) {
          canvasData = this.getCanvasData();
          cropBoxData = this.getCropBoxData();
        }
        this.render();
        if (options.restore) {
          this.setCanvasData(forEach(canvasData, function (n, i) {
            canvasData[i] = n * ratio;
          }));
          this.setCropBoxData(forEach(cropBoxData, function (n, i) {
            cropBoxData[i] = n * ratio;
          }));
        }
      }
    },
    dblclick: function dblclick() {
      if (this.disabled || this.options.dragMode === DRAG_MODE_NONE) {
        return;
      }
      this.setDragMode(hasClass(this.dragBox, CLASS_CROP) ? DRAG_MODE_MOVE : DRAG_MODE_CROP);
    },
    wheel: function wheel(event) {
      var _this = this;
      var ratio = Number(this.options.wheelZoomRatio) || 0.1;
      var delta = 1;
      if (this.disabled) {
        return;
      }
      event.preventDefault();

      // Limit wheel speed to prevent zoom too fast (#21)
      if (this.wheeling) {
        return;
      }
      this.wheeling = true;
      setTimeout(function () {
        _this.wheeling = false;
      }, 50);
      if (event.deltaY) {
        delta = event.deltaY > 0 ? 1 : -1;
      } else if (event.wheelDelta) {
        delta = -event.wheelDelta / 120;
      } else if (event.detail) {
        delta = event.detail > 0 ? 1 : -1;
      }
      this.zoom(-delta * ratio, event);
    },
    cropStart: function cropStart(event) {
      var buttons = event.buttons,
        button = event.button;
      if (this.disabled

      // Handle mouse event and pointer event and ignore touch event
      || (event.type === 'mousedown' || event.type === 'pointerdown' && event.pointerType === 'mouse') && (
      // No primary button (Usually the left button)
      isNumber(buttons) && buttons !== 1 || isNumber(button) && button !== 0

      // Open context menu
      || event.ctrlKey)) {
        return;
      }
      var options = this.options,
        pointers = this.pointers;
      var action;
      if (event.changedTouches) {
        // Handle touch event
        forEach(event.changedTouches, function (touch) {
          pointers[touch.identifier] = getPointer(touch);
        });
      } else {
        // Handle mouse event and pointer event
        pointers[event.pointerId || 0] = getPointer(event);
      }
      if (Object.keys(pointers).length > 1 && options.zoomable && options.zoomOnTouch) {
        action = ACTION_ZOOM;
      } else {
        action = getData(event.target, DATA_ACTION);
      }
      if (!REGEXP_ACTIONS.test(action)) {
        return;
      }
      if (dispatchEvent(this.element, EVENT_CROP_START, {
        originalEvent: event,
        action: action
      }) === false) {
        return;
      }

      // This line is required for preventing page zooming in iOS browsers
      event.preventDefault();
      this.action = action;
      this.cropping = false;
      if (action === ACTION_CROP) {
        this.cropping = true;
        addClass(this.dragBox, CLASS_MODAL);
      }
    },
    cropMove: function cropMove(event) {
      var action = this.action;
      if (this.disabled || !action) {
        return;
      }
      var pointers = this.pointers;
      event.preventDefault();
      if (dispatchEvent(this.element, EVENT_CROP_MOVE, {
        originalEvent: event,
        action: action
      }) === false) {
        return;
      }
      if (event.changedTouches) {
        forEach(event.changedTouches, function (touch) {
          // The first parameter should not be undefined (#432)
          assign(pointers[touch.identifier] || {}, getPointer(touch, true));
        });
      } else {
        assign(pointers[event.pointerId || 0] || {}, getPointer(event, true));
      }
      this.change(event);
    },
    cropEnd: function cropEnd(event) {
      if (this.disabled) {
        return;
      }
      var action = this.action,
        pointers = this.pointers;
      if (event.changedTouches) {
        forEach(event.changedTouches, function (touch) {
          delete pointers[touch.identifier];
        });
      } else {
        delete pointers[event.pointerId || 0];
      }
      if (!action) {
        return;
      }
      event.preventDefault();
      if (!Object.keys(pointers).length) {
        this.action = '';
      }
      if (this.cropping) {
        this.cropping = false;
        toggleClass(this.dragBox, CLASS_MODAL, this.cropped && this.options.modal);
      }
      dispatchEvent(this.element, EVENT_CROP_END, {
        originalEvent: event,
        action: action
      });
    }
  };

  var change = {
    change: function change(event) {
      var options = this.options,
        canvasData = this.canvasData,
        containerData = this.containerData,
        cropBoxData = this.cropBoxData,
        pointers = this.pointers;
      var action = this.action;
      var aspectRatio = options.aspectRatio;
      var left = cropBoxData.left,
        top = cropBoxData.top,
        width = cropBoxData.width,
        height = cropBoxData.height;
      var right = left + width;
      var bottom = top + height;
      var minLeft = 0;
      var minTop = 0;
      var maxWidth = containerData.width;
      var maxHeight = containerData.height;
      var renderable = true;
      var offset;

      // Locking aspect ratio in "free mode" by holding shift key
      if (!aspectRatio && event.shiftKey) {
        aspectRatio = width && height ? width / height : 1;
      }
      if (this.limited) {
        minLeft = cropBoxData.minLeft;
        minTop = cropBoxData.minTop;
        maxWidth = minLeft + Math.min(containerData.width, canvasData.width, canvasData.left + canvasData.width);
        maxHeight = minTop + Math.min(containerData.height, canvasData.height, canvasData.top + canvasData.height);
      }
      var pointer = pointers[Object.keys(pointers)[0]];
      var range = {
        x: pointer.endX - pointer.startX,
        y: pointer.endY - pointer.startY
      };
      var check = function check(side) {
        switch (side) {
          case ACTION_EAST:
            if (right + range.x > maxWidth) {
              range.x = maxWidth - right;
            }
            break;
          case ACTION_WEST:
            if (left + range.x < minLeft) {
              range.x = minLeft - left;
            }
            break;
          case ACTION_NORTH:
            if (top + range.y < minTop) {
              range.y = minTop - top;
            }
            break;
          case ACTION_SOUTH:
            if (bottom + range.y > maxHeight) {
              range.y = maxHeight - bottom;
            }
            break;
        }
      };
      switch (action) {
        // Move crop box
        case ACTION_ALL:
          left += range.x;
          top += range.y;
          break;

        // Resize crop box
        case ACTION_EAST:
          if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
            renderable = false;
            break;
          }
          check(ACTION_EAST);
          width += range.x;
          if (width < 0) {
            action = ACTION_WEST;
            width = -width;
            left -= width;
          }
          if (aspectRatio) {
            height = width / aspectRatio;
            top += (cropBoxData.height - height) / 2;
          }
          break;
        case ACTION_NORTH:
          if (range.y <= 0 && (top <= minTop || aspectRatio && (left <= minLeft || right >= maxWidth))) {
            renderable = false;
            break;
          }
          check(ACTION_NORTH);
          height -= range.y;
          top += range.y;
          if (height < 0) {
            action = ACTION_SOUTH;
            height = -height;
            top -= height;
          }
          if (aspectRatio) {
            width = height * aspectRatio;
            left += (cropBoxData.width - width) / 2;
          }
          break;
        case ACTION_WEST:
          if (range.x <= 0 && (left <= minLeft || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
            renderable = false;
            break;
          }
          check(ACTION_WEST);
          width -= range.x;
          left += range.x;
          if (width < 0) {
            action = ACTION_EAST;
            width = -width;
            left -= width;
          }
          if (aspectRatio) {
            height = width / aspectRatio;
            top += (cropBoxData.height - height) / 2;
          }
          break;
        case ACTION_SOUTH:
          if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= minLeft || right >= maxWidth))) {
            renderable = false;
            break;
          }
          check(ACTION_SOUTH);
          height += range.y;
          if (height < 0) {
            action = ACTION_NORTH;
            height = -height;
            top -= height;
          }
          if (aspectRatio) {
            width = height * aspectRatio;
            left += (cropBoxData.width - width) / 2;
          }
          break;
        case ACTION_NORTH_EAST:
          if (aspectRatio) {
            if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
              renderable = false;
              break;
            }
            check(ACTION_NORTH);
            height -= range.y;
            top += range.y;
            width = height * aspectRatio;
          } else {
            check(ACTION_NORTH);
            check(ACTION_EAST);
            if (range.x >= 0) {
              if (right < maxWidth) {
                width += range.x;
              } else if (range.y <= 0 && top <= minTop) {
                renderable = false;
              }
            } else {
              width += range.x;
            }
            if (range.y <= 0) {
              if (top > minTop) {
                height -= range.y;
                top += range.y;
              }
            } else {
              height -= range.y;
              top += range.y;
            }
          }
          if (width < 0 && height < 0) {
            action = ACTION_SOUTH_WEST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_NORTH_WEST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_SOUTH_EAST;
            height = -height;
            top -= height;
          }
          break;
        case ACTION_NORTH_WEST:
          if (aspectRatio) {
            if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
              renderable = false;
              break;
            }
            check(ACTION_NORTH);
            height -= range.y;
            top += range.y;
            width = height * aspectRatio;
            left += cropBoxData.width - width;
          } else {
            check(ACTION_NORTH);
            check(ACTION_WEST);
            if (range.x <= 0) {
              if (left > minLeft) {
                width -= range.x;
                left += range.x;
              } else if (range.y <= 0 && top <= minTop) {
                renderable = false;
              }
            } else {
              width -= range.x;
              left += range.x;
            }
            if (range.y <= 0) {
              if (top > minTop) {
                height -= range.y;
                top += range.y;
              }
            } else {
              height -= range.y;
              top += range.y;
            }
          }
          if (width < 0 && height < 0) {
            action = ACTION_SOUTH_EAST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_NORTH_EAST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_SOUTH_WEST;
            height = -height;
            top -= height;
          }
          break;
        case ACTION_SOUTH_WEST:
          if (aspectRatio) {
            if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
              renderable = false;
              break;
            }
            check(ACTION_WEST);
            width -= range.x;
            left += range.x;
            height = width / aspectRatio;
          } else {
            check(ACTION_SOUTH);
            check(ACTION_WEST);
            if (range.x <= 0) {
              if (left > minLeft) {
                width -= range.x;
                left += range.x;
              } else if (range.y >= 0 && bottom >= maxHeight) {
                renderable = false;
              }
            } else {
              width -= range.x;
              left += range.x;
            }
            if (range.y >= 0) {
              if (bottom < maxHeight) {
                height += range.y;
              }
            } else {
              height += range.y;
            }
          }
          if (width < 0 && height < 0) {
            action = ACTION_NORTH_EAST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_SOUTH_EAST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_NORTH_WEST;
            height = -height;
            top -= height;
          }
          break;
        case ACTION_SOUTH_EAST:
          if (aspectRatio) {
            if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
              renderable = false;
              break;
            }
            check(ACTION_EAST);
            width += range.x;
            height = width / aspectRatio;
          } else {
            check(ACTION_SOUTH);
            check(ACTION_EAST);
            if (range.x >= 0) {
              if (right < maxWidth) {
                width += range.x;
              } else if (range.y >= 0 && bottom >= maxHeight) {
                renderable = false;
              }
            } else {
              width += range.x;
            }
            if (range.y >= 0) {
              if (bottom < maxHeight) {
                height += range.y;
              }
            } else {
              height += range.y;
            }
          }
          if (width < 0 && height < 0) {
            action = ACTION_NORTH_WEST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_SOUTH_WEST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_NORTH_EAST;
            height = -height;
            top -= height;
          }
          break;

        // Move canvas
        case ACTION_MOVE:
          this.move(range.x, range.y);
          renderable = false;
          break;

        // Zoom canvas
        case ACTION_ZOOM:
          this.zoom(getMaxZoomRatio(pointers), event);
          renderable = false;
          break;

        // Create crop box
        case ACTION_CROP:
          if (!range.x || !range.y) {
            renderable = false;
            break;
          }
          offset = getOffset(this.cropper);
          left = pointer.startX - offset.left;
          top = pointer.startY - offset.top;
          width = cropBoxData.minWidth;
          height = cropBoxData.minHeight;
          if (range.x > 0) {
            action = range.y > 0 ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST;
          } else if (range.x < 0) {
            left -= width;
            action = range.y > 0 ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST;
          }
          if (range.y < 0) {
            top -= height;
          }

          // Show the crop box if is hidden
          if (!this.cropped) {
            removeClass(this.cropBox, CLASS_HIDDEN);
            this.cropped = true;
            if (this.limited) {
              this.limitCropBox(true, true);
            }
          }
          break;
      }
      if (renderable) {
        cropBoxData.width = width;
        cropBoxData.height = height;
        cropBoxData.left = left;
        cropBoxData.top = top;
        this.action = action;
        this.renderCropBox();
      }

      // Override
      forEach(pointers, function (p) {
        p.startX = p.endX;
        p.startY = p.endY;
      });
    }
  };

  var methods = {
    // Show the crop box manually
    crop: function crop() {
      if (this.ready && !this.cropped && !this.disabled) {
        this.cropped = true;
        this.limitCropBox(true, true);
        if (this.options.modal) {
          addClass(this.dragBox, CLASS_MODAL);
        }
        removeClass(this.cropBox, CLASS_HIDDEN);
        this.setCropBoxData(this.initialCropBoxData);
      }
      return this;
    },
    // Reset the image and crop box to their initial states
    reset: function reset() {
      if (this.ready && !this.disabled) {
        this.imageData = assign({}, this.initialImageData);
        this.canvasData = assign({}, this.initialCanvasData);
        this.cropBoxData = assign({}, this.initialCropBoxData);
        this.renderCanvas();
        if (this.cropped) {
          this.renderCropBox();
        }
      }
      return this;
    },
    // Clear the crop box
    clear: function clear() {
      if (this.cropped && !this.disabled) {
        assign(this.cropBoxData, {
          left: 0,
          top: 0,
          width: 0,
          height: 0
        });
        this.cropped = false;
        this.renderCropBox();
        this.limitCanvas(true, true);

        // Render canvas after crop box rendered
        this.renderCanvas();
        removeClass(this.dragBox, CLASS_MODAL);
        addClass(this.cropBox, CLASS_HIDDEN);
      }
      return this;
    },
    /**
     * Replace the image's src and rebuild the cropper
     * @param {string} url - The new URL.
     * @param {boolean} [hasSameSize] - Indicate if the new image has the same size as the old one.
     * @returns {Cropper} this
     */
    replace: function replace(url) {
      var hasSameSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!this.disabled && url) {
        if (this.isImg) {
          this.element.src = url;
        }
        if (hasSameSize) {
          this.url = url;
          this.image.src = url;
          if (this.ready) {
            this.viewBoxImage.src = url;
            forEach(this.previews, function (element) {
              element.getElementsByTagName('img')[0].src = url;
            });
          }
        } else {
          if (this.isImg) {
            this.replaced = true;
          }
          this.options.data = null;
          this.uncreate();
          this.load(url);
        }
      }
      return this;
    },
    // Enable (unfreeze) the cropper
    enable: function enable() {
      if (this.ready && this.disabled) {
        this.disabled = false;
        removeClass(this.cropper, CLASS_DISABLED);
      }
      return this;
    },
    // Disable (freeze) the cropper
    disable: function disable() {
      if (this.ready && !this.disabled) {
        this.disabled = true;
        addClass(this.cropper, CLASS_DISABLED);
      }
      return this;
    },
    /**
     * Destroy the cropper and remove the instance from the image
     * @returns {Cropper} this
     */
    destroy: function destroy() {
      var element = this.element;
      if (!element[NAMESPACE]) {
        return this;
      }
      element[NAMESPACE] = undefined;
      if (this.isImg && this.replaced) {
        element.src = this.originalUrl;
      }
      this.uncreate();
      return this;
    },
    /**
     * Move the canvas with relative offsets
     * @param {number} offsetX - The relative offset distance on the x-axis.
     * @param {number} [offsetY=offsetX] - The relative offset distance on the y-axis.
     * @returns {Cropper} this
     */
    move: function move(offsetX) {
      var offsetY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : offsetX;
      var _this$canvasData = this.canvasData,
        left = _this$canvasData.left,
        top = _this$canvasData.top;
      return this.moveTo(isUndefined(offsetX) ? offsetX : left + Number(offsetX), isUndefined(offsetY) ? offsetY : top + Number(offsetY));
    },
    /**
     * Move the canvas to an absolute point
     * @param {number} x - The x-axis coordinate.
     * @param {number} [y=x] - The y-axis coordinate.
     * @returns {Cropper} this
     */
    moveTo: function moveTo(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var canvasData = this.canvasData;
      var changed = false;
      x = Number(x);
      y = Number(y);
      if (this.ready && !this.disabled && this.options.movable) {
        if (isNumber(x)) {
          canvasData.left = x;
          changed = true;
        }
        if (isNumber(y)) {
          canvasData.top = y;
          changed = true;
        }
        if (changed) {
          this.renderCanvas(true);
        }
      }
      return this;
    },
    /**
     * Zoom the canvas with a relative ratio
     * @param {number} ratio - The target ratio.
     * @param {Event} _originalEvent - The original event if any.
     * @returns {Cropper} this
     */
    zoom: function zoom(ratio, _originalEvent) {
      var canvasData = this.canvasData;
      ratio = Number(ratio);
      if (ratio < 0) {
        ratio = 1 / (1 - ratio);
      } else {
        ratio = 1 + ratio;
      }
      return this.zoomTo(canvasData.width * ratio / canvasData.naturalWidth, null, _originalEvent);
    },
    /**
     * Zoom the canvas to an absolute ratio
     * @param {number} ratio - The target ratio.
     * @param {Object} pivot - The zoom pivot point coordinate.
     * @param {Event} _originalEvent - The original event if any.
     * @returns {Cropper} this
     */
    zoomTo: function zoomTo(ratio, pivot, _originalEvent) {
      var options = this.options,
        canvasData = this.canvasData;
      var width = canvasData.width,
        height = canvasData.height,
        naturalWidth = canvasData.naturalWidth,
        naturalHeight = canvasData.naturalHeight;
      ratio = Number(ratio);
      if (ratio >= 0 && this.ready && !this.disabled && options.zoomable) {
        var newWidth = naturalWidth * ratio;
        var newHeight = naturalHeight * ratio;
        if (dispatchEvent(this.element, EVENT_ZOOM, {
          ratio: ratio,
          oldRatio: width / naturalWidth,
          originalEvent: _originalEvent
        }) === false) {
          return this;
        }
        if (_originalEvent) {
          var pointers = this.pointers;
          var offset = getOffset(this.cropper);
          var center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
            pageX: _originalEvent.pageX,
            pageY: _originalEvent.pageY
          };

          // Zoom from the triggering point of the event
          canvasData.left -= (newWidth - width) * ((center.pageX - offset.left - canvasData.left) / width);
          canvasData.top -= (newHeight - height) * ((center.pageY - offset.top - canvasData.top) / height);
        } else if (isPlainObject(pivot) && isNumber(pivot.x) && isNumber(pivot.y)) {
          canvasData.left -= (newWidth - width) * ((pivot.x - canvasData.left) / width);
          canvasData.top -= (newHeight - height) * ((pivot.y - canvasData.top) / height);
        } else {
          // Zoom from the center of the canvas
          canvasData.left -= (newWidth - width) / 2;
          canvasData.top -= (newHeight - height) / 2;
        }
        canvasData.width = newWidth;
        canvasData.height = newHeight;
        this.renderCanvas(true);
      }
      return this;
    },
    /**
     * Rotate the canvas with a relative degree
     * @param {number} degree - The rotate degree.
     * @returns {Cropper} this
     */
    rotate: function rotate(degree) {
      return this.rotateTo((this.imageData.rotate || 0) + Number(degree));
    },
    /**
     * Rotate the canvas to an absolute degree
     * @param {number} degree - The rotate degree.
     * @returns {Cropper} this
     */
    rotateTo: function rotateTo(degree) {
      degree = Number(degree);
      if (isNumber(degree) && this.ready && !this.disabled && this.options.rotatable) {
        this.imageData.rotate = degree % 360;
        this.renderCanvas(true, true);
      }
      return this;
    },
    /**
     * Scale the image on the x-axis.
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @returns {Cropper} this
     */
    scaleX: function scaleX(_scaleX) {
      var scaleY = this.imageData.scaleY;
      return this.scale(_scaleX, isNumber(scaleY) ? scaleY : 1);
    },
    /**
     * Scale the image on the y-axis.
     * @param {number} scaleY - The scale ratio on the y-axis.
     * @returns {Cropper} this
     */
    scaleY: function scaleY(_scaleY) {
      var scaleX = this.imageData.scaleX;
      return this.scale(isNumber(scaleX) ? scaleX : 1, _scaleY);
    },
    /**
     * Scale the image
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
     * @returns {Cropper} this
     */
    scale: function scale(scaleX) {
      var scaleY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : scaleX;
      var imageData = this.imageData;
      var transformed = false;
      scaleX = Number(scaleX);
      scaleY = Number(scaleY);
      if (this.ready && !this.disabled && this.options.scalable) {
        if (isNumber(scaleX)) {
          imageData.scaleX = scaleX;
          transformed = true;
        }
        if (isNumber(scaleY)) {
          imageData.scaleY = scaleY;
          transformed = true;
        }
        if (transformed) {
          this.renderCanvas(true, true);
        }
      }
      return this;
    },
    /**
     * Get the cropped area position and size data (base on the original image)
     * @param {boolean} [rounded=false] - Indicate if round the data values or not.
     * @returns {Object} The result cropped data.
     */
    getData: function getData() {
      var rounded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var options = this.options,
        imageData = this.imageData,
        canvasData = this.canvasData,
        cropBoxData = this.cropBoxData;
      var data;
      if (this.ready && this.cropped) {
        data = {
          x: cropBoxData.left - canvasData.left,
          y: cropBoxData.top - canvasData.top,
          width: cropBoxData.width,
          height: cropBoxData.height
        };
        var ratio = imageData.width / imageData.naturalWidth;
        forEach(data, function (n, i) {
          data[i] = n / ratio;
        });
        if (rounded) {
          // In case rounding off leads to extra 1px in right or bottom border
          // we should round the top-left corner and the dimension (#343).
          var bottom = Math.round(data.y + data.height);
          var right = Math.round(data.x + data.width);
          data.x = Math.round(data.x);
          data.y = Math.round(data.y);
          data.width = right - data.x;
          data.height = bottom - data.y;
        }
      } else {
        data = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }
      if (options.rotatable) {
        data.rotate = imageData.rotate || 0;
      }
      if (options.scalable) {
        data.scaleX = imageData.scaleX || 1;
        data.scaleY = imageData.scaleY || 1;
      }
      return data;
    },
    /**
     * Set the cropped area position and size with new data
     * @param {Object} data - The new data.
     * @returns {Cropper} this
     */
    setData: function setData(data) {
      var options = this.options,
        imageData = this.imageData,
        canvasData = this.canvasData;
      var cropBoxData = {};
      if (this.ready && !this.disabled && isPlainObject(data)) {
        var transformed = false;
        if (options.rotatable) {
          if (isNumber(data.rotate) && data.rotate !== imageData.rotate) {
            imageData.rotate = data.rotate;
            transformed = true;
          }
        }
        if (options.scalable) {
          if (isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
            imageData.scaleX = data.scaleX;
            transformed = true;
          }
          if (isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
            imageData.scaleY = data.scaleY;
            transformed = true;
          }
        }
        if (transformed) {
          this.renderCanvas(true, true);
        }
        var ratio = imageData.width / imageData.naturalWidth;
        if (isNumber(data.x)) {
          cropBoxData.left = data.x * ratio + canvasData.left;
        }
        if (isNumber(data.y)) {
          cropBoxData.top = data.y * ratio + canvasData.top;
        }
        if (isNumber(data.width)) {
          cropBoxData.width = data.width * ratio;
        }
        if (isNumber(data.height)) {
          cropBoxData.height = data.height * ratio;
        }
        this.setCropBoxData(cropBoxData);
      }
      return this;
    },
    /**
     * Get the container size data.
     * @returns {Object} The result container data.
     */
    getContainerData: function getContainerData() {
      return this.ready ? assign({}, this.containerData) : {};
    },
    /**
     * Get the image position and size data.
     * @returns {Object} The result image data.
     */
    getImageData: function getImageData() {
      return this.sized ? assign({}, this.imageData) : {};
    },
    /**
     * Get the canvas position and size data.
     * @returns {Object} The result canvas data.
     */
    getCanvasData: function getCanvasData() {
      var canvasData = this.canvasData;
      var data = {};
      if (this.ready) {
        forEach(['left', 'top', 'width', 'height', 'naturalWidth', 'naturalHeight'], function (n) {
          data[n] = canvasData[n];
        });
      }
      return data;
    },
    /**
     * Set the canvas position and size with new data.
     * @param {Object} data - The new canvas data.
     * @returns {Cropper} this
     */
    setCanvasData: function setCanvasData(data) {
      var canvasData = this.canvasData;
      var aspectRatio = canvasData.aspectRatio;
      if (this.ready && !this.disabled && isPlainObject(data)) {
        if (isNumber(data.left)) {
          canvasData.left = data.left;
        }
        if (isNumber(data.top)) {
          canvasData.top = data.top;
        }
        if (isNumber(data.width)) {
          canvasData.width = data.width;
          canvasData.height = data.width / aspectRatio;
        } else if (isNumber(data.height)) {
          canvasData.height = data.height;
          canvasData.width = data.height * aspectRatio;
        }
        this.renderCanvas(true);
      }
      return this;
    },
    /**
     * Get the crop box position and size data.
     * @returns {Object} The result crop box data.
     */
    getCropBoxData: function getCropBoxData() {
      var cropBoxData = this.cropBoxData;
      var data;
      if (this.ready && this.cropped) {
        data = {
          left: cropBoxData.left,
          top: cropBoxData.top,
          width: cropBoxData.width,
          height: cropBoxData.height
        };
      }
      return data || {};
    },
    /**
     * Set the crop box position and size with new data.
     * @param {Object} data - The new crop box data.
     * @returns {Cropper} this
     */
    setCropBoxData: function setCropBoxData(data) {
      var cropBoxData = this.cropBoxData;
      var aspectRatio = this.options.aspectRatio;
      var widthChanged;
      var heightChanged;
      if (this.ready && this.cropped && !this.disabled && isPlainObject(data)) {
        if (isNumber(data.left)) {
          cropBoxData.left = data.left;
        }
        if (isNumber(data.top)) {
          cropBoxData.top = data.top;
        }
        if (isNumber(data.width) && data.width !== cropBoxData.width) {
          widthChanged = true;
          cropBoxData.width = data.width;
        }
        if (isNumber(data.height) && data.height !== cropBoxData.height) {
          heightChanged = true;
          cropBoxData.height = data.height;
        }
        if (aspectRatio) {
          if (widthChanged) {
            cropBoxData.height = cropBoxData.width / aspectRatio;
          } else if (heightChanged) {
            cropBoxData.width = cropBoxData.height * aspectRatio;
          }
        }
        this.renderCropBox();
      }
      return this;
    },
    /**
     * Get a canvas drawn the cropped image.
     * @param {Object} [options={}] - The config options.
     * @returns {HTMLCanvasElement} - The result canvas.
     */
    getCroppedCanvas: function getCroppedCanvas() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!this.ready || !window.HTMLCanvasElement) {
        return null;
      }
      var canvasData = this.canvasData;
      var source = getSourceCanvas(this.image, this.imageData, canvasData, options);

      // Returns the source canvas if it is not cropped.
      if (!this.cropped) {
        return source;
      }
      var _this$getData = this.getData(),
        initialX = _this$getData.x,
        initialY = _this$getData.y,
        initialWidth = _this$getData.width,
        initialHeight = _this$getData.height;
      var ratio = source.width / Math.floor(canvasData.naturalWidth);
      if (ratio !== 1) {
        initialX *= ratio;
        initialY *= ratio;
        initialWidth *= ratio;
        initialHeight *= ratio;
      }
      var aspectRatio = initialWidth / initialHeight;
      var maxSizes = getAdjustedSizes({
        aspectRatio: aspectRatio,
        width: options.maxWidth || Infinity,
        height: options.maxHeight || Infinity
      });
      var minSizes = getAdjustedSizes({
        aspectRatio: aspectRatio,
        width: options.minWidth || 0,
        height: options.minHeight || 0
      }, 'cover');
      var _getAdjustedSizes = getAdjustedSizes({
          aspectRatio: aspectRatio,
          width: options.width || (ratio !== 1 ? source.width : initialWidth),
          height: options.height || (ratio !== 1 ? source.height : initialHeight)
        }),
        width = _getAdjustedSizes.width,
        height = _getAdjustedSizes.height;
      width = Math.min(maxSizes.width, Math.max(minSizes.width, width));
      height = Math.min(maxSizes.height, Math.max(minSizes.height, height));
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.width = normalizeDecimalNumber(width);
      canvas.height = normalizeDecimalNumber(height);
      context.fillStyle = options.fillColor || 'transparent';
      context.fillRect(0, 0, width, height);
      var _options$imageSmoothi = options.imageSmoothingEnabled,
        imageSmoothingEnabled = _options$imageSmoothi === void 0 ? true : _options$imageSmoothi,
        imageSmoothingQuality = options.imageSmoothingQuality;
      context.imageSmoothingEnabled = imageSmoothingEnabled;
      if (imageSmoothingQuality) {
        context.imageSmoothingQuality = imageSmoothingQuality;
      }

      // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
      var sourceWidth = source.width;
      var sourceHeight = source.height;

      // Source canvas parameters
      var srcX = initialX;
      var srcY = initialY;
      var srcWidth;
      var srcHeight;

      // Destination canvas parameters
      var dstX;
      var dstY;
      var dstWidth;
      var dstHeight;
      if (srcX <= -initialWidth || srcX > sourceWidth) {
        srcX = 0;
        srcWidth = 0;
        dstX = 0;
        dstWidth = 0;
      } else if (srcX <= 0) {
        dstX = -srcX;
        srcX = 0;
        srcWidth = Math.min(sourceWidth, initialWidth + srcX);
        dstWidth = srcWidth;
      } else if (srcX <= sourceWidth) {
        dstX = 0;
        srcWidth = Math.min(initialWidth, sourceWidth - srcX);
        dstWidth = srcWidth;
      }
      if (srcWidth <= 0 || srcY <= -initialHeight || srcY > sourceHeight) {
        srcY = 0;
        srcHeight = 0;
        dstY = 0;
        dstHeight = 0;
      } else if (srcY <= 0) {
        dstY = -srcY;
        srcY = 0;
        srcHeight = Math.min(sourceHeight, initialHeight + srcY);
        dstHeight = srcHeight;
      } else if (srcY <= sourceHeight) {
        dstY = 0;
        srcHeight = Math.min(initialHeight, sourceHeight - srcY);
        dstHeight = srcHeight;
      }
      var params = [srcX, srcY, srcWidth, srcHeight];

      // Avoid "IndexSizeError"
      if (dstWidth > 0 && dstHeight > 0) {
        var scale = width / initialWidth;
        params.push(dstX * scale, dstY * scale, dstWidth * scale, dstHeight * scale);
      }

      // All the numerical parameters should be integer for `drawImage`
      // https://github.com/fengyuanchen/cropper/issues/476
      context.drawImage.apply(context, [source].concat(_toConsumableArray(params.map(function (param) {
        return Math.floor(normalizeDecimalNumber(param));
      }))));
      return canvas;
    },
    /**
     * Change the aspect ratio of the crop box.
     * @param {number} aspectRatio - The new aspect ratio.
     * @returns {Cropper} this
     */
    setAspectRatio: function setAspectRatio(aspectRatio) {
      var options = this.options;
      if (!this.disabled && !isUndefined(aspectRatio)) {
        // 0 -> NaN
        options.aspectRatio = Math.max(0, aspectRatio) || NaN;
        if (this.ready) {
          this.initCropBox();
          if (this.cropped) {
            this.renderCropBox();
          }
        }
      }
      return this;
    },
    /**
     * Change the drag mode.
     * @param {string} mode - The new drag mode.
     * @returns {Cropper} this
     */
    setDragMode: function setDragMode(mode) {
      var options = this.options,
        dragBox = this.dragBox,
        face = this.face;
      if (this.ready && !this.disabled) {
        var croppable = mode === DRAG_MODE_CROP;
        var movable = options.movable && mode === DRAG_MODE_MOVE;
        mode = croppable || movable ? mode : DRAG_MODE_NONE;
        options.dragMode = mode;
        setData(dragBox, DATA_ACTION, mode);
        toggleClass(dragBox, CLASS_CROP, croppable);
        toggleClass(dragBox, CLASS_MOVE, movable);
        if (!options.cropBoxMovable) {
          // Sync drag mode to crop box when it is not movable
          setData(face, DATA_ACTION, mode);
          toggleClass(face, CLASS_CROP, croppable);
          toggleClass(face, CLASS_MOVE, movable);
        }
      }
      return this;
    }
  };

  var AnotherCropper = WINDOW.Cropper;
  var Cropper = /*#__PURE__*/function () {
    /**
     * Create a new Cropper.
     * @param {Element} element - The target element for cropping.
     * @param {Object} [options={}] - The configuration options.
     */
    function Cropper(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, Cropper);
      if (!element || !REGEXP_TAG_NAME.test(element.tagName)) {
        throw new Error('The first argument is required and must be an <img> or <canvas> element.');
      }
      this.element = element;
      this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
      this.cropped = false;
      this.disabled = false;
      this.pointers = {};
      this.ready = false;
      this.reloading = false;
      this.replaced = false;
      this.sized = false;
      this.sizing = false;
      this.init();
    }
    _createClass(Cropper, [{
      key: "init",
      value: function init() {
        var element = this.element;
        var tagName = element.tagName.toLowerCase();
        var url;
        if (element[NAMESPACE]) {
          return;
        }
        element[NAMESPACE] = this;
        if (tagName === 'img') {
          this.isImg = true;

          // e.g.: "img/picture.jpg"
          url = element.getAttribute('src') || '';
          this.originalUrl = url;

          // Stop when it's a blank image
          if (!url) {
            return;
          }

          // e.g.: "https://example.com/img/picture.jpg"
          url = element.src;
        } else if (tagName === 'canvas' && window.HTMLCanvasElement) {
          url = element.toDataURL();
        }
        this.load(url);
      }
    }, {
      key: "load",
      value: function load(url) {
        var _this = this;
        if (!url) {
          return;
        }
        this.url = url;
        this.imageData = {};
        var element = this.element,
          options = this.options;
        if (!options.rotatable && !options.scalable) {
          options.checkOrientation = false;
        }

        // Only IE10+ supports Typed Arrays
        if (!options.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        }

        // Detect the mime type of the image directly if it is a Data URL
        if (REGEXP_DATA_URL.test(url)) {
          // Read ArrayBuffer from Data URL of JPEG images directly for better performance
          if (REGEXP_DATA_URL_JPEG.test(url)) {
            this.read(dataURLToArrayBuffer(url));
          } else {
            // Only a JPEG image may contains Exif Orientation information,
            // the rest types of Data URLs are not necessary to check orientation at all.
            this.clone();
          }
          return;
        }

        // 1. Detect the mime type of the image by a XMLHttpRequest.
        // 2. Load the image as ArrayBuffer for reading orientation if its a JPEG image.
        var xhr = new XMLHttpRequest();
        var clone = this.clone.bind(this);
        this.reloading = true;
        this.xhr = xhr;

        // 1. Cross origin requests are only supported for protocol schemes:
        // http, https, data, chrome, chrome-extension.
        // 2. Access to XMLHttpRequest from a Data URL will be blocked by CORS policy
        // in some browsers as IE11 and Safari.
        xhr.onabort = clone;
        xhr.onerror = clone;
        xhr.ontimeout = clone;
        xhr.onprogress = function () {
          // Abort the request directly if it not a JPEG image for better performance
          if (xhr.getResponseHeader('content-type') !== MIME_TYPE_JPEG) {
            xhr.abort();
          }
        };
        xhr.onload = function () {
          _this.read(xhr.response);
        };
        xhr.onloadend = function () {
          _this.reloading = false;
          _this.xhr = null;
        };

        // Bust cache when there is a "crossOrigin" property to avoid browser cache error
        if (options.checkCrossOrigin && isCrossOriginURL(url) && element.crossOrigin) {
          url = addTimestamp(url);
        }

        // The third parameter is required for avoiding side-effect (#682)
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.withCredentials = element.crossOrigin === 'use-credentials';
        xhr.send();
      }
    }, {
      key: "read",
      value: function read(arrayBuffer) {
        var options = this.options,
          imageData = this.imageData;

        // Reset the orientation value to its default value 1
        // as some iOS browsers will render image with its orientation
        var orientation = resetAndGetOrientation(arrayBuffer);
        var rotate = 0;
        var scaleX = 1;
        var scaleY = 1;
        if (orientation > 1) {
          // Generate a new URL which has the default orientation value
          this.url = arrayBufferToDataURL(arrayBuffer, MIME_TYPE_JPEG);
          var _parseOrientation = parseOrientation(orientation);
          rotate = _parseOrientation.rotate;
          scaleX = _parseOrientation.scaleX;
          scaleY = _parseOrientation.scaleY;
        }
        if (options.rotatable) {
          imageData.rotate = rotate;
        }
        if (options.scalable) {
          imageData.scaleX = scaleX;
          imageData.scaleY = scaleY;
        }
        this.clone();
      }
    }, {
      key: "clone",
      value: function clone() {
        var element = this.element,
          url = this.url;
        var crossOrigin = element.crossOrigin;
        var crossOriginUrl = url;
        if (this.options.checkCrossOrigin && isCrossOriginURL(url)) {
          if (!crossOrigin) {
            crossOrigin = 'anonymous';
          }

          // Bust cache when there is not a "crossOrigin" property (#519)
          crossOriginUrl = addTimestamp(url);
        }
        this.crossOrigin = crossOrigin;
        this.crossOriginUrl = crossOriginUrl;
        var image = document.createElement('img');
        if (crossOrigin) {
          image.crossOrigin = crossOrigin;
        }
        image.src = crossOriginUrl || url;
        image.alt = element.alt || 'The image to crop';
        this.image = image;
        image.onload = this.start.bind(this);
        image.onerror = this.stop.bind(this);
        addClass(image, CLASS_HIDE);
        element.parentNode.insertBefore(image, element.nextSibling);
      }
    }, {
      key: "start",
      value: function start() {
        var _this2 = this;
        var image = this.image;
        image.onload = null;
        image.onerror = null;
        this.sizing = true;

        // Match all browsers that use WebKit as the layout engine in iOS devices,
        // such as Safari for iOS, Chrome for iOS, and in-app browsers.
        var isIOSWebKit = WINDOW.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WINDOW.navigator.userAgent);
        var done = function done(naturalWidth, naturalHeight) {
          assign(_this2.imageData, {
            naturalWidth: naturalWidth,
            naturalHeight: naturalHeight,
            aspectRatio: naturalWidth / naturalHeight
          });
          _this2.initialImageData = assign({}, _this2.imageData);
          _this2.sizing = false;
          _this2.sized = true;
          _this2.build();
        };

        // Most modern browsers (excepts iOS WebKit)
        if (image.naturalWidth && !isIOSWebKit) {
          done(image.naturalWidth, image.naturalHeight);
          return;
        }
        var sizingImage = document.createElement('img');
        var body = document.body || document.documentElement;
        this.sizingImage = sizingImage;
        sizingImage.onload = function () {
          done(sizingImage.width, sizingImage.height);
          if (!isIOSWebKit) {
            body.removeChild(sizingImage);
          }
        };
        sizingImage.src = image.src;

        // iOS WebKit will convert the image automatically
        // with its orientation once append it into DOM (#279)
        if (!isIOSWebKit) {
          sizingImage.style.cssText = 'left:0;' + 'max-height:none!important;' + 'max-width:none!important;' + 'min-height:0!important;' + 'min-width:0!important;' + 'opacity:0;' + 'position:absolute;' + 'top:0;' + 'z-index:-1;';
          body.appendChild(sizingImage);
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var image = this.image;
        image.onload = null;
        image.onerror = null;
        image.parentNode.removeChild(image);
        this.image = null;
      }
    }, {
      key: "build",
      value: function build() {
        if (!this.sized || this.ready) {
          return;
        }
        var element = this.element,
          options = this.options,
          image = this.image;

        // Create cropper elements
        var container = element.parentNode;
        var template = document.createElement('div');
        template.innerHTML = TEMPLATE;
        var cropper = template.querySelector(".".concat(NAMESPACE, "-container"));
        var canvas = cropper.querySelector(".".concat(NAMESPACE, "-canvas"));
        var dragBox = cropper.querySelector(".".concat(NAMESPACE, "-drag-box"));
        var cropBox = cropper.querySelector(".".concat(NAMESPACE, "-crop-box"));
        var face = cropBox.querySelector(".".concat(NAMESPACE, "-face"));
        this.container = container;
        this.cropper = cropper;
        this.canvas = canvas;
        this.dragBox = dragBox;
        this.cropBox = cropBox;
        this.viewBox = cropper.querySelector(".".concat(NAMESPACE, "-view-box"));
        this.face = face;
        canvas.appendChild(image);

        // Hide the original image
        addClass(element, CLASS_HIDDEN);

        // Inserts the cropper after to the current image
        container.insertBefore(cropper, element.nextSibling);

        // Show the hidden image
        removeClass(image, CLASS_HIDE);
        this.initPreview();
        this.bind();
        options.initialAspectRatio = Math.max(0, options.initialAspectRatio) || NaN;
        options.aspectRatio = Math.max(0, options.aspectRatio) || NaN;
        options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0;
        addClass(cropBox, CLASS_HIDDEN);
        if (!options.guides) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-dashed")), CLASS_HIDDEN);
        }
        if (!options.center) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-center")), CLASS_HIDDEN);
        }
        if (options.background) {
          addClass(cropper, "".concat(NAMESPACE, "-bg"));
        }
        if (!options.highlight) {
          addClass(face, CLASS_INVISIBLE);
        }
        if (options.cropBoxMovable) {
          addClass(face, CLASS_MOVE);
          setData(face, DATA_ACTION, ACTION_ALL);
        }
        if (!options.cropBoxResizable) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-line")), CLASS_HIDDEN);
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-point")), CLASS_HIDDEN);
        }
        this.render();
        this.ready = true;
        this.setDragMode(options.dragMode);
        if (options.autoCrop) {
          this.crop();
        }
        this.setData(options.data);
        if (isFunction(options.ready)) {
          addListener(element, EVENT_READY, options.ready, {
            once: true
          });
        }
        dispatchEvent(element, EVENT_READY);
      }
    }, {
      key: "unbuild",
      value: function unbuild() {
        if (!this.ready) {
          return;
        }
        this.ready = false;
        this.unbind();
        this.resetPreview();
        var parentNode = this.cropper.parentNode;
        if (parentNode) {
          parentNode.removeChild(this.cropper);
        }
        removeClass(this.element, CLASS_HIDDEN);
      }
    }, {
      key: "uncreate",
      value: function uncreate() {
        if (this.ready) {
          this.unbuild();
          this.ready = false;
          this.cropped = false;
        } else if (this.sizing) {
          this.sizingImage.onload = null;
          this.sizing = false;
          this.sized = false;
        } else if (this.reloading) {
          this.xhr.onabort = null;
          this.xhr.abort();
        } else if (this.image) {
          this.stop();
        }
      }

      /**
       * Get the no conflict cropper class.
       * @returns {Cropper} The cropper class.
       */
    }], [{
      key: "noConflict",
      value: function noConflict() {
        window.Cropper = AnotherCropper;
        return Cropper;
      }

      /**
       * Change the default options.
       * @param {Object} options - The new default options.
       */
    }, {
      key: "setDefaults",
      value: function setDefaults(options) {
        assign(DEFAULTS, isPlainObject(options) && options);
      }
    }]);
    return Cropper;
  }();
  assign(Cropper.prototype, render, preview, events, handlers, change, methods);

  return Cropper;

}));
});

class ImageCropperComponent {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.cropper = undefined;
        this.segment = false;
        this.locale = 'pt';
    }
    async listenLocale(newValue) {
        this.setI18nParameters(newValue);
    }
    ;
    async componentWillLoad() {
        this.setI18nParameters(this.locale);
        this.translations = await __chunk_4.TranslationUtils.fetchTranslations();
    }
    async setI18nParameters(locale) {
        __chunk_4.TranslationUtils.setLocale(locale);
        this.translations = await __chunk_4.TranslationUtils.fetchTranslations();
        this.componentContainer.forceUpdate();
    }
    componentDidLoad() {
        const parentElement = this.parentElementTag ? document.getElementsByTagName(this.parentElementTag)[0].shadowRoot.lastElementChild : document;
        const currentElement = this.currentElementTag ? parentElement.getElementsByTagName(this.currentElementTag)[0].shadowRoot.lastElementChild : parentElement;
        const image = currentElement.getElementsByTagName("image-cropper-component")[0].shadowRoot.lastElementChild.getElementsByClassName("cropper-base-image")[0];
        this.cropper = new cropper(image, {
            aspectRatio: this.aspectRatio,
            center: true,
            cropBoxResizable: this.cropBoxResizable,
            dragMode: 'move',
            viewMode: 0,
            minContainerWidth: 710
        });
        // setTimeout(() => {
        //   const cropperContainer: any = currentElement.getElementsByTagName("image-cropper-component")[0].shadowRoot.lastElementChild.getElementsByClassName("cropper-bg")[0];
        //   cropperContainer.style.maxHeight = "710px"
        // }, 1000);
    }
    crop() {
        const croppedImage = this.cropper.getCroppedCanvas().toDataURL('image/jpeg', 0.8);
        const html = `
      <div>
        <img src="${croppedImage}" class="object-fit-contain" style="max-height: 300px" />
        <div class="swal2-content">
          <h2 style="display: flex;
            justify-content: center;
            font-size: 1.4em;
            font-weight: 600;
            margin: 20px;
            word-wrap: break-word;"
          >${this.translations.CONFIRM_CROP}</h2>
          <div id="swal2-content" style="display: block;">${this.translations.MAKE_SURE_PHOTO_WELL_FRAME}</div>
        </div>
      </div>
    `;
        return __chunk_2.Swal.fire({
            html,
            type: "warning",
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: this.translations.CONFIRM,
            cancelButtonText: this.translations.BACK,
        }).then((result) => {
            if (result.value) {
                this.cropCallback(this.parentComponentContext, croppedImage.split(",")[1], this.src.split(",")[1], this.segment);
            }
        });
    }
    segmentCheckInput() {
        this.segment = !this.segment;
    }
    render() {
        return (__chunk_1.h("div", null, __chunk_1.h("img", { src: this.src, class: "cropper-base-image my-3", style: { maxHeight: "30vh" } }), __chunk_1.h("div", null), __chunk_1.h("div", { class: "toolbox-container" }, __chunk_1.h("div", { class: "button-container", onClick: () => this.crop() }, __chunk_1.h("img", { src: "./assets/general/crop.png", class: "icon-24", "aria-hidden": "true", title: this.translations.CLIP })), __chunk_1.h("div", { class: "button-container", onClick: () => this.cropper.rotate(-1) }, __chunk_1.h("img", { src: "./assets/general/rotate-left.png", class: "icon-24", "aria-hidden": "true", title: this.translations.ADJUSTMENT_1_DEGREE_LEFT })), __chunk_1.h("div", { class: "button-container", onClick: () => this.cropper.rotate(1) }, __chunk_1.h("img", { src: "./assets/general/rotate-right.png", class: "icon-24", "aria-hidden": "true", title: this.translations.ADJUSTMENT_1_DEGREE_RIGHT })), __chunk_1.h("div", { class: "button-container", onClick: () => this.cropper.rotate(-90) }, __chunk_1.h("img", { src: "./assets/general/rotate-left-variant.png", class: "icon-24", "aria-hidden": "true", title: this.translations.TURN_90_DEGREE_LEFT })), __chunk_1.h("div", { class: "button-container", onClick: () => this.cropper.rotate(90) }, __chunk_1.h("img", { src: "./assets/general/rotate-right-variant.png", class: "icon-24", "aria-hidden": "true", title: this.translations.TURN_90_DEGREE_RIGHT })), __chunk_1.h("div", { class: "field" }, __chunk_1.h("input", { class: `is-checkradio has-background-color ${this.segment ? "is-info" : ""}`, id: "check-segment", type: "checkbox", name: "check-segment", checked: this.segment, onChange: () => this.segmentCheckInput() }), __chunk_1.h("label", { htmlFor: "check-segment" }, this.translations.USE_SEGMENTATION)))));
    }
    get componentContainer() { return __chunk_1.getElement(this); }
    static get watchers() { return {
        "locale": ["listenLocale"]
    }; }
    static get style() { return "\@charset \"UTF-8\";\n/*! bulma.io v0.7.5 | MIT License | github.com/jgthms/bulma */\@keyframes spinAround{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.breadcrumb,.button,.delete,.file,.is-unselectable,.modal-close,.pagination-ellipsis,.pagination-link,.pagination-next,.pagination-previous,.tabs{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.navbar-link:not(.is-arrowless):after,.select:not(.is-multiple):not(.is-loading):after{border:3px solid transparent;border-radius:2px;border-right:0;border-top:0;content:\" \";display:block;height:.625em;margin-top:-.4375em;pointer-events:none;position:absolute;top:50%;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:center;transform-origin:center;width:.625em}.block:not(:last-child),.box:not(:last-child),.breadcrumb:not(:last-child),.content:not(:last-child),.highlight:not(:last-child),.level:not(:last-child),.list:not(:last-child),.message:not(:last-child),.notification:not(:last-child),.progress:not(:last-child),.subtitle:not(:last-child),.table-container:not(:last-child),.table:not(:last-child),.tabs:not(:last-child),.title:not(:last-child){margin-bottom:1.5rem}.delete,.modal-close{-moz-appearance:none;-webkit-appearance:none;background-color:rgba(10,10,10,.2);border:none;border-radius:290486px;cursor:pointer;pointer-events:auto;display:inline-block;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;font-size:0;height:20px;max-height:20px;max-width:20px;min-height:20px;min-width:20px;outline:none;position:relative;vertical-align:top;width:20px}.delete:after,.delete:before,.modal-close:after,.modal-close:before{background-color:#fff;content:\"\";display:block;left:50%;position:absolute;top:50%;-webkit-transform:translateX(-50%) translateY(-50%) rotate(45deg);transform:translateX(-50%) translateY(-50%) rotate(45deg);-webkit-transform-origin:center center;transform-origin:center center}.delete:before,.modal-close:before{height:2px;width:50%}.delete:after,.modal-close:after{height:50%;width:2px}.delete:focus,.delete:hover,.modal-close:focus,.modal-close:hover{background-color:rgba(10,10,10,.3)}.delete:active,.modal-close:active{background-color:rgba(10,10,10,.4)}.is-small.delete,.is-small.modal-close{height:16px;max-height:16px;max-width:16px;min-height:16px;min-width:16px;width:16px}.is-medium.delete,.is-medium.modal-close{height:24px;max-height:24px;max-width:24px;min-height:24px;min-width:24px;width:24px}.is-large.delete,.is-large.modal-close{height:32px;max-height:32px;max-width:32px;min-height:32px;min-width:32px;width:32px}.button.is-loading:after,.control.is-loading:after,.loader,.select.is-loading:after{-webkit-animation:spinAround .5s linear infinite;animation:spinAround .5s linear infinite;border:2px solid #dbdbdb;border-radius:290486px;border-right-color:transparent;border-top-color:transparent;content:\"\";display:block;height:1em;position:relative;width:1em}.hero-video,.image.is-1by1 .has-ratio,.image.is-1by1 img,.image.is-1by2 .has-ratio,.image.is-1by2 img,.image.is-1by3 .has-ratio,.image.is-1by3 img,.image.is-2by1 .has-ratio,.image.is-2by1 img,.image.is-2by3 .has-ratio,.image.is-2by3 img,.image.is-3by1 .has-ratio,.image.is-3by1 img,.image.is-3by2 .has-ratio,.image.is-3by2 img,.image.is-3by4 .has-ratio,.image.is-3by4 img,.image.is-3by5 .has-ratio,.image.is-3by5 img,.image.is-4by3 .has-ratio,.image.is-4by3 img,.image.is-4by5 .has-ratio,.image.is-4by5 img,.image.is-5by3 .has-ratio,.image.is-5by3 img,.image.is-5by4 .has-ratio,.image.is-5by4 img,.image.is-9by16 .has-ratio,.image.is-9by16 img,.image.is-16by9 .has-ratio,.image.is-16by9 img,.image.is-square .has-ratio,.image.is-square img,.is-overlay,.modal,.modal-background{bottom:0;left:0;position:absolute;right:0;top:0}.button,.file-cta,.file-name,.input,.pagination-ellipsis,.pagination-link,.pagination-next,.pagination-previous,.select select,.textarea{-moz-appearance:none;-webkit-appearance:none;-ms-flex-align:center;align-items:center;border:1px solid transparent;border-radius:4px;-webkit-box-shadow:none;box-shadow:none;display:-ms-inline-flexbox;display:inline-flex;font-size:1rem;height:2.25em;-ms-flex-pack:start;justify-content:flex-start;line-height:1.5;padding-bottom:calc(.375em - 1px);padding-left:calc(.625em - 1px);padding-right:calc(.625em - 1px);padding-top:calc(.375em - 1px);position:relative;vertical-align:top}.button:active,.button:focus,.file-cta:active,.file-cta:focus,.file-name:active,.file-name:focus,.input:active,.input:focus,.is-active.button,.is-active.file-cta,.is-active.file-name,.is-active.input,.is-active.pagination-ellipsis,.is-active.pagination-link,.is-active.pagination-next,.is-active.pagination-previous,.is-active.textarea,.is-focused.button,.is-focused.file-cta,.is-focused.file-name,.is-focused.input,.is-focused.pagination-ellipsis,.is-focused.pagination-link,.is-focused.pagination-next,.is-focused.pagination-previous,.is-focused.textarea,.pagination-ellipsis:active,.pagination-ellipsis:focus,.pagination-link:active,.pagination-link:focus,.pagination-next:active,.pagination-next:focus,.pagination-previous:active,.pagination-previous:focus,.select select.is-active,.select select.is-focused,.select select:active,.select select:focus,.textarea:active,.textarea:focus{outline:none}.select fieldset[disabled] select,.select select[disabled],[disabled].button,[disabled].file-cta,[disabled].file-name,[disabled].input,[disabled].pagination-ellipsis,[disabled].pagination-link,[disabled].pagination-next,[disabled].pagination-previous,[disabled].textarea,fieldset[disabled] .button,fieldset[disabled] .file-cta,fieldset[disabled] .file-name,fieldset[disabled] .input,fieldset[disabled] .pagination-ellipsis,fieldset[disabled] .pagination-link,fieldset[disabled] .pagination-next,fieldset[disabled] .pagination-previous,fieldset[disabled] .select select,fieldset[disabled] .textarea{cursor:not-allowed}\n\n/*! minireset.css v0.0.4 | MIT License | github.com/jgthms/minireset.css */blockquote,body,dd,dl,dt,fieldset,figure,h1,h2,h3,h4,h5,h6,hr,html,iframe,legend,li,ol,p,pre,textarea,ul{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:400}ul{list-style:none}button,input,select,textarea{margin:0}html{-webkit-box-sizing:border-box;box-sizing:border-box}*,:after,:before{-webkit-box-sizing:inherit;box-sizing:inherit}embed,iframe,img,object,video{height:auto;max-width:100%}audio{max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}td:not([align]),th:not([align]){text-align:left}html{background-color:#fff;font-size:16px;font-size:1rem;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;min-width:300px;overflow-x:hidden;overflow-y:scroll;text-rendering:optimizeLegibility;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%}article,aside,figure,footer,header,hgroup,section{display:block}body,button,input,select,textarea{font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif}code,pre{-moz-osx-font-smoothing:auto;-webkit-font-smoothing:auto;font-family:monospace}body{color:#4a4a4a;font-size:1em;font-weight:400;line-height:1.5}a{color:#239ed7;cursor:pointer;text-decoration:none}a strong{color:currentColor}a:hover{color:#363636}code{color:#ff3860;font-size:.875em;font-weight:400;padding:.25em .5em .25em}code,hr{background-color:#f5f5f5}hr{border:none;display:block;height:2px;margin:1.5rem 0}img{height:auto;max-width:100%}input[type=checkbox],input[type=radio]{vertical-align:baseline}small{font-size:.875em}span{font-style:inherit;font-weight:inherit}strong{color:#363636;font-weight:700}fieldset{border:none}pre{-webkit-overflow-scrolling:touch;background-color:#f5f5f5;color:#4a4a4a;font-size:.875em;overflow-x:auto;padding:1.25rem 1.5rem;white-space:pre;word-wrap:normal}pre code{background-color:transparent;color:currentColor;font-size:1em;padding:0}table td,table th{vertical-align:top}table td:not([align]),table th:not([align]){text-align:left}table th{color:#363636}.is-clearfix:after{clear:both;content:\" \";display:table}.is-pulled-left{float:left!important}.is-pulled-right{float:right!important}.is-clipped{overflow:hidden!important}.is-size-1{font-size:3rem!important}.is-size-2{font-size:2.5rem!important}.is-size-3{font-size:2rem!important}.is-size-4{font-size:1.5rem!important}.is-size-5{font-size:1.25rem!important}.is-size-6{font-size:1rem!important}.is-size-7{font-size:.75rem!important}\@media screen and (max-width:768px){.is-size-1-mobile{font-size:3rem!important}.is-size-2-mobile{font-size:2.5rem!important}.is-size-3-mobile{font-size:2rem!important}.is-size-4-mobile{font-size:1.5rem!important}.is-size-5-mobile{font-size:1.25rem!important}.is-size-6-mobile{font-size:1rem!important}.is-size-7-mobile{font-size:.75rem!important}}\@media print,screen and (min-width:769px){.is-size-1-tablet{font-size:3rem!important}.is-size-2-tablet{font-size:2.5rem!important}.is-size-3-tablet{font-size:2rem!important}.is-size-4-tablet{font-size:1.5rem!important}.is-size-5-tablet{font-size:1.25rem!important}.is-size-6-tablet{font-size:1rem!important}.is-size-7-tablet{font-size:.75rem!important}}\@media screen and (max-width:1023px){.is-size-1-touch{font-size:3rem!important}.is-size-2-touch{font-size:2.5rem!important}.is-size-3-touch{font-size:2rem!important}.is-size-4-touch{font-size:1.5rem!important}.is-size-5-touch{font-size:1.25rem!important}.is-size-6-touch{font-size:1rem!important}.is-size-7-touch{font-size:.75rem!important}}\@media screen and (min-width:1024px){.is-size-1-desktop{font-size:3rem!important}.is-size-2-desktop{font-size:2.5rem!important}.is-size-3-desktop{font-size:2rem!important}.is-size-4-desktop{font-size:1.5rem!important}.is-size-5-desktop{font-size:1.25rem!important}.is-size-6-desktop{font-size:1rem!important}.is-size-7-desktop{font-size:.75rem!important}}\@media screen and (min-width:1216px){.is-size-1-widescreen{font-size:3rem!important}.is-size-2-widescreen{font-size:2.5rem!important}.is-size-3-widescreen{font-size:2rem!important}.is-size-4-widescreen{font-size:1.5rem!important}.is-size-5-widescreen{font-size:1.25rem!important}.is-size-6-widescreen{font-size:1rem!important}.is-size-7-widescreen{font-size:.75rem!important}}\@media screen and (min-width:1408px){.is-size-1-fullhd{font-size:3rem!important}.is-size-2-fullhd{font-size:2.5rem!important}.is-size-3-fullhd{font-size:2rem!important}.is-size-4-fullhd{font-size:1.5rem!important}.is-size-5-fullhd{font-size:1.25rem!important}.is-size-6-fullhd{font-size:1rem!important}.is-size-7-fullhd{font-size:.75rem!important}}.has-text-centered{text-align:center!important}.has-text-justified{text-align:justify!important}.has-text-left{text-align:left!important}.has-text-right{text-align:right!important}\@media screen and (max-width:768px){.has-text-centered-mobile{text-align:center!important}}\@media print,screen and (min-width:769px){.has-text-centered-tablet{text-align:center!important}}\@media screen and (min-width:769px) and (max-width:1023px){.has-text-centered-tablet-only{text-align:center!important}}\@media screen and (max-width:1023px){.has-text-centered-touch{text-align:center!important}}\@media screen and (min-width:1024px){.has-text-centered-desktop{text-align:center!important}}\@media screen and (min-width:1024px) and (max-width:1215px){.has-text-centered-desktop-only{text-align:center!important}}\@media screen and (min-width:1216px){.has-text-centered-widescreen{text-align:center!important}}\@media screen and (min-width:1216px) and (max-width:1407px){.has-text-centered-widescreen-only{text-align:center!important}}\@media screen and (min-width:1408px){.has-text-centered-fullhd{text-align:center!important}}\@media screen and (max-width:768px){.has-text-justified-mobile{text-align:justify!important}}\@media print,screen and (min-width:769px){.has-text-justified-tablet{text-align:justify!important}}\@media screen and (min-width:769px) and (max-width:1023px){.has-text-justified-tablet-only{text-align:justify!important}}\@media screen and (max-width:1023px){.has-text-justified-touch{text-align:justify!important}}\@media screen and (min-width:1024px){.has-text-justified-desktop{text-align:justify!important}}\@media screen and (min-width:1024px) and (max-width:1215px){.has-text-justified-desktop-only{text-align:justify!important}}\@media screen and (min-width:1216px){.has-text-justified-widescreen{text-align:justify!important}}\@media screen and (min-width:1216px) and (max-width:1407px){.has-text-justified-widescreen-only{text-align:justify!important}}\@media screen and (min-width:1408px){.has-text-justified-fullhd{text-align:justify!important}}\@media screen and (max-width:768px){.has-text-left-mobile{text-align:left!important}}\@media print,screen and (min-width:769px){.has-text-left-tablet{text-align:left!important}}\@media screen and (min-width:769px) and (max-width:1023px){.has-text-left-tablet-only{text-align:left!important}}\@media screen and (max-width:1023px){.has-text-left-touch{text-align:left!important}}\@media screen and (min-width:1024px){.has-text-left-desktop{text-align:left!important}}\@media screen and (min-width:1024px) and (max-width:1215px){.has-text-left-desktop-only{text-align:left!important}}\@media screen and (min-width:1216px){.has-text-left-widescreen{text-align:left!important}}\@media screen and (min-width:1216px) and (max-width:1407px){.has-text-left-widescreen-only{text-align:left!important}}\@media screen and (min-width:1408px){.has-text-left-fullhd{text-align:left!important}}\@media screen and (max-width:768px){.has-text-right-mobile{text-align:right!important}}\@media print,screen and (min-width:769px){.has-text-right-tablet{text-align:right!important}}\@media screen and (min-width:769px) and (max-width:1023px){.has-text-right-tablet-only{text-align:right!important}}\@media screen and (max-width:1023px){.has-text-right-touch{text-align:right!important}}\@media screen and (min-width:1024px){.has-text-right-desktop{text-align:right!important}}\@media screen and (min-width:1024px) and (max-width:1215px){.has-text-right-desktop-only{text-align:right!important}}\@media screen and (min-width:1216px){.has-text-right-widescreen{text-align:right!important}}\@media screen and (min-width:1216px) and (max-width:1407px){.has-text-right-widescreen-only{text-align:right!important}}\@media screen and (min-width:1408px){.has-text-right-fullhd{text-align:right!important}}.is-capitalized{text-transform:capitalize!important}.is-lowercase{text-transform:lowercase!important}.is-uppercase{text-transform:uppercase!important}.is-italic{font-style:italic!important}.has-text-white{color:#fff!important}a.has-text-white:focus,a.has-text-white:hover{color:#e6e6e6!important}.has-background-white{background-color:#fff!important}.has-text-black{color:#0a0a0a!important}a.has-text-black:focus,a.has-text-black:hover{color:#000!important}.has-background-black{background-color:#0a0a0a!important}.has-text-light{color:#f5f5f5!important}a.has-text-light:focus,a.has-text-light:hover{color:#dbdbdb!important}.has-background-light{background-color:#f5f5f5!important}.has-text-dark{color:#363636!important}a.has-text-dark:focus,a.has-text-dark:hover{color:#1c1c1c!important}.has-background-dark{background-color:#363636!important}.has-text-primary{color:#239ed7!important}a.has-text-primary:focus,a.has-text-primary:hover{color:#1c7eab!important}.has-background-primary{background-color:#239ed7!important}.has-text-link{color:#239ed7!important}a.has-text-link:focus,a.has-text-link:hover{color:#1c7eab!important}.has-background-link{background-color:#239ed7!important}.has-text-info{color:#209cee!important}a.has-text-info:focus,a.has-text-info:hover{color:#0f81cc!important}.has-background-info{background-color:#209cee!important}.has-text-success{color:#23d160!important}a.has-text-success:focus,a.has-text-success:hover{color:#1ca64c!important}.has-background-success{background-color:#23d160!important}.has-text-warning{color:#ffdd57!important}a.has-text-warning:focus,a.has-text-warning:hover{color:#ffd324!important}.has-background-warning{background-color:#ffdd57!important}.has-text-danger{color:#ff3860!important}a.has-text-danger:focus,a.has-text-danger:hover{color:#ff0537!important}.has-background-danger{background-color:#ff3860!important}.has-text-black-bis{color:#121212!important}.has-background-black-bis{background-color:#121212!important}.has-text-black-ter{color:#242424!important}.has-background-black-ter{background-color:#242424!important}.has-text-grey-darker{color:#363636!important}.has-background-grey-darker{background-color:#363636!important}.has-text-grey-dark{color:#4a4a4a!important}.has-background-grey-dark{background-color:#4a4a4a!important}.has-text-grey{color:#7a7a7a!important}.has-background-grey{background-color:#7a7a7a!important}.has-text-grey-light{color:#b5b5b5!important}.has-background-grey-light{background-color:#b5b5b5!important}.has-text-grey-lighter{color:#dbdbdb!important}.has-background-grey-lighter{background-color:#dbdbdb!important}.has-text-white-ter{color:#f5f5f5!important}.has-background-white-ter{background-color:#f5f5f5!important}.has-text-white-bis{color:#fafafa!important}.has-background-white-bis{background-color:#fafafa!important}.has-text-weight-light{font-weight:300!important}.has-text-weight-normal{font-weight:400!important}.has-text-weight-medium{font-weight:500!important}.has-text-weight-semibold{font-weight:600!important}.has-text-weight-bold{font-weight:700!important}.is-family-primary,.is-family-sans-serif,.is-family-secondary{font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif!important}.is-family-code,.is-family-monospace{font-family:monospace!important}.is-block{display:block!important}\@media screen and (max-width:768px){.is-block-mobile{display:block!important}}\@media print,screen and (min-width:769px){.is-block-tablet{display:block!important}}\@media screen and (min-width:769px) and (max-width:1023px){.is-block-tablet-only{display:block!important}}\@media screen and (max-width:1023px){.is-block-touch{display:block!important}}\@media screen and (min-width:1024px){.is-block-desktop{display:block!important}}\@media screen and (min-width:1024px) and (max-width:1215px){.is-block-desktop-only{display:block!important}}\@media screen and (min-width:1216px){.is-block-widescreen{display:block!important}}\@media screen and (min-width:1216px) and (max-width:1407px){.is-block-widescreen-only{display:block!important}}\@media screen and (min-width:1408px){.is-block-fullhd{display:block!important}}.is-flex{display:-ms-flexbox!important;display:flex!important}\@media screen and (max-width:768px){.is-flex-mobile{display:-ms-flexbox!important;display:flex!important}}\@media print,screen and (min-width:769px){.is-flex-tablet{display:-ms-flexbox!important;display:flex!important}}\@media screen and (min-width:769px) and (max-width:1023px){.is-flex-tablet-only{display:-ms-flexbox!important;display:flex!important}}\@media screen and (max-width:1023px){.is-flex-touch{display:-ms-flexbox!important;display:flex!important}}\@media screen and (min-width:1024px){.is-flex-desktop{display:-ms-flexbox!important;display:flex!important}}\@media screen and (min-width:1024px) and (max-width:1215px){.is-flex-desktop-only{display:-ms-flexbox!important;display:flex!important}}\@media screen and (min-width:1216px){.is-flex-widescreen{display:-ms-flexbox!important;display:flex!important}}\@media screen and (min-width:1216px) and (max-width:1407px){.is-flex-widescreen-only{display:-ms-flexbox!important;display:flex!important}}\@media screen and (min-width:1408px){.is-flex-fullhd{display:-ms-flexbox!important;display:flex!important}}.is-inline{display:inline!important}\@media screen and (max-width:768px){.is-inline-mobile{display:inline!important}}\@media print,screen and (min-width:769px){.is-inline-tablet{display:inline!important}}\@media screen and (min-width:769px) and (max-width:1023px){.is-inline-tablet-only{display:inline!important}}\@media screen and (max-width:1023px){.is-inline-touch{display:inline!important}}\@media screen and (min-width:1024px){.is-inline-desktop{display:inline!important}}\@media screen and (min-width:1024px) and (max-width:1215px){.is-inline-desktop-only{display:inline!important}}\@media screen and (min-width:1216px){.is-inline-widescreen{display:inline!important}}\@media screen and (min-width:1216px) and (max-width:1407px){.is-inline-widescreen-only{display:inline!important}}\@media screen and (min-width:1408px){.is-inline-fullhd{display:inline!important}}.is-inline-block{display:inline-block!important}\@media screen and (max-width:768px){.is-inline-block-mobile{display:inline-block!important}}\@media print,screen and (min-width:769px){.is-inline-block-tablet{display:inline-block!important}}\@media screen and (min-width:769px) and (max-width:1023px){.is-inline-block-tablet-only{display:inline-block!important}}\@media screen and (max-width:1023px){.is-inline-block-touch{display:inline-block!important}}\@media screen and (min-width:1024px){.is-inline-block-desktop{display:inline-block!important}}\@media screen and (min-width:1024px) and (max-width:1215px){.is-inline-block-desktop-only{display:inline-block!important}}\@media screen and (min-width:1216px){.is-inline-block-widescreen{display:inline-block!important}}\@media screen and (min-width:1216px) and (max-width:1407px){.is-inline-block-widescreen-only{display:inline-block!important}}\@media screen and (min-width:1408px){.is-inline-block-fullhd{display:inline-block!important}}.is-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}\@media screen and (max-width:768px){.is-inline-flex-mobile{display:-ms-inline-flexbox!important;display:inline-flex!important}}\@media print,screen and (min-width:769px){.is-inline-flex-tablet{display:-ms-inline-flexbox!important;display:inline-flex!important}}\@media screen and (min-width:769px) and (max-width:1023px){.is-inline-flex-tablet-only{display:-ms-inline-flexbox!important;display:inline-flex!important}}\@media screen and (max-width:1023px){.is-inline-flex-touch{display:-ms-inline-flexbox!important;display:inline-flex!important}}\@media screen and (min-width:1024px){.is-inline-flex-desktop{display:-ms-inline-flexbox!important;display:inline-flex!important}}\@media screen and (min-width:1024px) and (max-width:1215px){.is-inline-flex-desktop-only{display:-ms-inline-flexbox!important;display:inline-flex!important}}\@media screen and (min-width:1216px){.is-inline-flex-widescreen{display:-ms-inline-flexbox!important;display:inline-flex!important}}\@media screen and (min-width:1216px) and (max-width:1407px){.is-inline-flex-widescreen-only{display:-ms-inline-flexbox!important;display:inline-flex!important}}\@media screen and (min-width:1408px){.is-inline-flex-fullhd{display:-ms-inline-flexbox!important;display:inline-flex!important}}.is-hidden{display:none!important}.is-sr-only{border:none!important;clip:rect(0,0,0,0)!important;height:.01em!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:.01em!important}\@media screen and (max-width:768px){.is-hidden-mobile{display:none!important}}\@media print,screen and (min-width:769px){.is-hidden-tablet{display:none!important}}\@media screen and (min-width:769px) and (max-width:1023px){.is-hidden-tablet-only{display:none!important}}\@media screen and (max-width:1023px){.is-hidden-touch{display:none!important}}\@media screen and (min-width:1024px){.is-hidden-desktop{display:none!important}}\@media screen and (min-width:1024px) and (max-width:1215px){.is-hidden-desktop-only{display:none!important}}\@media screen and (min-width:1216px){.is-hidden-widescreen{display:none!important}}\@media screen and (min-width:1216px) and (max-width:1407px){.is-hidden-widescreen-only{display:none!important}}\@media screen and (min-width:1408px){.is-hidden-fullhd{display:none!important}}.is-invisible{visibility:hidden!important}\@media screen and (max-width:768px){.is-invisible-mobile{visibility:hidden!important}}\@media print,screen and (min-width:769px){.is-invisible-tablet{visibility:hidden!important}}\@media screen and (min-width:769px) and (max-width:1023px){.is-invisible-tablet-only{visibility:hidden!important}}\@media screen and (max-width:1023px){.is-invisible-touch{visibility:hidden!important}}\@media screen and (min-width:1024px){.is-invisible-desktop{visibility:hidden!important}}\@media screen and (min-width:1024px) and (max-width:1215px){.is-invisible-desktop-only{visibility:hidden!important}}\@media screen and (min-width:1216px){.is-invisible-widescreen{visibility:hidden!important}}\@media screen and (min-width:1216px) and (max-width:1407px){.is-invisible-widescreen-only{visibility:hidden!important}}\@media screen and (min-width:1408px){.is-invisible-fullhd{visibility:hidden!important}}.is-marginless{margin:0!important}.is-paddingless{padding:0!important}.is-radiusless{border-radius:0!important}.is-shadowless{-webkit-box-shadow:none!important;box-shadow:none!important}.is-relative{position:relative!important}.box{background-color:#fff;border-radius:6px;-webkit-box-shadow:0 2px 3px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1);box-shadow:0 2px 3px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1);color:#4a4a4a;display:block;padding:1.25rem}a.box:focus,a.box:hover{-webkit-box-shadow:0 2px 3px rgba(10,10,10,.1),0 0 0 1px #239ed7;box-shadow:0 2px 3px rgba(10,10,10,.1),0 0 0 1px #239ed7}a.box:active{-webkit-box-shadow:inset 0 1px 2px rgba(10,10,10,.2),0 0 0 1px #239ed7;box-shadow:inset 0 1px 2px rgba(10,10,10,.2),0 0 0 1px #239ed7}.button{background-color:#fff;border-color:#dbdbdb;border-width:1px;color:#363636;cursor:pointer;-ms-flex-pack:center;justify-content:center;padding-bottom:calc(.375em - 1px);padding-left:.75em;padding-right:.75em;padding-top:calc(.375em - 1px);text-align:center;white-space:nowrap}.button strong{color:inherit}.button .icon,.button .icon.is-large,.button .icon.is-medium,.button .icon.is-small{height:1.5em;width:1.5em}.button .icon:first-child:not(:last-child){margin-left:calc(-.375em - 1px);margin-right:.1875em}.button .icon:last-child:not(:first-child){margin-left:.1875em;margin-right:calc(-.375em - 1px)}.button .icon:first-child:last-child{margin-left:calc(-.375em - 1px);margin-right:calc(-.375em - 1px)}.button.is-hovered,.button:hover{border-color:#b5b5b5;color:#363636}.button.is-focused,.button:focus{border-color:#239ed7;color:#363636}.button.is-focused:not(:active),.button:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(35,158,215,.25);box-shadow:0 0 0 .125em rgba(35,158,215,.25)}.button.is-active,.button:active{border-color:#4a4a4a;color:#363636}.button.is-text{background-color:transparent;border-color:transparent;color:#4a4a4a;text-decoration:underline}.button.is-text.is-focused,.button.is-text.is-hovered,.button.is-text:focus,.button.is-text:hover{background-color:#f5f5f5;color:#363636}.button.is-text.is-active,.button.is-text:active{background-color:#e8e8e8;color:#363636}.button.is-text[disabled],fieldset[disabled] .button.is-text{background-color:transparent;border-color:transparent;-webkit-box-shadow:none;box-shadow:none}.button.is-white{background-color:#fff;border-color:transparent;color:#0a0a0a}.button.is-white.is-hovered,.button.is-white:hover{background-color:#f9f9f9;border-color:transparent;color:#0a0a0a}.button.is-white.is-focused,.button.is-white:focus{border-color:transparent;color:#0a0a0a}.button.is-white.is-focused:not(:active),.button.is-white:focus:not(:active){-webkit-box-shadow:0 0 0 .125em hsla(0,0%,100%,.25);box-shadow:0 0 0 .125em hsla(0,0%,100%,.25)}.button.is-white.is-active,.button.is-white:active{background-color:#f2f2f2;border-color:transparent;color:#0a0a0a}.button.is-white[disabled],fieldset[disabled] .button.is-white{background-color:#fff;border-color:transparent;-webkit-box-shadow:none;box-shadow:none}.button.is-white.is-inverted{background-color:#0a0a0a;color:#fff}.button.is-white.is-inverted.is-hovered,.button.is-white.is-inverted:hover{background-color:#000}.button.is-white.is-inverted[disabled],fieldset[disabled] .button.is-white.is-inverted{background-color:#0a0a0a;border-color:transparent;-webkit-box-shadow:none;box-shadow:none;color:#fff}.button.is-white.is-loading:after{border-color:transparent transparent #0a0a0a #0a0a0a!important}.button.is-white.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-white.is-outlined.is-focused,.button.is-white.is-outlined.is-hovered,.button.is-white.is-outlined:focus,.button.is-white.is-outlined:hover{background-color:#fff;border-color:#fff;color:#0a0a0a}.button.is-white.is-outlined.is-loading:after{border-color:transparent transparent #fff #fff!important}.button.is-white.is-outlined.is-loading.is-focused:after,.button.is-white.is-outlined.is-loading.is-hovered:after,.button.is-white.is-outlined.is-loading:focus:after,.button.is-white.is-outlined.is-loading:hover:after{border-color:transparent transparent #0a0a0a #0a0a0a!important}.button.is-white.is-outlined[disabled],fieldset[disabled] .button.is-white.is-outlined{background-color:transparent;border-color:#fff;-webkit-box-shadow:none;box-shadow:none;color:#fff}.button.is-white.is-inverted.is-outlined{background-color:transparent;border-color:#0a0a0a;color:#0a0a0a}.button.is-white.is-inverted.is-outlined.is-focused,.button.is-white.is-inverted.is-outlined.is-hovered,.button.is-white.is-inverted.is-outlined:focus,.button.is-white.is-inverted.is-outlined:hover{background-color:#0a0a0a;color:#fff}.button.is-white.is-inverted.is-outlined.is-loading.is-focused:after,.button.is-white.is-inverted.is-outlined.is-loading.is-hovered:after,.button.is-white.is-inverted.is-outlined.is-loading:focus:after,.button.is-white.is-inverted.is-outlined.is-loading:hover:after{border-color:transparent transparent #fff #fff!important}.button.is-white.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-white.is-inverted.is-outlined{background-color:transparent;border-color:#0a0a0a;-webkit-box-shadow:none;box-shadow:none;color:#0a0a0a}.button.is-black{background-color:#0a0a0a;border-color:transparent;color:#fff}.button.is-black.is-hovered,.button.is-black:hover{background-color:#040404;border-color:transparent;color:#fff}.button.is-black.is-focused,.button.is-black:focus{border-color:transparent;color:#fff}.button.is-black.is-focused:not(:active),.button.is-black:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(10,10,10,.25);box-shadow:0 0 0 .125em rgba(10,10,10,.25)}.button.is-black.is-active,.button.is-black:active{background-color:#000;border-color:transparent;color:#fff}.button.is-black[disabled],fieldset[disabled] .button.is-black{background-color:#0a0a0a;border-color:transparent;-webkit-box-shadow:none;box-shadow:none}.button.is-black.is-inverted{background-color:#fff;color:#0a0a0a}.button.is-black.is-inverted.is-hovered,.button.is-black.is-inverted:hover{background-color:#f2f2f2}.button.is-black.is-inverted[disabled],fieldset[disabled] .button.is-black.is-inverted{background-color:#fff;border-color:transparent;-webkit-box-shadow:none;box-shadow:none;color:#0a0a0a}.button.is-black.is-loading:after{border-color:transparent transparent #fff #fff!important}.button.is-black.is-outlined{background-color:transparent;border-color:#0a0a0a;color:#0a0a0a}.button.is-black.is-outlined.is-focused,.button.is-black.is-outlined.is-hovered,.button.is-black.is-outlined:focus,.button.is-black.is-outlined:hover{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.button.is-black.is-outlined.is-loading:after{border-color:transparent transparent #0a0a0a #0a0a0a!important}.button.is-black.is-outlined.is-loading.is-focused:after,.button.is-black.is-outlined.is-loading.is-hovered:after,.button.is-black.is-outlined.is-loading:focus:after,.button.is-black.is-outlined.is-loading:hover:after{border-color:transparent transparent #fff #fff!important}.button.is-black.is-outlined[disabled],fieldset[disabled] .button.is-black.is-outlined{background-color:transparent;border-color:#0a0a0a;-webkit-box-shadow:none;box-shadow:none;color:#0a0a0a}.button.is-black.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-black.is-inverted.is-outlined.is-focused,.button.is-black.is-inverted.is-outlined.is-hovered,.button.is-black.is-inverted.is-outlined:focus,.button.is-black.is-inverted.is-outlined:hover{background-color:#fff;color:#0a0a0a}.button.is-black.is-inverted.is-outlined.is-loading.is-focused:after,.button.is-black.is-inverted.is-outlined.is-loading.is-hovered:after,.button.is-black.is-inverted.is-outlined.is-loading:focus:after,.button.is-black.is-inverted.is-outlined.is-loading:hover:after{border-color:transparent transparent #0a0a0a #0a0a0a!important}.button.is-black.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-black.is-inverted.is-outlined{background-color:transparent;border-color:#fff;-webkit-box-shadow:none;box-shadow:none;color:#fff}.button.is-light{background-color:#f5f5f5;border-color:transparent;color:#363636}.button.is-light.is-hovered,.button.is-light:hover{background-color:#eee;border-color:transparent;color:#363636}.button.is-light.is-focused,.button.is-light:focus{border-color:transparent;color:#363636}.button.is-light.is-focused:not(:active),.button.is-light:focus:not(:active){-webkit-box-shadow:0 0 0 .125em hsla(0,0%,96.1%,.25);box-shadow:0 0 0 .125em hsla(0,0%,96.1%,.25)}.button.is-light.is-active,.button.is-light:active{background-color:#e8e8e8;border-color:transparent;color:#363636}.button.is-light[disabled],fieldset[disabled] .button.is-light{background-color:#f5f5f5;border-color:transparent;-webkit-box-shadow:none;box-shadow:none}.button.is-light.is-inverted{background-color:#363636;color:#f5f5f5}.button.is-light.is-inverted.is-hovered,.button.is-light.is-inverted:hover{background-color:#292929}.button.is-light.is-inverted[disabled],fieldset[disabled] .button.is-light.is-inverted{background-color:#363636;border-color:transparent;-webkit-box-shadow:none;box-shadow:none;color:#f5f5f5}.button.is-light.is-loading:after{border-color:transparent transparent #363636 #363636!important}.button.is-light.is-outlined{background-color:transparent;border-color:#f5f5f5;color:#f5f5f5}.button.is-light.is-outlined.is-focused,.button.is-light.is-outlined.is-hovered,.button.is-light.is-outlined:focus,.button.is-light.is-outlined:hover{background-color:#f5f5f5;border-color:#f5f5f5;color:#363636}.button.is-light.is-outlined.is-loading:after{border-color:transparent transparent #f5f5f5 #f5f5f5!important}.button.is-light.is-outlined.is-loading.is-focused:after,.button.is-light.is-outlined.is-loading.is-hovered:after,.button.is-light.is-outlined.is-loading:focus:after,.button.is-light.is-outlined.is-loading:hover:after{border-color:transparent transparent #363636 #363636!important}.button.is-light.is-outlined[disabled],fieldset[disabled] .button.is-light.is-outlined{background-color:transparent;border-color:#f5f5f5;-webkit-box-shadow:none;box-shadow:none;color:#f5f5f5}.button.is-light.is-inverted.is-outlined{background-color:transparent;border-color:#363636;color:#363636}.button.is-light.is-inverted.is-outlined.is-focused,.button.is-light.is-inverted.is-outlined.is-hovered,.button.is-light.is-inverted.is-outlined:focus,.button.is-light.is-inverted.is-outlined:hover{background-color:#363636;color:#f5f5f5}.button.is-light.is-inverted.is-outlined.is-loading.is-focused:after,.button.is-light.is-inverted.is-outlined.is-loading.is-hovered:after,.button.is-light.is-inverted.is-outlined.is-loading:focus:after,.button.is-light.is-inverted.is-outlined.is-loading:hover:after{border-color:transparent transparent #f5f5f5 #f5f5f5!important}.button.is-light.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-light.is-inverted.is-outlined{background-color:transparent;border-color:#363636;-webkit-box-shadow:none;box-shadow:none;color:#363636}.button.is-dark{background-color:#363636;border-color:transparent;color:#f5f5f5}.button.is-dark.is-hovered,.button.is-dark:hover{background-color:#2f2f2f;border-color:transparent;color:#f5f5f5}.button.is-dark.is-focused,.button.is-dark:focus{border-color:transparent;color:#f5f5f5}.button.is-dark.is-focused:not(:active),.button.is-dark:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(54,54,54,.25);box-shadow:0 0 0 .125em rgba(54,54,54,.25)}.button.is-dark.is-active,.button.is-dark:active{background-color:#292929;border-color:transparent;color:#f5f5f5}.button.is-dark[disabled],fieldset[disabled] .button.is-dark{background-color:#363636;border-color:transparent;-webkit-box-shadow:none;box-shadow:none}.button.is-dark.is-inverted{background-color:#f5f5f5;color:#363636}.button.is-dark.is-inverted.is-hovered,.button.is-dark.is-inverted:hover{background-color:#e8e8e8}.button.is-dark.is-inverted[disabled],fieldset[disabled] .button.is-dark.is-inverted{background-color:#f5f5f5;border-color:transparent;-webkit-box-shadow:none;box-shadow:none;color:#363636}.button.is-dark.is-loading:after{border-color:transparent transparent #f5f5f5 #f5f5f5!important}.button.is-dark.is-outlined{background-color:transparent;border-color:#363636;color:#363636}.button.is-dark.is-outlined.is-focused,.button.is-dark.is-outlined.is-hovered,.button.is-dark.is-outlined:focus,.button.is-dark.is-outlined:hover{background-color:#363636;border-color:#363636;color:#f5f5f5}.button.is-dark.is-outlined.is-loading:after{border-color:transparent transparent #363636 #363636!important}.button.is-dark.is-outlined.is-loading.is-focused:after,.button.is-dark.is-outlined.is-loading.is-hovered:after,.button.is-dark.is-outlined.is-loading:focus:after,.button.is-dark.is-outlined.is-loading:hover:after{border-color:transparent transparent #f5f5f5 #f5f5f5!important}.button.is-dark.is-outlined[disabled],fieldset[disabled] .button.is-dark.is-outlined{background-color:transparent;border-color:#363636;-webkit-box-shadow:none;box-shadow:none;color:#363636}.button.is-dark.is-inverted.is-outlined{background-color:transparent;border-color:#f5f5f5;color:#f5f5f5}.button.is-dark.is-inverted.is-outlined.is-focused,.button.is-dark.is-inverted.is-outlined.is-hovered,.button.is-dark.is-inverted.is-outlined:focus,.button.is-dark.is-inverted.is-outlined:hover{background-color:#f5f5f5;color:#363636}.button.is-dark.is-inverted.is-outlined.is-loading.is-focused:after,.button.is-dark.is-inverted.is-outlined.is-loading.is-hovered:after,.button.is-dark.is-inverted.is-outlined.is-loading:focus:after,.button.is-dark.is-inverted.is-outlined.is-loading:hover:after{border-color:transparent transparent #363636 #363636!important}.button.is-dark.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-dark.is-inverted.is-outlined{background-color:transparent;border-color:#f5f5f5;-webkit-box-shadow:none;box-shadow:none;color:#f5f5f5}.button.is-primary{background-color:#239ed7;border-color:transparent;color:#fff}.button.is-primary.is-hovered,.button.is-primary:hover{background-color:#2196cc;border-color:transparent;color:#fff}.button.is-primary.is-focused,.button.is-primary:focus{border-color:transparent;color:#fff}.button.is-primary.is-focused:not(:active),.button.is-primary:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(35,158,215,.25);box-shadow:0 0 0 .125em rgba(35,158,215,.25)}.button.is-primary.is-active,.button.is-primary:active{background-color:#1f8ec1;border-color:transparent;color:#fff}.button.is-primary[disabled],fieldset[disabled] .button.is-primary{background-color:#239ed7;border-color:transparent;-webkit-box-shadow:none;box-shadow:none}.button.is-primary.is-inverted{background-color:#fff;color:#239ed7}.button.is-primary.is-inverted.is-hovered,.button.is-primary.is-inverted:hover{background-color:#f2f2f2}.button.is-primary.is-inverted[disabled],fieldset[disabled] .button.is-primary.is-inverted{background-color:#fff;border-color:transparent;-webkit-box-shadow:none;box-shadow:none;color:#239ed7}.button.is-primary.is-loading:after{border-color:transparent transparent #fff #fff!important}.button.is-primary.is-outlined{background-color:transparent;border-color:#239ed7;color:#239ed7}.button.is-primary.is-outlined.is-focused,.button.is-primary.is-outlined.is-hovered,.button.is-primary.is-outlined:focus,.button.is-primary.is-outlined:hover{background-color:#239ed7;border-color:#239ed7;color:#fff}.button.is-primary.is-outlined.is-loading:after{border-color:transparent transparent #239ed7 #239ed7!important}.button.is-primary.is-outlined.is-loading.is-focused:after,.button.is-primary.is-outlined.is-loading.is-hovered:after,.button.is-primary.is-outlined.is-loading:focus:after,.button.is-primary.is-outlined.is-loading:hover:after{border-color:transparent transparent #fff #fff!important}.button.is-primary.is-outlined[disabled],fieldset[disabled] .button.is-primary.is-outlined{background-color:transparent;border-color:#239ed7;-webkit-box-shadow:none;box-shadow:none;color:#239ed7}.button.is-primary.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-primary.is-inverted.is-outlined.is-focused,.button.is-primary.is-inverted.is-outlined.is-hovered,.button.is-primary.is-inverted.is-outlined:focus,.button.is-primary.is-inverted.is-outlined:hover{background-color:#fff;color:#239ed7}.button.is-primary.is-inverted.is-outlined.is-loading.is-focused:after,.button.is-primary.is-inverted.is-outlined.is-loading.is-hovered:after,.button.is-primary.is-inverted.is-outlined.is-loading:focus:after,.button.is-primary.is-inverted.is-outlined.is-loading:hover:after{border-color:transparent transparent #239ed7 #239ed7!important}.button.is-primary.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-primary.is-inverted.is-outlined{background-color:transparent;border-color:#fff;-webkit-box-shadow:none;box-shadow:none;color:#fff}.button.is-link{background-color:#239ed7;border-color:transparent;color:#fff}.button.is-link.is-hovered,.button.is-link:hover{background-color:#2196cc;border-color:transparent;color:#fff}.button.is-link.is-focused,.button.is-link:focus{border-color:transparent;color:#fff}.button.is-link.is-focused:not(:active),.button.is-link:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(35,158,215,.25);box-shadow:0 0 0 .125em rgba(35,158,215,.25)}.button.is-link.is-active,.button.is-link:active{background-color:#1f8ec1;border-color:transparent;color:#fff}.button.is-link[disabled],fieldset[disabled] .button.is-link{background-color:#239ed7;border-color:transparent;-webkit-box-shadow:none;box-shadow:none}.button.is-link.is-inverted{background-color:#fff;color:#239ed7}.button.is-link.is-inverted.is-hovered,.button.is-link.is-inverted:hover{background-color:#f2f2f2}.button.is-link.is-inverted[disabled],fieldset[disabled] .button.is-link.is-inverted{background-color:#fff;border-color:transparent;-webkit-box-shadow:none;box-shadow:none;color:#239ed7}.button.is-link.is-loading:after{border-color:transparent transparent #fff #fff!important}.button.is-link.is-outlined{background-color:transparent;border-color:#239ed7;color:#239ed7}.button.is-link.is-outlined.is-focused,.button.is-link.is-outlined.is-hovered,.button.is-link.is-outlined:focus,.button.is-link.is-outlined:hover{background-color:#239ed7;border-color:#239ed7;color:#fff}.button.is-link.is-outlined.is-loading:after{border-color:transparent transparent #239ed7 #239ed7!important}.button.is-link.is-outlined.is-loading.is-focused:after,.button.is-link.is-outlined.is-loading.is-hovered:after,.button.is-link.is-outlined.is-loading:focus:after,.button.is-link.is-outlined.is-loading:hover:after{border-color:transparent transparent #fff #fff!important}.button.is-link.is-outlined[disabled],fieldset[disabled] .button.is-link.is-outlined{background-color:transparent;border-color:#239ed7;-webkit-box-shadow:none;box-shadow:none;color:#239ed7}.button.is-link.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-link.is-inverted.is-outlined.is-focused,.button.is-link.is-inverted.is-outlined.is-hovered,.button.is-link.is-inverted.is-outlined:focus,.button.is-link.is-inverted.is-outlined:hover{background-color:#fff;color:#239ed7}.button.is-link.is-inverted.is-outlined.is-loading.is-focused:after,.button.is-link.is-inverted.is-outlined.is-loading.is-hovered:after,.button.is-link.is-inverted.is-outlined.is-loading:focus:after,.button.is-link.is-inverted.is-outlined.is-loading:hover:after{border-color:transparent transparent #239ed7 #239ed7!important}.button.is-link.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-link.is-inverted.is-outlined{background-color:transparent;border-color:#fff;-webkit-box-shadow:none;box-shadow:none;color:#fff}.button.is-info{background-color:#209cee;border-color:transparent;color:#fff}.button.is-info.is-hovered,.button.is-info:hover{background-color:#1496ed;border-color:transparent;color:#fff}.button.is-info.is-focused,.button.is-info:focus{border-color:transparent;color:#fff}.button.is-info.is-focused:not(:active),.button.is-info:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(32,156,238,.25);box-shadow:0 0 0 .125em rgba(32,156,238,.25)}.button.is-info.is-active,.button.is-info:active{background-color:#118fe4;border-color:transparent;color:#fff}.button.is-info[disabled],fieldset[disabled] .button.is-info{background-color:#209cee;border-color:transparent;-webkit-box-shadow:none;box-shadow:none}.button.is-info.is-inverted{background-color:#fff;color:#209cee}.button.is-info.is-inverted.is-hovered,.button.is-info.is-inverted:hover{background-color:#f2f2f2}.button.is-info.is-inverted[disabled],fieldset[disabled] .button.is-info.is-inverted{background-color:#fff;border-color:transparent;-webkit-box-shadow:none;box-shadow:none;color:#209cee}.button.is-info.is-loading:after{border-color:transparent transparent #fff #fff!important}.button.is-info.is-outlined{background-color:transparent;border-color:#209cee;color:#209cee}.button.is-info.is-outlined.is-focused,.button.is-info.is-outlined.is-hovered,.button.is-info.is-outlined:focus,.button.is-info.is-outlined:hover{background-color:#209cee;border-color:#209cee;color:#fff}.button.is-info.is-outlined.is-loading:after{border-color:transparent transparent #209cee #209cee!important}.button.is-info.is-outlined.is-loading.is-focused:after,.button.is-info.is-outlined.is-loading.is-hovered:after,.button.is-info.is-outlined.is-loading:focus:after,.button.is-info.is-outlined.is-loading:hover:after{border-color:transparent transparent #fff #fff!important}.button.is-info.is-outlined[disabled],fieldset[disabled] .button.is-info.is-outlined{background-color:transparent;border-color:#209cee;-webkit-box-shadow:none;box-shadow:none;color:#209cee}.button.is-info.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-info.is-inverted.is-outlined.is-focused,.button.is-info.is-inverted.is-outlined.is-hovered,.button.is-info.is-inverted.is-outlined:focus,.button.is-info.is-inverted.is-outlined:hover{background-color:#fff;color:#209cee}.button.is-info.is-inverted.is-outlined.is-loading.is-focused:after,.button.is-info.is-inverted.is-outlined.is-loading.is-hovered:after,.button.is-info.is-inverted.is-outlined.is-loading:focus:after,.button.is-info.is-inverted.is-outlined.is-loading:hover:after{border-color:transparent transparent #209cee #209cee!important}.button.is-info.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-info.is-inverted.is-outlined{background-color:transparent;border-color:#fff;-webkit-box-shadow:none;box-shadow:none;color:#fff}.button.is-success{background-color:#23d160;border-color:transparent;color:#fff}.button.is-success.is-hovered,.button.is-success:hover{background-color:#22c65b;border-color:transparent;color:#fff}.button.is-success.is-focused,.button.is-success:focus{border-color:transparent;color:#fff}.button.is-success.is-focused:not(:active),.button.is-success:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(35,209,96,.25);box-shadow:0 0 0 .125em rgba(35,209,96,.25)}.button.is-success.is-active,.button.is-success:active{background-color:#20bc56;border-color:transparent;color:#fff}.button.is-success[disabled],fieldset[disabled] .button.is-success{background-color:#23d160;border-color:transparent;-webkit-box-shadow:none;box-shadow:none}.button.is-success.is-inverted{background-color:#fff;color:#23d160}.button.is-success.is-inverted.is-hovered,.button.is-success.is-inverted:hover{background-color:#f2f2f2}.button.is-success.is-inverted[disabled],fieldset[disabled] .button.is-success.is-inverted{background-color:#fff;border-color:transparent;-webkit-box-shadow:none;box-shadow:none;color:#23d160}.button.is-success.is-loading:after{border-color:transparent transparent #fff #fff!important}.button.is-success.is-outlined{background-color:transparent;border-color:#23d160;color:#23d160}.button.is-success.is-outlined.is-focused,.button.is-success.is-outlined.is-hovered,.button.is-success.is-outlined:focus,.button.is-success.is-outlined:hover{background-color:#23d160;border-color:#23d160;color:#fff}.button.is-success.is-outlined.is-loading:after{border-color:transparent transparent #23d160 #23d160!important}.button.is-success.is-outlined.is-loading.is-focused:after,.button.is-success.is-outlined.is-loading.is-hovered:after,.button.is-success.is-outlined.is-loading:focus:after,.button.is-success.is-outlined.is-loading:hover:after{border-color:transparent transparent #fff #fff!important}.button.is-success.is-outlined[disabled],fieldset[disabled] .button.is-success.is-outlined{background-color:transparent;border-color:#23d160;-webkit-box-shadow:none;box-shadow:none;color:#23d160}.button.is-success.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-success.is-inverted.is-outlined.is-focused,.button.is-success.is-inverted.is-outlined.is-hovered,.button.is-success.is-inverted.is-outlined:focus,.button.is-success.is-inverted.is-outlined:hover{background-color:#fff;color:#23d160}.button.is-success.is-inverted.is-outlined.is-loading.is-focused:after,.button.is-success.is-inverted.is-outlined.is-loading.is-hovered:after,.button.is-success.is-inverted.is-outlined.is-loading:focus:after,.button.is-success.is-inverted.is-outlined.is-loading:hover:after{border-color:transparent transparent #23d160 #23d160!important}.button.is-success.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-success.is-inverted.is-outlined{background-color:transparent;border-color:#fff;-webkit-box-shadow:none;box-shadow:none;color:#fff}.button.is-warning{background-color:#ffdd57;border-color:transparent;color:rgba(0,0,0,.7)}.button.is-warning.is-hovered,.button.is-warning:hover{background-color:#ffdb4a;border-color:transparent;color:rgba(0,0,0,.7)}.button.is-warning.is-focused,.button.is-warning:focus{border-color:transparent;color:rgba(0,0,0,.7)}.button.is-warning.is-focused:not(:active),.button.is-warning:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(255,221,87,.25);box-shadow:0 0 0 .125em rgba(255,221,87,.25)}.button.is-warning.is-active,.button.is-warning:active{background-color:#ffd83d;border-color:transparent;color:rgba(0,0,0,.7)}.button.is-warning[disabled],fieldset[disabled] .button.is-warning{background-color:#ffdd57;border-color:transparent;-webkit-box-shadow:none;box-shadow:none}.button.is-warning.is-inverted{background-color:rgba(0,0,0,.7);color:#ffdd57}.button.is-warning.is-inverted.is-hovered,.button.is-warning.is-inverted:hover{background-color:rgba(0,0,0,.7)}.button.is-warning.is-inverted[disabled],fieldset[disabled] .button.is-warning.is-inverted{background-color:rgba(0,0,0,.7);border-color:transparent;-webkit-box-shadow:none;box-shadow:none;color:#ffdd57}.button.is-warning.is-loading:after{border-color:transparent transparent rgba(0,0,0,.7) rgba(0,0,0,.7)!important}.button.is-warning.is-outlined{background-color:transparent;border-color:#ffdd57;color:#ffdd57}.button.is-warning.is-outlined.is-focused,.button.is-warning.is-outlined.is-hovered,.button.is-warning.is-outlined:focus,.button.is-warning.is-outlined:hover{background-color:#ffdd57;border-color:#ffdd57;color:rgba(0,0,0,.7)}.button.is-warning.is-outlined.is-loading:after{border-color:transparent transparent #ffdd57 #ffdd57!important}.button.is-warning.is-outlined.is-loading.is-focused:after,.button.is-warning.is-outlined.is-loading.is-hovered:after,.button.is-warning.is-outlined.is-loading:focus:after,.button.is-warning.is-outlined.is-loading:hover:after{border-color:transparent transparent rgba(0,0,0,.7) rgba(0,0,0,.7)!important}.button.is-warning.is-outlined[disabled],fieldset[disabled] .button.is-warning.is-outlined{background-color:transparent;border-color:#ffdd57;-webkit-box-shadow:none;box-shadow:none;color:#ffdd57}.button.is-warning.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0,0,0,.7);color:rgba(0,0,0,.7)}.button.is-warning.is-inverted.is-outlined.is-focused,.button.is-warning.is-inverted.is-outlined.is-hovered,.button.is-warning.is-inverted.is-outlined:focus,.button.is-warning.is-inverted.is-outlined:hover{background-color:rgba(0,0,0,.7);color:#ffdd57}.button.is-warning.is-inverted.is-outlined.is-loading.is-focused:after,.button.is-warning.is-inverted.is-outlined.is-loading.is-hovered:after,.button.is-warning.is-inverted.is-outlined.is-loading:focus:after,.button.is-warning.is-inverted.is-outlined.is-loading:hover:after{border-color:transparent transparent #ffdd57 #ffdd57!important}.button.is-warning.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-warning.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0,0,0,.7);-webkit-box-shadow:none;box-shadow:none;color:rgba(0,0,0,.7)}.button.is-danger{background-color:#ff3860;border-color:transparent;color:#fff}.button.is-danger.is-hovered,.button.is-danger:hover{background-color:#ff2b56;border-color:transparent;color:#fff}.button.is-danger.is-focused,.button.is-danger:focus{border-color:transparent;color:#fff}.button.is-danger.is-focused:not(:active),.button.is-danger:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(255,56,96,.25);box-shadow:0 0 0 .125em rgba(255,56,96,.25)}.button.is-danger.is-active,.button.is-danger:active{background-color:#ff1f4b;border-color:transparent;color:#fff}.button.is-danger[disabled],fieldset[disabled] .button.is-danger{background-color:#ff3860;border-color:transparent;-webkit-box-shadow:none;box-shadow:none}.button.is-danger.is-inverted{background-color:#fff;color:#ff3860}.button.is-danger.is-inverted.is-hovered,.button.is-danger.is-inverted:hover{background-color:#f2f2f2}.button.is-danger.is-inverted[disabled],fieldset[disabled] .button.is-danger.is-inverted{background-color:#fff;border-color:transparent;-webkit-box-shadow:none;box-shadow:none;color:#ff3860}.button.is-danger.is-loading:after{border-color:transparent transparent #fff #fff!important}.button.is-danger.is-outlined{background-color:transparent;border-color:#ff3860;color:#ff3860}.button.is-danger.is-outlined.is-focused,.button.is-danger.is-outlined.is-hovered,.button.is-danger.is-outlined:focus,.button.is-danger.is-outlined:hover{background-color:#ff3860;border-color:#ff3860;color:#fff}.button.is-danger.is-outlined.is-loading:after{border-color:transparent transparent #ff3860 #ff3860!important}.button.is-danger.is-outlined.is-loading.is-focused:after,.button.is-danger.is-outlined.is-loading.is-hovered:after,.button.is-danger.is-outlined.is-loading:focus:after,.button.is-danger.is-outlined.is-loading:hover:after{border-color:transparent transparent #fff #fff!important}.button.is-danger.is-outlined[disabled],fieldset[disabled] .button.is-danger.is-outlined{background-color:transparent;border-color:#ff3860;-webkit-box-shadow:none;box-shadow:none;color:#ff3860}.button.is-danger.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-danger.is-inverted.is-outlined.is-focused,.button.is-danger.is-inverted.is-outlined.is-hovered,.button.is-danger.is-inverted.is-outlined:focus,.button.is-danger.is-inverted.is-outlined:hover{background-color:#fff;color:#ff3860}.button.is-danger.is-inverted.is-outlined.is-loading.is-focused:after,.button.is-danger.is-inverted.is-outlined.is-loading.is-hovered:after,.button.is-danger.is-inverted.is-outlined.is-loading:focus:after,.button.is-danger.is-inverted.is-outlined.is-loading:hover:after{border-color:transparent transparent #ff3860 #ff3860!important}.button.is-danger.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-danger.is-inverted.is-outlined{background-color:transparent;border-color:#fff;-webkit-box-shadow:none;box-shadow:none;color:#fff}.button.is-small{border-radius:2px;font-size:.75rem}.button.is-normal{font-size:1rem}.button.is-medium{font-size:1.25rem}.button.is-large{font-size:1.5rem}.button[disabled],fieldset[disabled] .button{background-color:#fff;border-color:#dbdbdb;-webkit-box-shadow:none;box-shadow:none;opacity:.5}.button.is-fullwidth{display:-ms-flexbox;display:flex;width:100%}.button.is-loading{color:transparent!important;pointer-events:none}.button.is-loading:after{position:absolute;left:calc(50% - (1em / 2));top:calc(50% - (1em / 2));position:absolute!important}.button.is-static{background-color:#f5f5f5;border-color:#dbdbdb;color:#7a7a7a;-webkit-box-shadow:none;box-shadow:none;pointer-events:none}.button.is-rounded{border-radius:290486px;padding-left:1em;padding-right:1em}.buttons{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:start;justify-content:flex-start}.buttons .button{margin-bottom:.5rem}.buttons .button:not(:last-child):not(.is-fullwidth){margin-right:.5rem}.buttons:last-child{margin-bottom:-.5rem}.buttons:not(:last-child){margin-bottom:1rem}.buttons.are-small .button:not(.is-normal):not(.is-medium):not(.is-large){border-radius:2px;font-size:.75rem}.buttons.are-medium .button:not(.is-small):not(.is-normal):not(.is-large){font-size:1.25rem}.buttons.are-large .button:not(.is-small):not(.is-normal):not(.is-medium){font-size:1.5rem}.buttons.has-addons .button:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.buttons.has-addons .button:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0;margin-right:-1px}.buttons.has-addons .button:last-child{margin-right:0}.buttons.has-addons .button.is-hovered,.buttons.has-addons .button:hover{z-index:2}.buttons.has-addons .button.is-active,.buttons.has-addons .button.is-focused,.buttons.has-addons .button.is-selected,.buttons.has-addons .button:active,.buttons.has-addons .button:focus{z-index:3}.buttons.has-addons .button.is-active:hover,.buttons.has-addons .button.is-focused:hover,.buttons.has-addons .button.is-selected:hover,.buttons.has-addons .button:active:hover,.buttons.has-addons .button:focus:hover{z-index:4}.buttons.has-addons .button.is-expanded{-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1}.buttons.is-centered{-ms-flex-pack:center;justify-content:center}.buttons.is-centered:not(.has-addons) .button:not(.is-fullwidth){margin-left:.25rem;margin-right:.25rem}.buttons.is-right{-ms-flex-pack:end;justify-content:flex-end}.buttons.is-right:not(.has-addons) .button:not(.is-fullwidth){margin-left:.25rem;margin-right:.25rem}.container{-ms-flex-positive:1;flex-grow:1;margin:0 auto;position:relative;width:auto}\@media screen and (min-width:1024px){.container{max-width:960px}.container.is-fluid{margin-left:32px;margin-right:32px;max-width:none}}\@media screen and (max-width:1215px){.container.is-widescreen{max-width:1152px}}\@media screen and (max-width:1407px){.container.is-fullhd{max-width:1344px}}\@media screen and (min-width:1216px){.container{max-width:1152px}}\@media screen and (min-width:1408px){.container{max-width:1344px}}.content li+li{margin-top:.25em}.content blockquote:not(:last-child),.content dl:not(:last-child),.content ol:not(:last-child),.content p:not(:last-child),.content pre:not(:last-child),.content table:not(:last-child),.content ul:not(:last-child){margin-bottom:1em}.content h1,.content h2,.content h3,.content h4,.content h5,.content h6{color:#363636;font-weight:600;line-height:1.125}.content h1{font-size:2em;margin-bottom:.5em}.content h1:not(:first-child){margin-top:1em}.content h2{font-size:1.75em;margin-bottom:.5714em}.content h2:not(:first-child){margin-top:1.1428em}.content h3{font-size:1.5em;margin-bottom:.6666em}.content h3:not(:first-child){margin-top:1.3333em}.content h4{font-size:1.25em;margin-bottom:.8em}.content h5{font-size:1.125em;margin-bottom:.8888em}.content h6{font-size:1em;margin-bottom:1em}.content blockquote{background-color:#f5f5f5;border-left:5px solid #dbdbdb;padding:1.25em 1.5em}.content ol{list-style-position:outside;margin-left:2em;margin-top:1em}.content ol:not([type]){list-style-type:decimal}.content ol:not([type]).is-lower-alpha{list-style-type:lower-alpha}.content ol:not([type]).is-lower-roman{list-style-type:lower-roman}.content ol:not([type]).is-upper-alpha{list-style-type:upper-alpha}.content ol:not([type]).is-upper-roman{list-style-type:upper-roman}.content ul{list-style:disc outside;margin-left:2em;margin-top:1em}.content ul ul{list-style-type:circle;margin-top:.5em}.content ul ul ul{list-style-type:square}.content dd{margin-left:2em}.content figure{margin-left:2em;margin-right:2em;text-align:center}.content figure:not(:first-child){margin-top:2em}.content figure:not(:last-child){margin-bottom:2em}.content figure img{display:inline-block}.content figure figcaption{font-style:italic}.content pre{-webkit-overflow-scrolling:touch;overflow-x:auto;padding:1.25em 1.5em;white-space:pre;word-wrap:normal}.content sub,.content sup{font-size:75%}.content table{width:100%}.content table td,.content table th{border:1px solid #dbdbdb;border-width:0 0 1px;padding:.5em .75em;vertical-align:top}.content table th{color:#363636}.content table th:not([align]){text-align:left}.content table thead td,.content table thead th{border-width:0 0 2px;color:#363636}.content table tfoot td,.content table tfoot th{border-width:2px 0 0;color:#363636}.content table tbody tr:last-child td,.content table tbody tr:last-child th{border-bottom-width:0}.content .tabs li+li{margin-top:0}.content.is-small{font-size:.75rem}.content.is-medium{font-size:1.25rem}.content.is-large{font-size:1.5rem}.icon{-ms-flex-align:center;align-items:center;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center;height:1.5rem;width:1.5rem}.icon.is-small{height:1rem;width:1rem}.icon.is-medium{height:2rem;width:2rem}.icon.is-large{height:3rem;width:3rem}.image{display:block;position:relative}.image img{display:block;height:auto;width:100%}.image img.is-rounded{border-radius:290486px}.image.is-1by1 .has-ratio,.image.is-1by1 img,.image.is-1by2 .has-ratio,.image.is-1by2 img,.image.is-1by3 .has-ratio,.image.is-1by3 img,.image.is-2by1 .has-ratio,.image.is-2by1 img,.image.is-2by3 .has-ratio,.image.is-2by3 img,.image.is-3by1 .has-ratio,.image.is-3by1 img,.image.is-3by2 .has-ratio,.image.is-3by2 img,.image.is-3by4 .has-ratio,.image.is-3by4 img,.image.is-3by5 .has-ratio,.image.is-3by5 img,.image.is-4by3 .has-ratio,.image.is-4by3 img,.image.is-4by5 .has-ratio,.image.is-4by5 img,.image.is-5by3 .has-ratio,.image.is-5by3 img,.image.is-5by4 .has-ratio,.image.is-5by4 img,.image.is-9by16 .has-ratio,.image.is-9by16 img,.image.is-16by9 .has-ratio,.image.is-16by9 img,.image.is-square .has-ratio,.image.is-square img{height:100%;width:100%}.image.is-1by1,.image.is-square{padding-top:100%}.image.is-5by4{padding-top:80%}.image.is-4by3{padding-top:75%}.image.is-3by2{padding-top:66.6666%}.image.is-5by3{padding-top:60%}.image.is-16by9{padding-top:56.25%}.image.is-2by1{padding-top:50%}.image.is-3by1{padding-top:33.3333%}.image.is-4by5{padding-top:125%}.image.is-3by4{padding-top:133.3333%}.image.is-2by3{padding-top:150%}.image.is-3by5{padding-top:166.6666%}.image.is-9by16{padding-top:177.7777%}.image.is-1by2{padding-top:200%}.image.is-1by3{padding-top:300%}.image.is-16x16{height:16px;width:16px}.image.is-24x24{height:24px;width:24px}.image.is-32x32{height:32px;width:32px}.image.is-48x48{height:48px;width:48px}.image.is-64x64{height:64px;width:64px}.image.is-96x96{height:96px;width:96px}.image.is-128x128{height:128px;width:128px}.notification{background-color:#f5f5f5;border-radius:4px;padding:1.25rem 2.5rem 1.25rem 1.5rem;position:relative}.notification a:not(.button):not(.dropdown-item){color:currentColor;text-decoration:underline}.notification strong{color:currentColor}.notification code,.notification pre{background:#fff}.notification pre code{background:transparent}.notification>.delete{position:absolute;right:.5rem;top:.5rem}.notification .content,.notification .subtitle,.notification .title{color:currentColor}.notification.is-white{background-color:#fff;color:#0a0a0a}.notification.is-black{background-color:#0a0a0a;color:#fff}.notification.is-light{background-color:#f5f5f5;color:#363636}.notification.is-dark{background-color:#363636;color:#f5f5f5}.notification.is-link,.notification.is-primary{background-color:#239ed7;color:#fff}.notification.is-info{background-color:#209cee;color:#fff}.notification.is-success{background-color:#23d160;color:#fff}.notification.is-warning{background-color:#ffdd57;color:rgba(0,0,0,.7)}.notification.is-danger{background-color:#ff3860;color:#fff}.progress{-moz-appearance:none;-webkit-appearance:none;border:none;border-radius:290486px;display:block;height:1rem;overflow:hidden;padding:0;width:100%}.progress::-webkit-progress-bar{background-color:#dbdbdb}.progress::-webkit-progress-value{background-color:#4a4a4a}.progress::-moz-progress-bar{background-color:#4a4a4a}.progress::-ms-fill{background-color:#4a4a4a;border:none}.progress.is-white::-webkit-progress-value{background-color:#fff}.progress.is-white::-moz-progress-bar{background-color:#fff}.progress.is-white::-ms-fill{background-color:#fff}.progress.is-white:indeterminate{background-image:-webkit-gradient(linear,left top,right top,color-stop(30%,#fff),color-stop(30%,#dbdbdb));background-image:linear-gradient(90deg,#fff 30%,#dbdbdb 0)}.progress.is-black::-webkit-progress-value{background-color:#0a0a0a}.progress.is-black::-moz-progress-bar{background-color:#0a0a0a}.progress.is-black::-ms-fill{background-color:#0a0a0a}.progress.is-black:indeterminate{background-image:-webkit-gradient(linear,left top,right top,color-stop(30%,#0a0a0a),color-stop(30%,#dbdbdb));background-image:linear-gradient(90deg,#0a0a0a 30%,#dbdbdb 0)}.progress.is-light::-webkit-progress-value{background-color:#f5f5f5}.progress.is-light::-moz-progress-bar{background-color:#f5f5f5}.progress.is-light::-ms-fill{background-color:#f5f5f5}.progress.is-light:indeterminate{background-image:-webkit-gradient(linear,left top,right top,color-stop(30%,#f5f5f5),color-stop(30%,#dbdbdb));background-image:linear-gradient(90deg,#f5f5f5 30%,#dbdbdb 0)}.progress.is-dark::-webkit-progress-value{background-color:#363636}.progress.is-dark::-moz-progress-bar{background-color:#363636}.progress.is-dark::-ms-fill{background-color:#363636}.progress.is-dark:indeterminate{background-image:-webkit-gradient(linear,left top,right top,color-stop(30%,#363636),color-stop(30%,#dbdbdb));background-image:linear-gradient(90deg,#363636 30%,#dbdbdb 0)}.progress.is-primary::-webkit-progress-value{background-color:#239ed7}.progress.is-primary::-moz-progress-bar{background-color:#239ed7}.progress.is-primary::-ms-fill{background-color:#239ed7}.progress.is-primary:indeterminate{background-image:-webkit-gradient(linear,left top,right top,color-stop(30%,#239ed7),color-stop(30%,#dbdbdb));background-image:linear-gradient(90deg,#239ed7 30%,#dbdbdb 0)}.progress.is-link::-webkit-progress-value{background-color:#239ed7}.progress.is-link::-moz-progress-bar{background-color:#239ed7}.progress.is-link::-ms-fill{background-color:#239ed7}.progress.is-link:indeterminate{background-image:-webkit-gradient(linear,left top,right top,color-stop(30%,#239ed7),color-stop(30%,#dbdbdb));background-image:linear-gradient(90deg,#239ed7 30%,#dbdbdb 0)}.progress.is-info::-webkit-progress-value{background-color:#209cee}.progress.is-info::-moz-progress-bar{background-color:#209cee}.progress.is-info::-ms-fill{background-color:#209cee}.progress.is-info:indeterminate{background-image:-webkit-gradient(linear,left top,right top,color-stop(30%,#209cee),color-stop(30%,#dbdbdb));background-image:linear-gradient(90deg,#209cee 30%,#dbdbdb 0)}.progress.is-success::-webkit-progress-value{background-color:#23d160}.progress.is-success::-moz-progress-bar{background-color:#23d160}.progress.is-success::-ms-fill{background-color:#23d160}.progress.is-success:indeterminate{background-image:-webkit-gradient(linear,left top,right top,color-stop(30%,#23d160),color-stop(30%,#dbdbdb));background-image:linear-gradient(90deg,#23d160 30%,#dbdbdb 0)}.progress.is-warning::-webkit-progress-value{background-color:#ffdd57}.progress.is-warning::-moz-progress-bar{background-color:#ffdd57}.progress.is-warning::-ms-fill{background-color:#ffdd57}.progress.is-warning:indeterminate{background-image:-webkit-gradient(linear,left top,right top,color-stop(30%,#ffdd57),color-stop(30%,#dbdbdb));background-image:linear-gradient(90deg,#ffdd57 30%,#dbdbdb 0)}.progress.is-danger::-webkit-progress-value{background-color:#ff3860}.progress.is-danger::-moz-progress-bar{background-color:#ff3860}.progress.is-danger::-ms-fill{background-color:#ff3860}.progress.is-danger:indeterminate{background-image:-webkit-gradient(linear,left top,right top,color-stop(30%,#ff3860),color-stop(30%,#dbdbdb));background-image:linear-gradient(90deg,#ff3860 30%,#dbdbdb 0)}.progress:indeterminate{-webkit-animation-duration:1.5s;animation-duration:1.5s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-name:moveIndeterminate;animation-name:moveIndeterminate;-webkit-animation-timing-function:linear;animation-timing-function:linear;background-color:#dbdbdb;background-image:-webkit-gradient(linear,left top,right top,color-stop(30%,#4a4a4a),color-stop(30%,#dbdbdb));background-image:linear-gradient(90deg,#4a4a4a 30%,#dbdbdb 0);background-position:0 0;background-repeat:no-repeat;background-size:150% 150%}.progress:indeterminate::-webkit-progress-bar{background-color:transparent}.progress:indeterminate::-moz-progress-bar{background-color:transparent}.progress.is-small{height:.75rem}.progress.is-medium{height:1.25rem}.progress.is-large{height:1.5rem}\@-webkit-keyframes moveIndeterminate{0%{background-position:200% 0}to{background-position:-200% 0}}\@keyframes moveIndeterminate{0%{background-position:200% 0}to{background-position:-200% 0}}.table{background-color:#fff;color:#363636}.table td,.table th{border:1px solid #dbdbdb;border-width:0 0 1px;padding:.5em .75em;vertical-align:top}.table td.is-white,.table th.is-white{background-color:#fff;border-color:#fff;color:#0a0a0a}.table td.is-black,.table th.is-black{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.table td.is-light,.table th.is-light{background-color:#f5f5f5;border-color:#f5f5f5;color:#363636}.table td.is-dark,.table th.is-dark{background-color:#363636;border-color:#363636;color:#f5f5f5}.table td.is-link,.table td.is-primary,.table th.is-link,.table th.is-primary{background-color:#239ed7;border-color:#239ed7;color:#fff}.table td.is-info,.table th.is-info{background-color:#209cee;border-color:#209cee;color:#fff}.table td.is-success,.table th.is-success{background-color:#23d160;border-color:#23d160;color:#fff}.table td.is-warning,.table th.is-warning{background-color:#ffdd57;border-color:#ffdd57;color:rgba(0,0,0,.7)}.table td.is-danger,.table th.is-danger{background-color:#ff3860;border-color:#ff3860;color:#fff}.table td.is-narrow,.table th.is-narrow{white-space:nowrap;width:1%}.table td.is-selected,.table th.is-selected{background-color:#239ed7;color:#fff}.table td.is-selected a,.table td.is-selected strong,.table th.is-selected a,.table th.is-selected strong{color:currentColor}.table th{color:#363636}.table th:not([align]){text-align:left}.table tr.is-selected{background-color:#239ed7;color:#fff}.table tr.is-selected a,.table tr.is-selected strong{color:currentColor}.table tr.is-selected td,.table tr.is-selected th{border-color:#fff;color:currentColor}.table thead{background-color:transparent}.table thead td,.table thead th{border-width:0 0 2px;color:#363636}.table tfoot{background-color:transparent}.table tfoot td,.table tfoot th{border-width:2px 0 0;color:#363636}.table tbody{background-color:transparent}.table tbody tr:last-child td,.table tbody tr:last-child th{border-bottom-width:0}.table.is-bordered td,.table.is-bordered th{border-width:1px}.table.is-bordered tr:last-child td,.table.is-bordered tr:last-child th{border-bottom-width:1px}.table.is-fullwidth{width:100%}.table.is-hoverable tbody tr:not(.is-selected):hover{background-color:#fafafa}.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover{background-color:#fafafa}.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover:nth-child(2n){background-color:#f5f5f5}.table.is-narrow td,.table.is-narrow th{padding:.25em .5em}.table.is-striped tbody tr:not(.is-selected):nth-child(2n){background-color:#fafafa}.table-container{-webkit-overflow-scrolling:touch;overflow:auto;overflow-y:hidden;max-width:100%}.tags{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:start;justify-content:flex-start}.tags .tag{margin-bottom:.5rem}.tags .tag:not(:last-child){margin-right:.5rem}.tags:last-child{margin-bottom:-.5rem}.tags:not(:last-child){margin-bottom:1rem}.tags.are-medium .tag:not(.is-normal):not(.is-large){font-size:1rem}.tags.are-large .tag:not(.is-normal):not(.is-medium){font-size:1.25rem}.tags.is-centered{-ms-flex-pack:center;justify-content:center}.tags.is-centered .tag{margin-right:.25rem;margin-left:.25rem}.tags.is-right{-ms-flex-pack:end;justify-content:flex-end}.tags.is-right .tag:not(:first-child){margin-left:.5rem}.tags.is-right .tag:not(:last-child){margin-right:0}.tags.has-addons .tag{margin-right:0}.tags.has-addons .tag:not(:first-child){margin-left:0;border-bottom-left-radius:0;border-top-left-radius:0}.tags.has-addons .tag:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}.tag:not(body){-ms-flex-align:center;align-items:center;background-color:#f5f5f5;border-radius:4px;color:#4a4a4a;display:-ms-inline-flexbox;display:inline-flex;font-size:.75rem;height:2em;-ms-flex-pack:center;justify-content:center;line-height:1.5;padding-left:.75em;padding-right:.75em;white-space:nowrap}.tag:not(body) .delete{margin-left:.25rem;margin-right:-.375rem}.tag:not(body).is-white{background-color:#fff;color:#0a0a0a}.tag:not(body).is-black{background-color:#0a0a0a;color:#fff}.tag:not(body).is-light{background-color:#f5f5f5;color:#363636}.tag:not(body).is-dark{background-color:#363636;color:#f5f5f5}.tag:not(body).is-primary{background-color:#239ed7;color:#fff}.tag:not(body).is-link{background-color:#239ed7;color:#fff}.tag:not(body).is-info{background-color:#209cee;color:#fff}.tag:not(body).is-success{background-color:#23d160;color:#fff}.tag:not(body).is-warning{background-color:#ffdd57;color:rgba(0,0,0,.7)}.tag:not(body).is-danger{background-color:#ff3860;color:#fff}.tag:not(body).is-normal{font-size:.75rem}.tag:not(body).is-medium{font-size:1rem}.tag:not(body).is-large{font-size:1.25rem}.tag:not(body) .icon:first-child:not(:last-child){margin-left:-.375em;margin-right:.1875em}.tag:not(body) .icon:last-child:not(:first-child){margin-left:.1875em;margin-right:-.375em}.tag:not(body) .icon:first-child:last-child{margin-left:-.375em;margin-right:-.375em}.tag:not(body).is-delete{margin-left:1px;padding:0;position:relative;width:2em}.tag:not(body).is-delete:after,.tag:not(body).is-delete:before{background-color:currentColor;content:\"\";display:block;left:50%;position:absolute;top:50%;-webkit-transform:translateX(-50%) translateY(-50%) rotate(45deg);transform:translateX(-50%) translateY(-50%) rotate(45deg);-webkit-transform-origin:center center;transform-origin:center center}.tag:not(body).is-delete:before{height:1px;width:50%}.tag:not(body).is-delete:after{height:50%;width:1px}.tag:not(body).is-delete:focus,.tag:not(body).is-delete:hover{background-color:#e8e8e8}.tag:not(body).is-delete:active{background-color:#dbdbdb}.tag:not(body).is-rounded{border-radius:290486px}a.tag:hover{text-decoration:underline}.subtitle,.title{word-break:break-word}.subtitle em,.subtitle span,.title em,.title span{font-weight:inherit}.subtitle sub,.subtitle sup,.title sub,.title sup{font-size:.75em}.subtitle .tag,.title .tag{vertical-align:middle}.title{color:#363636;font-size:2rem;font-weight:600;line-height:1.125}.title strong{color:inherit;font-weight:inherit}.title+.highlight{margin-top:-.75rem}.title:not(.is-spaced)+.subtitle{margin-top:-1.25rem}.title.is-1{font-size:3rem}.title.is-2{font-size:2.5rem}.title.is-3{font-size:2rem}.title.is-4{font-size:1.5rem}.title.is-5{font-size:1.25rem}.title.is-6{font-size:1rem}.title.is-7{font-size:.75rem}.subtitle{color:#4a4a4a;font-size:1.25rem;font-weight:400;line-height:1.25}.subtitle strong{color:#363636;font-weight:600}.subtitle:not(.is-spaced)+.title{margin-top:-1.25rem}.subtitle.is-1{font-size:3rem}.subtitle.is-2{font-size:2.5rem}.subtitle.is-3{font-size:2rem}.subtitle.is-4{font-size:1.5rem}.subtitle.is-5{font-size:1.25rem}.subtitle.is-6{font-size:1rem}.subtitle.is-7{font-size:.75rem}.heading{display:block;font-size:11px;font-size:.6875rem;letter-spacing:1px;letter-spacing:.0625rem;margin-bottom:5px;text-transform:uppercase}.highlight{font-weight:400;max-width:100%;overflow:hidden;padding:0}.highlight pre{overflow:auto;max-width:100%}.number{-ms-flex-align:center;align-items:center;background-color:#f5f5f5;border-radius:290486px;display:-ms-inline-flexbox;display:inline-flex;font-size:1.25rem;height:2em;-ms-flex-pack:center;justify-content:center;margin-right:1.5rem;min-width:2.5em;padding:.25rem .5rem;text-align:center;vertical-align:top}.input,.select select,.textarea{background-color:#fff;border-color:#dbdbdb;border-radius:4px;color:#363636}.input::-moz-placeholder,.select select::-moz-placeholder,.textarea::-moz-placeholder{color:rgba(54,54,54,.3)}.input::-webkit-input-placeholder,.select select::-webkit-input-placeholder,.textarea::-webkit-input-placeholder{color:rgba(54,54,54,.3)}.input:-moz-placeholder,.select select:-moz-placeholder,.textarea:-moz-placeholder{color:rgba(54,54,54,.3)}.input:-ms-input-placeholder,.select select:-ms-input-placeholder,.textarea:-ms-input-placeholder{color:rgba(54,54,54,.3)}.input:hover,.is-hovered.input,.is-hovered.textarea,.select select.is-hovered,.select select:hover,.textarea:hover{border-color:#b5b5b5}.input:active,.input:focus,.is-active.input,.is-active.textarea,.is-focused.input,.is-focused.textarea,.select select.is-active,.select select.is-focused,.select select:active,.select select:focus,.textarea:active,.textarea:focus{border-color:#239ed7;-webkit-box-shadow:0 0 0 .125em rgba(35,158,215,.25);box-shadow:0 0 0 .125em rgba(35,158,215,.25)}.select fieldset[disabled] select,.select select[disabled],[disabled].input,[disabled].textarea,fieldset[disabled] .input,fieldset[disabled] .select select,fieldset[disabled] .textarea{background-color:#f5f5f5;border-color:#f5f5f5;-webkit-box-shadow:none;box-shadow:none;color:#7a7a7a}.select fieldset[disabled] select::-moz-placeholder,.select select[disabled]::-moz-placeholder,[disabled].input::-moz-placeholder,[disabled].textarea::-moz-placeholder,fieldset[disabled] .input::-moz-placeholder,fieldset[disabled] .select select::-moz-placeholder,fieldset[disabled] .textarea::-moz-placeholder{color:hsla(0,0%,47.8%,.3)}.select fieldset[disabled] select::-webkit-input-placeholder,.select select[disabled]::-webkit-input-placeholder,[disabled].input::-webkit-input-placeholder,[disabled].textarea::-webkit-input-placeholder,fieldset[disabled] .input::-webkit-input-placeholder,fieldset[disabled] .select select::-webkit-input-placeholder,fieldset[disabled] .textarea::-webkit-input-placeholder{color:hsla(0,0%,47.8%,.3)}.select fieldset[disabled] select:-moz-placeholder,.select select[disabled]:-moz-placeholder,[disabled].input:-moz-placeholder,[disabled].textarea:-moz-placeholder,fieldset[disabled] .input:-moz-placeholder,fieldset[disabled] .select select:-moz-placeholder,fieldset[disabled] .textarea:-moz-placeholder{color:hsla(0,0%,47.8%,.3)}.select fieldset[disabled] select:-ms-input-placeholder,.select select[disabled]:-ms-input-placeholder,[disabled].input:-ms-input-placeholder,[disabled].textarea:-ms-input-placeholder,fieldset[disabled] .input:-ms-input-placeholder,fieldset[disabled] .select select:-ms-input-placeholder,fieldset[disabled] .textarea:-ms-input-placeholder{color:hsla(0,0%,47.8%,.3)}.input,.textarea{-webkit-box-shadow:inset 0 1px 2px rgba(10,10,10,.1);box-shadow:inset 0 1px 2px rgba(10,10,10,.1);max-width:100%;width:100%}[readonly].input,[readonly].textarea{-webkit-box-shadow:none;box-shadow:none}.is-white.input,.is-white.textarea{border-color:#fff}.is-white.input:active,.is-white.input:focus,.is-white.is-active.input,.is-white.is-active.textarea,.is-white.is-focused.input,.is-white.is-focused.textarea,.is-white.textarea:active,.is-white.textarea:focus{-webkit-box-shadow:0 0 0 .125em hsla(0,0%,100%,.25);box-shadow:0 0 0 .125em hsla(0,0%,100%,.25)}.is-black.input,.is-black.textarea{border-color:#0a0a0a}.is-black.input:active,.is-black.input:focus,.is-black.is-active.input,.is-black.is-active.textarea,.is-black.is-focused.input,.is-black.is-focused.textarea,.is-black.textarea:active,.is-black.textarea:focus{-webkit-box-shadow:0 0 0 .125em rgba(10,10,10,.25);box-shadow:0 0 0 .125em rgba(10,10,10,.25)}.is-light.input,.is-light.textarea{border-color:#f5f5f5}.is-light.input:active,.is-light.input:focus,.is-light.is-active.input,.is-light.is-active.textarea,.is-light.is-focused.input,.is-light.is-focused.textarea,.is-light.textarea:active,.is-light.textarea:focus{-webkit-box-shadow:0 0 0 .125em hsla(0,0%,96.1%,.25);box-shadow:0 0 0 .125em hsla(0,0%,96.1%,.25)}.is-dark.input,.is-dark.textarea{border-color:#363636}.is-dark.input:active,.is-dark.input:focus,.is-dark.is-active.input,.is-dark.is-active.textarea,.is-dark.is-focused.input,.is-dark.is-focused.textarea,.is-dark.textarea:active,.is-dark.textarea:focus{-webkit-box-shadow:0 0 0 .125em rgba(54,54,54,.25);box-shadow:0 0 0 .125em rgba(54,54,54,.25)}.is-primary.input,.is-primary.textarea{border-color:#239ed7}.is-primary.input:active,.is-primary.input:focus,.is-primary.is-active.input,.is-primary.is-active.textarea,.is-primary.is-focused.input,.is-primary.is-focused.textarea,.is-primary.textarea:active,.is-primary.textarea:focus{-webkit-box-shadow:0 0 0 .125em rgba(35,158,215,.25);box-shadow:0 0 0 .125em rgba(35,158,215,.25)}.is-link.input,.is-link.textarea{border-color:#239ed7}.is-link.input:active,.is-link.input:focus,.is-link.is-active.input,.is-link.is-active.textarea,.is-link.is-focused.input,.is-link.is-focused.textarea,.is-link.textarea:active,.is-link.textarea:focus{-webkit-box-shadow:0 0 0 .125em rgba(35,158,215,.25);box-shadow:0 0 0 .125em rgba(35,158,215,.25)}.is-info.input,.is-info.textarea{border-color:#209cee}.is-info.input:active,.is-info.input:focus,.is-info.is-active.input,.is-info.is-active.textarea,.is-info.is-focused.input,.is-info.is-focused.textarea,.is-info.textarea:active,.is-info.textarea:focus{-webkit-box-shadow:0 0 0 .125em rgba(32,156,238,.25);box-shadow:0 0 0 .125em rgba(32,156,238,.25)}.is-success.input,.is-success.textarea{border-color:#23d160}.is-success.input:active,.is-success.input:focus,.is-success.is-active.input,.is-success.is-active.textarea,.is-success.is-focused.input,.is-success.is-focused.textarea,.is-success.textarea:active,.is-success.textarea:focus{-webkit-box-shadow:0 0 0 .125em rgba(35,209,96,.25);box-shadow:0 0 0 .125em rgba(35,209,96,.25)}.is-warning.input,.is-warning.textarea{border-color:#ffdd57}.is-warning.input:active,.is-warning.input:focus,.is-warning.is-active.input,.is-warning.is-active.textarea,.is-warning.is-focused.input,.is-warning.is-focused.textarea,.is-warning.textarea:active,.is-warning.textarea:focus{-webkit-box-shadow:0 0 0 .125em rgba(255,221,87,.25);box-shadow:0 0 0 .125em rgba(255,221,87,.25)}.is-danger.input,.is-danger.textarea{border-color:#ff3860}.is-danger.input:active,.is-danger.input:focus,.is-danger.is-active.input,.is-danger.is-active.textarea,.is-danger.is-focused.input,.is-danger.is-focused.textarea,.is-danger.textarea:active,.is-danger.textarea:focus{-webkit-box-shadow:0 0 0 .125em rgba(255,56,96,.25);box-shadow:0 0 0 .125em rgba(255,56,96,.25)}.is-small.input,.is-small.textarea{border-radius:2px;font-size:.75rem}.is-medium.input,.is-medium.textarea{font-size:1.25rem}.is-large.input,.is-large.textarea{font-size:1.5rem}.is-fullwidth.input,.is-fullwidth.textarea{display:block;width:100%}.is-inline.input,.is-inline.textarea{display:inline;width:auto}.input.is-rounded{border-radius:290486px;padding-left:1em;padding-right:1em}.input.is-static{background-color:transparent;border-color:transparent;-webkit-box-shadow:none;box-shadow:none;padding-left:0;padding-right:0}.textarea{display:block;max-width:100%;min-width:100%;padding:.625em;resize:vertical}.textarea:not([rows]){max-height:600px;min-height:120px}.textarea[rows]{height:auto}.textarea.has-fixed-size{resize:none}.checkbox,.radio{cursor:pointer;display:inline-block;line-height:1.25;position:relative}.checkbox input,.radio input{cursor:pointer}.checkbox:hover,.radio:hover{color:#363636}[disabled].checkbox,[disabled].radio,fieldset[disabled] .checkbox,fieldset[disabled] .radio{color:#7a7a7a;cursor:not-allowed}.radio+.radio{margin-left:.5em}.select{display:inline-block;max-width:100%;position:relative;vertical-align:top}.select:not(.is-multiple){height:2.25em}.select:not(.is-multiple):not(.is-loading):after{border-color:#239ed7;right:1.125em;z-index:4}.select.is-rounded select{border-radius:290486px;padding-left:1em}.select select{cursor:pointer;display:block;font-size:1em;max-width:100%;outline:none}.select select::-ms-expand{display:none}.select select[disabled]:hover,fieldset[disabled] .select select:hover{border-color:#f5f5f5}.select select:not([multiple]){padding-right:2.5em}.select select[multiple]{height:auto;padding:0}.select select[multiple] option{padding:.5em 1em}.select:not(.is-multiple):not(.is-loading):hover:after{border-color:#363636}.select.is-white:not(:hover):after{border-color:#fff}.select.is-white select{border-color:#fff}.select.is-white select.is-hovered,.select.is-white select:hover{border-color:#f2f2f2}.select.is-white select.is-active,.select.is-white select.is-focused,.select.is-white select:active,.select.is-white select:focus{-webkit-box-shadow:0 0 0 .125em hsla(0,0%,100%,.25);box-shadow:0 0 0 .125em hsla(0,0%,100%,.25)}.select.is-black:not(:hover):after{border-color:#0a0a0a}.select.is-black select{border-color:#0a0a0a}.select.is-black select.is-hovered,.select.is-black select:hover{border-color:#000}.select.is-black select.is-active,.select.is-black select.is-focused,.select.is-black select:active,.select.is-black select:focus{-webkit-box-shadow:0 0 0 .125em rgba(10,10,10,.25);box-shadow:0 0 0 .125em rgba(10,10,10,.25)}.select.is-light:not(:hover):after{border-color:#f5f5f5}.select.is-light select{border-color:#f5f5f5}.select.is-light select.is-hovered,.select.is-light select:hover{border-color:#e8e8e8}.select.is-light select.is-active,.select.is-light select.is-focused,.select.is-light select:active,.select.is-light select:focus{-webkit-box-shadow:0 0 0 .125em hsla(0,0%,96.1%,.25);box-shadow:0 0 0 .125em hsla(0,0%,96.1%,.25)}.select.is-dark:not(:hover):after{border-color:#363636}.select.is-dark select{border-color:#363636}.select.is-dark select.is-hovered,.select.is-dark select:hover{border-color:#292929}.select.is-dark select.is-active,.select.is-dark select.is-focused,.select.is-dark select:active,.select.is-dark select:focus{-webkit-box-shadow:0 0 0 .125em rgba(54,54,54,.25);box-shadow:0 0 0 .125em rgba(54,54,54,.25)}.select.is-primary:not(:hover):after{border-color:#239ed7}.select.is-primary select{border-color:#239ed7}.select.is-primary select.is-hovered,.select.is-primary select:hover{border-color:#1f8ec1}.select.is-primary select.is-active,.select.is-primary select.is-focused,.select.is-primary select:active,.select.is-primary select:focus{-webkit-box-shadow:0 0 0 .125em rgba(35,158,215,.25);box-shadow:0 0 0 .125em rgba(35,158,215,.25)}.select.is-link:not(:hover):after{border-color:#239ed7}.select.is-link select{border-color:#239ed7}.select.is-link select.is-hovered,.select.is-link select:hover{border-color:#1f8ec1}.select.is-link select.is-active,.select.is-link select.is-focused,.select.is-link select:active,.select.is-link select:focus{-webkit-box-shadow:0 0 0 .125em rgba(35,158,215,.25);box-shadow:0 0 0 .125em rgba(35,158,215,.25)}.select.is-info:not(:hover):after{border-color:#209cee}.select.is-info select{border-color:#209cee}.select.is-info select.is-hovered,.select.is-info select:hover{border-color:#118fe4}.select.is-info select.is-active,.select.is-info select.is-focused,.select.is-info select:active,.select.is-info select:focus{-webkit-box-shadow:0 0 0 .125em rgba(32,156,238,.25);box-shadow:0 0 0 .125em rgba(32,156,238,.25)}.select.is-success:not(:hover):after{border-color:#23d160}.select.is-success select{border-color:#23d160}.select.is-success select.is-hovered,.select.is-success select:hover{border-color:#20bc56}.select.is-success select.is-active,.select.is-success select.is-focused,.select.is-success select:active,.select.is-success select:focus{-webkit-box-shadow:0 0 0 .125em rgba(35,209,96,.25);box-shadow:0 0 0 .125em rgba(35,209,96,.25)}.select.is-warning:not(:hover):after{border-color:#ffdd57}.select.is-warning select{border-color:#ffdd57}.select.is-warning select.is-hovered,.select.is-warning select:hover{border-color:#ffd83d}.select.is-warning select.is-active,.select.is-warning select.is-focused,.select.is-warning select:active,.select.is-warning select:focus{-webkit-box-shadow:0 0 0 .125em rgba(255,221,87,.25);box-shadow:0 0 0 .125em rgba(255,221,87,.25)}.select.is-danger:not(:hover):after{border-color:#ff3860}.select.is-danger select{border-color:#ff3860}.select.is-danger select.is-hovered,.select.is-danger select:hover{border-color:#ff1f4b}.select.is-danger select.is-active,.select.is-danger select.is-focused,.select.is-danger select:active,.select.is-danger select:focus{-webkit-box-shadow:0 0 0 .125em rgba(255,56,96,.25);box-shadow:0 0 0 .125em rgba(255,56,96,.25)}.select.is-small{border-radius:2px;font-size:.75rem}.select.is-medium{font-size:1.25rem}.select.is-large{font-size:1.5rem}.select.is-disabled:after{border-color:#7a7a7a}.select.is-fullwidth,.select.is-fullwidth select{width:100%}.select.is-loading:after{margin-top:0;position:absolute;right:.625em;top:.625em;-webkit-transform:none;transform:none}.select.is-loading.is-small:after{font-size:.75rem}.select.is-loading.is-medium:after{font-size:1.25rem}.select.is-loading.is-large:after{font-size:1.5rem}.file{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;position:relative}.file.is-white .file-cta{background-color:#fff;border-color:transparent;color:#0a0a0a}.file.is-white.is-hovered .file-cta,.file.is-white:hover .file-cta{background-color:#f9f9f9;border-color:transparent;color:#0a0a0a}.file.is-white.is-focused .file-cta,.file.is-white:focus .file-cta{border-color:transparent;-webkit-box-shadow:0 0 .5em hsla(0,0%,100%,.25);box-shadow:0 0 .5em hsla(0,0%,100%,.25);color:#0a0a0a}.file.is-white.is-active .file-cta,.file.is-white:active .file-cta{background-color:#f2f2f2;border-color:transparent;color:#0a0a0a}.file.is-black .file-cta{background-color:#0a0a0a;border-color:transparent;color:#fff}.file.is-black.is-hovered .file-cta,.file.is-black:hover .file-cta{background-color:#040404;border-color:transparent;color:#fff}.file.is-black.is-focused .file-cta,.file.is-black:focus .file-cta{border-color:transparent;-webkit-box-shadow:0 0 .5em rgba(10,10,10,.25);box-shadow:0 0 .5em rgba(10,10,10,.25);color:#fff}.file.is-black.is-active .file-cta,.file.is-black:active .file-cta{background-color:#000;border-color:transparent;color:#fff}.file.is-light .file-cta{background-color:#f5f5f5;border-color:transparent;color:#363636}.file.is-light.is-hovered .file-cta,.file.is-light:hover .file-cta{background-color:#eee;border-color:transparent;color:#363636}.file.is-light.is-focused .file-cta,.file.is-light:focus .file-cta{border-color:transparent;-webkit-box-shadow:0 0 .5em hsla(0,0%,96.1%,.25);box-shadow:0 0 .5em hsla(0,0%,96.1%,.25);color:#363636}.file.is-light.is-active .file-cta,.file.is-light:active .file-cta{background-color:#e8e8e8;border-color:transparent;color:#363636}.file.is-dark .file-cta{background-color:#363636;border-color:transparent;color:#f5f5f5}.file.is-dark.is-hovered .file-cta,.file.is-dark:hover .file-cta{background-color:#2f2f2f;border-color:transparent;color:#f5f5f5}.file.is-dark.is-focused .file-cta,.file.is-dark:focus .file-cta{border-color:transparent;-webkit-box-shadow:0 0 .5em rgba(54,54,54,.25);box-shadow:0 0 .5em rgba(54,54,54,.25);color:#f5f5f5}.file.is-dark.is-active .file-cta,.file.is-dark:active .file-cta{background-color:#292929;border-color:transparent;color:#f5f5f5}.file.is-primary .file-cta{background-color:#239ed7;border-color:transparent;color:#fff}.file.is-primary.is-hovered .file-cta,.file.is-primary:hover .file-cta{background-color:#2196cc;border-color:transparent;color:#fff}.file.is-primary.is-focused .file-cta,.file.is-primary:focus .file-cta{border-color:transparent;-webkit-box-shadow:0 0 .5em rgba(35,158,215,.25);box-shadow:0 0 .5em rgba(35,158,215,.25);color:#fff}.file.is-primary.is-active .file-cta,.file.is-primary:active .file-cta{background-color:#1f8ec1;border-color:transparent;color:#fff}.file.is-link .file-cta{background-color:#239ed7;border-color:transparent;color:#fff}.file.is-link.is-hovered .file-cta,.file.is-link:hover .file-cta{background-color:#2196cc;border-color:transparent;color:#fff}.file.is-link.is-focused .file-cta,.file.is-link:focus .file-cta{border-color:transparent;-webkit-box-shadow:0 0 .5em rgba(35,158,215,.25);box-shadow:0 0 .5em rgba(35,158,215,.25);color:#fff}.file.is-link.is-active .file-cta,.file.is-link:active .file-cta{background-color:#1f8ec1;border-color:transparent;color:#fff}.file.is-info .file-cta{background-color:#209cee;border-color:transparent;color:#fff}.file.is-info.is-hovered .file-cta,.file.is-info:hover .file-cta{background-color:#1496ed;border-color:transparent;color:#fff}.file.is-info.is-focused .file-cta,.file.is-info:focus .file-cta{border-color:transparent;-webkit-box-shadow:0 0 .5em rgba(32,156,238,.25);box-shadow:0 0 .5em rgba(32,156,238,.25);color:#fff}.file.is-info.is-active .file-cta,.file.is-info:active .file-cta{background-color:#118fe4;border-color:transparent;color:#fff}.file.is-success .file-cta{background-color:#23d160;border-color:transparent;color:#fff}.file.is-success.is-hovered .file-cta,.file.is-success:hover .file-cta{background-color:#22c65b;border-color:transparent;color:#fff}.file.is-success.is-focused .file-cta,.file.is-success:focus .file-cta{border-color:transparent;-webkit-box-shadow:0 0 .5em rgba(35,209,96,.25);box-shadow:0 0 .5em rgba(35,209,96,.25);color:#fff}.file.is-success.is-active .file-cta,.file.is-success:active .file-cta{background-color:#20bc56;border-color:transparent;color:#fff}.file.is-warning .file-cta{background-color:#ffdd57;border-color:transparent;color:rgba(0,0,0,.7)}.file.is-warning.is-hovered .file-cta,.file.is-warning:hover .file-cta{background-color:#ffdb4a;border-color:transparent;color:rgba(0,0,0,.7)}.file.is-warning.is-focused .file-cta,.file.is-warning:focus .file-cta{border-color:transparent;-webkit-box-shadow:0 0 .5em rgba(255,221,87,.25);box-shadow:0 0 .5em rgba(255,221,87,.25);color:rgba(0,0,0,.7)}.file.is-warning.is-active .file-cta,.file.is-warning:active .file-cta{background-color:#ffd83d;border-color:transparent;color:rgba(0,0,0,.7)}.file.is-danger .file-cta{background-color:#ff3860;border-color:transparent;color:#fff}.file.is-danger.is-hovered .file-cta,.file.is-danger:hover .file-cta{background-color:#ff2b56;border-color:transparent;color:#fff}.file.is-danger.is-focused .file-cta,.file.is-danger:focus .file-cta{border-color:transparent;-webkit-box-shadow:0 0 .5em rgba(255,56,96,.25);box-shadow:0 0 .5em rgba(255,56,96,.25);color:#fff}.file.is-danger.is-active .file-cta,.file.is-danger:active .file-cta{background-color:#ff1f4b;border-color:transparent;color:#fff}.file.is-small{font-size:.75rem}.file.is-medium{font-size:1.25rem}.file.is-medium .file-icon .fa{font-size:21px;font-size:1.3125rem}.file.is-large{font-size:1.5rem}.file.is-large .file-icon .fa{font-size:28px;font-size:1.75rem}.file.has-name .file-cta{border-bottom-right-radius:0;border-top-right-radius:0}.file.has-name .file-name{border-bottom-left-radius:0;border-top-left-radius:0}.file.has-name.is-empty .file-cta{border-radius:4px}.file.has-name.is-empty .file-name{display:none}.file.is-boxed .file-cta,.file.is-boxed .file-label{-ms-flex-direction:column;flex-direction:column}.file.is-boxed .file-cta{height:auto;padding:1em 3em}.file.is-boxed .file-name{border-width:0 1px 1px}.file.is-boxed .file-icon{height:1.5em;width:1.5em}.file.is-boxed .file-icon .fa{font-size:21px;font-size:1.3125rem}.file.is-boxed.is-small .file-icon .fa{font-size:14px;font-size:.875rem}.file.is-boxed.is-medium .file-icon .fa{font-size:28px;font-size:1.75rem}.file.is-boxed.is-large .file-icon .fa{font-size:35px;font-size:2.1875rem}.file.is-boxed.has-name .file-cta{border-radius:4px 4px 0 0}.file.is-boxed.has-name .file-name{border-radius:0 0 4px 4px;border-width:0 1px 1px}.file.is-centered{-ms-flex-pack:center;justify-content:center}.file.is-fullwidth .file-label{width:100%}.file.is-fullwidth .file-name{-ms-flex-positive:1;flex-grow:1;max-width:none}.file.is-right{-ms-flex-pack:end;justify-content:flex-end}.file.is-right .file-cta{border-radius:0 4px 4px 0}.file.is-right .file-name{border-radius:4px 0 0 4px;border-width:1px 0 1px 1px;-ms-flex-order:-1;order:-1}.file-label{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex;cursor:pointer;-ms-flex-pack:start;justify-content:flex-start;overflow:hidden;position:relative}.file-label:hover .file-cta{background-color:#eee;color:#363636}.file-label:hover .file-name{border-color:#d5d5d5}.file-label:active .file-cta{background-color:#e8e8e8;color:#363636}.file-label:active .file-name{border-color:#cfcfcf}.file-input{height:100%;left:0;opacity:0;outline:none;position:absolute;top:0;width:100%}.file-cta,.file-name{border-color:#dbdbdb;border-radius:4px;font-size:1em;padding-left:1em;padding-right:1em;white-space:nowrap}.file-cta{background-color:#f5f5f5;color:#4a4a4a}.file-name{border-color:#dbdbdb;border-style:solid;border-width:1px 1px 1px 0;display:block;max-width:16em;overflow:hidden;text-align:left;text-overflow:ellipsis}.file-icon{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;height:1em;-ms-flex-pack:center;justify-content:center;margin-right:.5em;width:1em}.file-icon .fa{font-size:14px;font-size:.875rem}.label{color:#363636;display:block;font-size:1rem}.label:not(:last-child){margin-bottom:.5em}.label.is-small{font-size:.75rem}.label.is-medium{font-size:1.25rem}.label.is-large{font-size:1.5rem}.help{display:block;font-size:.75rem;margin-top:.25rem}.help.is-white{color:#fff}.help.is-black{color:#0a0a0a}.help.is-light{color:#f5f5f5}.help.is-dark{color:#363636}.help.is-link,.help.is-primary{color:#239ed7}.help.is-info{color:#209cee}.help.is-success{color:#23d160}.help.is-warning{color:#ffdd57}.help.is-danger{color:#ff3860}.field:not(:last-child){margin-bottom:.75rem}.field.has-addons{display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start}.field.has-addons .control:not(:last-child){margin-right:-1px}.field.has-addons .control:not(:first-child):not(:last-child) .button,.field.has-addons .control:not(:first-child):not(:last-child) .input,.field.has-addons .control:not(:first-child):not(:last-child) .select select{border-radius:0}.field.has-addons .control:first-child:not(:only-child) .button,.field.has-addons .control:first-child:not(:only-child) .input,.field.has-addons .control:first-child:not(:only-child) .select select{border-bottom-right-radius:0;border-top-right-radius:0}.field.has-addons .control:last-child:not(:only-child) .button,.field.has-addons .control:last-child:not(:only-child) .input,.field.has-addons .control:last-child:not(:only-child) .select select{border-bottom-left-radius:0;border-top-left-radius:0}.field.has-addons .control .button:not([disabled]).is-hovered,.field.has-addons .control .button:not([disabled]):hover,.field.has-addons .control .input:not([disabled]).is-hovered,.field.has-addons .control .input:not([disabled]):hover,.field.has-addons .control .select select:not([disabled]).is-hovered,.field.has-addons .control .select select:not([disabled]):hover{z-index:2}.field.has-addons .control .button:not([disabled]).is-active,.field.has-addons .control .button:not([disabled]).is-focused,.field.has-addons .control .button:not([disabled]):active,.field.has-addons .control .button:not([disabled]):focus,.field.has-addons .control .input:not([disabled]).is-active,.field.has-addons .control .input:not([disabled]).is-focused,.field.has-addons .control .input:not([disabled]):active,.field.has-addons .control .input:not([disabled]):focus,.field.has-addons .control .select select:not([disabled]).is-active,.field.has-addons .control .select select:not([disabled]).is-focused,.field.has-addons .control .select select:not([disabled]):active,.field.has-addons .control .select select:not([disabled]):focus{z-index:3}.field.has-addons .control .button:not([disabled]).is-active:hover,.field.has-addons .control .button:not([disabled]).is-focused:hover,.field.has-addons .control .button:not([disabled]):active:hover,.field.has-addons .control .button:not([disabled]):focus:hover,.field.has-addons .control .input:not([disabled]).is-active:hover,.field.has-addons .control .input:not([disabled]).is-focused:hover,.field.has-addons .control .input:not([disabled]):active:hover,.field.has-addons .control .input:not([disabled]):focus:hover,.field.has-addons .control .select select:not([disabled]).is-active:hover,.field.has-addons .control .select select:not([disabled]).is-focused:hover,.field.has-addons .control .select select:not([disabled]):active:hover,.field.has-addons .control .select select:not([disabled]):focus:hover{z-index:4}.field.has-addons .control.is-expanded{-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1}.field.has-addons.has-addons-centered{-ms-flex-pack:center;justify-content:center}.field.has-addons.has-addons-right{-ms-flex-pack:end;justify-content:flex-end}.field.has-addons.has-addons-fullwidth .control{-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:0;flex-shrink:0}.field.is-grouped{display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start}.field.is-grouped>.control{-ms-flex-negative:0;flex-shrink:0}.field.is-grouped>.control:not(:last-child){margin-bottom:0;margin-right:.75rem}.field.is-grouped>.control.is-expanded{-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1}.field.is-grouped.is-grouped-centered{-ms-flex-pack:center;justify-content:center}.field.is-grouped.is-grouped-right{-ms-flex-pack:end;justify-content:flex-end}.field.is-grouped.is-grouped-multiline{-ms-flex-wrap:wrap;flex-wrap:wrap}.field.is-grouped.is-grouped-multiline>.control:last-child,.field.is-grouped.is-grouped-multiline>.control:not(:last-child){margin-bottom:.75rem}.field.is-grouped.is-grouped-multiline:last-child{margin-bottom:-.75rem}.field.is-grouped.is-grouped-multiline:not(:last-child){margin-bottom:0}\@media print,screen and (min-width:769px){.field.is-horizontal{display:-ms-flexbox;display:flex}}.field-label .label{font-size:inherit}\@media screen and (max-width:768px){.field-label{margin-bottom:.5rem}}\@media print,screen and (min-width:769px){.field-label{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:0;flex-shrink:0;margin-right:1.5rem;text-align:right}.field-label.is-small{font-size:.75rem;padding-top:.375em}.field-label.is-normal{padding-top:.375em}.field-label.is-medium{font-size:1.25rem;padding-top:.375em}.field-label.is-large{font-size:1.5rem;padding-top:.375em}}.field-body .field .field{margin-bottom:0}\@media print,screen and (min-width:769px){.field-body{display:-ms-flexbox;display:flex;-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:5;flex-grow:5;-ms-flex-negative:1;flex-shrink:1}.field-body .field{margin-bottom:0}.field-body>.field{-ms-flex-negative:1;flex-shrink:1}.field-body>.field:not(.is-narrow){-ms-flex-positive:1;flex-grow:1}.field-body>.field:not(:last-child){margin-right:.75rem}}.control{-webkit-box-sizing:border-box;box-sizing:border-box;clear:both;font-size:1rem;position:relative;text-align:left}.control.has-icons-left .input:focus~.icon,.control.has-icons-left .select:focus~.icon,.control.has-icons-right .input:focus~.icon,.control.has-icons-right .select:focus~.icon{color:#7a7a7a}.control.has-icons-left .input.is-small~.icon,.control.has-icons-left .select.is-small~.icon,.control.has-icons-right .input.is-small~.icon,.control.has-icons-right .select.is-small~.icon{font-size:.75rem}.control.has-icons-left .input.is-medium~.icon,.control.has-icons-left .select.is-medium~.icon,.control.has-icons-right .input.is-medium~.icon,.control.has-icons-right .select.is-medium~.icon{font-size:1.25rem}.control.has-icons-left .input.is-large~.icon,.control.has-icons-left .select.is-large~.icon,.control.has-icons-right .input.is-large~.icon,.control.has-icons-right .select.is-large~.icon{font-size:1.5rem}.control.has-icons-left .icon,.control.has-icons-right .icon{color:#dbdbdb;height:2.25em;pointer-events:none;position:absolute;top:0;width:2.25em;z-index:4}.control.has-icons-left .input,.control.has-icons-left .select select{padding-left:2.25em}.control.has-icons-left .icon.is-left{left:0}.control.has-icons-right .input,.control.has-icons-right .select select{padding-right:2.25em}.control.has-icons-right .icon.is-right{right:0}.control.is-loading:after{position:absolute!important;right:.625em;top:.625em;z-index:4}.control.is-loading.is-small:after{font-size:.75rem}.control.is-loading.is-medium:after{font-size:1.25rem}.control.is-loading.is-large:after{font-size:1.5rem}.breadcrumb{font-size:1rem;white-space:nowrap}.breadcrumb a{-ms-flex-align:center;align-items:center;color:#239ed7;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;padding:0 .75em}.breadcrumb a:hover{color:#363636}.breadcrumb li{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}.breadcrumb li:first-child a{padding-left:0}.breadcrumb li.is-active a{color:#363636;cursor:default;pointer-events:none}.breadcrumb li+li:before{color:#b5b5b5;content:\"/\"}.breadcrumb ol,.breadcrumb ul{-ms-flex-align:start;align-items:flex-start;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:start;justify-content:flex-start}.breadcrumb .icon:first-child{margin-right:.5em}.breadcrumb .icon:last-child{margin-left:.5em}.breadcrumb.is-centered ol,.breadcrumb.is-centered ul{-ms-flex-pack:center;justify-content:center}.breadcrumb.is-right ol,.breadcrumb.is-right ul{-ms-flex-pack:end;justify-content:flex-end}.breadcrumb.is-small{font-size:.75rem}.breadcrumb.is-medium{font-size:1.25rem}.breadcrumb.is-large{font-size:1.5rem}.breadcrumb.has-arrow-separator li+li:before{content:\"→\"}.breadcrumb.has-bullet-separator li+li:before{content:\"•\"}.breadcrumb.has-dot-separator li+li:before{content:\"·\"}.breadcrumb.has-succeeds-separator li+li:before{content:\"≻\"}.card{background-color:#fff;-webkit-box-shadow:0 2px 3px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1);box-shadow:0 2px 3px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1);color:#4a4a4a;max-width:100%;position:relative}.card-header{background-color:transparent;-ms-flex-align:stretch;align-items:stretch;-webkit-box-shadow:0 1px 2px rgba(10,10,10,.1);box-shadow:0 1px 2px rgba(10,10,10,.1)}.card-header,.card-header-title{display:-ms-flexbox;display:flex}.card-header-title{-ms-flex-align:center;align-items:center;color:#363636;-ms-flex-positive:1;flex-grow:1;font-weight:700;padding:.75rem}.card-header-icon,.card-header-title.is-centered{-ms-flex-pack:center;justify-content:center}.card-header-icon{-ms-flex-align:center;align-items:center;cursor:pointer;display:-ms-flexbox;display:flex;padding:.75rem}.card-image{display:block;position:relative}.card-content{background-color:transparent;padding:1.5rem}.card-footer{background-color:transparent;border-top:1px solid #dbdbdb;-ms-flex-align:stretch;align-items:stretch}.card-footer,.card-footer-item{display:-ms-flexbox;display:flex}.card-footer-item{-ms-flex-align:center;align-items:center;-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:0;flex-shrink:0;-ms-flex-pack:center;justify-content:center;padding:.75rem}.card-footer-item:not(:last-child){border-right:1px solid #dbdbdb}.card .media:not(:last-child){margin-bottom:1.5rem}.dropdown{display:-ms-inline-flexbox;display:inline-flex;position:relative;vertical-align:top}.dropdown.is-active .dropdown-menu,.dropdown.is-hoverable:hover .dropdown-menu{display:block}.dropdown.is-right .dropdown-menu{left:auto;right:0}.dropdown.is-up .dropdown-menu{bottom:100%;padding-bottom:4px;padding-top:0;top:auto}.dropdown-menu{display:none;left:0;min-width:12rem;padding-top:4px;position:absolute;top:100%;z-index:20}.dropdown-content{background-color:#fff;border-radius:4px;-webkit-box-shadow:0 2px 3px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1);box-shadow:0 2px 3px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1);padding-bottom:.5rem;padding-top:.5rem}.dropdown-item{color:#4a4a4a;display:block;font-size:.875rem;line-height:1.5;padding:.375rem 1rem;position:relative}a.dropdown-item,button.dropdown-item{padding-right:3rem;text-align:left;white-space:nowrap;width:100%}a.dropdown-item:hover,button.dropdown-item:hover{background-color:#f5f5f5;color:#0a0a0a}a.dropdown-item.is-active,button.dropdown-item.is-active{background-color:#239ed7;color:#fff}.dropdown-divider{background-color:#dbdbdb;border:none;display:block;height:1px;margin:.5rem 0}.level{-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between}.level code{border-radius:4px}.level img{display:inline-block;vertical-align:top}.level.is-mobile,.level.is-mobile .level-left,.level.is-mobile .level-right{display:-ms-flexbox;display:flex}.level.is-mobile .level-left+.level-right{margin-top:0}.level.is-mobile .level-item:not(:last-child){margin-bottom:0;margin-right:.75rem}.level.is-mobile .level-item:not(.is-narrow){-ms-flex-positive:1;flex-grow:1}\@media print,screen and (min-width:769px){.level{display:-ms-flexbox;display:flex}.level>.level-item:not(.is-narrow){-ms-flex-positive:1;flex-grow:1}}.level-item{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-preferred-size:auto;flex-basis:auto;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;-ms-flex-pack:center;justify-content:center}.level-item .subtitle,.level-item .title{margin-bottom:0}\@media screen and (max-width:768px){.level-item:not(:last-child){margin-bottom:.75rem}}.level-left,.level-right{-ms-flex-preferred-size:auto;flex-basis:auto;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0}.level-left .level-item.is-flexible,.level-right .level-item.is-flexible{-ms-flex-positive:1;flex-grow:1}\@media print,screen and (min-width:769px){.level-left .level-item:not(:last-child),.level-right .level-item:not(:last-child){margin-right:.75rem}}.level-left{-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start}\@media screen and (max-width:768px){.level-left+.level-right{margin-top:1.5rem}}\@media print,screen and (min-width:769px){.level-left{display:-ms-flexbox;display:flex}}.level-right{-ms-flex-align:center;align-items:center;-ms-flex-pack:end;justify-content:flex-end}\@media print,screen and (min-width:769px){.level-right{display:-ms-flexbox;display:flex}}.list{background-color:#fff;border-radius:4px;-webkit-box-shadow:0 2px 3px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1);box-shadow:0 2px 3px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1)}.list-item{display:block;padding:.5em 1em}.list-item:not(a){color:#4a4a4a}.list-item:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.list-item:last-child{border-bottom-left-radius:4px;border-bottom-right-radius:4px}.list-item:not(:last-child){border-bottom:1px solid #dbdbdb}.list-item.is-active{background-color:#239ed7;color:#fff}a.list-item{background-color:#f5f5f5;cursor:pointer}.media{-ms-flex-align:start;align-items:flex-start;display:-ms-flexbox;display:flex;text-align:left}.media .content:not(:last-child){margin-bottom:.75rem}.media .media{border-top:1px solid hsla(0,0%,85.9%,.5);display:-ms-flexbox;display:flex;padding-top:.75rem}.media .media .content:not(:last-child),.media .media .control:not(:last-child){margin-bottom:.5rem}.media .media .media{padding-top:.5rem}.media .media .media+.media{margin-top:.5rem}.media+.media{border-top:1px solid hsla(0,0%,85.9%,.5);margin-top:1rem;padding-top:1rem}.media.is-large+.media{margin-top:1.5rem;padding-top:1.5rem}.media-left,.media-right{-ms-flex-preferred-size:auto;flex-basis:auto;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0}.media-left{margin-right:1rem}.media-right{margin-left:1rem}.media-content{-ms-flex-preferred-size:auto;flex-basis:auto;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1;text-align:left}\@media screen and (max-width:768px){.media-content{overflow-x:auto}}.menu{font-size:1rem}.menu.is-small{font-size:.75rem}.menu.is-medium{font-size:1.25rem}.menu.is-large{font-size:1.5rem}.menu-list{line-height:1.25}.menu-list a{border-radius:2px;color:#4a4a4a;display:block;padding:.5em .75em}.menu-list a:hover{background-color:#f5f5f5;color:#363636}.menu-list a.is-active{background-color:#239ed7;color:#fff}.menu-list li ul{border-left:1px solid #dbdbdb;margin:.75em;padding-left:.75em}.menu-label{color:#7a7a7a;font-size:.75em;letter-spacing:.1em;text-transform:uppercase}.menu-label:not(:first-child){margin-top:1em}.menu-label:not(:last-child){margin-bottom:1em}.message{background-color:#f5f5f5;border-radius:4px;font-size:1rem}.message strong{color:currentColor}.message a:not(.button):not(.tag):not(.dropdown-item){color:currentColor;text-decoration:underline}.message.is-small{font-size:.75rem}.message.is-medium{font-size:1.25rem}.message.is-large{font-size:1.5rem}.message.is-white{background-color:#fff}.message.is-white .message-header{background-color:#fff;color:#0a0a0a}.message.is-white .message-body{border-color:#fff;color:#4d4d4d}.message.is-black{background-color:#fafafa}.message.is-black .message-header{background-color:#0a0a0a;color:#fff}.message.is-black .message-body{border-color:#0a0a0a;color:#0a0a0a}.message.is-light{background-color:#fafafa}.message.is-light .message-header{background-color:#f5f5f5;color:#363636}.message.is-light .message-body{border-color:#f5f5f5;color:#4f4f4f}.message.is-dark{background-color:#fafafa}.message.is-dark .message-header{background-color:#363636;color:#f5f5f5}.message.is-dark .message-body{border-color:#363636;color:#2a2a2a}.message.is-primary{background-color:#f6fbfe}.message.is-primary .message-header{background-color:#239ed7;color:#fff}.message.is-primary .message-body{border-color:#239ed7;color:#184c64}.message.is-link{background-color:#f6fbfe}.message.is-link .message-header{background-color:#239ed7;color:#fff}.message.is-link .message-body{border-color:#239ed7;color:#184c64}.message.is-info{background-color:#f6fbfe}.message.is-info .message-header{background-color:#209cee;color:#fff}.message.is-info .message-body{border-color:#209cee;color:#12537e}.message.is-success{background-color:#f6fef9}.message.is-success .message-header{background-color:#23d160;color:#fff}.message.is-success .message-body{border-color:#23d160;color:#0e311a}.message.is-warning{background-color:#fffdf5}.message.is-warning .message-header{background-color:#ffdd57;color:rgba(0,0,0,.7)}.message.is-warning .message-body{border-color:#ffdd57;color:#3c3108}.message.is-danger{background-color:#fff5f7}.message.is-danger .message-header{background-color:#ff3860;color:#fff}.message.is-danger .message-body{border-color:#ff3860;color:#cd0930}.message-header{-ms-flex-align:center;align-items:center;background-color:#4a4a4a;border-radius:4px 4px 0 0;color:#fff;display:-ms-flexbox;display:flex;font-weight:700;-ms-flex-pack:justify;justify-content:space-between;line-height:1.25;padding:.75em 1em;position:relative}.message-header .delete{-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;margin-left:.75em}.message-header+.message-body{border-width:0;border-top-left-radius:0;border-top-right-radius:0}.message-body{border-color:#dbdbdb;border-radius:4px;border-style:solid;border-width:0 0 0 4px;color:#4a4a4a;padding:1.25em 1.5em}.message-body code,.message-body pre{background-color:#fff}.message-body pre code{background-color:transparent}.modal{-ms-flex-align:center;align-items:center;display:none;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;overflow:hidden;position:fixed;z-index:40}.modal.is-active{display:-ms-flexbox;display:flex}.modal-background{background-color:rgba(10,10,10,.86)}.modal-card,.modal-content{margin:0 20px;max-height:calc(100vh - 160px);overflow:auto;position:relative;width:100%}\@media print,screen and (min-width:769px){.modal-card,.modal-content{margin:0 auto;max-height:calc(100vh - 40px);width:640px}}.modal-close{background:none;height:40px;position:fixed;right:20px;top:20px;width:40px}.modal-card{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;max-height:calc(100vh - 40px);overflow:hidden;-ms-overflow-y:visible}.modal-card-foot,.modal-card-head{-ms-flex-align:center;align-items:center;background-color:#f5f5f5;display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0;-ms-flex-pack:start;justify-content:flex-start;padding:20px;position:relative}.modal-card-head{border-bottom:1px solid #dbdbdb;border-top-left-radius:6px;border-top-right-radius:6px}.modal-card-title{color:#363636;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:0;flex-shrink:0;font-size:1.5rem;line-height:1}.modal-card-foot{border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top:1px solid #dbdbdb}.modal-card-foot .button:not(:last-child){margin-right:.5em}.modal-card-body{-webkit-overflow-scrolling:touch;background-color:#fff;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1;overflow:auto;padding:20px}.navbar{background-color:#fff;min-height:3.25rem;position:relative;z-index:30}.navbar.is-white{background-color:#fff;color:#0a0a0a}.navbar.is-white .navbar-brand .navbar-link,.navbar.is-white .navbar-brand>.navbar-item{color:#0a0a0a}.navbar.is-white .navbar-brand .navbar-link.is-active,.navbar.is-white .navbar-brand .navbar-link:focus,.navbar.is-white .navbar-brand .navbar-link:hover,.navbar.is-white .navbar-brand>a.navbar-item.is-active,.navbar.is-white .navbar-brand>a.navbar-item:focus,.navbar.is-white .navbar-brand>a.navbar-item:hover{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-brand .navbar-link:after{border-color:#0a0a0a}.navbar.is-white .navbar-burger{color:#0a0a0a}\@media screen and (min-width:1024px){.navbar.is-white .navbar-end .navbar-link,.navbar.is-white .navbar-end>.navbar-item,.navbar.is-white .navbar-start .navbar-link,.navbar.is-white .navbar-start>.navbar-item{color:#0a0a0a}.navbar.is-white .navbar-end .navbar-link.is-active,.navbar.is-white .navbar-end .navbar-link:focus,.navbar.is-white .navbar-end .navbar-link:hover,.navbar.is-white .navbar-end>a.navbar-item.is-active,.navbar.is-white .navbar-end>a.navbar-item:focus,.navbar.is-white .navbar-end>a.navbar-item:hover,.navbar.is-white .navbar-start .navbar-link.is-active,.navbar.is-white .navbar-start .navbar-link:focus,.navbar.is-white .navbar-start .navbar-link:hover,.navbar.is-white .navbar-start>a.navbar-item.is-active,.navbar.is-white .navbar-start>a.navbar-item:focus,.navbar.is-white .navbar-start>a.navbar-item:hover{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-end .navbar-link:after,.navbar.is-white .navbar-start .navbar-link:after{border-color:#0a0a0a}.navbar.is-white .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-white .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-white .navbar-item.has-dropdown:hover .navbar-link{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-dropdown a.navbar-item.is-active{background-color:#fff;color:#0a0a0a}}.navbar.is-black{background-color:#0a0a0a;color:#fff}.navbar.is-black .navbar-brand .navbar-link,.navbar.is-black .navbar-brand>.navbar-item{color:#fff}.navbar.is-black .navbar-brand .navbar-link.is-active,.navbar.is-black .navbar-brand .navbar-link:focus,.navbar.is-black .navbar-brand .navbar-link:hover,.navbar.is-black .navbar-brand>a.navbar-item.is-active,.navbar.is-black .navbar-brand>a.navbar-item:focus,.navbar.is-black .navbar-brand>a.navbar-item:hover{background-color:#000;color:#fff}.navbar.is-black .navbar-brand .navbar-link:after{border-color:#fff}.navbar.is-black .navbar-burger{color:#fff}\@media screen and (min-width:1024px){.navbar.is-black .navbar-end .navbar-link,.navbar.is-black .navbar-end>.navbar-item,.navbar.is-black .navbar-start .navbar-link,.navbar.is-black .navbar-start>.navbar-item{color:#fff}.navbar.is-black .navbar-end .navbar-link.is-active,.navbar.is-black .navbar-end .navbar-link:focus,.navbar.is-black .navbar-end .navbar-link:hover,.navbar.is-black .navbar-end>a.navbar-item.is-active,.navbar.is-black .navbar-end>a.navbar-item:focus,.navbar.is-black .navbar-end>a.navbar-item:hover,.navbar.is-black .navbar-start .navbar-link.is-active,.navbar.is-black .navbar-start .navbar-link:focus,.navbar.is-black .navbar-start .navbar-link:hover,.navbar.is-black .navbar-start>a.navbar-item.is-active,.navbar.is-black .navbar-start>a.navbar-item:focus,.navbar.is-black .navbar-start>a.navbar-item:hover{background-color:#000;color:#fff}.navbar.is-black .navbar-end .navbar-link:after,.navbar.is-black .navbar-start .navbar-link:after{border-color:#fff}.navbar.is-black .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-black .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-black .navbar-item.has-dropdown:hover .navbar-link{background-color:#000;color:#fff}.navbar.is-black .navbar-dropdown a.navbar-item.is-active{background-color:#0a0a0a;color:#fff}}.navbar.is-light{background-color:#f5f5f5;color:#363636}.navbar.is-light .navbar-brand .navbar-link,.navbar.is-light .navbar-brand>.navbar-item{color:#363636}.navbar.is-light .navbar-brand .navbar-link.is-active,.navbar.is-light .navbar-brand .navbar-link:focus,.navbar.is-light .navbar-brand .navbar-link:hover,.navbar.is-light .navbar-brand>a.navbar-item.is-active,.navbar.is-light .navbar-brand>a.navbar-item:focus,.navbar.is-light .navbar-brand>a.navbar-item:hover{background-color:#e8e8e8;color:#363636}.navbar.is-light .navbar-brand .navbar-link:after{border-color:#363636}.navbar.is-light .navbar-burger{color:#363636}\@media screen and (min-width:1024px){.navbar.is-light .navbar-end .navbar-link,.navbar.is-light .navbar-end>.navbar-item,.navbar.is-light .navbar-start .navbar-link,.navbar.is-light .navbar-start>.navbar-item{color:#363636}.navbar.is-light .navbar-end .navbar-link.is-active,.navbar.is-light .navbar-end .navbar-link:focus,.navbar.is-light .navbar-end .navbar-link:hover,.navbar.is-light .navbar-end>a.navbar-item.is-active,.navbar.is-light .navbar-end>a.navbar-item:focus,.navbar.is-light .navbar-end>a.navbar-item:hover,.navbar.is-light .navbar-start .navbar-link.is-active,.navbar.is-light .navbar-start .navbar-link:focus,.navbar.is-light .navbar-start .navbar-link:hover,.navbar.is-light .navbar-start>a.navbar-item.is-active,.navbar.is-light .navbar-start>a.navbar-item:focus,.navbar.is-light .navbar-start>a.navbar-item:hover{background-color:#e8e8e8;color:#363636}.navbar.is-light .navbar-end .navbar-link:after,.navbar.is-light .navbar-start .navbar-link:after{border-color:#363636}.navbar.is-light .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-light .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-light .navbar-item.has-dropdown:hover .navbar-link{background-color:#e8e8e8;color:#363636}.navbar.is-light .navbar-dropdown a.navbar-item.is-active{background-color:#f5f5f5;color:#363636}}.navbar.is-dark{background-color:#363636;color:#f5f5f5}.navbar.is-dark .navbar-brand .navbar-link,.navbar.is-dark .navbar-brand>.navbar-item{color:#f5f5f5}.navbar.is-dark .navbar-brand .navbar-link.is-active,.navbar.is-dark .navbar-brand .navbar-link:focus,.navbar.is-dark .navbar-brand .navbar-link:hover,.navbar.is-dark .navbar-brand>a.navbar-item.is-active,.navbar.is-dark .navbar-brand>a.navbar-item:focus,.navbar.is-dark .navbar-brand>a.navbar-item:hover{background-color:#292929;color:#f5f5f5}.navbar.is-dark .navbar-brand .navbar-link:after{border-color:#f5f5f5}.navbar.is-dark .navbar-burger{color:#f5f5f5}\@media screen and (min-width:1024px){.navbar.is-dark .navbar-end .navbar-link,.navbar.is-dark .navbar-end>.navbar-item,.navbar.is-dark .navbar-start .navbar-link,.navbar.is-dark .navbar-start>.navbar-item{color:#f5f5f5}.navbar.is-dark .navbar-end .navbar-link.is-active,.navbar.is-dark .navbar-end .navbar-link:focus,.navbar.is-dark .navbar-end .navbar-link:hover,.navbar.is-dark .navbar-end>a.navbar-item.is-active,.navbar.is-dark .navbar-end>a.navbar-item:focus,.navbar.is-dark .navbar-end>a.navbar-item:hover,.navbar.is-dark .navbar-start .navbar-link.is-active,.navbar.is-dark .navbar-start .navbar-link:focus,.navbar.is-dark .navbar-start .navbar-link:hover,.navbar.is-dark .navbar-start>a.navbar-item.is-active,.navbar.is-dark .navbar-start>a.navbar-item:focus,.navbar.is-dark .navbar-start>a.navbar-item:hover{background-color:#292929;color:#f5f5f5}.navbar.is-dark .navbar-end .navbar-link:after,.navbar.is-dark .navbar-start .navbar-link:after{border-color:#f5f5f5}.navbar.is-dark .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-dark .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-dark .navbar-item.has-dropdown:hover .navbar-link{background-color:#292929;color:#f5f5f5}.navbar.is-dark .navbar-dropdown a.navbar-item.is-active{background-color:#363636;color:#f5f5f5}}.navbar.is-primary{background-color:#239ed7;color:#fff}.navbar.is-primary .navbar-brand .navbar-link,.navbar.is-primary .navbar-brand>.navbar-item{color:#fff}.navbar.is-primary .navbar-brand .navbar-link.is-active,.navbar.is-primary .navbar-brand .navbar-link:focus,.navbar.is-primary .navbar-brand .navbar-link:hover,.navbar.is-primary .navbar-brand>a.navbar-item.is-active,.navbar.is-primary .navbar-brand>a.navbar-item:focus,.navbar.is-primary .navbar-brand>a.navbar-item:hover{background-color:#1f8ec1;color:#fff}.navbar.is-primary .navbar-brand .navbar-link:after{border-color:#fff}.navbar.is-primary .navbar-burger{color:#fff}\@media screen and (min-width:1024px){.navbar.is-primary .navbar-end .navbar-link,.navbar.is-primary .navbar-end>.navbar-item,.navbar.is-primary .navbar-start .navbar-link,.navbar.is-primary .navbar-start>.navbar-item{color:#fff}.navbar.is-primary .navbar-end .navbar-link.is-active,.navbar.is-primary .navbar-end .navbar-link:focus,.navbar.is-primary .navbar-end .navbar-link:hover,.navbar.is-primary .navbar-end>a.navbar-item.is-active,.navbar.is-primary .navbar-end>a.navbar-item:focus,.navbar.is-primary .navbar-end>a.navbar-item:hover,.navbar.is-primary .navbar-start .navbar-link.is-active,.navbar.is-primary .navbar-start .navbar-link:focus,.navbar.is-primary .navbar-start .navbar-link:hover,.navbar.is-primary .navbar-start>a.navbar-item.is-active,.navbar.is-primary .navbar-start>a.navbar-item:focus,.navbar.is-primary .navbar-start>a.navbar-item:hover{background-color:#1f8ec1;color:#fff}.navbar.is-primary .navbar-end .navbar-link:after,.navbar.is-primary .navbar-start .navbar-link:after{border-color:#fff}.navbar.is-primary .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-primary .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-primary .navbar-item.has-dropdown:hover .navbar-link{background-color:#1f8ec1;color:#fff}.navbar.is-primary .navbar-dropdown a.navbar-item.is-active{background-color:#239ed7;color:#fff}}.navbar.is-link{background-color:#239ed7;color:#fff}.navbar.is-link .navbar-brand .navbar-link,.navbar.is-link .navbar-brand>.navbar-item{color:#fff}.navbar.is-link .navbar-brand .navbar-link.is-active,.navbar.is-link .navbar-brand .navbar-link:focus,.navbar.is-link .navbar-brand .navbar-link:hover,.navbar.is-link .navbar-brand>a.navbar-item.is-active,.navbar.is-link .navbar-brand>a.navbar-item:focus,.navbar.is-link .navbar-brand>a.navbar-item:hover{background-color:#1f8ec1;color:#fff}.navbar.is-link .navbar-brand .navbar-link:after{border-color:#fff}.navbar.is-link .navbar-burger{color:#fff}\@media screen and (min-width:1024px){.navbar.is-link .navbar-end .navbar-link,.navbar.is-link .navbar-end>.navbar-item,.navbar.is-link .navbar-start .navbar-link,.navbar.is-link .navbar-start>.navbar-item{color:#fff}.navbar.is-link .navbar-end .navbar-link.is-active,.navbar.is-link .navbar-end .navbar-link:focus,.navbar.is-link .navbar-end .navbar-link:hover,.navbar.is-link .navbar-end>a.navbar-item.is-active,.navbar.is-link .navbar-end>a.navbar-item:focus,.navbar.is-link .navbar-end>a.navbar-item:hover,.navbar.is-link .navbar-start .navbar-link.is-active,.navbar.is-link .navbar-start .navbar-link:focus,.navbar.is-link .navbar-start .navbar-link:hover,.navbar.is-link .navbar-start>a.navbar-item.is-active,.navbar.is-link .navbar-start>a.navbar-item:focus,.navbar.is-link .navbar-start>a.navbar-item:hover{background-color:#1f8ec1;color:#fff}.navbar.is-link .navbar-end .navbar-link:after,.navbar.is-link .navbar-start .navbar-link:after{border-color:#fff}.navbar.is-link .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-link .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-link .navbar-item.has-dropdown:hover .navbar-link{background-color:#1f8ec1;color:#fff}.navbar.is-link .navbar-dropdown a.navbar-item.is-active{background-color:#239ed7;color:#fff}}.navbar.is-info{background-color:#209cee;color:#fff}.navbar.is-info .navbar-brand .navbar-link,.navbar.is-info .navbar-brand>.navbar-item{color:#fff}.navbar.is-info .navbar-brand .navbar-link.is-active,.navbar.is-info .navbar-brand .navbar-link:focus,.navbar.is-info .navbar-brand .navbar-link:hover,.navbar.is-info .navbar-brand>a.navbar-item.is-active,.navbar.is-info .navbar-brand>a.navbar-item:focus,.navbar.is-info .navbar-brand>a.navbar-item:hover{background-color:#118fe4;color:#fff}.navbar.is-info .navbar-brand .navbar-link:after{border-color:#fff}.navbar.is-info .navbar-burger{color:#fff}\@media screen and (min-width:1024px){.navbar.is-info .navbar-end .navbar-link,.navbar.is-info .navbar-end>.navbar-item,.navbar.is-info .navbar-start .navbar-link,.navbar.is-info .navbar-start>.navbar-item{color:#fff}.navbar.is-info .navbar-end .navbar-link.is-active,.navbar.is-info .navbar-end .navbar-link:focus,.navbar.is-info .navbar-end .navbar-link:hover,.navbar.is-info .navbar-end>a.navbar-item.is-active,.navbar.is-info .navbar-end>a.navbar-item:focus,.navbar.is-info .navbar-end>a.navbar-item:hover,.navbar.is-info .navbar-start .navbar-link.is-active,.navbar.is-info .navbar-start .navbar-link:focus,.navbar.is-info .navbar-start .navbar-link:hover,.navbar.is-info .navbar-start>a.navbar-item.is-active,.navbar.is-info .navbar-start>a.navbar-item:focus,.navbar.is-info .navbar-start>a.navbar-item:hover{background-color:#118fe4;color:#fff}.navbar.is-info .navbar-end .navbar-link:after,.navbar.is-info .navbar-start .navbar-link:after{border-color:#fff}.navbar.is-info .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-info .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-info .navbar-item.has-dropdown:hover .navbar-link{background-color:#118fe4;color:#fff}.navbar.is-info .navbar-dropdown a.navbar-item.is-active{background-color:#209cee;color:#fff}}.navbar.is-success{background-color:#23d160;color:#fff}.navbar.is-success .navbar-brand .navbar-link,.navbar.is-success .navbar-brand>.navbar-item{color:#fff}.navbar.is-success .navbar-brand .navbar-link.is-active,.navbar.is-success .navbar-brand .navbar-link:focus,.navbar.is-success .navbar-brand .navbar-link:hover,.navbar.is-success .navbar-brand>a.navbar-item.is-active,.navbar.is-success .navbar-brand>a.navbar-item:focus,.navbar.is-success .navbar-brand>a.navbar-item:hover{background-color:#20bc56;color:#fff}.navbar.is-success .navbar-brand .navbar-link:after{border-color:#fff}.navbar.is-success .navbar-burger{color:#fff}\@media screen and (min-width:1024px){.navbar.is-success .navbar-end .navbar-link,.navbar.is-success .navbar-end>.navbar-item,.navbar.is-success .navbar-start .navbar-link,.navbar.is-success .navbar-start>.navbar-item{color:#fff}.navbar.is-success .navbar-end .navbar-link.is-active,.navbar.is-success .navbar-end .navbar-link:focus,.navbar.is-success .navbar-end .navbar-link:hover,.navbar.is-success .navbar-end>a.navbar-item.is-active,.navbar.is-success .navbar-end>a.navbar-item:focus,.navbar.is-success .navbar-end>a.navbar-item:hover,.navbar.is-success .navbar-start .navbar-link.is-active,.navbar.is-success .navbar-start .navbar-link:focus,.navbar.is-success .navbar-start .navbar-link:hover,.navbar.is-success .navbar-start>a.navbar-item.is-active,.navbar.is-success .navbar-start>a.navbar-item:focus,.navbar.is-success .navbar-start>a.navbar-item:hover{background-color:#20bc56;color:#fff}.navbar.is-success .navbar-end .navbar-link:after,.navbar.is-success .navbar-start .navbar-link:after{border-color:#fff}.navbar.is-success .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-success .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-success .navbar-item.has-dropdown:hover .navbar-link{background-color:#20bc56;color:#fff}.navbar.is-success .navbar-dropdown a.navbar-item.is-active{background-color:#23d160;color:#fff}}.navbar.is-warning{background-color:#ffdd57;color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-brand .navbar-link,.navbar.is-warning .navbar-brand>.navbar-item{color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-brand .navbar-link.is-active,.navbar.is-warning .navbar-brand .navbar-link:focus,.navbar.is-warning .navbar-brand .navbar-link:hover,.navbar.is-warning .navbar-brand>a.navbar-item.is-active,.navbar.is-warning .navbar-brand>a.navbar-item:focus,.navbar.is-warning .navbar-brand>a.navbar-item:hover{background-color:#ffd83d;color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-brand .navbar-link:after{border-color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-burger{color:rgba(0,0,0,.7)}\@media screen and (min-width:1024px){.navbar.is-warning .navbar-end .navbar-link,.navbar.is-warning .navbar-end>.navbar-item,.navbar.is-warning .navbar-start .navbar-link,.navbar.is-warning .navbar-start>.navbar-item{color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-end .navbar-link.is-active,.navbar.is-warning .navbar-end .navbar-link:focus,.navbar.is-warning .navbar-end .navbar-link:hover,.navbar.is-warning .navbar-end>a.navbar-item.is-active,.navbar.is-warning .navbar-end>a.navbar-item:focus,.navbar.is-warning .navbar-end>a.navbar-item:hover,.navbar.is-warning .navbar-start .navbar-link.is-active,.navbar.is-warning .navbar-start .navbar-link:focus,.navbar.is-warning .navbar-start .navbar-link:hover,.navbar.is-warning .navbar-start>a.navbar-item.is-active,.navbar.is-warning .navbar-start>a.navbar-item:focus,.navbar.is-warning .navbar-start>a.navbar-item:hover{background-color:#ffd83d;color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-end .navbar-link:after,.navbar.is-warning .navbar-start .navbar-link:after{border-color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-warning .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-warning .navbar-item.has-dropdown:hover .navbar-link{background-color:#ffd83d;color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-dropdown a.navbar-item.is-active{background-color:#ffdd57;color:rgba(0,0,0,.7)}}.navbar.is-danger{background-color:#ff3860;color:#fff}.navbar.is-danger .navbar-brand .navbar-link,.navbar.is-danger .navbar-brand>.navbar-item{color:#fff}.navbar.is-danger .navbar-brand .navbar-link.is-active,.navbar.is-danger .navbar-brand .navbar-link:focus,.navbar.is-danger .navbar-brand .navbar-link:hover,.navbar.is-danger .navbar-brand>a.navbar-item.is-active,.navbar.is-danger .navbar-brand>a.navbar-item:focus,.navbar.is-danger .navbar-brand>a.navbar-item:hover{background-color:#ff1f4b;color:#fff}.navbar.is-danger .navbar-brand .navbar-link:after{border-color:#fff}.navbar.is-danger .navbar-burger{color:#fff}\@media screen and (min-width:1024px){.navbar.is-danger .navbar-end .navbar-link,.navbar.is-danger .navbar-end>.navbar-item,.navbar.is-danger .navbar-start .navbar-link,.navbar.is-danger .navbar-start>.navbar-item{color:#fff}.navbar.is-danger .navbar-end .navbar-link.is-active,.navbar.is-danger .navbar-end .navbar-link:focus,.navbar.is-danger .navbar-end .navbar-link:hover,.navbar.is-danger .navbar-end>a.navbar-item.is-active,.navbar.is-danger .navbar-end>a.navbar-item:focus,.navbar.is-danger .navbar-end>a.navbar-item:hover,.navbar.is-danger .navbar-start .navbar-link.is-active,.navbar.is-danger .navbar-start .navbar-link:focus,.navbar.is-danger .navbar-start .navbar-link:hover,.navbar.is-danger .navbar-start>a.navbar-item.is-active,.navbar.is-danger .navbar-start>a.navbar-item:focus,.navbar.is-danger .navbar-start>a.navbar-item:hover{background-color:#ff1f4b;color:#fff}.navbar.is-danger .navbar-end .navbar-link:after,.navbar.is-danger .navbar-start .navbar-link:after{border-color:#fff}.navbar.is-danger .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-danger .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-danger .navbar-item.has-dropdown:hover .navbar-link{background-color:#ff1f4b;color:#fff}.navbar.is-danger .navbar-dropdown a.navbar-item.is-active{background-color:#ff3860;color:#fff}}.navbar>.container{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex;min-height:3.25rem;width:100%}.navbar.has-shadow{-webkit-box-shadow:0 2px 0 0 #f5f5f5;box-shadow:0 2px 0 0 #f5f5f5}.navbar.is-fixed-bottom,.navbar.is-fixed-top{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom{bottom:0}.navbar.is-fixed-bottom.has-shadow{-webkit-box-shadow:0 -2px 0 0 #f5f5f5;box-shadow:0 -2px 0 0 #f5f5f5}.navbar.is-fixed-top{top:0}body.has-navbar-fixed-top,html.has-navbar-fixed-top{padding-top:3.25rem}body.has-navbar-fixed-bottom,html.has-navbar-fixed-bottom{padding-bottom:3.25rem}.navbar-brand,.navbar-tabs{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0;min-height:3.25rem}.navbar-brand a.navbar-item:focus,.navbar-brand a.navbar-item:hover{background-color:transparent}.navbar-tabs{-webkit-overflow-scrolling:touch;max-width:100vw;overflow-x:auto;overflow-y:hidden}.navbar-burger{color:#4a4a4a;cursor:pointer;display:block;height:3.25rem;position:relative;width:3.25rem;margin-left:auto}.navbar-burger span{background-color:currentColor;display:block;height:1px;left:calc(50% - 8px);position:absolute;-webkit-transform-origin:center;transform-origin:center;-webkit-transition-duration:86ms;transition-duration:86ms;-webkit-transition-property:background-color,opacity,-webkit-transform;transition-property:background-color,opacity,-webkit-transform;transition-property:background-color,opacity,transform;transition-property:background-color,opacity,transform,-webkit-transform;-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out;width:16px}.navbar-burger span:first-child{top:calc(50% - 6px)}.navbar-burger span:nth-child(2){top:calc(50% - 1px)}.navbar-burger span:nth-child(3){top:calc(50% + 4px)}.navbar-burger:hover{background-color:rgba(0,0,0,.05)}.navbar-burger.is-active span:first-child{-webkit-transform:translateY(5px) rotate(45deg);transform:translateY(5px) rotate(45deg)}.navbar-burger.is-active span:nth-child(2){opacity:0}.navbar-burger.is-active span:nth-child(3){-webkit-transform:translateY(-5px) rotate(-45deg);transform:translateY(-5px) rotate(-45deg)}.navbar-menu{display:none}.navbar-item,.navbar-link{color:#4a4a4a;display:block;line-height:1.5;padding:.5rem .75rem;position:relative}.navbar-item .icon:only-child,.navbar-link .icon:only-child{margin-left:-.25rem;margin-right:-.25rem}.navbar-link,a.navbar-item{cursor:pointer}.navbar-link.is-active,.navbar-link:focus,.navbar-link:focus-within,.navbar-link:hover,a.navbar-item.is-active,a.navbar-item:focus,a.navbar-item:focus-within,a.navbar-item:hover{background-color:#fafafa;color:#239ed7}.navbar-item{display:block;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0}.navbar-item img{max-height:1.75rem}.navbar-item.has-dropdown{padding:0}.navbar-item.is-expanded{-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1}.navbar-item.is-tab{border-bottom:1px solid transparent;min-height:3.25rem;padding-bottom:calc(.5rem - 1px)}.navbar-item.is-tab:focus,.navbar-item.is-tab:hover{background-color:transparent;border-bottom-color:#239ed7}.navbar-item.is-tab.is-active{background-color:transparent;border-bottom-color:#239ed7;border-bottom-style:solid;border-bottom-width:3px;color:#239ed7;padding-bottom:calc(.5rem - 3px)}.navbar-content{-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1}.navbar-link:not(.is-arrowless){padding-right:2.5em}.navbar-link:not(.is-arrowless):after{border-color:#239ed7;margin-top:-.375em;right:1.125em}.navbar-dropdown{font-size:.875rem;padding-bottom:.5rem;padding-top:.5rem}.navbar-dropdown .navbar-item{padding-left:1.5rem;padding-right:1.5rem}.navbar-divider{background-color:#f5f5f5;border:none;display:none;height:2px;margin:.5rem 0}\@media screen and (max-width:1023px){.navbar>.container{display:block}.navbar-brand .navbar-item,.navbar-tabs .navbar-item{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}.navbar-link:after{display:none}.navbar-menu{background-color:#fff;-webkit-box-shadow:0 8px 16px rgba(10,10,10,.1);box-shadow:0 8px 16px rgba(10,10,10,.1);padding:.5rem 0}.navbar-menu.is-active{display:block}.navbar.is-fixed-bottom-touch,.navbar.is-fixed-top-touch{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom-touch{bottom:0}.navbar.is-fixed-bottom-touch.has-shadow{-webkit-box-shadow:0 -2px 3px rgba(10,10,10,.1);box-shadow:0 -2px 3px rgba(10,10,10,.1)}.navbar.is-fixed-top-touch{top:0}.navbar.is-fixed-top-touch .navbar-menu,.navbar.is-fixed-top .navbar-menu{-webkit-overflow-scrolling:touch;max-height:calc(100vh - 3.25rem);overflow:auto}body.has-navbar-fixed-top-touch,html.has-navbar-fixed-top-touch{padding-top:3.25rem}body.has-navbar-fixed-bottom-touch,html.has-navbar-fixed-bottom-touch{padding-bottom:3.25rem}}\@media screen and (min-width:1024px){.navbar,.navbar-end,.navbar-menu,.navbar-start{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex}.navbar{min-height:3.25rem}.navbar.is-spaced{padding:1rem 2rem}.navbar.is-spaced .navbar-end,.navbar.is-spaced .navbar-start{-ms-flex-align:center;align-items:center}.navbar.is-spaced .navbar-link,.navbar.is-spaced a.navbar-item{border-radius:4px}.navbar.is-transparent .navbar-link.is-active,.navbar.is-transparent .navbar-link:focus,.navbar.is-transparent .navbar-link:hover,.navbar.is-transparent a.navbar-item.is-active,.navbar.is-transparent a.navbar-item:focus,.navbar.is-transparent a.navbar-item:hover{background-color:transparent!important}.navbar.is-transparent .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus-within .navbar-link,.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus .navbar-link,.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:hover .navbar-link{background-color:transparent!important}.navbar.is-transparent .navbar-dropdown a.navbar-item:focus,.navbar.is-transparent .navbar-dropdown a.navbar-item:hover{background-color:#f5f5f5;color:#0a0a0a}.navbar.is-transparent .navbar-dropdown a.navbar-item.is-active{background-color:#f5f5f5;color:#239ed7}.navbar-burger{display:none}.navbar-item,.navbar-link{-ms-flex-align:center;align-items:center}.navbar-item,.navbar-link{display:-ms-flexbox;display:flex}.navbar-item.has-dropdown{-ms-flex-align:stretch;align-items:stretch}.navbar-item.has-dropdown-up .navbar-link:after{-webkit-transform:rotate(135deg) translate(.25em,-.25em);transform:rotate(135deg) translate(.25em,-.25em)}.navbar-item.has-dropdown-up .navbar-dropdown{border-bottom:2px solid #dbdbdb;border-radius:6px 6px 0 0;border-top:none;bottom:100%;-webkit-box-shadow:0 -8px 8px rgba(10,10,10,.1);box-shadow:0 -8px 8px rgba(10,10,10,.1);top:auto}.navbar-item.is-active .navbar-dropdown,.navbar-item.is-hoverable:focus-within .navbar-dropdown,.navbar-item.is-hoverable:focus .navbar-dropdown,.navbar-item.is-hoverable:hover .navbar-dropdown{display:block}.navbar-item.is-active .navbar-dropdown.is-boxed,.navbar-item.is-hoverable:focus-within .navbar-dropdown.is-boxed,.navbar-item.is-hoverable:focus .navbar-dropdown.is-boxed,.navbar-item.is-hoverable:hover .navbar-dropdown.is-boxed,.navbar.is-spaced .navbar-item.is-active .navbar-dropdown,.navbar.is-spaced .navbar-item.is-hoverable:focus-within .navbar-dropdown,.navbar.is-spaced .navbar-item.is-hoverable:focus .navbar-dropdown,.navbar.is-spaced .navbar-item.is-hoverable:hover .navbar-dropdown{opacity:1;pointer-events:auto;-webkit-transform:translateY(0);transform:translateY(0)}.navbar-menu{-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:0;flex-shrink:0}.navbar-start{-ms-flex-pack:start;justify-content:flex-start;margin-right:auto}.navbar-end{-ms-flex-pack:end;justify-content:flex-end;margin-left:auto}.navbar-dropdown{background-color:#fff;border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top:2px solid #dbdbdb;-webkit-box-shadow:0 8px 8px rgba(10,10,10,.1);box-shadow:0 8px 8px rgba(10,10,10,.1);display:none;font-size:.875rem;left:0;min-width:100%;position:absolute;top:100%;z-index:20}.navbar-dropdown .navbar-item{padding:.375rem 1rem;white-space:nowrap}.navbar-dropdown a.navbar-item{padding-right:3rem}.navbar-dropdown a.navbar-item:focus,.navbar-dropdown a.navbar-item:hover{background-color:#f5f5f5;color:#0a0a0a}.navbar-dropdown a.navbar-item.is-active{background-color:#f5f5f5;color:#239ed7}.navbar-dropdown.is-boxed,.navbar.is-spaced .navbar-dropdown{border-radius:6px;border-top:none;-webkit-box-shadow:0 8px 8px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1);box-shadow:0 8px 8px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1);display:block;opacity:0;pointer-events:none;top:calc(100% + (-4px));-webkit-transform:translateY(-5px);transform:translateY(-5px);-webkit-transition-duration:86ms;transition-duration:86ms;-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform}.navbar-dropdown.is-right{left:auto;right:0}.navbar-divider{display:block}.container>.navbar .navbar-brand,.navbar>.container .navbar-brand{margin-left:-.75rem}.container>.navbar .navbar-menu,.navbar>.container .navbar-menu{margin-right:-.75rem}.navbar.is-fixed-bottom-desktop,.navbar.is-fixed-top-desktop{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom-desktop{bottom:0}.navbar.is-fixed-bottom-desktop.has-shadow{-webkit-box-shadow:0 -2px 3px rgba(10,10,10,.1);box-shadow:0 -2px 3px rgba(10,10,10,.1)}.navbar.is-fixed-top-desktop{top:0}body.has-navbar-fixed-top-desktop,html.has-navbar-fixed-top-desktop{padding-top:3.25rem}body.has-navbar-fixed-bottom-desktop,html.has-navbar-fixed-bottom-desktop{padding-bottom:3.25rem}body.has-spaced-navbar-fixed-top,html.has-spaced-navbar-fixed-top{padding-top:5.25rem}body.has-spaced-navbar-fixed-bottom,html.has-spaced-navbar-fixed-bottom{padding-bottom:5.25rem}.navbar-link.is-active,a.navbar-item.is-active{color:#0a0a0a}.navbar-link.is-active:not(:focus):not(:hover),a.navbar-item.is-active:not(:focus):not(:hover){background-color:transparent}.navbar-item.has-dropdown.is-active .navbar-link,.navbar-item.has-dropdown:focus .navbar-link,.navbar-item.has-dropdown:hover .navbar-link{background-color:#fafafa}}.hero.is-fullheight-with-navbar{min-height:calc(100vh - 3.25rem)}.pagination{font-size:1rem;margin:-.25rem}.pagination.is-small{font-size:.75rem}.pagination.is-medium{font-size:1.25rem}.pagination.is-large{font-size:1.5rem}.pagination.is-rounded .pagination-next,.pagination.is-rounded .pagination-previous{padding-left:1em;padding-right:1em;border-radius:290486px}.pagination.is-rounded .pagination-link{border-radius:290486px}.pagination,.pagination-list{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;text-align:center}.pagination-ellipsis,.pagination-link,.pagination-next,.pagination-previous{font-size:1em;-ms-flex-pack:center;justify-content:center;margin:.25rem;padding-left:.5em;padding-right:.5em;text-align:center}.pagination-link,.pagination-next,.pagination-previous{border-color:#dbdbdb;color:#363636;min-width:2.25em}.pagination-link:hover,.pagination-next:hover,.pagination-previous:hover{border-color:#b5b5b5;color:#363636}.pagination-link:focus,.pagination-next:focus,.pagination-previous:focus{border-color:#239ed7}.pagination-link:active,.pagination-next:active,.pagination-previous:active{-webkit-box-shadow:inset 0 1px 2px rgba(10,10,10,.2);box-shadow:inset 0 1px 2px rgba(10,10,10,.2)}.pagination-link[disabled],.pagination-next[disabled],.pagination-previous[disabled]{background-color:#dbdbdb;border-color:#dbdbdb;-webkit-box-shadow:none;box-shadow:none;color:#7a7a7a;opacity:.5}.pagination-next,.pagination-previous{padding-left:.75em;padding-right:.75em;white-space:nowrap}.pagination-link.is-current{background-color:#239ed7;border-color:#239ed7;color:#fff}.pagination-ellipsis{color:#b5b5b5;pointer-events:none}.pagination-list{-ms-flex-wrap:wrap;flex-wrap:wrap}\@media screen and (max-width:768px){.pagination{-ms-flex-wrap:wrap;flex-wrap:wrap}.pagination-list li,.pagination-next,.pagination-previous{-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1}}\@media print,screen and (min-width:769px){.pagination-list{-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-order:1;order:1}.pagination-previous{-ms-flex-order:2;order:2}.pagination-next{-ms-flex-order:3;order:3}.pagination{-ms-flex-pack:justify;justify-content:space-between}.pagination.is-centered .pagination-previous{-ms-flex-order:1;order:1}.pagination.is-centered .pagination-list{-ms-flex-pack:center;justify-content:center;-ms-flex-order:2;order:2}.pagination.is-centered .pagination-next{-ms-flex-order:3;order:3}.pagination.is-right .pagination-previous{-ms-flex-order:1;order:1}.pagination.is-right .pagination-next{-ms-flex-order:2;order:2}.pagination.is-right .pagination-list{-ms-flex-pack:end;justify-content:flex-end;-ms-flex-order:3;order:3}}.panel{font-size:1rem}.panel:not(:last-child){margin-bottom:1.5rem}.panel-block,.panel-heading,.panel-tabs{border-bottom:1px solid #dbdbdb;border-left:1px solid #dbdbdb;border-right:1px solid #dbdbdb}.panel-block:first-child,.panel-heading:first-child,.panel-tabs:first-child{border-top:1px solid #dbdbdb}.panel-heading{background-color:#f5f5f5;border-radius:4px 4px 0 0;color:#363636;font-size:1.25em;font-weight:300;line-height:1.25;padding:.5em .75em}.panel-tabs{-ms-flex-align:end;align-items:flex-end;display:-ms-flexbox;display:flex;font-size:.875em;-ms-flex-pack:center;justify-content:center}.panel-tabs a{border-bottom:1px solid #dbdbdb;margin-bottom:-1px;padding:.5em}.panel-tabs a.is-active{border-bottom-color:#4a4a4a;color:#363636}.panel-list a{color:#4a4a4a}.panel-list a:hover{color:#239ed7}.panel-block{-ms-flex-align:center;align-items:center;color:#363636;display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;padding:.5em .75em}.panel-block input[type=checkbox]{margin-right:.75em}.panel-block>.control{-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1;width:100%}.panel-block.is-wrapped{-ms-flex-wrap:wrap;flex-wrap:wrap}.panel-block.is-active{border-left-color:#239ed7;color:#363636}.panel-block.is-active .panel-icon{color:#239ed7}a.panel-block,label.panel-block{cursor:pointer}a.panel-block:hover,label.panel-block:hover{background-color:#f5f5f5}.panel-icon{display:inline-block;font-size:14px;font-size:.875rem;height:1em;line-height:1em;text-align:center;vertical-align:top;width:1em;color:#7a7a7a;margin-right:.75em}.panel-icon .fa{font-size:inherit;line-height:inherit}.tabs{-webkit-overflow-scrolling:touch;-ms-flex-align:stretch;align-items:stretch;font-size:1rem;-ms-flex-pack:justify;justify-content:space-between;overflow:hidden;overflow-x:auto;white-space:nowrap}.tabs,.tabs a{display:-ms-flexbox;display:flex}.tabs a{-ms-flex-align:center;align-items:center;border-bottom-color:#dbdbdb;border-bottom-style:solid;border-bottom-width:1px;color:#4a4a4a;-ms-flex-pack:center;justify-content:center;margin-bottom:-1px;padding:.5em 1em;vertical-align:top}.tabs a:hover{border-bottom-color:#363636;color:#363636}.tabs li{display:block}.tabs li.is-active a{border-bottom-color:#239ed7;color:#239ed7}.tabs ul{-ms-flex-align:center;align-items:center;border-bottom-color:#dbdbdb;border-bottom-style:solid;border-bottom-width:1px;display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:0;flex-shrink:0;-ms-flex-pack:start;justify-content:flex-start}.tabs ul.is-center,.tabs ul.is-left{padding-right:.75em}.tabs ul.is-center{-ms-flex:none;flex:none;-ms-flex-pack:center;justify-content:center;padding-left:.75em}.tabs ul.is-right{-ms-flex-pack:end;justify-content:flex-end;padding-left:.75em}.tabs .icon:first-child{margin-right:.5em}.tabs .icon:last-child{margin-left:.5em}.tabs.is-centered ul{-ms-flex-pack:center;justify-content:center}.tabs.is-right ul{-ms-flex-pack:end;justify-content:flex-end}.tabs.is-boxed a{border:1px solid transparent;border-radius:4px 4px 0 0}.tabs.is-boxed a:hover{background-color:#f5f5f5;border-bottom-color:#dbdbdb}.tabs.is-boxed li.is-active a{background-color:#fff;border-color:#dbdbdb;border-bottom-color:transparent!important}.tabs.is-fullwidth li{-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:0;flex-shrink:0}.tabs.is-toggle a{border-color:#dbdbdb;border-style:solid;border-width:1px;margin-bottom:0;position:relative}.tabs.is-toggle a:hover{background-color:#f5f5f5;border-color:#b5b5b5;z-index:2}.tabs.is-toggle li+li{margin-left:-1px}.tabs.is-toggle li:first-child a{border-radius:4px 0 0 4px}.tabs.is-toggle li:last-child a{border-radius:0 4px 4px 0}.tabs.is-toggle li.is-active a{background-color:#239ed7;border-color:#239ed7;color:#fff;z-index:1}.tabs.is-toggle ul{border-bottom:none}.tabs.is-toggle.is-toggle-rounded li:first-child a{border-bottom-left-radius:290486px;border-top-left-radius:290486px;padding-left:1.25em}.tabs.is-toggle.is-toggle-rounded li:last-child a{border-bottom-right-radius:290486px;border-top-right-radius:290486px;padding-right:1.25em}.tabs.is-small{font-size:.75rem}.tabs.is-medium{font-size:1.25rem}.tabs.is-large{font-size:1.5rem}.column{display:block;-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1;padding:.75rem}.columns.is-mobile>.column.is-narrow{-ms-flex:none;flex:none}.columns.is-mobile>.column.is-full{-ms-flex:none;flex:none;width:100%}.columns.is-mobile>.column.is-three-quarters{-ms-flex:none;flex:none;width:75%}.columns.is-mobile>.column.is-two-thirds{-ms-flex:none;flex:none;width:66.6666%}.columns.is-mobile>.column.is-half{-ms-flex:none;flex:none;width:50%}.columns.is-mobile>.column.is-one-third{-ms-flex:none;flex:none;width:33.3333%}.columns.is-mobile>.column.is-one-quarter{-ms-flex:none;flex:none;width:25%}.columns.is-mobile>.column.is-one-fifth{-ms-flex:none;flex:none;width:20%}.columns.is-mobile>.column.is-two-fifths{-ms-flex:none;flex:none;width:40%}.columns.is-mobile>.column.is-three-fifths{-ms-flex:none;flex:none;width:60%}.columns.is-mobile>.column.is-four-fifths{-ms-flex:none;flex:none;width:80%}.columns.is-mobile>.column.is-offset-three-quarters{margin-left:75%}.columns.is-mobile>.column.is-offset-two-thirds{margin-left:66.6666%}.columns.is-mobile>.column.is-offset-half{margin-left:50%}.columns.is-mobile>.column.is-offset-one-third{margin-left:33.3333%}.columns.is-mobile>.column.is-offset-one-quarter{margin-left:25%}.columns.is-mobile>.column.is-offset-one-fifth{margin-left:20%}.columns.is-mobile>.column.is-offset-two-fifths{margin-left:40%}.columns.is-mobile>.column.is-offset-three-fifths{margin-left:60%}.columns.is-mobile>.column.is-offset-four-fifths{margin-left:80%}.columns.is-mobile>.column.is-0{-ms-flex:none;flex:none;width:0}.columns.is-mobile>.column.is-offset-0{margin-left:0}.columns.is-mobile>.column.is-1{-ms-flex:none;flex:none;width:8.3333333333%}.columns.is-mobile>.column.is-offset-1{margin-left:8.3333333333%}.columns.is-mobile>.column.is-2{-ms-flex:none;flex:none;width:16.6666666667%}.columns.is-mobile>.column.is-offset-2{margin-left:16.6666666667%}.columns.is-mobile>.column.is-3{-ms-flex:none;flex:none;width:25%}.columns.is-mobile>.column.is-offset-3{margin-left:25%}.columns.is-mobile>.column.is-4{-ms-flex:none;flex:none;width:33.3333333333%}.columns.is-mobile>.column.is-offset-4{margin-left:33.3333333333%}.columns.is-mobile>.column.is-5{-ms-flex:none;flex:none;width:41.6666666667%}.columns.is-mobile>.column.is-offset-5{margin-left:41.6666666667%}.columns.is-mobile>.column.is-6{-ms-flex:none;flex:none;width:50%}.columns.is-mobile>.column.is-offset-6{margin-left:50%}.columns.is-mobile>.column.is-7{-ms-flex:none;flex:none;width:58.3333333333%}.columns.is-mobile>.column.is-offset-7{margin-left:58.3333333333%}.columns.is-mobile>.column.is-8{-ms-flex:none;flex:none;width:66.6666666667%}.columns.is-mobile>.column.is-offset-8{margin-left:66.6666666667%}.columns.is-mobile>.column.is-9{-ms-flex:none;flex:none;width:75%}.columns.is-mobile>.column.is-offset-9{margin-left:75%}.columns.is-mobile>.column.is-10{-ms-flex:none;flex:none;width:83.3333333333%}.columns.is-mobile>.column.is-offset-10{margin-left:83.3333333333%}.columns.is-mobile>.column.is-11{-ms-flex:none;flex:none;width:91.6666666667%}.columns.is-mobile>.column.is-offset-11{margin-left:91.6666666667%}.columns.is-mobile>.column.is-12{-ms-flex:none;flex:none;width:100%}.columns.is-mobile>.column.is-offset-12{margin-left:100%}\@media screen and (max-width:768px){.column.is-full-mobile,.column.is-narrow-mobile{-ms-flex:none;flex:none}.column.is-full-mobile{width:100%}.column.is-three-quarters-mobile{-ms-flex:none;flex:none;width:75%}.column.is-two-thirds-mobile{-ms-flex:none;flex:none;width:66.6666%}.column.is-half-mobile{-ms-flex:none;flex:none;width:50%}.column.is-one-third-mobile{-ms-flex:none;flex:none;width:33.3333%}.column.is-one-quarter-mobile{-ms-flex:none;flex:none;width:25%}.column.is-one-fifth-mobile{-ms-flex:none;flex:none;width:20%}.column.is-two-fifths-mobile{-ms-flex:none;flex:none;width:40%}.column.is-three-fifths-mobile{-ms-flex:none;flex:none;width:60%}.column.is-four-fifths-mobile{-ms-flex:none;flex:none;width:80%}.column.is-offset-three-quarters-mobile{margin-left:75%}.column.is-offset-two-thirds-mobile{margin-left:66.6666%}.column.is-offset-half-mobile{margin-left:50%}.column.is-offset-one-third-mobile{margin-left:33.3333%}.column.is-offset-one-quarter-mobile{margin-left:25%}.column.is-offset-one-fifth-mobile{margin-left:20%}.column.is-offset-two-fifths-mobile{margin-left:40%}.column.is-offset-three-fifths-mobile{margin-left:60%}.column.is-offset-four-fifths-mobile{margin-left:80%}.column.is-0-mobile{-ms-flex:none;flex:none;width:0}.column.is-offset-0-mobile{margin-left:0}.column.is-1-mobile{-ms-flex:none;flex:none;width:8.3333333333%}.column.is-offset-1-mobile{margin-left:8.3333333333%}.column.is-2-mobile{-ms-flex:none;flex:none;width:16.6666666667%}.column.is-offset-2-mobile{margin-left:16.6666666667%}.column.is-3-mobile{-ms-flex:none;flex:none;width:25%}.column.is-offset-3-mobile{margin-left:25%}.column.is-4-mobile{-ms-flex:none;flex:none;width:33.3333333333%}.column.is-offset-4-mobile{margin-left:33.3333333333%}.column.is-5-mobile{-ms-flex:none;flex:none;width:41.6666666667%}.column.is-offset-5-mobile{margin-left:41.6666666667%}.column.is-6-mobile{-ms-flex:none;flex:none;width:50%}.column.is-offset-6-mobile{margin-left:50%}.column.is-7-mobile{-ms-flex:none;flex:none;width:58.3333333333%}.column.is-offset-7-mobile{margin-left:58.3333333333%}.column.is-8-mobile{-ms-flex:none;flex:none;width:66.6666666667%}.column.is-offset-8-mobile{margin-left:66.6666666667%}.column.is-9-mobile{-ms-flex:none;flex:none;width:75%}.column.is-offset-9-mobile{margin-left:75%}.column.is-10-mobile{-ms-flex:none;flex:none;width:83.3333333333%}.column.is-offset-10-mobile{margin-left:83.3333333333%}.column.is-11-mobile{-ms-flex:none;flex:none;width:91.6666666667%}.column.is-offset-11-mobile{margin-left:91.6666666667%}.column.is-12-mobile{-ms-flex:none;flex:none;width:100%}.column.is-offset-12-mobile{margin-left:100%}}\@media print,screen and (min-width:769px){.column.is-narrow,.column.is-narrow-tablet{-ms-flex:none;flex:none}.column.is-full,.column.is-full-tablet{-ms-flex:none;flex:none;width:100%}.column.is-three-quarters,.column.is-three-quarters-tablet{-ms-flex:none;flex:none;width:75%}.column.is-two-thirds,.column.is-two-thirds-tablet{-ms-flex:none;flex:none;width:66.6666%}.column.is-half,.column.is-half-tablet{-ms-flex:none;flex:none;width:50%}.column.is-one-third,.column.is-one-third-tablet{-ms-flex:none;flex:none;width:33.3333%}.column.is-one-quarter,.column.is-one-quarter-tablet{-ms-flex:none;flex:none;width:25%}.column.is-one-fifth,.column.is-one-fifth-tablet{-ms-flex:none;flex:none;width:20%}.column.is-two-fifths,.column.is-two-fifths-tablet{-ms-flex:none;flex:none;width:40%}.column.is-three-fifths,.column.is-three-fifths-tablet{-ms-flex:none;flex:none;width:60%}.column.is-four-fifths,.column.is-four-fifths-tablet{-ms-flex:none;flex:none;width:80%}.column.is-offset-three-quarters,.column.is-offset-three-quarters-tablet{margin-left:75%}.column.is-offset-two-thirds,.column.is-offset-two-thirds-tablet{margin-left:66.6666%}.column.is-offset-half,.column.is-offset-half-tablet{margin-left:50%}.column.is-offset-one-third,.column.is-offset-one-third-tablet{margin-left:33.3333%}.column.is-offset-one-quarter,.column.is-offset-one-quarter-tablet{margin-left:25%}.column.is-offset-one-fifth,.column.is-offset-one-fifth-tablet{margin-left:20%}.column.is-offset-two-fifths,.column.is-offset-two-fifths-tablet{margin-left:40%}.column.is-offset-three-fifths,.column.is-offset-three-fifths-tablet{margin-left:60%}.column.is-offset-four-fifths,.column.is-offset-four-fifths-tablet{margin-left:80%}.column.is-0,.column.is-0-tablet{-ms-flex:none;flex:none;width:0}.column.is-offset-0,.column.is-offset-0-tablet{margin-left:0}.column.is-1,.column.is-1-tablet{-ms-flex:none;flex:none;width:8.3333333333%}.column.is-offset-1,.column.is-offset-1-tablet{margin-left:8.3333333333%}.column.is-2,.column.is-2-tablet{-ms-flex:none;flex:none;width:16.6666666667%}.column.is-offset-2,.column.is-offset-2-tablet{margin-left:16.6666666667%}.column.is-3,.column.is-3-tablet{-ms-flex:none;flex:none;width:25%}.column.is-offset-3,.column.is-offset-3-tablet{margin-left:25%}.column.is-4,.column.is-4-tablet{-ms-flex:none;flex:none;width:33.3333333333%}.column.is-offset-4,.column.is-offset-4-tablet{margin-left:33.3333333333%}.column.is-5,.column.is-5-tablet{-ms-flex:none;flex:none;width:41.6666666667%}.column.is-offset-5,.column.is-offset-5-tablet{margin-left:41.6666666667%}.column.is-6,.column.is-6-tablet{-ms-flex:none;flex:none;width:50%}.column.is-offset-6,.column.is-offset-6-tablet{margin-left:50%}.column.is-7,.column.is-7-tablet{-ms-flex:none;flex:none;width:58.3333333333%}.column.is-offset-7,.column.is-offset-7-tablet{margin-left:58.3333333333%}.column.is-8,.column.is-8-tablet{-ms-flex:none;flex:none;width:66.6666666667%}.column.is-offset-8,.column.is-offset-8-tablet{margin-left:66.6666666667%}.column.is-9,.column.is-9-tablet{-ms-flex:none;flex:none;width:75%}.column.is-offset-9,.column.is-offset-9-tablet{margin-left:75%}.column.is-10,.column.is-10-tablet{-ms-flex:none;flex:none;width:83.3333333333%}.column.is-offset-10,.column.is-offset-10-tablet{margin-left:83.3333333333%}.column.is-11,.column.is-11-tablet{-ms-flex:none;flex:none;width:91.6666666667%}.column.is-offset-11,.column.is-offset-11-tablet{margin-left:91.6666666667%}.column.is-12,.column.is-12-tablet{-ms-flex:none;flex:none;width:100%}.column.is-offset-12,.column.is-offset-12-tablet{margin-left:100%}}\@media screen and (max-width:1023px){.column.is-full-touch,.column.is-narrow-touch{-ms-flex:none;flex:none}.column.is-full-touch{width:100%}.column.is-three-quarters-touch{-ms-flex:none;flex:none;width:75%}.column.is-two-thirds-touch{-ms-flex:none;flex:none;width:66.6666%}.column.is-half-touch{-ms-flex:none;flex:none;width:50%}.column.is-one-third-touch{-ms-flex:none;flex:none;width:33.3333%}.column.is-one-quarter-touch{-ms-flex:none;flex:none;width:25%}.column.is-one-fifth-touch{-ms-flex:none;flex:none;width:20%}.column.is-two-fifths-touch{-ms-flex:none;flex:none;width:40%}.column.is-three-fifths-touch{-ms-flex:none;flex:none;width:60%}.column.is-four-fifths-touch{-ms-flex:none;flex:none;width:80%}.column.is-offset-three-quarters-touch{margin-left:75%}.column.is-offset-two-thirds-touch{margin-left:66.6666%}.column.is-offset-half-touch{margin-left:50%}.column.is-offset-one-third-touch{margin-left:33.3333%}.column.is-offset-one-quarter-touch{margin-left:25%}.column.is-offset-one-fifth-touch{margin-left:20%}.column.is-offset-two-fifths-touch{margin-left:40%}.column.is-offset-three-fifths-touch{margin-left:60%}.column.is-offset-four-fifths-touch{margin-left:80%}.column.is-0-touch{-ms-flex:none;flex:none;width:0}.column.is-offset-0-touch{margin-left:0}.column.is-1-touch{-ms-flex:none;flex:none;width:8.3333333333%}.column.is-offset-1-touch{margin-left:8.3333333333%}.column.is-2-touch{-ms-flex:none;flex:none;width:16.6666666667%}.column.is-offset-2-touch{margin-left:16.6666666667%}.column.is-3-touch{-ms-flex:none;flex:none;width:25%}.column.is-offset-3-touch{margin-left:25%}.column.is-4-touch{-ms-flex:none;flex:none;width:33.3333333333%}.column.is-offset-4-touch{margin-left:33.3333333333%}.column.is-5-touch{-ms-flex:none;flex:none;width:41.6666666667%}.column.is-offset-5-touch{margin-left:41.6666666667%}.column.is-6-touch{-ms-flex:none;flex:none;width:50%}.column.is-offset-6-touch{margin-left:50%}.column.is-7-touch{-ms-flex:none;flex:none;width:58.3333333333%}.column.is-offset-7-touch{margin-left:58.3333333333%}.column.is-8-touch{-ms-flex:none;flex:none;width:66.6666666667%}.column.is-offset-8-touch{margin-left:66.6666666667%}.column.is-9-touch{-ms-flex:none;flex:none;width:75%}.column.is-offset-9-touch{margin-left:75%}.column.is-10-touch{-ms-flex:none;flex:none;width:83.3333333333%}.column.is-offset-10-touch{margin-left:83.3333333333%}.column.is-11-touch{-ms-flex:none;flex:none;width:91.6666666667%}.column.is-offset-11-touch{margin-left:91.6666666667%}.column.is-12-touch{-ms-flex:none;flex:none;width:100%}.column.is-offset-12-touch{margin-left:100%}}\@media screen and (min-width:1024px){.column.is-narrow-desktop{-ms-flex:none;flex:none}.column.is-full-desktop{-ms-flex:none;flex:none;width:100%}.column.is-three-quarters-desktop{-ms-flex:none;flex:none;width:75%}.column.is-two-thirds-desktop{-ms-flex:none;flex:none;width:66.6666%}.column.is-half-desktop{-ms-flex:none;flex:none;width:50%}.column.is-one-third-desktop{-ms-flex:none;flex:none;width:33.3333%}.column.is-one-quarter-desktop{-ms-flex:none;flex:none;width:25%}.column.is-one-fifth-desktop{-ms-flex:none;flex:none;width:20%}.column.is-two-fifths-desktop{-ms-flex:none;flex:none;width:40%}.column.is-three-fifths-desktop{-ms-flex:none;flex:none;width:60%}.column.is-four-fifths-desktop{-ms-flex:none;flex:none;width:80%}.column.is-offset-three-quarters-desktop{margin-left:75%}.column.is-offset-two-thirds-desktop{margin-left:66.6666%}.column.is-offset-half-desktop{margin-left:50%}.column.is-offset-one-third-desktop{margin-left:33.3333%}.column.is-offset-one-quarter-desktop{margin-left:25%}.column.is-offset-one-fifth-desktop{margin-left:20%}.column.is-offset-two-fifths-desktop{margin-left:40%}.column.is-offset-three-fifths-desktop{margin-left:60%}.column.is-offset-four-fifths-desktop{margin-left:80%}.column.is-0-desktop{-ms-flex:none;flex:none;width:0}.column.is-offset-0-desktop{margin-left:0}.column.is-1-desktop{-ms-flex:none;flex:none;width:8.3333333333%}.column.is-offset-1-desktop{margin-left:8.3333333333%}.column.is-2-desktop{-ms-flex:none;flex:none;width:16.6666666667%}.column.is-offset-2-desktop{margin-left:16.6666666667%}.column.is-3-desktop{-ms-flex:none;flex:none;width:25%}.column.is-offset-3-desktop{margin-left:25%}.column.is-4-desktop{-ms-flex:none;flex:none;width:33.3333333333%}.column.is-offset-4-desktop{margin-left:33.3333333333%}.column.is-5-desktop{-ms-flex:none;flex:none;width:41.6666666667%}.column.is-offset-5-desktop{margin-left:41.6666666667%}.column.is-6-desktop{-ms-flex:none;flex:none;width:50%}.column.is-offset-6-desktop{margin-left:50%}.column.is-7-desktop{-ms-flex:none;flex:none;width:58.3333333333%}.column.is-offset-7-desktop{margin-left:58.3333333333%}.column.is-8-desktop{-ms-flex:none;flex:none;width:66.6666666667%}.column.is-offset-8-desktop{margin-left:66.6666666667%}.column.is-9-desktop{-ms-flex:none;flex:none;width:75%}.column.is-offset-9-desktop{margin-left:75%}.column.is-10-desktop{-ms-flex:none;flex:none;width:83.3333333333%}.column.is-offset-10-desktop{margin-left:83.3333333333%}.column.is-11-desktop{-ms-flex:none;flex:none;width:91.6666666667%}.column.is-offset-11-desktop{margin-left:91.6666666667%}.column.is-12-desktop{-ms-flex:none;flex:none;width:100%}.column.is-offset-12-desktop{margin-left:100%}}\@media screen and (min-width:1216px){.column.is-narrow-widescreen{-ms-flex:none;flex:none}.column.is-full-widescreen{-ms-flex:none;flex:none;width:100%}.column.is-three-quarters-widescreen{-ms-flex:none;flex:none;width:75%}.column.is-two-thirds-widescreen{-ms-flex:none;flex:none;width:66.6666%}.column.is-half-widescreen{-ms-flex:none;flex:none;width:50%}.column.is-one-third-widescreen{-ms-flex:none;flex:none;width:33.3333%}.column.is-one-quarter-widescreen{-ms-flex:none;flex:none;width:25%}.column.is-one-fifth-widescreen{-ms-flex:none;flex:none;width:20%}.column.is-two-fifths-widescreen{-ms-flex:none;flex:none;width:40%}.column.is-three-fifths-widescreen{-ms-flex:none;flex:none;width:60%}.column.is-four-fifths-widescreen{-ms-flex:none;flex:none;width:80%}.column.is-offset-three-quarters-widescreen{margin-left:75%}.column.is-offset-two-thirds-widescreen{margin-left:66.6666%}.column.is-offset-half-widescreen{margin-left:50%}.column.is-offset-one-third-widescreen{margin-left:33.3333%}.column.is-offset-one-quarter-widescreen{margin-left:25%}.column.is-offset-one-fifth-widescreen{margin-left:20%}.column.is-offset-two-fifths-widescreen{margin-left:40%}.column.is-offset-three-fifths-widescreen{margin-left:60%}.column.is-offset-four-fifths-widescreen{margin-left:80%}.column.is-0-widescreen{-ms-flex:none;flex:none;width:0}.column.is-offset-0-widescreen{margin-left:0}.column.is-1-widescreen{-ms-flex:none;flex:none;width:8.3333333333%}.column.is-offset-1-widescreen{margin-left:8.3333333333%}.column.is-2-widescreen{-ms-flex:none;flex:none;width:16.6666666667%}.column.is-offset-2-widescreen{margin-left:16.6666666667%}.column.is-3-widescreen{-ms-flex:none;flex:none;width:25%}.column.is-offset-3-widescreen{margin-left:25%}.column.is-4-widescreen{-ms-flex:none;flex:none;width:33.3333333333%}.column.is-offset-4-widescreen{margin-left:33.3333333333%}.column.is-5-widescreen{-ms-flex:none;flex:none;width:41.6666666667%}.column.is-offset-5-widescreen{margin-left:41.6666666667%}.column.is-6-widescreen{-ms-flex:none;flex:none;width:50%}.column.is-offset-6-widescreen{margin-left:50%}.column.is-7-widescreen{-ms-flex:none;flex:none;width:58.3333333333%}.column.is-offset-7-widescreen{margin-left:58.3333333333%}.column.is-8-widescreen{-ms-flex:none;flex:none;width:66.6666666667%}.column.is-offset-8-widescreen{margin-left:66.6666666667%}.column.is-9-widescreen{-ms-flex:none;flex:none;width:75%}.column.is-offset-9-widescreen{margin-left:75%}.column.is-10-widescreen{-ms-flex:none;flex:none;width:83.3333333333%}.column.is-offset-10-widescreen{margin-left:83.3333333333%}.column.is-11-widescreen{-ms-flex:none;flex:none;width:91.6666666667%}.column.is-offset-11-widescreen{margin-left:91.6666666667%}.column.is-12-widescreen{-ms-flex:none;flex:none;width:100%}.column.is-offset-12-widescreen{margin-left:100%}}\@media screen and (min-width:1408px){.column.is-full-fullhd,.column.is-narrow-fullhd{-ms-flex:none;flex:none}.column.is-full-fullhd{width:100%}.column.is-three-quarters-fullhd{-ms-flex:none;flex:none;width:75%}.column.is-two-thirds-fullhd{-ms-flex:none;flex:none;width:66.6666%}.column.is-half-fullhd{-ms-flex:none;flex:none;width:50%}.column.is-one-third-fullhd{-ms-flex:none;flex:none;width:33.3333%}.column.is-one-quarter-fullhd{-ms-flex:none;flex:none;width:25%}.column.is-one-fifth-fullhd{-ms-flex:none;flex:none;width:20%}.column.is-two-fifths-fullhd{-ms-flex:none;flex:none;width:40%}.column.is-three-fifths-fullhd{-ms-flex:none;flex:none;width:60%}.column.is-four-fifths-fullhd{-ms-flex:none;flex:none;width:80%}.column.is-offset-three-quarters-fullhd{margin-left:75%}.column.is-offset-two-thirds-fullhd{margin-left:66.6666%}.column.is-offset-half-fullhd{margin-left:50%}.column.is-offset-one-third-fullhd{margin-left:33.3333%}.column.is-offset-one-quarter-fullhd{margin-left:25%}.column.is-offset-one-fifth-fullhd{margin-left:20%}.column.is-offset-two-fifths-fullhd{margin-left:40%}.column.is-offset-three-fifths-fullhd{margin-left:60%}.column.is-offset-four-fifths-fullhd{margin-left:80%}.column.is-0-fullhd{-ms-flex:none;flex:none;width:0}.column.is-offset-0-fullhd{margin-left:0}.column.is-1-fullhd{-ms-flex:none;flex:none;width:8.3333333333%}.column.is-offset-1-fullhd{margin-left:8.3333333333%}.column.is-2-fullhd{-ms-flex:none;flex:none;width:16.6666666667%}.column.is-offset-2-fullhd{margin-left:16.6666666667%}.column.is-3-fullhd{-ms-flex:none;flex:none;width:25%}.column.is-offset-3-fullhd{margin-left:25%}.column.is-4-fullhd{-ms-flex:none;flex:none;width:33.3333333333%}.column.is-offset-4-fullhd{margin-left:33.3333333333%}.column.is-5-fullhd{-ms-flex:none;flex:none;width:41.6666666667%}.column.is-offset-5-fullhd{margin-left:41.6666666667%}.column.is-6-fullhd{-ms-flex:none;flex:none;width:50%}.column.is-offset-6-fullhd{margin-left:50%}.column.is-7-fullhd{-ms-flex:none;flex:none;width:58.3333333333%}.column.is-offset-7-fullhd{margin-left:58.3333333333%}.column.is-8-fullhd{-ms-flex:none;flex:none;width:66.6666666667%}.column.is-offset-8-fullhd{margin-left:66.6666666667%}.column.is-9-fullhd{-ms-flex:none;flex:none;width:75%}.column.is-offset-9-fullhd{margin-left:75%}.column.is-10-fullhd{-ms-flex:none;flex:none;width:83.3333333333%}.column.is-offset-10-fullhd{margin-left:83.3333333333%}.column.is-11-fullhd{-ms-flex:none;flex:none;width:91.6666666667%}.column.is-offset-11-fullhd{margin-left:91.6666666667%}.column.is-12-fullhd{-ms-flex:none;flex:none;width:100%}.column.is-offset-12-fullhd{margin-left:100%}}.columns{margin-left:-.75rem;margin-right:-.75rem;margin-top:-.75rem}.columns:last-child{margin-bottom:-.75rem}.columns:not(:last-child){margin-bottom:calc(1.5rem - .75rem)}.columns.is-centered{-ms-flex-pack:center;justify-content:center}.columns.is-gapless{margin-left:0;margin-right:0;margin-top:0}.columns.is-gapless>.column{margin:0;padding:0!important}.columns.is-gapless:not(:last-child){margin-bottom:1.5rem}.columns.is-gapless:last-child{margin-bottom:0}.columns.is-mobile{display:-ms-flexbox;display:flex}.columns.is-multiline{-ms-flex-wrap:wrap;flex-wrap:wrap}.columns.is-vcentered{-ms-flex-align:center;align-items:center}\@media print,screen and (min-width:769px){.columns:not(.is-desktop){display:-ms-flexbox;display:flex}}\@media screen and (min-width:1024px){.columns.is-desktop{display:-ms-flexbox;display:flex}}.columns.is-variable{--columnGap:0.75rem;margin-left:calc(-1 * var(--columnGap));margin-right:calc(-1 * var(--columnGap))}.columns.is-variable .column{padding-left:var(--columnGap);padding-right:var(--columnGap)}.columns.is-variable.is-0{--columnGap:0rem}\@media screen and (max-width:768px){.columns.is-variable.is-0-mobile{--columnGap:0rem}}\@media print,screen and (min-width:769px){.columns.is-variable.is-0-tablet{--columnGap:0rem}}\@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-0-tablet-only{--columnGap:0rem}}\@media screen and (max-width:1023px){.columns.is-variable.is-0-touch{--columnGap:0rem}}\@media screen and (min-width:1024px){.columns.is-variable.is-0-desktop{--columnGap:0rem}}\@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-0-desktop-only{--columnGap:0rem}}\@media screen and (min-width:1216px){.columns.is-variable.is-0-widescreen{--columnGap:0rem}}\@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-0-widescreen-only{--columnGap:0rem}}\@media screen and (min-width:1408px){.columns.is-variable.is-0-fullhd{--columnGap:0rem}}.columns.is-variable.is-1{--columnGap:0.25rem}\@media screen and (max-width:768px){.columns.is-variable.is-1-mobile{--columnGap:0.25rem}}\@media print,screen and (min-width:769px){.columns.is-variable.is-1-tablet{--columnGap:0.25rem}}\@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-1-tablet-only{--columnGap:0.25rem}}\@media screen and (max-width:1023px){.columns.is-variable.is-1-touch{--columnGap:0.25rem}}\@media screen and (min-width:1024px){.columns.is-variable.is-1-desktop{--columnGap:0.25rem}}\@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-1-desktop-only{--columnGap:0.25rem}}\@media screen and (min-width:1216px){.columns.is-variable.is-1-widescreen{--columnGap:0.25rem}}\@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-1-widescreen-only{--columnGap:0.25rem}}\@media screen and (min-width:1408px){.columns.is-variable.is-1-fullhd{--columnGap:0.25rem}}.columns.is-variable.is-2{--columnGap:0.5rem}\@media screen and (max-width:768px){.columns.is-variable.is-2-mobile{--columnGap:0.5rem}}\@media print,screen and (min-width:769px){.columns.is-variable.is-2-tablet{--columnGap:0.5rem}}\@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-2-tablet-only{--columnGap:0.5rem}}\@media screen and (max-width:1023px){.columns.is-variable.is-2-touch{--columnGap:0.5rem}}\@media screen and (min-width:1024px){.columns.is-variable.is-2-desktop{--columnGap:0.5rem}}\@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-2-desktop-only{--columnGap:0.5rem}}\@media screen and (min-width:1216px){.columns.is-variable.is-2-widescreen{--columnGap:0.5rem}}\@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-2-widescreen-only{--columnGap:0.5rem}}\@media screen and (min-width:1408px){.columns.is-variable.is-2-fullhd{--columnGap:0.5rem}}.columns.is-variable.is-3{--columnGap:0.75rem}\@media screen and (max-width:768px){.columns.is-variable.is-3-mobile{--columnGap:0.75rem}}\@media print,screen and (min-width:769px){.columns.is-variable.is-3-tablet{--columnGap:0.75rem}}\@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-3-tablet-only{--columnGap:0.75rem}}\@media screen and (max-width:1023px){.columns.is-variable.is-3-touch{--columnGap:0.75rem}}\@media screen and (min-width:1024px){.columns.is-variable.is-3-desktop{--columnGap:0.75rem}}\@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-3-desktop-only{--columnGap:0.75rem}}\@media screen and (min-width:1216px){.columns.is-variable.is-3-widescreen{--columnGap:0.75rem}}\@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-3-widescreen-only{--columnGap:0.75rem}}\@media screen and (min-width:1408px){.columns.is-variable.is-3-fullhd{--columnGap:0.75rem}}.columns.is-variable.is-4{--columnGap:1rem}\@media screen and (max-width:768px){.columns.is-variable.is-4-mobile{--columnGap:1rem}}\@media print,screen and (min-width:769px){.columns.is-variable.is-4-tablet{--columnGap:1rem}}\@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-4-tablet-only{--columnGap:1rem}}\@media screen and (max-width:1023px){.columns.is-variable.is-4-touch{--columnGap:1rem}}\@media screen and (min-width:1024px){.columns.is-variable.is-4-desktop{--columnGap:1rem}}\@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-4-desktop-only{--columnGap:1rem}}\@media screen and (min-width:1216px){.columns.is-variable.is-4-widescreen{--columnGap:1rem}}\@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-4-widescreen-only{--columnGap:1rem}}\@media screen and (min-width:1408px){.columns.is-variable.is-4-fullhd{--columnGap:1rem}}.columns.is-variable.is-5{--columnGap:1.25rem}\@media screen and (max-width:768px){.columns.is-variable.is-5-mobile{--columnGap:1.25rem}}\@media print,screen and (min-width:769px){.columns.is-variable.is-5-tablet{--columnGap:1.25rem}}\@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-5-tablet-only{--columnGap:1.25rem}}\@media screen and (max-width:1023px){.columns.is-variable.is-5-touch{--columnGap:1.25rem}}\@media screen and (min-width:1024px){.columns.is-variable.is-5-desktop{--columnGap:1.25rem}}\@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-5-desktop-only{--columnGap:1.25rem}}\@media screen and (min-width:1216px){.columns.is-variable.is-5-widescreen{--columnGap:1.25rem}}\@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-5-widescreen-only{--columnGap:1.25rem}}\@media screen and (min-width:1408px){.columns.is-variable.is-5-fullhd{--columnGap:1.25rem}}.columns.is-variable.is-6{--columnGap:1.5rem}\@media screen and (max-width:768px){.columns.is-variable.is-6-mobile{--columnGap:1.5rem}}\@media print,screen and (min-width:769px){.columns.is-variable.is-6-tablet{--columnGap:1.5rem}}\@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-6-tablet-only{--columnGap:1.5rem}}\@media screen and (max-width:1023px){.columns.is-variable.is-6-touch{--columnGap:1.5rem}}\@media screen and (min-width:1024px){.columns.is-variable.is-6-desktop{--columnGap:1.5rem}}\@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-6-desktop-only{--columnGap:1.5rem}}\@media screen and (min-width:1216px){.columns.is-variable.is-6-widescreen{--columnGap:1.5rem}}\@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-6-widescreen-only{--columnGap:1.5rem}}\@media screen and (min-width:1408px){.columns.is-variable.is-6-fullhd{--columnGap:1.5rem}}.columns.is-variable.is-7{--columnGap:1.75rem}\@media screen and (max-width:768px){.columns.is-variable.is-7-mobile{--columnGap:1.75rem}}\@media print,screen and (min-width:769px){.columns.is-variable.is-7-tablet{--columnGap:1.75rem}}\@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-7-tablet-only{--columnGap:1.75rem}}\@media screen and (max-width:1023px){.columns.is-variable.is-7-touch{--columnGap:1.75rem}}\@media screen and (min-width:1024px){.columns.is-variable.is-7-desktop{--columnGap:1.75rem}}\@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-7-desktop-only{--columnGap:1.75rem}}\@media screen and (min-width:1216px){.columns.is-variable.is-7-widescreen{--columnGap:1.75rem}}\@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-7-widescreen-only{--columnGap:1.75rem}}\@media screen and (min-width:1408px){.columns.is-variable.is-7-fullhd{--columnGap:1.75rem}}.columns.is-variable.is-8{--columnGap:2rem}\@media screen and (max-width:768px){.columns.is-variable.is-8-mobile{--columnGap:2rem}}\@media print,screen and (min-width:769px){.columns.is-variable.is-8-tablet{--columnGap:2rem}}\@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-8-tablet-only{--columnGap:2rem}}\@media screen and (max-width:1023px){.columns.is-variable.is-8-touch{--columnGap:2rem}}\@media screen and (min-width:1024px){.columns.is-variable.is-8-desktop{--columnGap:2rem}}\@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-8-desktop-only{--columnGap:2rem}}\@media screen and (min-width:1216px){.columns.is-variable.is-8-widescreen{--columnGap:2rem}}\@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-8-widescreen-only{--columnGap:2rem}}\@media screen and (min-width:1408px){.columns.is-variable.is-8-fullhd{--columnGap:2rem}}.tile{-ms-flex-align:stretch;align-items:stretch;display:block;-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1;min-height:-webkit-min-content;min-height:-moz-min-content;min-height:min-content}.tile.is-ancestor{margin-left:-.75rem;margin-right:-.75rem;margin-top:-.75rem}.tile.is-ancestor:last-child{margin-bottom:-.75rem}.tile.is-ancestor:not(:last-child){margin-bottom:.75rem}.tile.is-child{margin:0!important}.tile.is-parent{padding:.75rem}.tile.is-vertical{-ms-flex-direction:column;flex-direction:column}.tile.is-vertical>.tile.is-child:not(:last-child){margin-bottom:1.5rem!important}\@media print,screen and (min-width:769px){.tile:not(.is-child){display:-ms-flexbox;display:flex}.tile.is-1{width:8.3333333333%}.tile.is-1,.tile.is-2{-ms-flex:none;flex:none}.tile.is-2{width:16.6666666667%}.tile.is-3{width:25%}.tile.is-3,.tile.is-4{-ms-flex:none;flex:none}.tile.is-4{width:33.3333333333%}.tile.is-5{width:41.6666666667%}.tile.is-5,.tile.is-6{-ms-flex:none;flex:none}.tile.is-6{width:50%}.tile.is-7{width:58.3333333333%}.tile.is-7,.tile.is-8{-ms-flex:none;flex:none}.tile.is-8{width:66.6666666667%}.tile.is-9{width:75%}.tile.is-9,.tile.is-10{-ms-flex:none;flex:none}.tile.is-10{width:83.3333333333%}.tile.is-11{-ms-flex:none;flex:none;width:91.6666666667%}.tile.is-12{-ms-flex:none;flex:none;width:100%}}.hero{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between}.hero .navbar{background:none}.hero .tabs ul{border-bottom:none}.hero.is-white{background-color:#fff;color:#0a0a0a}.hero.is-white a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-white strong{color:inherit}.hero.is-white .title{color:#0a0a0a}.hero.is-white .subtitle{color:rgba(10,10,10,.9)}.hero.is-white .subtitle a:not(.button),.hero.is-white .subtitle strong{color:#0a0a0a}\@media screen and (max-width:1023px){.hero.is-white .navbar-menu{background-color:#fff}}.hero.is-white .navbar-item,.hero.is-white .navbar-link{color:rgba(10,10,10,.7)}.hero.is-white .navbar-link.is-active,.hero.is-white .navbar-link:hover,.hero.is-white a.navbar-item.is-active,.hero.is-white a.navbar-item:hover{background-color:#f2f2f2;color:#0a0a0a}.hero.is-white .tabs a{color:#0a0a0a;opacity:.9}.hero.is-white .tabs a:hover{opacity:1}.hero.is-white .tabs li.is-active a{opacity:1}.hero.is-white .tabs.is-boxed a,.hero.is-white .tabs.is-toggle a{color:#0a0a0a}.hero.is-white .tabs.is-boxed a:hover,.hero.is-white .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-white .tabs.is-boxed li.is-active a,.hero.is-white .tabs.is-boxed li.is-active a:hover,.hero.is-white .tabs.is-toggle li.is-active a,.hero.is-white .tabs.is-toggle li.is-active a:hover{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.hero.is-white.is-bold{background-image:linear-gradient(141deg,#e8e3e4,#fff 71%,#fff)}\@media screen and (max-width:768px){.hero.is-white.is-bold .navbar-menu{background-image:linear-gradient(141deg,#e8e3e4,#fff 71%,#fff)}}.hero.is-black{background-color:#0a0a0a;color:#fff}.hero.is-black a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-black strong{color:inherit}.hero.is-black .title{color:#fff}.hero.is-black .subtitle{color:hsla(0,0%,100%,.9)}.hero.is-black .subtitle a:not(.button),.hero.is-black .subtitle strong{color:#fff}\@media screen and (max-width:1023px){.hero.is-black .navbar-menu{background-color:#0a0a0a}}.hero.is-black .navbar-item,.hero.is-black .navbar-link{color:hsla(0,0%,100%,.7)}.hero.is-black .navbar-link.is-active,.hero.is-black .navbar-link:hover,.hero.is-black a.navbar-item.is-active,.hero.is-black a.navbar-item:hover{background-color:#000;color:#fff}.hero.is-black .tabs a{color:#fff;opacity:.9}.hero.is-black .tabs a:hover{opacity:1}.hero.is-black .tabs li.is-active a{opacity:1}.hero.is-black .tabs.is-boxed a,.hero.is-black .tabs.is-toggle a{color:#fff}.hero.is-black .tabs.is-boxed a:hover,.hero.is-black .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-black .tabs.is-boxed li.is-active a,.hero.is-black .tabs.is-boxed li.is-active a:hover,.hero.is-black .tabs.is-toggle li.is-active a,.hero.is-black .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#0a0a0a}.hero.is-black.is-bold{background-image:linear-gradient(141deg,#000,#0a0a0a 71%,#181616)}\@media screen and (max-width:768px){.hero.is-black.is-bold .navbar-menu{background-image:linear-gradient(141deg,#000,#0a0a0a 71%,#181616)}}.hero.is-light{background-color:#f5f5f5;color:#363636}.hero.is-light a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-light strong{color:inherit}.hero.is-light .title{color:#363636}.hero.is-light .subtitle{color:rgba(54,54,54,.9)}.hero.is-light .subtitle a:not(.button),.hero.is-light .subtitle strong{color:#363636}\@media screen and (max-width:1023px){.hero.is-light .navbar-menu{background-color:#f5f5f5}}.hero.is-light .navbar-item,.hero.is-light .navbar-link{color:rgba(54,54,54,.7)}.hero.is-light .navbar-link.is-active,.hero.is-light .navbar-link:hover,.hero.is-light a.navbar-item.is-active,.hero.is-light a.navbar-item:hover{background-color:#e8e8e8;color:#363636}.hero.is-light .tabs a{color:#363636;opacity:.9}.hero.is-light .tabs a:hover{opacity:1}.hero.is-light .tabs li.is-active a{opacity:1}.hero.is-light .tabs.is-boxed a,.hero.is-light .tabs.is-toggle a{color:#363636}.hero.is-light .tabs.is-boxed a:hover,.hero.is-light .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-light .tabs.is-boxed li.is-active a,.hero.is-light .tabs.is-boxed li.is-active a:hover,.hero.is-light .tabs.is-toggle li.is-active a,.hero.is-light .tabs.is-toggle li.is-active a:hover{background-color:#363636;border-color:#363636;color:#f5f5f5}.hero.is-light.is-bold{background-image:linear-gradient(141deg,#dfd8d9,#f5f5f5 71%,#fff)}\@media screen and (max-width:768px){.hero.is-light.is-bold .navbar-menu{background-image:linear-gradient(141deg,#dfd8d9,#f5f5f5 71%,#fff)}}.hero.is-dark{background-color:#363636;color:#f5f5f5}.hero.is-dark a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-dark strong{color:inherit}.hero.is-dark .title{color:#f5f5f5}.hero.is-dark .subtitle{color:hsla(0,0%,96.1%,.9)}.hero.is-dark .subtitle a:not(.button),.hero.is-dark .subtitle strong{color:#f5f5f5}\@media screen and (max-width:1023px){.hero.is-dark .navbar-menu{background-color:#363636}}.hero.is-dark .navbar-item,.hero.is-dark .navbar-link{color:hsla(0,0%,96.1%,.7)}.hero.is-dark .navbar-link.is-active,.hero.is-dark .navbar-link:hover,.hero.is-dark a.navbar-item.is-active,.hero.is-dark a.navbar-item:hover{background-color:#292929;color:#f5f5f5}.hero.is-dark .tabs a{color:#f5f5f5;opacity:.9}.hero.is-dark .tabs a:hover{opacity:1}.hero.is-dark .tabs li.is-active a{opacity:1}.hero.is-dark .tabs.is-boxed a,.hero.is-dark .tabs.is-toggle a{color:#f5f5f5}.hero.is-dark .tabs.is-boxed a:hover,.hero.is-dark .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-dark .tabs.is-boxed li.is-active a,.hero.is-dark .tabs.is-boxed li.is-active a:hover,.hero.is-dark .tabs.is-toggle li.is-active a,.hero.is-dark .tabs.is-toggle li.is-active a:hover{background-color:#f5f5f5;border-color:#f5f5f5;color:#363636}.hero.is-dark.is-bold{background-image:linear-gradient(141deg,#1f191a,#363636 71%,#46403f)}\@media screen and (max-width:768px){.hero.is-dark.is-bold .navbar-menu{background-image:linear-gradient(141deg,#1f191a,#363636 71%,#46403f)}}.hero.is-primary{background-color:#239ed7;color:#fff}.hero.is-primary a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-primary strong{color:inherit}.hero.is-primary .title{color:#fff}.hero.is-primary .subtitle{color:hsla(0,0%,100%,.9)}.hero.is-primary .subtitle a:not(.button),.hero.is-primary .subtitle strong{color:#fff}\@media screen and (max-width:1023px){.hero.is-primary .navbar-menu{background-color:#239ed7}}.hero.is-primary .navbar-item,.hero.is-primary .navbar-link{color:hsla(0,0%,100%,.7)}.hero.is-primary .navbar-link.is-active,.hero.is-primary .navbar-link:hover,.hero.is-primary a.navbar-item.is-active,.hero.is-primary a.navbar-item:hover{background-color:#1f8ec1;color:#fff}.hero.is-primary .tabs a{color:#fff;opacity:.9}.hero.is-primary .tabs a:hover{opacity:1}.hero.is-primary .tabs li.is-active a{opacity:1}.hero.is-primary .tabs.is-boxed a,.hero.is-primary .tabs.is-toggle a{color:#fff}.hero.is-primary .tabs.is-boxed a:hover,.hero.is-primary .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-primary .tabs.is-boxed li.is-active a,.hero.is-primary .tabs.is-boxed li.is-active a:hover,.hero.is-primary .tabs.is-toggle li.is-active a,.hero.is-primary .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#239ed7}.hero.is-primary.is-bold{background-image:linear-gradient(141deg,#129db5,#239ed7 71%,#2f8de4)}\@media screen and (max-width:768px){.hero.is-primary.is-bold .navbar-menu{background-image:linear-gradient(141deg,#129db5,#239ed7 71%,#2f8de4)}}.hero.is-link{background-color:#239ed7;color:#fff}.hero.is-link a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-link strong{color:inherit}.hero.is-link .title{color:#fff}.hero.is-link .subtitle{color:hsla(0,0%,100%,.9)}.hero.is-link .subtitle a:not(.button),.hero.is-link .subtitle strong{color:#fff}\@media screen and (max-width:1023px){.hero.is-link .navbar-menu{background-color:#239ed7}}.hero.is-link .navbar-item,.hero.is-link .navbar-link{color:hsla(0,0%,100%,.7)}.hero.is-link .navbar-link.is-active,.hero.is-link .navbar-link:hover,.hero.is-link a.navbar-item.is-active,.hero.is-link a.navbar-item:hover{background-color:#1f8ec1;color:#fff}.hero.is-link .tabs a{color:#fff;opacity:.9}.hero.is-link .tabs a:hover{opacity:1}.hero.is-link .tabs li.is-active a{opacity:1}.hero.is-link .tabs.is-boxed a,.hero.is-link .tabs.is-toggle a{color:#fff}.hero.is-link .tabs.is-boxed a:hover,.hero.is-link .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-link .tabs.is-boxed li.is-active a,.hero.is-link .tabs.is-boxed li.is-active a:hover,.hero.is-link .tabs.is-toggle li.is-active a,.hero.is-link .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#239ed7}.hero.is-link.is-bold{background-image:linear-gradient(141deg,#129db5,#239ed7 71%,#2f8de4)}\@media screen and (max-width:768px){.hero.is-link.is-bold .navbar-menu{background-image:linear-gradient(141deg,#129db5,#239ed7 71%,#2f8de4)}}.hero.is-info{background-color:#209cee;color:#fff}.hero.is-info a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-info strong{color:inherit}.hero.is-info .title{color:#fff}.hero.is-info .subtitle{color:hsla(0,0%,100%,.9)}.hero.is-info .subtitle a:not(.button),.hero.is-info .subtitle strong{color:#fff}\@media screen and (max-width:1023px){.hero.is-info .navbar-menu{background-color:#209cee}}.hero.is-info .navbar-item,.hero.is-info .navbar-link{color:hsla(0,0%,100%,.7)}.hero.is-info .navbar-link.is-active,.hero.is-info .navbar-link:hover,.hero.is-info a.navbar-item.is-active,.hero.is-info a.navbar-item:hover{background-color:#118fe4;color:#fff}.hero.is-info .tabs a{color:#fff;opacity:.9}.hero.is-info .tabs a:hover{opacity:1}.hero.is-info .tabs li.is-active a{opacity:1}.hero.is-info .tabs.is-boxed a,.hero.is-info .tabs.is-toggle a{color:#fff}.hero.is-info .tabs.is-boxed a:hover,.hero.is-info .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-info .tabs.is-boxed li.is-active a,.hero.is-info .tabs.is-boxed li.is-active a:hover,.hero.is-info .tabs.is-toggle li.is-active a,.hero.is-info .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#209cee}.hero.is-info.is-bold{background-image:linear-gradient(141deg,#04a6d7,#209cee 71%,#3287f5)}\@media screen and (max-width:768px){.hero.is-info.is-bold .navbar-menu{background-image:linear-gradient(141deg,#04a6d7,#209cee 71%,#3287f5)}}.hero.is-success{background-color:#23d160;color:#fff}.hero.is-success a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-success strong{color:inherit}.hero.is-success .title{color:#fff}.hero.is-success .subtitle{color:hsla(0,0%,100%,.9)}.hero.is-success .subtitle a:not(.button),.hero.is-success .subtitle strong{color:#fff}\@media screen and (max-width:1023px){.hero.is-success .navbar-menu{background-color:#23d160}}.hero.is-success .navbar-item,.hero.is-success .navbar-link{color:hsla(0,0%,100%,.7)}.hero.is-success .navbar-link.is-active,.hero.is-success .navbar-link:hover,.hero.is-success a.navbar-item.is-active,.hero.is-success a.navbar-item:hover{background-color:#20bc56;color:#fff}.hero.is-success .tabs a{color:#fff;opacity:.9}.hero.is-success .tabs a:hover{opacity:1}.hero.is-success .tabs li.is-active a{opacity:1}.hero.is-success .tabs.is-boxed a,.hero.is-success .tabs.is-toggle a{color:#fff}.hero.is-success .tabs.is-boxed a:hover,.hero.is-success .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-success .tabs.is-boxed li.is-active a,.hero.is-success .tabs.is-boxed li.is-active a:hover,.hero.is-success .tabs.is-toggle li.is-active a,.hero.is-success .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#23d160}.hero.is-success.is-bold{background-image:linear-gradient(141deg,#12af2f,#23d160 71%,#2ce28a)}\@media screen and (max-width:768px){.hero.is-success.is-bold .navbar-menu{background-image:linear-gradient(141deg,#12af2f,#23d160 71%,#2ce28a)}}.hero.is-warning{background-color:#ffdd57;color:rgba(0,0,0,.7)}.hero.is-warning a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-warning strong{color:inherit}.hero.is-warning .title{color:rgba(0,0,0,.7)}.hero.is-warning .subtitle{color:rgba(0,0,0,.9)}.hero.is-warning .subtitle a:not(.button),.hero.is-warning .subtitle strong{color:rgba(0,0,0,.7)}\@media screen and (max-width:1023px){.hero.is-warning .navbar-menu{background-color:#ffdd57}}.hero.is-warning .navbar-item,.hero.is-warning .navbar-link{color:rgba(0,0,0,.7)}.hero.is-warning .navbar-link.is-active,.hero.is-warning .navbar-link:hover,.hero.is-warning a.navbar-item.is-active,.hero.is-warning a.navbar-item:hover{background-color:#ffd83d;color:rgba(0,0,0,.7)}.hero.is-warning .tabs a{color:rgba(0,0,0,.7);opacity:.9}.hero.is-warning .tabs a:hover{opacity:1}.hero.is-warning .tabs li.is-active a{opacity:1}.hero.is-warning .tabs.is-boxed a,.hero.is-warning .tabs.is-toggle a{color:rgba(0,0,0,.7)}.hero.is-warning .tabs.is-boxed a:hover,.hero.is-warning .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-warning .tabs.is-boxed li.is-active a,.hero.is-warning .tabs.is-boxed li.is-active a:hover,.hero.is-warning .tabs.is-toggle li.is-active a,.hero.is-warning .tabs.is-toggle li.is-active a:hover{background-color:rgba(0,0,0,.7);border-color:rgba(0,0,0,.7);color:#ffdd57}.hero.is-warning.is-bold{background-image:linear-gradient(141deg,#ffaf24,#ffdd57 71%,#fffa70)}\@media screen and (max-width:768px){.hero.is-warning.is-bold .navbar-menu{background-image:linear-gradient(141deg,#ffaf24,#ffdd57 71%,#fffa70)}}.hero.is-danger{background-color:#ff3860;color:#fff}.hero.is-danger a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-danger strong{color:inherit}.hero.is-danger .title{color:#fff}.hero.is-danger .subtitle{color:hsla(0,0%,100%,.9)}.hero.is-danger .subtitle a:not(.button),.hero.is-danger .subtitle strong{color:#fff}\@media screen and (max-width:1023px){.hero.is-danger .navbar-menu{background-color:#ff3860}}.hero.is-danger .navbar-item,.hero.is-danger .navbar-link{color:hsla(0,0%,100%,.7)}.hero.is-danger .navbar-link.is-active,.hero.is-danger .navbar-link:hover,.hero.is-danger a.navbar-item.is-active,.hero.is-danger a.navbar-item:hover{background-color:#ff1f4b;color:#fff}.hero.is-danger .tabs a{color:#fff;opacity:.9}.hero.is-danger .tabs a:hover{opacity:1}.hero.is-danger .tabs li.is-active a{opacity:1}.hero.is-danger .tabs.is-boxed a,.hero.is-danger .tabs.is-toggle a{color:#fff}.hero.is-danger .tabs.is-boxed a:hover,.hero.is-danger .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-danger .tabs.is-boxed li.is-active a,.hero.is-danger .tabs.is-boxed li.is-active a:hover,.hero.is-danger .tabs.is-toggle li.is-active a,.hero.is-danger .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#ff3860}.hero.is-danger.is-bold{background-image:linear-gradient(141deg,#ff0561,#ff3860 71%,#ff5257)}\@media screen and (max-width:768px){.hero.is-danger.is-bold .navbar-menu{background-image:linear-gradient(141deg,#ff0561,#ff3860 71%,#ff5257)}}.hero.is-small .hero-body{padding-bottom:1.5rem;padding-top:1.5rem}\@media print,screen and (min-width:769px){.hero.is-medium .hero-body{padding-bottom:9rem;padding-top:9rem}}\@media print,screen and (min-width:769px){.hero.is-large .hero-body{padding-bottom:18rem;padding-top:18rem}}.hero.is-fullheight-with-navbar .hero-body,.hero.is-fullheight .hero-body,.hero.is-halfheight .hero-body{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}.hero.is-fullheight-with-navbar .hero-body>.container,.hero.is-fullheight .hero-body>.container,.hero.is-halfheight .hero-body>.container{-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1}.hero.is-halfheight{min-height:50vh}.hero.is-fullheight{min-height:100vh}.hero-video{overflow:hidden}.hero-video video{left:50%;min-height:100%;min-width:100%;position:absolute;top:50%;-webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0)}.hero-video.is-transparent{opacity:.3}\@media screen and (max-width:768px){.hero-video{display:none}}.hero-buttons{margin-top:1.5rem}\@media screen and (max-width:768px){.hero-buttons .button{display:-ms-flexbox;display:flex}.hero-buttons .button:not(:last-child){margin-bottom:.75rem}}\@media print,screen and (min-width:769px){.hero-buttons{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}.hero-buttons .button:not(:last-child){margin-right:1.5rem}}.hero-foot,.hero-head{-ms-flex-positive:0;flex-grow:0}.hero-body,.hero-foot,.hero-head{-ms-flex-negative:0;flex-shrink:0}.hero-body{-ms-flex-positive:1;flex-grow:1}.hero-body,.section{padding:3rem 1.5rem}\@media screen and (min-width:1024px){.section.is-medium{padding:9rem 1.5rem}.section.is-large{padding:18rem 1.5rem}}.footer{background-color:#fafafa;padding:3rem 1.5rem 6rem}.switch[type=checkbox]{outline:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:inline-block;position:absolute;opacity:0}.switch[type=checkbox]:focus+label:after,.switch[type=checkbox]:focus+label:before{outline:1px dotted #b5b5b5}.switch[type=checkbox][disabled]{cursor:not-allowed}.switch[type=checkbox][disabled]+label{opacity:.5}.switch[type=checkbox][disabled]+label:before{opacity:.5}.switch[type=checkbox][disabled]+label:after{opacity:.5}.switch[type=checkbox][disabled]+label:hover{cursor:not-allowed}.switch[type=checkbox]+label{position:relative;display:initial;font-size:1rem;line-height:normal;padding-left:3.5rem;padding-top:.2rem;cursor:pointer}.switch[type=checkbox]+label:before{position:absolute;display:block;top:0;left:0;width:3rem;height:1.5rem;border:.1rem solid transparent;border-radius:4px;background:#b5b5b5;content:\"\"}.switch[type=checkbox]+label:after{display:block;position:absolute;top:.25rem;left:.25rem;width:1rem;height:1rem;-webkit-transform:translateZ(0);transform:translateZ(0);border-radius:4px;background:#fff;-webkit-transition:all .25s ease-out;transition:all .25s ease-out;content:\"\"}.switch[type=checkbox].is-rtl+label{padding-left:0;padding-right:3.5rem}.switch[type=checkbox].is-rtl+label:before{left:auto;right:0}.switch[type=checkbox].is-rtl+label:after{left:auto;right:.25rem}.switch[type=checkbox]:checked+label:before{background:#239ed7}.switch[type=checkbox]:checked+label:after{left:1.625rem}.switch[type=checkbox]:checked.is-rtl+label:after{left:auto;right:1.625rem}.switch[type=checkbox].is-outlined+label:before{background-color:transparent;border-color:#b5b5b5}.switch[type=checkbox].is-outlined+label:after{background:#b5b5b5}.switch[type=checkbox].is-outlined:checked+label:before{background-color:transparent;border-color:#239ed7}.switch[type=checkbox].is-outlined:checked+label:after{background:#239ed7}.switch[type=checkbox].is-thin+label:before{top:.5454545455rem;height:.375rem}.switch[type=checkbox].is-thin+label:after{-webkit-box-shadow:0 0 3px #7a7a7a;box-shadow:0 0 3px #7a7a7a}.switch[type=checkbox].is-rounded+label:before{border-radius:24px}.switch[type=checkbox].is-rounded+label:after{border-radius:50%}.switch[type=checkbox].is-small+label{position:relative;display:initial;font-size:.75rem;line-height:normal;padding-left:2.75rem;padding-top:.2rem;cursor:pointer}.switch[type=checkbox].is-small+label:before{position:absolute;display:block;top:0;left:0;width:2.25rem;height:1.125rem;border:.1rem solid transparent;border-radius:4px;background:#b5b5b5;content:\"\"}.switch[type=checkbox].is-small+label:after{display:block;position:absolute;top:.25rem;left:.25rem;width:.625rem;height:.625rem;-webkit-transform:translateZ(0);transform:translateZ(0);border-radius:4px;background:#fff;-webkit-transition:all .25s ease-out;transition:all .25s ease-out;content:\"\"}.switch[type=checkbox].is-small.is-rtl+label{padding-left:0;padding-right:2.75rem}.switch[type=checkbox].is-small.is-rtl+label:before{left:auto;right:0}.switch[type=checkbox].is-small.is-rtl+label:after{left:auto;right:.25rem}.switch[type=checkbox].is-small:checked+label:before{background:#239ed7}.switch[type=checkbox].is-small:checked+label:after{left:1.25rem}.switch[type=checkbox].is-small:checked.is-rtl+label:after{left:auto;right:1.25rem}.switch[type=checkbox].is-small.is-outlined+label:before{background-color:transparent;border-color:#b5b5b5}.switch[type=checkbox].is-small.is-outlined+label:after{background:#b5b5b5}.switch[type=checkbox].is-small.is-outlined:checked+label:before{background-color:transparent;border-color:#239ed7}.switch[type=checkbox].is-small.is-outlined:checked+label:after{background:#239ed7}.switch[type=checkbox].is-small.is-thin+label:before{top:.4090909091rem;height:.28125rem}.switch[type=checkbox].is-small.is-thin+label:after{-webkit-box-shadow:0 0 3px #7a7a7a;box-shadow:0 0 3px #7a7a7a}.switch[type=checkbox].is-small.is-rounded+label:before{border-radius:24px}.switch[type=checkbox].is-small.is-rounded+label:after{border-radius:50%}.switch[type=checkbox].is-medium+label{position:relative;display:initial;font-size:1.25rem;line-height:normal;padding-left:4.25rem;padding-top:.2rem;cursor:pointer}.switch[type=checkbox].is-medium+label:before{position:absolute;display:block;top:0;left:0;width:3.75rem;height:1.875rem;border:.1rem solid transparent;border-radius:4px;background:#b5b5b5;content:\"\"}.switch[type=checkbox].is-medium+label:after{display:block;position:absolute;top:.25rem;left:.25rem;width:1.375rem;height:1.375rem;-webkit-transform:translateZ(0);transform:translateZ(0);border-radius:4px;background:#fff;-webkit-transition:all .25s ease-out;transition:all .25s ease-out;content:\"\"}.switch[type=checkbox].is-medium.is-rtl+label{padding-left:0;padding-right:4.25rem}.switch[type=checkbox].is-medium.is-rtl+label:before{left:auto;right:0}.switch[type=checkbox].is-medium.is-rtl+label:after{left:auto;right:.25rem}.switch[type=checkbox].is-medium:checked+label:before{background:#239ed7}.switch[type=checkbox].is-medium:checked+label:after{left:2rem}.switch[type=checkbox].is-medium:checked.is-rtl+label:after{left:auto;right:2rem}.switch[type=checkbox].is-medium.is-outlined+label:before{background-color:transparent;border-color:#b5b5b5}.switch[type=checkbox].is-medium.is-outlined+label:after{background:#b5b5b5}.switch[type=checkbox].is-medium.is-outlined:checked+label:before{background-color:transparent;border-color:#239ed7}.switch[type=checkbox].is-medium.is-outlined:checked+label:after{background:#239ed7}.switch[type=checkbox].is-medium.is-thin+label:before{top:.6818181818rem;height:.46875rem}.switch[type=checkbox].is-medium.is-thin+label:after{-webkit-box-shadow:0 0 3px #7a7a7a;box-shadow:0 0 3px #7a7a7a}.switch[type=checkbox].is-medium.is-rounded+label:before{border-radius:24px}.switch[type=checkbox].is-medium.is-rounded+label:after{border-radius:50%}.switch[type=checkbox].is-large+label{position:relative;display:initial;font-size:1.5rem;line-height:normal;padding-left:5rem;padding-top:.2rem;cursor:pointer}.switch[type=checkbox].is-large+label:before{position:absolute;display:block;top:0;left:0;width:4.5rem;height:2.25rem;border:.1rem solid transparent;border-radius:4px;background:#b5b5b5;content:\"\"}.switch[type=checkbox].is-large+label:after{display:block;position:absolute;top:.25rem;left:.25rem;width:1.75rem;height:1.75rem;-webkit-transform:translateZ(0);transform:translateZ(0);border-radius:4px;background:#fff;-webkit-transition:all .25s ease-out;transition:all .25s ease-out;content:\"\"}.switch[type=checkbox].is-large.is-rtl+label{padding-left:0;padding-right:5rem}.switch[type=checkbox].is-large.is-rtl+label:before{left:auto;right:0}.switch[type=checkbox].is-large.is-rtl+label:after{left:auto;right:.25rem}.switch[type=checkbox].is-large:checked+label:before{background:#239ed7}.switch[type=checkbox].is-large:checked+label:after{left:2.375rem}.switch[type=checkbox].is-large:checked.is-rtl+label:after{left:auto;right:2.375rem}.switch[type=checkbox].is-large.is-outlined+label:before{background-color:transparent;border-color:#b5b5b5}.switch[type=checkbox].is-large.is-outlined+label:after{background:#b5b5b5}.switch[type=checkbox].is-large.is-outlined:checked+label:before{background-color:transparent;border-color:#239ed7}.switch[type=checkbox].is-large.is-outlined:checked+label:after{background:#239ed7}.switch[type=checkbox].is-large.is-thin+label:before{top:.8181818182rem;height:.5625rem}.switch[type=checkbox].is-large.is-thin+label:after{-webkit-box-shadow:0 0 3px #7a7a7a;box-shadow:0 0 3px #7a7a7a}.switch[type=checkbox].is-large.is-rounded+label:before{border-radius:24px}.switch[type=checkbox].is-large.is-rounded+label:after{border-radius:50%}.switch[type=checkbox].is-white:checked+label:before{background:#fff}.switch[type=checkbox].is-white.is-outlined:checked+label:before{background-color:transparent;border-color:#fff!important}.switch[type=checkbox].is-white.is-outlined:checked+label:after{background:#fff}.switch[type=checkbox].is-white.is-thin.is-outlined+label:after{-webkit-box-shadow:none;box-shadow:none}.switch[type=checkbox].is-unchecked-white+label:before{background:#fff}.switch[type=checkbox].is-unchecked-white.is-outlined+label:before{background-color:transparent;border-color:#fff!important}.switch[type=checkbox].is-unchecked-white.is-outlined+label:after{background:#fff}.switch[type=checkbox].is-black:checked+label:before{background:#0a0a0a}.switch[type=checkbox].is-black.is-outlined:checked+label:before{background-color:transparent;border-color:#0a0a0a!important}.switch[type=checkbox].is-black.is-outlined:checked+label:after{background:#0a0a0a}.switch[type=checkbox].is-black.is-thin.is-outlined+label:after{-webkit-box-shadow:none;box-shadow:none}.switch[type=checkbox].is-unchecked-black+label:before{background:#0a0a0a}.switch[type=checkbox].is-unchecked-black.is-outlined+label:before{background-color:transparent;border-color:#0a0a0a!important}.switch[type=checkbox].is-unchecked-black.is-outlined+label:after{background:#0a0a0a}.switch[type=checkbox].is-light:checked+label:before{background:#f5f5f5}.switch[type=checkbox].is-light.is-outlined:checked+label:before{background-color:transparent;border-color:#f5f5f5!important}.switch[type=checkbox].is-light.is-outlined:checked+label:after{background:#f5f5f5}.switch[type=checkbox].is-light.is-thin.is-outlined+label:after{-webkit-box-shadow:none;box-shadow:none}.switch[type=checkbox].is-unchecked-light+label:before{background:#f5f5f5}.switch[type=checkbox].is-unchecked-light.is-outlined+label:before{background-color:transparent;border-color:#f5f5f5!important}.switch[type=checkbox].is-unchecked-light.is-outlined+label:after{background:#f5f5f5}.switch[type=checkbox].is-dark:checked+label:before{background:#363636}.switch[type=checkbox].is-dark.is-outlined:checked+label:before{background-color:transparent;border-color:#363636!important}.switch[type=checkbox].is-dark.is-outlined:checked+label:after{background:#363636}.switch[type=checkbox].is-dark.is-thin.is-outlined+label:after{-webkit-box-shadow:none;box-shadow:none}.switch[type=checkbox].is-unchecked-dark+label:before{background:#363636}.switch[type=checkbox].is-unchecked-dark.is-outlined+label:before{background-color:transparent;border-color:#363636!important}.switch[type=checkbox].is-unchecked-dark.is-outlined+label:after{background:#363636}.switch[type=checkbox].is-primary:checked+label:before{background:#239ed7}.switch[type=checkbox].is-primary.is-outlined:checked+label:before{background-color:transparent;border-color:#239ed7!important}.switch[type=checkbox].is-primary.is-outlined:checked+label:after{background:#239ed7}.switch[type=checkbox].is-primary.is-thin.is-outlined+label:after{-webkit-box-shadow:none;box-shadow:none}.switch[type=checkbox].is-unchecked-primary+label:before{background:#239ed7}.switch[type=checkbox].is-unchecked-primary.is-outlined+label:before{background-color:transparent;border-color:#239ed7!important}.switch[type=checkbox].is-unchecked-primary.is-outlined+label:after{background:#239ed7}.switch[type=checkbox].is-link:checked+label:before{background:#239ed7}.switch[type=checkbox].is-link.is-outlined:checked+label:before{background-color:transparent;border-color:#239ed7!important}.switch[type=checkbox].is-link.is-outlined:checked+label:after{background:#239ed7}.switch[type=checkbox].is-link.is-thin.is-outlined+label:after{-webkit-box-shadow:none;box-shadow:none}.switch[type=checkbox].is-unchecked-link+label:before{background:#239ed7}.switch[type=checkbox].is-unchecked-link.is-outlined+label:before{background-color:transparent;border-color:#239ed7!important}.switch[type=checkbox].is-unchecked-link.is-outlined+label:after{background:#239ed7}.switch[type=checkbox].is-info:checked+label:before{background:#209cee}.switch[type=checkbox].is-info.is-outlined:checked+label:before{background-color:transparent;border-color:#209cee!important}.switch[type=checkbox].is-info.is-outlined:checked+label:after{background:#209cee}.switch[type=checkbox].is-info.is-thin.is-outlined+label:after{-webkit-box-shadow:none;box-shadow:none}.switch[type=checkbox].is-unchecked-info+label:before{background:#209cee}.switch[type=checkbox].is-unchecked-info.is-outlined+label:before{background-color:transparent;border-color:#209cee!important}.switch[type=checkbox].is-unchecked-info.is-outlined+label:after{background:#209cee}.switch[type=checkbox].is-success:checked+label:before{background:#23d160}.switch[type=checkbox].is-success.is-outlined:checked+label:before{background-color:transparent;border-color:#23d160!important}.switch[type=checkbox].is-success.is-outlined:checked+label:after{background:#23d160}.switch[type=checkbox].is-success.is-thin.is-outlined+label:after{-webkit-box-shadow:none;box-shadow:none}.switch[type=checkbox].is-unchecked-success+label:before{background:#23d160}.switch[type=checkbox].is-unchecked-success.is-outlined+label:before{background-color:transparent;border-color:#23d160!important}.switch[type=checkbox].is-unchecked-success.is-outlined+label:after{background:#23d160}.switch[type=checkbox].is-warning:checked+label:before{background:#ffdd57}.switch[type=checkbox].is-warning.is-outlined:checked+label:before{background-color:transparent;border-color:#ffdd57!important}.switch[type=checkbox].is-warning.is-outlined:checked+label:after{background:#ffdd57}.switch[type=checkbox].is-warning.is-thin.is-outlined+label:after{-webkit-box-shadow:none;box-shadow:none}.switch[type=checkbox].is-unchecked-warning+label:before{background:#ffdd57}.switch[type=checkbox].is-unchecked-warning.is-outlined+label:before{background-color:transparent;border-color:#ffdd57!important}.switch[type=checkbox].is-unchecked-warning.is-outlined+label:after{background:#ffdd57}.switch[type=checkbox].is-danger:checked+label:before{background:#ff3860}.switch[type=checkbox].is-danger.is-outlined:checked+label:before{background-color:transparent;border-color:#ff3860!important}.switch[type=checkbox].is-danger.is-outlined:checked+label:after{background:#ff3860}.switch[type=checkbox].is-danger.is-thin.is-outlined+label:after{-webkit-box-shadow:none;box-shadow:none}.switch[type=checkbox].is-unchecked-danger+label:before{background:#ff3860}.switch[type=checkbox].is-unchecked-danger.is-outlined+label:before{background-color:transparent;border-color:#ff3860!important}.switch[type=checkbox].is-unchecked-danger.is-outlined+label:after{background:#ff3860}\@font-face{font-family:Material Design Icons;src:url(../fonts/materialdesignicons-webfont.eot?v=5.9.55);src:url(../fonts/materialdesignicons-webfont.eot?#iefix&v=5.9.55) format(\"embedded-opentype\"),url(../fonts/materialdesignicons-webfont.woff2?v=5.9.55) format(\"woff2\"),url(../fonts/materialdesignicons-webfont.woff?v=5.9.55) format(\"woff\"),url(../fonts/materialdesignicons-webfont.ttf?v=5.9.55) format(\"truetype\");font-weight:400;font-style:normal}.mdi-set,.mdi:before{display:inline-block;font:normal normal normal 24px/1 Material Design Icons;font:normal normal normal 1.5rem/1 Material Design Icons;font-size:inherit;text-rendering:auto;line-height:inherit;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.mdi-ab-testing:before{content:\"\\F01C9\"}.mdi-abacus:before{content:\"\\F16E0\"}.mdi-abjad-arabic:before{content:\"\\F1328\"}.mdi-abjad-hebrew:before{content:\"\\F1329\"}.mdi-abugida-devanagari:before{content:\"\\F132A\"}.mdi-abugida-thai:before{content:\"\\F132B\"}.mdi-access-point:before{content:\"\\F0003\"}.mdi-access-point-check:before{content:\"\\F1538\"}.mdi-access-point-minus:before{content:\"\\F1539\"}.mdi-access-point-network:before{content:\"\\F0002\"}.mdi-access-point-network-off:before{content:\"\\F0BE1\"}.mdi-access-point-off:before{content:\"\\F1511\"}.mdi-access-point-plus:before{content:\"\\F153A\"}.mdi-access-point-remove:before{content:\"\\F153B\"}.mdi-account:before{content:\"\\F0004\"}.mdi-account-alert:before{content:\"\\F0005\"}.mdi-account-alert-outline:before{content:\"\\F0B50\"}.mdi-account-arrow-left:before{content:\"\\F0B51\"}.mdi-account-arrow-left-outline:before{content:\"\\F0B52\"}.mdi-account-arrow-right:before{content:\"\\F0B53\"}.mdi-account-arrow-right-outline:before{content:\"\\F0B54\"}.mdi-account-box:before{content:\"\\F0006\"}.mdi-account-box-multiple:before{content:\"\\F0934\"}.mdi-account-box-multiple-outline:before{content:\"\\F100A\"}.mdi-account-box-outline:before{content:\"\\F0007\"}.mdi-account-cancel:before{content:\"\\F12DF\"}.mdi-account-cancel-outline:before{content:\"\\F12E0\"}.mdi-account-cash:before{content:\"\\F1097\"}.mdi-account-cash-outline:before{content:\"\\F1098\"}.mdi-account-check:before{content:\"\\F0008\"}.mdi-account-check-outline:before{content:\"\\F0BE2\"}.mdi-account-child:before{content:\"\\F0A89\"}.mdi-account-child-circle:before{content:\"\\F0A8A\"}.mdi-account-child-outline:before{content:\"\\F10C8\"}.mdi-account-circle:before{content:\"\\F0009\"}.mdi-account-circle-outline:before{content:\"\\F0B55\"}.mdi-account-clock:before{content:\"\\F0B56\"}.mdi-account-clock-outline:before{content:\"\\F0B57\"}.mdi-account-cog:before{content:\"\\F1370\"}.mdi-account-cog-outline:before{content:\"\\F1371\"}.mdi-account-convert:before{content:\"\\F000A\"}.mdi-account-convert-outline:before{content:\"\\F1301\"}.mdi-account-cowboy-hat:before{content:\"\\F0E9B\"}.mdi-account-details:before{content:\"\\F0631\"}.mdi-account-details-outline:before{content:\"\\F1372\"}.mdi-account-edit:before{content:\"\\F06BC\"}.mdi-account-edit-outline:before{content:\"\\F0FFB\"}.mdi-account-group:before{content:\"\\F0849\"}.mdi-account-group-outline:before{content:\"\\F0B58\"}.mdi-account-hard-hat:before{content:\"\\F05B5\"}.mdi-account-heart:before{content:\"\\F0899\"}.mdi-account-heart-outline:before{content:\"\\F0BE3\"}.mdi-account-key:before{content:\"\\F000B\"}.mdi-account-key-outline:before{content:\"\\F0BE4\"}.mdi-account-lock:before{content:\"\\F115E\"}.mdi-account-lock-outline:before{content:\"\\F115F\"}.mdi-account-minus:before{content:\"\\F000D\"}.mdi-account-minus-outline:before{content:\"\\F0AEC\"}.mdi-account-multiple:before{content:\"\\F000E\"}.mdi-account-multiple-check:before{content:\"\\F08C5\"}.mdi-account-multiple-check-outline:before{content:\"\\F11FE\"}.mdi-account-multiple-minus:before{content:\"\\F05D3\"}.mdi-account-multiple-minus-outline:before{content:\"\\F0BE5\"}.mdi-account-multiple-outline:before{content:\"\\F000F\"}.mdi-account-multiple-plus:before{content:\"\\F0010\"}.mdi-account-multiple-plus-outline:before{content:\"\\F0800\"}.mdi-account-multiple-remove:before{content:\"\\F120A\"}.mdi-account-multiple-remove-outline:before{content:\"\\F120B\"}.mdi-account-music:before{content:\"\\F0803\"}.mdi-account-music-outline:before{content:\"\\F0CE9\"}.mdi-account-network:before{content:\"\\F0011\"}.mdi-account-network-outline:before{content:\"\\F0BE6\"}.mdi-account-off:before{content:\"\\F0012\"}.mdi-account-off-outline:before{content:\"\\F0BE7\"}.mdi-account-outline:before{content:\"\\F0013\"}.mdi-account-plus:before{content:\"\\F0014\"}.mdi-account-plus-outline:before{content:\"\\F0801\"}.mdi-account-question:before{content:\"\\F0B59\"}.mdi-account-question-outline:before{content:\"\\F0B5A\"}.mdi-account-reactivate:before{content:\"\\F152B\"}.mdi-account-reactivate-outline:before{content:\"\\F152C\"}.mdi-account-remove:before{content:\"\\F0015\"}.mdi-account-remove-outline:before{content:\"\\F0AED\"}.mdi-account-search:before{content:\"\\F0016\"}.mdi-account-search-outline:before{content:\"\\F0935\"}.mdi-account-settings:before{content:\"\\F0630\"}.mdi-account-settings-outline:before{content:\"\\F10C9\"}.mdi-account-star:before{content:\"\\F0017\"}.mdi-account-star-outline:before{content:\"\\F0BE8\"}.mdi-account-supervisor:before{content:\"\\F0A8B\"}.mdi-account-supervisor-circle:before{content:\"\\F0A8C\"}.mdi-account-supervisor-circle-outline:before{content:\"\\F14EC\"}.mdi-account-supervisor-outline:before{content:\"\\F112D\"}.mdi-account-switch:before{content:\"\\F0019\"}.mdi-account-switch-outline:before{content:\"\\F04CB\"}.mdi-account-tie:before{content:\"\\F0CE3\"}.mdi-account-tie-outline:before{content:\"\\F10CA\"}.mdi-account-tie-voice:before{content:\"\\F1308\"}.mdi-account-tie-voice-off:before{content:\"\\F130A\"}.mdi-account-tie-voice-off-outline:before{content:\"\\F130B\"}.mdi-account-tie-voice-outline:before{content:\"\\F1309\"}.mdi-account-voice:before{content:\"\\F05CB\"}.mdi-adjust:before{content:\"\\F001A\"}.mdi-adobe:before{content:\"\\F0936\"}.mdi-adobe-acrobat:before{content:\"\\F0F9D\"}.mdi-air-conditioner:before{content:\"\\F001B\"}.mdi-air-filter:before{content:\"\\F0D43\"}.mdi-air-horn:before{content:\"\\F0DAC\"}.mdi-air-humidifier:before{content:\"\\F1099\"}.mdi-air-humidifier-off:before{content:\"\\F1466\"}.mdi-air-purifier:before{content:\"\\F0D44\"}.mdi-airbag:before{content:\"\\F0BE9\"}.mdi-airballoon:before{content:\"\\F001C\"}.mdi-airballoon-outline:before{content:\"\\F100B\"}.mdi-airplane:before{content:\"\\F001D\"}.mdi-airplane-landing:before{content:\"\\F05D4\"}.mdi-airplane-off:before{content:\"\\F001E\"}.mdi-airplane-takeoff:before{content:\"\\F05D5\"}.mdi-airport:before{content:\"\\F084B\"}.mdi-alarm:before{content:\"\\F0020\"}.mdi-alarm-bell:before{content:\"\\F078E\"}.mdi-alarm-check:before{content:\"\\F0021\"}.mdi-alarm-light:before{content:\"\\F078F\"}.mdi-alarm-light-off:before{content:\"\\F171E\"}.mdi-alarm-light-off-outline:before{content:\"\\F171F\"}.mdi-alarm-light-outline:before{content:\"\\F0BEA\"}.mdi-alarm-multiple:before{content:\"\\F0022\"}.mdi-alarm-note:before{content:\"\\F0E71\"}.mdi-alarm-note-off:before{content:\"\\F0E72\"}.mdi-alarm-off:before{content:\"\\F0023\"}.mdi-alarm-panel:before{content:\"\\F15C4\"}.mdi-alarm-panel-outline:before{content:\"\\F15C5\"}.mdi-alarm-plus:before{content:\"\\F0024\"}.mdi-alarm-snooze:before{content:\"\\F068E\"}.mdi-album:before{content:\"\\F0025\"}.mdi-alert:before{content:\"\\F0026\"}.mdi-alert-box:before{content:\"\\F0027\"}.mdi-alert-box-outline:before{content:\"\\F0CE4\"}.mdi-alert-circle:before{content:\"\\F0028\"}.mdi-alert-circle-check:before{content:\"\\F11ED\"}.mdi-alert-circle-check-outline:before{content:\"\\F11EE\"}.mdi-alert-circle-outline:before{content:\"\\F05D6\"}.mdi-alert-decagram:before{content:\"\\F06BD\"}.mdi-alert-decagram-outline:before{content:\"\\F0CE5\"}.mdi-alert-minus:before{content:\"\\F14BB\"}.mdi-alert-minus-outline:before{content:\"\\F14BE\"}.mdi-alert-octagon:before{content:\"\\F0029\"}.mdi-alert-octagon-outline:before{content:\"\\F0CE6\"}.mdi-alert-octagram:before{content:\"\\F0767\"}.mdi-alert-octagram-outline:before{content:\"\\F0CE7\"}.mdi-alert-outline:before{content:\"\\F002A\"}.mdi-alert-plus:before{content:\"\\F14BA\"}.mdi-alert-plus-outline:before{content:\"\\F14BD\"}.mdi-alert-remove:before{content:\"\\F14BC\"}.mdi-alert-remove-outline:before{content:\"\\F14BF\"}.mdi-alert-rhombus:before{content:\"\\F11CE\"}.mdi-alert-rhombus-outline:before{content:\"\\F11CF\"}.mdi-alien:before{content:\"\\F089A\"}.mdi-alien-outline:before{content:\"\\F10CB\"}.mdi-align-horizontal-center:before{content:\"\\F11C3\"}.mdi-align-horizontal-left:before{content:\"\\F11C2\"}.mdi-align-horizontal-right:before{content:\"\\F11C4\"}.mdi-align-vertical-bottom:before{content:\"\\F11C5\"}.mdi-align-vertical-center:before{content:\"\\F11C6\"}.mdi-align-vertical-top:before{content:\"\\F11C7\"}.mdi-all-inclusive:before{content:\"\\F06BE\"}.mdi-allergy:before{content:\"\\F1258\"}.mdi-alpha:before{content:\"\\F002B\"}.mdi-alpha-a:before{content:\"\\F0AEE\"}.mdi-alpha-a-box:before{content:\"\\F0B08\"}.mdi-alpha-a-box-outline:before{content:\"\\F0BEB\"}.mdi-alpha-a-circle:before{content:\"\\F0BEC\"}.mdi-alpha-a-circle-outline:before{content:\"\\F0BED\"}.mdi-alpha-b:before{content:\"\\F0AEF\"}.mdi-alpha-b-box:before{content:\"\\F0B09\"}.mdi-alpha-b-box-outline:before{content:\"\\F0BEE\"}.mdi-alpha-b-circle:before{content:\"\\F0BEF\"}.mdi-alpha-b-circle-outline:before{content:\"\\F0BF0\"}.mdi-alpha-c:before{content:\"\\F0AF0\"}.mdi-alpha-c-box:before{content:\"\\F0B0A\"}.mdi-alpha-c-box-outline:before{content:\"\\F0BF1\"}.mdi-alpha-c-circle:before{content:\"\\F0BF2\"}.mdi-alpha-c-circle-outline:before{content:\"\\F0BF3\"}.mdi-alpha-d:before{content:\"\\F0AF1\"}.mdi-alpha-d-box:before{content:\"\\F0B0B\"}.mdi-alpha-d-box-outline:before{content:\"\\F0BF4\"}.mdi-alpha-d-circle:before{content:\"\\F0BF5\"}.mdi-alpha-d-circle-outline:before{content:\"\\F0BF6\"}.mdi-alpha-e:before{content:\"\\F0AF2\"}.mdi-alpha-e-box:before{content:\"\\F0B0C\"}.mdi-alpha-e-box-outline:before{content:\"\\F0BF7\"}.mdi-alpha-e-circle:before{content:\"\\F0BF8\"}.mdi-alpha-e-circle-outline:before{content:\"\\F0BF9\"}.mdi-alpha-f:before{content:\"\\F0AF3\"}.mdi-alpha-f-box:before{content:\"\\F0B0D\"}.mdi-alpha-f-box-outline:before{content:\"\\F0BFA\"}.mdi-alpha-f-circle:before{content:\"\\F0BFB\"}.mdi-alpha-f-circle-outline:before{content:\"\\F0BFC\"}.mdi-alpha-g:before{content:\"\\F0AF4\"}.mdi-alpha-g-box:before{content:\"\\F0B0E\"}.mdi-alpha-g-box-outline:before{content:\"\\F0BFD\"}.mdi-alpha-g-circle:before{content:\"\\F0BFE\"}.mdi-alpha-g-circle-outline:before{content:\"\\F0BFF\"}.mdi-alpha-h:before{content:\"\\F0AF5\"}.mdi-alpha-h-box:before{content:\"\\F0B0F\"}.mdi-alpha-h-box-outline:before{content:\"\\F0C00\"}.mdi-alpha-h-circle:before{content:\"\\F0C01\"}.mdi-alpha-h-circle-outline:before{content:\"\\F0C02\"}.mdi-alpha-i:before{content:\"\\F0AF6\"}.mdi-alpha-i-box:before{content:\"\\F0B10\"}.mdi-alpha-i-box-outline:before{content:\"\\F0C03\"}.mdi-alpha-i-circle:before{content:\"\\F0C04\"}.mdi-alpha-i-circle-outline:before{content:\"\\F0C05\"}.mdi-alpha-j:before{content:\"\\F0AF7\"}.mdi-alpha-j-box:before{content:\"\\F0B11\"}.mdi-alpha-j-box-outline:before{content:\"\\F0C06\"}.mdi-alpha-j-circle:before{content:\"\\F0C07\"}.mdi-alpha-j-circle-outline:before{content:\"\\F0C08\"}.mdi-alpha-k:before{content:\"\\F0AF8\"}.mdi-alpha-k-box:before{content:\"\\F0B12\"}.mdi-alpha-k-box-outline:before{content:\"\\F0C09\"}.mdi-alpha-k-circle:before{content:\"\\F0C0A\"}.mdi-alpha-k-circle-outline:before{content:\"\\F0C0B\"}.mdi-alpha-l:before{content:\"\\F0AF9\"}.mdi-alpha-l-box:before{content:\"\\F0B13\"}.mdi-alpha-l-box-outline:before{content:\"\\F0C0C\"}.mdi-alpha-l-circle:before{content:\"\\F0C0D\"}.mdi-alpha-l-circle-outline:before{content:\"\\F0C0E\"}.mdi-alpha-m:before{content:\"\\F0AFA\"}.mdi-alpha-m-box:before{content:\"\\F0B14\"}.mdi-alpha-m-box-outline:before{content:\"\\F0C0F\"}.mdi-alpha-m-circle:before{content:\"\\F0C10\"}.mdi-alpha-m-circle-outline:before{content:\"\\F0C11\"}.mdi-alpha-n:before{content:\"\\F0AFB\"}.mdi-alpha-n-box:before{content:\"\\F0B15\"}.mdi-alpha-n-box-outline:before{content:\"\\F0C12\"}.mdi-alpha-n-circle:before{content:\"\\F0C13\"}.mdi-alpha-n-circle-outline:before{content:\"\\F0C14\"}.mdi-alpha-o:before{content:\"\\F0AFC\"}.mdi-alpha-o-box:before{content:\"\\F0B16\"}.mdi-alpha-o-box-outline:before{content:\"\\F0C15\"}.mdi-alpha-o-circle:before{content:\"\\F0C16\"}.mdi-alpha-o-circle-outline:before{content:\"\\F0C17\"}.mdi-alpha-p:before{content:\"\\F0AFD\"}.mdi-alpha-p-box:before{content:\"\\F0B17\"}.mdi-alpha-p-box-outline:before{content:\"\\F0C18\"}.mdi-alpha-p-circle:before{content:\"\\F0C19\"}.mdi-alpha-p-circle-outline:before{content:\"\\F0C1A\"}.mdi-alpha-q:before{content:\"\\F0AFE\"}.mdi-alpha-q-box:before{content:\"\\F0B18\"}.mdi-alpha-q-box-outline:before{content:\"\\F0C1B\"}.mdi-alpha-q-circle:before{content:\"\\F0C1C\"}.mdi-alpha-q-circle-outline:before{content:\"\\F0C1D\"}.mdi-alpha-r:before{content:\"\\F0AFF\"}.mdi-alpha-r-box:before{content:\"\\F0B19\"}.mdi-alpha-r-box-outline:before{content:\"\\F0C1E\"}.mdi-alpha-r-circle:before{content:\"\\F0C1F\"}.mdi-alpha-r-circle-outline:before{content:\"\\F0C20\"}.mdi-alpha-s:before{content:\"\\F0B00\"}.mdi-alpha-s-box:before{content:\"\\F0B1A\"}.mdi-alpha-s-box-outline:before{content:\"\\F0C21\"}.mdi-alpha-s-circle:before{content:\"\\F0C22\"}.mdi-alpha-s-circle-outline:before{content:\"\\F0C23\"}.mdi-alpha-t:before{content:\"\\F0B01\"}.mdi-alpha-t-box:before{content:\"\\F0B1B\"}.mdi-alpha-t-box-outline:before{content:\"\\F0C24\"}.mdi-alpha-t-circle:before{content:\"\\F0C25\"}.mdi-alpha-t-circle-outline:before{content:\"\\F0C26\"}.mdi-alpha-u:before{content:\"\\F0B02\"}.mdi-alpha-u-box:before{content:\"\\F0B1C\"}.mdi-alpha-u-box-outline:before{content:\"\\F0C27\"}.mdi-alpha-u-circle:before{content:\"\\F0C28\"}.mdi-alpha-u-circle-outline:before{content:\"\\F0C29\"}.mdi-alpha-v:before{content:\"\\F0B03\"}.mdi-alpha-v-box:before{content:\"\\F0B1D\"}.mdi-alpha-v-box-outline:before{content:\"\\F0C2A\"}.mdi-alpha-v-circle:before{content:\"\\F0C2B\"}.mdi-alpha-v-circle-outline:before{content:\"\\F0C2C\"}.mdi-alpha-w:before{content:\"\\F0B04\"}.mdi-alpha-w-box:before{content:\"\\F0B1E\"}.mdi-alpha-w-box-outline:before{content:\"\\F0C2D\"}.mdi-alpha-w-circle:before{content:\"\\F0C2E\"}.mdi-alpha-w-circle-outline:before{content:\"\\F0C2F\"}.mdi-alpha-x:before{content:\"\\F0B05\"}.mdi-alpha-x-box:before{content:\"\\F0B1F\"}.mdi-alpha-x-box-outline:before{content:\"\\F0C30\"}.mdi-alpha-x-circle:before{content:\"\\F0C31\"}.mdi-alpha-x-circle-outline:before{content:\"\\F0C32\"}.mdi-alpha-y:before{content:\"\\F0B06\"}.mdi-alpha-y-box:before{content:\"\\F0B20\"}.mdi-alpha-y-box-outline:before{content:\"\\F0C33\"}.mdi-alpha-y-circle:before{content:\"\\F0C34\"}.mdi-alpha-y-circle-outline:before{content:\"\\F0C35\"}.mdi-alpha-z:before{content:\"\\F0B07\"}.mdi-alpha-z-box:before{content:\"\\F0B21\"}.mdi-alpha-z-box-outline:before{content:\"\\F0C36\"}.mdi-alpha-z-circle:before{content:\"\\F0C37\"}.mdi-alpha-z-circle-outline:before{content:\"\\F0C38\"}.mdi-alphabet-aurebesh:before{content:\"\\F132C\"}.mdi-alphabet-cyrillic:before{content:\"\\F132D\"}.mdi-alphabet-greek:before{content:\"\\F132E\"}.mdi-alphabet-latin:before{content:\"\\F132F\"}.mdi-alphabet-piqad:before{content:\"\\F1330\"}.mdi-alphabet-tengwar:before{content:\"\\F1337\"}.mdi-alphabetical:before{content:\"\\F002C\"}.mdi-alphabetical-off:before{content:\"\\F100C\"}.mdi-alphabetical-variant:before{content:\"\\F100D\"}.mdi-alphabetical-variant-off:before{content:\"\\F100E\"}.mdi-altimeter:before{content:\"\\F05D7\"}.mdi-amazon:before{content:\"\\F002D\"}.mdi-amazon-alexa:before{content:\"\\F08C6\"}.mdi-ambulance:before{content:\"\\F002F\"}.mdi-ammunition:before{content:\"\\F0CE8\"}.mdi-ampersand:before{content:\"\\F0A8D\"}.mdi-amplifier:before{content:\"\\F0030\"}.mdi-amplifier-off:before{content:\"\\F11B5\"}.mdi-anchor:before{content:\"\\F0031\"}.mdi-android:before{content:\"\\F0032\"}.mdi-android-auto:before{content:\"\\F0A8E\"}.mdi-android-debug-bridge:before{content:\"\\F0033\"}.mdi-android-messages:before{content:\"\\F0D45\"}.mdi-android-studio:before{content:\"\\F0034\"}.mdi-angle-acute:before{content:\"\\F0937\"}.mdi-angle-obtuse:before{content:\"\\F0938\"}.mdi-angle-right:before{content:\"\\F0939\"}.mdi-angular:before{content:\"\\F06B2\"}.mdi-angularjs:before{content:\"\\F06BF\"}.mdi-animation:before{content:\"\\F05D8\"}.mdi-animation-outline:before{content:\"\\F0A8F\"}.mdi-animation-play:before{content:\"\\F093A\"}.mdi-animation-play-outline:before{content:\"\\F0A90\"}.mdi-ansible:before{content:\"\\F109A\"}.mdi-antenna:before{content:\"\\F1119\"}.mdi-anvil:before{content:\"\\F089B\"}.mdi-apache-kafka:before{content:\"\\F100F\"}.mdi-api:before{content:\"\\F109B\"}.mdi-api-off:before{content:\"\\F1257\"}.mdi-apple:before{content:\"\\F0035\"}.mdi-apple-airplay:before{content:\"\\F001F\"}.mdi-apple-finder:before{content:\"\\F0036\"}.mdi-apple-icloud:before{content:\"\\F0038\"}.mdi-apple-ios:before{content:\"\\F0037\"}.mdi-apple-keyboard-caps:before{content:\"\\F0632\"}.mdi-apple-keyboard-command:before{content:\"\\F0633\"}.mdi-apple-keyboard-control:before{content:\"\\F0634\"}.mdi-apple-keyboard-option:before{content:\"\\F0635\"}.mdi-apple-keyboard-shift:before{content:\"\\F0636\"}.mdi-apple-safari:before{content:\"\\F0039\"}.mdi-application:before{content:\"\\F0614\"}.mdi-application-cog:before{content:\"\\F1577\"}.mdi-application-export:before{content:\"\\F0DAD\"}.mdi-application-import:before{content:\"\\F0DAE\"}.mdi-application-settings:before{content:\"\\F1555\"}.mdi-approximately-equal:before{content:\"\\F0F9E\"}.mdi-approximately-equal-box:before{content:\"\\F0F9F\"}.mdi-apps:before{content:\"\\F003B\"}.mdi-apps-box:before{content:\"\\F0D46\"}.mdi-arch:before{content:\"\\F08C7\"}.mdi-archive:before{content:\"\\F003C\"}.mdi-archive-alert:before{content:\"\\F14FD\"}.mdi-archive-alert-outline:before{content:\"\\F14FE\"}.mdi-archive-arrow-down:before{content:\"\\F1259\"}.mdi-archive-arrow-down-outline:before{content:\"\\F125A\"}.mdi-archive-arrow-up:before{content:\"\\F125B\"}.mdi-archive-arrow-up-outline:before{content:\"\\F125C\"}.mdi-archive-outline:before{content:\"\\F120E\"}.mdi-arm-flex:before{content:\"\\F0FD7\"}.mdi-arm-flex-outline:before{content:\"\\F0FD6\"}.mdi-arrange-bring-forward:before{content:\"\\F003D\"}.mdi-arrange-bring-to-front:before{content:\"\\F003E\"}.mdi-arrange-send-backward:before{content:\"\\F003F\"}.mdi-arrange-send-to-back:before{content:\"\\F0040\"}.mdi-arrow-all:before{content:\"\\F0041\"}.mdi-arrow-bottom-left:before{content:\"\\F0042\"}.mdi-arrow-bottom-left-bold-outline:before{content:\"\\F09B7\"}.mdi-arrow-bottom-left-thick:before{content:\"\\F09B8\"}.mdi-arrow-bottom-left-thin-circle-outline:before{content:\"\\F1596\"}.mdi-arrow-bottom-right:before{content:\"\\F0043\"}.mdi-arrow-bottom-right-bold-outline:before{content:\"\\F09B9\"}.mdi-arrow-bottom-right-thick:before{content:\"\\F09BA\"}.mdi-arrow-bottom-right-thin-circle-outline:before{content:\"\\F1595\"}.mdi-arrow-collapse:before{content:\"\\F0615\"}.mdi-arrow-collapse-all:before{content:\"\\F0044\"}.mdi-arrow-collapse-down:before{content:\"\\F0792\"}.mdi-arrow-collapse-horizontal:before{content:\"\\F084C\"}.mdi-arrow-collapse-left:before{content:\"\\F0793\"}.mdi-arrow-collapse-right:before{content:\"\\F0794\"}.mdi-arrow-collapse-up:before{content:\"\\F0795\"}.mdi-arrow-collapse-vertical:before{content:\"\\F084D\"}.mdi-arrow-decision:before{content:\"\\F09BB\"}.mdi-arrow-decision-auto:before{content:\"\\F09BC\"}.mdi-arrow-decision-auto-outline:before{content:\"\\F09BD\"}.mdi-arrow-decision-outline:before{content:\"\\F09BE\"}.mdi-arrow-down:before{content:\"\\F0045\"}.mdi-arrow-down-bold:before{content:\"\\F072E\"}.mdi-arrow-down-bold-box:before{content:\"\\F072F\"}.mdi-arrow-down-bold-box-outline:before{content:\"\\F0730\"}.mdi-arrow-down-bold-circle:before{content:\"\\F0047\"}.mdi-arrow-down-bold-circle-outline:before{content:\"\\F0048\"}.mdi-arrow-down-bold-hexagon-outline:before{content:\"\\F0049\"}.mdi-arrow-down-bold-outline:before{content:\"\\F09BF\"}.mdi-arrow-down-box:before{content:\"\\F06C0\"}.mdi-arrow-down-circle:before{content:\"\\F0CDB\"}.mdi-arrow-down-circle-outline:before{content:\"\\F0CDC\"}.mdi-arrow-down-drop-circle:before{content:\"\\F004A\"}.mdi-arrow-down-drop-circle-outline:before{content:\"\\F004B\"}.mdi-arrow-down-thick:before{content:\"\\F0046\"}.mdi-arrow-down-thin-circle-outline:before{content:\"\\F1599\"}.mdi-arrow-expand:before{content:\"\\F0616\"}.mdi-arrow-expand-all:before{content:\"\\F004C\"}.mdi-arrow-expand-down:before{content:\"\\F0796\"}.mdi-arrow-expand-horizontal:before{content:\"\\F084E\"}.mdi-arrow-expand-left:before{content:\"\\F0797\"}.mdi-arrow-expand-right:before{content:\"\\F0798\"}.mdi-arrow-expand-up:before{content:\"\\F0799\"}.mdi-arrow-expand-vertical:before{content:\"\\F084F\"}.mdi-arrow-horizontal-lock:before{content:\"\\F115B\"}.mdi-arrow-left:before{content:\"\\F004D\"}.mdi-arrow-left-bold:before{content:\"\\F0731\"}.mdi-arrow-left-bold-box:before{content:\"\\F0732\"}.mdi-arrow-left-bold-box-outline:before{content:\"\\F0733\"}.mdi-arrow-left-bold-circle:before{content:\"\\F004F\"}.mdi-arrow-left-bold-circle-outline:before{content:\"\\F0050\"}.mdi-arrow-left-bold-hexagon-outline:before{content:\"\\F0051\"}.mdi-arrow-left-bold-outline:before{content:\"\\F09C0\"}.mdi-arrow-left-box:before{content:\"\\F06C1\"}.mdi-arrow-left-circle:before{content:\"\\F0CDD\"}.mdi-arrow-left-circle-outline:before{content:\"\\F0CDE\"}.mdi-arrow-left-drop-circle:before{content:\"\\F0052\"}.mdi-arrow-left-drop-circle-outline:before{content:\"\\F0053\"}.mdi-arrow-left-right:before{content:\"\\F0E73\"}.mdi-arrow-left-right-bold:before{content:\"\\F0E74\"}.mdi-arrow-left-right-bold-outline:before{content:\"\\F09C1\"}.mdi-arrow-left-thick:before{content:\"\\F004E\"}.mdi-arrow-left-thin-circle-outline:before{content:\"\\F159A\"}.mdi-arrow-right:before{content:\"\\F0054\"}.mdi-arrow-right-bold:before{content:\"\\F0734\"}.mdi-arrow-right-bold-box:before{content:\"\\F0735\"}.mdi-arrow-right-bold-box-outline:before{content:\"\\F0736\"}.mdi-arrow-right-bold-circle:before{content:\"\\F0056\"}.mdi-arrow-right-bold-circle-outline:before{content:\"\\F0057\"}.mdi-arrow-right-bold-hexagon-outline:before{content:\"\\F0058\"}.mdi-arrow-right-bold-outline:before{content:\"\\F09C2\"}.mdi-arrow-right-box:before{content:\"\\F06C2\"}.mdi-arrow-right-circle:before{content:\"\\F0CDF\"}.mdi-arrow-right-circle-outline:before{content:\"\\F0CE0\"}.mdi-arrow-right-drop-circle:before{content:\"\\F0059\"}.mdi-arrow-right-drop-circle-outline:before{content:\"\\F005A\"}.mdi-arrow-right-thick:before{content:\"\\F0055\"}.mdi-arrow-right-thin-circle-outline:before{content:\"\\F1598\"}.mdi-arrow-split-horizontal:before{content:\"\\F093B\"}.mdi-arrow-split-vertical:before{content:\"\\F093C\"}.mdi-arrow-top-left:before{content:\"\\F005B\"}.mdi-arrow-top-left-bold-outline:before{content:\"\\F09C3\"}.mdi-arrow-top-left-bottom-right:before{content:\"\\F0E75\"}.mdi-arrow-top-left-bottom-right-bold:before{content:\"\\F0E76\"}.mdi-arrow-top-left-thick:before{content:\"\\F09C4\"}.mdi-arrow-top-left-thin-circle-outline:before{content:\"\\F1593\"}.mdi-arrow-top-right:before{content:\"\\F005C\"}.mdi-arrow-top-right-bold-outline:before{content:\"\\F09C5\"}.mdi-arrow-top-right-bottom-left:before{content:\"\\F0E77\"}.mdi-arrow-top-right-bottom-left-bold:before{content:\"\\F0E78\"}.mdi-arrow-top-right-thick:before{content:\"\\F09C6\"}.mdi-arrow-top-right-thin-circle-outline:before{content:\"\\F1594\"}.mdi-arrow-up:before{content:\"\\F005D\"}.mdi-arrow-up-bold:before{content:\"\\F0737\"}.mdi-arrow-up-bold-box:before{content:\"\\F0738\"}.mdi-arrow-up-bold-box-outline:before{content:\"\\F0739\"}.mdi-arrow-up-bold-circle:before{content:\"\\F005F\"}.mdi-arrow-up-bold-circle-outline:before{content:\"\\F0060\"}.mdi-arrow-up-bold-hexagon-outline:before{content:\"\\F0061\"}.mdi-arrow-up-bold-outline:before{content:\"\\F09C7\"}.mdi-arrow-up-box:before{content:\"\\F06C3\"}.mdi-arrow-up-circle:before{content:\"\\F0CE1\"}.mdi-arrow-up-circle-outline:before{content:\"\\F0CE2\"}.mdi-arrow-up-down:before{content:\"\\F0E79\"}.mdi-arrow-up-down-bold:before{content:\"\\F0E7A\"}.mdi-arrow-up-down-bold-outline:before{content:\"\\F09C8\"}.mdi-arrow-up-drop-circle:before{content:\"\\F0062\"}.mdi-arrow-up-drop-circle-outline:before{content:\"\\F0063\"}.mdi-arrow-up-thick:before{content:\"\\F005E\"}.mdi-arrow-up-thin-circle-outline:before{content:\"\\F1597\"}.mdi-arrow-vertical-lock:before{content:\"\\F115C\"}.mdi-artstation:before{content:\"\\F0B5B\"}.mdi-aspect-ratio:before{content:\"\\F0A24\"}.mdi-assistant:before{content:\"\\F0064\"}.mdi-asterisk:before{content:\"\\F06C4\"}.mdi-at:before{content:\"\\F0065\"}.mdi-atlassian:before{content:\"\\F0804\"}.mdi-atm:before{content:\"\\F0D47\"}.mdi-atom:before{content:\"\\F0768\"}.mdi-atom-variant:before{content:\"\\F0E7B\"}.mdi-attachment:before{content:\"\\F0066\"}.mdi-audio-video:before{content:\"\\F093D\"}.mdi-audio-video-off:before{content:\"\\F11B6\"}.mdi-augmented-reality:before{content:\"\\F0850\"}.mdi-auto-download:before{content:\"\\F137E\"}.mdi-auto-fix:before{content:\"\\F0068\"}.mdi-auto-upload:before{content:\"\\F0069\"}.mdi-autorenew:before{content:\"\\F006A\"}.mdi-av-timer:before{content:\"\\F006B\"}.mdi-aws:before{content:\"\\F0E0F\"}.mdi-axe:before{content:\"\\F08C8\"}.mdi-axis:before{content:\"\\F0D48\"}.mdi-axis-arrow:before{content:\"\\F0D49\"}.mdi-axis-arrow-info:before{content:\"\\F140E\"}.mdi-axis-arrow-lock:before{content:\"\\F0D4A\"}.mdi-axis-lock:before{content:\"\\F0D4B\"}.mdi-axis-x-arrow:before{content:\"\\F0D4C\"}.mdi-axis-x-arrow-lock:before{content:\"\\F0D4D\"}.mdi-axis-x-rotate-clockwise:before{content:\"\\F0D4E\"}.mdi-axis-x-rotate-counterclockwise:before{content:\"\\F0D4F\"}.mdi-axis-x-y-arrow-lock:before{content:\"\\F0D50\"}.mdi-axis-y-arrow:before{content:\"\\F0D51\"}.mdi-axis-y-arrow-lock:before{content:\"\\F0D52\"}.mdi-axis-y-rotate-clockwise:before{content:\"\\F0D53\"}.mdi-axis-y-rotate-counterclockwise:before{content:\"\\F0D54\"}.mdi-axis-z-arrow:before{content:\"\\F0D55\"}.mdi-axis-z-arrow-lock:before{content:\"\\F0D56\"}.mdi-axis-z-rotate-clockwise:before{content:\"\\F0D57\"}.mdi-axis-z-rotate-counterclockwise:before{content:\"\\F0D58\"}.mdi-babel:before{content:\"\\F0A25\"}.mdi-baby:before{content:\"\\F006C\"}.mdi-baby-bottle:before{content:\"\\F0F39\"}.mdi-baby-bottle-outline:before{content:\"\\F0F3A\"}.mdi-baby-buggy:before{content:\"\\F13E0\"}.mdi-baby-carriage:before{content:\"\\F068F\"}.mdi-baby-carriage-off:before{content:\"\\F0FA0\"}.mdi-baby-face:before{content:\"\\F0E7C\"}.mdi-baby-face-outline:before{content:\"\\F0E7D\"}.mdi-backburger:before{content:\"\\F006D\"}.mdi-backspace:before{content:\"\\F006E\"}.mdi-backspace-outline:before{content:\"\\F0B5C\"}.mdi-backspace-reverse:before{content:\"\\F0E7E\"}.mdi-backspace-reverse-outline:before{content:\"\\F0E7F\"}.mdi-backup-restore:before{content:\"\\F006F\"}.mdi-bacteria:before{content:\"\\F0ED5\"}.mdi-bacteria-outline:before{content:\"\\F0ED6\"}.mdi-badge-account:before{content:\"\\F0DA7\"}.mdi-badge-account-alert:before{content:\"\\F0DA8\"}.mdi-badge-account-alert-outline:before{content:\"\\F0DA9\"}.mdi-badge-account-horizontal:before{content:\"\\F0E0D\"}.mdi-badge-account-horizontal-outline:before{content:\"\\F0E0E\"}.mdi-badge-account-outline:before{content:\"\\F0DAA\"}.mdi-badminton:before{content:\"\\F0851\"}.mdi-bag-carry-on:before{content:\"\\F0F3B\"}.mdi-bag-carry-on-check:before{content:\"\\F0D65\"}.mdi-bag-carry-on-off:before{content:\"\\F0F3C\"}.mdi-bag-checked:before{content:\"\\F0F3D\"}.mdi-bag-personal:before{content:\"\\F0E10\"}.mdi-bag-personal-off:before{content:\"\\F0E11\"}.mdi-bag-personal-off-outline:before{content:\"\\F0E12\"}.mdi-bag-personal-outline:before{content:\"\\F0E13\"}.mdi-bag-suitcase:before{content:\"\\F158B\"}.mdi-bag-suitcase-off:before{content:\"\\F158D\"}.mdi-bag-suitcase-off-outline:before{content:\"\\F158E\"}.mdi-bag-suitcase-outline:before{content:\"\\F158C\"}.mdi-baguette:before{content:\"\\F0F3E\"}.mdi-balloon:before{content:\"\\F0A26\"}.mdi-ballot:before{content:\"\\F09C9\"}.mdi-ballot-outline:before{content:\"\\F09CA\"}.mdi-ballot-recount:before{content:\"\\F0C39\"}.mdi-ballot-recount-outline:before{content:\"\\F0C3A\"}.mdi-bandage:before{content:\"\\F0DAF\"}.mdi-bandcamp:before{content:\"\\F0675\"}.mdi-bank:before{content:\"\\F0070\"}.mdi-bank-check:before{content:\"\\F1655\"}.mdi-bank-minus:before{content:\"\\F0DB0\"}.mdi-bank-off:before{content:\"\\F1656\"}.mdi-bank-off-outline:before{content:\"\\F1657\"}.mdi-bank-outline:before{content:\"\\F0E80\"}.mdi-bank-plus:before{content:\"\\F0DB1\"}.mdi-bank-remove:before{content:\"\\F0DB2\"}.mdi-bank-transfer:before{content:\"\\F0A27\"}.mdi-bank-transfer-in:before{content:\"\\F0A28\"}.mdi-bank-transfer-out:before{content:\"\\F0A29\"}.mdi-barcode:before{content:\"\\F0071\"}.mdi-barcode-off:before{content:\"\\F1236\"}.mdi-barcode-scan:before{content:\"\\F0072\"}.mdi-barley:before{content:\"\\F0073\"}.mdi-barley-off:before{content:\"\\F0B5D\"}.mdi-barn:before{content:\"\\F0B5E\"}.mdi-barrel:before{content:\"\\F0074\"}.mdi-baseball:before{content:\"\\F0852\"}.mdi-baseball-bat:before{content:\"\\F0853\"}.mdi-baseball-diamond:before{content:\"\\F15EC\"}.mdi-baseball-diamond-outline:before{content:\"\\F15ED\"}.mdi-bash:before{content:\"\\F1183\"}.mdi-basket:before{content:\"\\F0076\"}.mdi-basket-fill:before{content:\"\\F0077\"}.mdi-basket-minus:before{content:\"\\F1523\"}.mdi-basket-minus-outline:before{content:\"\\F1524\"}.mdi-basket-off:before{content:\"\\F1525\"}.mdi-basket-off-outline:before{content:\"\\F1526\"}.mdi-basket-outline:before{content:\"\\F1181\"}.mdi-basket-plus:before{content:\"\\F1527\"}.mdi-basket-plus-outline:before{content:\"\\F1528\"}.mdi-basket-remove:before{content:\"\\F1529\"}.mdi-basket-remove-outline:before{content:\"\\F152A\"}.mdi-basket-unfill:before{content:\"\\F0078\"}.mdi-basketball:before{content:\"\\F0806\"}.mdi-basketball-hoop:before{content:\"\\F0C3B\"}.mdi-basketball-hoop-outline:before{content:\"\\F0C3C\"}.mdi-bat:before{content:\"\\F0B5F\"}.mdi-battery:before{content:\"\\F0079\"}.mdi-battery-10:before{content:\"\\F007A\"}.mdi-battery-10-bluetooth:before{content:\"\\F093E\"}.mdi-battery-20:before{content:\"\\F007B\"}.mdi-battery-20-bluetooth:before{content:\"\\F093F\"}.mdi-battery-30:before{content:\"\\F007C\"}.mdi-battery-30-bluetooth:before{content:\"\\F0940\"}.mdi-battery-40:before{content:\"\\F007D\"}.mdi-battery-40-bluetooth:before{content:\"\\F0941\"}.mdi-battery-50:before{content:\"\\F007E\"}.mdi-battery-50-bluetooth:before{content:\"\\F0942\"}.mdi-battery-60:before{content:\"\\F007F\"}.mdi-battery-60-bluetooth:before{content:\"\\F0943\"}.mdi-battery-70:before{content:\"\\F0080\"}.mdi-battery-70-bluetooth:before{content:\"\\F0944\"}.mdi-battery-80:before{content:\"\\F0081\"}.mdi-battery-80-bluetooth:before{content:\"\\F0945\"}.mdi-battery-90:before{content:\"\\F0082\"}.mdi-battery-90-bluetooth:before{content:\"\\F0946\"}.mdi-battery-alert:before{content:\"\\F0083\"}.mdi-battery-alert-bluetooth:before{content:\"\\F0947\"}.mdi-battery-alert-variant:before{content:\"\\F10CC\"}.mdi-battery-alert-variant-outline:before{content:\"\\F10CD\"}.mdi-battery-bluetooth:before{content:\"\\F0948\"}.mdi-battery-bluetooth-variant:before{content:\"\\F0949\"}.mdi-battery-charging:before{content:\"\\F0084\"}.mdi-battery-charging-10:before{content:\"\\F089C\"}.mdi-battery-charging-100:before{content:\"\\F0085\"}.mdi-battery-charging-20:before{content:\"\\F0086\"}.mdi-battery-charging-30:before{content:\"\\F0087\"}.mdi-battery-charging-40:before{content:\"\\F0088\"}.mdi-battery-charging-50:before{content:\"\\F089D\"}.mdi-battery-charging-60:before{content:\"\\F0089\"}.mdi-battery-charging-70:before{content:\"\\F089E\"}.mdi-battery-charging-80:before{content:\"\\F008A\"}.mdi-battery-charging-90:before{content:\"\\F008B\"}.mdi-battery-charging-high:before{content:\"\\F12A6\"}.mdi-battery-charging-low:before{content:\"\\F12A4\"}.mdi-battery-charging-medium:before{content:\"\\F12A5\"}.mdi-battery-charging-outline:before{content:\"\\F089F\"}.mdi-battery-charging-wireless:before{content:\"\\F0807\"}.mdi-battery-charging-wireless-10:before{content:\"\\F0808\"}.mdi-battery-charging-wireless-20:before{content:\"\\F0809\"}.mdi-battery-charging-wireless-30:before{content:\"\\F080A\"}.mdi-battery-charging-wireless-40:before{content:\"\\F080B\"}.mdi-battery-charging-wireless-50:before{content:\"\\F080C\"}.mdi-battery-charging-wireless-60:before{content:\"\\F080D\"}.mdi-battery-charging-wireless-70:before{content:\"\\F080E\"}.mdi-battery-charging-wireless-80:before{content:\"\\F080F\"}.mdi-battery-charging-wireless-90:before{content:\"\\F0810\"}.mdi-battery-charging-wireless-alert:before{content:\"\\F0811\"}.mdi-battery-charging-wireless-outline:before{content:\"\\F0812\"}.mdi-battery-heart:before{content:\"\\F120F\"}.mdi-battery-heart-outline:before{content:\"\\F1210\"}.mdi-battery-heart-variant:before{content:\"\\F1211\"}.mdi-battery-high:before{content:\"\\F12A3\"}.mdi-battery-low:before{content:\"\\F12A1\"}.mdi-battery-medium:before{content:\"\\F12A2\"}.mdi-battery-minus:before{content:\"\\F008C\"}.mdi-battery-negative:before{content:\"\\F008D\"}.mdi-battery-off:before{content:\"\\F125D\"}.mdi-battery-off-outline:before{content:\"\\F125E\"}.mdi-battery-outline:before{content:\"\\F008E\"}.mdi-battery-plus:before{content:\"\\F008F\"}.mdi-battery-positive:before{content:\"\\F0090\"}.mdi-battery-unknown:before{content:\"\\F0091\"}.mdi-battery-unknown-bluetooth:before{content:\"\\F094A\"}.mdi-battlenet:before{content:\"\\F0B60\"}.mdi-beach:before{content:\"\\F0092\"}.mdi-beaker:before{content:\"\\F0CEA\"}.mdi-beaker-alert:before{content:\"\\F1229\"}.mdi-beaker-alert-outline:before{content:\"\\F122A\"}.mdi-beaker-check:before{content:\"\\F122B\"}.mdi-beaker-check-outline:before{content:\"\\F122C\"}.mdi-beaker-minus:before{content:\"\\F122D\"}.mdi-beaker-minus-outline:before{content:\"\\F122E\"}.mdi-beaker-outline:before{content:\"\\F0690\"}.mdi-beaker-plus:before{content:\"\\F122F\"}.mdi-beaker-plus-outline:before{content:\"\\F1230\"}.mdi-beaker-question:before{content:\"\\F1231\"}.mdi-beaker-question-outline:before{content:\"\\F1232\"}.mdi-beaker-remove:before{content:\"\\F1233\"}.mdi-beaker-remove-outline:before{content:\"\\F1234\"}.mdi-bed:before{content:\"\\F02E3\"}.mdi-bed-double:before{content:\"\\F0FD4\"}.mdi-bed-double-outline:before{content:\"\\F0FD3\"}.mdi-bed-empty:before{content:\"\\F08A0\"}.mdi-bed-king:before{content:\"\\F0FD2\"}.mdi-bed-king-outline:before{content:\"\\F0FD1\"}.mdi-bed-outline:before{content:\"\\F0099\"}.mdi-bed-queen:before{content:\"\\F0FD0\"}.mdi-bed-queen-outline:before{content:\"\\F0FDB\"}.mdi-bed-single:before{content:\"\\F106D\"}.mdi-bed-single-outline:before{content:\"\\F106E\"}.mdi-bee:before{content:\"\\F0FA1\"}.mdi-bee-flower:before{content:\"\\F0FA2\"}.mdi-beehive-off-outline:before{content:\"\\F13ED\"}.mdi-beehive-outline:before{content:\"\\F10CE\"}.mdi-beekeeper:before{content:\"\\F14E2\"}.mdi-beer:before{content:\"\\F0098\"}.mdi-beer-outline:before{content:\"\\F130C\"}.mdi-bell:before{content:\"\\F009A\"}.mdi-bell-alert:before{content:\"\\F0D59\"}.mdi-bell-alert-outline:before{content:\"\\F0E81\"}.mdi-bell-cancel:before{content:\"\\F13E7\"}.mdi-bell-cancel-outline:before{content:\"\\F13E8\"}.mdi-bell-check:before{content:\"\\F11E5\"}.mdi-bell-check-outline:before{content:\"\\F11E6\"}.mdi-bell-circle:before{content:\"\\F0D5A\"}.mdi-bell-circle-outline:before{content:\"\\F0D5B\"}.mdi-bell-minus:before{content:\"\\F13E9\"}.mdi-bell-minus-outline:before{content:\"\\F13EA\"}.mdi-bell-off:before{content:\"\\F009B\"}.mdi-bell-off-outline:before{content:\"\\F0A91\"}.mdi-bell-outline:before{content:\"\\F009C\"}.mdi-bell-plus:before{content:\"\\F009D\"}.mdi-bell-plus-outline:before{content:\"\\F0A92\"}.mdi-bell-remove:before{content:\"\\F13EB\"}.mdi-bell-remove-outline:before{content:\"\\F13EC\"}.mdi-bell-ring:before{content:\"\\F009E\"}.mdi-bell-ring-outline:before{content:\"\\F009F\"}.mdi-bell-sleep:before{content:\"\\F00A0\"}.mdi-bell-sleep-outline:before{content:\"\\F0A93\"}.mdi-beta:before{content:\"\\F00A1\"}.mdi-betamax:before{content:\"\\F09CB\"}.mdi-biathlon:before{content:\"\\F0E14\"}.mdi-bicycle:before{content:\"\\F109C\"}.mdi-bicycle-basket:before{content:\"\\F1235\"}.mdi-bicycle-electric:before{content:\"\\F15B4\"}.mdi-bicycle-penny-farthing:before{content:\"\\F15E9\"}.mdi-bike:before{content:\"\\F00A3\"}.mdi-bike-fast:before{content:\"\\F111F\"}.mdi-billboard:before{content:\"\\F1010\"}.mdi-billiards:before{content:\"\\F0B61\"}.mdi-billiards-rack:before{content:\"\\F0B62\"}.mdi-binoculars:before{content:\"\\F00A5\"}.mdi-bio:before{content:\"\\F00A6\"}.mdi-biohazard:before{content:\"\\F00A7\"}.mdi-bird:before{content:\"\\F15C6\"}.mdi-bitbucket:before{content:\"\\F00A8\"}.mdi-bitcoin:before{content:\"\\F0813\"}.mdi-black-mesa:before{content:\"\\F00A9\"}.mdi-blender:before{content:\"\\F0CEB\"}.mdi-blender-software:before{content:\"\\F00AB\"}.mdi-blinds:before{content:\"\\F00AC\"}.mdi-blinds-open:before{content:\"\\F1011\"}.mdi-block-helper:before{content:\"\\F00AD\"}.mdi-blogger:before{content:\"\\F00AE\"}.mdi-blood-bag:before{content:\"\\F0CEC\"}.mdi-bluetooth:before{content:\"\\F00AF\"}.mdi-bluetooth-audio:before{content:\"\\F00B0\"}.mdi-bluetooth-connect:before{content:\"\\F00B1\"}.mdi-bluetooth-off:before{content:\"\\F00B2\"}.mdi-bluetooth-settings:before{content:\"\\F00B3\"}.mdi-bluetooth-transfer:before{content:\"\\F00B4\"}.mdi-blur:before{content:\"\\F00B5\"}.mdi-blur-linear:before{content:\"\\F00B6\"}.mdi-blur-off:before{content:\"\\F00B7\"}.mdi-blur-radial:before{content:\"\\F00B8\"}.mdi-bolnisi-cross:before{content:\"\\F0CED\"}.mdi-bolt:before{content:\"\\F0DB3\"}.mdi-bomb:before{content:\"\\F0691\"}.mdi-bomb-off:before{content:\"\\F06C5\"}.mdi-bone:before{content:\"\\F00B9\"}.mdi-book:before{content:\"\\F00BA\"}.mdi-book-account:before{content:\"\\F13AD\"}.mdi-book-account-outline:before{content:\"\\F13AE\"}.mdi-book-alert:before{content:\"\\F167C\"}.mdi-book-alert-outline:before{content:\"\\F167D\"}.mdi-book-alphabet:before{content:\"\\F061D\"}.mdi-book-arrow-down:before{content:\"\\F167E\"}.mdi-book-arrow-down-outline:before{content:\"\\F167F\"}.mdi-book-arrow-left:before{content:\"\\F1680\"}.mdi-book-arrow-left-outline:before{content:\"\\F1681\"}.mdi-book-arrow-right:before{content:\"\\F1682\"}.mdi-book-arrow-right-outline:before{content:\"\\F1683\"}.mdi-book-arrow-up:before{content:\"\\F1684\"}.mdi-book-arrow-up-outline:before{content:\"\\F1685\"}.mdi-book-cancel:before{content:\"\\F1686\"}.mdi-book-cancel-outline:before{content:\"\\F1687\"}.mdi-book-check:before{content:\"\\F14F3\"}.mdi-book-check-outline:before{content:\"\\F14F4\"}.mdi-book-clock:before{content:\"\\F1688\"}.mdi-book-clock-outline:before{content:\"\\F1689\"}.mdi-book-cog:before{content:\"\\F168A\"}.mdi-book-cog-outline:before{content:\"\\F168B\"}.mdi-book-cross:before{content:\"\\F00A2\"}.mdi-book-edit:before{content:\"\\F168C\"}.mdi-book-edit-outline:before{content:\"\\F168D\"}.mdi-book-education:before{content:\"\\F16C9\"}.mdi-book-education-outline:before{content:\"\\F16CA\"}.mdi-book-information-variant:before{content:\"\\F106F\"}.mdi-book-lock:before{content:\"\\F079A\"}.mdi-book-lock-open:before{content:\"\\F079B\"}.mdi-book-lock-open-outline:before{content:\"\\F168E\"}.mdi-book-lock-outline:before{content:\"\\F168F\"}.mdi-book-marker:before{content:\"\\F1690\"}.mdi-book-marker-outline:before{content:\"\\F1691\"}.mdi-book-minus:before{content:\"\\F05D9\"}.mdi-book-minus-multiple:before{content:\"\\F0A94\"}.mdi-book-minus-multiple-outline:before{content:\"\\F090B\"}.mdi-book-minus-outline:before{content:\"\\F1692\"}.mdi-book-multiple:before{content:\"\\F00BB\"}.mdi-book-multiple-outline:before{content:\"\\F0436\"}.mdi-book-music:before{content:\"\\F0067\"}.mdi-book-music-outline:before{content:\"\\F1693\"}.mdi-book-off:before{content:\"\\F1694\"}.mdi-book-off-outline:before{content:\"\\F1695\"}.mdi-book-open:before{content:\"\\F00BD\"}.mdi-book-open-blank-variant:before{content:\"\\F00BE\"}.mdi-book-open-outline:before{content:\"\\F0B63\"}.mdi-book-open-page-variant:before{content:\"\\F05DA\"}.mdi-book-open-page-variant-outline:before{content:\"\\F15D6\"}.mdi-book-open-variant:before{content:\"\\F14F7\"}.mdi-book-outline:before{content:\"\\F0B64\"}.mdi-book-play:before{content:\"\\F0E82\"}.mdi-book-play-outline:before{content:\"\\F0E83\"}.mdi-book-plus:before{content:\"\\F05DB\"}.mdi-book-plus-multiple:before{content:\"\\F0A95\"}.mdi-book-plus-multiple-outline:before{content:\"\\F0ADE\"}.mdi-book-plus-outline:before{content:\"\\F1696\"}.mdi-book-refresh:before{content:\"\\F1697\"}.mdi-book-refresh-outline:before{content:\"\\F1698\"}.mdi-book-remove:before{content:\"\\F0A97\"}.mdi-book-remove-multiple:before{content:\"\\F0A96\"}.mdi-book-remove-multiple-outline:before{content:\"\\F04CA\"}.mdi-book-remove-outline:before{content:\"\\F1699\"}.mdi-book-search:before{content:\"\\F0E84\"}.mdi-book-search-outline:before{content:\"\\F0E85\"}.mdi-book-settings:before{content:\"\\F169A\"}.mdi-book-settings-outline:before{content:\"\\F169B\"}.mdi-book-sync:before{content:\"\\F169C\"}.mdi-book-sync-outline:before{content:\"\\F16C8\"}.mdi-book-variant:before{content:\"\\F00BF\"}.mdi-book-variant-multiple:before{content:\"\\F00BC\"}.mdi-bookmark:before{content:\"\\F00C0\"}.mdi-bookmark-check:before{content:\"\\F00C1\"}.mdi-bookmark-check-outline:before{content:\"\\F137B\"}.mdi-bookmark-minus:before{content:\"\\F09CC\"}.mdi-bookmark-minus-outline:before{content:\"\\F09CD\"}.mdi-bookmark-multiple:before{content:\"\\F0E15\"}.mdi-bookmark-multiple-outline:before{content:\"\\F0E16\"}.mdi-bookmark-music:before{content:\"\\F00C2\"}.mdi-bookmark-music-outline:before{content:\"\\F1379\"}.mdi-bookmark-off:before{content:\"\\F09CE\"}.mdi-bookmark-off-outline:before{content:\"\\F09CF\"}.mdi-bookmark-outline:before{content:\"\\F00C3\"}.mdi-bookmark-plus:before{content:\"\\F00C5\"}.mdi-bookmark-plus-outline:before{content:\"\\F00C4\"}.mdi-bookmark-remove:before{content:\"\\F00C6\"}.mdi-bookmark-remove-outline:before{content:\"\\F137A\"}.mdi-bookshelf:before{content:\"\\F125F\"}.mdi-boom-gate:before{content:\"\\F0E86\"}.mdi-boom-gate-alert:before{content:\"\\F0E87\"}.mdi-boom-gate-alert-outline:before{content:\"\\F0E88\"}.mdi-boom-gate-down:before{content:\"\\F0E89\"}.mdi-boom-gate-down-outline:before{content:\"\\F0E8A\"}.mdi-boom-gate-outline:before{content:\"\\F0E8B\"}.mdi-boom-gate-up:before{content:\"\\F0E8C\"}.mdi-boom-gate-up-outline:before{content:\"\\F0E8D\"}.mdi-boombox:before{content:\"\\F05DC\"}.mdi-boomerang:before{content:\"\\F10CF\"}.mdi-bootstrap:before{content:\"\\F06C6\"}.mdi-border-all:before{content:\"\\F00C7\"}.mdi-border-all-variant:before{content:\"\\F08A1\"}.mdi-border-bottom:before{content:\"\\F00C8\"}.mdi-border-bottom-variant:before{content:\"\\F08A2\"}.mdi-border-color:before{content:\"\\F00C9\"}.mdi-border-horizontal:before{content:\"\\F00CA\"}.mdi-border-inside:before{content:\"\\F00CB\"}.mdi-border-left:before{content:\"\\F00CC\"}.mdi-border-left-variant:before{content:\"\\F08A3\"}.mdi-border-none:before{content:\"\\F00CD\"}.mdi-border-none-variant:before{content:\"\\F08A4\"}.mdi-border-outside:before{content:\"\\F00CE\"}.mdi-border-right:before{content:\"\\F00CF\"}.mdi-border-right-variant:before{content:\"\\F08A5\"}.mdi-border-style:before{content:\"\\F00D0\"}.mdi-border-top:before{content:\"\\F00D1\"}.mdi-border-top-variant:before{content:\"\\F08A6\"}.mdi-border-vertical:before{content:\"\\F00D2\"}.mdi-bottle-soda:before{content:\"\\F1070\"}.mdi-bottle-soda-classic:before{content:\"\\F1071\"}.mdi-bottle-soda-classic-outline:before{content:\"\\F1363\"}.mdi-bottle-soda-outline:before{content:\"\\F1072\"}.mdi-bottle-tonic:before{content:\"\\F112E\"}.mdi-bottle-tonic-outline:before{content:\"\\F112F\"}.mdi-bottle-tonic-plus:before{content:\"\\F1130\"}.mdi-bottle-tonic-plus-outline:before{content:\"\\F1131\"}.mdi-bottle-tonic-skull:before{content:\"\\F1132\"}.mdi-bottle-tonic-skull-outline:before{content:\"\\F1133\"}.mdi-bottle-wine:before{content:\"\\F0854\"}.mdi-bottle-wine-outline:before{content:\"\\F1310\"}.mdi-bow-tie:before{content:\"\\F0678\"}.mdi-bowl:before{content:\"\\F028E\"}.mdi-bowl-mix:before{content:\"\\F0617\"}.mdi-bowl-mix-outline:before{content:\"\\F02E4\"}.mdi-bowl-outline:before{content:\"\\F02A9\"}.mdi-bowling:before{content:\"\\F00D3\"}.mdi-box:before{content:\"\\F00D4\"}.mdi-box-cutter:before{content:\"\\F00D5\"}.mdi-box-cutter-off:before{content:\"\\F0B4A\"}.mdi-box-shadow:before{content:\"\\F0637\"}.mdi-boxing-glove:before{content:\"\\F0B65\"}.mdi-braille:before{content:\"\\F09D0\"}.mdi-brain:before{content:\"\\F09D1\"}.mdi-bread-slice:before{content:\"\\F0CEE\"}.mdi-bread-slice-outline:before{content:\"\\F0CEF\"}.mdi-bridge:before{content:\"\\F0618\"}.mdi-briefcase:before{content:\"\\F00D6\"}.mdi-briefcase-account:before{content:\"\\F0CF0\"}.mdi-briefcase-account-outline:before{content:\"\\F0CF1\"}.mdi-briefcase-check:before{content:\"\\F00D7\"}.mdi-briefcase-check-outline:before{content:\"\\F131E\"}.mdi-briefcase-clock:before{content:\"\\F10D0\"}.mdi-briefcase-clock-outline:before{content:\"\\F10D1\"}.mdi-briefcase-download:before{content:\"\\F00D8\"}.mdi-briefcase-download-outline:before{content:\"\\F0C3D\"}.mdi-briefcase-edit:before{content:\"\\F0A98\"}.mdi-briefcase-edit-outline:before{content:\"\\F0C3E\"}.mdi-briefcase-minus:before{content:\"\\F0A2A\"}.mdi-briefcase-minus-outline:before{content:\"\\F0C3F\"}.mdi-briefcase-off:before{content:\"\\F1658\"}.mdi-briefcase-off-outline:before{content:\"\\F1659\"}.mdi-briefcase-outline:before{content:\"\\F0814\"}.mdi-briefcase-plus:before{content:\"\\F0A2B\"}.mdi-briefcase-plus-outline:before{content:\"\\F0C40\"}.mdi-briefcase-remove:before{content:\"\\F0A2C\"}.mdi-briefcase-remove-outline:before{content:\"\\F0C41\"}.mdi-briefcase-search:before{content:\"\\F0A2D\"}.mdi-briefcase-search-outline:before{content:\"\\F0C42\"}.mdi-briefcase-upload:before{content:\"\\F00D9\"}.mdi-briefcase-upload-outline:before{content:\"\\F0C43\"}.mdi-briefcase-variant:before{content:\"\\F1494\"}.mdi-briefcase-variant-off:before{content:\"\\F165A\"}.mdi-briefcase-variant-off-outline:before{content:\"\\F165B\"}.mdi-briefcase-variant-outline:before{content:\"\\F1495\"}.mdi-brightness-1:before{content:\"\\F00DA\"}.mdi-brightness-2:before{content:\"\\F00DB\"}.mdi-brightness-3:before{content:\"\\F00DC\"}.mdi-brightness-4:before{content:\"\\F00DD\"}.mdi-brightness-5:before{content:\"\\F00DE\"}.mdi-brightness-6:before{content:\"\\F00DF\"}.mdi-brightness-7:before{content:\"\\F00E0\"}.mdi-brightness-auto:before{content:\"\\F00E1\"}.mdi-brightness-percent:before{content:\"\\F0CF2\"}.mdi-broadcast:before{content:\"\\F1720\"}.mdi-broadcast-off:before{content:\"\\F1721\"}.mdi-broom:before{content:\"\\F00E2\"}.mdi-brush:before{content:\"\\F00E3\"}.mdi-bucket:before{content:\"\\F1415\"}.mdi-bucket-outline:before{content:\"\\F1416\"}.mdi-buddhism:before{content:\"\\F094B\"}.mdi-buffer:before{content:\"\\F0619\"}.mdi-buffet:before{content:\"\\F0578\"}.mdi-bug:before{content:\"\\F00E4\"}.mdi-bug-check:before{content:\"\\F0A2E\"}.mdi-bug-check-outline:before{content:\"\\F0A2F\"}.mdi-bug-outline:before{content:\"\\F0A30\"}.mdi-bugle:before{content:\"\\F0DB4\"}.mdi-bulldozer:before{content:\"\\F0B22\"}.mdi-bullet:before{content:\"\\F0CF3\"}.mdi-bulletin-board:before{content:\"\\F00E5\"}.mdi-bullhorn:before{content:\"\\F00E6\"}.mdi-bullhorn-outline:before{content:\"\\F0B23\"}.mdi-bullseye:before{content:\"\\F05DD\"}.mdi-bullseye-arrow:before{content:\"\\F08C9\"}.mdi-bulma:before{content:\"\\F12E7\"}.mdi-bunk-bed:before{content:\"\\F1302\"}.mdi-bunk-bed-outline:before{content:\"\\F0097\"}.mdi-bus:before{content:\"\\F00E7\"}.mdi-bus-alert:before{content:\"\\F0A99\"}.mdi-bus-articulated-end:before{content:\"\\F079C\"}.mdi-bus-articulated-front:before{content:\"\\F079D\"}.mdi-bus-clock:before{content:\"\\F08CA\"}.mdi-bus-double-decker:before{content:\"\\F079E\"}.mdi-bus-marker:before{content:\"\\F1212\"}.mdi-bus-multiple:before{content:\"\\F0F3F\"}.mdi-bus-school:before{content:\"\\F079F\"}.mdi-bus-side:before{content:\"\\F07A0\"}.mdi-bus-stop:before{content:\"\\F1012\"}.mdi-bus-stop-covered:before{content:\"\\F1013\"}.mdi-bus-stop-uncovered:before{content:\"\\F1014\"}.mdi-butterfly:before{content:\"\\F1589\"}.mdi-butterfly-outline:before{content:\"\\F158A\"}.mdi-cable-data:before{content:\"\\F1394\"}.mdi-cached:before{content:\"\\F00E8\"}.mdi-cactus:before{content:\"\\F0DB5\"}.mdi-cake:before{content:\"\\F00E9\"}.mdi-cake-layered:before{content:\"\\F00EA\"}.mdi-cake-variant:before{content:\"\\F00EB\"}.mdi-calculator:before{content:\"\\F00EC\"}.mdi-calculator-variant:before{content:\"\\F0A9A\"}.mdi-calculator-variant-outline:before{content:\"\\F15A6\"}.mdi-calendar:before{content:\"\\F00ED\"}.mdi-calendar-account:before{content:\"\\F0ED7\"}.mdi-calendar-account-outline:before{content:\"\\F0ED8\"}.mdi-calendar-alert:before{content:\"\\F0A31\"}.mdi-calendar-arrow-left:before{content:\"\\F1134\"}.mdi-calendar-arrow-right:before{content:\"\\F1135\"}.mdi-calendar-blank:before{content:\"\\F00EE\"}.mdi-calendar-blank-multiple:before{content:\"\\F1073\"}.mdi-calendar-blank-outline:before{content:\"\\F0B66\"}.mdi-calendar-check:before{content:\"\\F00EF\"}.mdi-calendar-check-outline:before{content:\"\\F0C44\"}.mdi-calendar-clock:before{content:\"\\F00F0\"}.mdi-calendar-clock-outline:before{content:\"\\F16E1\"}.mdi-calendar-cursor:before{content:\"\\F157B\"}.mdi-calendar-edit:before{content:\"\\F08A7\"}.mdi-calendar-end:before{content:\"\\F166C\"}.mdi-calendar-export:before{content:\"\\F0B24\"}.mdi-calendar-heart:before{content:\"\\F09D2\"}.mdi-calendar-import:before{content:\"\\F0B25\"}.mdi-calendar-lock:before{content:\"\\F1641\"}.mdi-calendar-lock-outline:before{content:\"\\F1642\"}.mdi-calendar-minus:before{content:\"\\F0D5C\"}.mdi-calendar-month:before{content:\"\\F0E17\"}.mdi-calendar-month-outline:before{content:\"\\F0E18\"}.mdi-calendar-multiple:before{content:\"\\F00F1\"}.mdi-calendar-multiple-check:before{content:\"\\F00F2\"}.mdi-calendar-multiselect:before{content:\"\\F0A32\"}.mdi-calendar-outline:before{content:\"\\F0B67\"}.mdi-calendar-plus:before{content:\"\\F00F3\"}.mdi-calendar-question:before{content:\"\\F0692\"}.mdi-calendar-range:before{content:\"\\F0679\"}.mdi-calendar-range-outline:before{content:\"\\F0B68\"}.mdi-calendar-refresh:before{content:\"\\F01E1\"}.mdi-calendar-refresh-outline:before{content:\"\\F0203\"}.mdi-calendar-remove:before{content:\"\\F00F4\"}.mdi-calendar-remove-outline:before{content:\"\\F0C45\"}.mdi-calendar-search:before{content:\"\\F094C\"}.mdi-calendar-star:before{content:\"\\F09D3\"}.mdi-calendar-start:before{content:\"\\F166D\"}.mdi-calendar-sync:before{content:\"\\F0E8E\"}.mdi-calendar-sync-outline:before{content:\"\\F0E8F\"}.mdi-calendar-text:before{content:\"\\F00F5\"}.mdi-calendar-text-outline:before{content:\"\\F0C46\"}.mdi-calendar-today:before{content:\"\\F00F6\"}.mdi-calendar-week:before{content:\"\\F0A33\"}.mdi-calendar-week-begin:before{content:\"\\F0A34\"}.mdi-calendar-weekend:before{content:\"\\F0ED9\"}.mdi-calendar-weekend-outline:before{content:\"\\F0EDA\"}.mdi-call-made:before{content:\"\\F00F7\"}.mdi-call-merge:before{content:\"\\F00F8\"}.mdi-call-missed:before{content:\"\\F00F9\"}.mdi-call-received:before{content:\"\\F00FA\"}.mdi-call-split:before{content:\"\\F00FB\"}.mdi-camcorder:before{content:\"\\F00FC\"}.mdi-camcorder-off:before{content:\"\\F00FF\"}.mdi-camera:before{content:\"\\F0100\"}.mdi-camera-account:before{content:\"\\F08CB\"}.mdi-camera-burst:before{content:\"\\F0693\"}.mdi-camera-control:before{content:\"\\F0B69\"}.mdi-camera-enhance:before{content:\"\\F0101\"}.mdi-camera-enhance-outline:before{content:\"\\F0B6A\"}.mdi-camera-flip:before{content:\"\\F15D9\"}.mdi-camera-flip-outline:before{content:\"\\F15DA\"}.mdi-camera-front:before{content:\"\\F0102\"}.mdi-camera-front-variant:before{content:\"\\F0103\"}.mdi-camera-gopro:before{content:\"\\F07A1\"}.mdi-camera-image:before{content:\"\\F08CC\"}.mdi-camera-iris:before{content:\"\\F0104\"}.mdi-camera-metering-center:before{content:\"\\F07A2\"}.mdi-camera-metering-matrix:before{content:\"\\F07A3\"}.mdi-camera-metering-partial:before{content:\"\\F07A4\"}.mdi-camera-metering-spot:before{content:\"\\F07A5\"}.mdi-camera-off:before{content:\"\\F05DF\"}.mdi-camera-outline:before{content:\"\\F0D5D\"}.mdi-camera-party-mode:before{content:\"\\F0105\"}.mdi-camera-plus:before{content:\"\\F0EDB\"}.mdi-camera-plus-outline:before{content:\"\\F0EDC\"}.mdi-camera-rear:before{content:\"\\F0106\"}.mdi-camera-rear-variant:before{content:\"\\F0107\"}.mdi-camera-retake:before{content:\"\\F0E19\"}.mdi-camera-retake-outline:before{content:\"\\F0E1A\"}.mdi-camera-switch:before{content:\"\\F0108\"}.mdi-camera-switch-outline:before{content:\"\\F084A\"}.mdi-camera-timer:before{content:\"\\F0109\"}.mdi-camera-wireless:before{content:\"\\F0DB6\"}.mdi-camera-wireless-outline:before{content:\"\\F0DB7\"}.mdi-campfire:before{content:\"\\F0EDD\"}.mdi-cancel:before{content:\"\\F073A\"}.mdi-candle:before{content:\"\\F05E2\"}.mdi-candycane:before{content:\"\\F010A\"}.mdi-cannabis:before{content:\"\\F07A6\"}.mdi-cannabis-off:before{content:\"\\F166E\"}.mdi-caps-lock:before{content:\"\\F0A9B\"}.mdi-car:before{content:\"\\F010B\"}.mdi-car-2-plus:before{content:\"\\F1015\"}.mdi-car-3-plus:before{content:\"\\F1016\"}.mdi-car-arrow-left:before{content:\"\\F13B2\"}.mdi-car-arrow-right:before{content:\"\\F13B3\"}.mdi-car-back:before{content:\"\\F0E1B\"}.mdi-car-battery:before{content:\"\\F010C\"}.mdi-car-brake-abs:before{content:\"\\F0C47\"}.mdi-car-brake-alert:before{content:\"\\F0C48\"}.mdi-car-brake-hold:before{content:\"\\F0D5E\"}.mdi-car-brake-parking:before{content:\"\\F0D5F\"}.mdi-car-brake-retarder:before{content:\"\\F1017\"}.mdi-car-child-seat:before{content:\"\\F0FA3\"}.mdi-car-clutch:before{content:\"\\F1018\"}.mdi-car-cog:before{content:\"\\F13CC\"}.mdi-car-connected:before{content:\"\\F010D\"}.mdi-car-convertible:before{content:\"\\F07A7\"}.mdi-car-coolant-level:before{content:\"\\F1019\"}.mdi-car-cruise-control:before{content:\"\\F0D60\"}.mdi-car-defrost-front:before{content:\"\\F0D61\"}.mdi-car-defrost-rear:before{content:\"\\F0D62\"}.mdi-car-door:before{content:\"\\F0B6B\"}.mdi-car-door-lock:before{content:\"\\F109D\"}.mdi-car-electric:before{content:\"\\F0B6C\"}.mdi-car-electric-outline:before{content:\"\\F15B5\"}.mdi-car-emergency:before{content:\"\\F160F\"}.mdi-car-esp:before{content:\"\\F0C49\"}.mdi-car-estate:before{content:\"\\F07A8\"}.mdi-car-hatchback:before{content:\"\\F07A9\"}.mdi-car-info:before{content:\"\\F11BE\"}.mdi-car-key:before{content:\"\\F0B6D\"}.mdi-car-lifted-pickup:before{content:\"\\F152D\"}.mdi-car-light-dimmed:before{content:\"\\F0C4A\"}.mdi-car-light-fog:before{content:\"\\F0C4B\"}.mdi-car-light-high:before{content:\"\\F0C4C\"}.mdi-car-limousine:before{content:\"\\F08CD\"}.mdi-car-multiple:before{content:\"\\F0B6E\"}.mdi-car-off:before{content:\"\\F0E1C\"}.mdi-car-outline:before{content:\"\\F14ED\"}.mdi-car-parking-lights:before{content:\"\\F0D63\"}.mdi-car-pickup:before{content:\"\\F07AA\"}.mdi-car-seat:before{content:\"\\F0FA4\"}.mdi-car-seat-cooler:before{content:\"\\F0FA5\"}.mdi-car-seat-heater:before{content:\"\\F0FA6\"}.mdi-car-settings:before{content:\"\\F13CD\"}.mdi-car-shift-pattern:before{content:\"\\F0F40\"}.mdi-car-side:before{content:\"\\F07AB\"}.mdi-car-sports:before{content:\"\\F07AC\"}.mdi-car-tire-alert:before{content:\"\\F0C4D\"}.mdi-car-traction-control:before{content:\"\\F0D64\"}.mdi-car-turbocharger:before{content:\"\\F101A\"}.mdi-car-wash:before{content:\"\\F010E\"}.mdi-car-windshield:before{content:\"\\F101B\"}.mdi-car-windshield-outline:before{content:\"\\F101C\"}.mdi-carabiner:before{content:\"\\F14C0\"}.mdi-caravan:before{content:\"\\F07AD\"}.mdi-card:before{content:\"\\F0B6F\"}.mdi-card-account-details:before{content:\"\\F05D2\"}.mdi-card-account-details-outline:before{content:\"\\F0DAB\"}.mdi-card-account-details-star:before{content:\"\\F02A3\"}.mdi-card-account-details-star-outline:before{content:\"\\F06DB\"}.mdi-card-account-mail:before{content:\"\\F018E\"}.mdi-card-account-mail-outline:before{content:\"\\F0E98\"}.mdi-card-account-phone:before{content:\"\\F0E99\"}.mdi-card-account-phone-outline:before{content:\"\\F0E9A\"}.mdi-card-bulleted:before{content:\"\\F0B70\"}.mdi-card-bulleted-off:before{content:\"\\F0B71\"}.mdi-card-bulleted-off-outline:before{content:\"\\F0B72\"}.mdi-card-bulleted-outline:before{content:\"\\F0B73\"}.mdi-card-bulleted-settings:before{content:\"\\F0B74\"}.mdi-card-bulleted-settings-outline:before{content:\"\\F0B75\"}.mdi-card-minus:before{content:\"\\F1600\"}.mdi-card-minus-outline:before{content:\"\\F1601\"}.mdi-card-off:before{content:\"\\F1602\"}.mdi-card-off-outline:before{content:\"\\F1603\"}.mdi-card-outline:before{content:\"\\F0B76\"}.mdi-card-plus:before{content:\"\\F11FF\"}.mdi-card-plus-outline:before{content:\"\\F1200\"}.mdi-card-remove:before{content:\"\\F1604\"}.mdi-card-remove-outline:before{content:\"\\F1605\"}.mdi-card-search:before{content:\"\\F1074\"}.mdi-card-search-outline:before{content:\"\\F1075\"}.mdi-card-text:before{content:\"\\F0B77\"}.mdi-card-text-outline:before{content:\"\\F0B78\"}.mdi-cards:before{content:\"\\F0638\"}.mdi-cards-club:before{content:\"\\F08CE\"}.mdi-cards-diamond:before{content:\"\\F08CF\"}.mdi-cards-diamond-outline:before{content:\"\\F101D\"}.mdi-cards-heart:before{content:\"\\F08D0\"}.mdi-cards-outline:before{content:\"\\F0639\"}.mdi-cards-playing-outline:before{content:\"\\F063A\"}.mdi-cards-spade:before{content:\"\\F08D1\"}.mdi-cards-variant:before{content:\"\\F06C7\"}.mdi-carrot:before{content:\"\\F010F\"}.mdi-cart:before{content:\"\\F0110\"}.mdi-cart-arrow-down:before{content:\"\\F0D66\"}.mdi-cart-arrow-right:before{content:\"\\F0C4E\"}.mdi-cart-arrow-up:before{content:\"\\F0D67\"}.mdi-cart-check:before{content:\"\\F15EA\"}.mdi-cart-minus:before{content:\"\\F0D68\"}.mdi-cart-off:before{content:\"\\F066B\"}.mdi-cart-outline:before{content:\"\\F0111\"}.mdi-cart-plus:before{content:\"\\F0112\"}.mdi-cart-remove:before{content:\"\\F0D69\"}.mdi-cart-variant:before{content:\"\\F15EB\"}.mdi-case-sensitive-alt:before{content:\"\\F0113\"}.mdi-cash:before{content:\"\\F0114\"}.mdi-cash-100:before{content:\"\\F0115\"}.mdi-cash-check:before{content:\"\\F14EE\"}.mdi-cash-lock:before{content:\"\\F14EA\"}.mdi-cash-lock-open:before{content:\"\\F14EB\"}.mdi-cash-marker:before{content:\"\\F0DB8\"}.mdi-cash-minus:before{content:\"\\F1260\"}.mdi-cash-multiple:before{content:\"\\F0116\"}.mdi-cash-plus:before{content:\"\\F1261\"}.mdi-cash-refund:before{content:\"\\F0A9C\"}.mdi-cash-register:before{content:\"\\F0CF4\"}.mdi-cash-remove:before{content:\"\\F1262\"}.mdi-cash-usd:before{content:\"\\F1176\"}.mdi-cash-usd-outline:before{content:\"\\F0117\"}.mdi-cassette:before{content:\"\\F09D4\"}.mdi-cast:before{content:\"\\F0118\"}.mdi-cast-audio:before{content:\"\\F101E\"}.mdi-cast-connected:before{content:\"\\F0119\"}.mdi-cast-education:before{content:\"\\F0E1D\"}.mdi-cast-off:before{content:\"\\F078A\"}.mdi-castle:before{content:\"\\F011A\"}.mdi-cat:before{content:\"\\F011B\"}.mdi-cctv:before{content:\"\\F07AE\"}.mdi-ceiling-light:before{content:\"\\F0769\"}.mdi-cellphone:before{content:\"\\F011C\"}.mdi-cellphone-android:before{content:\"\\F011D\"}.mdi-cellphone-arrow-down:before{content:\"\\F09D5\"}.mdi-cellphone-basic:before{content:\"\\F011E\"}.mdi-cellphone-charging:before{content:\"\\F1397\"}.mdi-cellphone-cog:before{content:\"\\F0951\"}.mdi-cellphone-dock:before{content:\"\\F011F\"}.mdi-cellphone-erase:before{content:\"\\F094D\"}.mdi-cellphone-information:before{content:\"\\F0F41\"}.mdi-cellphone-iphone:before{content:\"\\F0120\"}.mdi-cellphone-key:before{content:\"\\F094E\"}.mdi-cellphone-link:before{content:\"\\F0121\"}.mdi-cellphone-link-off:before{content:\"\\F0122\"}.mdi-cellphone-lock:before{content:\"\\F094F\"}.mdi-cellphone-message:before{content:\"\\F08D3\"}.mdi-cellphone-message-off:before{content:\"\\F10D2\"}.mdi-cellphone-nfc:before{content:\"\\F0E90\"}.mdi-cellphone-nfc-off:before{content:\"\\F12D8\"}.mdi-cellphone-off:before{content:\"\\F0950\"}.mdi-cellphone-play:before{content:\"\\F101F\"}.mdi-cellphone-screenshot:before{content:\"\\F0A35\"}.mdi-cellphone-settings:before{content:\"\\F0123\"}.mdi-cellphone-sound:before{content:\"\\F0952\"}.mdi-cellphone-text:before{content:\"\\F08D2\"}.mdi-cellphone-wireless:before{content:\"\\F0815\"}.mdi-celtic-cross:before{content:\"\\F0CF5\"}.mdi-centos:before{content:\"\\F111A\"}.mdi-certificate:before{content:\"\\F0124\"}.mdi-certificate-outline:before{content:\"\\F1188\"}.mdi-chair-rolling:before{content:\"\\F0F48\"}.mdi-chair-school:before{content:\"\\F0125\"}.mdi-charity:before{content:\"\\F0C4F\"}.mdi-chart-arc:before{content:\"\\F0126\"}.mdi-chart-areaspline:before{content:\"\\F0127\"}.mdi-chart-areaspline-variant:before{content:\"\\F0E91\"}.mdi-chart-bar:before{content:\"\\F0128\"}.mdi-chart-bar-stacked:before{content:\"\\F076A\"}.mdi-chart-bell-curve:before{content:\"\\F0C50\"}.mdi-chart-bell-curve-cumulative:before{content:\"\\F0FA7\"}.mdi-chart-box:before{content:\"\\F154D\"}.mdi-chart-box-outline:before{content:\"\\F154E\"}.mdi-chart-box-plus-outline:before{content:\"\\F154F\"}.mdi-chart-bubble:before{content:\"\\F05E3\"}.mdi-chart-donut:before{content:\"\\F07AF\"}.mdi-chart-donut-variant:before{content:\"\\F07B0\"}.mdi-chart-gantt:before{content:\"\\F066C\"}.mdi-chart-histogram:before{content:\"\\F0129\"}.mdi-chart-line:before{content:\"\\F012A\"}.mdi-chart-line-stacked:before{content:\"\\F076B\"}.mdi-chart-line-variant:before{content:\"\\F07B1\"}.mdi-chart-multiline:before{content:\"\\F08D4\"}.mdi-chart-multiple:before{content:\"\\F1213\"}.mdi-chart-pie:before{content:\"\\F012B\"}.mdi-chart-ppf:before{content:\"\\F1380\"}.mdi-chart-sankey:before{content:\"\\F11DF\"}.mdi-chart-sankey-variant:before{content:\"\\F11E0\"}.mdi-chart-scatter-plot:before{content:\"\\F0E92\"}.mdi-chart-scatter-plot-hexbin:before{content:\"\\F066D\"}.mdi-chart-timeline:before{content:\"\\F066E\"}.mdi-chart-timeline-variant:before{content:\"\\F0E93\"}.mdi-chart-timeline-variant-shimmer:before{content:\"\\F15B6\"}.mdi-chart-tree:before{content:\"\\F0E94\"}.mdi-chat:before{content:\"\\F0B79\"}.mdi-chat-alert:before{content:\"\\F0B7A\"}.mdi-chat-alert-outline:before{content:\"\\F12C9\"}.mdi-chat-minus:before{content:\"\\F1410\"}.mdi-chat-minus-outline:before{content:\"\\F1413\"}.mdi-chat-outline:before{content:\"\\F0EDE\"}.mdi-chat-plus:before{content:\"\\F140F\"}.mdi-chat-plus-outline:before{content:\"\\F1412\"}.mdi-chat-processing:before{content:\"\\F0B7B\"}.mdi-chat-processing-outline:before{content:\"\\F12CA\"}.mdi-chat-question:before{content:\"\\F1738\"}.mdi-chat-question-outline:before{content:\"\\F1739\"}.mdi-chat-remove:before{content:\"\\F1411\"}.mdi-chat-remove-outline:before{content:\"\\F1414\"}.mdi-chat-sleep:before{content:\"\\F12D1\"}.mdi-chat-sleep-outline:before{content:\"\\F12D2\"}.mdi-check:before{content:\"\\F012C\"}.mdi-check-all:before{content:\"\\F012D\"}.mdi-check-bold:before{content:\"\\F0E1E\"}.mdi-check-box-multiple-outline:before{content:\"\\F0C51\"}.mdi-check-box-outline:before{content:\"\\F0C52\"}.mdi-check-circle:before{content:\"\\F05E0\"}.mdi-check-circle-outline:before{content:\"\\F05E1\"}.mdi-check-decagram:before{content:\"\\F0791\"}.mdi-check-decagram-outline:before{content:\"\\F1740\"}.mdi-check-network:before{content:\"\\F0C53\"}.mdi-check-network-outline:before{content:\"\\F0C54\"}.mdi-check-outline:before{content:\"\\F0855\"}.mdi-check-underline:before{content:\"\\F0E1F\"}.mdi-check-underline-circle:before{content:\"\\F0E20\"}.mdi-check-underline-circle-outline:before{content:\"\\F0E21\"}.mdi-checkbook:before{content:\"\\F0A9D\"}.mdi-checkbox-blank:before{content:\"\\F012E\"}.mdi-checkbox-blank-circle:before{content:\"\\F012F\"}.mdi-checkbox-blank-circle-outline:before{content:\"\\F0130\"}.mdi-checkbox-blank-off:before{content:\"\\F12EC\"}.mdi-checkbox-blank-off-outline:before{content:\"\\F12ED\"}.mdi-checkbox-blank-outline:before{content:\"\\F0131\"}.mdi-checkbox-intermediate:before{content:\"\\F0856\"}.mdi-checkbox-marked:before{content:\"\\F0132\"}.mdi-checkbox-marked-circle:before{content:\"\\F0133\"}.mdi-checkbox-marked-circle-outline:before{content:\"\\F0134\"}.mdi-checkbox-marked-outline:before{content:\"\\F0135\"}.mdi-checkbox-multiple-blank:before{content:\"\\F0136\"}.mdi-checkbox-multiple-blank-circle:before{content:\"\\F063B\"}.mdi-checkbox-multiple-blank-circle-outline:before{content:\"\\F063C\"}.mdi-checkbox-multiple-blank-outline:before{content:\"\\F0137\"}.mdi-checkbox-multiple-marked:before{content:\"\\F0138\"}.mdi-checkbox-multiple-marked-circle:before{content:\"\\F063D\"}.mdi-checkbox-multiple-marked-circle-outline:before{content:\"\\F063E\"}.mdi-checkbox-multiple-marked-outline:before{content:\"\\F0139\"}.mdi-checkerboard:before{content:\"\\F013A\"}.mdi-checkerboard-minus:before{content:\"\\F1202\"}.mdi-checkerboard-plus:before{content:\"\\F1201\"}.mdi-checkerboard-remove:before{content:\"\\F1203\"}.mdi-cheese:before{content:\"\\F12B9\"}.mdi-cheese-off:before{content:\"\\F13EE\"}.mdi-chef-hat:before{content:\"\\F0B7C\"}.mdi-chemical-weapon:before{content:\"\\F013B\"}.mdi-chess-bishop:before{content:\"\\F085C\"}.mdi-chess-king:before{content:\"\\F0857\"}.mdi-chess-knight:before{content:\"\\F0858\"}.mdi-chess-pawn:before{content:\"\\F0859\"}.mdi-chess-queen:before{content:\"\\F085A\"}.mdi-chess-rook:before{content:\"\\F085B\"}.mdi-chevron-double-down:before{content:\"\\F013C\"}.mdi-chevron-double-left:before{content:\"\\F013D\"}.mdi-chevron-double-right:before{content:\"\\F013E\"}.mdi-chevron-double-up:before{content:\"\\F013F\"}.mdi-chevron-down:before{content:\"\\F0140\"}.mdi-chevron-down-box:before{content:\"\\F09D6\"}.mdi-chevron-down-box-outline:before{content:\"\\F09D7\"}.mdi-chevron-down-circle:before{content:\"\\F0B26\"}.mdi-chevron-down-circle-outline:before{content:\"\\F0B27\"}.mdi-chevron-left:before{content:\"\\F0141\"}.mdi-chevron-left-box:before{content:\"\\F09D8\"}.mdi-chevron-left-box-outline:before{content:\"\\F09D9\"}.mdi-chevron-left-circle:before{content:\"\\F0B28\"}.mdi-chevron-left-circle-outline:before{content:\"\\F0B29\"}.mdi-chevron-right:before{content:\"\\F0142\"}.mdi-chevron-right-box:before{content:\"\\F09DA\"}.mdi-chevron-right-box-outline:before{content:\"\\F09DB\"}.mdi-chevron-right-circle:before{content:\"\\F0B2A\"}.mdi-chevron-right-circle-outline:before{content:\"\\F0B2B\"}.mdi-chevron-triple-down:before{content:\"\\F0DB9\"}.mdi-chevron-triple-left:before{content:\"\\F0DBA\"}.mdi-chevron-triple-right:before{content:\"\\F0DBB\"}.mdi-chevron-triple-up:before{content:\"\\F0DBC\"}.mdi-chevron-up:before{content:\"\\F0143\"}.mdi-chevron-up-box:before{content:\"\\F09DC\"}.mdi-chevron-up-box-outline:before{content:\"\\F09DD\"}.mdi-chevron-up-circle:before{content:\"\\F0B2C\"}.mdi-chevron-up-circle-outline:before{content:\"\\F0B2D\"}.mdi-chili-hot:before{content:\"\\F07B2\"}.mdi-chili-medium:before{content:\"\\F07B3\"}.mdi-chili-mild:before{content:\"\\F07B4\"}.mdi-chili-off:before{content:\"\\F1467\"}.mdi-chip:before{content:\"\\F061A\"}.mdi-christianity:before{content:\"\\F0953\"}.mdi-christianity-outline:before{content:\"\\F0CF6\"}.mdi-church:before{content:\"\\F0144\"}.mdi-cigar:before{content:\"\\F1189\"}.mdi-cigar-off:before{content:\"\\F141B\"}.mdi-circle:before{content:\"\\F0765\"}.mdi-circle-box:before{content:\"\\F15DC\"}.mdi-circle-box-outline:before{content:\"\\F15DD\"}.mdi-circle-double:before{content:\"\\F0E95\"}.mdi-circle-edit-outline:before{content:\"\\F08D5\"}.mdi-circle-expand:before{content:\"\\F0E96\"}.mdi-circle-half:before{content:\"\\F1395\"}.mdi-circle-half-full:before{content:\"\\F1396\"}.mdi-circle-medium:before{content:\"\\F09DE\"}.mdi-circle-multiple:before{content:\"\\F0B38\"}.mdi-circle-multiple-outline:before{content:\"\\F0695\"}.mdi-circle-off-outline:before{content:\"\\F10D3\"}.mdi-circle-outline:before{content:\"\\F0766\"}.mdi-circle-slice-1:before{content:\"\\F0A9E\"}.mdi-circle-slice-2:before{content:\"\\F0A9F\"}.mdi-circle-slice-3:before{content:\"\\F0AA0\"}.mdi-circle-slice-4:before{content:\"\\F0AA1\"}.mdi-circle-slice-5:before{content:\"\\F0AA2\"}.mdi-circle-slice-6:before{content:\"\\F0AA3\"}.mdi-circle-slice-7:before{content:\"\\F0AA4\"}.mdi-circle-slice-8:before{content:\"\\F0AA5\"}.mdi-circle-small:before{content:\"\\F09DF\"}.mdi-circular-saw:before{content:\"\\F0E22\"}.mdi-city:before{content:\"\\F0146\"}.mdi-city-variant:before{content:\"\\F0A36\"}.mdi-city-variant-outline:before{content:\"\\F0A37\"}.mdi-clipboard:before{content:\"\\F0147\"}.mdi-clipboard-account:before{content:\"\\F0148\"}.mdi-clipboard-account-outline:before{content:\"\\F0C55\"}.mdi-clipboard-alert:before{content:\"\\F0149\"}.mdi-clipboard-alert-outline:before{content:\"\\F0CF7\"}.mdi-clipboard-arrow-down:before{content:\"\\F014A\"}.mdi-clipboard-arrow-down-outline:before{content:\"\\F0C56\"}.mdi-clipboard-arrow-left:before{content:\"\\F014B\"}.mdi-clipboard-arrow-left-outline:before{content:\"\\F0CF8\"}.mdi-clipboard-arrow-right:before{content:\"\\F0CF9\"}.mdi-clipboard-arrow-right-outline:before{content:\"\\F0CFA\"}.mdi-clipboard-arrow-up:before{content:\"\\F0C57\"}.mdi-clipboard-arrow-up-outline:before{content:\"\\F0C58\"}.mdi-clipboard-check:before{content:\"\\F014E\"}.mdi-clipboard-check-multiple:before{content:\"\\F1263\"}.mdi-clipboard-check-multiple-outline:before{content:\"\\F1264\"}.mdi-clipboard-check-outline:before{content:\"\\F08A8\"}.mdi-clipboard-clock:before{content:\"\\F16E2\"}.mdi-clipboard-clock-outline:before{content:\"\\F16E3\"}.mdi-clipboard-edit:before{content:\"\\F14E5\"}.mdi-clipboard-edit-outline:before{content:\"\\F14E6\"}.mdi-clipboard-file:before{content:\"\\F1265\"}.mdi-clipboard-file-outline:before{content:\"\\F1266\"}.mdi-clipboard-flow:before{content:\"\\F06C8\"}.mdi-clipboard-flow-outline:before{content:\"\\F1117\"}.mdi-clipboard-list:before{content:\"\\F10D4\"}.mdi-clipboard-list-outline:before{content:\"\\F10D5\"}.mdi-clipboard-minus:before{content:\"\\F1618\"}.mdi-clipboard-minus-outline:before{content:\"\\F1619\"}.mdi-clipboard-multiple:before{content:\"\\F1267\"}.mdi-clipboard-multiple-outline:before{content:\"\\F1268\"}.mdi-clipboard-off:before{content:\"\\F161A\"}.mdi-clipboard-off-outline:before{content:\"\\F161B\"}.mdi-clipboard-outline:before{content:\"\\F014C\"}.mdi-clipboard-play:before{content:\"\\F0C59\"}.mdi-clipboard-play-multiple:before{content:\"\\F1269\"}.mdi-clipboard-play-multiple-outline:before{content:\"\\F126A\"}.mdi-clipboard-play-outline:before{content:\"\\F0C5A\"}.mdi-clipboard-plus:before{content:\"\\F0751\"}.mdi-clipboard-plus-outline:before{content:\"\\F131F\"}.mdi-clipboard-pulse:before{content:\"\\F085D\"}.mdi-clipboard-pulse-outline:before{content:\"\\F085E\"}.mdi-clipboard-remove:before{content:\"\\F161C\"}.mdi-clipboard-remove-outline:before{content:\"\\F161D\"}.mdi-clipboard-search:before{content:\"\\F161E\"}.mdi-clipboard-search-outline:before{content:\"\\F161F\"}.mdi-clipboard-text:before{content:\"\\F014D\"}.mdi-clipboard-text-multiple:before{content:\"\\F126B\"}.mdi-clipboard-text-multiple-outline:before{content:\"\\F126C\"}.mdi-clipboard-text-off:before{content:\"\\F1620\"}.mdi-clipboard-text-off-outline:before{content:\"\\F1621\"}.mdi-clipboard-text-outline:before{content:\"\\F0A38\"}.mdi-clipboard-text-play:before{content:\"\\F0C5B\"}.mdi-clipboard-text-play-outline:before{content:\"\\F0C5C\"}.mdi-clipboard-text-search:before{content:\"\\F1622\"}.mdi-clipboard-text-search-outline:before{content:\"\\F1623\"}.mdi-clippy:before{content:\"\\F014F\"}.mdi-clock:before{content:\"\\F0954\"}.mdi-clock-alert:before{content:\"\\F0955\"}.mdi-clock-alert-outline:before{content:\"\\F05CE\"}.mdi-clock-check:before{content:\"\\F0FA8\"}.mdi-clock-check-outline:before{content:\"\\F0FA9\"}.mdi-clock-digital:before{content:\"\\F0E97\"}.mdi-clock-end:before{content:\"\\F0151\"}.mdi-clock-fast:before{content:\"\\F0152\"}.mdi-clock-in:before{content:\"\\F0153\"}.mdi-clock-out:before{content:\"\\F0154\"}.mdi-clock-outline:before{content:\"\\F0150\"}.mdi-clock-start:before{content:\"\\F0155\"}.mdi-clock-time-eight:before{content:\"\\F1446\"}.mdi-clock-time-eight-outline:before{content:\"\\F1452\"}.mdi-clock-time-eleven:before{content:\"\\F1449\"}.mdi-clock-time-eleven-outline:before{content:\"\\F1455\"}.mdi-clock-time-five:before{content:\"\\F1443\"}.mdi-clock-time-five-outline:before{content:\"\\F144F\"}.mdi-clock-time-four:before{content:\"\\F1442\"}.mdi-clock-time-four-outline:before{content:\"\\F144E\"}.mdi-clock-time-nine:before{content:\"\\F1447\"}.mdi-clock-time-nine-outline:before{content:\"\\F1453\"}.mdi-clock-time-one:before{content:\"\\F143F\"}.mdi-clock-time-one-outline:before{content:\"\\F144B\"}.mdi-clock-time-seven:before{content:\"\\F1445\"}.mdi-clock-time-seven-outline:before{content:\"\\F1451\"}.mdi-clock-time-six:before{content:\"\\F1444\"}.mdi-clock-time-six-outline:before{content:\"\\F1450\"}.mdi-clock-time-ten:before{content:\"\\F1448\"}.mdi-clock-time-ten-outline:before{content:\"\\F1454\"}.mdi-clock-time-three:before{content:\"\\F1441\"}.mdi-clock-time-three-outline:before{content:\"\\F144D\"}.mdi-clock-time-twelve:before{content:\"\\F144A\"}.mdi-clock-time-twelve-outline:before{content:\"\\F1456\"}.mdi-clock-time-two:before{content:\"\\F1440\"}.mdi-clock-time-two-outline:before{content:\"\\F144C\"}.mdi-close:before{content:\"\\F0156\"}.mdi-close-box:before{content:\"\\F0157\"}.mdi-close-box-multiple:before{content:\"\\F0C5D\"}.mdi-close-box-multiple-outline:before{content:\"\\F0C5E\"}.mdi-close-box-outline:before{content:\"\\F0158\"}.mdi-close-circle:before{content:\"\\F0159\"}.mdi-close-circle-multiple:before{content:\"\\F062A\"}.mdi-close-circle-multiple-outline:before{content:\"\\F0883\"}.mdi-close-circle-outline:before{content:\"\\F015A\"}.mdi-close-network:before{content:\"\\F015B\"}.mdi-close-network-outline:before{content:\"\\F0C5F\"}.mdi-close-octagon:before{content:\"\\F015C\"}.mdi-close-octagon-outline:before{content:\"\\F015D\"}.mdi-close-outline:before{content:\"\\F06C9\"}.mdi-close-thick:before{content:\"\\F1398\"}.mdi-closed-caption:before{content:\"\\F015E\"}.mdi-closed-caption-outline:before{content:\"\\F0DBD\"}.mdi-cloud:before{content:\"\\F015F\"}.mdi-cloud-alert:before{content:\"\\F09E0\"}.mdi-cloud-braces:before{content:\"\\F07B5\"}.mdi-cloud-check:before{content:\"\\F0160\"}.mdi-cloud-check-outline:before{content:\"\\F12CC\"}.mdi-cloud-circle:before{content:\"\\F0161\"}.mdi-cloud-download:before{content:\"\\F0162\"}.mdi-cloud-download-outline:before{content:\"\\F0B7D\"}.mdi-cloud-lock:before{content:\"\\F11F1\"}.mdi-cloud-lock-outline:before{content:\"\\F11F2\"}.mdi-cloud-off-outline:before{content:\"\\F0164\"}.mdi-cloud-outline:before{content:\"\\F0163\"}.mdi-cloud-print:before{content:\"\\F0165\"}.mdi-cloud-print-outline:before{content:\"\\F0166\"}.mdi-cloud-question:before{content:\"\\F0A39\"}.mdi-cloud-refresh:before{content:\"\\F052A\"}.mdi-cloud-search:before{content:\"\\F0956\"}.mdi-cloud-search-outline:before{content:\"\\F0957\"}.mdi-cloud-sync:before{content:\"\\F063F\"}.mdi-cloud-sync-outline:before{content:\"\\F12D6\"}.mdi-cloud-tags:before{content:\"\\F07B6\"}.mdi-cloud-upload:before{content:\"\\F0167\"}.mdi-cloud-upload-outline:before{content:\"\\F0B7E\"}.mdi-clover:before{content:\"\\F0816\"}.mdi-coach-lamp:before{content:\"\\F1020\"}.mdi-coat-rack:before{content:\"\\F109E\"}.mdi-code-array:before{content:\"\\F0168\"}.mdi-code-braces:before{content:\"\\F0169\"}.mdi-code-braces-box:before{content:\"\\F10D6\"}.mdi-code-brackets:before{content:\"\\F016A\"}.mdi-code-equal:before{content:\"\\F016B\"}.mdi-code-greater-than:before{content:\"\\F016C\"}.mdi-code-greater-than-or-equal:before{content:\"\\F016D\"}.mdi-code-json:before{content:\"\\F0626\"}.mdi-code-less-than:before{content:\"\\F016E\"}.mdi-code-less-than-or-equal:before{content:\"\\F016F\"}.mdi-code-not-equal:before{content:\"\\F0170\"}.mdi-code-not-equal-variant:before{content:\"\\F0171\"}.mdi-code-parentheses:before{content:\"\\F0172\"}.mdi-code-parentheses-box:before{content:\"\\F10D7\"}.mdi-code-string:before{content:\"\\F0173\"}.mdi-code-tags:before{content:\"\\F0174\"}.mdi-code-tags-check:before{content:\"\\F0694\"}.mdi-codepen:before{content:\"\\F0175\"}.mdi-coffee:before{content:\"\\F0176\"}.mdi-coffee-maker:before{content:\"\\F109F\"}.mdi-coffee-off:before{content:\"\\F0FAA\"}.mdi-coffee-off-outline:before{content:\"\\F0FAB\"}.mdi-coffee-outline:before{content:\"\\F06CA\"}.mdi-coffee-to-go:before{content:\"\\F0177\"}.mdi-coffee-to-go-outline:before{content:\"\\F130E\"}.mdi-coffin:before{content:\"\\F0B7F\"}.mdi-cog:before{content:\"\\F0493\"}.mdi-cog-box:before{content:\"\\F0494\"}.mdi-cog-clockwise:before{content:\"\\F11DD\"}.mdi-cog-counterclockwise:before{content:\"\\F11DE\"}.mdi-cog-off:before{content:\"\\F13CE\"}.mdi-cog-off-outline:before{content:\"\\F13CF\"}.mdi-cog-outline:before{content:\"\\F08BB\"}.mdi-cog-refresh:before{content:\"\\F145E\"}.mdi-cog-refresh-outline:before{content:\"\\F145F\"}.mdi-cog-sync:before{content:\"\\F1460\"}.mdi-cog-sync-outline:before{content:\"\\F1461\"}.mdi-cog-transfer:before{content:\"\\F105B\"}.mdi-cog-transfer-outline:before{content:\"\\F105C\"}.mdi-cogs:before{content:\"\\F08D6\"}.mdi-collage:before{content:\"\\F0640\"}.mdi-collapse-all:before{content:\"\\F0AA6\"}.mdi-collapse-all-outline:before{content:\"\\F0AA7\"}.mdi-color-helper:before{content:\"\\F0179\"}.mdi-comma:before{content:\"\\F0E23\"}.mdi-comma-box:before{content:\"\\F0E2B\"}.mdi-comma-box-outline:before{content:\"\\F0E24\"}.mdi-comma-circle:before{content:\"\\F0E25\"}.mdi-comma-circle-outline:before{content:\"\\F0E26\"}.mdi-comment:before{content:\"\\F017A\"}.mdi-comment-account:before{content:\"\\F017B\"}.mdi-comment-account-outline:before{content:\"\\F017C\"}.mdi-comment-alert:before{content:\"\\F017D\"}.mdi-comment-alert-outline:before{content:\"\\F017E\"}.mdi-comment-arrow-left:before{content:\"\\F09E1\"}.mdi-comment-arrow-left-outline:before{content:\"\\F09E2\"}.mdi-comment-arrow-right:before{content:\"\\F09E3\"}.mdi-comment-arrow-right-outline:before{content:\"\\F09E4\"}.mdi-comment-bookmark:before{content:\"\\F15AE\"}.mdi-comment-bookmark-outline:before{content:\"\\F15AF\"}.mdi-comment-check:before{content:\"\\F017F\"}.mdi-comment-check-outline:before{content:\"\\F0180\"}.mdi-comment-edit:before{content:\"\\F11BF\"}.mdi-comment-edit-outline:before{content:\"\\F12C4\"}.mdi-comment-eye:before{content:\"\\F0A3A\"}.mdi-comment-eye-outline:before{content:\"\\F0A3B\"}.mdi-comment-flash:before{content:\"\\F15B0\"}.mdi-comment-flash-outline:before{content:\"\\F15B1\"}.mdi-comment-minus:before{content:\"\\F15DF\"}.mdi-comment-minus-outline:before{content:\"\\F15E0\"}.mdi-comment-multiple:before{content:\"\\F085F\"}.mdi-comment-multiple-outline:before{content:\"\\F0181\"}.mdi-comment-off:before{content:\"\\F15E1\"}.mdi-comment-off-outline:before{content:\"\\F15E2\"}.mdi-comment-outline:before{content:\"\\F0182\"}.mdi-comment-plus:before{content:\"\\F09E5\"}.mdi-comment-plus-outline:before{content:\"\\F0183\"}.mdi-comment-processing:before{content:\"\\F0184\"}.mdi-comment-processing-outline:before{content:\"\\F0185\"}.mdi-comment-question:before{content:\"\\F0817\"}.mdi-comment-question-outline:before{content:\"\\F0186\"}.mdi-comment-quote:before{content:\"\\F1021\"}.mdi-comment-quote-outline:before{content:\"\\F1022\"}.mdi-comment-remove:before{content:\"\\F05DE\"}.mdi-comment-remove-outline:before{content:\"\\F0187\"}.mdi-comment-search:before{content:\"\\F0A3C\"}.mdi-comment-search-outline:before{content:\"\\F0A3D\"}.mdi-comment-text:before{content:\"\\F0188\"}.mdi-comment-text-multiple:before{content:\"\\F0860\"}.mdi-comment-text-multiple-outline:before{content:\"\\F0861\"}.mdi-comment-text-outline:before{content:\"\\F0189\"}.mdi-compare:before{content:\"\\F018A\"}.mdi-compare-horizontal:before{content:\"\\F1492\"}.mdi-compare-vertical:before{content:\"\\F1493\"}.mdi-compass:before{content:\"\\F018B\"}.mdi-compass-off:before{content:\"\\F0B80\"}.mdi-compass-off-outline:before{content:\"\\F0B81\"}.mdi-compass-outline:before{content:\"\\F018C\"}.mdi-compass-rose:before{content:\"\\F1382\"}.mdi-concourse-ci:before{content:\"\\F10A0\"}.mdi-connection:before{content:\"\\F1616\"}.mdi-console:before{content:\"\\F018D\"}.mdi-console-line:before{content:\"\\F07B7\"}.mdi-console-network:before{content:\"\\F08A9\"}.mdi-console-network-outline:before{content:\"\\F0C60\"}.mdi-consolidate:before{content:\"\\F10D8\"}.mdi-contactless-payment:before{content:\"\\F0D6A\"}.mdi-contactless-payment-circle:before{content:\"\\F0321\"}.mdi-contactless-payment-circle-outline:before{content:\"\\F0408\"}.mdi-contacts:before{content:\"\\F06CB\"}.mdi-contacts-outline:before{content:\"\\F05B8\"}.mdi-contain:before{content:\"\\F0A3E\"}.mdi-contain-end:before{content:\"\\F0A3F\"}.mdi-contain-start:before{content:\"\\F0A40\"}.mdi-content-copy:before{content:\"\\F018F\"}.mdi-content-cut:before{content:\"\\F0190\"}.mdi-content-duplicate:before{content:\"\\F0191\"}.mdi-content-paste:before{content:\"\\F0192\"}.mdi-content-save:before{content:\"\\F0193\"}.mdi-content-save-alert:before{content:\"\\F0F42\"}.mdi-content-save-alert-outline:before{content:\"\\F0F43\"}.mdi-content-save-all:before{content:\"\\F0194\"}.mdi-content-save-all-outline:before{content:\"\\F0F44\"}.mdi-content-save-cog:before{content:\"\\F145B\"}.mdi-content-save-cog-outline:before{content:\"\\F145C\"}.mdi-content-save-edit:before{content:\"\\F0CFB\"}.mdi-content-save-edit-outline:before{content:\"\\F0CFC\"}.mdi-content-save-move:before{content:\"\\F0E27\"}.mdi-content-save-move-outline:before{content:\"\\F0E28\"}.mdi-content-save-off:before{content:\"\\F1643\"}.mdi-content-save-off-outline:before{content:\"\\F1644\"}.mdi-content-save-outline:before{content:\"\\F0818\"}.mdi-content-save-settings:before{content:\"\\F061B\"}.mdi-content-save-settings-outline:before{content:\"\\F0B2E\"}.mdi-contrast:before{content:\"\\F0195\"}.mdi-contrast-box:before{content:\"\\F0196\"}.mdi-contrast-circle:before{content:\"\\F0197\"}.mdi-controller-classic:before{content:\"\\F0B82\"}.mdi-controller-classic-outline:before{content:\"\\F0B83\"}.mdi-cookie:before{content:\"\\F0198\"}.mdi-cookie-alert:before{content:\"\\F16D0\"}.mdi-cookie-alert-outline:before{content:\"\\F16D1\"}.mdi-cookie-check:before{content:\"\\F16D2\"}.mdi-cookie-check-outline:before{content:\"\\F16D3\"}.mdi-cookie-clock:before{content:\"\\F16E4\"}.mdi-cookie-clock-outline:before{content:\"\\F16E5\"}.mdi-cookie-cog:before{content:\"\\F16D4\"}.mdi-cookie-cog-outline:before{content:\"\\F16D5\"}.mdi-cookie-edit:before{content:\"\\F16E6\"}.mdi-cookie-edit-outline:before{content:\"\\F16E7\"}.mdi-cookie-lock:before{content:\"\\F16E8\"}.mdi-cookie-lock-outline:before{content:\"\\F16E9\"}.mdi-cookie-minus:before{content:\"\\F16DA\"}.mdi-cookie-minus-outline:before{content:\"\\F16DB\"}.mdi-cookie-off:before{content:\"\\F16EA\"}.mdi-cookie-off-outline:before{content:\"\\F16EB\"}.mdi-cookie-outline:before{content:\"\\F16DE\"}.mdi-cookie-plus:before{content:\"\\F16D6\"}.mdi-cookie-plus-outline:before{content:\"\\F16D7\"}.mdi-cookie-refresh:before{content:\"\\F16EC\"}.mdi-cookie-refresh-outline:before{content:\"\\F16ED\"}.mdi-cookie-remove:before{content:\"\\F16D8\"}.mdi-cookie-remove-outline:before{content:\"\\F16D9\"}.mdi-cookie-settings:before{content:\"\\F16DC\"}.mdi-cookie-settings-outline:before{content:\"\\F16DD\"}.mdi-coolant-temperature:before{content:\"\\F03C8\"}.mdi-copyright:before{content:\"\\F05E6\"}.mdi-cordova:before{content:\"\\F0958\"}.mdi-corn:before{content:\"\\F07B8\"}.mdi-corn-off:before{content:\"\\F13EF\"}.mdi-cosine-wave:before{content:\"\\F1479\"}.mdi-counter:before{content:\"\\F0199\"}.mdi-cow:before{content:\"\\F019A\"}.mdi-cpu-32-bit:before{content:\"\\F0EDF\"}.mdi-cpu-64-bit:before{content:\"\\F0EE0\"}.mdi-crane:before{content:\"\\F0862\"}.mdi-creation:before{content:\"\\F0674\"}.mdi-creative-commons:before{content:\"\\F0D6B\"}.mdi-credit-card:before{content:\"\\F0FEF\"}.mdi-credit-card-check:before{content:\"\\F13D0\"}.mdi-credit-card-check-outline:before{content:\"\\F13D1\"}.mdi-credit-card-clock:before{content:\"\\F0EE1\"}.mdi-credit-card-clock-outline:before{content:\"\\F0EE2\"}.mdi-credit-card-marker:before{content:\"\\F06A8\"}.mdi-credit-card-marker-outline:before{content:\"\\F0DBE\"}.mdi-credit-card-minus:before{content:\"\\F0FAC\"}.mdi-credit-card-minus-outline:before{content:\"\\F0FAD\"}.mdi-credit-card-multiple:before{content:\"\\F0FF0\"}.mdi-credit-card-multiple-outline:before{content:\"\\F019C\"}.mdi-credit-card-off:before{content:\"\\F0FF1\"}.mdi-credit-card-off-outline:before{content:\"\\F05E4\"}.mdi-credit-card-outline:before{content:\"\\F019B\"}.mdi-credit-card-plus:before{content:\"\\F0FF2\"}.mdi-credit-card-plus-outline:before{content:\"\\F0676\"}.mdi-credit-card-refresh:before{content:\"\\F1645\"}.mdi-credit-card-refresh-outline:before{content:\"\\F1646\"}.mdi-credit-card-refund:before{content:\"\\F0FF3\"}.mdi-credit-card-refund-outline:before{content:\"\\F0AA8\"}.mdi-credit-card-remove:before{content:\"\\F0FAE\"}.mdi-credit-card-remove-outline:before{content:\"\\F0FAF\"}.mdi-credit-card-scan:before{content:\"\\F0FF4\"}.mdi-credit-card-scan-outline:before{content:\"\\F019D\"}.mdi-credit-card-search:before{content:\"\\F1647\"}.mdi-credit-card-search-outline:before{content:\"\\F1648\"}.mdi-credit-card-settings:before{content:\"\\F0FF5\"}.mdi-credit-card-settings-outline:before{content:\"\\F08D7\"}.mdi-credit-card-sync:before{content:\"\\F1649\"}.mdi-credit-card-sync-outline:before{content:\"\\F164A\"}.mdi-credit-card-wireless:before{content:\"\\F0802\"}.mdi-credit-card-wireless-off:before{content:\"\\F057A\"}.mdi-credit-card-wireless-off-outline:before{content:\"\\F057B\"}.mdi-credit-card-wireless-outline:before{content:\"\\F0D6C\"}.mdi-cricket:before{content:\"\\F0D6D\"}.mdi-crop:before{content:\"\\F019E\"}.mdi-crop-free:before{content:\"\\F019F\"}.mdi-crop-landscape:before{content:\"\\F01A0\"}.mdi-crop-portrait:before{content:\"\\F01A1\"}.mdi-crop-rotate:before{content:\"\\F0696\"}.mdi-crop-square:before{content:\"\\F01A2\"}.mdi-crosshairs:before{content:\"\\F01A3\"}.mdi-crosshairs-gps:before{content:\"\\F01A4\"}.mdi-crosshairs-off:before{content:\"\\F0F45\"}.mdi-crosshairs-question:before{content:\"\\F1136\"}.mdi-crown:before{content:\"\\F01A5\"}.mdi-crown-outline:before{content:\"\\F11D0\"}.mdi-cryengine:before{content:\"\\F0959\"}.mdi-crystal-ball:before{content:\"\\F0B2F\"}.mdi-cube:before{content:\"\\F01A6\"}.mdi-cube-off:before{content:\"\\F141C\"}.mdi-cube-off-outline:before{content:\"\\F141D\"}.mdi-cube-outline:before{content:\"\\F01A7\"}.mdi-cube-scan:before{content:\"\\F0B84\"}.mdi-cube-send:before{content:\"\\F01A8\"}.mdi-cube-unfolded:before{content:\"\\F01A9\"}.mdi-cup:before{content:\"\\F01AA\"}.mdi-cup-off:before{content:\"\\F05E5\"}.mdi-cup-off-outline:before{content:\"\\F137D\"}.mdi-cup-outline:before{content:\"\\F130F\"}.mdi-cup-water:before{content:\"\\F01AB\"}.mdi-cupboard:before{content:\"\\F0F46\"}.mdi-cupboard-outline:before{content:\"\\F0F47\"}.mdi-cupcake:before{content:\"\\F095A\"}.mdi-curling:before{content:\"\\F0863\"}.mdi-currency-bdt:before{content:\"\\F0864\"}.mdi-currency-brl:before{content:\"\\F0B85\"}.mdi-currency-btc:before{content:\"\\F01AC\"}.mdi-currency-cny:before{content:\"\\F07BA\"}.mdi-currency-eth:before{content:\"\\F07BB\"}.mdi-currency-eur:before{content:\"\\F01AD\"}.mdi-currency-eur-off:before{content:\"\\F1315\"}.mdi-currency-gbp:before{content:\"\\F01AE\"}.mdi-currency-ils:before{content:\"\\F0C61\"}.mdi-currency-inr:before{content:\"\\F01AF\"}.mdi-currency-jpy:before{content:\"\\F07BC\"}.mdi-currency-krw:before{content:\"\\F07BD\"}.mdi-currency-kzt:before{content:\"\\F0865\"}.mdi-currency-mnt:before{content:\"\\F1512\"}.mdi-currency-ngn:before{content:\"\\F01B0\"}.mdi-currency-php:before{content:\"\\F09E6\"}.mdi-currency-rial:before{content:\"\\F0E9C\"}.mdi-currency-rub:before{content:\"\\F01B1\"}.mdi-currency-sign:before{content:\"\\F07BE\"}.mdi-currency-try:before{content:\"\\F01B2\"}.mdi-currency-twd:before{content:\"\\F07BF\"}.mdi-currency-usd:before{content:\"\\F01C1\"}.mdi-currency-usd-circle:before{content:\"\\F116B\"}.mdi-currency-usd-circle-outline:before{content:\"\\F0178\"}.mdi-currency-usd-off:before{content:\"\\F067A\"}.mdi-current-ac:before{content:\"\\F1480\"}.mdi-current-dc:before{content:\"\\F095C\"}.mdi-cursor-default:before{content:\"\\F01C0\"}.mdi-cursor-default-click:before{content:\"\\F0CFD\"}.mdi-cursor-default-click-outline:before{content:\"\\F0CFE\"}.mdi-cursor-default-gesture:before{content:\"\\F1127\"}.mdi-cursor-default-gesture-outline:before{content:\"\\F1128\"}.mdi-cursor-default-outline:before{content:\"\\F01BF\"}.mdi-cursor-move:before{content:\"\\F01BE\"}.mdi-cursor-pointer:before{content:\"\\F01BD\"}.mdi-cursor-text:before{content:\"\\F05E7\"}.mdi-dance-ballroom:before{content:\"\\F15FB\"}.mdi-dance-pole:before{content:\"\\F1578\"}.mdi-data-matrix:before{content:\"\\F153C\"}.mdi-data-matrix-edit:before{content:\"\\F153D\"}.mdi-data-matrix-minus:before{content:\"\\F153E\"}.mdi-data-matrix-plus:before{content:\"\\F153F\"}.mdi-data-matrix-remove:before{content:\"\\F1540\"}.mdi-data-matrix-scan:before{content:\"\\F1541\"}.mdi-database:before{content:\"\\F01BC\"}.mdi-database-alert:before{content:\"\\F163A\"}.mdi-database-alert-outline:before{content:\"\\F1624\"}.mdi-database-arrow-down:before{content:\"\\F163B\"}.mdi-database-arrow-down-outline:before{content:\"\\F1625\"}.mdi-database-arrow-left:before{content:\"\\F163C\"}.mdi-database-arrow-left-outline:before{content:\"\\F1626\"}.mdi-database-arrow-right:before{content:\"\\F163D\"}.mdi-database-arrow-right-outline:before{content:\"\\F1627\"}.mdi-database-arrow-up:before{content:\"\\F163E\"}.mdi-database-arrow-up-outline:before{content:\"\\F1628\"}.mdi-database-check:before{content:\"\\F0AA9\"}.mdi-database-check-outline:before{content:\"\\F1629\"}.mdi-database-clock:before{content:\"\\F163F\"}.mdi-database-clock-outline:before{content:\"\\F162A\"}.mdi-database-cog:before{content:\"\\F164B\"}.mdi-database-cog-outline:before{content:\"\\F164C\"}.mdi-database-edit:before{content:\"\\F0B86\"}.mdi-database-edit-outline:before{content:\"\\F162B\"}.mdi-database-export:before{content:\"\\F095E\"}.mdi-database-export-outline:before{content:\"\\F162C\"}.mdi-database-import:before{content:\"\\F095D\"}.mdi-database-import-outline:before{content:\"\\F162D\"}.mdi-database-lock:before{content:\"\\F0AAA\"}.mdi-database-lock-outline:before{content:\"\\F162E\"}.mdi-database-marker:before{content:\"\\F12F6\"}.mdi-database-marker-outline:before{content:\"\\F162F\"}.mdi-database-minus:before{content:\"\\F01BB\"}.mdi-database-minus-outline:before{content:\"\\F1630\"}.mdi-database-off:before{content:\"\\F1640\"}.mdi-database-off-outline:before{content:\"\\F1631\"}.mdi-database-outline:before{content:\"\\F1632\"}.mdi-database-plus:before{content:\"\\F01BA\"}.mdi-database-plus-outline:before{content:\"\\F1633\"}.mdi-database-refresh:before{content:\"\\F05C2\"}.mdi-database-refresh-outline:before{content:\"\\F1634\"}.mdi-database-remove:before{content:\"\\F0D00\"}.mdi-database-remove-outline:before{content:\"\\F1635\"}.mdi-database-search:before{content:\"\\F0866\"}.mdi-database-search-outline:before{content:\"\\F1636\"}.mdi-database-settings:before{content:\"\\F0D01\"}.mdi-database-settings-outline:before{content:\"\\F1637\"}.mdi-database-sync:before{content:\"\\F0CFF\"}.mdi-database-sync-outline:before{content:\"\\F1638\"}.mdi-death-star:before{content:\"\\F08D8\"}.mdi-death-star-variant:before{content:\"\\F08D9\"}.mdi-deathly-hallows:before{content:\"\\F0B87\"}.mdi-debian:before{content:\"\\F08DA\"}.mdi-debug-step-into:before{content:\"\\F01B9\"}.mdi-debug-step-out:before{content:\"\\F01B8\"}.mdi-debug-step-over:before{content:\"\\F01B7\"}.mdi-decagram:before{content:\"\\F076C\"}.mdi-decagram-outline:before{content:\"\\F076D\"}.mdi-decimal:before{content:\"\\F10A1\"}.mdi-decimal-comma:before{content:\"\\F10A2\"}.mdi-decimal-comma-decrease:before{content:\"\\F10A3\"}.mdi-decimal-comma-increase:before{content:\"\\F10A4\"}.mdi-decimal-decrease:before{content:\"\\F01B6\"}.mdi-decimal-increase:before{content:\"\\F01B5\"}.mdi-delete:before{content:\"\\F01B4\"}.mdi-delete-alert:before{content:\"\\F10A5\"}.mdi-delete-alert-outline:before{content:\"\\F10A6\"}.mdi-delete-circle:before{content:\"\\F0683\"}.mdi-delete-circle-outline:before{content:\"\\F0B88\"}.mdi-delete-clock:before{content:\"\\F1556\"}.mdi-delete-clock-outline:before{content:\"\\F1557\"}.mdi-delete-empty:before{content:\"\\F06CC\"}.mdi-delete-empty-outline:before{content:\"\\F0E9D\"}.mdi-delete-forever:before{content:\"\\F05E8\"}.mdi-delete-forever-outline:before{content:\"\\F0B89\"}.mdi-delete-off:before{content:\"\\F10A7\"}.mdi-delete-off-outline:before{content:\"\\F10A8\"}.mdi-delete-outline:before{content:\"\\F09E7\"}.mdi-delete-restore:before{content:\"\\F0819\"}.mdi-delete-sweep:before{content:\"\\F05E9\"}.mdi-delete-sweep-outline:before{content:\"\\F0C62\"}.mdi-delete-variant:before{content:\"\\F01B3\"}.mdi-delta:before{content:\"\\F01C2\"}.mdi-desk:before{content:\"\\F1239\"}.mdi-desk-lamp:before{content:\"\\F095F\"}.mdi-deskphone:before{content:\"\\F01C3\"}.mdi-desktop-classic:before{content:\"\\F07C0\"}.mdi-desktop-mac:before{content:\"\\F01C4\"}.mdi-desktop-mac-dashboard:before{content:\"\\F09E8\"}.mdi-desktop-tower:before{content:\"\\F01C5\"}.mdi-desktop-tower-monitor:before{content:\"\\F0AAB\"}.mdi-details:before{content:\"\\F01C6\"}.mdi-dev-to:before{content:\"\\F0D6E\"}.mdi-developer-board:before{content:\"\\F0697\"}.mdi-deviantart:before{content:\"\\F01C7\"}.mdi-devices:before{content:\"\\F0FB0\"}.mdi-diabetes:before{content:\"\\F1126\"}.mdi-dialpad:before{content:\"\\F061C\"}.mdi-diameter:before{content:\"\\F0C63\"}.mdi-diameter-outline:before{content:\"\\F0C64\"}.mdi-diameter-variant:before{content:\"\\F0C65\"}.mdi-diamond:before{content:\"\\F0B8A\"}.mdi-diamond-outline:before{content:\"\\F0B8B\"}.mdi-diamond-stone:before{content:\"\\F01C8\"}.mdi-dice-1:before{content:\"\\F01CA\"}.mdi-dice-1-outline:before{content:\"\\F114A\"}.mdi-dice-2:before{content:\"\\F01CB\"}.mdi-dice-2-outline:before{content:\"\\F114B\"}.mdi-dice-3:before{content:\"\\F01CC\"}.mdi-dice-3-outline:before{content:\"\\F114C\"}.mdi-dice-4:before{content:\"\\F01CD\"}.mdi-dice-4-outline:before{content:\"\\F114D\"}.mdi-dice-5:before{content:\"\\F01CE\"}.mdi-dice-5-outline:before{content:\"\\F114E\"}.mdi-dice-6:before{content:\"\\F01CF\"}.mdi-dice-6-outline:before{content:\"\\F114F\"}.mdi-dice-d10:before{content:\"\\F1153\"}.mdi-dice-d10-outline:before{content:\"\\F076F\"}.mdi-dice-d12:before{content:\"\\F1154\"}.mdi-dice-d12-outline:before{content:\"\\F0867\"}.mdi-dice-d20:before{content:\"\\F1155\"}.mdi-dice-d20-outline:before{content:\"\\F05EA\"}.mdi-dice-d4:before{content:\"\\F1150\"}.mdi-dice-d4-outline:before{content:\"\\F05EB\"}.mdi-dice-d6:before{content:\"\\F1151\"}.mdi-dice-d6-outline:before{content:\"\\F05ED\"}.mdi-dice-d8:before{content:\"\\F1152\"}.mdi-dice-d8-outline:before{content:\"\\F05EC\"}.mdi-dice-multiple:before{content:\"\\F076E\"}.mdi-dice-multiple-outline:before{content:\"\\F1156\"}.mdi-digital-ocean:before{content:\"\\F1237\"}.mdi-dip-switch:before{content:\"\\F07C1\"}.mdi-directions:before{content:\"\\F01D0\"}.mdi-directions-fork:before{content:\"\\F0641\"}.mdi-disc:before{content:\"\\F05EE\"}.mdi-disc-alert:before{content:\"\\F01D1\"}.mdi-disc-player:before{content:\"\\F0960\"}.mdi-discord:before{content:\"\\F066F\"}.mdi-dishwasher:before{content:\"\\F0AAC\"}.mdi-dishwasher-alert:before{content:\"\\F11B8\"}.mdi-dishwasher-off:before{content:\"\\F11B9\"}.mdi-disqus:before{content:\"\\F01D2\"}.mdi-distribute-horizontal-center:before{content:\"\\F11C9\"}.mdi-distribute-horizontal-left:before{content:\"\\F11C8\"}.mdi-distribute-horizontal-right:before{content:\"\\F11CA\"}.mdi-distribute-vertical-bottom:before{content:\"\\F11CB\"}.mdi-distribute-vertical-center:before{content:\"\\F11CC\"}.mdi-distribute-vertical-top:before{content:\"\\F11CD\"}.mdi-diving-flippers:before{content:\"\\F0DBF\"}.mdi-diving-helmet:before{content:\"\\F0DC0\"}.mdi-diving-scuba:before{content:\"\\F0DC1\"}.mdi-diving-scuba-flag:before{content:\"\\F0DC2\"}.mdi-diving-scuba-tank:before{content:\"\\F0DC3\"}.mdi-diving-scuba-tank-multiple:before{content:\"\\F0DC4\"}.mdi-diving-snorkel:before{content:\"\\F0DC5\"}.mdi-division:before{content:\"\\F01D4\"}.mdi-division-box:before{content:\"\\F01D5\"}.mdi-dlna:before{content:\"\\F0A41\"}.mdi-dna:before{content:\"\\F0684\"}.mdi-dns:before{content:\"\\F01D6\"}.mdi-dns-outline:before{content:\"\\F0B8C\"}.mdi-do-not-disturb:before{content:\"\\F0698\"}.mdi-do-not-disturb-off:before{content:\"\\F0699\"}.mdi-dock-bottom:before{content:\"\\F10A9\"}.mdi-dock-left:before{content:\"\\F10AA\"}.mdi-dock-right:before{content:\"\\F10AB\"}.mdi-dock-top:before{content:\"\\F1513\"}.mdi-dock-window:before{content:\"\\F10AC\"}.mdi-docker:before{content:\"\\F0868\"}.mdi-doctor:before{content:\"\\F0A42\"}.mdi-dog:before{content:\"\\F0A43\"}.mdi-dog-service:before{content:\"\\F0AAD\"}.mdi-dog-side:before{content:\"\\F0A44\"}.mdi-dog-side-off:before{content:\"\\F16EE\"}.mdi-dolby:before{content:\"\\F06B3\"}.mdi-dolly:before{content:\"\\F0E9E\"}.mdi-domain:before{content:\"\\F01D7\"}.mdi-domain-off:before{content:\"\\F0D6F\"}.mdi-domain-plus:before{content:\"\\F10AD\"}.mdi-domain-remove:before{content:\"\\F10AE\"}.mdi-dome-light:before{content:\"\\F141E\"}.mdi-domino-mask:before{content:\"\\F1023\"}.mdi-donkey:before{content:\"\\F07C2\"}.mdi-door:before{content:\"\\F081A\"}.mdi-door-closed:before{content:\"\\F081B\"}.mdi-door-closed-lock:before{content:\"\\F10AF\"}.mdi-door-open:before{content:\"\\F081C\"}.mdi-doorbell:before{content:\"\\F12E6\"}.mdi-doorbell-video:before{content:\"\\F0869\"}.mdi-dot-net:before{content:\"\\F0AAE\"}.mdi-dots-grid:before{content:\"\\F15FC\"}.mdi-dots-hexagon:before{content:\"\\F15FF\"}.mdi-dots-horizontal:before{content:\"\\F01D8\"}.mdi-dots-horizontal-circle:before{content:\"\\F07C3\"}.mdi-dots-horizontal-circle-outline:before{content:\"\\F0B8D\"}.mdi-dots-square:before{content:\"\\F15FD\"}.mdi-dots-triangle:before{content:\"\\F15FE\"}.mdi-dots-vertical:before{content:\"\\F01D9\"}.mdi-dots-vertical-circle:before{content:\"\\F07C4\"}.mdi-dots-vertical-circle-outline:before{content:\"\\F0B8E\"}.mdi-douban:before{content:\"\\F069A\"}.mdi-download:before{content:\"\\F01DA\"}.mdi-download-box:before{content:\"\\F1462\"}.mdi-download-box-outline:before{content:\"\\F1463\"}.mdi-download-circle:before{content:\"\\F1464\"}.mdi-download-circle-outline:before{content:\"\\F1465\"}.mdi-download-lock:before{content:\"\\F1320\"}.mdi-download-lock-outline:before{content:\"\\F1321\"}.mdi-download-multiple:before{content:\"\\F09E9\"}.mdi-download-network:before{content:\"\\F06F4\"}.mdi-download-network-outline:before{content:\"\\F0C66\"}.mdi-download-off:before{content:\"\\F10B0\"}.mdi-download-off-outline:before{content:\"\\F10B1\"}.mdi-download-outline:before{content:\"\\F0B8F\"}.mdi-drag:before{content:\"\\F01DB\"}.mdi-drag-horizontal:before{content:\"\\F01DC\"}.mdi-drag-horizontal-variant:before{content:\"\\F12F0\"}.mdi-drag-variant:before{content:\"\\F0B90\"}.mdi-drag-vertical:before{content:\"\\F01DD\"}.mdi-drag-vertical-variant:before{content:\"\\F12F1\"}.mdi-drama-masks:before{content:\"\\F0D02\"}.mdi-draw:before{content:\"\\F0F49\"}.mdi-drawing:before{content:\"\\F01DE\"}.mdi-drawing-box:before{content:\"\\F01DF\"}.mdi-dresser:before{content:\"\\F0F4A\"}.mdi-dresser-outline:before{content:\"\\F0F4B\"}.mdi-drone:before{content:\"\\F01E2\"}.mdi-dropbox:before{content:\"\\F01E3\"}.mdi-drupal:before{content:\"\\F01E4\"}.mdi-duck:before{content:\"\\F01E5\"}.mdi-dumbbell:before{content:\"\\F01E6\"}.mdi-dump-truck:before{content:\"\\F0C67\"}.mdi-ear-hearing:before{content:\"\\F07C5\"}.mdi-ear-hearing-off:before{content:\"\\F0A45\"}.mdi-earth:before{content:\"\\F01E7\"}.mdi-earth-arrow-right:before{content:\"\\F1311\"}.mdi-earth-box:before{content:\"\\F06CD\"}.mdi-earth-box-minus:before{content:\"\\F1407\"}.mdi-earth-box-off:before{content:\"\\F06CE\"}.mdi-earth-box-plus:before{content:\"\\F1406\"}.mdi-earth-box-remove:before{content:\"\\F1408\"}.mdi-earth-minus:before{content:\"\\F1404\"}.mdi-earth-off:before{content:\"\\F01E8\"}.mdi-earth-plus:before{content:\"\\F1403\"}.mdi-earth-remove:before{content:\"\\F1405\"}.mdi-egg:before{content:\"\\F0AAF\"}.mdi-egg-easter:before{content:\"\\F0AB0\"}.mdi-egg-off:before{content:\"\\F13F0\"}.mdi-egg-off-outline:before{content:\"\\F13F1\"}.mdi-egg-outline:before{content:\"\\F13F2\"}.mdi-eiffel-tower:before{content:\"\\F156B\"}.mdi-eight-track:before{content:\"\\F09EA\"}.mdi-eject:before{content:\"\\F01EA\"}.mdi-eject-outline:before{content:\"\\F0B91\"}.mdi-electric-switch:before{content:\"\\F0E9F\"}.mdi-electric-switch-closed:before{content:\"\\F10D9\"}.mdi-electron-framework:before{content:\"\\F1024\"}.mdi-elephant:before{content:\"\\F07C6\"}.mdi-elevation-decline:before{content:\"\\F01EB\"}.mdi-elevation-rise:before{content:\"\\F01EC\"}.mdi-elevator:before{content:\"\\F01ED\"}.mdi-elevator-down:before{content:\"\\F12C2\"}.mdi-elevator-passenger:before{content:\"\\F1381\"}.mdi-elevator-up:before{content:\"\\F12C1\"}.mdi-ellipse:before{content:\"\\F0EA0\"}.mdi-ellipse-outline:before{content:\"\\F0EA1\"}.mdi-email:before{content:\"\\F01EE\"}.mdi-email-alert:before{content:\"\\F06CF\"}.mdi-email-alert-outline:before{content:\"\\F0D42\"}.mdi-email-box:before{content:\"\\F0D03\"}.mdi-email-check:before{content:\"\\F0AB1\"}.mdi-email-check-outline:before{content:\"\\F0AB2\"}.mdi-email-edit:before{content:\"\\F0EE3\"}.mdi-email-edit-outline:before{content:\"\\F0EE4\"}.mdi-email-lock:before{content:\"\\F01F1\"}.mdi-email-mark-as-unread:before{content:\"\\F0B92\"}.mdi-email-minus:before{content:\"\\F0EE5\"}.mdi-email-minus-outline:before{content:\"\\F0EE6\"}.mdi-email-multiple:before{content:\"\\F0EE7\"}.mdi-email-multiple-outline:before{content:\"\\F0EE8\"}.mdi-email-newsletter:before{content:\"\\F0FB1\"}.mdi-email-off:before{content:\"\\F13E3\"}.mdi-email-off-outline:before{content:\"\\F13E4\"}.mdi-email-open:before{content:\"\\F01EF\"}.mdi-email-open-multiple:before{content:\"\\F0EE9\"}.mdi-email-open-multiple-outline:before{content:\"\\F0EEA\"}.mdi-email-open-outline:before{content:\"\\F05EF\"}.mdi-email-outline:before{content:\"\\F01F0\"}.mdi-email-plus:before{content:\"\\F09EB\"}.mdi-email-plus-outline:before{content:\"\\F09EC\"}.mdi-email-receive:before{content:\"\\F10DA\"}.mdi-email-receive-outline:before{content:\"\\F10DB\"}.mdi-email-remove:before{content:\"\\F1661\"}.mdi-email-remove-outline:before{content:\"\\F1662\"}.mdi-email-search:before{content:\"\\F0961\"}.mdi-email-search-outline:before{content:\"\\F0962\"}.mdi-email-send:before{content:\"\\F10DC\"}.mdi-email-send-outline:before{content:\"\\F10DD\"}.mdi-email-sync:before{content:\"\\F12C7\"}.mdi-email-sync-outline:before{content:\"\\F12C8\"}.mdi-email-variant:before{content:\"\\F05F0\"}.mdi-ember:before{content:\"\\F0B30\"}.mdi-emby:before{content:\"\\F06B4\"}.mdi-emoticon:before{content:\"\\F0C68\"}.mdi-emoticon-angry:before{content:\"\\F0C69\"}.mdi-emoticon-angry-outline:before{content:\"\\F0C6A\"}.mdi-emoticon-confused:before{content:\"\\F10DE\"}.mdi-emoticon-confused-outline:before{content:\"\\F10DF\"}.mdi-emoticon-cool:before{content:\"\\F0C6B\"}.mdi-emoticon-cool-outline:before{content:\"\\F01F3\"}.mdi-emoticon-cry:before{content:\"\\F0C6C\"}.mdi-emoticon-cry-outline:before{content:\"\\F0C6D\"}.mdi-emoticon-dead:before{content:\"\\F0C6E\"}.mdi-emoticon-dead-outline:before{content:\"\\F069B\"}.mdi-emoticon-devil:before{content:\"\\F0C6F\"}.mdi-emoticon-devil-outline:before{content:\"\\F01F4\"}.mdi-emoticon-excited:before{content:\"\\F0C70\"}.mdi-emoticon-excited-outline:before{content:\"\\F069C\"}.mdi-emoticon-frown:before{content:\"\\F0F4C\"}.mdi-emoticon-frown-outline:before{content:\"\\F0F4D\"}.mdi-emoticon-happy:before{content:\"\\F0C71\"}.mdi-emoticon-happy-outline:before{content:\"\\F01F5\"}.mdi-emoticon-kiss:before{content:\"\\F0C72\"}.mdi-emoticon-kiss-outline:before{content:\"\\F0C73\"}.mdi-emoticon-lol:before{content:\"\\F1214\"}.mdi-emoticon-lol-outline:before{content:\"\\F1215\"}.mdi-emoticon-neutral:before{content:\"\\F0C74\"}.mdi-emoticon-neutral-outline:before{content:\"\\F01F6\"}.mdi-emoticon-outline:before{content:\"\\F01F2\"}.mdi-emoticon-poop:before{content:\"\\F01F7\"}.mdi-emoticon-poop-outline:before{content:\"\\F0C75\"}.mdi-emoticon-sad:before{content:\"\\F0C76\"}.mdi-emoticon-sad-outline:before{content:\"\\F01F8\"}.mdi-emoticon-sick:before{content:\"\\F157C\"}.mdi-emoticon-sick-outline:before{content:\"\\F157D\"}.mdi-emoticon-tongue:before{content:\"\\F01F9\"}.mdi-emoticon-tongue-outline:before{content:\"\\F0C77\"}.mdi-emoticon-wink:before{content:\"\\F0C78\"}.mdi-emoticon-wink-outline:before{content:\"\\F0C79\"}.mdi-engine:before{content:\"\\F01FA\"}.mdi-engine-off:before{content:\"\\F0A46\"}.mdi-engine-off-outline:before{content:\"\\F0A47\"}.mdi-engine-outline:before{content:\"\\F01FB\"}.mdi-epsilon:before{content:\"\\F10E0\"}.mdi-equal:before{content:\"\\F01FC\"}.mdi-equal-box:before{content:\"\\F01FD\"}.mdi-equalizer:before{content:\"\\F0EA2\"}.mdi-equalizer-outline:before{content:\"\\F0EA3\"}.mdi-eraser:before{content:\"\\F01FE\"}.mdi-eraser-variant:before{content:\"\\F0642\"}.mdi-escalator:before{content:\"\\F01FF\"}.mdi-escalator-box:before{content:\"\\F1399\"}.mdi-escalator-down:before{content:\"\\F12C0\"}.mdi-escalator-up:before{content:\"\\F12BF\"}.mdi-eslint:before{content:\"\\F0C7A\"}.mdi-et:before{content:\"\\F0AB3\"}.mdi-ethereum:before{content:\"\\F086A\"}.mdi-ethernet:before{content:\"\\F0200\"}.mdi-ethernet-cable:before{content:\"\\F0201\"}.mdi-ethernet-cable-off:before{content:\"\\F0202\"}.mdi-ev-plug-ccs1:before{content:\"\\F1519\"}.mdi-ev-plug-ccs2:before{content:\"\\F151A\"}.mdi-ev-plug-chademo:before{content:\"\\F151B\"}.mdi-ev-plug-tesla:before{content:\"\\F151C\"}.mdi-ev-plug-type1:before{content:\"\\F151D\"}.mdi-ev-plug-type2:before{content:\"\\F151E\"}.mdi-ev-station:before{content:\"\\F05F1\"}.mdi-evernote:before{content:\"\\F0204\"}.mdi-excavator:before{content:\"\\F1025\"}.mdi-exclamation:before{content:\"\\F0205\"}.mdi-exclamation-thick:before{content:\"\\F1238\"}.mdi-exit-run:before{content:\"\\F0A48\"}.mdi-exit-to-app:before{content:\"\\F0206\"}.mdi-expand-all:before{content:\"\\F0AB4\"}.mdi-expand-all-outline:before{content:\"\\F0AB5\"}.mdi-expansion-card:before{content:\"\\F08AE\"}.mdi-expansion-card-variant:before{content:\"\\F0FB2\"}.mdi-exponent:before{content:\"\\F0963\"}.mdi-exponent-box:before{content:\"\\F0964\"}.mdi-export:before{content:\"\\F0207\"}.mdi-export-variant:before{content:\"\\F0B93\"}.mdi-eye:before{content:\"\\F0208\"}.mdi-eye-check:before{content:\"\\F0D04\"}.mdi-eye-check-outline:before{content:\"\\F0D05\"}.mdi-eye-circle:before{content:\"\\F0B94\"}.mdi-eye-circle-outline:before{content:\"\\F0B95\"}.mdi-eye-minus:before{content:\"\\F1026\"}.mdi-eye-minus-outline:before{content:\"\\F1027\"}.mdi-eye-off:before{content:\"\\F0209\"}.mdi-eye-off-outline:before{content:\"\\F06D1\"}.mdi-eye-outline:before{content:\"\\F06D0\"}.mdi-eye-plus:before{content:\"\\F086B\"}.mdi-eye-plus-outline:before{content:\"\\F086C\"}.mdi-eye-remove:before{content:\"\\F15E3\"}.mdi-eye-remove-outline:before{content:\"\\F15E4\"}.mdi-eye-settings:before{content:\"\\F086D\"}.mdi-eye-settings-outline:before{content:\"\\F086E\"}.mdi-eyedropper:before{content:\"\\F020A\"}.mdi-eyedropper-minus:before{content:\"\\F13DD\"}.mdi-eyedropper-off:before{content:\"\\F13DF\"}.mdi-eyedropper-plus:before{content:\"\\F13DC\"}.mdi-eyedropper-remove:before{content:\"\\F13DE\"}.mdi-eyedropper-variant:before{content:\"\\F020B\"}.mdi-face:before{content:\"\\F0643\"}.mdi-face-agent:before{content:\"\\F0D70\"}.mdi-face-mask:before{content:\"\\F1586\"}.mdi-face-mask-outline:before{content:\"\\F1587\"}.mdi-face-outline:before{content:\"\\F0B96\"}.mdi-face-profile:before{content:\"\\F0644\"}.mdi-face-profile-woman:before{content:\"\\F1076\"}.mdi-face-recognition:before{content:\"\\F0C7B\"}.mdi-face-shimmer:before{content:\"\\F15CC\"}.mdi-face-shimmer-outline:before{content:\"\\F15CD\"}.mdi-face-woman:before{content:\"\\F1077\"}.mdi-face-woman-outline:before{content:\"\\F1078\"}.mdi-face-woman-shimmer:before{content:\"\\F15CE\"}.mdi-face-woman-shimmer-outline:before{content:\"\\F15CF\"}.mdi-facebook:before{content:\"\\F020C\"}.mdi-facebook-gaming:before{content:\"\\F07DD\"}.mdi-facebook-messenger:before{content:\"\\F020E\"}.mdi-facebook-workplace:before{content:\"\\F0B31\"}.mdi-factory:before{content:\"\\F020F\"}.mdi-family-tree:before{content:\"\\F160E\"}.mdi-fan:before{content:\"\\F0210\"}.mdi-fan-alert:before{content:\"\\F146C\"}.mdi-fan-auto:before{content:\"\\F171D\"}.mdi-fan-chevron-down:before{content:\"\\F146D\"}.mdi-fan-chevron-up:before{content:\"\\F146E\"}.mdi-fan-minus:before{content:\"\\F1470\"}.mdi-fan-off:before{content:\"\\F081D\"}.mdi-fan-plus:before{content:\"\\F146F\"}.mdi-fan-remove:before{content:\"\\F1471\"}.mdi-fan-speed-1:before{content:\"\\F1472\"}.mdi-fan-speed-2:before{content:\"\\F1473\"}.mdi-fan-speed-3:before{content:\"\\F1474\"}.mdi-fast-forward:before{content:\"\\F0211\"}.mdi-fast-forward-10:before{content:\"\\F0D71\"}.mdi-fast-forward-30:before{content:\"\\F0D06\"}.mdi-fast-forward-5:before{content:\"\\F11F8\"}.mdi-fast-forward-60:before{content:\"\\F160B\"}.mdi-fast-forward-outline:before{content:\"\\F06D2\"}.mdi-fax:before{content:\"\\F0212\"}.mdi-feather:before{content:\"\\F06D3\"}.mdi-feature-search:before{content:\"\\F0A49\"}.mdi-feature-search-outline:before{content:\"\\F0A4A\"}.mdi-fedora:before{content:\"\\F08DB\"}.mdi-fencing:before{content:\"\\F14C1\"}.mdi-ferris-wheel:before{content:\"\\F0EA4\"}.mdi-ferry:before{content:\"\\F0213\"}.mdi-file:before{content:\"\\F0214\"}.mdi-file-account:before{content:\"\\F073B\"}.mdi-file-account-outline:before{content:\"\\F1028\"}.mdi-file-alert:before{content:\"\\F0A4B\"}.mdi-file-alert-outline:before{content:\"\\F0A4C\"}.mdi-file-cabinet:before{content:\"\\F0AB6\"}.mdi-file-cad:before{content:\"\\F0EEB\"}.mdi-file-cad-box:before{content:\"\\F0EEC\"}.mdi-file-cancel:before{content:\"\\F0DC6\"}.mdi-file-cancel-outline:before{content:\"\\F0DC7\"}.mdi-file-certificate:before{content:\"\\F1186\"}.mdi-file-certificate-outline:before{content:\"\\F1187\"}.mdi-file-chart:before{content:\"\\F0215\"}.mdi-file-chart-outline:before{content:\"\\F1029\"}.mdi-file-check:before{content:\"\\F0216\"}.mdi-file-check-outline:before{content:\"\\F0E29\"}.mdi-file-clock:before{content:\"\\F12E1\"}.mdi-file-clock-outline:before{content:\"\\F12E2\"}.mdi-file-cloud:before{content:\"\\F0217\"}.mdi-file-cloud-outline:before{content:\"\\F102A\"}.mdi-file-code:before{content:\"\\F022E\"}.mdi-file-code-outline:before{content:\"\\F102B\"}.mdi-file-cog:before{content:\"\\F107B\"}.mdi-file-cog-outline:before{content:\"\\F107C\"}.mdi-file-compare:before{content:\"\\F08AA\"}.mdi-file-delimited:before{content:\"\\F0218\"}.mdi-file-delimited-outline:before{content:\"\\F0EA5\"}.mdi-file-document:before{content:\"\\F0219\"}.mdi-file-document-edit:before{content:\"\\F0DC8\"}.mdi-file-document-edit-outline:before{content:\"\\F0DC9\"}.mdi-file-document-multiple:before{content:\"\\F1517\"}.mdi-file-document-multiple-outline:before{content:\"\\F1518\"}.mdi-file-document-outline:before{content:\"\\F09EE\"}.mdi-file-download:before{content:\"\\F0965\"}.mdi-file-download-outline:before{content:\"\\F0966\"}.mdi-file-edit:before{content:\"\\F11E7\"}.mdi-file-edit-outline:before{content:\"\\F11E8\"}.mdi-file-excel:before{content:\"\\F021B\"}.mdi-file-excel-box:before{content:\"\\F021C\"}.mdi-file-excel-box-outline:before{content:\"\\F102C\"}.mdi-file-excel-outline:before{content:\"\\F102D\"}.mdi-file-export:before{content:\"\\F021D\"}.mdi-file-export-outline:before{content:\"\\F102E\"}.mdi-file-eye:before{content:\"\\F0DCA\"}.mdi-file-eye-outline:before{content:\"\\F0DCB\"}.mdi-file-find:before{content:\"\\F021E\"}.mdi-file-find-outline:before{content:\"\\F0B97\"}.mdi-file-hidden:before{content:\"\\F0613\"}.mdi-file-image:before{content:\"\\F021F\"}.mdi-file-image-outline:before{content:\"\\F0EB0\"}.mdi-file-import:before{content:\"\\F0220\"}.mdi-file-import-outline:before{content:\"\\F102F\"}.mdi-file-key:before{content:\"\\F1184\"}.mdi-file-key-outline:before{content:\"\\F1185\"}.mdi-file-link:before{content:\"\\F1177\"}.mdi-file-link-outline:before{content:\"\\F1178\"}.mdi-file-lock:before{content:\"\\F0221\"}.mdi-file-lock-outline:before{content:\"\\F1030\"}.mdi-file-move:before{content:\"\\F0AB9\"}.mdi-file-move-outline:before{content:\"\\F1031\"}.mdi-file-multiple:before{content:\"\\F0222\"}.mdi-file-multiple-outline:before{content:\"\\F1032\"}.mdi-file-music:before{content:\"\\F0223\"}.mdi-file-music-outline:before{content:\"\\F0E2A\"}.mdi-file-outline:before{content:\"\\F0224\"}.mdi-file-pdf:before{content:\"\\F0225\"}.mdi-file-pdf-box:before{content:\"\\F0226\"}.mdi-file-pdf-box-outline:before{content:\"\\F0FB3\"}.mdi-file-pdf-outline:before{content:\"\\F0E2D\"}.mdi-file-percent:before{content:\"\\F081E\"}.mdi-file-percent-outline:before{content:\"\\F1033\"}.mdi-file-phone:before{content:\"\\F1179\"}.mdi-file-phone-outline:before{content:\"\\F117A\"}.mdi-file-plus:before{content:\"\\F0752\"}.mdi-file-plus-outline:before{content:\"\\F0EED\"}.mdi-file-powerpoint:before{content:\"\\F0227\"}.mdi-file-powerpoint-box:before{content:\"\\F0228\"}.mdi-file-powerpoint-box-outline:before{content:\"\\F1034\"}.mdi-file-powerpoint-outline:before{content:\"\\F1035\"}.mdi-file-presentation-box:before{content:\"\\F0229\"}.mdi-file-question:before{content:\"\\F086F\"}.mdi-file-question-outline:before{content:\"\\F1036\"}.mdi-file-refresh:before{content:\"\\F0918\"}.mdi-file-refresh-outline:before{content:\"\\F0541\"}.mdi-file-remove:before{content:\"\\F0B98\"}.mdi-file-remove-outline:before{content:\"\\F1037\"}.mdi-file-replace:before{content:\"\\F0B32\"}.mdi-file-replace-outline:before{content:\"\\F0B33\"}.mdi-file-restore:before{content:\"\\F0670\"}.mdi-file-restore-outline:before{content:\"\\F1038\"}.mdi-file-search:before{content:\"\\F0C7C\"}.mdi-file-search-outline:before{content:\"\\F0C7D\"}.mdi-file-send:before{content:\"\\F022A\"}.mdi-file-send-outline:before{content:\"\\F1039\"}.mdi-file-settings:before{content:\"\\F1079\"}.mdi-file-settings-outline:before{content:\"\\F107A\"}.mdi-file-star:before{content:\"\\F103A\"}.mdi-file-star-outline:before{content:\"\\F103B\"}.mdi-file-swap:before{content:\"\\F0FB4\"}.mdi-file-swap-outline:before{content:\"\\F0FB5\"}.mdi-file-sync:before{content:\"\\F1216\"}.mdi-file-sync-outline:before{content:\"\\F1217\"}.mdi-file-table:before{content:\"\\F0C7E\"}.mdi-file-table-box:before{content:\"\\F10E1\"}.mdi-file-table-box-multiple:before{content:\"\\F10E2\"}.mdi-file-table-box-multiple-outline:before{content:\"\\F10E3\"}.mdi-file-table-box-outline:before{content:\"\\F10E4\"}.mdi-file-table-outline:before{content:\"\\F0C7F\"}.mdi-file-tree:before{content:\"\\F0645\"}.mdi-file-tree-outline:before{content:\"\\F13D2\"}.mdi-file-undo:before{content:\"\\F08DC\"}.mdi-file-undo-outline:before{content:\"\\F103C\"}.mdi-file-upload:before{content:\"\\F0A4D\"}.mdi-file-upload-outline:before{content:\"\\F0A4E\"}.mdi-file-video:before{content:\"\\F022B\"}.mdi-file-video-outline:before{content:\"\\F0E2C\"}.mdi-file-word:before{content:\"\\F022C\"}.mdi-file-word-box:before{content:\"\\F022D\"}.mdi-file-word-box-outline:before{content:\"\\F103D\"}.mdi-file-word-outline:before{content:\"\\F103E\"}.mdi-film:before{content:\"\\F022F\"}.mdi-filmstrip:before{content:\"\\F0230\"}.mdi-filmstrip-box:before{content:\"\\F0332\"}.mdi-filmstrip-box-multiple:before{content:\"\\F0D18\"}.mdi-filmstrip-off:before{content:\"\\F0231\"}.mdi-filter:before{content:\"\\F0232\"}.mdi-filter-menu:before{content:\"\\F10E5\"}.mdi-filter-menu-outline:before{content:\"\\F10E6\"}.mdi-filter-minus:before{content:\"\\F0EEE\"}.mdi-filter-minus-outline:before{content:\"\\F0EEF\"}.mdi-filter-off:before{content:\"\\F14EF\"}.mdi-filter-off-outline:before{content:\"\\F14F0\"}.mdi-filter-outline:before{content:\"\\F0233\"}.mdi-filter-plus:before{content:\"\\F0EF0\"}.mdi-filter-plus-outline:before{content:\"\\F0EF1\"}.mdi-filter-remove:before{content:\"\\F0234\"}.mdi-filter-remove-outline:before{content:\"\\F0235\"}.mdi-filter-variant:before{content:\"\\F0236\"}.mdi-filter-variant-minus:before{content:\"\\F1112\"}.mdi-filter-variant-plus:before{content:\"\\F1113\"}.mdi-filter-variant-remove:before{content:\"\\F103F\"}.mdi-finance:before{content:\"\\F081F\"}.mdi-find-replace:before{content:\"\\F06D4\"}.mdi-fingerprint:before{content:\"\\F0237\"}.mdi-fingerprint-off:before{content:\"\\F0EB1\"}.mdi-fire:before{content:\"\\F0238\"}.mdi-fire-alert:before{content:\"\\F15D7\"}.mdi-fire-extinguisher:before{content:\"\\F0EF2\"}.mdi-fire-hydrant:before{content:\"\\F1137\"}.mdi-fire-hydrant-alert:before{content:\"\\F1138\"}.mdi-fire-hydrant-off:before{content:\"\\F1139\"}.mdi-fire-off:before{content:\"\\F1722\"}.mdi-fire-truck:before{content:\"\\F08AB\"}.mdi-firebase:before{content:\"\\F0967\"}.mdi-firefox:before{content:\"\\F0239\"}.mdi-fireplace:before{content:\"\\F0E2E\"}.mdi-fireplace-off:before{content:\"\\F0E2F\"}.mdi-firework:before{content:\"\\F0E30\"}.mdi-firework-off:before{content:\"\\F1723\"}.mdi-fish:before{content:\"\\F023A\"}.mdi-fish-off:before{content:\"\\F13F3\"}.mdi-fishbowl:before{content:\"\\F0EF3\"}.mdi-fishbowl-outline:before{content:\"\\F0EF4\"}.mdi-fit-to-page:before{content:\"\\F0EF5\"}.mdi-fit-to-page-outline:before{content:\"\\F0EF6\"}.mdi-flag:before{content:\"\\F023B\"}.mdi-flag-checkered:before{content:\"\\F023C\"}.mdi-flag-minus:before{content:\"\\F0B99\"}.mdi-flag-minus-outline:before{content:\"\\F10B2\"}.mdi-flag-outline:before{content:\"\\F023D\"}.mdi-flag-plus:before{content:\"\\F0B9A\"}.mdi-flag-plus-outline:before{content:\"\\F10B3\"}.mdi-flag-remove:before{content:\"\\F0B9B\"}.mdi-flag-remove-outline:before{content:\"\\F10B4\"}.mdi-flag-triangle:before{content:\"\\F023F\"}.mdi-flag-variant:before{content:\"\\F0240\"}.mdi-flag-variant-outline:before{content:\"\\F023E\"}.mdi-flare:before{content:\"\\F0D72\"}.mdi-flash:before{content:\"\\F0241\"}.mdi-flash-alert:before{content:\"\\F0EF7\"}.mdi-flash-alert-outline:before{content:\"\\F0EF8\"}.mdi-flash-auto:before{content:\"\\F0242\"}.mdi-flash-circle:before{content:\"\\F0820\"}.mdi-flash-off:before{content:\"\\F0243\"}.mdi-flash-outline:before{content:\"\\F06D5\"}.mdi-flash-red-eye:before{content:\"\\F067B\"}.mdi-flashlight:before{content:\"\\F0244\"}.mdi-flashlight-off:before{content:\"\\F0245\"}.mdi-flask:before{content:\"\\F0093\"}.mdi-flask-empty:before{content:\"\\F0094\"}.mdi-flask-empty-minus:before{content:\"\\F123A\"}.mdi-flask-empty-minus-outline:before{content:\"\\F123B\"}.mdi-flask-empty-off:before{content:\"\\F13F4\"}.mdi-flask-empty-off-outline:before{content:\"\\F13F5\"}.mdi-flask-empty-outline:before{content:\"\\F0095\"}.mdi-flask-empty-plus:before{content:\"\\F123C\"}.mdi-flask-empty-plus-outline:before{content:\"\\F123D\"}.mdi-flask-empty-remove:before{content:\"\\F123E\"}.mdi-flask-empty-remove-outline:before{content:\"\\F123F\"}.mdi-flask-minus:before{content:\"\\F1240\"}.mdi-flask-minus-outline:before{content:\"\\F1241\"}.mdi-flask-off:before{content:\"\\F13F6\"}.mdi-flask-off-outline:before{content:\"\\F13F7\"}.mdi-flask-outline:before{content:\"\\F0096\"}.mdi-flask-plus:before{content:\"\\F1242\"}.mdi-flask-plus-outline:before{content:\"\\F1243\"}.mdi-flask-remove:before{content:\"\\F1244\"}.mdi-flask-remove-outline:before{content:\"\\F1245\"}.mdi-flask-round-bottom:before{content:\"\\F124B\"}.mdi-flask-round-bottom-empty:before{content:\"\\F124C\"}.mdi-flask-round-bottom-empty-outline:before{content:\"\\F124D\"}.mdi-flask-round-bottom-outline:before{content:\"\\F124E\"}.mdi-fleur-de-lis:before{content:\"\\F1303\"}.mdi-flip-horizontal:before{content:\"\\F10E7\"}.mdi-flip-to-back:before{content:\"\\F0247\"}.mdi-flip-to-front:before{content:\"\\F0248\"}.mdi-flip-vertical:before{content:\"\\F10E8\"}.mdi-floor-lamp:before{content:\"\\F08DD\"}.mdi-floor-lamp-dual:before{content:\"\\F1040\"}.mdi-floor-lamp-variant:before{content:\"\\F1041\"}.mdi-floor-plan:before{content:\"\\F0821\"}.mdi-floppy:before{content:\"\\F0249\"}.mdi-floppy-variant:before{content:\"\\F09EF\"}.mdi-flower:before{content:\"\\F024A\"}.mdi-flower-outline:before{content:\"\\F09F0\"}.mdi-flower-poppy:before{content:\"\\F0D08\"}.mdi-flower-tulip:before{content:\"\\F09F1\"}.mdi-flower-tulip-outline:before{content:\"\\F09F2\"}.mdi-focus-auto:before{content:\"\\F0F4E\"}.mdi-focus-field:before{content:\"\\F0F4F\"}.mdi-focus-field-horizontal:before{content:\"\\F0F50\"}.mdi-focus-field-vertical:before{content:\"\\F0F51\"}.mdi-folder:before{content:\"\\F024B\"}.mdi-folder-account:before{content:\"\\F024C\"}.mdi-folder-account-outline:before{content:\"\\F0B9C\"}.mdi-folder-alert:before{content:\"\\F0DCC\"}.mdi-folder-alert-outline:before{content:\"\\F0DCD\"}.mdi-folder-clock:before{content:\"\\F0ABA\"}.mdi-folder-clock-outline:before{content:\"\\F0ABB\"}.mdi-folder-cog:before{content:\"\\F107F\"}.mdi-folder-cog-outline:before{content:\"\\F1080\"}.mdi-folder-download:before{content:\"\\F024D\"}.mdi-folder-download-outline:before{content:\"\\F10E9\"}.mdi-folder-edit:before{content:\"\\F08DE\"}.mdi-folder-edit-outline:before{content:\"\\F0DCE\"}.mdi-folder-google-drive:before{content:\"\\F024E\"}.mdi-folder-heart:before{content:\"\\F10EA\"}.mdi-folder-heart-outline:before{content:\"\\F10EB\"}.mdi-folder-home:before{content:\"\\F10B5\"}.mdi-folder-home-outline:before{content:\"\\F10B6\"}.mdi-folder-image:before{content:\"\\F024F\"}.mdi-folder-information:before{content:\"\\F10B7\"}.mdi-folder-information-outline:before{content:\"\\F10B8\"}.mdi-folder-key:before{content:\"\\F08AC\"}.mdi-folder-key-network:before{content:\"\\F08AD\"}.mdi-folder-key-network-outline:before{content:\"\\F0C80\"}.mdi-folder-key-outline:before{content:\"\\F10EC\"}.mdi-folder-lock:before{content:\"\\F0250\"}.mdi-folder-lock-open:before{content:\"\\F0251\"}.mdi-folder-marker:before{content:\"\\F126D\"}.mdi-folder-marker-outline:before{content:\"\\F126E\"}.mdi-folder-move:before{content:\"\\F0252\"}.mdi-folder-move-outline:before{content:\"\\F1246\"}.mdi-folder-multiple:before{content:\"\\F0253\"}.mdi-folder-multiple-image:before{content:\"\\F0254\"}.mdi-folder-multiple-outline:before{content:\"\\F0255\"}.mdi-folder-multiple-plus:before{content:\"\\F147E\"}.mdi-folder-multiple-plus-outline:before{content:\"\\F147F\"}.mdi-folder-music:before{content:\"\\F1359\"}.mdi-folder-music-outline:before{content:\"\\F135A\"}.mdi-folder-network:before{content:\"\\F0870\"}.mdi-folder-network-outline:before{content:\"\\F0C81\"}.mdi-folder-open:before{content:\"\\F0770\"}.mdi-folder-open-outline:before{content:\"\\F0DCF\"}.mdi-folder-outline:before{content:\"\\F0256\"}.mdi-folder-plus:before{content:\"\\F0257\"}.mdi-folder-plus-outline:before{content:\"\\F0B9D\"}.mdi-folder-pound:before{content:\"\\F0D09\"}.mdi-folder-pound-outline:before{content:\"\\F0D0A\"}.mdi-folder-refresh:before{content:\"\\F0749\"}.mdi-folder-refresh-outline:before{content:\"\\F0542\"}.mdi-folder-remove:before{content:\"\\F0258\"}.mdi-folder-remove-outline:before{content:\"\\F0B9E\"}.mdi-folder-search:before{content:\"\\F0968\"}.mdi-folder-search-outline:before{content:\"\\F0969\"}.mdi-folder-settings:before{content:\"\\F107D\"}.mdi-folder-settings-outline:before{content:\"\\F107E\"}.mdi-folder-star:before{content:\"\\F069D\"}.mdi-folder-star-multiple:before{content:\"\\F13D3\"}.mdi-folder-star-multiple-outline:before{content:\"\\F13D4\"}.mdi-folder-star-outline:before{content:\"\\F0B9F\"}.mdi-folder-swap:before{content:\"\\F0FB6\"}.mdi-folder-swap-outline:before{content:\"\\F0FB7\"}.mdi-folder-sync:before{content:\"\\F0D0B\"}.mdi-folder-sync-outline:before{content:\"\\F0D0C\"}.mdi-folder-table:before{content:\"\\F12E3\"}.mdi-folder-table-outline:before{content:\"\\F12E4\"}.mdi-folder-text:before{content:\"\\F0C82\"}.mdi-folder-text-outline:before{content:\"\\F0C83\"}.mdi-folder-upload:before{content:\"\\F0259\"}.mdi-folder-upload-outline:before{content:\"\\F10ED\"}.mdi-folder-zip:before{content:\"\\F06EB\"}.mdi-folder-zip-outline:before{content:\"\\F07B9\"}.mdi-font-awesome:before{content:\"\\F003A\"}.mdi-food:before{content:\"\\F025A\"}.mdi-food-apple:before{content:\"\\F025B\"}.mdi-food-apple-outline:before{content:\"\\F0C84\"}.mdi-food-croissant:before{content:\"\\F07C8\"}.mdi-food-drumstick:before{content:\"\\F141F\"}.mdi-food-drumstick-off:before{content:\"\\F1468\"}.mdi-food-drumstick-off-outline:before{content:\"\\F1469\"}.mdi-food-drumstick-outline:before{content:\"\\F1420\"}.mdi-food-fork-drink:before{content:\"\\F05F2\"}.mdi-food-halal:before{content:\"\\F1572\"}.mdi-food-kosher:before{content:\"\\F1573\"}.mdi-food-off:before{content:\"\\F05F3\"}.mdi-food-steak:before{content:\"\\F146A\"}.mdi-food-steak-off:before{content:\"\\F146B\"}.mdi-food-turkey:before{content:\"\\F171C\"}.mdi-food-variant:before{content:\"\\F025C\"}.mdi-food-variant-off:before{content:\"\\F13E5\"}.mdi-foot-print:before{content:\"\\F0F52\"}.mdi-football:before{content:\"\\F025D\"}.mdi-football-australian:before{content:\"\\F025E\"}.mdi-football-helmet:before{content:\"\\F025F\"}.mdi-forklift:before{content:\"\\F07C9\"}.mdi-form-dropdown:before{content:\"\\F1400\"}.mdi-form-select:before{content:\"\\F1401\"}.mdi-form-textarea:before{content:\"\\F1095\"}.mdi-form-textbox:before{content:\"\\F060E\"}.mdi-form-textbox-lock:before{content:\"\\F135D\"}.mdi-form-textbox-password:before{content:\"\\F07F5\"}.mdi-format-align-bottom:before{content:\"\\F0753\"}.mdi-format-align-center:before{content:\"\\F0260\"}.mdi-format-align-justify:before{content:\"\\F0261\"}.mdi-format-align-left:before{content:\"\\F0262\"}.mdi-format-align-middle:before{content:\"\\F0754\"}.mdi-format-align-right:before{content:\"\\F0263\"}.mdi-format-align-top:before{content:\"\\F0755\"}.mdi-format-annotation-minus:before{content:\"\\F0ABC\"}.mdi-format-annotation-plus:before{content:\"\\F0646\"}.mdi-format-bold:before{content:\"\\F0264\"}.mdi-format-clear:before{content:\"\\F0265\"}.mdi-format-color-fill:before{content:\"\\F0266\"}.mdi-format-color-highlight:before{content:\"\\F0E31\"}.mdi-format-color-marker-cancel:before{content:\"\\F1313\"}.mdi-format-color-text:before{content:\"\\F069E\"}.mdi-format-columns:before{content:\"\\F08DF\"}.mdi-format-float-center:before{content:\"\\F0267\"}.mdi-format-float-left:before{content:\"\\F0268\"}.mdi-format-float-none:before{content:\"\\F0269\"}.mdi-format-float-right:before{content:\"\\F026A\"}.mdi-format-font:before{content:\"\\F06D6\"}.mdi-format-font-size-decrease:before{content:\"\\F09F3\"}.mdi-format-font-size-increase:before{content:\"\\F09F4\"}.mdi-format-header-1:before{content:\"\\F026B\"}.mdi-format-header-2:before{content:\"\\F026C\"}.mdi-format-header-3:before{content:\"\\F026D\"}.mdi-format-header-4:before{content:\"\\F026E\"}.mdi-format-header-5:before{content:\"\\F026F\"}.mdi-format-header-6:before{content:\"\\F0270\"}.mdi-format-header-decrease:before{content:\"\\F0271\"}.mdi-format-header-equal:before{content:\"\\F0272\"}.mdi-format-header-increase:before{content:\"\\F0273\"}.mdi-format-header-pound:before{content:\"\\F0274\"}.mdi-format-horizontal-align-center:before{content:\"\\F061E\"}.mdi-format-horizontal-align-left:before{content:\"\\F061F\"}.mdi-format-horizontal-align-right:before{content:\"\\F0620\"}.mdi-format-indent-decrease:before{content:\"\\F0275\"}.mdi-format-indent-increase:before{content:\"\\F0276\"}.mdi-format-italic:before{content:\"\\F0277\"}.mdi-format-letter-case:before{content:\"\\F0B34\"}.mdi-format-letter-case-lower:before{content:\"\\F0B35\"}.mdi-format-letter-case-upper:before{content:\"\\F0B36\"}.mdi-format-letter-ends-with:before{content:\"\\F0FB8\"}.mdi-format-letter-matches:before{content:\"\\F0FB9\"}.mdi-format-letter-starts-with:before{content:\"\\F0FBA\"}.mdi-format-line-spacing:before{content:\"\\F0278\"}.mdi-format-line-style:before{content:\"\\F05C8\"}.mdi-format-line-weight:before{content:\"\\F05C9\"}.mdi-format-list-bulleted:before{content:\"\\F0279\"}.mdi-format-list-bulleted-square:before{content:\"\\F0DD0\"}.mdi-format-list-bulleted-triangle:before{content:\"\\F0EB2\"}.mdi-format-list-bulleted-type:before{content:\"\\F027A\"}.mdi-format-list-checkbox:before{content:\"\\F096A\"}.mdi-format-list-checks:before{content:\"\\F0756\"}.mdi-format-list-numbered:before{content:\"\\F027B\"}.mdi-format-list-numbered-rtl:before{content:\"\\F0D0D\"}.mdi-format-list-text:before{content:\"\\F126F\"}.mdi-format-overline:before{content:\"\\F0EB3\"}.mdi-format-page-break:before{content:\"\\F06D7\"}.mdi-format-paint:before{content:\"\\F027C\"}.mdi-format-paragraph:before{content:\"\\F027D\"}.mdi-format-pilcrow:before{content:\"\\F06D8\"}.mdi-format-quote-close:before{content:\"\\F027E\"}.mdi-format-quote-close-outline:before{content:\"\\F11A8\"}.mdi-format-quote-open:before{content:\"\\F0757\"}.mdi-format-quote-open-outline:before{content:\"\\F11A7\"}.mdi-format-rotate-90:before{content:\"\\F06AA\"}.mdi-format-section:before{content:\"\\F069F\"}.mdi-format-size:before{content:\"\\F027F\"}.mdi-format-strikethrough:before{content:\"\\F0280\"}.mdi-format-strikethrough-variant:before{content:\"\\F0281\"}.mdi-format-subscript:before{content:\"\\F0282\"}.mdi-format-superscript:before{content:\"\\F0283\"}.mdi-format-text:before{content:\"\\F0284\"}.mdi-format-text-rotation-angle-down:before{content:\"\\F0FBB\"}.mdi-format-text-rotation-angle-up:before{content:\"\\F0FBC\"}.mdi-format-text-rotation-down:before{content:\"\\F0D73\"}.mdi-format-text-rotation-down-vertical:before{content:\"\\F0FBD\"}.mdi-format-text-rotation-none:before{content:\"\\F0D74\"}.mdi-format-text-rotation-up:before{content:\"\\F0FBE\"}.mdi-format-text-rotation-vertical:before{content:\"\\F0FBF\"}.mdi-format-text-variant:before{content:\"\\F0E32\"}.mdi-format-text-variant-outline:before{content:\"\\F150F\"}.mdi-format-text-wrapping-clip:before{content:\"\\F0D0E\"}.mdi-format-text-wrapping-overflow:before{content:\"\\F0D0F\"}.mdi-format-text-wrapping-wrap:before{content:\"\\F0D10\"}.mdi-format-textbox:before{content:\"\\F0D11\"}.mdi-format-textdirection-l-to-r:before{content:\"\\F0285\"}.mdi-format-textdirection-r-to-l:before{content:\"\\F0286\"}.mdi-format-title:before{content:\"\\F05F4\"}.mdi-format-underline:before{content:\"\\F0287\"}.mdi-format-vertical-align-bottom:before{content:\"\\F0621\"}.mdi-format-vertical-align-center:before{content:\"\\F0622\"}.mdi-format-vertical-align-top:before{content:\"\\F0623\"}.mdi-format-wrap-inline:before{content:\"\\F0288\"}.mdi-format-wrap-square:before{content:\"\\F0289\"}.mdi-format-wrap-tight:before{content:\"\\F028A\"}.mdi-format-wrap-top-bottom:before{content:\"\\F028B\"}.mdi-forum:before{content:\"\\F028C\"}.mdi-forum-outline:before{content:\"\\F0822\"}.mdi-forward:before{content:\"\\F028D\"}.mdi-forwardburger:before{content:\"\\F0D75\"}.mdi-fountain:before{content:\"\\F096B\"}.mdi-fountain-pen:before{content:\"\\F0D12\"}.mdi-fountain-pen-tip:before{content:\"\\F0D13\"}.mdi-freebsd:before{content:\"\\F08E0\"}.mdi-frequently-asked-questions:before{content:\"\\F0EB4\"}.mdi-fridge:before{content:\"\\F0290\"}.mdi-fridge-alert:before{content:\"\\F11B1\"}.mdi-fridge-alert-outline:before{content:\"\\F11B2\"}.mdi-fridge-bottom:before{content:\"\\F0292\"}.mdi-fridge-industrial:before{content:\"\\F15EE\"}.mdi-fridge-industrial-alert:before{content:\"\\F15EF\"}.mdi-fridge-industrial-alert-outline:before{content:\"\\F15F0\"}.mdi-fridge-industrial-off:before{content:\"\\F15F1\"}.mdi-fridge-industrial-off-outline:before{content:\"\\F15F2\"}.mdi-fridge-industrial-outline:before{content:\"\\F15F3\"}.mdi-fridge-off:before{content:\"\\F11AF\"}.mdi-fridge-off-outline:before{content:\"\\F11B0\"}.mdi-fridge-outline:before{content:\"\\F028F\"}.mdi-fridge-top:before{content:\"\\F0291\"}.mdi-fridge-variant:before{content:\"\\F15F4\"}.mdi-fridge-variant-alert:before{content:\"\\F15F5\"}.mdi-fridge-variant-alert-outline:before{content:\"\\F15F6\"}.mdi-fridge-variant-off:before{content:\"\\F15F7\"}.mdi-fridge-variant-off-outline:before{content:\"\\F15F8\"}.mdi-fridge-variant-outline:before{content:\"\\F15F9\"}.mdi-fruit-cherries:before{content:\"\\F1042\"}.mdi-fruit-cherries-off:before{content:\"\\F13F8\"}.mdi-fruit-citrus:before{content:\"\\F1043\"}.mdi-fruit-citrus-off:before{content:\"\\F13F9\"}.mdi-fruit-grapes:before{content:\"\\F1044\"}.mdi-fruit-grapes-outline:before{content:\"\\F1045\"}.mdi-fruit-pineapple:before{content:\"\\F1046\"}.mdi-fruit-watermelon:before{content:\"\\F1047\"}.mdi-fuel:before{content:\"\\F07CA\"}.mdi-fullscreen:before{content:\"\\F0293\"}.mdi-fullscreen-exit:before{content:\"\\F0294\"}.mdi-function:before{content:\"\\F0295\"}.mdi-function-variant:before{content:\"\\F0871\"}.mdi-furigana-horizontal:before{content:\"\\F1081\"}.mdi-furigana-vertical:before{content:\"\\F1082\"}.mdi-fuse:before{content:\"\\F0C85\"}.mdi-fuse-alert:before{content:\"\\F142D\"}.mdi-fuse-blade:before{content:\"\\F0C86\"}.mdi-fuse-off:before{content:\"\\F142C\"}.mdi-gamepad:before{content:\"\\F0296\"}.mdi-gamepad-circle:before{content:\"\\F0E33\"}.mdi-gamepad-circle-down:before{content:\"\\F0E34\"}.mdi-gamepad-circle-left:before{content:\"\\F0E35\"}.mdi-gamepad-circle-outline:before{content:\"\\F0E36\"}.mdi-gamepad-circle-right:before{content:\"\\F0E37\"}.mdi-gamepad-circle-up:before{content:\"\\F0E38\"}.mdi-gamepad-down:before{content:\"\\F0E39\"}.mdi-gamepad-left:before{content:\"\\F0E3A\"}.mdi-gamepad-right:before{content:\"\\F0E3B\"}.mdi-gamepad-round:before{content:\"\\F0E3C\"}.mdi-gamepad-round-down:before{content:\"\\F0E3D\"}.mdi-gamepad-round-left:before{content:\"\\F0E3E\"}.mdi-gamepad-round-outline:before{content:\"\\F0E3F\"}.mdi-gamepad-round-right:before{content:\"\\F0E40\"}.mdi-gamepad-round-up:before{content:\"\\F0E41\"}.mdi-gamepad-square:before{content:\"\\F0EB5\"}.mdi-gamepad-square-outline:before{content:\"\\F0EB6\"}.mdi-gamepad-up:before{content:\"\\F0E42\"}.mdi-gamepad-variant:before{content:\"\\F0297\"}.mdi-gamepad-variant-outline:before{content:\"\\F0EB7\"}.mdi-gamma:before{content:\"\\F10EE\"}.mdi-gantry-crane:before{content:\"\\F0DD1\"}.mdi-garage:before{content:\"\\F06D9\"}.mdi-garage-alert:before{content:\"\\F0872\"}.mdi-garage-alert-variant:before{content:\"\\F12D5\"}.mdi-garage-open:before{content:\"\\F06DA\"}.mdi-garage-open-variant:before{content:\"\\F12D4\"}.mdi-garage-variant:before{content:\"\\F12D3\"}.mdi-gas-cylinder:before{content:\"\\F0647\"}.mdi-gas-station:before{content:\"\\F0298\"}.mdi-gas-station-off:before{content:\"\\F1409\"}.mdi-gas-station-off-outline:before{content:\"\\F140A\"}.mdi-gas-station-outline:before{content:\"\\F0EB8\"}.mdi-gate:before{content:\"\\F0299\"}.mdi-gate-and:before{content:\"\\F08E1\"}.mdi-gate-arrow-right:before{content:\"\\F1169\"}.mdi-gate-nand:before{content:\"\\F08E2\"}.mdi-gate-nor:before{content:\"\\F08E3\"}.mdi-gate-not:before{content:\"\\F08E4\"}.mdi-gate-open:before{content:\"\\F116A\"}.mdi-gate-or:before{content:\"\\F08E5\"}.mdi-gate-xnor:before{content:\"\\F08E6\"}.mdi-gate-xor:before{content:\"\\F08E7\"}.mdi-gatsby:before{content:\"\\F0E43\"}.mdi-gauge:before{content:\"\\F029A\"}.mdi-gauge-empty:before{content:\"\\F0873\"}.mdi-gauge-full:before{content:\"\\F0874\"}.mdi-gauge-low:before{content:\"\\F0875\"}.mdi-gavel:before{content:\"\\F029B\"}.mdi-gender-female:before{content:\"\\F029C\"}.mdi-gender-male:before{content:\"\\F029D\"}.mdi-gender-male-female:before{content:\"\\F029E\"}.mdi-gender-male-female-variant:before{content:\"\\F113F\"}.mdi-gender-non-binary:before{content:\"\\F1140\"}.mdi-gender-transgender:before{content:\"\\F029F\"}.mdi-gentoo:before{content:\"\\F08E8\"}.mdi-gesture:before{content:\"\\F07CB\"}.mdi-gesture-double-tap:before{content:\"\\F073C\"}.mdi-gesture-pinch:before{content:\"\\F0ABD\"}.mdi-gesture-spread:before{content:\"\\F0ABE\"}.mdi-gesture-swipe:before{content:\"\\F0D76\"}.mdi-gesture-swipe-down:before{content:\"\\F073D\"}.mdi-gesture-swipe-horizontal:before{content:\"\\F0ABF\"}.mdi-gesture-swipe-left:before{content:\"\\F073E\"}.mdi-gesture-swipe-right:before{content:\"\\F073F\"}.mdi-gesture-swipe-up:before{content:\"\\F0740\"}.mdi-gesture-swipe-vertical:before{content:\"\\F0AC0\"}.mdi-gesture-tap:before{content:\"\\F0741\"}.mdi-gesture-tap-box:before{content:\"\\F12A9\"}.mdi-gesture-tap-button:before{content:\"\\F12A8\"}.mdi-gesture-tap-hold:before{content:\"\\F0D77\"}.mdi-gesture-two-double-tap:before{content:\"\\F0742\"}.mdi-gesture-two-tap:before{content:\"\\F0743\"}.mdi-ghost:before{content:\"\\F02A0\"}.mdi-ghost-off:before{content:\"\\F09F5\"}.mdi-ghost-off-outline:before{content:\"\\F165C\"}.mdi-ghost-outline:before{content:\"\\F165D\"}.mdi-gif:before{content:\"\\F0D78\"}.mdi-gift:before{content:\"\\F0E44\"}.mdi-gift-off:before{content:\"\\F16EF\"}.mdi-gift-off-outline:before{content:\"\\F16F0\"}.mdi-gift-open:before{content:\"\\F16F1\"}.mdi-gift-open-outline:before{content:\"\\F16F2\"}.mdi-gift-outline:before{content:\"\\F02A1\"}.mdi-git:before{content:\"\\F02A2\"}.mdi-github:before{content:\"\\F02A4\"}.mdi-gitlab:before{content:\"\\F0BA0\"}.mdi-glass-cocktail:before{content:\"\\F0356\"}.mdi-glass-cocktail-off:before{content:\"\\F15E6\"}.mdi-glass-flute:before{content:\"\\F02A5\"}.mdi-glass-mug:before{content:\"\\F02A6\"}.mdi-glass-mug-off:before{content:\"\\F15E7\"}.mdi-glass-mug-variant:before{content:\"\\F1116\"}.mdi-glass-mug-variant-off:before{content:\"\\F15E8\"}.mdi-glass-pint-outline:before{content:\"\\F130D\"}.mdi-glass-stange:before{content:\"\\F02A7\"}.mdi-glass-tulip:before{content:\"\\F02A8\"}.mdi-glass-wine:before{content:\"\\F0876\"}.mdi-glasses:before{content:\"\\F02AA\"}.mdi-globe-light:before{content:\"\\F12D7\"}.mdi-globe-model:before{content:\"\\F08E9\"}.mdi-gmail:before{content:\"\\F02AB\"}.mdi-gnome:before{content:\"\\F02AC\"}.mdi-go-kart:before{content:\"\\F0D79\"}.mdi-go-kart-track:before{content:\"\\F0D7A\"}.mdi-gog:before{content:\"\\F0BA1\"}.mdi-gold:before{content:\"\\F124F\"}.mdi-golf:before{content:\"\\F0823\"}.mdi-golf-cart:before{content:\"\\F11A4\"}.mdi-golf-tee:before{content:\"\\F1083\"}.mdi-gondola:before{content:\"\\F0686\"}.mdi-goodreads:before{content:\"\\F0D7B\"}.mdi-google:before{content:\"\\F02AD\"}.mdi-google-ads:before{content:\"\\F0C87\"}.mdi-google-analytics:before{content:\"\\F07CC\"}.mdi-google-assistant:before{content:\"\\F07CD\"}.mdi-google-cardboard:before{content:\"\\F02AE\"}.mdi-google-chrome:before{content:\"\\F02AF\"}.mdi-google-circles:before{content:\"\\F02B0\"}.mdi-google-circles-communities:before{content:\"\\F02B1\"}.mdi-google-circles-extended:before{content:\"\\F02B2\"}.mdi-google-circles-group:before{content:\"\\F02B3\"}.mdi-google-classroom:before{content:\"\\F02C0\"}.mdi-google-cloud:before{content:\"\\F11F6\"}.mdi-google-controller:before{content:\"\\F02B4\"}.mdi-google-controller-off:before{content:\"\\F02B5\"}.mdi-google-downasaur:before{content:\"\\F1362\"}.mdi-google-drive:before{content:\"\\F02B6\"}.mdi-google-earth:before{content:\"\\F02B7\"}.mdi-google-fit:before{content:\"\\F096C\"}.mdi-google-glass:before{content:\"\\F02B8\"}.mdi-google-hangouts:before{content:\"\\F02C9\"}.mdi-google-home:before{content:\"\\F0824\"}.mdi-google-keep:before{content:\"\\F06DC\"}.mdi-google-lens:before{content:\"\\F09F6\"}.mdi-google-maps:before{content:\"\\F05F5\"}.mdi-google-my-business:before{content:\"\\F1048\"}.mdi-google-nearby:before{content:\"\\F02B9\"}.mdi-google-photos:before{content:\"\\F06DD\"}.mdi-google-play:before{content:\"\\F02BC\"}.mdi-google-plus:before{content:\"\\F02BD\"}.mdi-google-podcast:before{content:\"\\F0EB9\"}.mdi-google-spreadsheet:before{content:\"\\F09F7\"}.mdi-google-street-view:before{content:\"\\F0C88\"}.mdi-google-translate:before{content:\"\\F02BF\"}.mdi-gradient:before{content:\"\\F06A0\"}.mdi-grain:before{content:\"\\F0D7C\"}.mdi-graph:before{content:\"\\F1049\"}.mdi-graph-outline:before{content:\"\\F104A\"}.mdi-graphql:before{content:\"\\F0877\"}.mdi-grass:before{content:\"\\F1510\"}.mdi-grave-stone:before{content:\"\\F0BA2\"}.mdi-grease-pencil:before{content:\"\\F0648\"}.mdi-greater-than:before{content:\"\\F096D\"}.mdi-greater-than-or-equal:before{content:\"\\F096E\"}.mdi-grid:before{content:\"\\F02C1\"}.mdi-grid-large:before{content:\"\\F0758\"}.mdi-grid-off:before{content:\"\\F02C2\"}.mdi-grill:before{content:\"\\F0E45\"}.mdi-grill-outline:before{content:\"\\F118A\"}.mdi-group:before{content:\"\\F02C3\"}.mdi-guitar-acoustic:before{content:\"\\F0771\"}.mdi-guitar-electric:before{content:\"\\F02C4\"}.mdi-guitar-pick:before{content:\"\\F02C5\"}.mdi-guitar-pick-outline:before{content:\"\\F02C6\"}.mdi-guy-fawkes-mask:before{content:\"\\F0825\"}.mdi-hail:before{content:\"\\F0AC1\"}.mdi-hair-dryer:before{content:\"\\F10EF\"}.mdi-hair-dryer-outline:before{content:\"\\F10F0\"}.mdi-halloween:before{content:\"\\F0BA3\"}.mdi-hamburger:before{content:\"\\F0685\"}.mdi-hammer:before{content:\"\\F08EA\"}.mdi-hammer-screwdriver:before{content:\"\\F1322\"}.mdi-hammer-wrench:before{content:\"\\F1323\"}.mdi-hand:before{content:\"\\F0A4F\"}.mdi-hand-heart:before{content:\"\\F10F1\"}.mdi-hand-heart-outline:before{content:\"\\F157E\"}.mdi-hand-left:before{content:\"\\F0E46\"}.mdi-hand-okay:before{content:\"\\F0A50\"}.mdi-hand-peace:before{content:\"\\F0A51\"}.mdi-hand-peace-variant:before{content:\"\\F0A52\"}.mdi-hand-pointing-down:before{content:\"\\F0A53\"}.mdi-hand-pointing-left:before{content:\"\\F0A54\"}.mdi-hand-pointing-right:before{content:\"\\F02C7\"}.mdi-hand-pointing-up:before{content:\"\\F0A55\"}.mdi-hand-right:before{content:\"\\F0E47\"}.mdi-hand-saw:before{content:\"\\F0E48\"}.mdi-hand-wash:before{content:\"\\F157F\"}.mdi-hand-wash-outline:before{content:\"\\F1580\"}.mdi-hand-water:before{content:\"\\F139F\"}.mdi-handball:before{content:\"\\F0F53\"}.mdi-handcuffs:before{content:\"\\F113E\"}.mdi-handshake:before{content:\"\\F1218\"}.mdi-handshake-outline:before{content:\"\\F15A1\"}.mdi-hanger:before{content:\"\\F02C8\"}.mdi-hard-hat:before{content:\"\\F096F\"}.mdi-harddisk:before{content:\"\\F02CA\"}.mdi-harddisk-plus:before{content:\"\\F104B\"}.mdi-harddisk-remove:before{content:\"\\F104C\"}.mdi-hat-fedora:before{content:\"\\F0BA4\"}.mdi-hazard-lights:before{content:\"\\F0C89\"}.mdi-hdr:before{content:\"\\F0D7D\"}.mdi-hdr-off:before{content:\"\\F0D7E\"}.mdi-head:before{content:\"\\F135E\"}.mdi-head-alert:before{content:\"\\F1338\"}.mdi-head-alert-outline:before{content:\"\\F1339\"}.mdi-head-check:before{content:\"\\F133A\"}.mdi-head-check-outline:before{content:\"\\F133B\"}.mdi-head-cog:before{content:\"\\F133C\"}.mdi-head-cog-outline:before{content:\"\\F133D\"}.mdi-head-dots-horizontal:before{content:\"\\F133E\"}.mdi-head-dots-horizontal-outline:before{content:\"\\F133F\"}.mdi-head-flash:before{content:\"\\F1340\"}.mdi-head-flash-outline:before{content:\"\\F1341\"}.mdi-head-heart:before{content:\"\\F1342\"}.mdi-head-heart-outline:before{content:\"\\F1343\"}.mdi-head-lightbulb:before{content:\"\\F1344\"}.mdi-head-lightbulb-outline:before{content:\"\\F1345\"}.mdi-head-minus:before{content:\"\\F1346\"}.mdi-head-minus-outline:before{content:\"\\F1347\"}.mdi-head-outline:before{content:\"\\F135F\"}.mdi-head-plus:before{content:\"\\F1348\"}.mdi-head-plus-outline:before{content:\"\\F1349\"}.mdi-head-question:before{content:\"\\F134A\"}.mdi-head-question-outline:before{content:\"\\F134B\"}.mdi-head-remove:before{content:\"\\F134C\"}.mdi-head-remove-outline:before{content:\"\\F134D\"}.mdi-head-snowflake:before{content:\"\\F134E\"}.mdi-head-snowflake-outline:before{content:\"\\F134F\"}.mdi-head-sync:before{content:\"\\F1350\"}.mdi-head-sync-outline:before{content:\"\\F1351\"}.mdi-headphones:before{content:\"\\F02CB\"}.mdi-headphones-bluetooth:before{content:\"\\F0970\"}.mdi-headphones-box:before{content:\"\\F02CC\"}.mdi-headphones-off:before{content:\"\\F07CE\"}.mdi-headphones-settings:before{content:\"\\F02CD\"}.mdi-headset:before{content:\"\\F02CE\"}.mdi-headset-dock:before{content:\"\\F02CF\"}.mdi-headset-off:before{content:\"\\F02D0\"}.mdi-heart:before{content:\"\\F02D1\"}.mdi-heart-box:before{content:\"\\F02D2\"}.mdi-heart-box-outline:before{content:\"\\F02D3\"}.mdi-heart-broken:before{content:\"\\F02D4\"}.mdi-heart-broken-outline:before{content:\"\\F0D14\"}.mdi-heart-circle:before{content:\"\\F0971\"}.mdi-heart-circle-outline:before{content:\"\\F0972\"}.mdi-heart-cog:before{content:\"\\F1663\"}.mdi-heart-cog-outline:before{content:\"\\F1664\"}.mdi-heart-flash:before{content:\"\\F0EF9\"}.mdi-heart-half:before{content:\"\\F06DF\"}.mdi-heart-half-full:before{content:\"\\F06DE\"}.mdi-heart-half-outline:before{content:\"\\F06E0\"}.mdi-heart-minus:before{content:\"\\F142F\"}.mdi-heart-minus-outline:before{content:\"\\F1432\"}.mdi-heart-multiple:before{content:\"\\F0A56\"}.mdi-heart-multiple-outline:before{content:\"\\F0A57\"}.mdi-heart-off:before{content:\"\\F0759\"}.mdi-heart-off-outline:before{content:\"\\F1434\"}.mdi-heart-outline:before{content:\"\\F02D5\"}.mdi-heart-plus:before{content:\"\\F142E\"}.mdi-heart-plus-outline:before{content:\"\\F1431\"}.mdi-heart-pulse:before{content:\"\\F05F6\"}.mdi-heart-remove:before{content:\"\\F1430\"}.mdi-heart-remove-outline:before{content:\"\\F1433\"}.mdi-heart-settings:before{content:\"\\F1665\"}.mdi-heart-settings-outline:before{content:\"\\F1666\"}.mdi-helicopter:before{content:\"\\F0AC2\"}.mdi-help:before{content:\"\\F02D6\"}.mdi-help-box:before{content:\"\\F078B\"}.mdi-help-circle:before{content:\"\\F02D7\"}.mdi-help-circle-outline:before{content:\"\\F0625\"}.mdi-help-network:before{content:\"\\F06F5\"}.mdi-help-network-outline:before{content:\"\\F0C8A\"}.mdi-help-rhombus:before{content:\"\\F0BA5\"}.mdi-help-rhombus-outline:before{content:\"\\F0BA6\"}.mdi-hexadecimal:before{content:\"\\F12A7\"}.mdi-hexagon:before{content:\"\\F02D8\"}.mdi-hexagon-multiple:before{content:\"\\F06E1\"}.mdi-hexagon-multiple-outline:before{content:\"\\F10F2\"}.mdi-hexagon-outline:before{content:\"\\F02D9\"}.mdi-hexagon-slice-1:before{content:\"\\F0AC3\"}.mdi-hexagon-slice-2:before{content:\"\\F0AC4\"}.mdi-hexagon-slice-3:before{content:\"\\F0AC5\"}.mdi-hexagon-slice-4:before{content:\"\\F0AC6\"}.mdi-hexagon-slice-5:before{content:\"\\F0AC7\"}.mdi-hexagon-slice-6:before{content:\"\\F0AC8\"}.mdi-hexagram:before{content:\"\\F0AC9\"}.mdi-hexagram-outline:before{content:\"\\F0ACA\"}.mdi-high-definition:before{content:\"\\F07CF\"}.mdi-high-definition-box:before{content:\"\\F0878\"}.mdi-highway:before{content:\"\\F05F7\"}.mdi-hiking:before{content:\"\\F0D7F\"}.mdi-hinduism:before{content:\"\\F0973\"}.mdi-history:before{content:\"\\F02DA\"}.mdi-hockey-puck:before{content:\"\\F0879\"}.mdi-hockey-sticks:before{content:\"\\F087A\"}.mdi-hololens:before{content:\"\\F02DB\"}.mdi-home:before{content:\"\\F02DC\"}.mdi-home-account:before{content:\"\\F0826\"}.mdi-home-alert:before{content:\"\\F087B\"}.mdi-home-alert-outline:before{content:\"\\F15D0\"}.mdi-home-analytics:before{content:\"\\F0EBA\"}.mdi-home-assistant:before{content:\"\\F07D0\"}.mdi-home-automation:before{content:\"\\F07D1\"}.mdi-home-circle:before{content:\"\\F07D2\"}.mdi-home-circle-outline:before{content:\"\\F104D\"}.mdi-home-city:before{content:\"\\F0D15\"}.mdi-home-city-outline:before{content:\"\\F0D16\"}.mdi-home-currency-usd:before{content:\"\\F08AF\"}.mdi-home-edit:before{content:\"\\F1159\"}.mdi-home-edit-outline:before{content:\"\\F115A\"}.mdi-home-export-outline:before{content:\"\\F0F9B\"}.mdi-home-flood:before{content:\"\\F0EFA\"}.mdi-home-floor-0:before{content:\"\\F0DD2\"}.mdi-home-floor-1:before{content:\"\\F0D80\"}.mdi-home-floor-2:before{content:\"\\F0D81\"}.mdi-home-floor-3:before{content:\"\\F0D82\"}.mdi-home-floor-a:before{content:\"\\F0D83\"}.mdi-home-floor-b:before{content:\"\\F0D84\"}.mdi-home-floor-g:before{content:\"\\F0D85\"}.mdi-home-floor-l:before{content:\"\\F0D86\"}.mdi-home-floor-negative-1:before{content:\"\\F0DD3\"}.mdi-home-group:before{content:\"\\F0DD4\"}.mdi-home-heart:before{content:\"\\F0827\"}.mdi-home-import-outline:before{content:\"\\F0F9C\"}.mdi-home-lightbulb:before{content:\"\\F1251\"}.mdi-home-lightbulb-outline:before{content:\"\\F1252\"}.mdi-home-lock:before{content:\"\\F08EB\"}.mdi-home-lock-open:before{content:\"\\F08EC\"}.mdi-home-map-marker:before{content:\"\\F05F8\"}.mdi-home-minus:before{content:\"\\F0974\"}.mdi-home-minus-outline:before{content:\"\\F13D5\"}.mdi-home-modern:before{content:\"\\F02DD\"}.mdi-home-outline:before{content:\"\\F06A1\"}.mdi-home-plus:before{content:\"\\F0975\"}.mdi-home-plus-outline:before{content:\"\\F13D6\"}.mdi-home-remove:before{content:\"\\F1247\"}.mdi-home-remove-outline:before{content:\"\\F13D7\"}.mdi-home-roof:before{content:\"\\F112B\"}.mdi-home-search:before{content:\"\\F13B0\"}.mdi-home-search-outline:before{content:\"\\F13B1\"}.mdi-home-thermometer:before{content:\"\\F0F54\"}.mdi-home-thermometer-outline:before{content:\"\\F0F55\"}.mdi-home-variant:before{content:\"\\F02DE\"}.mdi-home-variant-outline:before{content:\"\\F0BA7\"}.mdi-hook:before{content:\"\\F06E2\"}.mdi-hook-off:before{content:\"\\F06E3\"}.mdi-hops:before{content:\"\\F02DF\"}.mdi-horizontal-rotate-clockwise:before{content:\"\\F10F3\"}.mdi-horizontal-rotate-counterclockwise:before{content:\"\\F10F4\"}.mdi-horse:before{content:\"\\F15BF\"}.mdi-horse-human:before{content:\"\\F15C0\"}.mdi-horse-variant:before{content:\"\\F15C1\"}.mdi-horseshoe:before{content:\"\\F0A58\"}.mdi-hospital:before{content:\"\\F0FF6\"}.mdi-hospital-box:before{content:\"\\F02E0\"}.mdi-hospital-box-outline:before{content:\"\\F0FF7\"}.mdi-hospital-building:before{content:\"\\F02E1\"}.mdi-hospital-marker:before{content:\"\\F02E2\"}.mdi-hot-tub:before{content:\"\\F0828\"}.mdi-hours-24:before{content:\"\\F1478\"}.mdi-hubspot:before{content:\"\\F0D17\"}.mdi-hulu:before{content:\"\\F0829\"}.mdi-human:before{content:\"\\F02E6\"}.mdi-human-baby-changing-table:before{content:\"\\F138B\"}.mdi-human-cane:before{content:\"\\F1581\"}.mdi-human-capacity-decrease:before{content:\"\\F159B\"}.mdi-human-capacity-increase:before{content:\"\\F159C\"}.mdi-human-child:before{content:\"\\F02E7\"}.mdi-human-edit:before{content:\"\\F14E8\"}.mdi-human-female:before{content:\"\\F0649\"}.mdi-human-female-boy:before{content:\"\\F0A59\"}.mdi-human-female-dance:before{content:\"\\F15C9\"}.mdi-human-female-female:before{content:\"\\F0A5A\"}.mdi-human-female-girl:before{content:\"\\F0A5B\"}.mdi-human-greeting:before{content:\"\\F064A\"}.mdi-human-greeting-proximity:before{content:\"\\F159D\"}.mdi-human-handsdown:before{content:\"\\F064B\"}.mdi-human-handsup:before{content:\"\\F064C\"}.mdi-human-male:before{content:\"\\F064D\"}.mdi-human-male-boy:before{content:\"\\F0A5C\"}.mdi-human-male-child:before{content:\"\\F138C\"}.mdi-human-male-female:before{content:\"\\F02E8\"}.mdi-human-male-girl:before{content:\"\\F0A5D\"}.mdi-human-male-height:before{content:\"\\F0EFB\"}.mdi-human-male-height-variant:before{content:\"\\F0EFC\"}.mdi-human-male-male:before{content:\"\\F0A5E\"}.mdi-human-pregnant:before{content:\"\\F05CF\"}.mdi-human-queue:before{content:\"\\F1571\"}.mdi-human-scooter:before{content:\"\\F11E9\"}.mdi-human-wheelchair:before{content:\"\\F138D\"}.mdi-humble-bundle:before{content:\"\\F0744\"}.mdi-hvac:before{content:\"\\F1352\"}.mdi-hvac-off:before{content:\"\\F159E\"}.mdi-hydraulic-oil-level:before{content:\"\\F1324\"}.mdi-hydraulic-oil-temperature:before{content:\"\\F1325\"}.mdi-hydro-power:before{content:\"\\F12E5\"}.mdi-ice-cream:before{content:\"\\F082A\"}.mdi-ice-cream-off:before{content:\"\\F0E52\"}.mdi-ice-pop:before{content:\"\\F0EFD\"}.mdi-id-card:before{content:\"\\F0FC0\"}.mdi-identifier:before{content:\"\\F0EFE\"}.mdi-ideogram-cjk:before{content:\"\\F1331\"}.mdi-ideogram-cjk-variant:before{content:\"\\F1332\"}.mdi-iframe:before{content:\"\\F0C8B\"}.mdi-iframe-array:before{content:\"\\F10F5\"}.mdi-iframe-array-outline:before{content:\"\\F10F6\"}.mdi-iframe-braces:before{content:\"\\F10F7\"}.mdi-iframe-braces-outline:before{content:\"\\F10F8\"}.mdi-iframe-outline:before{content:\"\\F0C8C\"}.mdi-iframe-parentheses:before{content:\"\\F10F9\"}.mdi-iframe-parentheses-outline:before{content:\"\\F10FA\"}.mdi-iframe-variable:before{content:\"\\F10FB\"}.mdi-iframe-variable-outline:before{content:\"\\F10FC\"}.mdi-image:before{content:\"\\F02E9\"}.mdi-image-album:before{content:\"\\F02EA\"}.mdi-image-area:before{content:\"\\F02EB\"}.mdi-image-area-close:before{content:\"\\F02EC\"}.mdi-image-auto-adjust:before{content:\"\\F0FC1\"}.mdi-image-broken:before{content:\"\\F02ED\"}.mdi-image-broken-variant:before{content:\"\\F02EE\"}.mdi-image-edit:before{content:\"\\F11E3\"}.mdi-image-edit-outline:before{content:\"\\F11E4\"}.mdi-image-filter-black-white:before{content:\"\\F02F0\"}.mdi-image-filter-center-focus:before{content:\"\\F02F1\"}.mdi-image-filter-center-focus-strong:before{content:\"\\F0EFF\"}.mdi-image-filter-center-focus-strong-outline:before{content:\"\\F0F00\"}.mdi-image-filter-center-focus-weak:before{content:\"\\F02F2\"}.mdi-image-filter-drama:before{content:\"\\F02F3\"}.mdi-image-filter-frames:before{content:\"\\F02F4\"}.mdi-image-filter-hdr:before{content:\"\\F02F5\"}.mdi-image-filter-none:before{content:\"\\F02F6\"}.mdi-image-filter-tilt-shift:before{content:\"\\F02F7\"}.mdi-image-filter-vintage:before{content:\"\\F02F8\"}.mdi-image-frame:before{content:\"\\F0E49\"}.mdi-image-minus:before{content:\"\\F1419\"}.mdi-image-move:before{content:\"\\F09F8\"}.mdi-image-multiple:before{content:\"\\F02F9\"}.mdi-image-multiple-outline:before{content:\"\\F02EF\"}.mdi-image-off:before{content:\"\\F082B\"}.mdi-image-off-outline:before{content:\"\\F11D1\"}.mdi-image-outline:before{content:\"\\F0976\"}.mdi-image-plus:before{content:\"\\F087C\"}.mdi-image-remove:before{content:\"\\F1418\"}.mdi-image-search:before{content:\"\\F0977\"}.mdi-image-search-outline:before{content:\"\\F0978\"}.mdi-image-size-select-actual:before{content:\"\\F0C8D\"}.mdi-image-size-select-large:before{content:\"\\F0C8E\"}.mdi-image-size-select-small:before{content:\"\\F0C8F\"}.mdi-image-text:before{content:\"\\F160D\"}.mdi-import:before{content:\"\\F02FA\"}.mdi-inbox:before{content:\"\\F0687\"}.mdi-inbox-arrow-down:before{content:\"\\F02FB\"}.mdi-inbox-arrow-down-outline:before{content:\"\\F1270\"}.mdi-inbox-arrow-up:before{content:\"\\F03D1\"}.mdi-inbox-arrow-up-outline:before{content:\"\\F1271\"}.mdi-inbox-full:before{content:\"\\F1272\"}.mdi-inbox-full-outline:before{content:\"\\F1273\"}.mdi-inbox-multiple:before{content:\"\\F08B0\"}.mdi-inbox-multiple-outline:before{content:\"\\F0BA8\"}.mdi-inbox-outline:before{content:\"\\F1274\"}.mdi-inbox-remove:before{content:\"\\F159F\"}.mdi-inbox-remove-outline:before{content:\"\\F15A0\"}.mdi-incognito:before{content:\"\\F05F9\"}.mdi-incognito-circle:before{content:\"\\F1421\"}.mdi-incognito-circle-off:before{content:\"\\F1422\"}.mdi-incognito-off:before{content:\"\\F0075\"}.mdi-infinity:before{content:\"\\F06E4\"}.mdi-information:before{content:\"\\F02FC\"}.mdi-information-outline:before{content:\"\\F02FD\"}.mdi-information-variant:before{content:\"\\F064E\"}.mdi-instagram:before{content:\"\\F02FE\"}.mdi-instrument-triangle:before{content:\"\\F104E\"}.mdi-invert-colors:before{content:\"\\F0301\"}.mdi-invert-colors-off:before{content:\"\\F0E4A\"}.mdi-iobroker:before{content:\"\\F12E8\"}.mdi-ip:before{content:\"\\F0A5F\"}.mdi-ip-network:before{content:\"\\F0A60\"}.mdi-ip-network-outline:before{content:\"\\F0C90\"}.mdi-ipod:before{content:\"\\F0C91\"}.mdi-islam:before{content:\"\\F0979\"}.mdi-island:before{content:\"\\F104F\"}.mdi-iv-bag:before{content:\"\\F10B9\"}.mdi-jabber:before{content:\"\\F0DD5\"}.mdi-jeepney:before{content:\"\\F0302\"}.mdi-jellyfish:before{content:\"\\F0F01\"}.mdi-jellyfish-outline:before{content:\"\\F0F02\"}.mdi-jira:before{content:\"\\F0303\"}.mdi-jquery:before{content:\"\\F087D\"}.mdi-jsfiddle:before{content:\"\\F0304\"}.mdi-judaism:before{content:\"\\F097A\"}.mdi-jump-rope:before{content:\"\\F12FF\"}.mdi-kabaddi:before{content:\"\\F0D87\"}.mdi-kangaroo:before{content:\"\\F1558\"}.mdi-karate:before{content:\"\\F082C\"}.mdi-keg:before{content:\"\\F0305\"}.mdi-kettle:before{content:\"\\F05FA\"}.mdi-kettle-alert:before{content:\"\\F1317\"}.mdi-kettle-alert-outline:before{content:\"\\F1318\"}.mdi-kettle-off:before{content:\"\\F131B\"}.mdi-kettle-off-outline:before{content:\"\\F131C\"}.mdi-kettle-outline:before{content:\"\\F0F56\"}.mdi-kettle-pour-over:before{content:\"\\F173C\"}.mdi-kettle-steam:before{content:\"\\F1319\"}.mdi-kettle-steam-outline:before{content:\"\\F131A\"}.mdi-kettlebell:before{content:\"\\F1300\"}.mdi-key:before{content:\"\\F0306\"}.mdi-key-arrow-right:before{content:\"\\F1312\"}.mdi-key-chain:before{content:\"\\F1574\"}.mdi-key-chain-variant:before{content:\"\\F1575\"}.mdi-key-change:before{content:\"\\F0307\"}.mdi-key-link:before{content:\"\\F119F\"}.mdi-key-minus:before{content:\"\\F0308\"}.mdi-key-outline:before{content:\"\\F0DD6\"}.mdi-key-plus:before{content:\"\\F0309\"}.mdi-key-remove:before{content:\"\\F030A\"}.mdi-key-star:before{content:\"\\F119E\"}.mdi-key-variant:before{content:\"\\F030B\"}.mdi-key-wireless:before{content:\"\\F0FC2\"}.mdi-keyboard:before{content:\"\\F030C\"}.mdi-keyboard-backspace:before{content:\"\\F030D\"}.mdi-keyboard-caps:before{content:\"\\F030E\"}.mdi-keyboard-close:before{content:\"\\F030F\"}.mdi-keyboard-esc:before{content:\"\\F12B7\"}.mdi-keyboard-f1:before{content:\"\\F12AB\"}.mdi-keyboard-f10:before{content:\"\\F12B4\"}.mdi-keyboard-f11:before{content:\"\\F12B5\"}.mdi-keyboard-f12:before{content:\"\\F12B6\"}.mdi-keyboard-f2:before{content:\"\\F12AC\"}.mdi-keyboard-f3:before{content:\"\\F12AD\"}.mdi-keyboard-f4:before{content:\"\\F12AE\"}.mdi-keyboard-f5:before{content:\"\\F12AF\"}.mdi-keyboard-f6:before{content:\"\\F12B0\"}.mdi-keyboard-f7:before{content:\"\\F12B1\"}.mdi-keyboard-f8:before{content:\"\\F12B2\"}.mdi-keyboard-f9:before{content:\"\\F12B3\"}.mdi-keyboard-off:before{content:\"\\F0310\"}.mdi-keyboard-off-outline:before{content:\"\\F0E4B\"}.mdi-keyboard-outline:before{content:\"\\F097B\"}.mdi-keyboard-return:before{content:\"\\F0311\"}.mdi-keyboard-settings:before{content:\"\\F09F9\"}.mdi-keyboard-settings-outline:before{content:\"\\F09FA\"}.mdi-keyboard-space:before{content:\"\\F1050\"}.mdi-keyboard-tab:before{content:\"\\F0312\"}.mdi-keyboard-variant:before{content:\"\\F0313\"}.mdi-khanda:before{content:\"\\F10FD\"}.mdi-kickstarter:before{content:\"\\F0745\"}.mdi-klingon:before{content:\"\\F135B\"}.mdi-knife:before{content:\"\\F09FB\"}.mdi-knife-military:before{content:\"\\F09FC\"}.mdi-koala:before{content:\"\\F173F\"}.mdi-kodi:before{content:\"\\F0314\"}.mdi-kubernetes:before{content:\"\\F10FE\"}.mdi-label:before{content:\"\\F0315\"}.mdi-label-multiple:before{content:\"\\F1375\"}.mdi-label-multiple-outline:before{content:\"\\F1376\"}.mdi-label-off:before{content:\"\\F0ACB\"}.mdi-label-off-outline:before{content:\"\\F0ACC\"}.mdi-label-outline:before{content:\"\\F0316\"}.mdi-label-percent:before{content:\"\\F12EA\"}.mdi-label-percent-outline:before{content:\"\\F12EB\"}.mdi-label-variant:before{content:\"\\F0ACD\"}.mdi-label-variant-outline:before{content:\"\\F0ACE\"}.mdi-ladder:before{content:\"\\F15A2\"}.mdi-ladybug:before{content:\"\\F082D\"}.mdi-lambda:before{content:\"\\F0627\"}.mdi-lamp:before{content:\"\\F06B5\"}.mdi-lamps:before{content:\"\\F1576\"}.mdi-lan:before{content:\"\\F0317\"}.mdi-lan-check:before{content:\"\\F12AA\"}.mdi-lan-connect:before{content:\"\\F0318\"}.mdi-lan-disconnect:before{content:\"\\F0319\"}.mdi-lan-pending:before{content:\"\\F031A\"}.mdi-language-c:before{content:\"\\F0671\"}.mdi-language-cpp:before{content:\"\\F0672\"}.mdi-language-csharp:before{content:\"\\F031B\"}.mdi-language-css3:before{content:\"\\F031C\"}.mdi-language-fortran:before{content:\"\\F121A\"}.mdi-language-go:before{content:\"\\F07D3\"}.mdi-language-haskell:before{content:\"\\F0C92\"}.mdi-language-html5:before{content:\"\\F031D\"}.mdi-language-java:before{content:\"\\F0B37\"}.mdi-language-javascript:before{content:\"\\F031E\"}.mdi-language-kotlin:before{content:\"\\F1219\"}.mdi-language-lua:before{content:\"\\F08B1\"}.mdi-language-markdown:before{content:\"\\F0354\"}.mdi-language-markdown-outline:before{content:\"\\F0F5B\"}.mdi-language-php:before{content:\"\\F031F\"}.mdi-language-python:before{content:\"\\F0320\"}.mdi-language-r:before{content:\"\\F07D4\"}.mdi-language-ruby:before{content:\"\\F0D2D\"}.mdi-language-ruby-on-rails:before{content:\"\\F0ACF\"}.mdi-language-rust:before{content:\"\\F1617\"}.mdi-language-swift:before{content:\"\\F06E5\"}.mdi-language-typescript:before{content:\"\\F06E6\"}.mdi-language-xaml:before{content:\"\\F0673\"}.mdi-laptop:before{content:\"\\F0322\"}.mdi-laptop-chromebook:before{content:\"\\F0323\"}.mdi-laptop-mac:before{content:\"\\F0324\"}.mdi-laptop-off:before{content:\"\\F06E7\"}.mdi-laptop-windows:before{content:\"\\F0325\"}.mdi-laravel:before{content:\"\\F0AD0\"}.mdi-laser-pointer:before{content:\"\\F1484\"}.mdi-lasso:before{content:\"\\F0F03\"}.mdi-lastpass:before{content:\"\\F0446\"}.mdi-latitude:before{content:\"\\F0F57\"}.mdi-launch:before{content:\"\\F0327\"}.mdi-lava-lamp:before{content:\"\\F07D5\"}.mdi-layers:before{content:\"\\F0328\"}.mdi-layers-minus:before{content:\"\\F0E4C\"}.mdi-layers-off:before{content:\"\\F0329\"}.mdi-layers-off-outline:before{content:\"\\F09FD\"}.mdi-layers-outline:before{content:\"\\F09FE\"}.mdi-layers-plus:before{content:\"\\F0E4D\"}.mdi-layers-remove:before{content:\"\\F0E4E\"}.mdi-layers-search:before{content:\"\\F1206\"}.mdi-layers-search-outline:before{content:\"\\F1207\"}.mdi-layers-triple:before{content:\"\\F0F58\"}.mdi-layers-triple-outline:before{content:\"\\F0F59\"}.mdi-lead-pencil:before{content:\"\\F064F\"}.mdi-leaf:before{content:\"\\F032A\"}.mdi-leaf-maple:before{content:\"\\F0C93\"}.mdi-leaf-maple-off:before{content:\"\\F12DA\"}.mdi-leaf-off:before{content:\"\\F12D9\"}.mdi-leak:before{content:\"\\F0DD7\"}.mdi-leak-off:before{content:\"\\F0DD8\"}.mdi-led-off:before{content:\"\\F032B\"}.mdi-led-on:before{content:\"\\F032C\"}.mdi-led-outline:before{content:\"\\F032D\"}.mdi-led-strip:before{content:\"\\F07D6\"}.mdi-led-strip-variant:before{content:\"\\F1051\"}.mdi-led-variant-off:before{content:\"\\F032E\"}.mdi-led-variant-on:before{content:\"\\F032F\"}.mdi-led-variant-outline:before{content:\"\\F0330\"}.mdi-leek:before{content:\"\\F117D\"}.mdi-less-than:before{content:\"\\F097C\"}.mdi-less-than-or-equal:before{content:\"\\F097D\"}.mdi-library:before{content:\"\\F0331\"}.mdi-library-shelves:before{content:\"\\F0BA9\"}.mdi-license:before{content:\"\\F0FC3\"}.mdi-lifebuoy:before{content:\"\\F087E\"}.mdi-light-switch:before{content:\"\\F097E\"}.mdi-lightbulb:before{content:\"\\F0335\"}.mdi-lightbulb-cfl:before{content:\"\\F1208\"}.mdi-lightbulb-cfl-off:before{content:\"\\F1209\"}.mdi-lightbulb-cfl-spiral:before{content:\"\\F1275\"}.mdi-lightbulb-cfl-spiral-off:before{content:\"\\F12C3\"}.mdi-lightbulb-group:before{content:\"\\F1253\"}.mdi-lightbulb-group-off:before{content:\"\\F12CD\"}.mdi-lightbulb-group-off-outline:before{content:\"\\F12CE\"}.mdi-lightbulb-group-outline:before{content:\"\\F1254\"}.mdi-lightbulb-multiple:before{content:\"\\F1255\"}.mdi-lightbulb-multiple-off:before{content:\"\\F12CF\"}.mdi-lightbulb-multiple-off-outline:before{content:\"\\F12D0\"}.mdi-lightbulb-multiple-outline:before{content:\"\\F1256\"}.mdi-lightbulb-off:before{content:\"\\F0E4F\"}.mdi-lightbulb-off-outline:before{content:\"\\F0E50\"}.mdi-lightbulb-on:before{content:\"\\F06E8\"}.mdi-lightbulb-on-outline:before{content:\"\\F06E9\"}.mdi-lightbulb-outline:before{content:\"\\F0336\"}.mdi-lighthouse:before{content:\"\\F09FF\"}.mdi-lighthouse-on:before{content:\"\\F0A00\"}.mdi-lightning-bolt:before{content:\"\\F140B\"}.mdi-lightning-bolt-outline:before{content:\"\\F140C\"}.mdi-lingerie:before{content:\"\\F1476\"}.mdi-link:before{content:\"\\F0337\"}.mdi-link-box:before{content:\"\\F0D1A\"}.mdi-link-box-outline:before{content:\"\\F0D1B\"}.mdi-link-box-variant:before{content:\"\\F0D1C\"}.mdi-link-box-variant-outline:before{content:\"\\F0D1D\"}.mdi-link-lock:before{content:\"\\F10BA\"}.mdi-link-off:before{content:\"\\F0338\"}.mdi-link-plus:before{content:\"\\F0C94\"}.mdi-link-variant:before{content:\"\\F0339\"}.mdi-link-variant-minus:before{content:\"\\F10FF\"}.mdi-link-variant-off:before{content:\"\\F033A\"}.mdi-link-variant-plus:before{content:\"\\F1100\"}.mdi-link-variant-remove:before{content:\"\\F1101\"}.mdi-linkedin:before{content:\"\\F033B\"}.mdi-linux:before{content:\"\\F033D\"}.mdi-linux-mint:before{content:\"\\F08ED\"}.mdi-lipstick:before{content:\"\\F13B5\"}.mdi-list-status:before{content:\"\\F15AB\"}.mdi-litecoin:before{content:\"\\F0A61\"}.mdi-loading:before{content:\"\\F0772\"}.mdi-location-enter:before{content:\"\\F0FC4\"}.mdi-location-exit:before{content:\"\\F0FC5\"}.mdi-lock:before{content:\"\\F033E\"}.mdi-lock-alert:before{content:\"\\F08EE\"}.mdi-lock-alert-outline:before{content:\"\\F15D1\"}.mdi-lock-check:before{content:\"\\F139A\"}.mdi-lock-check-outline:before{content:\"\\F16A8\"}.mdi-lock-clock:before{content:\"\\F097F\"}.mdi-lock-minus:before{content:\"\\F16A9\"}.mdi-lock-minus-outline:before{content:\"\\F16AA\"}.mdi-lock-off:before{content:\"\\F1671\"}.mdi-lock-off-outline:before{content:\"\\F1672\"}.mdi-lock-open:before{content:\"\\F033F\"}.mdi-lock-open-alert:before{content:\"\\F139B\"}.mdi-lock-open-alert-outline:before{content:\"\\F15D2\"}.mdi-lock-open-check:before{content:\"\\F139C\"}.mdi-lock-open-check-outline:before{content:\"\\F16AB\"}.mdi-lock-open-minus:before{content:\"\\F16AC\"}.mdi-lock-open-minus-outline:before{content:\"\\F16AD\"}.mdi-lock-open-outline:before{content:\"\\F0340\"}.mdi-lock-open-plus:before{content:\"\\F16AE\"}.mdi-lock-open-plus-outline:before{content:\"\\F16AF\"}.mdi-lock-open-remove:before{content:\"\\F16B0\"}.mdi-lock-open-remove-outline:before{content:\"\\F16B1\"}.mdi-lock-open-variant:before{content:\"\\F0FC6\"}.mdi-lock-open-variant-outline:before{content:\"\\F0FC7\"}.mdi-lock-outline:before{content:\"\\F0341\"}.mdi-lock-pattern:before{content:\"\\F06EA\"}.mdi-lock-plus:before{content:\"\\F05FB\"}.mdi-lock-plus-outline:before{content:\"\\F16B2\"}.mdi-lock-question:before{content:\"\\F08EF\"}.mdi-lock-remove:before{content:\"\\F16B3\"}.mdi-lock-remove-outline:before{content:\"\\F16B4\"}.mdi-lock-reset:before{content:\"\\F0773\"}.mdi-lock-smart:before{content:\"\\F08B2\"}.mdi-locker:before{content:\"\\F07D7\"}.mdi-locker-multiple:before{content:\"\\F07D8\"}.mdi-login:before{content:\"\\F0342\"}.mdi-login-variant:before{content:\"\\F05FC\"}.mdi-logout:before{content:\"\\F0343\"}.mdi-logout-variant:before{content:\"\\F05FD\"}.mdi-longitude:before{content:\"\\F0F5A\"}.mdi-looks:before{content:\"\\F0344\"}.mdi-lotion:before{content:\"\\F1582\"}.mdi-lotion-outline:before{content:\"\\F1583\"}.mdi-lotion-plus:before{content:\"\\F1584\"}.mdi-lotion-plus-outline:before{content:\"\\F1585\"}.mdi-loupe:before{content:\"\\F0345\"}.mdi-lumx:before{content:\"\\F0346\"}.mdi-lungs:before{content:\"\\F1084\"}.mdi-magnet:before{content:\"\\F0347\"}.mdi-magnet-on:before{content:\"\\F0348\"}.mdi-magnify:before{content:\"\\F0349\"}.mdi-magnify-close:before{content:\"\\F0980\"}.mdi-magnify-minus:before{content:\"\\F034A\"}.mdi-magnify-minus-cursor:before{content:\"\\F0A62\"}.mdi-magnify-minus-outline:before{content:\"\\F06EC\"}.mdi-magnify-plus:before{content:\"\\F034B\"}.mdi-magnify-plus-cursor:before{content:\"\\F0A63\"}.mdi-magnify-plus-outline:before{content:\"\\F06ED\"}.mdi-magnify-remove-cursor:before{content:\"\\F120C\"}.mdi-magnify-remove-outline:before{content:\"\\F120D\"}.mdi-magnify-scan:before{content:\"\\F1276\"}.mdi-mail:before{content:\"\\F0EBB\"}.mdi-mailbox:before{content:\"\\F06EE\"}.mdi-mailbox-open:before{content:\"\\F0D88\"}.mdi-mailbox-open-outline:before{content:\"\\F0D89\"}.mdi-mailbox-open-up:before{content:\"\\F0D8A\"}.mdi-mailbox-open-up-outline:before{content:\"\\F0D8B\"}.mdi-mailbox-outline:before{content:\"\\F0D8C\"}.mdi-mailbox-up:before{content:\"\\F0D8D\"}.mdi-mailbox-up-outline:before{content:\"\\F0D8E\"}.mdi-manjaro:before{content:\"\\F160A\"}.mdi-map:before{content:\"\\F034D\"}.mdi-map-check:before{content:\"\\F0EBC\"}.mdi-map-check-outline:before{content:\"\\F0EBD\"}.mdi-map-clock:before{content:\"\\F0D1E\"}.mdi-map-clock-outline:before{content:\"\\F0D1F\"}.mdi-map-legend:before{content:\"\\F0A01\"}.mdi-map-marker:before{content:\"\\F034E\"}.mdi-map-marker-alert:before{content:\"\\F0F05\"}.mdi-map-marker-alert-outline:before{content:\"\\F0F06\"}.mdi-map-marker-check:before{content:\"\\F0C95\"}.mdi-map-marker-check-outline:before{content:\"\\F12FB\"}.mdi-map-marker-circle:before{content:\"\\F034F\"}.mdi-map-marker-distance:before{content:\"\\F08F0\"}.mdi-map-marker-down:before{content:\"\\F1102\"}.mdi-map-marker-left:before{content:\"\\F12DB\"}.mdi-map-marker-left-outline:before{content:\"\\F12DD\"}.mdi-map-marker-minus:before{content:\"\\F0650\"}.mdi-map-marker-minus-outline:before{content:\"\\F12F9\"}.mdi-map-marker-multiple:before{content:\"\\F0350\"}.mdi-map-marker-multiple-outline:before{content:\"\\F1277\"}.mdi-map-marker-off:before{content:\"\\F0351\"}.mdi-map-marker-off-outline:before{content:\"\\F12FD\"}.mdi-map-marker-outline:before{content:\"\\F07D9\"}.mdi-map-marker-path:before{content:\"\\F0D20\"}.mdi-map-marker-plus:before{content:\"\\F0651\"}.mdi-map-marker-plus-outline:before{content:\"\\F12F8\"}.mdi-map-marker-question:before{content:\"\\F0F07\"}.mdi-map-marker-question-outline:before{content:\"\\F0F08\"}.mdi-map-marker-radius:before{content:\"\\F0352\"}.mdi-map-marker-radius-outline:before{content:\"\\F12FC\"}.mdi-map-marker-remove:before{content:\"\\F0F09\"}.mdi-map-marker-remove-outline:before{content:\"\\F12FA\"}.mdi-map-marker-remove-variant:before{content:\"\\F0F0A\"}.mdi-map-marker-right:before{content:\"\\F12DC\"}.mdi-map-marker-right-outline:before{content:\"\\F12DE\"}.mdi-map-marker-star:before{content:\"\\F1608\"}.mdi-map-marker-star-outline:before{content:\"\\F1609\"}.mdi-map-marker-up:before{content:\"\\F1103\"}.mdi-map-minus:before{content:\"\\F0981\"}.mdi-map-outline:before{content:\"\\F0982\"}.mdi-map-plus:before{content:\"\\F0983\"}.mdi-map-search:before{content:\"\\F0984\"}.mdi-map-search-outline:before{content:\"\\F0985\"}.mdi-mapbox:before{content:\"\\F0BAA\"}.mdi-margin:before{content:\"\\F0353\"}.mdi-marker:before{content:\"\\F0652\"}.mdi-marker-cancel:before{content:\"\\F0DD9\"}.mdi-marker-check:before{content:\"\\F0355\"}.mdi-mastodon:before{content:\"\\F0AD1\"}.mdi-material-design:before{content:\"\\F0986\"}.mdi-material-ui:before{content:\"\\F0357\"}.mdi-math-compass:before{content:\"\\F0358\"}.mdi-math-cos:before{content:\"\\F0C96\"}.mdi-math-integral:before{content:\"\\F0FC8\"}.mdi-math-integral-box:before{content:\"\\F0FC9\"}.mdi-math-log:before{content:\"\\F1085\"}.mdi-math-norm:before{content:\"\\F0FCA\"}.mdi-math-norm-box:before{content:\"\\F0FCB\"}.mdi-math-sin:before{content:\"\\F0C97\"}.mdi-math-tan:before{content:\"\\F0C98\"}.mdi-matrix:before{content:\"\\F0628\"}.mdi-medal:before{content:\"\\F0987\"}.mdi-medal-outline:before{content:\"\\F1326\"}.mdi-medical-bag:before{content:\"\\F06EF\"}.mdi-meditation:before{content:\"\\F117B\"}.mdi-memory:before{content:\"\\F035B\"}.mdi-menu:before{content:\"\\F035C\"}.mdi-menu-down:before{content:\"\\F035D\"}.mdi-menu-down-outline:before{content:\"\\F06B6\"}.mdi-menu-left:before{content:\"\\F035E\"}.mdi-menu-left-outline:before{content:\"\\F0A02\"}.mdi-menu-open:before{content:\"\\F0BAB\"}.mdi-menu-right:before{content:\"\\F035F\"}.mdi-menu-right-outline:before{content:\"\\F0A03\"}.mdi-menu-swap:before{content:\"\\F0A64\"}.mdi-menu-swap-outline:before{content:\"\\F0A65\"}.mdi-menu-up:before{content:\"\\F0360\"}.mdi-menu-up-outline:before{content:\"\\F06B7\"}.mdi-merge:before{content:\"\\F0F5C\"}.mdi-message:before{content:\"\\F0361\"}.mdi-message-alert:before{content:\"\\F0362\"}.mdi-message-alert-outline:before{content:\"\\F0A04\"}.mdi-message-arrow-left:before{content:\"\\F12F2\"}.mdi-message-arrow-left-outline:before{content:\"\\F12F3\"}.mdi-message-arrow-right:before{content:\"\\F12F4\"}.mdi-message-arrow-right-outline:before{content:\"\\F12F5\"}.mdi-message-bookmark:before{content:\"\\F15AC\"}.mdi-message-bookmark-outline:before{content:\"\\F15AD\"}.mdi-message-bulleted:before{content:\"\\F06A2\"}.mdi-message-bulleted-off:before{content:\"\\F06A3\"}.mdi-message-cog:before{content:\"\\F06F1\"}.mdi-message-cog-outline:before{content:\"\\F1172\"}.mdi-message-draw:before{content:\"\\F0363\"}.mdi-message-flash:before{content:\"\\F15A9\"}.mdi-message-flash-outline:before{content:\"\\F15AA\"}.mdi-message-image:before{content:\"\\F0364\"}.mdi-message-image-outline:before{content:\"\\F116C\"}.mdi-message-lock:before{content:\"\\F0FCC\"}.mdi-message-lock-outline:before{content:\"\\F116D\"}.mdi-message-minus:before{content:\"\\F116E\"}.mdi-message-minus-outline:before{content:\"\\F116F\"}.mdi-message-off:before{content:\"\\F164D\"}.mdi-message-off-outline:before{content:\"\\F164E\"}.mdi-message-outline:before{content:\"\\F0365\"}.mdi-message-plus:before{content:\"\\F0653\"}.mdi-message-plus-outline:before{content:\"\\F10BB\"}.mdi-message-processing:before{content:\"\\F0366\"}.mdi-message-processing-outline:before{content:\"\\F1170\"}.mdi-message-question:before{content:\"\\F173A\"}.mdi-message-question-outline:before{content:\"\\F173B\"}.mdi-message-reply:before{content:\"\\F0367\"}.mdi-message-reply-outline:before{content:\"\\F173D\"}.mdi-message-reply-text:before{content:\"\\F0368\"}.mdi-message-reply-text-outline:before{content:\"\\F173E\"}.mdi-message-settings:before{content:\"\\F06F0\"}.mdi-message-settings-outline:before{content:\"\\F1171\"}.mdi-message-text:before{content:\"\\F0369\"}.mdi-message-text-clock:before{content:\"\\F1173\"}.mdi-message-text-clock-outline:before{content:\"\\F1174\"}.mdi-message-text-lock:before{content:\"\\F0FCD\"}.mdi-message-text-lock-outline:before{content:\"\\F1175\"}.mdi-message-text-outline:before{content:\"\\F036A\"}.mdi-message-video:before{content:\"\\F036B\"}.mdi-meteor:before{content:\"\\F0629\"}.mdi-metronome:before{content:\"\\F07DA\"}.mdi-metronome-tick:before{content:\"\\F07DB\"}.mdi-micro-sd:before{content:\"\\F07DC\"}.mdi-microphone:before{content:\"\\F036C\"}.mdi-microphone-minus:before{content:\"\\F08B3\"}.mdi-microphone-off:before{content:\"\\F036D\"}.mdi-microphone-outline:before{content:\"\\F036E\"}.mdi-microphone-plus:before{content:\"\\F08B4\"}.mdi-microphone-settings:before{content:\"\\F036F\"}.mdi-microphone-variant:before{content:\"\\F0370\"}.mdi-microphone-variant-off:before{content:\"\\F0371\"}.mdi-microscope:before{content:\"\\F0654\"}.mdi-microsoft:before{content:\"\\F0372\"}.mdi-microsoft-access:before{content:\"\\F138E\"}.mdi-microsoft-azure:before{content:\"\\F0805\"}.mdi-microsoft-azure-devops:before{content:\"\\F0FD5\"}.mdi-microsoft-bing:before{content:\"\\F00A4\"}.mdi-microsoft-dynamics-365:before{content:\"\\F0988\"}.mdi-microsoft-edge:before{content:\"\\F01E9\"}.mdi-microsoft-edge-legacy:before{content:\"\\F1250\"}.mdi-microsoft-excel:before{content:\"\\F138F\"}.mdi-microsoft-internet-explorer:before{content:\"\\F0300\"}.mdi-microsoft-office:before{content:\"\\F03C6\"}.mdi-microsoft-onedrive:before{content:\"\\F03CA\"}.mdi-microsoft-onenote:before{content:\"\\F0747\"}.mdi-microsoft-outlook:before{content:\"\\F0D22\"}.mdi-microsoft-powerpoint:before{content:\"\\F1390\"}.mdi-microsoft-sharepoint:before{content:\"\\F1391\"}.mdi-microsoft-teams:before{content:\"\\F02BB\"}.mdi-microsoft-visual-studio:before{content:\"\\F0610\"}.mdi-microsoft-visual-studio-code:before{content:\"\\F0A1E\"}.mdi-microsoft-windows:before{content:\"\\F05B3\"}.mdi-microsoft-windows-classic:before{content:\"\\F0A21\"}.mdi-microsoft-word:before{content:\"\\F1392\"}.mdi-microsoft-xbox:before{content:\"\\F05B9\"}.mdi-microsoft-xbox-controller:before{content:\"\\F05BA\"}.mdi-microsoft-xbox-controller-battery-alert:before{content:\"\\F074B\"}.mdi-microsoft-xbox-controller-battery-charging:before{content:\"\\F0A22\"}.mdi-microsoft-xbox-controller-battery-empty:before{content:\"\\F074C\"}.mdi-microsoft-xbox-controller-battery-full:before{content:\"\\F074D\"}.mdi-microsoft-xbox-controller-battery-low:before{content:\"\\F074E\"}.mdi-microsoft-xbox-controller-battery-medium:before{content:\"\\F074F\"}.mdi-microsoft-xbox-controller-battery-unknown:before{content:\"\\F0750\"}.mdi-microsoft-xbox-controller-menu:before{content:\"\\F0E6F\"}.mdi-microsoft-xbox-controller-off:before{content:\"\\F05BB\"}.mdi-microsoft-xbox-controller-view:before{content:\"\\F0E70\"}.mdi-microsoft-yammer:before{content:\"\\F0789\"}.mdi-microwave:before{content:\"\\F0C99\"}.mdi-microwave-off:before{content:\"\\F1423\"}.mdi-middleware:before{content:\"\\F0F5D\"}.mdi-middleware-outline:before{content:\"\\F0F5E\"}.mdi-midi:before{content:\"\\F08F1\"}.mdi-midi-port:before{content:\"\\F08F2\"}.mdi-mine:before{content:\"\\F0DDA\"}.mdi-minecraft:before{content:\"\\F0373\"}.mdi-mini-sd:before{content:\"\\F0A05\"}.mdi-minidisc:before{content:\"\\F0A06\"}.mdi-minus:before{content:\"\\F0374\"}.mdi-minus-box:before{content:\"\\F0375\"}.mdi-minus-box-multiple:before{content:\"\\F1141\"}.mdi-minus-box-multiple-outline:before{content:\"\\F1142\"}.mdi-minus-box-outline:before{content:\"\\F06F2\"}.mdi-minus-circle:before{content:\"\\F0376\"}.mdi-minus-circle-multiple:before{content:\"\\F035A\"}.mdi-minus-circle-multiple-outline:before{content:\"\\F0AD3\"}.mdi-minus-circle-off:before{content:\"\\F1459\"}.mdi-minus-circle-off-outline:before{content:\"\\F145A\"}.mdi-minus-circle-outline:before{content:\"\\F0377\"}.mdi-minus-network:before{content:\"\\F0378\"}.mdi-minus-network-outline:before{content:\"\\F0C9A\"}.mdi-minus-thick:before{content:\"\\F1639\"}.mdi-mirror:before{content:\"\\F11FD\"}.mdi-mixed-martial-arts:before{content:\"\\F0D8F\"}.mdi-mixed-reality:before{content:\"\\F087F\"}.mdi-molecule:before{content:\"\\F0BAC\"}.mdi-molecule-co:before{content:\"\\F12FE\"}.mdi-molecule-co2:before{content:\"\\F07E4\"}.mdi-monitor:before{content:\"\\F0379\"}.mdi-monitor-cellphone:before{content:\"\\F0989\"}.mdi-monitor-cellphone-star:before{content:\"\\F098A\"}.mdi-monitor-clean:before{content:\"\\F1104\"}.mdi-monitor-dashboard:before{content:\"\\F0A07\"}.mdi-monitor-edit:before{content:\"\\F12C6\"}.mdi-monitor-eye:before{content:\"\\F13B4\"}.mdi-monitor-lock:before{content:\"\\F0DDB\"}.mdi-monitor-multiple:before{content:\"\\F037A\"}.mdi-monitor-off:before{content:\"\\F0D90\"}.mdi-monitor-screenshot:before{content:\"\\F0E51\"}.mdi-monitor-share:before{content:\"\\F1483\"}.mdi-monitor-speaker:before{content:\"\\F0F5F\"}.mdi-monitor-speaker-off:before{content:\"\\F0F60\"}.mdi-monitor-star:before{content:\"\\F0DDC\"}.mdi-moon-first-quarter:before{content:\"\\F0F61\"}.mdi-moon-full:before{content:\"\\F0F62\"}.mdi-moon-last-quarter:before{content:\"\\F0F63\"}.mdi-moon-new:before{content:\"\\F0F64\"}.mdi-moon-waning-crescent:before{content:\"\\F0F65\"}.mdi-moon-waning-gibbous:before{content:\"\\F0F66\"}.mdi-moon-waxing-crescent:before{content:\"\\F0F67\"}.mdi-moon-waxing-gibbous:before{content:\"\\F0F68\"}.mdi-moped:before{content:\"\\F1086\"}.mdi-moped-electric:before{content:\"\\F15B7\"}.mdi-moped-electric-outline:before{content:\"\\F15B8\"}.mdi-moped-outline:before{content:\"\\F15B9\"}.mdi-more:before{content:\"\\F037B\"}.mdi-mother-heart:before{content:\"\\F1314\"}.mdi-mother-nurse:before{content:\"\\F0D21\"}.mdi-motion:before{content:\"\\F15B2\"}.mdi-motion-outline:before{content:\"\\F15B3\"}.mdi-motion-pause:before{content:\"\\F1590\"}.mdi-motion-pause-outline:before{content:\"\\F1592\"}.mdi-motion-play:before{content:\"\\F158F\"}.mdi-motion-play-outline:before{content:\"\\F1591\"}.mdi-motion-sensor:before{content:\"\\F0D91\"}.mdi-motion-sensor-off:before{content:\"\\F1435\"}.mdi-motorbike:before{content:\"\\F037C\"}.mdi-motorbike-electric:before{content:\"\\F15BA\"}.mdi-mouse:before{content:\"\\F037D\"}.mdi-mouse-bluetooth:before{content:\"\\F098B\"}.mdi-mouse-move-down:before{content:\"\\F1550\"}.mdi-mouse-move-up:before{content:\"\\F1551\"}.mdi-mouse-move-vertical:before{content:\"\\F1552\"}.mdi-mouse-off:before{content:\"\\F037E\"}.mdi-mouse-variant:before{content:\"\\F037F\"}.mdi-mouse-variant-off:before{content:\"\\F0380\"}.mdi-move-resize:before{content:\"\\F0655\"}.mdi-move-resize-variant:before{content:\"\\F0656\"}.mdi-movie:before{content:\"\\F0381\"}.mdi-movie-check:before{content:\"\\F16F3\"}.mdi-movie-check-outline:before{content:\"\\F16F4\"}.mdi-movie-cog:before{content:\"\\F16F5\"}.mdi-movie-cog-outline:before{content:\"\\F16F6\"}.mdi-movie-edit:before{content:\"\\F1122\"}.mdi-movie-edit-outline:before{content:\"\\F1123\"}.mdi-movie-filter:before{content:\"\\F1124\"}.mdi-movie-filter-outline:before{content:\"\\F1125\"}.mdi-movie-minus:before{content:\"\\F16F7\"}.mdi-movie-minus-outline:before{content:\"\\F16F8\"}.mdi-movie-off:before{content:\"\\F16F9\"}.mdi-movie-off-outline:before{content:\"\\F16FA\"}.mdi-movie-open:before{content:\"\\F0FCE\"}.mdi-movie-open-check:before{content:\"\\F16FB\"}.mdi-movie-open-check-outline:before{content:\"\\F16FC\"}.mdi-movie-open-cog:before{content:\"\\F16FD\"}.mdi-movie-open-cog-outline:before{content:\"\\F16FE\"}.mdi-movie-open-edit:before{content:\"\\F16FF\"}.mdi-movie-open-edit-outline:before{content:\"\\F1700\"}.mdi-movie-open-minus:before{content:\"\\F1701\"}.mdi-movie-open-minus-outline:before{content:\"\\F1702\"}.mdi-movie-open-off:before{content:\"\\F1703\"}.mdi-movie-open-off-outline:before{content:\"\\F1704\"}.mdi-movie-open-outline:before{content:\"\\F0FCF\"}.mdi-movie-open-play:before{content:\"\\F1705\"}.mdi-movie-open-play-outline:before{content:\"\\F1706\"}.mdi-movie-open-plus:before{content:\"\\F1707\"}.mdi-movie-open-plus-outline:before{content:\"\\F1708\"}.mdi-movie-open-remove:before{content:\"\\F1709\"}.mdi-movie-open-remove-outline:before{content:\"\\F170A\"}.mdi-movie-open-settings:before{content:\"\\F170B\"}.mdi-movie-open-settings-outline:before{content:\"\\F170C\"}.mdi-movie-open-star:before{content:\"\\F170D\"}.mdi-movie-open-star-outline:before{content:\"\\F170E\"}.mdi-movie-outline:before{content:\"\\F0DDD\"}.mdi-movie-play:before{content:\"\\F170F\"}.mdi-movie-play-outline:before{content:\"\\F1710\"}.mdi-movie-plus:before{content:\"\\F1711\"}.mdi-movie-plus-outline:before{content:\"\\F1712\"}.mdi-movie-remove:before{content:\"\\F1713\"}.mdi-movie-remove-outline:before{content:\"\\F1714\"}.mdi-movie-roll:before{content:\"\\F07DE\"}.mdi-movie-search:before{content:\"\\F11D2\"}.mdi-movie-search-outline:before{content:\"\\F11D3\"}.mdi-movie-settings:before{content:\"\\F1715\"}.mdi-movie-settings-outline:before{content:\"\\F1716\"}.mdi-movie-star:before{content:\"\\F1717\"}.mdi-movie-star-outline:before{content:\"\\F1718\"}.mdi-mower:before{content:\"\\F166F\"}.mdi-mower-bag:before{content:\"\\F1670\"}.mdi-muffin:before{content:\"\\F098C\"}.mdi-multiplication:before{content:\"\\F0382\"}.mdi-multiplication-box:before{content:\"\\F0383\"}.mdi-mushroom:before{content:\"\\F07DF\"}.mdi-mushroom-off:before{content:\"\\F13FA\"}.mdi-mushroom-off-outline:before{content:\"\\F13FB\"}.mdi-mushroom-outline:before{content:\"\\F07E0\"}.mdi-music:before{content:\"\\F075A\"}.mdi-music-accidental-double-flat:before{content:\"\\F0F69\"}.mdi-music-accidental-double-sharp:before{content:\"\\F0F6A\"}.mdi-music-accidental-flat:before{content:\"\\F0F6B\"}.mdi-music-accidental-natural:before{content:\"\\F0F6C\"}.mdi-music-accidental-sharp:before{content:\"\\F0F6D\"}.mdi-music-box:before{content:\"\\F0384\"}.mdi-music-box-multiple:before{content:\"\\F0333\"}.mdi-music-box-multiple-outline:before{content:\"\\F0F04\"}.mdi-music-box-outline:before{content:\"\\F0385\"}.mdi-music-circle:before{content:\"\\F0386\"}.mdi-music-circle-outline:before{content:\"\\F0AD4\"}.mdi-music-clef-alto:before{content:\"\\F0F6E\"}.mdi-music-clef-bass:before{content:\"\\F0F6F\"}.mdi-music-clef-treble:before{content:\"\\F0F70\"}.mdi-music-note:before{content:\"\\F0387\"}.mdi-music-note-bluetooth:before{content:\"\\F05FE\"}.mdi-music-note-bluetooth-off:before{content:\"\\F05FF\"}.mdi-music-note-eighth:before{content:\"\\F0388\"}.mdi-music-note-eighth-dotted:before{content:\"\\F0F71\"}.mdi-music-note-half:before{content:\"\\F0389\"}.mdi-music-note-half-dotted:before{content:\"\\F0F72\"}.mdi-music-note-off:before{content:\"\\F038A\"}.mdi-music-note-off-outline:before{content:\"\\F0F73\"}.mdi-music-note-outline:before{content:\"\\F0F74\"}.mdi-music-note-plus:before{content:\"\\F0DDE\"}.mdi-music-note-quarter:before{content:\"\\F038B\"}.mdi-music-note-quarter-dotted:before{content:\"\\F0F75\"}.mdi-music-note-sixteenth:before{content:\"\\F038C\"}.mdi-music-note-sixteenth-dotted:before{content:\"\\F0F76\"}.mdi-music-note-whole:before{content:\"\\F038D\"}.mdi-music-note-whole-dotted:before{content:\"\\F0F77\"}.mdi-music-off:before{content:\"\\F075B\"}.mdi-music-rest-eighth:before{content:\"\\F0F78\"}.mdi-music-rest-half:before{content:\"\\F0F79\"}.mdi-music-rest-quarter:before{content:\"\\F0F7A\"}.mdi-music-rest-sixteenth:before{content:\"\\F0F7B\"}.mdi-music-rest-whole:before{content:\"\\F0F7C\"}.mdi-mustache:before{content:\"\\F15DE\"}.mdi-nail:before{content:\"\\F0DDF\"}.mdi-nas:before{content:\"\\F08F3\"}.mdi-nativescript:before{content:\"\\F0880\"}.mdi-nature:before{content:\"\\F038E\"}.mdi-nature-people:before{content:\"\\F038F\"}.mdi-navigation:before{content:\"\\F0390\"}.mdi-navigation-outline:before{content:\"\\F1607\"}.mdi-near-me:before{content:\"\\F05CD\"}.mdi-necklace:before{content:\"\\F0F0B\"}.mdi-needle:before{content:\"\\F0391\"}.mdi-netflix:before{content:\"\\F0746\"}.mdi-network:before{content:\"\\F06F3\"}.mdi-network-off:before{content:\"\\F0C9B\"}.mdi-network-off-outline:before{content:\"\\F0C9C\"}.mdi-network-outline:before{content:\"\\F0C9D\"}.mdi-network-strength-1:before{content:\"\\F08F4\"}.mdi-network-strength-1-alert:before{content:\"\\F08F5\"}.mdi-network-strength-2:before{content:\"\\F08F6\"}.mdi-network-strength-2-alert:before{content:\"\\F08F7\"}.mdi-network-strength-3:before{content:\"\\F08F8\"}.mdi-network-strength-3-alert:before{content:\"\\F08F9\"}.mdi-network-strength-4:before{content:\"\\F08FA\"}.mdi-network-strength-4-alert:before{content:\"\\F08FB\"}.mdi-network-strength-off:before{content:\"\\F08FC\"}.mdi-network-strength-off-outline:before{content:\"\\F08FD\"}.mdi-network-strength-outline:before{content:\"\\F08FE\"}.mdi-new-box:before{content:\"\\F0394\"}.mdi-newspaper:before{content:\"\\F0395\"}.mdi-newspaper-minus:before{content:\"\\F0F0C\"}.mdi-newspaper-plus:before{content:\"\\F0F0D\"}.mdi-newspaper-variant:before{content:\"\\F1001\"}.mdi-newspaper-variant-multiple:before{content:\"\\F1002\"}.mdi-newspaper-variant-multiple-outline:before{content:\"\\F1003\"}.mdi-newspaper-variant-outline:before{content:\"\\F1004\"}.mdi-nfc:before{content:\"\\F0396\"}.mdi-nfc-search-variant:before{content:\"\\F0E53\"}.mdi-nfc-tap:before{content:\"\\F0397\"}.mdi-nfc-variant:before{content:\"\\F0398\"}.mdi-nfc-variant-off:before{content:\"\\F0E54\"}.mdi-ninja:before{content:\"\\F0774\"}.mdi-nintendo-game-boy:before{content:\"\\F1393\"}.mdi-nintendo-switch:before{content:\"\\F07E1\"}.mdi-nintendo-wii:before{content:\"\\F05AB\"}.mdi-nintendo-wiiu:before{content:\"\\F072D\"}.mdi-nix:before{content:\"\\F1105\"}.mdi-nodejs:before{content:\"\\F0399\"}.mdi-noodles:before{content:\"\\F117E\"}.mdi-not-equal:before{content:\"\\F098D\"}.mdi-not-equal-variant:before{content:\"\\F098E\"}.mdi-note:before{content:\"\\F039A\"}.mdi-note-minus:before{content:\"\\F164F\"}.mdi-note-minus-outline:before{content:\"\\F1650\"}.mdi-note-multiple:before{content:\"\\F06B8\"}.mdi-note-multiple-outline:before{content:\"\\F06B9\"}.mdi-note-outline:before{content:\"\\F039B\"}.mdi-note-plus:before{content:\"\\F039C\"}.mdi-note-plus-outline:before{content:\"\\F039D\"}.mdi-note-remove:before{content:\"\\F1651\"}.mdi-note-remove-outline:before{content:\"\\F1652\"}.mdi-note-search:before{content:\"\\F1653\"}.mdi-note-search-outline:before{content:\"\\F1654\"}.mdi-note-text:before{content:\"\\F039E\"}.mdi-note-text-outline:before{content:\"\\F11D7\"}.mdi-notebook:before{content:\"\\F082E\"}.mdi-notebook-check:before{content:\"\\F14F5\"}.mdi-notebook-check-outline:before{content:\"\\F14F6\"}.mdi-notebook-edit:before{content:\"\\F14E7\"}.mdi-notebook-edit-outline:before{content:\"\\F14E9\"}.mdi-notebook-minus:before{content:\"\\F1610\"}.mdi-notebook-minus-outline:before{content:\"\\F1611\"}.mdi-notebook-multiple:before{content:\"\\F0E55\"}.mdi-notebook-outline:before{content:\"\\F0EBF\"}.mdi-notebook-plus:before{content:\"\\F1612\"}.mdi-notebook-plus-outline:before{content:\"\\F1613\"}.mdi-notebook-remove:before{content:\"\\F1614\"}.mdi-notebook-remove-outline:before{content:\"\\F1615\"}.mdi-notification-clear-all:before{content:\"\\F039F\"}.mdi-npm:before{content:\"\\F06F7\"}.mdi-nuke:before{content:\"\\F06A4\"}.mdi-null:before{content:\"\\F07E2\"}.mdi-numeric:before{content:\"\\F03A0\"}.mdi-numeric-0:before{content:\"\\F0B39\"}.mdi-numeric-0-box:before{content:\"\\F03A1\"}.mdi-numeric-0-box-multiple:before{content:\"\\F0F0E\"}.mdi-numeric-0-box-multiple-outline:before{content:\"\\F03A2\"}.mdi-numeric-0-box-outline:before{content:\"\\F03A3\"}.mdi-numeric-0-circle:before{content:\"\\F0C9E\"}.mdi-numeric-0-circle-outline:before{content:\"\\F0C9F\"}.mdi-numeric-1:before{content:\"\\F0B3A\"}.mdi-numeric-1-box:before{content:\"\\F03A4\"}.mdi-numeric-1-box-multiple:before{content:\"\\F0F0F\"}.mdi-numeric-1-box-multiple-outline:before{content:\"\\F03A5\"}.mdi-numeric-1-box-outline:before{content:\"\\F03A6\"}.mdi-numeric-1-circle:before{content:\"\\F0CA0\"}.mdi-numeric-1-circle-outline:before{content:\"\\F0CA1\"}.mdi-numeric-10:before{content:\"\\F0FE9\"}.mdi-numeric-10-box:before{content:\"\\F0F7D\"}.mdi-numeric-10-box-multiple:before{content:\"\\F0FEA\"}.mdi-numeric-10-box-multiple-outline:before{content:\"\\F0FEB\"}.mdi-numeric-10-box-outline:before{content:\"\\F0F7E\"}.mdi-numeric-10-circle:before{content:\"\\F0FEC\"}.mdi-numeric-10-circle-outline:before{content:\"\\F0FED\"}.mdi-numeric-2:before{content:\"\\F0B3B\"}.mdi-numeric-2-box:before{content:\"\\F03A7\"}.mdi-numeric-2-box-multiple:before{content:\"\\F0F10\"}.mdi-numeric-2-box-multiple-outline:before{content:\"\\F03A8\"}.mdi-numeric-2-box-outline:before{content:\"\\F03A9\"}.mdi-numeric-2-circle:before{content:\"\\F0CA2\"}.mdi-numeric-2-circle-outline:before{content:\"\\F0CA3\"}.mdi-numeric-3:before{content:\"\\F0B3C\"}.mdi-numeric-3-box:before{content:\"\\F03AA\"}.mdi-numeric-3-box-multiple:before{content:\"\\F0F11\"}.mdi-numeric-3-box-multiple-outline:before{content:\"\\F03AB\"}.mdi-numeric-3-box-outline:before{content:\"\\F03AC\"}.mdi-numeric-3-circle:before{content:\"\\F0CA4\"}.mdi-numeric-3-circle-outline:before{content:\"\\F0CA5\"}.mdi-numeric-4:before{content:\"\\F0B3D\"}.mdi-numeric-4-box:before{content:\"\\F03AD\"}.mdi-numeric-4-box-multiple:before{content:\"\\F0F12\"}.mdi-numeric-4-box-multiple-outline:before{content:\"\\F03B2\"}.mdi-numeric-4-box-outline:before{content:\"\\F03AE\"}.mdi-numeric-4-circle:before{content:\"\\F0CA6\"}.mdi-numeric-4-circle-outline:before{content:\"\\F0CA7\"}.mdi-numeric-5:before{content:\"\\F0B3E\"}.mdi-numeric-5-box:before{content:\"\\F03B1\"}.mdi-numeric-5-box-multiple:before{content:\"\\F0F13\"}.mdi-numeric-5-box-multiple-outline:before{content:\"\\F03AF\"}.mdi-numeric-5-box-outline:before{content:\"\\F03B0\"}.mdi-numeric-5-circle:before{content:\"\\F0CA8\"}.mdi-numeric-5-circle-outline:before{content:\"\\F0CA9\"}.mdi-numeric-6:before{content:\"\\F0B3F\"}.mdi-numeric-6-box:before{content:\"\\F03B3\"}.mdi-numeric-6-box-multiple:before{content:\"\\F0F14\"}.mdi-numeric-6-box-multiple-outline:before{content:\"\\F03B4\"}.mdi-numeric-6-box-outline:before{content:\"\\F03B5\"}.mdi-numeric-6-circle:before{content:\"\\F0CAA\"}.mdi-numeric-6-circle-outline:before{content:\"\\F0CAB\"}.mdi-numeric-7:before{content:\"\\F0B40\"}.mdi-numeric-7-box:before{content:\"\\F03B6\"}.mdi-numeric-7-box-multiple:before{content:\"\\F0F15\"}.mdi-numeric-7-box-multiple-outline:before{content:\"\\F03B7\"}.mdi-numeric-7-box-outline:before{content:\"\\F03B8\"}.mdi-numeric-7-circle:before{content:\"\\F0CAC\"}.mdi-numeric-7-circle-outline:before{content:\"\\F0CAD\"}.mdi-numeric-8:before{content:\"\\F0B41\"}.mdi-numeric-8-box:before{content:\"\\F03B9\"}.mdi-numeric-8-box-multiple:before{content:\"\\F0F16\"}.mdi-numeric-8-box-multiple-outline:before{content:\"\\F03BA\"}.mdi-numeric-8-box-outline:before{content:\"\\F03BB\"}.mdi-numeric-8-circle:before{content:\"\\F0CAE\"}.mdi-numeric-8-circle-outline:before{content:\"\\F0CAF\"}.mdi-numeric-9:before{content:\"\\F0B42\"}.mdi-numeric-9-box:before{content:\"\\F03BC\"}.mdi-numeric-9-box-multiple:before{content:\"\\F0F17\"}.mdi-numeric-9-box-multiple-outline:before{content:\"\\F03BD\"}.mdi-numeric-9-box-outline:before{content:\"\\F03BE\"}.mdi-numeric-9-circle:before{content:\"\\F0CB0\"}.mdi-numeric-9-circle-outline:before{content:\"\\F0CB1\"}.mdi-numeric-9-plus:before{content:\"\\F0FEE\"}.mdi-numeric-9-plus-box:before{content:\"\\F03BF\"}.mdi-numeric-9-plus-box-multiple:before{content:\"\\F0F18\"}.mdi-numeric-9-plus-box-multiple-outline:before{content:\"\\F03C0\"}.mdi-numeric-9-plus-box-outline:before{content:\"\\F03C1\"}.mdi-numeric-9-plus-circle:before{content:\"\\F0CB2\"}.mdi-numeric-9-plus-circle-outline:before{content:\"\\F0CB3\"}.mdi-numeric-negative-1:before{content:\"\\F1052\"}.mdi-numeric-positive-1:before{content:\"\\F15CB\"}.mdi-nut:before{content:\"\\F06F8\"}.mdi-nutrition:before{content:\"\\F03C2\"}.mdi-nuxt:before{content:\"\\F1106\"}.mdi-oar:before{content:\"\\F067C\"}.mdi-ocarina:before{content:\"\\F0DE0\"}.mdi-oci:before{content:\"\\F12E9\"}.mdi-ocr:before{content:\"\\F113A\"}.mdi-octagon:before{content:\"\\F03C3\"}.mdi-octagon-outline:before{content:\"\\F03C4\"}.mdi-octagram:before{content:\"\\F06F9\"}.mdi-octagram-outline:before{content:\"\\F0775\"}.mdi-odnoklassniki:before{content:\"\\F03C5\"}.mdi-offer:before{content:\"\\F121B\"}.mdi-office-building:before{content:\"\\F0991\"}.mdi-office-building-marker:before{content:\"\\F1520\"}.mdi-office-building-marker-outline:before{content:\"\\F1521\"}.mdi-office-building-outline:before{content:\"\\F151F\"}.mdi-oil:before{content:\"\\F03C7\"}.mdi-oil-lamp:before{content:\"\\F0F19\"}.mdi-oil-level:before{content:\"\\F1053\"}.mdi-oil-temperature:before{content:\"\\F0FF8\"}.mdi-omega:before{content:\"\\F03C9\"}.mdi-one-up:before{content:\"\\F0BAD\"}.mdi-onepassword:before{content:\"\\F0881\"}.mdi-opacity:before{content:\"\\F05CC\"}.mdi-open-in-app:before{content:\"\\F03CB\"}.mdi-open-in-new:before{content:\"\\F03CC\"}.mdi-open-source-initiative:before{content:\"\\F0BAE\"}.mdi-openid:before{content:\"\\F03CD\"}.mdi-opera:before{content:\"\\F03CE\"}.mdi-orbit:before{content:\"\\F0018\"}.mdi-orbit-variant:before{content:\"\\F15DB\"}.mdi-order-alphabetical-ascending:before{content:\"\\F020D\"}.mdi-order-alphabetical-descending:before{content:\"\\F0D07\"}.mdi-order-bool-ascending:before{content:\"\\F02BE\"}.mdi-order-bool-ascending-variant:before{content:\"\\F098F\"}.mdi-order-bool-descending:before{content:\"\\F1384\"}.mdi-order-bool-descending-variant:before{content:\"\\F0990\"}.mdi-order-numeric-ascending:before{content:\"\\F0545\"}.mdi-order-numeric-descending:before{content:\"\\F0546\"}.mdi-origin:before{content:\"\\F0B43\"}.mdi-ornament:before{content:\"\\F03CF\"}.mdi-ornament-variant:before{content:\"\\F03D0\"}.mdi-outdoor-lamp:before{content:\"\\F1054\"}.mdi-overscan:before{content:\"\\F1005\"}.mdi-owl:before{content:\"\\F03D2\"}.mdi-pac-man:before{content:\"\\F0BAF\"}.mdi-package:before{content:\"\\F03D3\"}.mdi-package-down:before{content:\"\\F03D4\"}.mdi-package-up:before{content:\"\\F03D5\"}.mdi-package-variant:before{content:\"\\F03D6\"}.mdi-package-variant-closed:before{content:\"\\F03D7\"}.mdi-page-first:before{content:\"\\F0600\"}.mdi-page-last:before{content:\"\\F0601\"}.mdi-page-layout-body:before{content:\"\\F06FA\"}.mdi-page-layout-footer:before{content:\"\\F06FB\"}.mdi-page-layout-header:before{content:\"\\F06FC\"}.mdi-page-layout-header-footer:before{content:\"\\F0F7F\"}.mdi-page-layout-sidebar-left:before{content:\"\\F06FD\"}.mdi-page-layout-sidebar-right:before{content:\"\\F06FE\"}.mdi-page-next:before{content:\"\\F0BB0\"}.mdi-page-next-outline:before{content:\"\\F0BB1\"}.mdi-page-previous:before{content:\"\\F0BB2\"}.mdi-page-previous-outline:before{content:\"\\F0BB3\"}.mdi-pail:before{content:\"\\F1417\"}.mdi-pail-minus:before{content:\"\\F1437\"}.mdi-pail-minus-outline:before{content:\"\\F143C\"}.mdi-pail-off:before{content:\"\\F1439\"}.mdi-pail-off-outline:before{content:\"\\F143E\"}.mdi-pail-outline:before{content:\"\\F143A\"}.mdi-pail-plus:before{content:\"\\F1436\"}.mdi-pail-plus-outline:before{content:\"\\F143B\"}.mdi-pail-remove:before{content:\"\\F1438\"}.mdi-pail-remove-outline:before{content:\"\\F143D\"}.mdi-palette:before{content:\"\\F03D8\"}.mdi-palette-advanced:before{content:\"\\F03D9\"}.mdi-palette-outline:before{content:\"\\F0E0C\"}.mdi-palette-swatch:before{content:\"\\F08B5\"}.mdi-palette-swatch-outline:before{content:\"\\F135C\"}.mdi-palm-tree:before{content:\"\\F1055\"}.mdi-pan:before{content:\"\\F0BB4\"}.mdi-pan-bottom-left:before{content:\"\\F0BB5\"}.mdi-pan-bottom-right:before{content:\"\\F0BB6\"}.mdi-pan-down:before{content:\"\\F0BB7\"}.mdi-pan-horizontal:before{content:\"\\F0BB8\"}.mdi-pan-left:before{content:\"\\F0BB9\"}.mdi-pan-right:before{content:\"\\F0BBA\"}.mdi-pan-top-left:before{content:\"\\F0BBB\"}.mdi-pan-top-right:before{content:\"\\F0BBC\"}.mdi-pan-up:before{content:\"\\F0BBD\"}.mdi-pan-vertical:before{content:\"\\F0BBE\"}.mdi-panda:before{content:\"\\F03DA\"}.mdi-pandora:before{content:\"\\F03DB\"}.mdi-panorama:before{content:\"\\F03DC\"}.mdi-panorama-fisheye:before{content:\"\\F03DD\"}.mdi-panorama-horizontal:before{content:\"\\F03DE\"}.mdi-panorama-vertical:before{content:\"\\F03DF\"}.mdi-panorama-wide-angle:before{content:\"\\F03E0\"}.mdi-paper-cut-vertical:before{content:\"\\F03E1\"}.mdi-paper-roll:before{content:\"\\F1157\"}.mdi-paper-roll-outline:before{content:\"\\F1158\"}.mdi-paperclip:before{content:\"\\F03E2\"}.mdi-parachute:before{content:\"\\F0CB4\"}.mdi-parachute-outline:before{content:\"\\F0CB5\"}.mdi-parking:before{content:\"\\F03E3\"}.mdi-party-popper:before{content:\"\\F1056\"}.mdi-passport:before{content:\"\\F07E3\"}.mdi-passport-biometric:before{content:\"\\F0DE1\"}.mdi-pasta:before{content:\"\\F1160\"}.mdi-patio-heater:before{content:\"\\F0F80\"}.mdi-patreon:before{content:\"\\F0882\"}.mdi-pause:before{content:\"\\F03E4\"}.mdi-pause-circle:before{content:\"\\F03E5\"}.mdi-pause-circle-outline:before{content:\"\\F03E6\"}.mdi-pause-octagon:before{content:\"\\F03E7\"}.mdi-pause-octagon-outline:before{content:\"\\F03E8\"}.mdi-paw:before{content:\"\\F03E9\"}.mdi-paw-off:before{content:\"\\F0657\"}.mdi-paw-off-outline:before{content:\"\\F1676\"}.mdi-paw-outline:before{content:\"\\F1675\"}.mdi-pdf-box:before{content:\"\\F0E56\"}.mdi-peace:before{content:\"\\F0884\"}.mdi-peanut:before{content:\"\\F0FFC\"}.mdi-peanut-off:before{content:\"\\F0FFD\"}.mdi-peanut-off-outline:before{content:\"\\F0FFF\"}.mdi-peanut-outline:before{content:\"\\F0FFE\"}.mdi-pen:before{content:\"\\F03EA\"}.mdi-pen-lock:before{content:\"\\F0DE2\"}.mdi-pen-minus:before{content:\"\\F0DE3\"}.mdi-pen-off:before{content:\"\\F0DE4\"}.mdi-pen-plus:before{content:\"\\F0DE5\"}.mdi-pen-remove:before{content:\"\\F0DE6\"}.mdi-pencil:before{content:\"\\F03EB\"}.mdi-pencil-box:before{content:\"\\F03EC\"}.mdi-pencil-box-multiple:before{content:\"\\F1144\"}.mdi-pencil-box-multiple-outline:before{content:\"\\F1145\"}.mdi-pencil-box-outline:before{content:\"\\F03ED\"}.mdi-pencil-circle:before{content:\"\\F06FF\"}.mdi-pencil-circle-outline:before{content:\"\\F0776\"}.mdi-pencil-lock:before{content:\"\\F03EE\"}.mdi-pencil-lock-outline:before{content:\"\\F0DE7\"}.mdi-pencil-minus:before{content:\"\\F0DE8\"}.mdi-pencil-minus-outline:before{content:\"\\F0DE9\"}.mdi-pencil-off:before{content:\"\\F03EF\"}.mdi-pencil-off-outline:before{content:\"\\F0DEA\"}.mdi-pencil-outline:before{content:\"\\F0CB6\"}.mdi-pencil-plus:before{content:\"\\F0DEB\"}.mdi-pencil-plus-outline:before{content:\"\\F0DEC\"}.mdi-pencil-remove:before{content:\"\\F0DED\"}.mdi-pencil-remove-outline:before{content:\"\\F0DEE\"}.mdi-pencil-ruler:before{content:\"\\F1353\"}.mdi-penguin:before{content:\"\\F0EC0\"}.mdi-pentagon:before{content:\"\\F0701\"}.mdi-pentagon-outline:before{content:\"\\F0700\"}.mdi-pentagram:before{content:\"\\F1667\"}.mdi-percent:before{content:\"\\F03F0\"}.mdi-percent-outline:before{content:\"\\F1278\"}.mdi-periodic-table:before{content:\"\\F08B6\"}.mdi-perspective-less:before{content:\"\\F0D23\"}.mdi-perspective-more:before{content:\"\\F0D24\"}.mdi-pharmacy:before{content:\"\\F03F1\"}.mdi-phone:before{content:\"\\F03F2\"}.mdi-phone-alert:before{content:\"\\F0F1A\"}.mdi-phone-alert-outline:before{content:\"\\F118E\"}.mdi-phone-bluetooth:before{content:\"\\F03F3\"}.mdi-phone-bluetooth-outline:before{content:\"\\F118F\"}.mdi-phone-cancel:before{content:\"\\F10BC\"}.mdi-phone-cancel-outline:before{content:\"\\F1190\"}.mdi-phone-check:before{content:\"\\F11A9\"}.mdi-phone-check-outline:before{content:\"\\F11AA\"}.mdi-phone-classic:before{content:\"\\F0602\"}.mdi-phone-classic-off:before{content:\"\\F1279\"}.mdi-phone-dial:before{content:\"\\F1559\"}.mdi-phone-dial-outline:before{content:\"\\F155A\"}.mdi-phone-forward:before{content:\"\\F03F4\"}.mdi-phone-forward-outline:before{content:\"\\F1191\"}.mdi-phone-hangup:before{content:\"\\F03F5\"}.mdi-phone-hangup-outline:before{content:\"\\F1192\"}.mdi-phone-in-talk:before{content:\"\\F03F6\"}.mdi-phone-in-talk-outline:before{content:\"\\F1182\"}.mdi-phone-incoming:before{content:\"\\F03F7\"}.mdi-phone-incoming-outline:before{content:\"\\F1193\"}.mdi-phone-lock:before{content:\"\\F03F8\"}.mdi-phone-lock-outline:before{content:\"\\F1194\"}.mdi-phone-log:before{content:\"\\F03F9\"}.mdi-phone-log-outline:before{content:\"\\F1195\"}.mdi-phone-message:before{content:\"\\F1196\"}.mdi-phone-message-outline:before{content:\"\\F1197\"}.mdi-phone-minus:before{content:\"\\F0658\"}.mdi-phone-minus-outline:before{content:\"\\F1198\"}.mdi-phone-missed:before{content:\"\\F03FA\"}.mdi-phone-missed-outline:before{content:\"\\F11A5\"}.mdi-phone-off:before{content:\"\\F0DEF\"}.mdi-phone-off-outline:before{content:\"\\F11A6\"}.mdi-phone-outgoing:before{content:\"\\F03FB\"}.mdi-phone-outgoing-outline:before{content:\"\\F1199\"}.mdi-phone-outline:before{content:\"\\F0DF0\"}.mdi-phone-paused:before{content:\"\\F03FC\"}.mdi-phone-paused-outline:before{content:\"\\F119A\"}.mdi-phone-plus:before{content:\"\\F0659\"}.mdi-phone-plus-outline:before{content:\"\\F119B\"}.mdi-phone-remove:before{content:\"\\F152F\"}.mdi-phone-remove-outline:before{content:\"\\F1530\"}.mdi-phone-return:before{content:\"\\F082F\"}.mdi-phone-return-outline:before{content:\"\\F119C\"}.mdi-phone-ring:before{content:\"\\F11AB\"}.mdi-phone-ring-outline:before{content:\"\\F11AC\"}.mdi-phone-rotate-landscape:before{content:\"\\F0885\"}.mdi-phone-rotate-portrait:before{content:\"\\F0886\"}.mdi-phone-settings:before{content:\"\\F03FD\"}.mdi-phone-settings-outline:before{content:\"\\F119D\"}.mdi-phone-voip:before{content:\"\\F03FE\"}.mdi-pi:before{content:\"\\F03FF\"}.mdi-pi-box:before{content:\"\\F0400\"}.mdi-pi-hole:before{content:\"\\F0DF1\"}.mdi-piano:before{content:\"\\F067D\"}.mdi-pickaxe:before{content:\"\\F08B7\"}.mdi-picture-in-picture-bottom-right:before{content:\"\\F0E57\"}.mdi-picture-in-picture-bottom-right-outline:before{content:\"\\F0E58\"}.mdi-picture-in-picture-top-right:before{content:\"\\F0E59\"}.mdi-picture-in-picture-top-right-outline:before{content:\"\\F0E5A\"}.mdi-pier:before{content:\"\\F0887\"}.mdi-pier-crane:before{content:\"\\F0888\"}.mdi-pig:before{content:\"\\F0401\"}.mdi-pig-variant:before{content:\"\\F1006\"}.mdi-pig-variant-outline:before{content:\"\\F1678\"}.mdi-piggy-bank:before{content:\"\\F1007\"}.mdi-piggy-bank-outline:before{content:\"\\F1679\"}.mdi-pill:before{content:\"\\F0402\"}.mdi-pillar:before{content:\"\\F0702\"}.mdi-pin:before{content:\"\\F0403\"}.mdi-pin-off:before{content:\"\\F0404\"}.mdi-pin-off-outline:before{content:\"\\F0930\"}.mdi-pin-outline:before{content:\"\\F0931\"}.mdi-pine-tree:before{content:\"\\F0405\"}.mdi-pine-tree-box:before{content:\"\\F0406\"}.mdi-pine-tree-fire:before{content:\"\\F141A\"}.mdi-pinterest:before{content:\"\\F0407\"}.mdi-pinwheel:before{content:\"\\F0AD5\"}.mdi-pinwheel-outline:before{content:\"\\F0AD6\"}.mdi-pipe:before{content:\"\\F07E5\"}.mdi-pipe-disconnected:before{content:\"\\F07E6\"}.mdi-pipe-leak:before{content:\"\\F0889\"}.mdi-pipe-wrench:before{content:\"\\F1354\"}.mdi-pirate:before{content:\"\\F0A08\"}.mdi-pistol:before{content:\"\\F0703\"}.mdi-piston:before{content:\"\\F088A\"}.mdi-pitchfork:before{content:\"\\F1553\"}.mdi-pizza:before{content:\"\\F0409\"}.mdi-play:before{content:\"\\F040A\"}.mdi-play-box:before{content:\"\\F127A\"}.mdi-play-box-multiple:before{content:\"\\F0D19\"}.mdi-play-box-multiple-outline:before{content:\"\\F13E6\"}.mdi-play-box-outline:before{content:\"\\F040B\"}.mdi-play-circle:before{content:\"\\F040C\"}.mdi-play-circle-outline:before{content:\"\\F040D\"}.mdi-play-network:before{content:\"\\F088B\"}.mdi-play-network-outline:before{content:\"\\F0CB7\"}.mdi-play-outline:before{content:\"\\F0F1B\"}.mdi-play-pause:before{content:\"\\F040E\"}.mdi-play-protected-content:before{content:\"\\F040F\"}.mdi-play-speed:before{content:\"\\F08FF\"}.mdi-playlist-check:before{content:\"\\F05C7\"}.mdi-playlist-edit:before{content:\"\\F0900\"}.mdi-playlist-minus:before{content:\"\\F0410\"}.mdi-playlist-music:before{content:\"\\F0CB8\"}.mdi-playlist-music-outline:before{content:\"\\F0CB9\"}.mdi-playlist-play:before{content:\"\\F0411\"}.mdi-playlist-plus:before{content:\"\\F0412\"}.mdi-playlist-remove:before{content:\"\\F0413\"}.mdi-playlist-star:before{content:\"\\F0DF2\"}.mdi-plex:before{content:\"\\F06BA\"}.mdi-plus:before{content:\"\\F0415\"}.mdi-plus-box:before{content:\"\\F0416\"}.mdi-plus-box-multiple:before{content:\"\\F0334\"}.mdi-plus-box-multiple-outline:before{content:\"\\F1143\"}.mdi-plus-box-outline:before{content:\"\\F0704\"}.mdi-plus-circle:before{content:\"\\F0417\"}.mdi-plus-circle-multiple:before{content:\"\\F034C\"}.mdi-plus-circle-multiple-outline:before{content:\"\\F0418\"}.mdi-plus-circle-outline:before{content:\"\\F0419\"}.mdi-plus-minus:before{content:\"\\F0992\"}.mdi-plus-minus-box:before{content:\"\\F0993\"}.mdi-plus-minus-variant:before{content:\"\\F14C9\"}.mdi-plus-network:before{content:\"\\F041A\"}.mdi-plus-network-outline:before{content:\"\\F0CBA\"}.mdi-plus-one:before{content:\"\\F041B\"}.mdi-plus-outline:before{content:\"\\F0705\"}.mdi-plus-thick:before{content:\"\\F11EC\"}.mdi-podcast:before{content:\"\\F0994\"}.mdi-podium:before{content:\"\\F0D25\"}.mdi-podium-bronze:before{content:\"\\F0D26\"}.mdi-podium-gold:before{content:\"\\F0D27\"}.mdi-podium-silver:before{content:\"\\F0D28\"}.mdi-point-of-sale:before{content:\"\\F0D92\"}.mdi-pokeball:before{content:\"\\F041D\"}.mdi-pokemon-go:before{content:\"\\F0A09\"}.mdi-poker-chip:before{content:\"\\F0830\"}.mdi-polaroid:before{content:\"\\F041E\"}.mdi-police-badge:before{content:\"\\F1167\"}.mdi-police-badge-outline:before{content:\"\\F1168\"}.mdi-poll:before{content:\"\\F041F\"}.mdi-poll-box:before{content:\"\\F0420\"}.mdi-poll-box-outline:before{content:\"\\F127B\"}.mdi-polo:before{content:\"\\F14C3\"}.mdi-polymer:before{content:\"\\F0421\"}.mdi-pool:before{content:\"\\F0606\"}.mdi-popcorn:before{content:\"\\F0422\"}.mdi-post:before{content:\"\\F1008\"}.mdi-post-outline:before{content:\"\\F1009\"}.mdi-postage-stamp:before{content:\"\\F0CBB\"}.mdi-pot:before{content:\"\\F02E5\"}.mdi-pot-mix:before{content:\"\\F065B\"}.mdi-pot-mix-outline:before{content:\"\\F0677\"}.mdi-pot-outline:before{content:\"\\F02FF\"}.mdi-pot-steam:before{content:\"\\F065A\"}.mdi-pot-steam-outline:before{content:\"\\F0326\"}.mdi-pound:before{content:\"\\F0423\"}.mdi-pound-box:before{content:\"\\F0424\"}.mdi-pound-box-outline:before{content:\"\\F117F\"}.mdi-power:before{content:\"\\F0425\"}.mdi-power-cycle:before{content:\"\\F0901\"}.mdi-power-off:before{content:\"\\F0902\"}.mdi-power-on:before{content:\"\\F0903\"}.mdi-power-plug:before{content:\"\\F06A5\"}.mdi-power-plug-off:before{content:\"\\F06A6\"}.mdi-power-plug-off-outline:before{content:\"\\F1424\"}.mdi-power-plug-outline:before{content:\"\\F1425\"}.mdi-power-settings:before{content:\"\\F0426\"}.mdi-power-sleep:before{content:\"\\F0904\"}.mdi-power-socket:before{content:\"\\F0427\"}.mdi-power-socket-au:before{content:\"\\F0905\"}.mdi-power-socket-de:before{content:\"\\F1107\"}.mdi-power-socket-eu:before{content:\"\\F07E7\"}.mdi-power-socket-fr:before{content:\"\\F1108\"}.mdi-power-socket-it:before{content:\"\\F14FF\"}.mdi-power-socket-jp:before{content:\"\\F1109\"}.mdi-power-socket-uk:before{content:\"\\F07E8\"}.mdi-power-socket-us:before{content:\"\\F07E9\"}.mdi-power-standby:before{content:\"\\F0906\"}.mdi-powershell:before{content:\"\\F0A0A\"}.mdi-prescription:before{content:\"\\F0706\"}.mdi-presentation:before{content:\"\\F0428\"}.mdi-presentation-play:before{content:\"\\F0429\"}.mdi-pretzel:before{content:\"\\F1562\"}.mdi-printer:before{content:\"\\F042A\"}.mdi-printer-3d:before{content:\"\\F042B\"}.mdi-printer-3d-nozzle:before{content:\"\\F0E5B\"}.mdi-printer-3d-nozzle-alert:before{content:\"\\F11C0\"}.mdi-printer-3d-nozzle-alert-outline:before{content:\"\\F11C1\"}.mdi-printer-3d-nozzle-outline:before{content:\"\\F0E5C\"}.mdi-printer-alert:before{content:\"\\F042C\"}.mdi-printer-check:before{content:\"\\F1146\"}.mdi-printer-eye:before{content:\"\\F1458\"}.mdi-printer-off:before{content:\"\\F0E5D\"}.mdi-printer-pos:before{content:\"\\F1057\"}.mdi-printer-search:before{content:\"\\F1457\"}.mdi-printer-settings:before{content:\"\\F0707\"}.mdi-printer-wireless:before{content:\"\\F0A0B\"}.mdi-priority-high:before{content:\"\\F0603\"}.mdi-priority-low:before{content:\"\\F0604\"}.mdi-professional-hexagon:before{content:\"\\F042D\"}.mdi-progress-alert:before{content:\"\\F0CBC\"}.mdi-progress-check:before{content:\"\\F0995\"}.mdi-progress-clock:before{content:\"\\F0996\"}.mdi-progress-close:before{content:\"\\F110A\"}.mdi-progress-download:before{content:\"\\F0997\"}.mdi-progress-question:before{content:\"\\F1522\"}.mdi-progress-upload:before{content:\"\\F0998\"}.mdi-progress-wrench:before{content:\"\\F0CBD\"}.mdi-projector:before{content:\"\\F042E\"}.mdi-projector-screen:before{content:\"\\F042F\"}.mdi-projector-screen-outline:before{content:\"\\F1724\"}.mdi-propane-tank:before{content:\"\\F1357\"}.mdi-propane-tank-outline:before{content:\"\\F1358\"}.mdi-protocol:before{content:\"\\F0FD8\"}.mdi-publish:before{content:\"\\F06A7\"}.mdi-pulse:before{content:\"\\F0430\"}.mdi-pump:before{content:\"\\F1402\"}.mdi-pumpkin:before{content:\"\\F0BBF\"}.mdi-purse:before{content:\"\\F0F1C\"}.mdi-purse-outline:before{content:\"\\F0F1D\"}.mdi-puzzle:before{content:\"\\F0431\"}.mdi-puzzle-check:before{content:\"\\F1426\"}.mdi-puzzle-check-outline:before{content:\"\\F1427\"}.mdi-puzzle-edit:before{content:\"\\F14D3\"}.mdi-puzzle-edit-outline:before{content:\"\\F14D9\"}.mdi-puzzle-heart:before{content:\"\\F14D4\"}.mdi-puzzle-heart-outline:before{content:\"\\F14DA\"}.mdi-puzzle-minus:before{content:\"\\F14D1\"}.mdi-puzzle-minus-outline:before{content:\"\\F14D7\"}.mdi-puzzle-outline:before{content:\"\\F0A66\"}.mdi-puzzle-plus:before{content:\"\\F14D0\"}.mdi-puzzle-plus-outline:before{content:\"\\F14D6\"}.mdi-puzzle-remove:before{content:\"\\F14D2\"}.mdi-puzzle-remove-outline:before{content:\"\\F14D8\"}.mdi-puzzle-star:before{content:\"\\F14D5\"}.mdi-puzzle-star-outline:before{content:\"\\F14DB\"}.mdi-qi:before{content:\"\\F0999\"}.mdi-qqchat:before{content:\"\\F0605\"}.mdi-qrcode:before{content:\"\\F0432\"}.mdi-qrcode-edit:before{content:\"\\F08B8\"}.mdi-qrcode-minus:before{content:\"\\F118C\"}.mdi-qrcode-plus:before{content:\"\\F118B\"}.mdi-qrcode-remove:before{content:\"\\F118D\"}.mdi-qrcode-scan:before{content:\"\\F0433\"}.mdi-quadcopter:before{content:\"\\F0434\"}.mdi-quality-high:before{content:\"\\F0435\"}.mdi-quality-low:before{content:\"\\F0A0C\"}.mdi-quality-medium:before{content:\"\\F0A0D\"}.mdi-quora:before{content:\"\\F0D29\"}.mdi-rabbit:before{content:\"\\F0907\"}.mdi-racing-helmet:before{content:\"\\F0D93\"}.mdi-racquetball:before{content:\"\\F0D94\"}.mdi-radar:before{content:\"\\F0437\"}.mdi-radiator:before{content:\"\\F0438\"}.mdi-radiator-disabled:before{content:\"\\F0AD7\"}.mdi-radiator-off:before{content:\"\\F0AD8\"}.mdi-radio:before{content:\"\\F0439\"}.mdi-radio-am:before{content:\"\\F0CBE\"}.mdi-radio-fm:before{content:\"\\F0CBF\"}.mdi-radio-handheld:before{content:\"\\F043A\"}.mdi-radio-off:before{content:\"\\F121C\"}.mdi-radio-tower:before{content:\"\\F043B\"}.mdi-radioactive:before{content:\"\\F043C\"}.mdi-radioactive-off:before{content:\"\\F0EC1\"}.mdi-radiobox-blank:before{content:\"\\F043D\"}.mdi-radiobox-marked:before{content:\"\\F043E\"}.mdi-radiology-box:before{content:\"\\F14C5\"}.mdi-radiology-box-outline:before{content:\"\\F14C6\"}.mdi-radius:before{content:\"\\F0CC0\"}.mdi-radius-outline:before{content:\"\\F0CC1\"}.mdi-railroad-light:before{content:\"\\F0F1E\"}.mdi-rake:before{content:\"\\F1544\"}.mdi-raspberry-pi:before{content:\"\\F043F\"}.mdi-ray-end:before{content:\"\\F0440\"}.mdi-ray-end-arrow:before{content:\"\\F0441\"}.mdi-ray-start:before{content:\"\\F0442\"}.mdi-ray-start-arrow:before{content:\"\\F0443\"}.mdi-ray-start-end:before{content:\"\\F0444\"}.mdi-ray-start-vertex-end:before{content:\"\\F15D8\"}.mdi-ray-vertex:before{content:\"\\F0445\"}.mdi-react:before{content:\"\\F0708\"}.mdi-read:before{content:\"\\F0447\"}.mdi-receipt:before{content:\"\\F0449\"}.mdi-record:before{content:\"\\F044A\"}.mdi-record-circle:before{content:\"\\F0EC2\"}.mdi-record-circle-outline:before{content:\"\\F0EC3\"}.mdi-record-player:before{content:\"\\F099A\"}.mdi-record-rec:before{content:\"\\F044B\"}.mdi-rectangle:before{content:\"\\F0E5E\"}.mdi-rectangle-outline:before{content:\"\\F0E5F\"}.mdi-recycle:before{content:\"\\F044C\"}.mdi-recycle-variant:before{content:\"\\F139D\"}.mdi-reddit:before{content:\"\\F044D\"}.mdi-redhat:before{content:\"\\F111B\"}.mdi-redo:before{content:\"\\F044E\"}.mdi-redo-variant:before{content:\"\\F044F\"}.mdi-reflect-horizontal:before{content:\"\\F0A0E\"}.mdi-reflect-vertical:before{content:\"\\F0A0F\"}.mdi-refresh:before{content:\"\\F0450\"}.mdi-refresh-circle:before{content:\"\\F1377\"}.mdi-regex:before{content:\"\\F0451\"}.mdi-registered-trademark:before{content:\"\\F0A67\"}.mdi-reiterate:before{content:\"\\F1588\"}.mdi-relation-many-to-many:before{content:\"\\F1496\"}.mdi-relation-many-to-one:before{content:\"\\F1497\"}.mdi-relation-many-to-one-or-many:before{content:\"\\F1498\"}.mdi-relation-many-to-only-one:before{content:\"\\F1499\"}.mdi-relation-many-to-zero-or-many:before{content:\"\\F149A\"}.mdi-relation-many-to-zero-or-one:before{content:\"\\F149B\"}.mdi-relation-one-or-many-to-many:before{content:\"\\F149C\"}.mdi-relation-one-or-many-to-one:before{content:\"\\F149D\"}.mdi-relation-one-or-many-to-one-or-many:before{content:\"\\F149E\"}.mdi-relation-one-or-many-to-only-one:before{content:\"\\F149F\"}.mdi-relation-one-or-many-to-zero-or-many:before{content:\"\\F14A0\"}.mdi-relation-one-or-many-to-zero-or-one:before{content:\"\\F14A1\"}.mdi-relation-one-to-many:before{content:\"\\F14A2\"}.mdi-relation-one-to-one:before{content:\"\\F14A3\"}.mdi-relation-one-to-one-or-many:before{content:\"\\F14A4\"}.mdi-relation-one-to-only-one:before{content:\"\\F14A5\"}.mdi-relation-one-to-zero-or-many:before{content:\"\\F14A6\"}.mdi-relation-one-to-zero-or-one:before{content:\"\\F14A7\"}.mdi-relation-only-one-to-many:before{content:\"\\F14A8\"}.mdi-relation-only-one-to-one:before{content:\"\\F14A9\"}.mdi-relation-only-one-to-one-or-many:before{content:\"\\F14AA\"}.mdi-relation-only-one-to-only-one:before{content:\"\\F14AB\"}.mdi-relation-only-one-to-zero-or-many:before{content:\"\\F14AC\"}.mdi-relation-only-one-to-zero-or-one:before{content:\"\\F14AD\"}.mdi-relation-zero-or-many-to-many:before{content:\"\\F14AE\"}.mdi-relation-zero-or-many-to-one:before{content:\"\\F14AF\"}.mdi-relation-zero-or-many-to-one-or-many:before{content:\"\\F14B0\"}.mdi-relation-zero-or-many-to-only-one:before{content:\"\\F14B1\"}.mdi-relation-zero-or-many-to-zero-or-many:before{content:\"\\F14B2\"}.mdi-relation-zero-or-many-to-zero-or-one:before{content:\"\\F14B3\"}.mdi-relation-zero-or-one-to-many:before{content:\"\\F14B4\"}.mdi-relation-zero-or-one-to-one:before{content:\"\\F14B5\"}.mdi-relation-zero-or-one-to-one-or-many:before{content:\"\\F14B6\"}.mdi-relation-zero-or-one-to-only-one:before{content:\"\\F14B7\"}.mdi-relation-zero-or-one-to-zero-or-many:before{content:\"\\F14B8\"}.mdi-relation-zero-or-one-to-zero-or-one:before{content:\"\\F14B9\"}.mdi-relative-scale:before{content:\"\\F0452\"}.mdi-reload:before{content:\"\\F0453\"}.mdi-reload-alert:before{content:\"\\F110B\"}.mdi-reminder:before{content:\"\\F088C\"}.mdi-remote:before{content:\"\\F0454\"}.mdi-remote-desktop:before{content:\"\\F08B9\"}.mdi-remote-off:before{content:\"\\F0EC4\"}.mdi-remote-tv:before{content:\"\\F0EC5\"}.mdi-remote-tv-off:before{content:\"\\F0EC6\"}.mdi-rename-box:before{content:\"\\F0455\"}.mdi-reorder-horizontal:before{content:\"\\F0688\"}.mdi-reorder-vertical:before{content:\"\\F0689\"}.mdi-repeat:before{content:\"\\F0456\"}.mdi-repeat-off:before{content:\"\\F0457\"}.mdi-repeat-once:before{content:\"\\F0458\"}.mdi-replay:before{content:\"\\F0459\"}.mdi-reply:before{content:\"\\F045A\"}.mdi-reply-all:before{content:\"\\F045B\"}.mdi-reply-all-outline:before{content:\"\\F0F1F\"}.mdi-reply-circle:before{content:\"\\F11AE\"}.mdi-reply-outline:before{content:\"\\F0F20\"}.mdi-reproduction:before{content:\"\\F045C\"}.mdi-resistor:before{content:\"\\F0B44\"}.mdi-resistor-nodes:before{content:\"\\F0B45\"}.mdi-resize:before{content:\"\\F0A68\"}.mdi-resize-bottom-right:before{content:\"\\F045D\"}.mdi-responsive:before{content:\"\\F045E\"}.mdi-restart:before{content:\"\\F0709\"}.mdi-restart-alert:before{content:\"\\F110C\"}.mdi-restart-off:before{content:\"\\F0D95\"}.mdi-restore:before{content:\"\\F099B\"}.mdi-restore-alert:before{content:\"\\F110D\"}.mdi-rewind:before{content:\"\\F045F\"}.mdi-rewind-10:before{content:\"\\F0D2A\"}.mdi-rewind-30:before{content:\"\\F0D96\"}.mdi-rewind-5:before{content:\"\\F11F9\"}.mdi-rewind-60:before{content:\"\\F160C\"}.mdi-rewind-outline:before{content:\"\\F070A\"}.mdi-rhombus:before{content:\"\\F070B\"}.mdi-rhombus-medium:before{content:\"\\F0A10\"}.mdi-rhombus-medium-outline:before{content:\"\\F14DC\"}.mdi-rhombus-outline:before{content:\"\\F070C\"}.mdi-rhombus-split:before{content:\"\\F0A11\"}.mdi-rhombus-split-outline:before{content:\"\\F14DD\"}.mdi-ribbon:before{content:\"\\F0460\"}.mdi-rice:before{content:\"\\F07EA\"}.mdi-rickshaw:before{content:\"\\F15BB\"}.mdi-rickshaw-electric:before{content:\"\\F15BC\"}.mdi-ring:before{content:\"\\F07EB\"}.mdi-rivet:before{content:\"\\F0E60\"}.mdi-road:before{content:\"\\F0461\"}.mdi-road-variant:before{content:\"\\F0462\"}.mdi-robber:before{content:\"\\F1058\"}.mdi-robot:before{content:\"\\F06A9\"}.mdi-robot-angry:before{content:\"\\F169D\"}.mdi-robot-angry-outline:before{content:\"\\F169E\"}.mdi-robot-confused:before{content:\"\\F169F\"}.mdi-robot-confused-outline:before{content:\"\\F16A0\"}.mdi-robot-dead:before{content:\"\\F16A1\"}.mdi-robot-dead-outline:before{content:\"\\F16A2\"}.mdi-robot-excited:before{content:\"\\F16A3\"}.mdi-robot-excited-outline:before{content:\"\\F16A4\"}.mdi-robot-happy:before{content:\"\\F1719\"}.mdi-robot-happy-outline:before{content:\"\\F171A\"}.mdi-robot-industrial:before{content:\"\\F0B46\"}.mdi-robot-love:before{content:\"\\F16A5\"}.mdi-robot-love-outline:before{content:\"\\F16A6\"}.mdi-robot-mower:before{content:\"\\F11F7\"}.mdi-robot-mower-outline:before{content:\"\\F11F3\"}.mdi-robot-off:before{content:\"\\F16A7\"}.mdi-robot-off-outline:before{content:\"\\F167B\"}.mdi-robot-outline:before{content:\"\\F167A\"}.mdi-robot-vacuum:before{content:\"\\F070D\"}.mdi-robot-vacuum-variant:before{content:\"\\F0908\"}.mdi-rocket:before{content:\"\\F0463\"}.mdi-rocket-launch:before{content:\"\\F14DE\"}.mdi-rocket-launch-outline:before{content:\"\\F14DF\"}.mdi-rocket-outline:before{content:\"\\F13AF\"}.mdi-rodent:before{content:\"\\F1327\"}.mdi-roller-skate:before{content:\"\\F0D2B\"}.mdi-roller-skate-off:before{content:\"\\F0145\"}.mdi-rollerblade:before{content:\"\\F0D2C\"}.mdi-rollerblade-off:before{content:\"\\F002E\"}.mdi-rollupjs:before{content:\"\\F0BC0\"}.mdi-roman-numeral-1:before{content:\"\\F1088\"}.mdi-roman-numeral-10:before{content:\"\\F1091\"}.mdi-roman-numeral-2:before{content:\"\\F1089\"}.mdi-roman-numeral-3:before{content:\"\\F108A\"}.mdi-roman-numeral-4:before{content:\"\\F108B\"}.mdi-roman-numeral-5:before{content:\"\\F108C\"}.mdi-roman-numeral-6:before{content:\"\\F108D\"}.mdi-roman-numeral-7:before{content:\"\\F108E\"}.mdi-roman-numeral-8:before{content:\"\\F108F\"}.mdi-roman-numeral-9:before{content:\"\\F1090\"}.mdi-room-service:before{content:\"\\F088D\"}.mdi-room-service-outline:before{content:\"\\F0D97\"}.mdi-rotate-3d:before{content:\"\\F0EC7\"}.mdi-rotate-3d-variant:before{content:\"\\F0464\"}.mdi-rotate-left:before{content:\"\\F0465\"}.mdi-rotate-left-variant:before{content:\"\\F0466\"}.mdi-rotate-orbit:before{content:\"\\F0D98\"}.mdi-rotate-right:before{content:\"\\F0467\"}.mdi-rotate-right-variant:before{content:\"\\F0468\"}.mdi-rounded-corner:before{content:\"\\F0607\"}.mdi-router:before{content:\"\\F11E2\"}.mdi-router-network:before{content:\"\\F1087\"}.mdi-router-wireless:before{content:\"\\F0469\"}.mdi-router-wireless-off:before{content:\"\\F15A3\"}.mdi-router-wireless-settings:before{content:\"\\F0A69\"}.mdi-routes:before{content:\"\\F046A\"}.mdi-routes-clock:before{content:\"\\F1059\"}.mdi-rowing:before{content:\"\\F0608\"}.mdi-rss:before{content:\"\\F046B\"}.mdi-rss-box:before{content:\"\\F046C\"}.mdi-rss-off:before{content:\"\\F0F21\"}.mdi-rug:before{content:\"\\F1475\"}.mdi-rugby:before{content:\"\\F0D99\"}.mdi-ruler:before{content:\"\\F046D\"}.mdi-ruler-square:before{content:\"\\F0CC2\"}.mdi-ruler-square-compass:before{content:\"\\F0EBE\"}.mdi-run:before{content:\"\\F070E\"}.mdi-run-fast:before{content:\"\\F046E\"}.mdi-rv-truck:before{content:\"\\F11D4\"}.mdi-sack:before{content:\"\\F0D2E\"}.mdi-sack-percent:before{content:\"\\F0D2F\"}.mdi-safe:before{content:\"\\F0A6A\"}.mdi-safe-square:before{content:\"\\F127C\"}.mdi-safe-square-outline:before{content:\"\\F127D\"}.mdi-safety-goggles:before{content:\"\\F0D30\"}.mdi-sail-boat:before{content:\"\\F0EC8\"}.mdi-sale:before{content:\"\\F046F\"}.mdi-salesforce:before{content:\"\\F088E\"}.mdi-sass:before{content:\"\\F07EC\"}.mdi-satellite:before{content:\"\\F0470\"}.mdi-satellite-uplink:before{content:\"\\F0909\"}.mdi-satellite-variant:before{content:\"\\F0471\"}.mdi-sausage:before{content:\"\\F08BA\"}.mdi-saw-blade:before{content:\"\\F0E61\"}.mdi-sawtooth-wave:before{content:\"\\F147A\"}.mdi-saxophone:before{content:\"\\F0609\"}.mdi-scale:before{content:\"\\F0472\"}.mdi-scale-balance:before{content:\"\\F05D1\"}.mdi-scale-bathroom:before{content:\"\\F0473\"}.mdi-scale-off:before{content:\"\\F105A\"}.mdi-scan-helper:before{content:\"\\F13D8\"}.mdi-scanner:before{content:\"\\F06AB\"}.mdi-scanner-off:before{content:\"\\F090A\"}.mdi-scatter-plot:before{content:\"\\F0EC9\"}.mdi-scatter-plot-outline:before{content:\"\\F0ECA\"}.mdi-school:before{content:\"\\F0474\"}.mdi-school-outline:before{content:\"\\F1180\"}.mdi-scissors-cutting:before{content:\"\\F0A6B\"}.mdi-scooter:before{content:\"\\F15BD\"}.mdi-scooter-electric:before{content:\"\\F15BE\"}.mdi-scoreboard:before{content:\"\\F127E\"}.mdi-scoreboard-outline:before{content:\"\\F127F\"}.mdi-screen-rotation:before{content:\"\\F0475\"}.mdi-screen-rotation-lock:before{content:\"\\F0478\"}.mdi-screw-flat-top:before{content:\"\\F0DF3\"}.mdi-screw-lag:before{content:\"\\F0DF4\"}.mdi-screw-machine-flat-top:before{content:\"\\F0DF5\"}.mdi-screw-machine-round-top:before{content:\"\\F0DF6\"}.mdi-screw-round-top:before{content:\"\\F0DF7\"}.mdi-screwdriver:before{content:\"\\F0476\"}.mdi-script:before{content:\"\\F0BC1\"}.mdi-script-outline:before{content:\"\\F0477\"}.mdi-script-text:before{content:\"\\F0BC2\"}.mdi-script-text-key:before{content:\"\\F1725\"}.mdi-script-text-key-outline:before{content:\"\\F1726\"}.mdi-script-text-outline:before{content:\"\\F0BC3\"}.mdi-script-text-play:before{content:\"\\F1727\"}.mdi-script-text-play-outline:before{content:\"\\F1728\"}.mdi-sd:before{content:\"\\F0479\"}.mdi-seal:before{content:\"\\F047A\"}.mdi-seal-variant:before{content:\"\\F0FD9\"}.mdi-search-web:before{content:\"\\F070F\"}.mdi-seat:before{content:\"\\F0CC3\"}.mdi-seat-flat:before{content:\"\\F047B\"}.mdi-seat-flat-angled:before{content:\"\\F047C\"}.mdi-seat-individual-suite:before{content:\"\\F047D\"}.mdi-seat-legroom-extra:before{content:\"\\F047E\"}.mdi-seat-legroom-normal:before{content:\"\\F047F\"}.mdi-seat-legroom-reduced:before{content:\"\\F0480\"}.mdi-seat-outline:before{content:\"\\F0CC4\"}.mdi-seat-passenger:before{content:\"\\F1249\"}.mdi-seat-recline-extra:before{content:\"\\F0481\"}.mdi-seat-recline-normal:before{content:\"\\F0482\"}.mdi-seatbelt:before{content:\"\\F0CC5\"}.mdi-security:before{content:\"\\F0483\"}.mdi-security-network:before{content:\"\\F0484\"}.mdi-seed:before{content:\"\\F0E62\"}.mdi-seed-off:before{content:\"\\F13FD\"}.mdi-seed-off-outline:before{content:\"\\F13FE\"}.mdi-seed-outline:before{content:\"\\F0E63\"}.mdi-seesaw:before{content:\"\\F15A4\"}.mdi-segment:before{content:\"\\F0ECB\"}.mdi-select:before{content:\"\\F0485\"}.mdi-select-all:before{content:\"\\F0486\"}.mdi-select-color:before{content:\"\\F0D31\"}.mdi-select-compare:before{content:\"\\F0AD9\"}.mdi-select-drag:before{content:\"\\F0A6C\"}.mdi-select-group:before{content:\"\\F0F82\"}.mdi-select-inverse:before{content:\"\\F0487\"}.mdi-select-marker:before{content:\"\\F1280\"}.mdi-select-multiple:before{content:\"\\F1281\"}.mdi-select-multiple-marker:before{content:\"\\F1282\"}.mdi-select-off:before{content:\"\\F0488\"}.mdi-select-place:before{content:\"\\F0FDA\"}.mdi-select-search:before{content:\"\\F1204\"}.mdi-selection:before{content:\"\\F0489\"}.mdi-selection-drag:before{content:\"\\F0A6D\"}.mdi-selection-ellipse:before{content:\"\\F0D32\"}.mdi-selection-ellipse-arrow-inside:before{content:\"\\F0F22\"}.mdi-selection-marker:before{content:\"\\F1283\"}.mdi-selection-multiple:before{content:\"\\F1285\"}.mdi-selection-multiple-marker:before{content:\"\\F1284\"}.mdi-selection-off:before{content:\"\\F0777\"}.mdi-selection-search:before{content:\"\\F1205\"}.mdi-semantic-web:before{content:\"\\F1316\"}.mdi-send:before{content:\"\\F048A\"}.mdi-send-check:before{content:\"\\F1161\"}.mdi-send-check-outline:before{content:\"\\F1162\"}.mdi-send-circle:before{content:\"\\F0DF8\"}.mdi-send-circle-outline:before{content:\"\\F0DF9\"}.mdi-send-clock:before{content:\"\\F1163\"}.mdi-send-clock-outline:before{content:\"\\F1164\"}.mdi-send-lock:before{content:\"\\F07ED\"}.mdi-send-lock-outline:before{content:\"\\F1166\"}.mdi-send-outline:before{content:\"\\F1165\"}.mdi-serial-port:before{content:\"\\F065C\"}.mdi-server:before{content:\"\\F048B\"}.mdi-server-minus:before{content:\"\\F048C\"}.mdi-server-network:before{content:\"\\F048D\"}.mdi-server-network-off:before{content:\"\\F048E\"}.mdi-server-off:before{content:\"\\F048F\"}.mdi-server-plus:before{content:\"\\F0490\"}.mdi-server-remove:before{content:\"\\F0491\"}.mdi-server-security:before{content:\"\\F0492\"}.mdi-set-all:before{content:\"\\F0778\"}.mdi-set-center:before{content:\"\\F0779\"}.mdi-set-center-right:before{content:\"\\F077A\"}.mdi-set-left:before{content:\"\\F077B\"}.mdi-set-left-center:before{content:\"\\F077C\"}.mdi-set-left-right:before{content:\"\\F077D\"}.mdi-set-merge:before{content:\"\\F14E0\"}.mdi-set-none:before{content:\"\\F077E\"}.mdi-set-right:before{content:\"\\F077F\"}.mdi-set-split:before{content:\"\\F14E1\"}.mdi-set-square:before{content:\"\\F145D\"}.mdi-set-top-box:before{content:\"\\F099F\"}.mdi-settings-helper:before{content:\"\\F0A6E\"}.mdi-shaker:before{content:\"\\F110E\"}.mdi-shaker-outline:before{content:\"\\F110F\"}.mdi-shape:before{content:\"\\F0831\"}.mdi-shape-circle-plus:before{content:\"\\F065D\"}.mdi-shape-outline:before{content:\"\\F0832\"}.mdi-shape-oval-plus:before{content:\"\\F11FA\"}.mdi-shape-plus:before{content:\"\\F0495\"}.mdi-shape-polygon-plus:before{content:\"\\F065E\"}.mdi-shape-rectangle-plus:before{content:\"\\F065F\"}.mdi-shape-square-plus:before{content:\"\\F0660\"}.mdi-shape-square-rounded-plus:before{content:\"\\F14FA\"}.mdi-share:before{content:\"\\F0496\"}.mdi-share-all:before{content:\"\\F11F4\"}.mdi-share-all-outline:before{content:\"\\F11F5\"}.mdi-share-circle:before{content:\"\\F11AD\"}.mdi-share-off:before{content:\"\\F0F23\"}.mdi-share-off-outline:before{content:\"\\F0F24\"}.mdi-share-outline:before{content:\"\\F0932\"}.mdi-share-variant:before{content:\"\\F0497\"}.mdi-share-variant-outline:before{content:\"\\F1514\"}.mdi-shark-fin:before{content:\"\\F1673\"}.mdi-shark-fin-outline:before{content:\"\\F1674\"}.mdi-sheep:before{content:\"\\F0CC6\"}.mdi-shield:before{content:\"\\F0498\"}.mdi-shield-account:before{content:\"\\F088F\"}.mdi-shield-account-outline:before{content:\"\\F0A12\"}.mdi-shield-account-variant:before{content:\"\\F15A7\"}.mdi-shield-account-variant-outline:before{content:\"\\F15A8\"}.mdi-shield-airplane:before{content:\"\\F06BB\"}.mdi-shield-airplane-outline:before{content:\"\\F0CC7\"}.mdi-shield-alert:before{content:\"\\F0ECC\"}.mdi-shield-alert-outline:before{content:\"\\F0ECD\"}.mdi-shield-bug:before{content:\"\\F13DA\"}.mdi-shield-bug-outline:before{content:\"\\F13DB\"}.mdi-shield-car:before{content:\"\\F0F83\"}.mdi-shield-check:before{content:\"\\F0565\"}.mdi-shield-check-outline:before{content:\"\\F0CC8\"}.mdi-shield-cross:before{content:\"\\F0CC9\"}.mdi-shield-cross-outline:before{content:\"\\F0CCA\"}.mdi-shield-edit:before{content:\"\\F11A0\"}.mdi-shield-edit-outline:before{content:\"\\F11A1\"}.mdi-shield-half:before{content:\"\\F1360\"}.mdi-shield-half-full:before{content:\"\\F0780\"}.mdi-shield-home:before{content:\"\\F068A\"}.mdi-shield-home-outline:before{content:\"\\F0CCB\"}.mdi-shield-key:before{content:\"\\F0BC4\"}.mdi-shield-key-outline:before{content:\"\\F0BC5\"}.mdi-shield-link-variant:before{content:\"\\F0D33\"}.mdi-shield-link-variant-outline:before{content:\"\\F0D34\"}.mdi-shield-lock:before{content:\"\\F099D\"}.mdi-shield-lock-outline:before{content:\"\\F0CCC\"}.mdi-shield-off:before{content:\"\\F099E\"}.mdi-shield-off-outline:before{content:\"\\F099C\"}.mdi-shield-outline:before{content:\"\\F0499\"}.mdi-shield-plus:before{content:\"\\F0ADA\"}.mdi-shield-plus-outline:before{content:\"\\F0ADB\"}.mdi-shield-refresh:before{content:\"\\F00AA\"}.mdi-shield-refresh-outline:before{content:\"\\F01E0\"}.mdi-shield-remove:before{content:\"\\F0ADC\"}.mdi-shield-remove-outline:before{content:\"\\F0ADD\"}.mdi-shield-search:before{content:\"\\F0D9A\"}.mdi-shield-star:before{content:\"\\F113B\"}.mdi-shield-star-outline:before{content:\"\\F113C\"}.mdi-shield-sun:before{content:\"\\F105D\"}.mdi-shield-sun-outline:before{content:\"\\F105E\"}.mdi-shield-sync:before{content:\"\\F11A2\"}.mdi-shield-sync-outline:before{content:\"\\F11A3\"}.mdi-ship-wheel:before{content:\"\\F0833\"}.mdi-shoe-ballet:before{content:\"\\F15CA\"}.mdi-shoe-cleat:before{content:\"\\F15C7\"}.mdi-shoe-formal:before{content:\"\\F0B47\"}.mdi-shoe-heel:before{content:\"\\F0B48\"}.mdi-shoe-print:before{content:\"\\F0DFA\"}.mdi-shoe-sneaker:before{content:\"\\F15C8\"}.mdi-shopping:before{content:\"\\F049A\"}.mdi-shopping-music:before{content:\"\\F049B\"}.mdi-shopping-outline:before{content:\"\\F11D5\"}.mdi-shopping-search:before{content:\"\\F0F84\"}.mdi-shore:before{content:\"\\F14F9\"}.mdi-shovel:before{content:\"\\F0710\"}.mdi-shovel-off:before{content:\"\\F0711\"}.mdi-shower:before{content:\"\\F09A0\"}.mdi-shower-head:before{content:\"\\F09A1\"}.mdi-shredder:before{content:\"\\F049C\"}.mdi-shuffle:before{content:\"\\F049D\"}.mdi-shuffle-disabled:before{content:\"\\F049E\"}.mdi-shuffle-variant:before{content:\"\\F049F\"}.mdi-shuriken:before{content:\"\\F137F\"}.mdi-sigma:before{content:\"\\F04A0\"}.mdi-sigma-lower:before{content:\"\\F062B\"}.mdi-sign-caution:before{content:\"\\F04A1\"}.mdi-sign-direction:before{content:\"\\F0781\"}.mdi-sign-direction-minus:before{content:\"\\F1000\"}.mdi-sign-direction-plus:before{content:\"\\F0FDC\"}.mdi-sign-direction-remove:before{content:\"\\F0FDD\"}.mdi-sign-pole:before{content:\"\\F14F8\"}.mdi-sign-real-estate:before{content:\"\\F1118\"}.mdi-sign-text:before{content:\"\\F0782\"}.mdi-signal:before{content:\"\\F04A2\"}.mdi-signal-2g:before{content:\"\\F0712\"}.mdi-signal-3g:before{content:\"\\F0713\"}.mdi-signal-4g:before{content:\"\\F0714\"}.mdi-signal-5g:before{content:\"\\F0A6F\"}.mdi-signal-cellular-1:before{content:\"\\F08BC\"}.mdi-signal-cellular-2:before{content:\"\\F08BD\"}.mdi-signal-cellular-3:before{content:\"\\F08BE\"}.mdi-signal-cellular-outline:before{content:\"\\F08BF\"}.mdi-signal-distance-variant:before{content:\"\\F0E64\"}.mdi-signal-hspa:before{content:\"\\F0715\"}.mdi-signal-hspa-plus:before{content:\"\\F0716\"}.mdi-signal-off:before{content:\"\\F0783\"}.mdi-signal-variant:before{content:\"\\F060A\"}.mdi-signature:before{content:\"\\F0DFB\"}.mdi-signature-freehand:before{content:\"\\F0DFC\"}.mdi-signature-image:before{content:\"\\F0DFD\"}.mdi-signature-text:before{content:\"\\F0DFE\"}.mdi-silo:before{content:\"\\F0B49\"}.mdi-silverware:before{content:\"\\F04A3\"}.mdi-silverware-clean:before{content:\"\\F0FDE\"}.mdi-silverware-fork:before{content:\"\\F04A4\"}.mdi-silverware-fork-knife:before{content:\"\\F0A70\"}.mdi-silverware-spoon:before{content:\"\\F04A5\"}.mdi-silverware-variant:before{content:\"\\F04A6\"}.mdi-sim:before{content:\"\\F04A7\"}.mdi-sim-alert:before{content:\"\\F04A8\"}.mdi-sim-alert-outline:before{content:\"\\F15D3\"}.mdi-sim-off:before{content:\"\\F04A9\"}.mdi-sim-off-outline:before{content:\"\\F15D4\"}.mdi-sim-outline:before{content:\"\\F15D5\"}.mdi-simple-icons:before{content:\"\\F131D\"}.mdi-sina-weibo:before{content:\"\\F0ADF\"}.mdi-sine-wave:before{content:\"\\F095B\"}.mdi-sitemap:before{content:\"\\F04AA\"}.mdi-size-l:before{content:\"\\F13A6\"}.mdi-size-m:before{content:\"\\F13A5\"}.mdi-size-s:before{content:\"\\F13A4\"}.mdi-size-xl:before{content:\"\\F13A7\"}.mdi-size-xs:before{content:\"\\F13A3\"}.mdi-size-xxl:before{content:\"\\F13A8\"}.mdi-size-xxs:before{content:\"\\F13A2\"}.mdi-size-xxxl:before{content:\"\\F13A9\"}.mdi-skate:before{content:\"\\F0D35\"}.mdi-skateboard:before{content:\"\\F14C2\"}.mdi-skew-less:before{content:\"\\F0D36\"}.mdi-skew-more:before{content:\"\\F0D37\"}.mdi-ski:before{content:\"\\F1304\"}.mdi-ski-cross-country:before{content:\"\\F1305\"}.mdi-ski-water:before{content:\"\\F1306\"}.mdi-skip-backward:before{content:\"\\F04AB\"}.mdi-skip-backward-outline:before{content:\"\\F0F25\"}.mdi-skip-forward:before{content:\"\\F04AC\"}.mdi-skip-forward-outline:before{content:\"\\F0F26\"}.mdi-skip-next:before{content:\"\\F04AD\"}.mdi-skip-next-circle:before{content:\"\\F0661\"}.mdi-skip-next-circle-outline:before{content:\"\\F0662\"}.mdi-skip-next-outline:before{content:\"\\F0F27\"}.mdi-skip-previous:before{content:\"\\F04AE\"}.mdi-skip-previous-circle:before{content:\"\\F0663\"}.mdi-skip-previous-circle-outline:before{content:\"\\F0664\"}.mdi-skip-previous-outline:before{content:\"\\F0F28\"}.mdi-skull:before{content:\"\\F068C\"}.mdi-skull-crossbones:before{content:\"\\F0BC6\"}.mdi-skull-crossbones-outline:before{content:\"\\F0BC7\"}.mdi-skull-outline:before{content:\"\\F0BC8\"}.mdi-skull-scan:before{content:\"\\F14C7\"}.mdi-skull-scan-outline:before{content:\"\\F14C8\"}.mdi-skype:before{content:\"\\F04AF\"}.mdi-skype-business:before{content:\"\\F04B0\"}.mdi-slack:before{content:\"\\F04B1\"}.mdi-slash-forward:before{content:\"\\F0FDF\"}.mdi-slash-forward-box:before{content:\"\\F0FE0\"}.mdi-sleep:before{content:\"\\F04B2\"}.mdi-sleep-off:before{content:\"\\F04B3\"}.mdi-slide:before{content:\"\\F15A5\"}.mdi-slope-downhill:before{content:\"\\F0DFF\"}.mdi-slope-uphill:before{content:\"\\F0E00\"}.mdi-slot-machine:before{content:\"\\F1114\"}.mdi-slot-machine-outline:before{content:\"\\F1115\"}.mdi-smart-card:before{content:\"\\F10BD\"}.mdi-smart-card-outline:before{content:\"\\F10BE\"}.mdi-smart-card-reader:before{content:\"\\F10BF\"}.mdi-smart-card-reader-outline:before{content:\"\\F10C0\"}.mdi-smog:before{content:\"\\F0A71\"}.mdi-smoke-detector:before{content:\"\\F0392\"}.mdi-smoking:before{content:\"\\F04B4\"}.mdi-smoking-off:before{content:\"\\F04B5\"}.mdi-smoking-pipe:before{content:\"\\F140D\"}.mdi-smoking-pipe-off:before{content:\"\\F1428\"}.mdi-snail:before{content:\"\\F1677\"}.mdi-snake:before{content:\"\\F150E\"}.mdi-snapchat:before{content:\"\\F04B6\"}.mdi-snowboard:before{content:\"\\F1307\"}.mdi-snowflake:before{content:\"\\F0717\"}.mdi-snowflake-alert:before{content:\"\\F0F29\"}.mdi-snowflake-melt:before{content:\"\\F12CB\"}.mdi-snowflake-off:before{content:\"\\F14E3\"}.mdi-snowflake-variant:before{content:\"\\F0F2A\"}.mdi-snowman:before{content:\"\\F04B7\"}.mdi-soccer:before{content:\"\\F04B8\"}.mdi-soccer-field:before{content:\"\\F0834\"}.mdi-social-distance-2-meters:before{content:\"\\F1579\"}.mdi-social-distance-6-feet:before{content:\"\\F157A\"}.mdi-sofa:before{content:\"\\F04B9\"}.mdi-sofa-outline:before{content:\"\\F156D\"}.mdi-sofa-single:before{content:\"\\F156E\"}.mdi-sofa-single-outline:before{content:\"\\F156F\"}.mdi-solar-panel:before{content:\"\\F0D9B\"}.mdi-solar-panel-large:before{content:\"\\F0D9C\"}.mdi-solar-power:before{content:\"\\F0A72\"}.mdi-soldering-iron:before{content:\"\\F1092\"}.mdi-solid:before{content:\"\\F068D\"}.mdi-sony-playstation:before{content:\"\\F0414\"}.mdi-sort:before{content:\"\\F04BA\"}.mdi-sort-alphabetical-ascending:before{content:\"\\F05BD\"}.mdi-sort-alphabetical-ascending-variant:before{content:\"\\F1148\"}.mdi-sort-alphabetical-descending:before{content:\"\\F05BF\"}.mdi-sort-alphabetical-descending-variant:before{content:\"\\F1149\"}.mdi-sort-alphabetical-variant:before{content:\"\\F04BB\"}.mdi-sort-ascending:before{content:\"\\F04BC\"}.mdi-sort-bool-ascending:before{content:\"\\F1385\"}.mdi-sort-bool-ascending-variant:before{content:\"\\F1386\"}.mdi-sort-bool-descending:before{content:\"\\F1387\"}.mdi-sort-bool-descending-variant:before{content:\"\\F1388\"}.mdi-sort-calendar-ascending:before{content:\"\\F1547\"}.mdi-sort-calendar-descending:before{content:\"\\F1548\"}.mdi-sort-clock-ascending:before{content:\"\\F1549\"}.mdi-sort-clock-ascending-outline:before{content:\"\\F154A\"}.mdi-sort-clock-descending:before{content:\"\\F154B\"}.mdi-sort-clock-descending-outline:before{content:\"\\F154C\"}.mdi-sort-descending:before{content:\"\\F04BD\"}.mdi-sort-numeric-ascending:before{content:\"\\F1389\"}.mdi-sort-numeric-ascending-variant:before{content:\"\\F090D\"}.mdi-sort-numeric-descending:before{content:\"\\F138A\"}.mdi-sort-numeric-descending-variant:before{content:\"\\F0AD2\"}.mdi-sort-numeric-variant:before{content:\"\\F04BE\"}.mdi-sort-reverse-variant:before{content:\"\\F033C\"}.mdi-sort-variant:before{content:\"\\F04BF\"}.mdi-sort-variant-lock:before{content:\"\\F0CCD\"}.mdi-sort-variant-lock-open:before{content:\"\\F0CCE\"}.mdi-sort-variant-remove:before{content:\"\\F1147\"}.mdi-soundcloud:before{content:\"\\F04C0\"}.mdi-source-branch:before{content:\"\\F062C\"}.mdi-source-branch-check:before{content:\"\\F14CF\"}.mdi-source-branch-minus:before{content:\"\\F14CB\"}.mdi-source-branch-plus:before{content:\"\\F14CA\"}.mdi-source-branch-refresh:before{content:\"\\F14CD\"}.mdi-source-branch-remove:before{content:\"\\F14CC\"}.mdi-source-branch-sync:before{content:\"\\F14CE\"}.mdi-source-commit:before{content:\"\\F0718\"}.mdi-source-commit-end:before{content:\"\\F0719\"}.mdi-source-commit-end-local:before{content:\"\\F071A\"}.mdi-source-commit-local:before{content:\"\\F071B\"}.mdi-source-commit-next-local:before{content:\"\\F071C\"}.mdi-source-commit-start:before{content:\"\\F071D\"}.mdi-source-commit-start-next-local:before{content:\"\\F071E\"}.mdi-source-fork:before{content:\"\\F04C1\"}.mdi-source-merge:before{content:\"\\F062D\"}.mdi-source-pull:before{content:\"\\F04C2\"}.mdi-source-repository:before{content:\"\\F0CCF\"}.mdi-source-repository-multiple:before{content:\"\\F0CD0\"}.mdi-soy-sauce:before{content:\"\\F07EE\"}.mdi-soy-sauce-off:before{content:\"\\F13FC\"}.mdi-spa:before{content:\"\\F0CD1\"}.mdi-spa-outline:before{content:\"\\F0CD2\"}.mdi-space-invaders:before{content:\"\\F0BC9\"}.mdi-space-station:before{content:\"\\F1383\"}.mdi-spade:before{content:\"\\F0E65\"}.mdi-sparkles:before{content:\"\\F1545\"}.mdi-speaker:before{content:\"\\F04C3\"}.mdi-speaker-bluetooth:before{content:\"\\F09A2\"}.mdi-speaker-multiple:before{content:\"\\F0D38\"}.mdi-speaker-off:before{content:\"\\F04C4\"}.mdi-speaker-wireless:before{content:\"\\F071F\"}.mdi-speedometer:before{content:\"\\F04C5\"}.mdi-speedometer-medium:before{content:\"\\F0F85\"}.mdi-speedometer-slow:before{content:\"\\F0F86\"}.mdi-spellcheck:before{content:\"\\F04C6\"}.mdi-spider:before{content:\"\\F11EA\"}.mdi-spider-thread:before{content:\"\\F11EB\"}.mdi-spider-web:before{content:\"\\F0BCA\"}.mdi-spirit-level:before{content:\"\\F14F1\"}.mdi-spoon-sugar:before{content:\"\\F1429\"}.mdi-spotify:before{content:\"\\F04C7\"}.mdi-spotlight:before{content:\"\\F04C8\"}.mdi-spotlight-beam:before{content:\"\\F04C9\"}.mdi-spray:before{content:\"\\F0665\"}.mdi-spray-bottle:before{content:\"\\F0AE0\"}.mdi-sprinkler:before{content:\"\\F105F\"}.mdi-sprinkler-variant:before{content:\"\\F1060\"}.mdi-sprout:before{content:\"\\F0E66\"}.mdi-sprout-outline:before{content:\"\\F0E67\"}.mdi-square:before{content:\"\\F0764\"}.mdi-square-circle:before{content:\"\\F1500\"}.mdi-square-edit-outline:before{content:\"\\F090C\"}.mdi-square-medium:before{content:\"\\F0A13\"}.mdi-square-medium-outline:before{content:\"\\F0A14\"}.mdi-square-off:before{content:\"\\F12EE\"}.mdi-square-off-outline:before{content:\"\\F12EF\"}.mdi-square-outline:before{content:\"\\F0763\"}.mdi-square-root:before{content:\"\\F0784\"}.mdi-square-root-box:before{content:\"\\F09A3\"}.mdi-square-rounded:before{content:\"\\F14FB\"}.mdi-square-rounded-outline:before{content:\"\\F14FC\"}.mdi-square-small:before{content:\"\\F0A15\"}.mdi-square-wave:before{content:\"\\F147B\"}.mdi-squeegee:before{content:\"\\F0AE1\"}.mdi-ssh:before{content:\"\\F08C0\"}.mdi-stack-exchange:before{content:\"\\F060B\"}.mdi-stack-overflow:before{content:\"\\F04CC\"}.mdi-stackpath:before{content:\"\\F0359\"}.mdi-stadium:before{content:\"\\F0FF9\"}.mdi-stadium-variant:before{content:\"\\F0720\"}.mdi-stairs:before{content:\"\\F04CD\"}.mdi-stairs-box:before{content:\"\\F139E\"}.mdi-stairs-down:before{content:\"\\F12BE\"}.mdi-stairs-up:before{content:\"\\F12BD\"}.mdi-stamper:before{content:\"\\F0D39\"}.mdi-standard-definition:before{content:\"\\F07EF\"}.mdi-star:before{content:\"\\F04CE\"}.mdi-star-box:before{content:\"\\F0A73\"}.mdi-star-box-multiple:before{content:\"\\F1286\"}.mdi-star-box-multiple-outline:before{content:\"\\F1287\"}.mdi-star-box-outline:before{content:\"\\F0A74\"}.mdi-star-check:before{content:\"\\F1566\"}.mdi-star-check-outline:before{content:\"\\F156A\"}.mdi-star-circle:before{content:\"\\F04CF\"}.mdi-star-circle-outline:before{content:\"\\F09A4\"}.mdi-star-cog:before{content:\"\\F1668\"}.mdi-star-cog-outline:before{content:\"\\F1669\"}.mdi-star-face:before{content:\"\\F09A5\"}.mdi-star-four-points:before{content:\"\\F0AE2\"}.mdi-star-four-points-outline:before{content:\"\\F0AE3\"}.mdi-star-half:before{content:\"\\F0246\"}.mdi-star-half-full:before{content:\"\\F04D0\"}.mdi-star-minus:before{content:\"\\F1564\"}.mdi-star-minus-outline:before{content:\"\\F1568\"}.mdi-star-off:before{content:\"\\F04D1\"}.mdi-star-off-outline:before{content:\"\\F155B\"}.mdi-star-outline:before{content:\"\\F04D2\"}.mdi-star-plus:before{content:\"\\F1563\"}.mdi-star-plus-outline:before{content:\"\\F1567\"}.mdi-star-remove:before{content:\"\\F1565\"}.mdi-star-remove-outline:before{content:\"\\F1569\"}.mdi-star-settings:before{content:\"\\F166A\"}.mdi-star-settings-outline:before{content:\"\\F166B\"}.mdi-star-shooting:before{content:\"\\F1741\"}.mdi-star-shooting-outline:before{content:\"\\F1742\"}.mdi-star-three-points:before{content:\"\\F0AE4\"}.mdi-star-three-points-outline:before{content:\"\\F0AE5\"}.mdi-state-machine:before{content:\"\\F11EF\"}.mdi-steam:before{content:\"\\F04D3\"}.mdi-steering:before{content:\"\\F04D4\"}.mdi-steering-off:before{content:\"\\F090E\"}.mdi-step-backward:before{content:\"\\F04D5\"}.mdi-step-backward-2:before{content:\"\\F04D6\"}.mdi-step-forward:before{content:\"\\F04D7\"}.mdi-step-forward-2:before{content:\"\\F04D8\"}.mdi-stethoscope:before{content:\"\\F04D9\"}.mdi-sticker:before{content:\"\\F1364\"}.mdi-sticker-alert:before{content:\"\\F1365\"}.mdi-sticker-alert-outline:before{content:\"\\F1366\"}.mdi-sticker-check:before{content:\"\\F1367\"}.mdi-sticker-check-outline:before{content:\"\\F1368\"}.mdi-sticker-circle-outline:before{content:\"\\F05D0\"}.mdi-sticker-emoji:before{content:\"\\F0785\"}.mdi-sticker-minus:before{content:\"\\F1369\"}.mdi-sticker-minus-outline:before{content:\"\\F136A\"}.mdi-sticker-outline:before{content:\"\\F136B\"}.mdi-sticker-plus:before{content:\"\\F136C\"}.mdi-sticker-plus-outline:before{content:\"\\F136D\"}.mdi-sticker-remove:before{content:\"\\F136E\"}.mdi-sticker-remove-outline:before{content:\"\\F136F\"}.mdi-stocking:before{content:\"\\F04DA\"}.mdi-stomach:before{content:\"\\F1093\"}.mdi-stop:before{content:\"\\F04DB\"}.mdi-stop-circle:before{content:\"\\F0666\"}.mdi-stop-circle-outline:before{content:\"\\F0667\"}.mdi-store:before{content:\"\\F04DC\"}.mdi-store-24-hour:before{content:\"\\F04DD\"}.mdi-store-minus:before{content:\"\\F165E\"}.mdi-store-outline:before{content:\"\\F1361\"}.mdi-store-plus:before{content:\"\\F165F\"}.mdi-store-remove:before{content:\"\\F1660\"}.mdi-storefront:before{content:\"\\F07C7\"}.mdi-storefront-outline:before{content:\"\\F10C1\"}.mdi-stove:before{content:\"\\F04DE\"}.mdi-strategy:before{content:\"\\F11D6\"}.mdi-stretch-to-page:before{content:\"\\F0F2B\"}.mdi-stretch-to-page-outline:before{content:\"\\F0F2C\"}.mdi-string-lights:before{content:\"\\F12BA\"}.mdi-string-lights-off:before{content:\"\\F12BB\"}.mdi-subdirectory-arrow-left:before{content:\"\\F060C\"}.mdi-subdirectory-arrow-right:before{content:\"\\F060D\"}.mdi-submarine:before{content:\"\\F156C\"}.mdi-subtitles:before{content:\"\\F0A16\"}.mdi-subtitles-outline:before{content:\"\\F0A17\"}.mdi-subway:before{content:\"\\F06AC\"}.mdi-subway-alert-variant:before{content:\"\\F0D9D\"}.mdi-subway-variant:before{content:\"\\F04DF\"}.mdi-summit:before{content:\"\\F0786\"}.mdi-sunglasses:before{content:\"\\F04E0\"}.mdi-surround-sound:before{content:\"\\F05C5\"}.mdi-surround-sound-2-0:before{content:\"\\F07F0\"}.mdi-surround-sound-2-1:before{content:\"\\F1729\"}.mdi-surround-sound-3-1:before{content:\"\\F07F1\"}.mdi-surround-sound-5-1:before{content:\"\\F07F2\"}.mdi-surround-sound-5-1-2:before{content:\"\\F172A\"}.mdi-surround-sound-7-1:before{content:\"\\F07F3\"}.mdi-svg:before{content:\"\\F0721\"}.mdi-swap-horizontal:before{content:\"\\F04E1\"}.mdi-swap-horizontal-bold:before{content:\"\\F0BCD\"}.mdi-swap-horizontal-circle:before{content:\"\\F0FE1\"}.mdi-swap-horizontal-circle-outline:before{content:\"\\F0FE2\"}.mdi-swap-horizontal-variant:before{content:\"\\F08C1\"}.mdi-swap-vertical:before{content:\"\\F04E2\"}.mdi-swap-vertical-bold:before{content:\"\\F0BCE\"}.mdi-swap-vertical-circle:before{content:\"\\F0FE3\"}.mdi-swap-vertical-circle-outline:before{content:\"\\F0FE4\"}.mdi-swap-vertical-variant:before{content:\"\\F08C2\"}.mdi-swim:before{content:\"\\F04E3\"}.mdi-switch:before{content:\"\\F04E4\"}.mdi-sword:before{content:\"\\F04E5\"}.mdi-sword-cross:before{content:\"\\F0787\"}.mdi-syllabary-hangul:before{content:\"\\F1333\"}.mdi-syllabary-hiragana:before{content:\"\\F1334\"}.mdi-syllabary-katakana:before{content:\"\\F1335\"}.mdi-syllabary-katakana-halfwidth:before{content:\"\\F1336\"}.mdi-symbol:before{content:\"\\F1501\"}.mdi-symfony:before{content:\"\\F0AE6\"}.mdi-sync:before{content:\"\\F04E6\"}.mdi-sync-alert:before{content:\"\\F04E7\"}.mdi-sync-circle:before{content:\"\\F1378\"}.mdi-sync-off:before{content:\"\\F04E8\"}.mdi-tab:before{content:\"\\F04E9\"}.mdi-tab-minus:before{content:\"\\F0B4B\"}.mdi-tab-plus:before{content:\"\\F075C\"}.mdi-tab-remove:before{content:\"\\F0B4C\"}.mdi-tab-unselected:before{content:\"\\F04EA\"}.mdi-table:before{content:\"\\F04EB\"}.mdi-table-account:before{content:\"\\F13B9\"}.mdi-table-alert:before{content:\"\\F13BA\"}.mdi-table-arrow-down:before{content:\"\\F13BB\"}.mdi-table-arrow-left:before{content:\"\\F13BC\"}.mdi-table-arrow-right:before{content:\"\\F13BD\"}.mdi-table-arrow-up:before{content:\"\\F13BE\"}.mdi-table-border:before{content:\"\\F0A18\"}.mdi-table-cancel:before{content:\"\\F13BF\"}.mdi-table-chair:before{content:\"\\F1061\"}.mdi-table-check:before{content:\"\\F13C0\"}.mdi-table-clock:before{content:\"\\F13C1\"}.mdi-table-cog:before{content:\"\\F13C2\"}.mdi-table-column:before{content:\"\\F0835\"}.mdi-table-column-plus-after:before{content:\"\\F04EC\"}.mdi-table-column-plus-before:before{content:\"\\F04ED\"}.mdi-table-column-remove:before{content:\"\\F04EE\"}.mdi-table-column-width:before{content:\"\\F04EF\"}.mdi-table-edit:before{content:\"\\F04F0\"}.mdi-table-eye:before{content:\"\\F1094\"}.mdi-table-eye-off:before{content:\"\\F13C3\"}.mdi-table-furniture:before{content:\"\\F05BC\"}.mdi-table-headers-eye:before{content:\"\\F121D\"}.mdi-table-headers-eye-off:before{content:\"\\F121E\"}.mdi-table-heart:before{content:\"\\F13C4\"}.mdi-table-key:before{content:\"\\F13C5\"}.mdi-table-large:before{content:\"\\F04F1\"}.mdi-table-large-plus:before{content:\"\\F0F87\"}.mdi-table-large-remove:before{content:\"\\F0F88\"}.mdi-table-lock:before{content:\"\\F13C6\"}.mdi-table-merge-cells:before{content:\"\\F09A6\"}.mdi-table-minus:before{content:\"\\F13C7\"}.mdi-table-multiple:before{content:\"\\F13C8\"}.mdi-table-network:before{content:\"\\F13C9\"}.mdi-table-of-contents:before{content:\"\\F0836\"}.mdi-table-off:before{content:\"\\F13CA\"}.mdi-table-picnic:before{content:\"\\F1743\"}.mdi-table-plus:before{content:\"\\F0A75\"}.mdi-table-refresh:before{content:\"\\F13A0\"}.mdi-table-remove:before{content:\"\\F0A76\"}.mdi-table-row:before{content:\"\\F0837\"}.mdi-table-row-height:before{content:\"\\F04F2\"}.mdi-table-row-plus-after:before{content:\"\\F04F3\"}.mdi-table-row-plus-before:before{content:\"\\F04F4\"}.mdi-table-row-remove:before{content:\"\\F04F5\"}.mdi-table-search:before{content:\"\\F090F\"}.mdi-table-settings:before{content:\"\\F0838\"}.mdi-table-split-cell:before{content:\"\\F142A\"}.mdi-table-star:before{content:\"\\F13CB\"}.mdi-table-sync:before{content:\"\\F13A1\"}.mdi-table-tennis:before{content:\"\\F0E68\"}.mdi-tablet:before{content:\"\\F04F6\"}.mdi-tablet-android:before{content:\"\\F04F7\"}.mdi-tablet-cellphone:before{content:\"\\F09A7\"}.mdi-tablet-dashboard:before{content:\"\\F0ECE\"}.mdi-tablet-ipad:before{content:\"\\F04F8\"}.mdi-taco:before{content:\"\\F0762\"}.mdi-tag:before{content:\"\\F04F9\"}.mdi-tag-arrow-down:before{content:\"\\F172B\"}.mdi-tag-arrow-down-outline:before{content:\"\\F172C\"}.mdi-tag-arrow-left:before{content:\"\\F172D\"}.mdi-tag-arrow-left-outline:before{content:\"\\F172E\"}.mdi-tag-arrow-right:before{content:\"\\F172F\"}.mdi-tag-arrow-right-outline:before{content:\"\\F1730\"}.mdi-tag-arrow-up:before{content:\"\\F1731\"}.mdi-tag-arrow-up-outline:before{content:\"\\F1732\"}.mdi-tag-faces:before{content:\"\\F04FA\"}.mdi-tag-heart:before{content:\"\\F068B\"}.mdi-tag-heart-outline:before{content:\"\\F0BCF\"}.mdi-tag-minus:before{content:\"\\F0910\"}.mdi-tag-minus-outline:before{content:\"\\F121F\"}.mdi-tag-multiple:before{content:\"\\F04FB\"}.mdi-tag-multiple-outline:before{content:\"\\F12F7\"}.mdi-tag-off:before{content:\"\\F1220\"}.mdi-tag-off-outline:before{content:\"\\F1221\"}.mdi-tag-outline:before{content:\"\\F04FC\"}.mdi-tag-plus:before{content:\"\\F0722\"}.mdi-tag-plus-outline:before{content:\"\\F1222\"}.mdi-tag-remove:before{content:\"\\F0723\"}.mdi-tag-remove-outline:before{content:\"\\F1223\"}.mdi-tag-text:before{content:\"\\F1224\"}.mdi-tag-text-outline:before{content:\"\\F04FD\"}.mdi-tailwind:before{content:\"\\F13FF\"}.mdi-tank:before{content:\"\\F0D3A\"}.mdi-tanker-truck:before{content:\"\\F0FE5\"}.mdi-tape-drive:before{content:\"\\F16DF\"}.mdi-tape-measure:before{content:\"\\F0B4D\"}.mdi-target:before{content:\"\\F04FE\"}.mdi-target-account:before{content:\"\\F0BD0\"}.mdi-target-variant:before{content:\"\\F0A77\"}.mdi-taxi:before{content:\"\\F04FF\"}.mdi-tea:before{content:\"\\F0D9E\"}.mdi-tea-outline:before{content:\"\\F0D9F\"}.mdi-teach:before{content:\"\\F0890\"}.mdi-teamviewer:before{content:\"\\F0500\"}.mdi-telegram:before{content:\"\\F0501\"}.mdi-telescope:before{content:\"\\F0B4E\"}.mdi-television:before{content:\"\\F0502\"}.mdi-television-ambient-light:before{content:\"\\F1356\"}.mdi-television-box:before{content:\"\\F0839\"}.mdi-television-classic:before{content:\"\\F07F4\"}.mdi-television-classic-off:before{content:\"\\F083A\"}.mdi-television-clean:before{content:\"\\F1110\"}.mdi-television-guide:before{content:\"\\F0503\"}.mdi-television-off:before{content:\"\\F083B\"}.mdi-television-pause:before{content:\"\\F0F89\"}.mdi-television-play:before{content:\"\\F0ECF\"}.mdi-television-stop:before{content:\"\\F0F8A\"}.mdi-temperature-celsius:before{content:\"\\F0504\"}.mdi-temperature-fahrenheit:before{content:\"\\F0505\"}.mdi-temperature-kelvin:before{content:\"\\F0506\"}.mdi-tennis:before{content:\"\\F0DA0\"}.mdi-tennis-ball:before{content:\"\\F0507\"}.mdi-tent:before{content:\"\\F0508\"}.mdi-terraform:before{content:\"\\F1062\"}.mdi-terrain:before{content:\"\\F0509\"}.mdi-test-tube:before{content:\"\\F0668\"}.mdi-test-tube-empty:before{content:\"\\F0911\"}.mdi-test-tube-off:before{content:\"\\F0912\"}.mdi-text:before{content:\"\\F09A8\"}.mdi-text-account:before{content:\"\\F1570\"}.mdi-text-box:before{content:\"\\F021A\"}.mdi-text-box-check:before{content:\"\\F0EA6\"}.mdi-text-box-check-outline:before{content:\"\\F0EA7\"}.mdi-text-box-minus:before{content:\"\\F0EA8\"}.mdi-text-box-minus-outline:before{content:\"\\F0EA9\"}.mdi-text-box-multiple:before{content:\"\\F0AB7\"}.mdi-text-box-multiple-outline:before{content:\"\\F0AB8\"}.mdi-text-box-outline:before{content:\"\\F09ED\"}.mdi-text-box-plus:before{content:\"\\F0EAA\"}.mdi-text-box-plus-outline:before{content:\"\\F0EAB\"}.mdi-text-box-remove:before{content:\"\\F0EAC\"}.mdi-text-box-remove-outline:before{content:\"\\F0EAD\"}.mdi-text-box-search:before{content:\"\\F0EAE\"}.mdi-text-box-search-outline:before{content:\"\\F0EAF\"}.mdi-text-recognition:before{content:\"\\F113D\"}.mdi-text-search:before{content:\"\\F13B8\"}.mdi-text-shadow:before{content:\"\\F0669\"}.mdi-text-short:before{content:\"\\F09A9\"}.mdi-text-subject:before{content:\"\\F09AA\"}.mdi-text-to-speech:before{content:\"\\F050A\"}.mdi-text-to-speech-off:before{content:\"\\F050B\"}.mdi-texture:before{content:\"\\F050C\"}.mdi-texture-box:before{content:\"\\F0FE6\"}.mdi-theater:before{content:\"\\F050D\"}.mdi-theme-light-dark:before{content:\"\\F050E\"}.mdi-thermometer:before{content:\"\\F050F\"}.mdi-thermometer-alert:before{content:\"\\F0E01\"}.mdi-thermometer-chevron-down:before{content:\"\\F0E02\"}.mdi-thermometer-chevron-up:before{content:\"\\F0E03\"}.mdi-thermometer-high:before{content:\"\\F10C2\"}.mdi-thermometer-lines:before{content:\"\\F0510\"}.mdi-thermometer-low:before{content:\"\\F10C3\"}.mdi-thermometer-minus:before{content:\"\\F0E04\"}.mdi-thermometer-off:before{content:\"\\F1531\"}.mdi-thermometer-plus:before{content:\"\\F0E05\"}.mdi-thermostat:before{content:\"\\F0393\"}.mdi-thermostat-box:before{content:\"\\F0891\"}.mdi-thought-bubble:before{content:\"\\F07F6\"}.mdi-thought-bubble-outline:before{content:\"\\F07F7\"}.mdi-thumb-down:before{content:\"\\F0511\"}.mdi-thumb-down-outline:before{content:\"\\F0512\"}.mdi-thumb-up:before{content:\"\\F0513\"}.mdi-thumb-up-outline:before{content:\"\\F0514\"}.mdi-thumbs-up-down:before{content:\"\\F0515\"}.mdi-ticket:before{content:\"\\F0516\"}.mdi-ticket-account:before{content:\"\\F0517\"}.mdi-ticket-confirmation:before{content:\"\\F0518\"}.mdi-ticket-confirmation-outline:before{content:\"\\F13AA\"}.mdi-ticket-outline:before{content:\"\\F0913\"}.mdi-ticket-percent:before{content:\"\\F0724\"}.mdi-ticket-percent-outline:before{content:\"\\F142B\"}.mdi-tie:before{content:\"\\F0519\"}.mdi-tilde:before{content:\"\\F0725\"}.mdi-timelapse:before{content:\"\\F051A\"}.mdi-timeline:before{content:\"\\F0BD1\"}.mdi-timeline-alert:before{content:\"\\F0F95\"}.mdi-timeline-alert-outline:before{content:\"\\F0F98\"}.mdi-timeline-check:before{content:\"\\F1532\"}.mdi-timeline-check-outline:before{content:\"\\F1533\"}.mdi-timeline-clock:before{content:\"\\F11FB\"}.mdi-timeline-clock-outline:before{content:\"\\F11FC\"}.mdi-timeline-help:before{content:\"\\F0F99\"}.mdi-timeline-help-outline:before{content:\"\\F0F9A\"}.mdi-timeline-minus:before{content:\"\\F1534\"}.mdi-timeline-minus-outline:before{content:\"\\F1535\"}.mdi-timeline-outline:before{content:\"\\F0BD2\"}.mdi-timeline-plus:before{content:\"\\F0F96\"}.mdi-timeline-plus-outline:before{content:\"\\F0F97\"}.mdi-timeline-remove:before{content:\"\\F1536\"}.mdi-timeline-remove-outline:before{content:\"\\F1537\"}.mdi-timeline-text:before{content:\"\\F0BD3\"}.mdi-timeline-text-outline:before{content:\"\\F0BD4\"}.mdi-timer:before{content:\"\\F13AB\"}.mdi-timer-10:before{content:\"\\F051C\"}.mdi-timer-3:before{content:\"\\F051D\"}.mdi-timer-off:before{content:\"\\F13AC\"}.mdi-timer-off-outline:before{content:\"\\F051E\"}.mdi-timer-outline:before{content:\"\\F051B\"}.mdi-timer-sand:before{content:\"\\F051F\"}.mdi-timer-sand-empty:before{content:\"\\F06AD\"}.mdi-timer-sand-full:before{content:\"\\F078C\"}.mdi-timetable:before{content:\"\\F0520\"}.mdi-toaster:before{content:\"\\F1063\"}.mdi-toaster-off:before{content:\"\\F11B7\"}.mdi-toaster-oven:before{content:\"\\F0CD3\"}.mdi-toggle-switch:before{content:\"\\F0521\"}.mdi-toggle-switch-off:before{content:\"\\F0522\"}.mdi-toggle-switch-off-outline:before{content:\"\\F0A19\"}.mdi-toggle-switch-outline:before{content:\"\\F0A1A\"}.mdi-toilet:before{content:\"\\F09AB\"}.mdi-toolbox:before{content:\"\\F09AC\"}.mdi-toolbox-outline:before{content:\"\\F09AD\"}.mdi-tools:before{content:\"\\F1064\"}.mdi-tooltip:before{content:\"\\F0523\"}.mdi-tooltip-account:before{content:\"\\F000C\"}.mdi-tooltip-check:before{content:\"\\F155C\"}.mdi-tooltip-check-outline:before{content:\"\\F155D\"}.mdi-tooltip-edit:before{content:\"\\F0524\"}.mdi-tooltip-edit-outline:before{content:\"\\F12C5\"}.mdi-tooltip-image:before{content:\"\\F0525\"}.mdi-tooltip-image-outline:before{content:\"\\F0BD5\"}.mdi-tooltip-minus:before{content:\"\\F155E\"}.mdi-tooltip-minus-outline:before{content:\"\\F155F\"}.mdi-tooltip-outline:before{content:\"\\F0526\"}.mdi-tooltip-plus:before{content:\"\\F0BD6\"}.mdi-tooltip-plus-outline:before{content:\"\\F0527\"}.mdi-tooltip-remove:before{content:\"\\F1560\"}.mdi-tooltip-remove-outline:before{content:\"\\F1561\"}.mdi-tooltip-text:before{content:\"\\F0528\"}.mdi-tooltip-text-outline:before{content:\"\\F0BD7\"}.mdi-tooth:before{content:\"\\F08C3\"}.mdi-tooth-outline:before{content:\"\\F0529\"}.mdi-toothbrush:before{content:\"\\F1129\"}.mdi-toothbrush-electric:before{content:\"\\F112C\"}.mdi-toothbrush-paste:before{content:\"\\F112A\"}.mdi-torch:before{content:\"\\F1606\"}.mdi-tortoise:before{content:\"\\F0D3B\"}.mdi-toslink:before{content:\"\\F12B8\"}.mdi-tournament:before{content:\"\\F09AE\"}.mdi-tow-truck:before{content:\"\\F083C\"}.mdi-tower-beach:before{content:\"\\F0681\"}.mdi-tower-fire:before{content:\"\\F0682\"}.mdi-toy-brick:before{content:\"\\F1288\"}.mdi-toy-brick-marker:before{content:\"\\F1289\"}.mdi-toy-brick-marker-outline:before{content:\"\\F128A\"}.mdi-toy-brick-minus:before{content:\"\\F128B\"}.mdi-toy-brick-minus-outline:before{content:\"\\F128C\"}.mdi-toy-brick-outline:before{content:\"\\F128D\"}.mdi-toy-brick-plus:before{content:\"\\F128E\"}.mdi-toy-brick-plus-outline:before{content:\"\\F128F\"}.mdi-toy-brick-remove:before{content:\"\\F1290\"}.mdi-toy-brick-remove-outline:before{content:\"\\F1291\"}.mdi-toy-brick-search:before{content:\"\\F1292\"}.mdi-toy-brick-search-outline:before{content:\"\\F1293\"}.mdi-track-light:before{content:\"\\F0914\"}.mdi-trackpad:before{content:\"\\F07F8\"}.mdi-trackpad-lock:before{content:\"\\F0933\"}.mdi-tractor:before{content:\"\\F0892\"}.mdi-tractor-variant:before{content:\"\\F14C4\"}.mdi-trademark:before{content:\"\\F0A78\"}.mdi-traffic-cone:before{content:\"\\F137C\"}.mdi-traffic-light:before{content:\"\\F052B\"}.mdi-train:before{content:\"\\F052C\"}.mdi-train-car:before{content:\"\\F0BD8\"}.mdi-train-car-passenger:before{content:\"\\F1733\"}.mdi-train-car-passenger-door:before{content:\"\\F1734\"}.mdi-train-car-passenger-door-open:before{content:\"\\F1735\"}.mdi-train-car-passenger-variant:before{content:\"\\F1736\"}.mdi-train-variant:before{content:\"\\F08C4\"}.mdi-tram:before{content:\"\\F052D\"}.mdi-tram-side:before{content:\"\\F0FE7\"}.mdi-transcribe:before{content:\"\\F052E\"}.mdi-transcribe-close:before{content:\"\\F052F\"}.mdi-transfer:before{content:\"\\F1065\"}.mdi-transfer-down:before{content:\"\\F0DA1\"}.mdi-transfer-left:before{content:\"\\F0DA2\"}.mdi-transfer-right:before{content:\"\\F0530\"}.mdi-transfer-up:before{content:\"\\F0DA3\"}.mdi-transit-connection:before{content:\"\\F0D3C\"}.mdi-transit-connection-horizontal:before{content:\"\\F1546\"}.mdi-transit-connection-variant:before{content:\"\\F0D3D\"}.mdi-transit-detour:before{content:\"\\F0F8B\"}.mdi-transit-skip:before{content:\"\\F1515\"}.mdi-transit-transfer:before{content:\"\\F06AE\"}.mdi-transition:before{content:\"\\F0915\"}.mdi-transition-masked:before{content:\"\\F0916\"}.mdi-translate:before{content:\"\\F05CA\"}.mdi-translate-off:before{content:\"\\F0E06\"}.mdi-transmission-tower:before{content:\"\\F0D3E\"}.mdi-trash-can:before{content:\"\\F0A79\"}.mdi-trash-can-outline:before{content:\"\\F0A7A\"}.mdi-tray:before{content:\"\\F1294\"}.mdi-tray-alert:before{content:\"\\F1295\"}.mdi-tray-full:before{content:\"\\F1296\"}.mdi-tray-minus:before{content:\"\\F1297\"}.mdi-tray-plus:before{content:\"\\F1298\"}.mdi-tray-remove:before{content:\"\\F1299\"}.mdi-treasure-chest:before{content:\"\\F0726\"}.mdi-tree:before{content:\"\\F0531\"}.mdi-tree-outline:before{content:\"\\F0E69\"}.mdi-trello:before{content:\"\\F0532\"}.mdi-trending-down:before{content:\"\\F0533\"}.mdi-trending-neutral:before{content:\"\\F0534\"}.mdi-trending-up:before{content:\"\\F0535\"}.mdi-triangle:before{content:\"\\F0536\"}.mdi-triangle-outline:before{content:\"\\F0537\"}.mdi-triangle-wave:before{content:\"\\F147C\"}.mdi-triforce:before{content:\"\\F0BD9\"}.mdi-trophy:before{content:\"\\F0538\"}.mdi-trophy-award:before{content:\"\\F0539\"}.mdi-trophy-broken:before{content:\"\\F0DA4\"}.mdi-trophy-outline:before{content:\"\\F053A\"}.mdi-trophy-variant:before{content:\"\\F053B\"}.mdi-trophy-variant-outline:before{content:\"\\F053C\"}.mdi-truck:before{content:\"\\F053D\"}.mdi-truck-check:before{content:\"\\F0CD4\"}.mdi-truck-check-outline:before{content:\"\\F129A\"}.mdi-truck-delivery:before{content:\"\\F053E\"}.mdi-truck-delivery-outline:before{content:\"\\F129B\"}.mdi-truck-fast:before{content:\"\\F0788\"}.mdi-truck-fast-outline:before{content:\"\\F129C\"}.mdi-truck-outline:before{content:\"\\F129D\"}.mdi-truck-trailer:before{content:\"\\F0727\"}.mdi-trumpet:before{content:\"\\F1096\"}.mdi-tshirt-crew:before{content:\"\\F0A7B\"}.mdi-tshirt-crew-outline:before{content:\"\\F053F\"}.mdi-tshirt-v:before{content:\"\\F0A7C\"}.mdi-tshirt-v-outline:before{content:\"\\F0540\"}.mdi-tumble-dryer:before{content:\"\\F0917\"}.mdi-tumble-dryer-alert:before{content:\"\\F11BA\"}.mdi-tumble-dryer-off:before{content:\"\\F11BB\"}.mdi-tune:before{content:\"\\F062E\"}.mdi-tune-variant:before{content:\"\\F1542\"}.mdi-tune-vertical:before{content:\"\\F066A\"}.mdi-tune-vertical-variant:before{content:\"\\F1543\"}.mdi-turkey:before{content:\"\\F171B\"}.mdi-turnstile:before{content:\"\\F0CD5\"}.mdi-turnstile-outline:before{content:\"\\F0CD6\"}.mdi-turtle:before{content:\"\\F0CD7\"}.mdi-twitch:before{content:\"\\F0543\"}.mdi-twitter:before{content:\"\\F0544\"}.mdi-twitter-retweet:before{content:\"\\F0547\"}.mdi-two-factor-authentication:before{content:\"\\F09AF\"}.mdi-typewriter:before{content:\"\\F0F2D\"}.mdi-ubisoft:before{content:\"\\F0BDA\"}.mdi-ubuntu:before{content:\"\\F0548\"}.mdi-ufo:before{content:\"\\F10C4\"}.mdi-ufo-outline:before{content:\"\\F10C5\"}.mdi-ultra-high-definition:before{content:\"\\F07F9\"}.mdi-umbraco:before{content:\"\\F0549\"}.mdi-umbrella:before{content:\"\\F054A\"}.mdi-umbrella-closed:before{content:\"\\F09B0\"}.mdi-umbrella-closed-outline:before{content:\"\\F13E2\"}.mdi-umbrella-closed-variant:before{content:\"\\F13E1\"}.mdi-umbrella-outline:before{content:\"\\F054B\"}.mdi-undo:before{content:\"\\F054C\"}.mdi-undo-variant:before{content:\"\\F054D\"}.mdi-unfold-less-horizontal:before{content:\"\\F054E\"}.mdi-unfold-less-vertical:before{content:\"\\F0760\"}.mdi-unfold-more-horizontal:before{content:\"\\F054F\"}.mdi-unfold-more-vertical:before{content:\"\\F0761\"}.mdi-ungroup:before{content:\"\\F0550\"}.mdi-unicode:before{content:\"\\F0ED0\"}.mdi-unicorn:before{content:\"\\F15C2\"}.mdi-unicorn-variant:before{content:\"\\F15C3\"}.mdi-unicycle:before{content:\"\\F15E5\"}.mdi-unity:before{content:\"\\F06AF\"}.mdi-unreal:before{content:\"\\F09B1\"}.mdi-untappd:before{content:\"\\F0551\"}.mdi-update:before{content:\"\\F06B0\"}.mdi-upload:before{content:\"\\F0552\"}.mdi-upload-lock:before{content:\"\\F1373\"}.mdi-upload-lock-outline:before{content:\"\\F1374\"}.mdi-upload-multiple:before{content:\"\\F083D\"}.mdi-upload-network:before{content:\"\\F06F6\"}.mdi-upload-network-outline:before{content:\"\\F0CD8\"}.mdi-upload-off:before{content:\"\\F10C6\"}.mdi-upload-off-outline:before{content:\"\\F10C7\"}.mdi-upload-outline:before{content:\"\\F0E07\"}.mdi-usb:before{content:\"\\F0553\"}.mdi-usb-flash-drive:before{content:\"\\F129E\"}.mdi-usb-flash-drive-outline:before{content:\"\\F129F\"}.mdi-usb-port:before{content:\"\\F11F0\"}.mdi-valve:before{content:\"\\F1066\"}.mdi-valve-closed:before{content:\"\\F1067\"}.mdi-valve-open:before{content:\"\\F1068\"}.mdi-van-passenger:before{content:\"\\F07FA\"}.mdi-van-utility:before{content:\"\\F07FB\"}.mdi-vanish:before{content:\"\\F07FC\"}.mdi-vanish-quarter:before{content:\"\\F1554\"}.mdi-vanity-light:before{content:\"\\F11E1\"}.mdi-variable:before{content:\"\\F0AE7\"}.mdi-variable-box:before{content:\"\\F1111\"}.mdi-vector-arrange-above:before{content:\"\\F0554\"}.mdi-vector-arrange-below:before{content:\"\\F0555\"}.mdi-vector-bezier:before{content:\"\\F0AE8\"}.mdi-vector-circle:before{content:\"\\F0556\"}.mdi-vector-circle-variant:before{content:\"\\F0557\"}.mdi-vector-combine:before{content:\"\\F0558\"}.mdi-vector-curve:before{content:\"\\F0559\"}.mdi-vector-difference:before{content:\"\\F055A\"}.mdi-vector-difference-ab:before{content:\"\\F055B\"}.mdi-vector-difference-ba:before{content:\"\\F055C\"}.mdi-vector-ellipse:before{content:\"\\F0893\"}.mdi-vector-intersection:before{content:\"\\F055D\"}.mdi-vector-line:before{content:\"\\F055E\"}.mdi-vector-link:before{content:\"\\F0FE8\"}.mdi-vector-point:before{content:\"\\F055F\"}.mdi-vector-polygon:before{content:\"\\F0560\"}.mdi-vector-polyline:before{content:\"\\F0561\"}.mdi-vector-polyline-edit:before{content:\"\\F1225\"}.mdi-vector-polyline-minus:before{content:\"\\F1226\"}.mdi-vector-polyline-plus:before{content:\"\\F1227\"}.mdi-vector-polyline-remove:before{content:\"\\F1228\"}.mdi-vector-radius:before{content:\"\\F074A\"}.mdi-vector-rectangle:before{content:\"\\F05C6\"}.mdi-vector-selection:before{content:\"\\F0562\"}.mdi-vector-square:before{content:\"\\F0001\"}.mdi-vector-triangle:before{content:\"\\F0563\"}.mdi-vector-union:before{content:\"\\F0564\"}.mdi-vhs:before{content:\"\\F0A1B\"}.mdi-vibrate:before{content:\"\\F0566\"}.mdi-vibrate-off:before{content:\"\\F0CD9\"}.mdi-video:before{content:\"\\F0567\"}.mdi-video-3d:before{content:\"\\F07FD\"}.mdi-video-3d-off:before{content:\"\\F13D9\"}.mdi-video-3d-variant:before{content:\"\\F0ED1\"}.mdi-video-4k-box:before{content:\"\\F083E\"}.mdi-video-account:before{content:\"\\F0919\"}.mdi-video-box:before{content:\"\\F00FD\"}.mdi-video-box-off:before{content:\"\\F00FE\"}.mdi-video-check:before{content:\"\\F1069\"}.mdi-video-check-outline:before{content:\"\\F106A\"}.mdi-video-high-definition:before{content:\"\\F152E\"}.mdi-video-image:before{content:\"\\F091A\"}.mdi-video-input-antenna:before{content:\"\\F083F\"}.mdi-video-input-component:before{content:\"\\F0840\"}.mdi-video-input-hdmi:before{content:\"\\F0841\"}.mdi-video-input-scart:before{content:\"\\F0F8C\"}.mdi-video-input-svideo:before{content:\"\\F0842\"}.mdi-video-minus:before{content:\"\\F09B2\"}.mdi-video-minus-outline:before{content:\"\\F02BA\"}.mdi-video-off:before{content:\"\\F0568\"}.mdi-video-off-outline:before{content:\"\\F0BDB\"}.mdi-video-outline:before{content:\"\\F0BDC\"}.mdi-video-plus:before{content:\"\\F09B3\"}.mdi-video-plus-outline:before{content:\"\\F01D3\"}.mdi-video-stabilization:before{content:\"\\F091B\"}.mdi-video-switch:before{content:\"\\F0569\"}.mdi-video-switch-outline:before{content:\"\\F0790\"}.mdi-video-vintage:before{content:\"\\F0A1C\"}.mdi-video-wireless:before{content:\"\\F0ED2\"}.mdi-video-wireless-outline:before{content:\"\\F0ED3\"}.mdi-view-agenda:before{content:\"\\F056A\"}.mdi-view-agenda-outline:before{content:\"\\F11D8\"}.mdi-view-array:before{content:\"\\F056B\"}.mdi-view-array-outline:before{content:\"\\F1485\"}.mdi-view-carousel:before{content:\"\\F056C\"}.mdi-view-carousel-outline:before{content:\"\\F1486\"}.mdi-view-column:before{content:\"\\F056D\"}.mdi-view-column-outline:before{content:\"\\F1487\"}.mdi-view-comfy:before{content:\"\\F0E6A\"}.mdi-view-comfy-outline:before{content:\"\\F1488\"}.mdi-view-compact:before{content:\"\\F0E6B\"}.mdi-view-compact-outline:before{content:\"\\F0E6C\"}.mdi-view-dashboard:before{content:\"\\F056E\"}.mdi-view-dashboard-outline:before{content:\"\\F0A1D\"}.mdi-view-dashboard-variant:before{content:\"\\F0843\"}.mdi-view-dashboard-variant-outline:before{content:\"\\F1489\"}.mdi-view-day:before{content:\"\\F056F\"}.mdi-view-day-outline:before{content:\"\\F148A\"}.mdi-view-grid:before{content:\"\\F0570\"}.mdi-view-grid-outline:before{content:\"\\F11D9\"}.mdi-view-grid-plus:before{content:\"\\F0F8D\"}.mdi-view-grid-plus-outline:before{content:\"\\F11DA\"}.mdi-view-headline:before{content:\"\\F0571\"}.mdi-view-list:before{content:\"\\F0572\"}.mdi-view-list-outline:before{content:\"\\F148B\"}.mdi-view-module:before{content:\"\\F0573\"}.mdi-view-module-outline:before{content:\"\\F148C\"}.mdi-view-parallel:before{content:\"\\F0728\"}.mdi-view-parallel-outline:before{content:\"\\F148D\"}.mdi-view-quilt:before{content:\"\\F0574\"}.mdi-view-quilt-outline:before{content:\"\\F148E\"}.mdi-view-sequential:before{content:\"\\F0729\"}.mdi-view-sequential-outline:before{content:\"\\F148F\"}.mdi-view-split-horizontal:before{content:\"\\F0BCB\"}.mdi-view-split-vertical:before{content:\"\\F0BCC\"}.mdi-view-stream:before{content:\"\\F0575\"}.mdi-view-stream-outline:before{content:\"\\F1490\"}.mdi-view-week:before{content:\"\\F0576\"}.mdi-view-week-outline:before{content:\"\\F1491\"}.mdi-vimeo:before{content:\"\\F0577\"}.mdi-violin:before{content:\"\\F060F\"}.mdi-virtual-reality:before{content:\"\\F0894\"}.mdi-virus:before{content:\"\\F13B6\"}.mdi-virus-outline:before{content:\"\\F13B7\"}.mdi-vk:before{content:\"\\F0579\"}.mdi-vlc:before{content:\"\\F057C\"}.mdi-voice-off:before{content:\"\\F0ED4\"}.mdi-voicemail:before{content:\"\\F057D\"}.mdi-volleyball:before{content:\"\\F09B4\"}.mdi-volume-high:before{content:\"\\F057E\"}.mdi-volume-low:before{content:\"\\F057F\"}.mdi-volume-medium:before{content:\"\\F0580\"}.mdi-volume-minus:before{content:\"\\F075E\"}.mdi-volume-mute:before{content:\"\\F075F\"}.mdi-volume-off:before{content:\"\\F0581\"}.mdi-volume-plus:before{content:\"\\F075D\"}.mdi-volume-source:before{content:\"\\F1120\"}.mdi-volume-variant-off:before{content:\"\\F0E08\"}.mdi-volume-vibrate:before{content:\"\\F1121\"}.mdi-vote:before{content:\"\\F0A1F\"}.mdi-vote-outline:before{content:\"\\F0A20\"}.mdi-vpn:before{content:\"\\F0582\"}.mdi-vuejs:before{content:\"\\F0844\"}.mdi-vuetify:before{content:\"\\F0E6D\"}.mdi-walk:before{content:\"\\F0583\"}.mdi-wall:before{content:\"\\F07FE\"}.mdi-wall-sconce:before{content:\"\\F091C\"}.mdi-wall-sconce-flat:before{content:\"\\F091D\"}.mdi-wall-sconce-flat-variant:before{content:\"\\F041C\"}.mdi-wall-sconce-round:before{content:\"\\F0748\"}.mdi-wall-sconce-round-variant:before{content:\"\\F091E\"}.mdi-wallet:before{content:\"\\F0584\"}.mdi-wallet-giftcard:before{content:\"\\F0585\"}.mdi-wallet-membership:before{content:\"\\F0586\"}.mdi-wallet-outline:before{content:\"\\F0BDD\"}.mdi-wallet-plus:before{content:\"\\F0F8E\"}.mdi-wallet-plus-outline:before{content:\"\\F0F8F\"}.mdi-wallet-travel:before{content:\"\\F0587\"}.mdi-wallpaper:before{content:\"\\F0E09\"}.mdi-wan:before{content:\"\\F0588\"}.mdi-wardrobe:before{content:\"\\F0F90\"}.mdi-wardrobe-outline:before{content:\"\\F0F91\"}.mdi-warehouse:before{content:\"\\F0F81\"}.mdi-washing-machine:before{content:\"\\F072A\"}.mdi-washing-machine-alert:before{content:\"\\F11BC\"}.mdi-washing-machine-off:before{content:\"\\F11BD\"}.mdi-watch:before{content:\"\\F0589\"}.mdi-watch-export:before{content:\"\\F058A\"}.mdi-watch-export-variant:before{content:\"\\F0895\"}.mdi-watch-import:before{content:\"\\F058B\"}.mdi-watch-import-variant:before{content:\"\\F0896\"}.mdi-watch-variant:before{content:\"\\F0897\"}.mdi-watch-vibrate:before{content:\"\\F06B1\"}.mdi-watch-vibrate-off:before{content:\"\\F0CDA\"}.mdi-water:before{content:\"\\F058C\"}.mdi-water-alert:before{content:\"\\F1502\"}.mdi-water-alert-outline:before{content:\"\\F1503\"}.mdi-water-boiler:before{content:\"\\F0F92\"}.mdi-water-boiler-alert:before{content:\"\\F11B3\"}.mdi-water-boiler-off:before{content:\"\\F11B4\"}.mdi-water-check:before{content:\"\\F1504\"}.mdi-water-check-outline:before{content:\"\\F1505\"}.mdi-water-minus:before{content:\"\\F1506\"}.mdi-water-minus-outline:before{content:\"\\F1507\"}.mdi-water-off:before{content:\"\\F058D\"}.mdi-water-off-outline:before{content:\"\\F1508\"}.mdi-water-outline:before{content:\"\\F0E0A\"}.mdi-water-percent:before{content:\"\\F058E\"}.mdi-water-percent-alert:before{content:\"\\F1509\"}.mdi-water-plus:before{content:\"\\F150A\"}.mdi-water-plus-outline:before{content:\"\\F150B\"}.mdi-water-polo:before{content:\"\\F12A0\"}.mdi-water-pump:before{content:\"\\F058F\"}.mdi-water-pump-off:before{content:\"\\F0F93\"}.mdi-water-remove:before{content:\"\\F150C\"}.mdi-water-remove-outline:before{content:\"\\F150D\"}.mdi-water-well:before{content:\"\\F106B\"}.mdi-water-well-outline:before{content:\"\\F106C\"}.mdi-watering-can:before{content:\"\\F1481\"}.mdi-watering-can-outline:before{content:\"\\F1482\"}.mdi-watermark:before{content:\"\\F0612\"}.mdi-wave:before{content:\"\\F0F2E\"}.mdi-waveform:before{content:\"\\F147D\"}.mdi-waves:before{content:\"\\F078D\"}.mdi-waze:before{content:\"\\F0BDE\"}.mdi-weather-cloudy:before{content:\"\\F0590\"}.mdi-weather-cloudy-alert:before{content:\"\\F0F2F\"}.mdi-weather-cloudy-arrow-right:before{content:\"\\F0E6E\"}.mdi-weather-fog:before{content:\"\\F0591\"}.mdi-weather-hail:before{content:\"\\F0592\"}.mdi-weather-hazy:before{content:\"\\F0F30\"}.mdi-weather-hurricane:before{content:\"\\F0898\"}.mdi-weather-lightning:before{content:\"\\F0593\"}.mdi-weather-lightning-rainy:before{content:\"\\F067E\"}.mdi-weather-night:before{content:\"\\F0594\"}.mdi-weather-night-partly-cloudy:before{content:\"\\F0F31\"}.mdi-weather-partly-cloudy:before{content:\"\\F0595\"}.mdi-weather-partly-lightning:before{content:\"\\F0F32\"}.mdi-weather-partly-rainy:before{content:\"\\F0F33\"}.mdi-weather-partly-snowy:before{content:\"\\F0F34\"}.mdi-weather-partly-snowy-rainy:before{content:\"\\F0F35\"}.mdi-weather-pouring:before{content:\"\\F0596\"}.mdi-weather-rainy:before{content:\"\\F0597\"}.mdi-weather-snowy:before{content:\"\\F0598\"}.mdi-weather-snowy-heavy:before{content:\"\\F0F36\"}.mdi-weather-snowy-rainy:before{content:\"\\F067F\"}.mdi-weather-sunny:before{content:\"\\F0599\"}.mdi-weather-sunny-alert:before{content:\"\\F0F37\"}.mdi-weather-sunny-off:before{content:\"\\F14E4\"}.mdi-weather-sunset:before{content:\"\\F059A\"}.mdi-weather-sunset-down:before{content:\"\\F059B\"}.mdi-weather-sunset-up:before{content:\"\\F059C\"}.mdi-weather-tornado:before{content:\"\\F0F38\"}.mdi-weather-windy:before{content:\"\\F059D\"}.mdi-weather-windy-variant:before{content:\"\\F059E\"}.mdi-web:before{content:\"\\F059F\"}.mdi-web-box:before{content:\"\\F0F94\"}.mdi-web-clock:before{content:\"\\F124A\"}.mdi-webcam:before{content:\"\\F05A0\"}.mdi-webcam-off:before{content:\"\\F1737\"}.mdi-webhook:before{content:\"\\F062F\"}.mdi-webpack:before{content:\"\\F072B\"}.mdi-webrtc:before{content:\"\\F1248\"}.mdi-wechat:before{content:\"\\F0611\"}.mdi-weight:before{content:\"\\F05A1\"}.mdi-weight-gram:before{content:\"\\F0D3F\"}.mdi-weight-kilogram:before{content:\"\\F05A2\"}.mdi-weight-lifter:before{content:\"\\F115D\"}.mdi-weight-pound:before{content:\"\\F09B5\"}.mdi-whatsapp:before{content:\"\\F05A3\"}.mdi-wheel-barrow:before{content:\"\\F14F2\"}.mdi-wheelchair-accessibility:before{content:\"\\F05A4\"}.mdi-whistle:before{content:\"\\F09B6\"}.mdi-whistle-outline:before{content:\"\\F12BC\"}.mdi-white-balance-auto:before{content:\"\\F05A5\"}.mdi-white-balance-incandescent:before{content:\"\\F05A6\"}.mdi-white-balance-iridescent:before{content:\"\\F05A7\"}.mdi-white-balance-sunny:before{content:\"\\F05A8\"}.mdi-widgets:before{content:\"\\F072C\"}.mdi-widgets-outline:before{content:\"\\F1355\"}.mdi-wifi:before{content:\"\\F05A9\"}.mdi-wifi-alert:before{content:\"\\F16B5\"}.mdi-wifi-arrow-down:before{content:\"\\F16B6\"}.mdi-wifi-arrow-left:before{content:\"\\F16B7\"}.mdi-wifi-arrow-left-right:before{content:\"\\F16B8\"}.mdi-wifi-arrow-right:before{content:\"\\F16B9\"}.mdi-wifi-arrow-up:before{content:\"\\F16BA\"}.mdi-wifi-arrow-up-down:before{content:\"\\F16BB\"}.mdi-wifi-cancel:before{content:\"\\F16BC\"}.mdi-wifi-check:before{content:\"\\F16BD\"}.mdi-wifi-cog:before{content:\"\\F16BE\"}.mdi-wifi-lock:before{content:\"\\F16BF\"}.mdi-wifi-lock-open:before{content:\"\\F16C0\"}.mdi-wifi-marker:before{content:\"\\F16C1\"}.mdi-wifi-minus:before{content:\"\\F16C2\"}.mdi-wifi-off:before{content:\"\\F05AA\"}.mdi-wifi-plus:before{content:\"\\F16C3\"}.mdi-wifi-refresh:before{content:\"\\F16C4\"}.mdi-wifi-remove:before{content:\"\\F16C5\"}.mdi-wifi-settings:before{content:\"\\F16C6\"}.mdi-wifi-star:before{content:\"\\F0E0B\"}.mdi-wifi-strength-1:before{content:\"\\F091F\"}.mdi-wifi-strength-1-alert:before{content:\"\\F0920\"}.mdi-wifi-strength-1-lock:before{content:\"\\F0921\"}.mdi-wifi-strength-1-lock-open:before{content:\"\\F16CB\"}.mdi-wifi-strength-2:before{content:\"\\F0922\"}.mdi-wifi-strength-2-alert:before{content:\"\\F0923\"}.mdi-wifi-strength-2-lock:before{content:\"\\F0924\"}.mdi-wifi-strength-2-lock-open:before{content:\"\\F16CC\"}.mdi-wifi-strength-3:before{content:\"\\F0925\"}.mdi-wifi-strength-3-alert:before{content:\"\\F0926\"}.mdi-wifi-strength-3-lock:before{content:\"\\F0927\"}.mdi-wifi-strength-3-lock-open:before{content:\"\\F16CD\"}.mdi-wifi-strength-4:before{content:\"\\F0928\"}.mdi-wifi-strength-4-alert:before{content:\"\\F0929\"}.mdi-wifi-strength-4-lock:before{content:\"\\F092A\"}.mdi-wifi-strength-4-lock-open:before{content:\"\\F16CE\"}.mdi-wifi-strength-alert-outline:before{content:\"\\F092B\"}.mdi-wifi-strength-lock-open-outline:before{content:\"\\F16CF\"}.mdi-wifi-strength-lock-outline:before{content:\"\\F092C\"}.mdi-wifi-strength-off:before{content:\"\\F092D\"}.mdi-wifi-strength-off-outline:before{content:\"\\F092E\"}.mdi-wifi-strength-outline:before{content:\"\\F092F\"}.mdi-wifi-sync:before{content:\"\\F16C7\"}.mdi-wikipedia:before{content:\"\\F05AC\"}.mdi-wind-turbine:before{content:\"\\F0DA5\"}.mdi-window-close:before{content:\"\\F05AD\"}.mdi-window-closed:before{content:\"\\F05AE\"}.mdi-window-closed-variant:before{content:\"\\F11DB\"}.mdi-window-maximize:before{content:\"\\F05AF\"}.mdi-window-minimize:before{content:\"\\F05B0\"}.mdi-window-open:before{content:\"\\F05B1\"}.mdi-window-open-variant:before{content:\"\\F11DC\"}.mdi-window-restore:before{content:\"\\F05B2\"}.mdi-window-shutter:before{content:\"\\F111C\"}.mdi-window-shutter-alert:before{content:\"\\F111D\"}.mdi-window-shutter-open:before{content:\"\\F111E\"}.mdi-windsock:before{content:\"\\F15FA\"}.mdi-wiper:before{content:\"\\F0AE9\"}.mdi-wiper-wash:before{content:\"\\F0DA6\"}.mdi-wizard-hat:before{content:\"\\F1477\"}.mdi-wordpress:before{content:\"\\F05B4\"}.mdi-wrap:before{content:\"\\F05B6\"}.mdi-wrap-disabled:before{content:\"\\F0BDF\"}.mdi-wrench:before{content:\"\\F05B7\"}.mdi-wrench-outline:before{content:\"\\F0BE0\"}.mdi-xamarin:before{content:\"\\F0845\"}.mdi-xamarin-outline:before{content:\"\\F0846\"}.mdi-xing:before{content:\"\\F05BE\"}.mdi-xml:before{content:\"\\F05C0\"}.mdi-xmpp:before{content:\"\\F07FF\"}.mdi-y-combinator:before{content:\"\\F0624\"}.mdi-yahoo:before{content:\"\\F0B4F\"}.mdi-yeast:before{content:\"\\F05C1\"}.mdi-yin-yang:before{content:\"\\F0680\"}.mdi-yoga:before{content:\"\\F117C\"}.mdi-youtube:before{content:\"\\F05C3\"}.mdi-youtube-gaming:before{content:\"\\F0848\"}.mdi-youtube-studio:before{content:\"\\F0847\"}.mdi-youtube-subscription:before{content:\"\\F0D40\"}.mdi-youtube-tv:before{content:\"\\F0448\"}.mdi-yurt:before{content:\"\\F1516\"}.mdi-z-wave:before{content:\"\\F0AEA\"}.mdi-zend:before{content:\"\\F0AEB\"}.mdi-zigbee:before{content:\"\\F0D41\"}.mdi-zip-box:before{content:\"\\F05C4\"}.mdi-zip-box-outline:before{content:\"\\F0FFA\"}.mdi-zip-disk:before{content:\"\\F0A23\"}.mdi-zodiac-aquarius:before{content:\"\\F0A7D\"}.mdi-zodiac-aries:before{content:\"\\F0A7E\"}.mdi-zodiac-cancer:before{content:\"\\F0A7F\"}.mdi-zodiac-capricorn:before{content:\"\\F0A80\"}.mdi-zodiac-gemini:before{content:\"\\F0A81\"}.mdi-zodiac-leo:before{content:\"\\F0A82\"}.mdi-zodiac-libra:before{content:\"\\F0A83\"}.mdi-zodiac-pisces:before{content:\"\\F0A84\"}.mdi-zodiac-sagittarius:before{content:\"\\F0A85\"}.mdi-zodiac-scorpio:before{content:\"\\F0A86\"}.mdi-zodiac-taurus:before{content:\"\\F0A87\"}.mdi-zodiac-virgo:before{content:\"\\F0A88\"}.mdi-blank:before{content:\"\\f68c\";visibility:hidden}.mdi-18px.mdi-set,.mdi-18px.mdi:before{font-size:18px;font-size:1.125rem}.mdi-24px.mdi-set,.mdi-24px.mdi:before{font-size:24px;font-size:1.5rem}.mdi-36px.mdi-set,.mdi-36px.mdi:before{font-size:36px;font-size:2.25rem}.mdi-48px.mdi-set,.mdi-48px.mdi:before{font-size:48px;font-size:3rem}.mdi-dark:before{color:rgba(0,0,0,.54)}.mdi-dark.mdi-inactive:before{color:rgba(0,0,0,.26)}.mdi-light:before{color:#fff}.mdi-light.mdi-inactive:before{color:hsla(0,0%,100%,.3)}.mdi-rotate-45:before{-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.mdi-rotate-90:before{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.mdi-rotate-135:before{-webkit-transform:rotate(135deg);-ms-transform:rotate(135deg);transform:rotate(135deg)}.mdi-rotate-180:before{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.mdi-rotate-225:before{-webkit-transform:rotate(225deg);-ms-transform:rotate(225deg);transform:rotate(225deg)}.mdi-rotate-270:before{-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.mdi-rotate-315:before{-webkit-transform:rotate(315deg);-ms-transform:rotate(315deg);transform:rotate(315deg)}.mdi-flip-h:before{-webkit-transform:scaleX(-1);transform:scaleX(-1);-webkit-filter:FlipH;filter:FlipH;-ms-filter:\"FlipH\"}.mdi-flip-v:before{-webkit-transform:scaleY(-1);transform:scaleY(-1);-webkit-filter:FlipV;filter:FlipV;-ms-filter:\"FlipV\"}.mdi-spin:before{-webkit-animation:mdi-spin 2s linear infinite;animation:mdi-spin 2s linear infinite}\@-webkit-keyframes mdi-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}\@keyframes mdi-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.file-cta,.file-name,.input,.pagination-ellipsis,.pagination-link,.pagination-next,.pagination-previous,.textarea{border-color:#b1b1b1!important}input{padding-left:1em!important;padding-right:1em!important;-webkit-box-shadow:none!important;-moz-box-shadow:none!important;box-shadow:none!important;font-weight:300}input:-webkit-autofill,input:-webkit-autofill:active,input:-webkit-autofill:focus,input:-webkit-autofill:hover{-webkit-box-shadow:0 0 0 30px #fff inset!important}.success{background-color:#48c774!important}.success:hover{background-color:#39bb67!important}.warning{background-color:#ffdd57!important}.warning:hover{background-color:#dbb314!important}.danger{background-color:#e80631!important}.danger:hover{background-color:#bf1434!important}.color-primary{color:#239ed7!important}.button.is-danger:hover{background-color:#bf1434}.button.is-danger{background-color:#e80631}.window-size{max-width:1398px;max-height:812px;padding:14px 0}.action-button{background-color:#239ed7;color:#fff;border:1px solid #239ed7!important}.action-button:hover{color:#fff}.label{font-weight:700;margin-bottom:0!important;font-size:.6em}.value{font-size:.6em}.help,.value{min-height:24px;margin-bottom:10px}.help{font-size:.5em}.tab-title{font-size:.8em;text-transform:uppercase}.disabled{opacity:.5;cursor:not-allowed!important}#notification-container{display:block;position:absolute;top:10px;right:10px}.center-container{text-align:center;margin-top:20%}.center-container span{display:block;line-height:0;margin-top:20px}.center-container img{display:inline-block;opacity:.5}.mt-10{margin-top:10px}.mt-15{margin-top:15px}.mt-20{margin-top:20px}.mb-10{margin-bottom:10px}.mb-20{margin-bottom:20px}.ml-10{margin-left:10px}.mr-10{margin-right:10px}.fab-icon{width:36px!important;height:auto!important}.my-10{margin-top:10px;margin-bottom:10px}.mx-10{margin-left:10;margin-right:10px}.w-100{width:100%!important}.h-100{height:100%!important}.no-border-radius{border-radius:0!important}.fab-icon{background-color:#239ed7;border-radius:100%!important;padding:8px;width:36px;-webkit-transition:.5s;transition:.5s}.fab-icon-active{background-color:#2980b9!important;border:3px groove red;padding:5px!important}.fab-icon:hover{background-color:#2980b9;cursor:pointer}.modal-content-container{height:80%}.image-cropper-modal-content-container,.modal-content-container{background-color:#fff;border-radius:10px;-webkit-box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12)!important;box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12)!important;padding:25px;width:90%}.image-cropper-modal-content-container{height:57%}.object-fit-contain{-o-object-fit:contain;object-fit:contain}a,h6,label,option,p,select,span{font-family:Poppins!important}.icon-16{font-size:16px!important;font-size:1rem!important}.flex-center{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-line-pack:center;align-content:center;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.button:hover{cursor:pointer}:root{--primary-color:#239ed7}.icon-24{font-size:24px!important;font-size:1.5rem!important;color:#508eff;border-radius:100%}.toolbox-container{-ms-flex-pack:distribute;justify-content:space-around;margin-top:30px}.button-container,.toolbox-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.button-container{padding:10px;border-radius:100%;height:40px;width:70px;-ms-flex-pack:center;justify-content:center}.button-container:hover{background:#f3f3f3;cursor:pointer}.object-fit-contain{-o-object-fit:contain!important;object-fit:contain!important}\n\n/*!\n * Cropper.js v1.5.13\n * https://fengyuanchen.github.io/cropperjs\n *\n * Copyright 2015-present Chen Fengyuan\n * Released under the MIT license\n *\n * Date: 2022-11-20T05:30:43.444Z\n */.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.cropper-container img{-webkit-backface-visibility:hidden;backface-visibility:hidden;display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-canvas,.cropper-crop-box,.cropper-drag-box,.cropper-modal,.cropper-wrap-box{bottom:0;left:0;position:absolute;right:0;top:0}.cropper-canvas,.cropper-wrap-box{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline:1px solid #39f;outline-color:rgba(51,153,255,75%);overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:calc(100% / 3);left:0;top:calc(100% / 3);width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:calc(100% / 3);top:0;width:calc(100% / 3)}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:after,.cropper-center:before{background-color:#eee;content:\" \";display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}\@media (min-width:768px){.cropper-point.point-se{height:15px;width:15px}}\@media (min-width:992px){.cropper-point.point-se{height:10px;width:10px}}\@media (min-width:1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:\" \";display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC\")}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}\@-webkit-keyframes spinAround{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}\@keyframes spinAround{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.is-checkradio[type=checkbox],.is-checkradio[type=radio]{outline:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:inline-block;position:absolute;opacity:0}.is-checkradio[type=checkbox]+label,.is-checkradio[type=radio]+label{position:relative;display:initial;cursor:pointer;vertical-align:middle;margin:.5em;padding:.2rem .5rem .2rem 0;border-radius:4px}.is-checkradio[type=checkbox]+label:first-of-type,.is-checkradio[type=radio]+label:first-of-type{margin-left:0}.is-checkradio[type=checkbox]+label:hover:before,.is-checkradio[type=radio]+label:hover:before{-webkit-animation-duration:.4s;animation-duration:.4s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:hover-color;animation-name:hover-color}.is-checkradio[type=checkbox]+label:before,.is-checkradio[type=radio]+label:before{position:absolute;left:0;top:0;content:\"\";border:.1rem solid #dbdbdb}.is-checkradio[type=checkbox]+label:after,.is-checkradio[type=radio]+label:after{position:absolute;display:none;content:\"\";top:0}.is-checkradio[type=checkbox].is-rtl+label,.is-checkradio[type=radio].is-rtl+label{margin-right:0;margin-left:.5rem}.is-checkradio[type=checkbox].is-rtl+label:before,.is-checkradio[type=radio].is-rtl+label:before{left:auto;right:0}.is-checkradio[type=checkbox]:focus+label:before,.is-checkradio[type=radio]:focus+label:before{outline:1px dotted #b5b5b5}.is-checkradio[type=checkbox]:hover:not([disabled])+label:before,.is-checkradio[type=radio]:hover:not([disabled])+label:before{border-color:#00d1b2!important}.is-checkradio[type=checkbox]:checked+label:before,.is-checkradio[type=radio]:checked+label:before{border:.1rem solid #dbdbdb}.is-checkradio[type=checkbox]:checked[disabled],.is-checkradio[type=radio]:checked[disabled]{cursor:not-allowed}.is-checkradio[type=checkbox]:checked[disabled]+label,.is-checkradio[type=radio]:checked[disabled]+label{opacity:.5}.is-checkradio[type=checkbox]:checked+label:before,.is-checkradio[type=radio]:checked+label:before{-webkit-animation-name:none;animation-name:none}.is-checkradio[type=checkbox]:checked+label:after,.is-checkradio[type=radio]:checked+label:after{display:inline-block}.is-checkradio[type=checkbox][disabled],.is-checkradio[type=radio][disabled]{cursor:not-allowed}.is-checkradio[type=checkbox][disabled]+label,.is-checkradio[type=radio][disabled]+label{opacity:.5;cursor:not-allowed}.is-checkradio[type=checkbox][disabled]+label:after,.is-checkradio[type=checkbox][disabled]+label:before,.is-checkradio[type=checkbox][disabled]+label:hover,.is-checkradio[type=radio][disabled]+label:after,.is-checkradio[type=radio][disabled]+label:before,.is-checkradio[type=radio][disabled]+label:hover{cursor:not-allowed}.is-checkradio[type=checkbox][disabled]:hover,.is-checkradio[type=radio][disabled]:hover{cursor:not-allowed}.is-checkradio[type=checkbox][disabled]:hover:before,.is-checkradio[type=radio][disabled]:hover:before{-webkit-animation-name:none;animation-name:none}.is-checkradio[type=checkbox][disabled]:before,.is-checkradio[type=radio][disabled]:before{cursor:not-allowed}.is-checkradio[type=checkbox][disabled]:after,.is-checkradio[type=radio][disabled]:after{cursor:not-allowed}.is-checkradio[type=checkbox].has-no-border+label:before,.is-checkradio[type=radio].has-no-border+label:before{border:none!important}.is-checkradio[type=checkbox].is-block,.is-checkradio[type=radio].is-block{display:none!important}.is-checkradio[type=checkbox].is-block+label,.is-checkradio[type=radio].is-block+label{width:100%!important;background:#f5f5f5;color:rgba(0,0,0,.7);padding-right:.75em}.is-checkradio[type=checkbox].is-block:hover:not([disabled])+label,.is-checkradio[type=radio].is-block:hover:not([disabled])+label{background:#e8e8e8}.is-checkradio[type=checkbox]+label:before{border-radius:4px}.is-checkradio[type=checkbox]+label:after{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transform:translateY(0) rotate(45deg);transform:translateY(0) rotate(45deg);border-width:.1rem;border-style:solid;border-color:#00d1b2;border-top:0;border-left:0}.is-checkradio[type=checkbox].is-circle+label:before{border-radius:50%}.is-checkradio[type=checkbox]+label{font-size:1rem;padding-left:2rem}.is-checkradio[type=checkbox]+label:before{width:1.5rem;height:1.5rem}.is-checkradio[type=checkbox]+label:after{width:.375rem;height:.6rem;top:.405rem;left:.6rem}.is-checkradio[type=checkbox].is-block+label:before{width:1.25rem;height:1.25rem;left:.175rem;top:.175rem}.is-checkradio[type=checkbox].is-block+label:after{top:.325rem;left:.65rem}.is-checkradio[type=checkbox].is-rtl+label{padding-left:0;padding-right:2rem}.is-checkradio[type=checkbox].is-rtl+label:after{left:auto;right:.6rem}.is-checkradio[type=checkbox].is-small+label{font-size:.75rem;padding-left:1.5rem}.is-checkradio[type=checkbox].is-small+label:before{width:1.125rem;height:1.125rem}.is-checkradio[type=checkbox].is-small+label:after{width:.28125rem;height:.45rem;top:.30375rem;left:.45rem}.is-checkradio[type=checkbox].is-small.is-block+label:before{width:.9375rem;height:.9375rem;left:.175rem;top:.175rem}.is-checkradio[type=checkbox].is-small.is-block+label:after{top:.29375rem;left:.5375rem}.is-checkradio[type=checkbox].is-small.is-rtl+label{padding-left:0;padding-right:1.5rem}.is-checkradio[type=checkbox].is-small.is-rtl+label:after{left:auto;right:.45rem}.is-checkradio[type=checkbox].is-medium+label{font-size:1.25rem;padding-left:2.5rem}.is-checkradio[type=checkbox].is-medium+label:before{width:1.875rem;height:1.875rem}.is-checkradio[type=checkbox].is-medium+label:after{width:.46875rem;height:.75rem;top:.50625rem;left:.75rem}.is-checkradio[type=checkbox].is-medium.is-block+label:before{width:1.5625rem;height:1.5625rem;left:.175rem;top:.175rem}.is-checkradio[type=checkbox].is-medium.is-block+label:after{top:.35625rem;left:.7625rem}.is-checkradio[type=checkbox].is-medium.is-rtl+label{padding-left:0;padding-right:2.5rem}.is-checkradio[type=checkbox].is-medium.is-rtl+label:after{left:auto;right:.75rem}.is-checkradio[type=checkbox].is-large+label{font-size:1.5rem;padding-left:3rem}.is-checkradio[type=checkbox].is-large+label:before{width:2.25rem;height:2.25rem}.is-checkradio[type=checkbox].is-large+label:after{width:.5625rem;height:.9rem;top:.6075rem;left:.9rem}.is-checkradio[type=checkbox].is-large.is-block+label:before{width:1.875rem;height:1.875rem;left:.175rem;top:.175rem}.is-checkradio[type=checkbox].is-large.is-block+label:after{top:.3875rem;left:.875rem}.is-checkradio[type=checkbox].is-large.is-rtl+label{padding-left:0;padding-right:3rem}.is-checkradio[type=checkbox].is-large.is-rtl+label:after{left:auto;right:.9rem}.is-checkradio[type=checkbox].is-white.has-background-color+label:before{border-color:transparent!important;background-color:#fff!important}.is-checkradio[type=checkbox].is-white:hover:not([disabled])+label:before{border-color:#fff!important}.is-checkradio[type=checkbox].is-white:checked+label:after{border-color:#fff!important}.is-checkradio[type=checkbox].is-white:checked.has-background-color+label:before{border-color:transparent!important;background-color:#fff!important}.is-checkradio[type=checkbox].is-white:checked.has-background-color+label:after{border-color:#0a0a0a!important;background-color:#fff!important}.is-checkradio[type=checkbox].is-white.is-block:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-white.is-block:hover:not([disabled])+label:before{border-color:#fff!important}.is-checkradio[type=checkbox].is-white.is-block:checked+label{color:#0a0a0a;border-color:#fff!important;background:#fff}.is-checkradio[type=checkbox].is-white.is-block:checked+label:after{border-color:#0a0a0a!important}.is-checkradio[type=checkbox].is-white.is-block:checked:hover:not([disabled])+label{background:#f2f2f2}.is-checkradio[type=checkbox].is-white.is-block:checked:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-white.is-block:checked:hover:not([disabled])+label:before{border-color:#000!important}.is-checkradio[type=checkbox].is-black.has-background-color+label:before{border-color:transparent!important;background-color:#0a0a0a!important}.is-checkradio[type=checkbox].is-black:hover:not([disabled])+label:before{border-color:#0a0a0a!important}.is-checkradio[type=checkbox].is-black:checked+label:after{border-color:#0a0a0a!important}.is-checkradio[type=checkbox].is-black:checked.has-background-color+label:before{border-color:transparent!important;background-color:#0a0a0a!important}.is-checkradio[type=checkbox].is-black:checked.has-background-color+label:after{border-color:#fff!important;background-color:#0a0a0a!important}.is-checkradio[type=checkbox].is-black.is-block:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-black.is-block:hover:not([disabled])+label:before{border-color:#0a0a0a!important}.is-checkradio[type=checkbox].is-black.is-block:checked+label{color:#fff;border-color:#0a0a0a!important;background:#0a0a0a}.is-checkradio[type=checkbox].is-black.is-block:checked+label:after{border-color:#fff!important}.is-checkradio[type=checkbox].is-black.is-block:checked:hover:not([disabled])+label{background:#000}.is-checkradio[type=checkbox].is-black.is-block:checked:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-black.is-block:checked:hover:not([disabled])+label:before{border-color:#f2f2f2!important}.is-checkradio[type=checkbox].is-light.has-background-color+label:before{border-color:transparent!important;background-color:#f5f5f5!important}.is-checkradio[type=checkbox].is-light:hover:not([disabled])+label:before{border-color:#f5f5f5!important}.is-checkradio[type=checkbox].is-light:checked+label:after{border-color:#f5f5f5!important}.is-checkradio[type=checkbox].is-light:checked.has-background-color+label:before{border-color:transparent!important;background-color:#f5f5f5!important}.is-checkradio[type=checkbox].is-light:checked.has-background-color+label:after{border-color:#363636!important;background-color:#f5f5f5!important}.is-checkradio[type=checkbox].is-light.is-block:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-light.is-block:hover:not([disabled])+label:before{border-color:#f5f5f5!important}.is-checkradio[type=checkbox].is-light.is-block:checked+label{color:#363636;border-color:#f5f5f5!important;background:#f5f5f5}.is-checkradio[type=checkbox].is-light.is-block:checked+label:after{border-color:#363636!important}.is-checkradio[type=checkbox].is-light.is-block:checked:hover:not([disabled])+label{background:#e8e8e8}.is-checkradio[type=checkbox].is-light.is-block:checked:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-light.is-block:checked:hover:not([disabled])+label:before{border-color:#292929!important}.is-checkradio[type=checkbox].is-dark.has-background-color+label:before{border-color:transparent!important;background-color:#363636!important}.is-checkradio[type=checkbox].is-dark:hover:not([disabled])+label:before{border-color:#363636!important}.is-checkradio[type=checkbox].is-dark:checked+label:after{border-color:#363636!important}.is-checkradio[type=checkbox].is-dark:checked.has-background-color+label:before{border-color:transparent!important;background-color:#363636!important}.is-checkradio[type=checkbox].is-dark:checked.has-background-color+label:after{border-color:#f5f5f5!important;background-color:#363636!important}.is-checkradio[type=checkbox].is-dark.is-block:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-dark.is-block:hover:not([disabled])+label:before{border-color:#363636!important}.is-checkradio[type=checkbox].is-dark.is-block:checked+label{color:#f5f5f5;border-color:#363636!important;background:#363636}.is-checkradio[type=checkbox].is-dark.is-block:checked+label:after{border-color:#f5f5f5!important}.is-checkradio[type=checkbox].is-dark.is-block:checked:hover:not([disabled])+label{background:#292929}.is-checkradio[type=checkbox].is-dark.is-block:checked:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-dark.is-block:checked:hover:not([disabled])+label:before{border-color:#e8e8e8!important}.is-checkradio[type=checkbox].is-primary.has-background-color+label:before{border-color:transparent!important;background-color:#00d1b2!important}.is-checkradio[type=checkbox].is-primary:hover:not([disabled])+label:before{border-color:#00d1b2!important}.is-checkradio[type=checkbox].is-primary:checked+label:after{border-color:#00d1b2!important}.is-checkradio[type=checkbox].is-primary:checked.has-background-color+label:before{border-color:transparent!important;background-color:#00d1b2!important}.is-checkradio[type=checkbox].is-primary:checked.has-background-color+label:after{border-color:#fff!important;background-color:#00d1b2!important}.is-checkradio[type=checkbox].is-primary.is-block:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-primary.is-block:hover:not([disabled])+label:before{border-color:#00d1b2!important}.is-checkradio[type=checkbox].is-primary.is-block:checked+label{color:#fff;border-color:#00d1b2!important;background:#00d1b2}.is-checkradio[type=checkbox].is-primary.is-block:checked+label:after{border-color:#fff!important}.is-checkradio[type=checkbox].is-primary.is-block:checked:hover:not([disabled])+label{background:#00b89c}.is-checkradio[type=checkbox].is-primary.is-block:checked:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-primary.is-block:checked:hover:not([disabled])+label:before{border-color:#f2f2f2!important}.is-checkradio[type=checkbox].is-link.has-background-color+label:before{border-color:transparent!important;background-color:#3273dc!important}.is-checkradio[type=checkbox].is-link:hover:not([disabled])+label:before{border-color:#3273dc!important}.is-checkradio[type=checkbox].is-link:checked+label:after{border-color:#3273dc!important}.is-checkradio[type=checkbox].is-link:checked.has-background-color+label:before{border-color:transparent!important;background-color:#3273dc!important}.is-checkradio[type=checkbox].is-link:checked.has-background-color+label:after{border-color:#fff!important;background-color:#3273dc!important}.is-checkradio[type=checkbox].is-link.is-block:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-link.is-block:hover:not([disabled])+label:before{border-color:#3273dc!important}.is-checkradio[type=checkbox].is-link.is-block:checked+label{color:#fff;border-color:#3273dc!important;background:#3273dc}.is-checkradio[type=checkbox].is-link.is-block:checked+label:after{border-color:#fff!important}.is-checkradio[type=checkbox].is-link.is-block:checked:hover:not([disabled])+label{background:#2366d1}.is-checkradio[type=checkbox].is-link.is-block:checked:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-link.is-block:checked:hover:not([disabled])+label:before{border-color:#f2f2f2!important}.is-checkradio[type=checkbox].is-info.has-background-color+label:before{border-color:transparent!important;background-color:#209cee!important}.is-checkradio[type=checkbox].is-info:hover:not([disabled])+label:before{border-color:#209cee!important}.is-checkradio[type=checkbox].is-info:checked+label:after{border-color:#209cee!important}.is-checkradio[type=checkbox].is-info:checked.has-background-color+label:before{border-color:transparent!important;background-color:#209cee!important}.is-checkradio[type=checkbox].is-info:checked.has-background-color+label:after{border-color:#fff!important;background-color:#209cee!important}.is-checkradio[type=checkbox].is-info.is-block:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-info.is-block:hover:not([disabled])+label:before{border-color:#209cee!important}.is-checkradio[type=checkbox].is-info.is-block:checked+label{color:#fff;border-color:#209cee!important;background:#209cee}.is-checkradio[type=checkbox].is-info.is-block:checked+label:after{border-color:#fff!important}.is-checkradio[type=checkbox].is-info.is-block:checked:hover:not([disabled])+label{background:#118fe4}.is-checkradio[type=checkbox].is-info.is-block:checked:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-info.is-block:checked:hover:not([disabled])+label:before{border-color:#f2f2f2!important}.is-checkradio[type=checkbox].is-success.has-background-color+label:before{border-color:transparent!important;background-color:#23d160!important}.is-checkradio[type=checkbox].is-success:hover:not([disabled])+label:before{border-color:#23d160!important}.is-checkradio[type=checkbox].is-success:checked+label:after{border-color:#23d160!important}.is-checkradio[type=checkbox].is-success:checked.has-background-color+label:before{border-color:transparent!important;background-color:#23d160!important}.is-checkradio[type=checkbox].is-success:checked.has-background-color+label:after{border-color:#fff!important;background-color:#23d160!important}.is-checkradio[type=checkbox].is-success.is-block:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-success.is-block:hover:not([disabled])+label:before{border-color:#23d160!important}.is-checkradio[type=checkbox].is-success.is-block:checked+label{color:#fff;border-color:#23d160!important;background:#23d160}.is-checkradio[type=checkbox].is-success.is-block:checked+label:after{border-color:#fff!important}.is-checkradio[type=checkbox].is-success.is-block:checked:hover:not([disabled])+label{background:#20bc56}.is-checkradio[type=checkbox].is-success.is-block:checked:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-success.is-block:checked:hover:not([disabled])+label:before{border-color:#f2f2f2!important}.is-checkradio[type=checkbox].is-warning.has-background-color+label:before{border-color:transparent!important;background-color:#ffdd57!important}.is-checkradio[type=checkbox].is-warning:hover:not([disabled])+label:before{border-color:#ffdd57!important}.is-checkradio[type=checkbox].is-warning:checked+label:after{border-color:#ffdd57!important}.is-checkradio[type=checkbox].is-warning:checked.has-background-color+label:before{border-color:transparent!important;background-color:#ffdd57!important}.is-checkradio[type=checkbox].is-warning:checked.has-background-color+label:after{border-color:rgba(0,0,0,.7)!important;background-color:#ffdd57!important}.is-checkradio[type=checkbox].is-warning.is-block:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-warning.is-block:hover:not([disabled])+label:before{border-color:#ffdd57!important}.is-checkradio[type=checkbox].is-warning.is-block:checked+label{color:rgba(0,0,0,.7);border-color:#ffdd57!important;background:#ffdd57}.is-checkradio[type=checkbox].is-warning.is-block:checked+label:after{border-color:rgba(0,0,0,.7)!important}.is-checkradio[type=checkbox].is-warning.is-block:checked:hover:not([disabled])+label{background:#ffd83d}.is-checkradio[type=checkbox].is-warning.is-block:checked:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-warning.is-block:checked:hover:not([disabled])+label:before{border-color:rgba(0,0,0,.7)!important}.is-checkradio[type=checkbox].is-danger.has-background-color+label:before{border-color:transparent!important;background-color:#ff3860!important}.is-checkradio[type=checkbox].is-danger:hover:not([disabled])+label:before{border-color:#ff3860!important}.is-checkradio[type=checkbox].is-danger:checked+label:after{border-color:#ff3860!important}.is-checkradio[type=checkbox].is-danger:checked.has-background-color+label:before{border-color:transparent!important;background-color:#ff3860!important}.is-checkradio[type=checkbox].is-danger:checked.has-background-color+label:after{border-color:#fff!important;background-color:#ff3860!important}.is-checkradio[type=checkbox].is-danger.is-block:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-danger.is-block:hover:not([disabled])+label:before{border-color:#ff3860!important}.is-checkradio[type=checkbox].is-danger.is-block:checked+label{color:#fff;border-color:#ff3860!important;background:#ff3860}.is-checkradio[type=checkbox].is-danger.is-block:checked+label:after{border-color:#fff!important}.is-checkradio[type=checkbox].is-danger.is-block:checked:hover:not([disabled])+label{background:#ff1f4b}.is-checkradio[type=checkbox].is-danger.is-block:checked:hover:not([disabled])+label:after,.is-checkradio[type=checkbox].is-danger.is-block:checked:hover:not([disabled])+label:before{border-color:#f2f2f2!important}.is-checkradio[type=checkbox]:indeterminate+label:after{display:inline-block;-webkit-transform:rotate(90deg);transform:rotate(90deg);border-bottom:none}.is-checkradio[type=checkbox]:indeterminate.is-white+label:after{border-color:#fff}.is-checkradio[type=checkbox]:indeterminate.is-black+label:after{border-color:#0a0a0a}.is-checkradio[type=checkbox]:indeterminate.is-light+label:after{border-color:#f5f5f5}.is-checkradio[type=checkbox]:indeterminate.is-dark+label:after{border-color:#363636}.is-checkradio[type=checkbox]:indeterminate.is-primary+label:after{border-color:#00d1b2}.is-checkradio[type=checkbox]:indeterminate.is-link+label:after{border-color:#3273dc}.is-checkradio[type=checkbox]:indeterminate.is-info+label:after{border-color:#209cee}.is-checkradio[type=checkbox]:indeterminate.is-success+label:after{border-color:#23d160}.is-checkradio[type=checkbox]:indeterminate.is-warning+label:after{border-color:#ffdd57}.is-checkradio[type=checkbox]:indeterminate.is-danger+label:after{border-color:#ff3860}.is-checkradio[type=radio]+label:before{border-radius:50%}.is-checkradio[type=radio]+label:after{border-radius:50%;background:#00d1b2;left:0;-webkit-transform:scale(.5);transform:scale(.5)}.is-checkradio[type=radio]:checked.has-background-color+label:before{border-color:#4a4a4a!important;background-color:#4a4a4a!important}.is-checkradio[type=radio]:checked.has-background-color+label:after{border-color:#4a4a4a!important;background-color:#4a4a4a!important}.is-checkradio[type=radio].is-rtl+label{padding-left:0}.is-checkradio[type=radio].is-rtl+label:after{left:auto;right:0}.is-checkradio[type=radio]+label{font-size:1rem;line-height:1.5rem;padding-left:2rem}.is-checkradio[type=radio]+label:after,.is-checkradio[type=radio]+label:before{width:1.5rem;height:1.5rem}.is-checkradio[type=radio].is-rtl+label{padding-right:2rem}.is-checkradio[type=radio].is-small+label{font-size:.75rem;line-height:1.125rem;padding-left:1.5rem}.is-checkradio[type=radio].is-small+label:after,.is-checkradio[type=radio].is-small+label:before{width:1.125rem;height:1.125rem}.is-checkradio[type=radio].is-small.is-rtl+label{padding-right:1.5rem}.is-checkradio[type=radio].is-medium+label{font-size:1.25rem;line-height:1.875rem;padding-left:2.5rem}.is-checkradio[type=radio].is-medium+label:after,.is-checkradio[type=radio].is-medium+label:before{width:1.875rem;height:1.875rem}.is-checkradio[type=radio].is-medium.is-rtl+label{padding-right:2.5rem}.is-checkradio[type=radio].is-large+label{font-size:1.5rem;line-height:2.25rem;padding-left:3rem}.is-checkradio[type=radio].is-large+label:after,.is-checkradio[type=radio].is-large+label:before{width:2.25rem;height:2.25rem}.is-checkradio[type=radio].is-large.is-rtl+label{padding-right:3rem}.is-checkradio[type=radio].is-white.has-background-color+label:before{border-color:#fff!important;background-color:#fff!important}.is-checkradio[type=radio].is-white:hover:not([disabled])+label:before{border-color:#fff!important}.is-checkradio[type=radio].is-white:checked+label:after{border-color:#fff!important;background-color:#fff!important}.is-checkradio[type=radio].is-white:checked.has-background-color+label:before{border-color:#fff!important;background-color:#fff!important}.is-checkradio[type=radio].is-white:checked.has-background-color+label:after{border-color:#0a0a0a!important;background-color:#0a0a0a!important}.is-checkradio[type=radio].is-black.has-background-color+label:before{border-color:#0a0a0a!important;background-color:#0a0a0a!important}.is-checkradio[type=radio].is-black:hover:not([disabled])+label:before{border-color:#0a0a0a!important}.is-checkradio[type=radio].is-black:checked+label:after{border-color:#0a0a0a!important;background-color:#0a0a0a!important}.is-checkradio[type=radio].is-black:checked.has-background-color+label:before{border-color:#0a0a0a!important;background-color:#0a0a0a!important}.is-checkradio[type=radio].is-black:checked.has-background-color+label:after{border-color:#fff!important;background-color:#fff!important}.is-checkradio[type=radio].is-light.has-background-color+label:before{border-color:#f5f5f5!important;background-color:#f5f5f5!important}.is-checkradio[type=radio].is-light:hover:not([disabled])+label:before{border-color:#f5f5f5!important}.is-checkradio[type=radio].is-light:checked+label:after{border-color:#f5f5f5!important;background-color:#f5f5f5!important}.is-checkradio[type=radio].is-light:checked.has-background-color+label:before{border-color:#f5f5f5!important;background-color:#f5f5f5!important}.is-checkradio[type=radio].is-light:checked.has-background-color+label:after{border-color:#363636!important;background-color:#363636!important}.is-checkradio[type=radio].is-dark.has-background-color+label:before{border-color:#363636!important;background-color:#363636!important}.is-checkradio[type=radio].is-dark:hover:not([disabled])+label:before{border-color:#363636!important}.is-checkradio[type=radio].is-dark:checked+label:after{border-color:#363636!important;background-color:#363636!important}.is-checkradio[type=radio].is-dark:checked.has-background-color+label:before{border-color:#363636!important;background-color:#363636!important}.is-checkradio[type=radio].is-dark:checked.has-background-color+label:after{border-color:#f5f5f5!important;background-color:#f5f5f5!important}.is-checkradio[type=radio].is-primary.has-background-color+label:before{border-color:#00d1b2!important;background-color:#00d1b2!important}.is-checkradio[type=radio].is-primary:hover:not([disabled])+label:before{border-color:#00d1b2!important}.is-checkradio[type=radio].is-primary:checked+label:after{border-color:#00d1b2!important;background-color:#00d1b2!important}.is-checkradio[type=radio].is-primary:checked.has-background-color+label:before{border-color:#00d1b2!important;background-color:#00d1b2!important}.is-checkradio[type=radio].is-primary:checked.has-background-color+label:after{border-color:#fff!important;background-color:#fff!important}.is-checkradio[type=radio].is-link.has-background-color+label:before{border-color:#3273dc!important;background-color:#3273dc!important}.is-checkradio[type=radio].is-link:hover:not([disabled])+label:before{border-color:#3273dc!important}.is-checkradio[type=radio].is-link:checked+label:after{border-color:#3273dc!important;background-color:#3273dc!important}.is-checkradio[type=radio].is-link:checked.has-background-color+label:before{border-color:#3273dc!important;background-color:#3273dc!important}.is-checkradio[type=radio].is-link:checked.has-background-color+label:after{border-color:#fff!important;background-color:#fff!important}.is-checkradio[type=radio].is-info.has-background-color+label:before{border-color:#209cee!important;background-color:#209cee!important}.is-checkradio[type=radio].is-info:hover:not([disabled])+label:before{border-color:#209cee!important}.is-checkradio[type=radio].is-info:checked+label:after{border-color:#209cee!important;background-color:#209cee!important}.is-checkradio[type=radio].is-info:checked.has-background-color+label:before{border-color:#209cee!important;background-color:#209cee!important}.is-checkradio[type=radio].is-info:checked.has-background-color+label:after{border-color:#fff!important;background-color:#fff!important}.is-checkradio[type=radio].is-success.has-background-color+label:before{border-color:#23d160!important;background-color:#23d160!important}.is-checkradio[type=radio].is-success:hover:not([disabled])+label:before{border-color:#23d160!important}.is-checkradio[type=radio].is-success:checked+label:after{border-color:#23d160!important;background-color:#23d160!important}.is-checkradio[type=radio].is-success:checked.has-background-color+label:before{border-color:#23d160!important;background-color:#23d160!important}.is-checkradio[type=radio].is-success:checked.has-background-color+label:after{border-color:#fff!important;background-color:#fff!important}.is-checkradio[type=radio].is-warning.has-background-color+label:before{border-color:#ffdd57!important;background-color:#ffdd57!important}.is-checkradio[type=radio].is-warning:hover:not([disabled])+label:before{border-color:#ffdd57!important}.is-checkradio[type=radio].is-warning:checked+label:after{border-color:#ffdd57!important;background-color:#ffdd57!important}.is-checkradio[type=radio].is-warning:checked.has-background-color+label:before{border-color:#ffdd57!important;background-color:#ffdd57!important}.is-checkradio[type=radio].is-warning:checked.has-background-color+label:after{border-color:rgba(0,0,0,.7)!important;background-color:rgba(0,0,0,.7)!important}.is-checkradio[type=radio].is-danger.has-background-color+label:before{border-color:#ff3860!important;background-color:#ff3860!important}.is-checkradio[type=radio].is-danger:hover:not([disabled])+label:before{border-color:#ff3860!important}.is-checkradio[type=radio].is-danger:checked+label:after{border-color:#ff3860!important;background-color:#ff3860!important}.is-checkradio[type=radio].is-danger:checked.has-background-color+label:before{border-color:#ff3860!important;background-color:#ff3860!important}.is-checkradio[type=radio].is-danger:checked.has-background-color+label:after{border-color:#fff!important;background-color:#fff!important}"; }
}

exports.image_cropper_component = ImageCropperComponent;
