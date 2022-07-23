import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { UserService } from './user.service';

import { IUser } from '../interfaces/user.interface';

const mockUser = {
    api: 'http://localhost:3000/account?email=usuario@gmail.com&password=usuario',
    response: [{
        id: 1,
        name: 'Jackson Neves',
        user: '@jacolpn',
        email: 'jackson.luis@picpay.com',
        password: 'picpay'
    }]
};

describe(UserService.name, () => {
    let service: UserService;
    let httpController: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [UserService],
            imports: [HttpClientTestingModule]
        }).compileComponents();

        service = TestBed.inject(UserService);
        httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpController.verify());

	it('Should be created', () => {
		expect(service instanceof UserService).toBeTruthy();
	});

    it('get: Should return all items', done => {
        const filter = 'email=usuario@gmail.com&password=usuario';

        service.get(filter).subscribe((response: any) => {
            expect(response.id).toBe(1);
            expect(response.email).toBe('jackson.luis@picpay.com');
            expect(response.name).toBe('Jackson Neves');
            expect(response.password).toBe('picpay');
            expect(response.user).toBe('@jacolpn');

			done();
        });

        httpController.expectOne(mockUser.api).flush(mockUser.response[0]);
    });

    it('patch: Should return password changed', done => {
        const user: IUser = {
            id: 1,
            name: 'Jackson Neves',
            user: '@jacolpn',
            email: 'jackson.luis@picpay.com',
            password: 'nova'
        };

		spyOn(service, 'patch').and.returnValue(of(user));

        service.patch(4, user).subscribe((response: any) => {
            expect(response).toEqual(user);
			expect(service.patch).toHaveBeenCalled();

            done();
        });
    });
});
