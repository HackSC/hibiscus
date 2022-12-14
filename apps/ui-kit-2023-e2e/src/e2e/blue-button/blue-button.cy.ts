describe('ui-kit-2023: BlueButton component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=bluebutton--primary&args=label;'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to BlueButton!');
  });
});
