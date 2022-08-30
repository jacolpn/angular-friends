import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';
import { PoModule } from '@po-ui/ng-components';
import { of } from 'rxjs';

import { loader } from './../../shared/utils/http-loader-factory';

import { PaymentService } from './../../shared/services/payment.service';

import { IPayment } from './../../shared/interfaces/payment.interface';

import { PaymentListModule } from './payment-list.module';

import { PaymentListComponent } from './payment-list.component';

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

const disclaimers = [
    { label: 'Usuário: teste', value: '&name=teste'},
    { label: 'Apelido: teste', value: '&username=teste'}
];

describe(PaymentListComponent.name, () => {
    let component: PaymentListComponent;
    let fixture: ComponentFixture<PaymentListComponent>;
    let service: PaymentService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ PaymentListComponent ],
            imports: [
                PoModule,
                TranslateModule.forRoot({ loader }),
                RouterTestingModule,
                HttpClientModule,
                PaymentListModule
            ],
            providers: [PaymentService],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(PaymentListComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(PaymentService);
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('getColumns: Return array with columns', () => {
        expect(component.getColumns().length).toBe(8);
    });

    it('onPaidChecked: Should called service put', () => {
        spyOn(service, 'put').and.returnValue(of({ isPayed: false }));

        fixture.detectChanges();
        component.onPaidChecked(payment);

        expect(component['paymentService'].put).toHaveBeenCalled();
    });

    it('savePayment: Should called service patch', () => {
        spyOn(service, 'patch').and.returnValue(of(payment));

        component.editRegister = true;
        fixture.detectChanges();
        component.savePayment(payment);

        expect(component['paymentService'].patch).toHaveBeenCalled();
    });

    it('savePayment: Should called service post', () => {
        spyOn(service, 'post').and.returnValue(of(payment));

        component.editRegister = false;
        component.savePayment(payment);

        expect(component['paymentService'].post).toHaveBeenCalled();
    });

    it('savePayment: Should called service delete', () => {
        spyOn(service, 'delete').and.returnValue(of(payment));

        component.editRegister = false;
        component.excludePayment(1);

        expect(component['paymentService'].delete).toHaveBeenCalled();
    });

    it('savePayment: Should return simple filter', () => {
        component.onChangeDisclaimer('teste', 'simple');

        expect(component.disclaimers).toEqual('&name_like=teste');
    });

    it('savePayment: Should return advanced filter', () => {
        component.onChangeDisclaimer(disclaimers, 'advanced');

        expect(component.disclaimers).toEqual('&name=teste&username=teste');
    });

    it('onClickAdvancedFilter: Should return advanced filter', () => {
        component.onClickAdvancedFilter(disclaimers);

        expect(component.disclaimers).toEqual('&name=teste&username=teste');
    });
});
