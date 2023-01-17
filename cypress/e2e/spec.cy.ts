/// <reference types="cypress" />
import * as docs from "../../src"

console.log = cy.log;
console.warn = cy.log;
console.info = cy.log;

describe('Document', async () => {
  it('Initial Values', () => {
    expect(docs.mainDocument).to.equal(document);
    expect(docs.documents.length).to.equal(1);
    expect(docs.documents[0]).to.equal(document);
  })
  it('Attach event listener then register document', async () => {
    await new Promise<void>((a) => {
      let newDoc: Document
      docs.events.on('documentAdded', (doc) => {
        expect(doc.data === newDoc).to.equal(true);
        a();
      });
      newDoc = document.implementation.createHTMLDocument('test')
      docs.registerDocument(newDoc);
    })
  })
  it('Attach event listener then deregister document', async () => {
    await new Promise<void>((a) => {
      let newDoc: Document
      docs.events.on('documentRemoved', (doc) => {
        expect(doc.data === newDoc).to.equal(true);
        a();
      });
      newDoc = document.implementation.createHTMLDocument('test')
      docs.registerDocument(newDoc);
      docs.deregisterDocument(newDoc);
    })
  })
  it('Itterate all existing documents', async () => {
    await new Promise<void>((a) => {
      let newDoc = document.implementation.createHTMLDocument('test')
      docs.registerDocument(newDoc);
      let prog = 0
      docs.forDocuments((doc) => {
        prog++
        if (prog === 3) {
          a()
        }
      })
    })
  })
})