describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should be able to Mark Book As finished Reading', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();

    cy.get('[data-testing="want-to-read"]').first().click();
    cy.get('[data-testing="want-to-read"]').eq(1).click();

    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="mark-book-finished"]').should('have.length', 2);

    cy.get('[data-testing="mark-book-finished"]').first().click();
    cy.get('[data-testing="mark-book-not-finished"]').should('have.length', 1);
  });

  it('Then: Want to Read button should change to Finished.', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();

    cy.get('[data-testing="book-finished"]').should('have.length', 1);

  });

  it('Then: I should be able to Mark Book As Not finished Reading', () => {

    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="mark-book-finished"]').should('have.length', 1);

    cy.get('[data-testing="mark-book-not-finished"]').first().click();
    cy.get('[data-testing="mark-book-finished"]').should('have.length', 2);
  });
});
