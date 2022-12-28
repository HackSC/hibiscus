describe('dashboard: HackerManager component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=hackermanager--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to HackerManager!');
  });
});
