describe('Functional Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: '/get-mock-data.json'
    }).as('getUrls');

    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      fixture: '/post-mock-data.json'
    }).as('postUrls');

    cy.visit('/');
  });

  

});