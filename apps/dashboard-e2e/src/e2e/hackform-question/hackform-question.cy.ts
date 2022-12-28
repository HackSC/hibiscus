describe('dashboard: HackformQuestionComponent component', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=hackformquestioncomponent--primary&args=question;currentResponses;qi;saveResponse;goNextQuestion;goPreviousQuestion;addErrorForQuestion;resolveError;initialError;'
    )
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to HackformQuestionComponent!');
  });
});
