describe('dashboard: QuestionCreator component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=questioncreator--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to QuestionCreator!');
  });
});
