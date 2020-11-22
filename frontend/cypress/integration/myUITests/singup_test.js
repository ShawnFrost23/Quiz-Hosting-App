context('Signup flow -happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/registration');
  });
  it('Sucessfully signs up', () => {
    const name = 'Jane Doe';
    const email = 'jane@doe.com';
    const password = '123password123';
    cy.get('input[name=email]')
      .focus()
      .type(email);

    cy.get('input[name=password]')
      .focus()
      .type(password);

    cy.get('input[name=name]')
      .focus()
      .type(name);

    cy.get('input[type=submit]')
      .click()

    const gamename = 'New Game (Happy)';
  });
});

context('Create Game - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/dashboard');
  });

  const gamename = 'New Game (Happy)';

  it('Sucessfully creates game', () => {
    cy.get('input[name=GameName]')
      .focus()
      .type(gamename);

    cy.get('button[type=submit]')
      .click()

    // cy.get('button[id=startQ]')
    //   .click()
      
    // cy.get('button[id=endQ')
    //   .click()
  });
});

context('Start Game and Stop - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/dashboard');
  });

  it('Sucessfully starts game', () => {
    cy.get('button[id=startQ]')
      .click()
  });

  it ('Sucessfully stops game', () => {
    cy.get('button[id=endQ')
      .click()
  })

});

context('Logs out - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/dashboard');
  });

  it('Sucessfully logs out', () => {
    cy.get('button[id=logOut]')
      .click()
  });
  
});

context('Login -happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/login');
  });
  it('Sucessfully logs in', () => {
    const email = 'jane@doe.com';
    const password = '123password123';
    cy.get('input[name=email]')
      .focus()
      .type(email);

    cy.get('input[name=password]')
      .focus()
      .type(password);

    cy.get('input[type=submit]')
      .click()
  });
});

