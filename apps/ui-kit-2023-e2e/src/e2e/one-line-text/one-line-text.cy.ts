describe('ui-kit-2023: OneLineText component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=onelinetext--primary&args=label;')
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to OneLineText!');
  });
});
