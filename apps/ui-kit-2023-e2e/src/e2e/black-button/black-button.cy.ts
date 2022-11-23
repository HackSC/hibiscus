describe('ui-kit-2023: BlackButton component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=blackbutton--primary&args=label;')
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to BlackButton!');
  });
});
