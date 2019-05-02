// https://docs.cypress.io/api/introduction/api.html

beforeEach(() => {
  cy.server({
    delay: 300
  });

  cy.fixture("Home/fullTagList.json").as("fullTagListResponse");
  cy.fixture("Home/fullArticleList.json").as("fullArticleListResponse");

  cy.route({
    method: "GET",
    status: 200,
    url: "/api/tags",
    response: "@fullTagListResponse"
  }).as("fullTagList");

  cy.route({
    method: "GET",
    status: 200,
    url: "/api/articles?offset=0&limit=10",
    response: "@fullArticleListResponse"
  }).as("fullArticleList");
});

afterEach(() => {
  cy.logout();
});

describe("Home", () => {
  it("Renders Page Content", () => {
    cy.login();
    cy.visit("/");
    cy.wait("@fullArticleList");
    cy.wait("@fullTagList");

    cy.get("[data-cy=PopularTagsList] > a")
      .eq(0)
      .contains("dragons");
    cy.get("[data-cy=PopularTagsList] > a")
      .eq(2)
      .contains("training");
    cy.get("[data-cy=PopularTagsList] > a")
      .eq(-1)
      .contains("animals");

    cy.get("[data-cy=ArticlePreview]").should("have.length", 10);

    cy.get("[data-cy=ArticlePreview]")
      .first()
      .then(() => {
        // Inside the "then" callback "cy" refers to the element "then" was called on
        cy.contains("[data-cy=ArticlePreviewTitle]", "FIRST_PREVIEW_TITLE");
        cy.contains(
          "[data-cy=ArticlePreviewDescription]",
          "FIRST_PREVIEW_DESCRIPTION"
        );
        cy.contains("[data-cy=ArticlePreviewAuthor]", "TEST_USER");
      });
  });
});
