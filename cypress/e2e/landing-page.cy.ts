describe('landing page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('Should redirect to register page', () => {
    cy.get('[data-cy="btn-redirect-to-register"]').click();
    cy.url().should('eq', 'http://localhost:5173/register');
  });
});
