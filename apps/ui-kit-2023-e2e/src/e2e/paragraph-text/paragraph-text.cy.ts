describe('ui-kit-2023: ParagraphText component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=paragraphtext--primary&args=label;')
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to ParagraphText!');
  });
});
