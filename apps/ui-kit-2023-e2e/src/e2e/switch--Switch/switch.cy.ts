describe('ui-kit-2023: Switch component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=switch--primary&args=label;'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Switch!');
  });
});
