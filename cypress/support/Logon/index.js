const el = require('./elements');

class Logon {
  acessLogin() {
    cy.visit('http://localhost:3000/');
  }

  occupyLogin() {
    cy.get(el.id).type(Cypress.env('createdOngId'));
    cy.get(el.buttonLogin).click();
  }
}

export default new Logon();
