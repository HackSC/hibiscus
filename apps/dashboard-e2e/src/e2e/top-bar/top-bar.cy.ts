describe('dashboard: TopBar component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=topbar--primary&args=userTag;role;')
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to TopBar!');
  });
});
