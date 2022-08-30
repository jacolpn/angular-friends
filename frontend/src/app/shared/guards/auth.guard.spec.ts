import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';

import { AuthGuard } from './auth.guard';

describe(AuthGuard.name, () => {
    let guard: AuthGuard;
    let service: UserService;
    let storage: LocalStorageService;

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

        guard = TestBed.inject(AuthGuard);
        service = TestBed.inject(UserService);
        storage = TestBed.inject(LocalStorageService);
    });

    it('Should create guard', () => {
        expect(guard).toBeTruthy();
    });

    it('Should navigate to login when do not have permission', () => {
        spyOn(guard['router'], 'navigate');

        service.permission = false;

        expect(guard.canActivate()).toBeFalsy();
        expect(guard['router'].navigate).toHaveBeenCalledWith(['/']);
    });

    it('Should allow navigation to proceed when permission is true', () => {
        spyOn(guard['router'], 'navigate');

        service.permission = true;
        storage.clear();

        expect(guard.canActivate()).toBeTruthy();
        expect(guard['router'].navigate).not.toHaveBeenCalled();
    });
});
