/// <reference types="cypress" />

import Logon from '../support/Logon';
import Register from '../support/Register';
import Profile from '../support/Profile';
import NewIncident from '../support/NewIncident';

describe('Ongs', () => {
  it('devem poder realizar um cadastro', () => {
    Register.acessRegister();
    Register.occupyRegister();
    Register.validateOngRegistrationSuccess();
  });

  it.only('deve poder realizer um login no sistema', () => {
    Logon.acessLogin();
    Logon.occupyLogin();
  });

  it('devem poder fazer o logout', () => {
    cy.login();
    Profile.clickTheLogoutButton();
  });

  it('devem poder cadastrar novos casos', () => {
    cy.login();
    Profile.clickOnTheRegisterNewCaseButton();
    NewIncident.occupyNewIncident();
    NewIncident.validateNewIncidentRegistrationSuccess();
  });

  it('deve poder excluir um caso', () => {
    cy.createNewIncident();
    cy.login();

    Profile.clickOnTheDeleteIncidentButton();
    Profile.validateIncidentDeleteSuccessfully();
  });
});
