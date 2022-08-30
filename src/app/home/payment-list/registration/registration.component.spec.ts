import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { PoModule, PoNotificationService } from '@po-ui/ng-components';
import { TranslateModule } from '@ngx-translate/core';

import { AppModule } from './../../../app.module';

import { loader } from './../../../shared/utils/http-loader-factory';

import { RegistrationComponent } from './registration.component';

import { IPayment } from './../../../shared/interfaces/payment.interface';

const payment: IPayment = {
    action: true,
    date: new Date(),
    id: 1,
    image: '',
    isPayed: true,
    name: '',
    title: '',
    username: '',
    value: 0
};

describe(RegistrationComponent.name, () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;
    let service: PoNotificationService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ RegistrationComponent ],
            imports: [
                PoModule,
                TranslateModule.forRoot({ loader }),
                ReactiveFormsModule,
                AppModule
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(RegistrationComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(PoNotificationService);
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    // Problema no formControlName.
    xit('openModal: Should open to modal', () => {
        component.openModal();
        fixture.detectChanges();

        const modal: HTMLElement = fixture.nativeElement.querySelector('.po-modal');

        expect(modal.innerHTML).toContain('po-modal');
    });

    // Problema no formControlName.
    xit('closeModal: Should be close to modal', () => {
        component.openModal();
        fixture.detectChanges();

        component.closeModal();
        fixture.detectChanges();

        const modal: HTMLElement = fixture.nativeElement.querySelector('.po-modal');

        expect(modal).toBeNull();
    });

    it('resetFields: Should be return value false in edit', () => {
        component.edit = true;
        component.resetFields();

        expect(component.edit).toBeFalse();
    });

    it('onSave: Should return error when form is invalid', () => {
        spyOn(component['poNotification'], 'error');

        component.onSave(payment);

        expect(component['poNotification'].error).toHaveBeenCalled();

    });

    it(`onSave: Shouldn't return error when form is valid`, () => {
        spyOn(component['poNotification'], 'error');

        component.advancedFilterForm.patchValue({
            value: 1,
            date: new Date(),
            name: 'Jackson',
            username: 'Neves',
            title: 'Picpay'
        });

        component.onSave(payment);

        expect(component['poNotification'].error).not.toHaveBeenCalled();
    });

    it(`onSave: Should return error when value is less than zero`, () => {
        spyOn(component['poNotification'], 'error');

        component.advancedFilterForm.patchValue({
            value: -1,
            date: new Date(),
            name: 'Jackson',
            username: 'Neves',
            title: 'Picpay'
        });

        component.onSave(payment);

        expect(component['poNotification'].error).toHaveBeenCalled();
    });

    // Problema no formControlName.
    xit('(D) Should display title add when edit propertie is false', () => {
        component.openModal();
        fixture.detectChanges();

        const title: HTMLElement = fixture.nativeElement.querySelector('.po-modal-title');

        expect(title.innerText).toBe('addPaymentLowercase');
    });

    // Problema no formControlName.
    xit('(D) Should display title edit when edit propertie is true', () => {
        component.edit = true;
        component.openModal();
        fixture.detectChanges();

        const title: HTMLElement = fixture.nativeElement.querySelector('.po-modal-title');

        expect(title.innerText).toBe('editPayment');
    });
});
