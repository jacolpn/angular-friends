import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoModule } from '@po-ui/ng-components';
import { TranslateModule } from '@ngx-translate/core';

import { ModalComponent } from './modal.component';

import { loader } from './../../utils/http-loader-factory';

describe(ModalComponent.name, () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ModalComponent],
            imports: [
                PoModule,
                TranslateModule.forRoot({ loader })
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('openModal: Should open to modal', () => {
        component.openModal();
        fixture.detectChanges();

        const modal: HTMLElement = fixture.nativeElement.querySelector('.po-modal');

        expect(modal.innerHTML).toContain('po-modal');
    });

    it('closeModal: Should be close to modal', () => {
        component.openModal();
        fixture.detectChanges();

        component.closeModal();
        fixture.detectChanges();

        const modal: HTMLElement = fixture.nativeElement.querySelector('.po-modal');

        expect(modal).toBeNull();
    });

    it('onSave: Should open to modal', () => {
        spyOn(component.save, 'emit');
        spyOn(component, 'closeModal');

        component.onSave(1);

        expect(component.save.emit).toHaveBeenCalledWith(1);
        expect(component.closeModal).toHaveBeenCalled();
    });

    it('(D) Should display currect values when the modal is opened', () => {
        const paragraph = [
            { id: 1, label: 'user', value: 'Jackson' },
            { id: 2, label: 'date', value: '2021-01-01T14:09:51Z', format: 'date' },
            { id: 3, label: 'value', value: 1, format: 'currency' }
        ];

        component.paragraph = paragraph;
        component.openModal();

        fixture.detectChanges();

        const userLabel: HTMLElement = fixture.nativeElement.querySelector('#label0');
        const userValue: HTMLElement = fixture.nativeElement.querySelector('#value0');

        expect(userLabel.innerText).toBe('user:');
        expect(userValue.innerText).toBe('Jackson');

        const userDateLabel: HTMLElement = fixture.nativeElement.querySelector('#label1');
        const userDateValue: HTMLElement = fixture.nativeElement.querySelector('#value1');

        expect(userDateLabel.innerText).toBe('date:');
        expect(userDateValue.innerText).toBe('01/01/2021');

        const userCurrencyLabel: HTMLElement = fixture.nativeElement.querySelector('#label2');
        const userCurrencyValue: HTMLElement = fixture.nativeElement.querySelector('#value2');

        expect(userCurrencyLabel.innerText).toBe('value:');
        expect(userCurrencyValue.innerText).toBe('R$1.00');
    });
});
