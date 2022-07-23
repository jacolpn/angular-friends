/// <reference types="cypress" />

context(`Testin in component: Payment`, () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/#/');
        cy.get('#email > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('jackson.luis@picpay.com');
        cy.get('#password > po-field-container > .po-field-container > .po-field-container-content > .po-input').type('picpay');
        cy.get('.form__button').click();
        cy.get('.po-toaster-message').click();
    });

    it('Should register a new payment', () => {
        cy.get('.container__button').click();
        cy.get('#name').type('Teste');
        cy.get('.p-inputnumber > .p-inputtext').type(1);
        cy.get('#title').type('teste')
        cy.get('#icon').click();
        cy.get(':nth-child(3) > :nth-child(3) > .p-ripple').click();
        cy.get('#username').type('Teste');
        cy.get('.button__primary').click();
        cy.get('.po-toaster-message').should('have.text', 'Pagamento cadastrado com sucesso!');
    });

    it('Should update isPaid of an payment', () => {
        cy.get(':nth-child(2) > .po-table-row > [style="width: 100px; max-width: 100px; min-width: 100px;"] > .po-table-column-cell > span > .ng-untouched > .po-checkbox').click();
        cy.get('.po-toaster-message').should('have.text', 'Pagamento alterado com sucesso!');
    });

    it('Should update an payment', () => {
        cy.get(':nth-child(2) > .po-table-row > :nth-child(6) > .po-table-column-cell > po-table-column-icon > po-table-icon > .po-table-icon-content > .po-icon').click();
        cy.get('.button__primary').click();
        cy.get('.po-toaster-message').should('have.text', 'Pagamento alterado com sucesso!');
    });

    it('Should remove an payment', () => {
        cy.get(':nth-child(2) > .po-table-row > :nth-child(7) > .po-table-column-cell > po-table-column-icon > po-table-icon > .po-table-icon-content > .po-icon').click();
        cy.get('.button__primary').click();
        cy.get('.po-toaster-message').should('have.text', 'Pagamento removido com sucesso!');
    });

    it('Should appear the disclaimer', () => {
        cy.get('.po-field-container-content > .po-input').type('Jackson{enter}');
        cy.get('.po-disclaimer-label').should('be.visible');
    });
});
