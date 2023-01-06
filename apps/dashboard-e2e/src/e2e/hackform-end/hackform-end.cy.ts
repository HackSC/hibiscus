describe('dashboard: HackformEnding component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=hackformending--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to HackformEnding!');
  });
});
