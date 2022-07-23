import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { IPayment } from './../interfaces/payment.interface';

import { PaymentService } from './payment.service';

const mockPayment = {
    api: 'http://localhost:3000/tasks?_sort=id&_order=desc&_page=1&_limit=5',
    response: [{
        id: 4,
        name: 'Letitia Crolly',
        username: 'lcrolly3',
        title: 'Web Developer I',
        value: 183.58,
        date: '2021-07-10T20:39:48Z',
        image: 'https://robohash.org/estveniamet.png?size=150x150&set=set1',
        isPayed: false,
        action: true
    }]
};

const mockUpdatePayment = {
    api: 'http://localhost:3000/tasks/4',
    response: [{
        id: 4,
        name: 'Letitia Crolly',
        username: 'lcrolly3',
        title: 'Web Developer I',
        value: 183.58,
        date: '2021-07-10T20:39:48Z',
        image: 'https://robohash.org/estveniamet.png?size=150x150&set=set1',
        isPayed: false,
        action: true
    }]
};

describe(PaymentService.name, () => {
    let service: PaymentService;
    let httpController: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [PaymentService],
            imports: [HttpClientTestingModule]
        }).compileComponents();

        service = TestBed.inject(PaymentService);
        httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpController.verify());

	it('Should be created', () => {
		expect(service instanceof PaymentService).toBeTruthy();
	});

    it('get: Should return all items', done => {
        service.get('', 1, 5).subscribe((response: any) => {
            expect(response.body.id).toBe(4);
            expect(response.body.name).toBe('Letitia Crolly');
            expect(response.body.username).toBe('lcrolly3');
            expect(response.body.title).toBe('Web Developer I');
            expect(response.body.value).toBe(183.58);
            expect(response.body.date).toBe('2021-07-10T20:39:48Z');
            expect(response.body.image).toBe('https://robohash.org/estveniamet.png?size=150x150&set=set1');
            expect(response.body.isPayed).toBe(false);
            expect(response.body.action).toBe(true);

			done();
        });

        httpController.expectOne(mockPayment.api).flush(mockPayment.response[0]);
    });

    it('post: Should return all items after post', done => {
		spyOn(service, 'post').and.returnValue(of(mockPayment.response[0]));

        service.post(mockPayment.response[0]).subscribe(response => {
            expect(response).toEqual(mockPayment.response[0]);
			expect(service.post).toHaveBeenCalled();

            done();
        });
    });

	it('update: Should return fieldValue changed', done => {
        const payment: IPayment = {
            id: 4,
            name: 'Letitia',
            username: 'lcrolly',
            title: 'Web Developer',
            value: 183.50,
            date: '2021-06-10T20:39:48Z',
            image: 'https://robohash.org/estveniamet.png?size=150x150&set',
            isPayed: true,
            action: false
        };

		spyOn(service, 'patch').and.returnValue(of(payment));

        service.patch(4, mockUpdatePayment.response[0]).subscribe((response: any) => {
            expect(response).toEqual(payment);
			expect(service.patch).toHaveBeenCalled();

            done();
        });
    });

    it('put: Should return fieldValue propertie changed to true', done => {
		spyOn(service, 'put').and.returnValue(of({ isPayed: false }));

        service.put(4, mockUpdatePayment.response[0]).subscribe((response: any) => {
            expect(response).toEqual({ isPayed: false });
			expect(service.put).toHaveBeenCalled();

            done();
        });
    });

    it('delete: Should delete register', done => {
		spyOn(service, 'delete').and.returnValue(of({}));

        service.delete(4).subscribe((response: any) => {
            expect(response).toEqual({});
			expect(service.delete).toHaveBeenCalled();

            done();
        });
    });
});
