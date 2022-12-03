describe('ui-kit-2023: Confirmation component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=confirmation--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Confirmation!');
  });
});
