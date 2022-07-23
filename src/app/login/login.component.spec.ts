import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TranslateModule } from '@ngx-translate/core';
import { PoModule } from '@po-ui/ng-components';

import { of } from 'rxjs';

import { UserService } from './../shared/services/user.service';

import { loader } from './../shared/utils/http-loader-factory';

import { LoginComponent } from './login.component';

describe(LoginComponent.name, () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let service: UserService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                PoModule,
                TranslateModule.forRoot({ loader }),
                RouterTestingModule,
                ReactiveFormsModule
            ],
            providers: [
                UserService,
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(UserService);
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('login: Should login user when user is valid', () => {
        spyOn(service, 'get').and.returnValue(of([{ email: 'usuario@gmail.com', password: 'usuario'}]));
        spyOn(component['router'], 'navigate');

        fixture.detectChanges();

        component.login();

        expect(service.permission).toBeTruthy();
        expect(component['router'].navigate).toHaveBeenCalledWith(['/home']);
    });

    it('login: Should notify user when user is invalid', () => {
        spyOn(service, 'get').and.returnValue(of([]));
        spyOn(component['router'], 'navigate');
        spyOn(component['poNotification'], 'error');

        fixture.detectChanges();

        component.login();

        expect(service.permission).toBeFalse();
        expect(component['router'].navigate).not.toHaveBeenCalled();
        expect(component['poNotification'].error).toHaveBeenCalled();
    });
});
