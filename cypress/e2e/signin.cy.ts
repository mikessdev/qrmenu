Cypress.Commands.add(
  'singIn' as any,
  (email = Cypress.env('email'), password = Cypress.env('password')) => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[type="email"]').type(`${email}`);
    cy.get('input[type="password"]').type(`${password}`);
    cy.get('button[type="submit"]').click();
  }
);

Cypress.Commands.add('logOut' as any, () => {
  if (cy.get('a[data-cy="signout"]').should('exist')) {
    cy.get('a[data-cy="signout"]').click();
  }
});

describe('signin', () => {
  // it('Should sign out if user is already signed in, or sign in if not signed in', () => {
  //   cy.logOut();
  // });

  it('Should redirect to sign in page', () => {
    cy.visit('http://localhost:5173');
    cy.get('a[data-cy="signin"]').click();
    cy.url().should('eq', 'http://localhost:5173/login');
  });

  it('Should do login with email and password', () => {
    cy.singIn();
  });

  it('Should create a menu', () => {
    // cy.visit('http://localhost:5173/select');
    cy.get('div[data-cy="new-menu"]').click();
    cy.url().should('eq', 'http://localhost:5173/new');
  });
});
