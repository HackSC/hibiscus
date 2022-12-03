describe('ui-kit-2023: Checkbox component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=checkbox--primary&args=label;'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Checkbox!');
  });
});
