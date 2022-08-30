import { LoginSpec } from '../../support/1-login/index'

context('Testin in component: Login', () => {
    beforeEach(() => { cy.visit('http://localhost:4200/#/'); });

    describe('Simple:', () => {
        it(`Shouldn't login with password incorrect`, () => {
            cy.get('#email > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('usuario@gmail.com');
            cy.get('#password > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('teste');
            cy.get('.form__button').click();
            cy.get('.po-toaster-message').should('have.text', 'Usuário ou senha inválido!');
        });

        it(`Shouldn't login with email incorrect`, () => {
            cy.get('#email > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('usuario@picpay.com');
            cy.get('#password > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('usuario');
            cy.get('.form__button').click();
            cy.get('.po-toaster-message').should('have.text', 'Usuário ou senha inválido!');
        });

        it('Should login with user and password correct', () => {
            cy.get('#email > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('usuario@gmail.com');
            cy.get('#password > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('usuario');
            cy.get('.form__button').click();
            cy.get('.po-toaster-message').should('have.text', 'Bem vindo!');
        });

        it('Should logout user when clicked logout in profile', () => {
            cy.get('#email > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('usuario@gmail.com');
            cy.get('#password > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('usuario');
            cy.get('.form__button').click();
            cy.get('.po-avatar-image').click();
            cy.get('.text-red-500').click();
            cy.get('.form__subtitle').should('have.text', 'Bem vindo de volta');
        });

        it('Should change password when values is equal', () => {
            cy.get('#email > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('usuario@gmail.com');
            cy.get('#password > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('usuario');
            cy.get('.form__button').click();
            cy.get('.po-avatar-image').click();
            cy.get('[ng-reflect-ng-class="cursor-pointer"] > div > .text-gray-500').click();
            cy.get('#password > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('usuario');
            cy.get('#passwordAgain > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('usuario');
            cy.get('.button__primary').click();
            cy.get(':nth-child(8) > .po-clickable > .po-toaster-message').should('have.text', 'Senha alterada com sucesso!');
        });

        it(`Shouldn't change password when values is different`, () => {
            cy.get('#email > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('usuario@gmail.com');
            cy.get('#password > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('usuario');
            cy.get('.form__button').click();
            cy.get('.po-avatar-image').click();
            cy.get('[ng-reflect-ng-class="cursor-pointer"] > div > .text-gray-500').click();
            cy.get('#password > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('usuario');
            cy.get('#passwordAgain > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('usuario2');
            cy.get('.button__primary').click();
            cy.get(':nth-child(8) > .po-clickable > .po-toaster-message').should('have.text', 'Favor digitar a mesma senha duas vezes!');
        });

        it(`Shouldn't change password when values is different`, () => {
            cy.get('#email > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('usuario@gmail.com');
            cy.get('#password > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('usuario');
            cy.get('.form__button').click();
            cy.get('.po-avatar-image').click();
            cy.get('[ng-reflect-ng-class="cursor-pointer"] > div > .text-gray-500').click();
            cy.get('.button__primary').click();
            cy.get(':nth-child(8) > .po-clickable > .po-toaster-message').should('have.text', 'Favor preencher os campos!');
        });
    });

    describe('Page Objects:', () => {
        it(`Shouldn't login with password incorrect`, () => {
            LoginSpec.instance.inputEmailLogin('usuario@gmail.com');
            LoginSpec.instance.inputPasswordLogin('teste');
            LoginSpec.instance.buttonSendLogin();
            LoginSpec.instance.toasterMessage('have.text', 'Usuário ou senha inválido!');
        });

        it(`Shouldn't login with email incorrect`, () => {
            LoginSpec.instance.inputEmailLogin('usuario@picpay.com');
            LoginSpec.instance.inputPasswordLogin('usuario');
            LoginSpec.instance.buttonSendLogin();
            LoginSpec.instance.toasterMessage('have.text', 'Usuário ou senha inválido!');
        });

        it('Should login with user and password correct', () => {
            LoginSpec.instance.inputEmailLogin('usuario@gmail.com');
            LoginSpec.instance.inputPasswordLogin('usuario');
            LoginSpec.instance.buttonSendLogin();
            LoginSpec.instance.toasterMessage('have.text', 'Bem vindo!');
        });

        it('Should logout user when clicked logout in profile', () => {
            LoginSpec.instance.inputEmailLogin('usuario@gmail.com');
            LoginSpec.instance.inputPasswordLogin('usuario');
            LoginSpec.instance.buttonSendLogin();
            LoginSpec.instance.avatarProfile();
            LoginSpec.instance.buttonLogoutProfile();
            LoginSpec.instance.titleLogin('have.text', 'Bem vindo de volta')
        });
    });
});
