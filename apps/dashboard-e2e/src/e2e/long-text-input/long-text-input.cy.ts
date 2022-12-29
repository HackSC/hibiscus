describe('dashboard: LongTextQuestion component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=longtextquestion--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to LongTextQuestion!');
  });
});
