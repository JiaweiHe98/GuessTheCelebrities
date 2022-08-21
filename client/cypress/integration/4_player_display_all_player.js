describe('A player enters their username, and the next view is loaded', () => {
  it('load up the page and play', () => {
    cy.visit('http://localhost:5000');
    cy.wait(2000);
    cy.contains('All Players').should('exist');
  });
});
