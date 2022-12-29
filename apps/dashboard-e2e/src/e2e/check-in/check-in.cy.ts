describe('dashboard: CheckIn component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=checkin--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to CheckIn!');
  });
});
