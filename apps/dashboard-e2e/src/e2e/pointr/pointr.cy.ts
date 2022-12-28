describe('dashboard: Pointr component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=pointr--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Pointr!');
  });
});
