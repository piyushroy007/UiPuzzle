describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  it('Then: I should be able to add a book to reading list and undo the action', () => {
    cy.get('input[type="search"]').type('node');
    cy.get('form').submit();
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
    
    cy.get('[data-testing="want-to-read"]').first().click();
    cy.get('.mat-simple-snackbar-action').should('have.length', 1);

    cy.get('.mat-simple-snackbar-action').first().click();
    cy.get('[data-testing="toggle-reading-list"]').first().click();
    
    cy.get('[data-testing="reading-item"]').should('have.length', 0);
  });

  xit('Then: I should see search results as I am typing', () => {
    // TODO: Implement this test!
  });
});
