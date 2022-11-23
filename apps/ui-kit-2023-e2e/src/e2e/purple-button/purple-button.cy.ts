describe('ui-kit-2023: PurpleButton component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=purplebutton--primary&args=label;')
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to PurpleButton!');
  });
});
