describe('dashboard: HackformIntroduction component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=hackformintroduction--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to HackformIntroduction!');
  });
});
