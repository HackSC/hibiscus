describe('dashboard: GrayContentBox component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=graycontentbox--primary&args=location;')
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to GrayContentBox!');
  });
});
