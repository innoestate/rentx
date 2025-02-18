describe('Google', function () {
  beforeEach(function () {
    cy.preparDb()
    cy.login()
  })

  it('shows dashboard', function () {
    cy.url().should('eq', 'http://localhost:4200/desktop/me/dashboard/estates')
  })
})