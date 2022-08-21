describe('A player enters their username, and the next view is loaded', () => {
  it('load up the page and play', () => {
    cy.visit('http://localhost:5000');
    cy.get('input').type('123').should('have.value', '123');
    cy.get('button').first().click();
    cy.contains('Question 1 / 10').should('exist');
  });

  it('if the name is invalid', () => {
    cy.visit('http://localhost:5000');
    cy.get('input').type('***');
    cy.get('button').first().click();
    cy.contains('Error').should('exist');
    cy.contains('Try Again').should('exist');
  });
});
