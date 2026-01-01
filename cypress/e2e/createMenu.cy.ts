describe('create menu', () => {
  it('Should create a menu', () => {
    cy.visit('http://localhost:5173/select');
    cy.get('div[data-cy="new-menu"]').click();
    cy.url().should('eq', 'http://localhost:5173/new');
  });
});
