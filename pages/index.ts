import "./index.css";
import { defa } from "./body"
import Handler from "../src"

let docs = new Handler(document);
docs.events.on('added', (e) => {
    console.warn('Doc Added');
});
docs.events.on('removed', (e) => {
    console.warn('Doc Removed');
});

let constructBody = (body: HTMLElement) => {
    let testButt = document.createElement('button')
    testButt.innerHTML = 'Test'
    testButt.onclick = () => { openWindow(); }
    body.innerHTML = defa;
    body.prepend(testButt)
}

let openWindow = () => {
    let wind = window.open('', '', "popup")
    docs.registerDocument(wind!.document, true);
    wind?.addEventListener('unload', () => {
        docs.deregisterDocument(wind!.document);
    })
    if (wind!.document.body) {
        constructBody(wind!.document.body)
    }
}

constructBody(document.body);