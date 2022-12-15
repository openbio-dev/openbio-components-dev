function notify(parentElement, type, message, timeout) {
    var notificationContainer = parentElement.shadowRoot.querySelector('div#notification-container');
    notificationContainer.insertAdjacentHTML('beforeend', "<notification-component notification-type=\"" + type + "\" text=\"" + message + "\"/>");
    setTimeout(function () {
        var element = parentElement.shadowRoot.querySelector('notification-component');
        element.parentNode.removeChild(element);
    }, timeout || 3000);
}
export { notify as n };
