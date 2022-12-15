function notify(parentElement, type, message, timeout) {
    const notificationContainer = parentElement.shadowRoot.querySelector('div#notification-container');
    notificationContainer.insertAdjacentHTML('beforeend', `<notification-component notification-type="${type}" text="${message}"/>`);
    setTimeout(() => {
        const element = parentElement.shadowRoot.querySelector('notification-component');
        element.parentNode.removeChild(element);
    }, timeout || 3000);
}

export { notify as n };
