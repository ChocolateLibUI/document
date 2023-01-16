import { EventHandler } from "@chocolatelib/events"

let eventsInternal = new EventHandler<{
    documentAdded: Document,
    documentRemoved: Document,
}, {}>()

/**Document event handler */
export let events = eventsInternal.eventsUserOnly;
/**List of registered documents*/
export let documents: Document[] = [document]
/**Main document, same as the global document variable */
export let mainDocument: Document = document;
eventsInternal.target = {
    documents,
    mainDocument,
};

/**Registers a document with the theme engine, which will be updated with
 * @param document document to register
 * @param styles copies all style from main document if set true */
export let registerDocument = async (document: Document, styles: boolean) => {
    if (documents.includes(document)) {
        console.warn('Document registered twice');
    } else {
        documents.push(document);
        if (styles) {
            let headElements = mainDocument.head.children
            for (let i = 0; i < headElements.length; i++) {
                if (headElements[i] instanceof HTMLLinkElement && (<HTMLLinkElement>headElements[i]).rel === 'stylesheet') {
                    document.head.appendChild(headElements[i].cloneNode());
                }
            }
        }
        eventsInternal.emit('documentAdded', document);
    }
}

/**Registers a document with the theme engine, which will be updated with */
export let deregisterDocument = async (document: Document) => {
    let index = documents.indexOf(document);
    if (index != -1) {
        documents.splice(index, 1);
        eventsInternal.emit('documentRemoved', document);
    } else {
        console.warn('Document not registered');
    }
}

