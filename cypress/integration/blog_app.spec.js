/* eslint-disable no-undef */
describe('Blog ', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Please login')
    cy.contains('Username')
  })
})