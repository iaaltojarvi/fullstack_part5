/* eslint-disable no-undef */
describe('Blog ', function () {
  // beforeEach(function () {
  //   cy.request('POST', 'http://localhost:3003/api/testing/reset')
  //   const user = {
  //     name: 'Inari Aaltojärvi',
  //     username: 'iaaltojarvi',
  //     password: 'salainen'
  //   }
  //   cy.request('POST', 'http://localhost:3003/api/users/', user)
  // cy.visit('http://localhost:3000')

  describe('Login', function () {
    it('Login fails with wrong credentials', function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('iaaltojarvi')
      cy.get('#password').type('salaisuus')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 255, 255)')
      cy.get('html').should('not.contain', '\'Inari Aaltojärvi\' logged in')
    })
    it('Login succeeds with correct credentials', function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('iaaltojarvi')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('\'Inari Aaltojärvi\' logged in')
    })
  })
})
// })

describe('When logged in', function () {
  beforeEach(function () {
    cy.login({ username: 'iaaltojarvi', password: 'salainen' })
  })
  describe('New blog', function () {
    it('a new blog can be created', function () {
      cy.contains('Add new blog').click()
      cy.get('#title').type('Note created by cypress')
      cy.get('#author').type('Minä')
      cy.get('#url').type('testingWithCypress.com')
      cy.contains('Create').click()
      cy.contains('Note created by cypress')
    })
  })

  describe('Blog liked', function () {
    it('blog can be liked', function () {
      // cy.get('#title').type('Another Note created by cypress')
      // cy.get('#author').type('Another tester')
      // cy.get('#url').type('testingWithCypress.com')
      // cy.get('#blog-button').click()
      cy.contains('Add new blog').click()
      cy.get('#title').type('Note created by cypress')
      cy.get('#author').type('Minä')
      cy.get('#url').type('testingWithCypress.com')
      cy.contains('Create').click()
      cy.contains('Note created by cypress')
      cy.get('#showMore-button').click()
      cy.get('#like-button').click()
      cy.get('html').should('contain', 1)
    })
  })

  describe('Remove a blog', function () {
    it('blog can be removed', function () {
      cy.contains('Add new blog').click()
      cy.get('#title').type('Note created by cypress')
      cy.get('#author').type('Minä')
      cy.get('#url').type('testingWithCypress.com')
      cy.contains('Create').click()
      cy.contains('Note created by cypress')
      cy.get('#showMore-button').click()
      cy.get('#remove-button').click()
      cy.get('html').should('not.contain', 'Note created by cypress')
    })
  })

  describe('Blogs are sorted by likes when more than one blog', function () {
    it('Blogs are sorted', function () {
      cy.contains('Add new blog').click()
      cy.get('#title').type('Note created by cypress')
      cy.get('#author').type('Minä')
      cy.get('#url').type('testingWithCypress.com')
      cy.contains('Create').click()
      cy.contains('Note created by cypress')

      cy.contains('Add new blog').click()
      cy.get('#title').type('Another note created by cypress')
      cy.get('#author').type('Minä taas')
      cy.get('#url').type('testingWithCypress.com')
      cy.contains('Create').click()
      cy.contains('Another note created by cypress')

      cy.get('#showMore-button').click()
      cy.get('#like-button').click()
      cy.get('html').should('contain', 1)
      cy.get('#showMore-button').click()
      cy.get('#like-button').click()
      cy.get('.blog:first').should('contain', 2)
    })
  })
})
