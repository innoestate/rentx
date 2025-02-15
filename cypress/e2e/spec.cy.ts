describe('template spec', () => {
  it('passes', () => {

    cy.request('http://localhost:3000/api/auth/dev/login').its('body.token').then( token => {
      cy.wrap(token as string).then((token) => {
        localStorage.setItem('authToken', token);
      })
    })
    cy.then(() => expect(localStorage.getItem('authToken')).to.exist)


  })
})