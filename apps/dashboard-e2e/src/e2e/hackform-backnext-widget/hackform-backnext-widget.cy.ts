describe('dashboard: HackformBackNextWidget component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=hackformbacknextwidget--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to HackformBackNextWidget!');
  });
});
