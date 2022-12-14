describe('ui-kit-2023: Search component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=search--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Search!');
  });
});
