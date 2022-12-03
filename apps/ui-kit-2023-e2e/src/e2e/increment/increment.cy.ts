describe('ui-kit-2023: Increment component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=increment--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Increment!');
  });
});
