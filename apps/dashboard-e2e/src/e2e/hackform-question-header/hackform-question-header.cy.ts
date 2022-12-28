describe('dashboard: HackformQuestionHeader component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=hackformquestionheader--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to HackformQuestionHeader!');
  });
});
