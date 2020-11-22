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
  });
});