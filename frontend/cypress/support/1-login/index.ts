import { ELEMENTS } from './elements';

export class LoginSpec {
    static instance = new LoginSpec();

    get el() {
        return ELEMENTS;
    }

    public inputEmailLogin(type: string) {
        return cy.get(this.el.inputEmailLogin).type(type);
    }

    public inputPasswordLogin(value: string) {
        return cy.get(this.el.inputPasswordLogin).type(value);
    }

    public buttonSendLogin() {
        return cy.get(this.el.buttonSendLogin).click();
    }

    public toasterMessage(property: string, value: string) {
        return cy.get(this.el.toasterMessage).should(property, value);
    }

    public avatarProfile() {
        return cy.get(this.el.avatarProfile).click();
    }

    public buttonLogoutProfile() {
        return cy.get(this.el.buttonLogoutProfile).click();
    }

    public titleLogin(property: string, value: string) {
        return cy.get(this.el.titleLogin).should(property, value);
    }
}
