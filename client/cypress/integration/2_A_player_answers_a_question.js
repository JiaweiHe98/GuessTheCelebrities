describe('A player answers a question', () => {
  it('answer a question', () => {
    cy.visit('http://localhost:5000');
    cy.get('input').type('123').should('have.value', '123');
    cy.get('button').first().click();
    cy.contains('Question 1 / 10').should('exist');
    cy.get('button').first().click();
    cy.contains('Next Question').should('exist');
  });
});
