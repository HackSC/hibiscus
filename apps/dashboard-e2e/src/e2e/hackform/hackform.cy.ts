describe('dashboard: Hackerform component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=hackerform--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Hackerform!');
  });
});
