import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { UserService } from '../services/user.service';

import { LoginGuard } from './login.guard';

describe(LoginGuard.name, () => {
    let guard: LoginGuard;
    let service: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterModule.forRoot([])
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                UserService
            ],
        });

        guard = TestBed.inject(LoginGuard);
        service = TestBed.inject(UserService);
    });

    it('Should create guard', () => {
        expect(guard).toBeTruthy();
    });

    it('Should navigate to login when do not have permission', () => {
        spyOn(guard['router'], 'navigate');

        expect(guard.canActivate()).toBeFalsy();

        expect(guard['router'].navigate).toHaveBeenCalledWith(['/']);
    });

    it('Should allow navigation to proceed when permission is true', () => {
        spyOn(guard['router'], 'navigate');

        service.permission = true;

        expect(guard.canActivate()).toBeTruthy();
        expect(guard['router'].navigate).not.toHaveBeenCalled();
    });
});
