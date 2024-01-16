describe('Functional Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: '/get-mock-data.json'
    }).as('getUrls');

    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      fixture: '/post-mock-data.json'
    }).as('postUrl');

    cy.visit('/');
    cy.wait('@getUrls');
  });

  //// Includes the following user flow: ////
  // When a user visits the page, they can view the page title, form and the existing shortened URLs
  it('should render the page title, form, and existing shortened URLs on page load', () => {
    cy.get('h1').contains('URL Shortener');
    cy.get('form').within(($form) => {
      cy.get('input[name="title"]').should('have.value', '');
      cy.get('input[name="urlToShorten"]').should('have.value', '');
      cy.get('button').contains('Shorten Please!');
    });
    cy.get('.url').first().within(() => {
      cy.get('h3').contains('Awesome photo');
      cy.get('a')
        .should('have.attr', 'href', 'http://localhost:3001/useshorturl/1')
        .contains('http://localhost:3001/useshorturl/1');
      cy.get('p').contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80');
    });
    cy.get('.url').last().within(() => {
      cy.get('h3').contains('Awesome photo');
      cy.get('a')
        .should('have.attr', 'href', 'http://localhost:3001/useshorturl/1')
        .contains('http://localhost:3001/useshorturl/1');
      cy.get('p').contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80');
    });
  });

  //// Includes the following user flows: ////
  // When a user fills out the form, the information is reflected in the input field values
  // When a user fills out and submits the form, the new shortened URL is rendered
  it('should render new shortened URL after submitting the form', () => {
    cy.get('form').within(($form) => {
      cy.get('input[name="title"]')
        .type('Final Assessment Submission Form');
      cy.get('input[name="title"]')
        .should('have.value', 'Final Assessment Submission Form');

      cy.get('input[name="urlToShorten"]')
        .type('https://docs.google.com/forms/d/1IMNawyyHg5LqctR_sUuDhvAfrfDNeNSG5nBLoWkuFCM/viewform?edit_requested=true');
      cy.get('input[name="urlToShorten"]')
        .should('have.value', 'https://docs.google.com/forms/d/1IMNawyyHg5LqctR_sUuDhvAfrfDNeNSG5nBLoWkuFCM/viewform?edit_requested=true');

      cy.get('button').contains('Shorten Please!').click();
    });

    cy.wait('@postUrl');

    cy.get('form').within(($form) => {
      cy.get('input[name="title"]').should('have.value', '');
      cy.get('input[name="urlToShorten"]').should('have.value', '');
    });

    cy.get('.url').first().within(() => {
      cy.get('h3').contains('Awesome photo');
      cy.get('a')
        .should('have.attr', 'href', 'http://localhost:3001/useshorturl/1')
        .contains('http://localhost:3001/useshorturl/1');
      cy.get('p').contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80');
    });

    cy.get('.url').last().within(() => {
      cy.get('h3').contains('Final Assessment Submission Form');
      cy.get('a')
        .should('have.attr', 'href', 'http://localhost:3001/useshorturl/2')
        .contains('http://localhost:3001/useshorturl/2');
      cy.get('p').contains('https://docs.google.com/forms/d/1IMNawyyHg5LqctR_sUuDhvAfrfDNeNSG5nBLoWkuFCM/viewform?edit_requested=true');
    });
  });
});