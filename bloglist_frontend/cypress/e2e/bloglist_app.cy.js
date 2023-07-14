describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `http://localhost:3001/api/testing/reset`)
    cy.request('POST', `http://localhost:3001/api/users`,{
      username: 'tester',
      password: 'p455w0rd',
      name: 'Cypress Will'
    })
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('#input-username')
    cy.get('#input-password')
    cy.get('#button-login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#input-username').type('tester')
      cy.get('#input-password').type('p455w0rd')
      cy.get('#button-login').click()
      cy.contains('login successful').should('have.css', 'border-color', 'rgb(0, 128, 0)')
      cy.contains('Cypress Will logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#input-username').type('username')
      cy.get('#input-password').type('password')
      cy.get('#button-login').click()
      cy.contains('wrong credentials').should('have.css', 'border-color', 'rgb(255, 0, 0)')
    })
  })
})