/// <reference types="cypress" />

describe('load the home page', () => {
  it('loads the home page', () => {
    cy.visit('http://localhost:4000')
    cy.get('[data-cy="test-form"]').click()
    cy.url().should('include', '/test-form')
  })
  it('should display a font icon', () => {
    cy.visit('http://localhost:4000')
    cy.get('[data-cy="title-icon"]').should('exist')
    // cy.get('h1').should('have.length', 1)
  })
})
