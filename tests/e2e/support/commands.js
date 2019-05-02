// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

const USERNAME = "TEST_USER_APP1";
const EMAIL = "e2etest1@byom.de";
const PASSWORD = "bgfer4tgb23fn";

Cypress.Commands.add(
  "login",
  (email = EMAIL, password = PASSWORD, username = USERNAME) => {
    cy.visit("/");
    const getStore = () => cy.window().its("app.$store");
    getStore().then(store => {
      store.dispatch("login", { email, password });
    });
    cy.visit("/");
    cy.get("[data-cy=HeaderProfileLink]").contains(username);
  }
);

Cypress.Commands.add("logout", () => {
  cy.visit("/");
  const getStore = () => cy.window().its("app.$store");
  getStore().then(store => {
    store.dispatch("logout");
  });
});

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
