describe('dashboard: PortalMenu component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=portalmenu--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to PortalMenu!');
  });
});
