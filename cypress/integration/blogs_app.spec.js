
describe('Blogs_app', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user ={
      name: 'Kosa Vee',
      username: 'kosseliWee',
      password: 'WesseliKoo'
    }
    cy.request('POST', 'http://localhost:3001/api/users',user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function(){
    cy.visit('http://localhost:3000')
    expect(true).to.equal(true)
    cy.get('input[name="Username"]').type('kosseliWee')
    cy.get('input[name="Password"]').type('WesseliKoo')
  })
  describe('Login', function(){
    it('succeed with correct credentials', function(){
      cy.get('input[name="Username"]').type('kosseliWee')
      cy.get('input[name="Password"]').type('WesseliKoo')
      cy.get('button').click()  
      cy.get('#userData').contains('Kosa Vee')    
    })
    it('fails with wrong credentials', function(){
      cy.get('input[name="Username"]').type('kosseliWee')
      cy.get('input[name="Password"]').type('wrong pass')
      cy.get('button').click()  
      cy.get('.error').contains('login error').and('have.css', 'color','rgb(255, 0, 0)')   

    })

  })
  describe('When logged in', function(){
    beforeEach(function(){
      //const login={username: 'kosseliWee' , password: 'WesseliKoo' }
      //cy.request('POST', 'http://localhost:3001/api/login',login) 
      cy.login({username: 'kosseliWee' ,password: 'WesseliKoo' })
    })

    it('A blog can be added', function(){
      cy.contains('new Blog').click()
      cy.get('#blogTitle').type('test blog title')
      cy.get('#blogUrl').type('http://testAchme.org')
      cy.get('#blogAuthor').type('test cypress author')
      cy.contains('create').click()
      cy.get('div .error').contains('new Blog created')
      cy.get('div .blogTitleRow').contains('test blog title')
      cy.get('button').contains('More').click()
      cy.get('button').contains('Like').click()
    })
  })

})