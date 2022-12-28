describe('dashboard: ShortTextInput component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=shorttextinput--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to ShortTextInput!');
  });
});
