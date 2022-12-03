describe('ui-kit-2023: InformationEnter component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=informationenter--primary&args=label;')
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to InformationEnter!');
  });
});
