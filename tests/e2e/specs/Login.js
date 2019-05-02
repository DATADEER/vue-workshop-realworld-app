// https://docs.cypress.io/api/introduction/api.html

const USERNAME = "TEST_USER_APP1";
const EMAIL = "e2etest1@byom.de";
const PASSWORD = "bgfer4tgb23fn";

beforeEach(() => {
  cy.server({
    delay: 300
  });
});

afterEach(() => {
  cy.logout();
});

describe("Login", () => {
  it("Try to login with invalid credentials", () => {
    cy.route({
      method: "POST",
      status: 442,
      url: "/api/users/login",
      response: { errors: { "email or password": ["is invalid"] } }
    }).as("invalidLoginAttempt");

    cy.visit("/login");

    cy.get("[data-cy=EmailInput]").type(EMAIL);
    cy.get("[data-cy=PasswordInput]").type("WRONG_PASSWORD");
    cy.get("[data-cy=ConfirmLogin]").click();

    cy.wait("@invalidLoginAttempt");

    cy.get("[data-cy=ErrorMessageList] > li")
      .first()
      .contains("email or password is invalid");
  });

  it("Login with valid credentials", () => {
    cy.visit("/login");

    cy.get("[data-cy=EmailInput]").type(EMAIL);
    cy.get("[data-cy=PasswordInput]").type(PASSWORD);
    cy.get("[data-cy=ConfirmLogin]").click();

    cy.get("[data-cy=HeaderProfileLink]").contains(USERNAME);
  });
});
