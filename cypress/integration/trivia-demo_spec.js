describe('Trivia Zone', () => {
  it('Is loaded', () => {
    cy.visit('localhost:3000');
  });
  it('Navigates to the demo', () => {
    cy.contains('Try Demo').click();
  });
  it('Starts a round of trivia', () => {
    cy.contains('Play').click();
  });
  it('Skips the question being read aloud', () => {
    cy.contains('Skip').click();
  });
  it('Selects an answer', () => {
    cy.get('button:visible').first().click();
  });
  it('Submits the answer', () => {
    cy.contains('Submit').click();
  });
  it('Continues to the next question', () => {
    cy.contains('Continue').click();
  });
  it('Finishes the next 9 questions', () => {
    for (let index = 0; index < 9; index++) {
      cy.contains('Skip').click();
      cy.get('button:visible').first().click();
      cy.contains('Submit').click();
      cy.contains('Continue').click();
    }
  });
  it('Displays the score', () => {
    cy.contains('You scored');
  });
  it('Displays play again button', () => {
    cy.contains('Play Again');
  });
  it('Displays tweet button', () => {
    cy.contains('Tweet Score');
  });
});
