const el = require('./elements');

class Profile {
  clickTheLogoutButton() {
    cy.get(el.buttonLogout).click();
  }

  clickOnTheRegisterNewCaseButton() {
    cy.get(el.buttonNewIncident).click();
  }

  clickOnTheDeleteIncidentButton() {
    cy.route('DELETE', `**/incidents/*`).as('deleteIncident');

    cy.get(el.buttonDelete).click();
  }

  validateIncidentDeleteSuccessfully() {
    cy.wait('@deleteIncident').then((xhr) => {
      expect(xhr.status).eq(204);
      expect(xhr.response.body).empty;
    });
  }
}

export default new Profile();
