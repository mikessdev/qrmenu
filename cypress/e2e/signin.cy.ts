describe('signin', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('Should do login with email and password', () => {
    cy.get('input[type="email"]').type(Cypress.env('email'));
    cy.get('input[type="password"]').type(Cypress.env('password'));
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:5173/select-menu');
  });
});
