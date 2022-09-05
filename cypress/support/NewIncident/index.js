const el = require('./elements');

class NewIncident {
  occupyNewIncident() {
    cy.get(el.title).type('Quero um monitor');
    cy.get(el.description).type('Sou programador, e necessito de uma tela maior para performance.');
    cy.get(el.value).type(200);

    cy.route('POST', '**/incidents').as('newIncidents');
    cy.route('GET', '**/profile').as('dataProfile');

    cy.get(el.buttonSave).click();
  }

  validateNewIncidentRegistrationSuccess() {
    cy.wait('@newIncidents').then((xhr) => {
      expect(xhr.status).eq(200);
      expect(xhr.response.body).has.property('id');
      expect(xhr.response.body.id).is.not.null;
    });

    cy.wait('@dataProfile').then((xhr) => {
      expect(xhr.response.body[0]).deep.property('title');
      expect(xhr.response.body[0].title).deep.eq('Quero um monitor');

      expect(xhr.response.body[0]).deep.property('description');
      expect(xhr.response.body[0].description).deep.eq('Sou programador, e necessito de uma tela maior para performance.');

      expect(xhr.response.body[0]).deep.property('value');
      expect(xhr.response.body[0].value).deep.eq(200);

      expect(xhr.response.body[0]).deep.property('ong_id');
      expect(xhr.response.body[0].ong_id).deep.eq(Cypress.env('createdOngId'));
    });
  }
}

export default new NewIncident();
