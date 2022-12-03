describe('ui-kit-2023: Radio component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=radio--primary&args=label;'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Radio!');
  });
});
