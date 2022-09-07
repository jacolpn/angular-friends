import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { PoNotificationService, PoTableColumn } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';

import { PaymentService } from './../../shared/services/payment.service';

import { IPagination } from '../../shared/interfaces/pagination.interface';
import { IPayment } from './../../shared/interfaces/payment.interface';
import { IDisclaimer } from './../../shared/interfaces/disclaimer.interface';

@Component({
    selector: 'app-payment-list',
    templateUrl: './payment-list.component.html',
    styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit, OnDestroy {
    @ViewChild('register', { static: true }) register: any;
    @ViewChild('modalDelete', { static: true }) modalDelete: any;
    @ViewChild('advanced', { static: true }) advanced: any;

    subscription$: Subscription[] = [];
    paymentColumns: Array<PoTableColumn> = [];

    disclaimers: string;
    disclaimer: Array<IDisclaimer> = [];
    editRegister: boolean;
    paymentId: number;
    paymentItems: Array<any> = [];
    isLoading: boolean;

    currentPage: number;
    pageSize: number;
    totalPages: number;

    userSearch: string;
    isPayed: boolean;

    constructor(
        private paymentService: PaymentService,
        private poNotification: PoNotificationService,
        private translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.currentPage = 1;
        this.pageSize = 5;
        this.totalPages = 1;
        this.disclaimers = '';
        this.userSearch = '';
        this.paymentColumns = this.getColumns();
        this.getItems(1, this.pageSize);
    }

    getColumns(): Array<any> {
        return [
            { property: 'id', label: 'Id', type: 'string', visible: false },
            { property: 'name', label: this.translate.instant('user'), type: 'cellTemplate' },
            { property: 'title', label: this.translate.instant('title'), type: 'string' },
            { property: 'date', label: this.translate.instant('date'), type: 'columnTemplate' },
            { property: 'price', label: this.translate.instant('value'), type: 'currency', format: 'BRL' },
            { property: 'isPayed', label: this.translate.instant('paid'), type: 'cellTemplate', width: '100px' },
            {
                property: 'action',
                label: ' ',
                type: 'icon',
                sortable: false,
                icons: [
                    {
                        action: this.editPayment.bind(this),
                        icon: 'po-icon-edit',
                        tooltip: this.translate.instant('edit'),
                        value: true
                    }
                ]
            },
            {
                property: 'action',
                label: ' ',
                type: 'icon',
                sortable: false,
                icons: [
                    {
                        action: this.openModalDelete.bind(this),
                        icon: 'po-icon-clear-content',
                        tooltip: this.translate.instant('delete'),
                        value: true
                    }
                ]
            }
        ];
    }

    getItems(currentPage: number, pageSize: number): void {
        this.isLoading = true;
        this.paymentItems = [];
        this.currentPage = currentPage;

        this.subscription$.push(this.paymentService
            .get(this.disclaimers, currentPage, pageSize)
            .subscribe({
                next: (response: any) => {
                    // this.totalPages = response.headers.get('X-Total-Count');
                    this.totalPages = response.body.total;
                    this.paymentItems = [...this.paymentItems, ...response.body.items];
                    this.isLoading = false;
                },
                error: (error: any) => {
                    this.isLoading = false;
                    throw new Error(error);
                }
            })
        );
    }

    addPayment() {
        this.register.resetFields();
        this.register.openModal();
    }

    editPayment(register: IPayment) {
        const payment: IPayment = register;
        payment.date = new Date(register.date);

        this.paymentId = register.ID;
        this.editRegister = true;
        this.register.advancedFilterForm.patchValue(payment);
        this.register.openModal();
    }

    onPaidChecked(value: IPayment) {
        value.isPayed = !value.isPayed;

        this.subscription$.push(this.paymentService.patch(value.ID, { isPayed: value.isPayed }).subscribe({
            next: () => {
                this.register.closeModal();
                this.getItems(1, this.pageSize);
                this.poNotification.success(this.translate.instant('paymentAlteredSuccess'));
            },
            error: () => this.poNotification.error(this.translate.instant('errorConnection')),
        }));
	}

    savePayment(payment: IPayment) {
        payment.action = true;

        if (this.editRegister) {
            this.editRegister = false;

            this.subscription$.push(this.paymentService.put(this.paymentId, payment).subscribe({
                next: () => {
                    this.register.closeModal();
                    this.getItems(1, this.pageSize);
                    this.poNotification.success(this.translate.instant('paymentAlteredSuccess'));
                },
                error: () => this.poNotification.error(this.translate.instant('errorConnection')),
            }));

            return;
        }

        payment.isPayed = false;

        this.subscription$.push(this.paymentService.post(payment).subscribe({
            next: () => {
                this.register.closeModal();
                this.getItems(1, this.pageSize);
                this.poNotification.success(this.translate.instant('paymentAddedSuccess'));
            },
            error: () => this.poNotification.error(this.translate.instant('errorConnection')),
        }));

        return;
    }

    openModalDelete(payment: IPayment) {
        this.modalDelete.paragraph = [
            { id: payment.ID, label: this.translate.instant('user'), value: payment.name },
            { id: payment.ID, label: this.translate.instant('date'), value: payment.date, format: 'date' },
            { id: payment.ID, label: this.translate.instant('value'), value: payment.price, format: 'currency' }
        ];

        this.modalDelete.openModal();
    }

    excludePayment(id: number) {
        this.subscription$.push(this.paymentService.delete(id).subscribe({
            next: () => {
                this.getItems(1, this.pageSize);
                this.poNotification.success(this.translate.instant('paymentDeletedSuccess'));
            },
            error: () => this.poNotification.error(this.translate.instant('errorConnection')),
        }));
    }

    onChangeDisclaimer(disclaimers: any, filter: string): void {
        this.disclaimer = [];
        this.disclaimers = '';

        if (typeof(disclaimers) === 'string' && filter === 'simple') {
            if (disclaimers !== '') {
                this.disclaimer = [
                    { label: `${this.translate.instant('user')}: ` + disclaimers, value: `&name_like=${disclaimers}` }
                ];
                this.disclaimers = `&name_like=${disclaimers}`;
            }

            this.getItems(1, this.pageSize);

            return;
        }

        disclaimers.forEach((item: IDisclaimer) => {
            if (item.value !== '') {
                this.disclaimer.push({ label: item.label, value: item.value });
                this.disclaimers = this.disclaimers + item.value;
            }
        });

        this.getItems(1, this.pageSize);
    }

    changeEvent(event: any) {
        // Limpar input's após remoção de algum disclaimer.
        if (event.removedDisclaimer) {
            if (event.removedDisclaimer.value.indexOf('&name') === 0) {
                this.advanced.userSearchAdvanced = '';
                this.userSearch = '';
            }

            if (event.removedDisclaimer.value.indexOf('&title') === 0) {
                this.advanced.titleSearchAdvanced = '';
            }

            if (event.removedDisclaimer.value.indexOf('&date') === 0) {
                this.advanced.dateSearchAdvanced = '';
            }

            if (event.removedDisclaimer.value.indexOf('&username') === 0) {
                this.advanced.usernameSearchAdvanced = '';
            }
        }

        // Evitar que apareça disclaimer sem filtro.
        if (event.currentDisclaimers.length === 0) {
            this.disclaimers = '';
            this.getItems(1, this.pageSize);

            return;
        }

        this.onClickAdvancedFilter(event.currentDisclaimers);
    }

    onClickAdvancedFilter(filter: Array<IDisclaimer>) {
        this.onChangeDisclaimer(filter, 'advanced');
    }

    onChangePagination(event: IPagination) {
        this.pageSize = event.rows;
        this.currentPage = event.page + 1;
        this.getItems(this.currentPage, this.pageSize);
    }

    ngOnDestroy(): void {
		if (this.subscription$ !== undefined) {
			this.subscription$.forEach((sub: Subscription) => sub.unsubscribe());
		}
	}
}
