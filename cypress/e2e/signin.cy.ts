describe('signin', () => {
  beforeEach(() => {
    // Visite a página de login antes de cada teste.
    cy.visit('http://localhost:5173/login');
  });

  it('Should do login with email and password', () => {
    // Preencha o campo de e-mail.

    cy.get('input[type="email"]').type(Cypress.env('CYPRESS_EMAIL'));
    cy.get('input[type="password"]').type(Cypress.env('CYPRESS_PASSWORD'));

    // Clique no botão de login.
    cy.get('input[type="submit"]').click();

    // Verifique se a página de destino após o login é carregada corretamente.
    cy.url().should('eq', 'http://localhost:5173/');
  });
});
