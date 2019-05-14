// https://docs.cypress.io/api/introduction/api.html

beforeEach(() => {
  cy.server({
    delay: 300
  });

  cy.fixture("Home/favorite.json").as("favoriteResponse");

  cy.route({
    method: "POST",
    status: 200,
    url: "/api/articles/*/favorite",
    response: "@favoriteResponse"
  }).as("favorite");

  //TODO: PART(1) Implement Mocked Routes
});

afterEach(() => {
  cy.logout();
});

describe("start.Home", () => {
  it("Favorise Article", () => {
    cy.login();

    //TODO: PART(1) Implement Mocked Routes

    //TODO: PART(2) Implement "Elemente Selektieren" test for Home View

    //TODO: PART(3) Implement "Assertions und Interaktion" test for Home View
    // USE THIS IN PART(3) -> cy.wait("@favorite");
  });
});
