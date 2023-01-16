import * as docs from "../src"

let testButt = document.body.appendChild(document.createElement('button'))

testButt.innerHTML = 'Test'

testButt.onclick = () => {
    openWindow();
}

docs.events.on('documentAdded', (e) => {
    console.warn('Doc Added');
});
docs.events.on('documentRemoved', (e) => {
    console.warn('Doc Removed');
});

let openWindow = () => {
    let wind = window.open('', '', "popup")
    docs.registerDocument(wind!.document, true);
    wind?.addEventListener('unload', () => {
        docs.deregisterDocument(wind!.document);
    })
}