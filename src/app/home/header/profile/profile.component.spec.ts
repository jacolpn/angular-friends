import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { of } from 'rxjs';

import { TranslateModule } from '@ngx-translate/core';
import { PoModule } from '@po-ui/ng-components';

import { UserService } from './../../../shared/services/user.service';

import { HomeRoutingModule } from './../../home-routing.module';

import { loader } from './../../../shared/utils/http-loader-factory';

import { IUser } from './../../../shared/interfaces/user.interface';

import { ProfileComponent } from './profile.component';

const user: IUser = {
    id: 1,
    name: 'Jackson Neves',
    user: '@jacolpn',
    email: 'jackson.luis@picpay.com',
    password: 'nova'
};

describe(ProfileComponent.name, () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    let service: UserService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfileComponent],
            imports: [
                PoModule,
                TranslateModule.forRoot({ loader }),
                RouterTestingModule,
                HttpClientModule,
                HomeRoutingModule
            ],
            providers: [UserService],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(UserService);
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('onHandleParagraph: Should move to login "/" when clicked in logout', () => {
        spyOn(component['router'], 'navigate');

        component.onHandleParagraph('logout');

        expect(component['router'].navigate).toHaveBeenCalledWith(['/']);
    });

    it(`onHandleParagraph: Shouldn't move to login "/" when clicked in password`, () => {
        spyOn(component['router'], 'navigate');

        component.onHandleParagraph('password');
        component.onHandleParagraph('any');

        expect(component['router'].navigate).not.toHaveBeenCalled();
    });

    it('openModal: Should open to modal', () => {
        service.user = user;
        component.openModal();
        fixture.detectChanges();

        const modal: HTMLElement = fixture.nativeElement.querySelector('.po-avatar');

        expect(modal).toBeTruthy();
    });

    it('(D) Should display paragraph when initialize modal', () => {
        component.properties = user;
        component.openModal();
        fixture.detectChanges();

        const userLabel: HTMLElement = fixture.nativeElement.querySelector('#user');
        const nameLabel: HTMLElement = fixture.nativeElement.querySelector('#name');
        const spanUser: HTMLElement = fixture.nativeElement.querySelector('#paragraph-0');
        const spanEmail: HTMLElement = fixture.nativeElement.querySelector('#paragraph-1');
        const spanName: HTMLElement = fixture.nativeElement.querySelector('#paragraph-2');

        expect(userLabel).toBeTruthy();
        expect(nameLabel).toBeTruthy();
        expect(spanUser).toBeTruthy();
        expect(spanEmail).toBeTruthy();
        expect(spanName).toBeTruthy();
    });

    it(`changePassword: Shouldn't return error when password is different`, () => {
        spyOn(component['poNotification'], 'error');

        component.newPassword = 'teste';
        component.newPasswordAgain = 'teste different';

        component.changePassword();

        expect(component['poNotification'].error).toHaveBeenCalled();
    });

    it(`changePassword: Shouldn't return success when password is equal`, () => {
        spyOn(component['poNotification'], 'success');
		spyOn(service, 'patch').and.returnValue(of(user));

        component.properties = user;
        component.newPassword = 'teste';
        component.newPasswordAgain = 'teste';

        component.changePassword();

        expect(component.newPassword).toBe('');
        expect(component.newPasswordAgain).toBe('');
        expect(component.showEditPassword).toBeFalsy();
        expect(component['poNotification'].success).toHaveBeenCalled();
    });

    it(`changePassword: Shouldn't return error when password is null`, () => {
        spyOn(component['poNotification'], 'error');

        component.newPassword = '';
        component.newPasswordAgain = '';

        component.changePassword();

        expect(component['poNotification'].error).toHaveBeenCalled();
    });

    it(`getProfile: Shouldn't call when has properties`, () => {
        spyOn(service, 'get').and.returnValue(of(user));
        service.user = user;

        fixture.detectChanges();

        expect(service.get).not.toHaveBeenCalled();
    });

    it('getProfile: Should call when has not properties', () => {
        spyOn(service, 'get').and.returnValue(of(user));

        fixture.detectChanges();

        expect(service.get).toHaveBeenCalled();
    });
});
