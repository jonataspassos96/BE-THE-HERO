const el = require('./elements');

class Register {
  acessRegister() {
    cy.visit('http://localhost:3000/register');
  }

  occupyRegister() {
    cy.get(el.name).type('Dogs queridos');
    cy.get(el.email).type('dogs@mail.com');
    cy.get(el.whatsapp).type('77994562345');
    cy.get(el.city).type('Brasilia');
    cy.get(el.uf).type('DF');
    cy.route('POST', '**/ongs').as('postOng');
    cy.get(el.submit).click();
  }

  validateOngRegistrationSuccess() {
    cy.wait('@postOng').then((xhr) => {
      expect(xhr.status).eq(200);
      expect(xhr.response.body).property('id');
      expect(xhr.response.body.id).is.not.null;
    });
  }
}

export default new Register();
