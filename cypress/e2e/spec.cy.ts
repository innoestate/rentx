describe('Google', function () {
  beforeEach(function () {
    // cy.task('db:seed')
    cy.loginByGoogleApi()
  })

  it('shows dashboard', function () {
    cy.url().should('eq', 'http://localhost:4200/desktop/me/dashboard/estates')
  })
})