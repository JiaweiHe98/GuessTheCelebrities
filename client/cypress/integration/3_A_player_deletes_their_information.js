describe('A player deletes their information', () => {
  // player may not exist
//   it('delete the first player', () => {
//     cy.visit('http://localhost:3000');
//     cy.wait(2000);
//     cy.get('button').eq(1).click();
//   });

  it('answer questions and delete record', () => {
    cy.visit('http://localhost:5000');
    cy.get('input').type('testUser123321').should('have.value', 'testUser123321');
    cy.wait(500);
    cy.get('button').first().click();
    cy.wait(500);
    cy.contains('Question 1 / 10').should('exist');
    cy.get('button').first().click();
    cy.wait(100);
    cy.contains('Next Question').click();
    cy.wait(100);
    cy.get('button').first().click();
    cy.contains('Next Question').click();
    cy.get('button').first().click();
    cy.wait(200);
    cy.contains('Next Question').click();
    cy.get('button').first().click();
    cy.contains('Next Question').click();
    cy.get('button').first().click();
    cy.contains('Next Question').click();
    cy.get('button').first().click();
    cy.contains('Next Question').click();
    cy.get('button').first().click();
    cy.wait(500);
    cy.contains('Next Question').click();
    cy.get('button').first().click();
    cy.contains('Next Question').click();
    cy.get('button').first().click();
    cy.contains('Next Question').click();
    cy.get('button').first().click();
    cy.contains('Next Question').click();
    cy.wait(1000);
    cy.get('tr:contains("testUser123321")').contains('Delete').click();
  });
});
