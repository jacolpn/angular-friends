import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { PoNotificationService } from '@po-ui/ng-components';

import { IPayment } from './../../../shared/interfaces/payment.interface';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {
    @ViewChild('newPayment', { static: true }) newPayment: any;

    @Input() edit: boolean;

    @Output() save: EventEmitter<IPayment> = new EventEmitter<IPayment>();

    subscription$: Subscription[] = [];
    advancedFilterForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private poNotification: PoNotificationService,
        private translate: TranslateService
    ) {
        this.advancedFilterForm = this.formBuilder.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
            value: ['', Validators.compose([Validators.required])],
            title: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50)])],
            date: ['', Validators.compose([Validators.required])],
            username: ['']
		});
    }

    ngOnInit(): void {
        this.advancedFilterForm.reset();
    }

    openModal() {
        this.newPayment.open();
    }

    closeModal() {
        this.newPayment.close();
        this.resetFields();
    }

    resetFields() {
        this.advancedFilterForm.reset();
        this.edit = false;
    }

    onSave(payment: IPayment) {
        if (this.advancedFilterForm.get('value').value < 0) {
            this.poNotification.error(this.translate.instant('valueLessThanZero'));

            return;
        }

        if (this.advancedFilterForm.invalid) {
            this.poNotification.error(this.translate.instant('pleaseFillInFields'));

            return;
        }

        this.save.emit(payment);
    }

    ngOnDestroy(): void {
		if (this.subscription$ !== undefined) {
			this.subscription$.forEach((sub: Subscription) => sub.unsubscribe());
		}
	}
}
