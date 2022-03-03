import { formatDate, formatNumber } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoDialogService, PoModalAction, PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';

import { Payment } from '../shared/interfaces/payment.interface';

import { PaymentService } from '../shared/services/payment.service';

@Component({
    selector: 'app-payment-list',
    templateUrl: './payment-list.component.html',
    styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
    @ViewChild('newPayment', { static: true }) newPayment: any;
    @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal: any;

    paymentSubscriptionGet$: Subscription | undefined;
    paymentSubscriptionPost$: Subscription | undefined;
    paymentSubscriptionUpdate$: Subscription | undefined;
    paymentSubscriptionDelete$: Subscription | undefined;

    paymentColumns: Array<PoTableColumn> = [];
	tableActions: Array<PoTableAction> = [];
    advancedFilterPrimaryAction: PoModalAction;

    disclaimers: string = '';
    editRegister: boolean = false;
    paymentId: string = '';
    paymentItems: Array<any> = [];
    isLoading: boolean = false;
    advancedFilterForm: FormGroup;
    totalItems: number = 0;
    totalPages: Array<any> = [];
    currentPage: number = 1;
    pageSize: number = 5;

    userSearch: string = '';
    userSearchAdvanced: string = '';
    paid: boolean = true;
    valueSearchAdvanced: number = 0;
    dateSearchAdvanced: Date = new Date();
    titleSearchAdvanced: string = '';
    enterPressed: boolean = false;

    constructor(
        private paymentService: PaymentService,
        private poNotification: PoNotificationService,
        private poDialog: PoDialogService,
		private formBuilder: FormBuilder
    ) {
        this.advancedFilterForm = this.formBuilder.group({
            user: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
            value: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(99999.99)])],
            date: ['', Validators.compose([Validators.required])],
            title: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
		});

        this.advancedFilterPrimaryAction = {
            action: () => {
                this.disclaimers = '';
                this.disclaimers += this.userSearchAdvanced !== '' ? `user=${this.userSearchAdvanced}` : 'user_like=';
                this.disclaimers += this.valueSearchAdvanced > 0 ? `&value=${this.valueSearchAdvanced}` : '&value_like=';
                this.disclaimers += this.dateSearchAdvanced ? `&date=${this.dateSearchAdvanced}` : '&date_like=';
                this.disclaimers += this.titleSearchAdvanced !== '' ? `&title=${this.titleSearchAdvanced}` : '&title_like=';

                this.onChangeDisclaimer(this.disclaimers, 'advanced');

                this.advancedFilterModal.close();
            },
            label: 'Aplicar filtros',
        };
    }

    ngOnInit(): void {
        this.tableActions = [
			{ action: this.editPayment.bind(this), icon: 'po-icon-edit', label: 'Editar', separator: true },
			{ action: this.excludePayment.bind(this), icon: 'po-icon-delete', label: 'Excluir' }
		];

        this.paymentColumns = this.getColumns();
        this.advancedFilterForm.reset();
        this.getItems(1, this.pageSize);
    }

    getColumns(): Array<PoTableColumn> {
        return [
            { property: 'id', label: 'Id', type: 'string', visible: false },
            { property: 'user', label: 'Usuário', type: 'columnTemplate' },
            { property: 'title', label: 'Título', type: 'string' },
            { property: 'date', label: 'Data', type: 'columnTemplate' },
            { property: 'value', label: 'Valor', type: 'currency', format: 'BRL' },
            { property: 'paid', label: 'Pago', type: 'cellTemplate' }
        ];
    }

    getItems(currentPage: number, pageSize: number): void {
        let resultPages: any;

        this.isLoading = true;
        this.paymentItems = [];
        this.currentPage = currentPage;

        this.paymentSubscriptionGet$ = this.paymentService
            .get(this.disclaimers, currentPage, pageSize)
            .subscribe({
                next: (response: any) => {
                    this.totalItems = response.headers.get('X-Total-Count');

                    resultPages = this.totalItems / pageSize;
                    
                    this.totalPages = [];

                    for (let i = 1; i <= Math.ceil(resultPages); i++) {
                        this.totalPages.push(i);
                    }

                    this.paymentItems = [...this.paymentItems, ...response.body];
                    this.isLoading = false;
                },
                error: (error: any) => {
                    this.isLoading = false;
                    throw new Error(error);
                }
            });
    }

    savePayment(payment: Payment) {
        if (this.advancedFilterForm.valid) {
            if (this.editRegister) {
                this.paymentSubscriptionUpdate$ = this.paymentService.update(this.paymentId, payment).subscribe({
                    next: () => {
                        this.poNotification.success('Pagamento alterado com sucesso!');
                        this.newPayment.close();
                        this.getItems(1, this.pageSize);
                    },
                    error: () => this.poNotification.error('Verifique sua conexão!'),
                });
                
                return;
            }

            payment.paid = false;

            this.paymentSubscriptionPost$ = this.paymentService.post(payment).subscribe({
                next: () => {
                    this.poNotification.success('Pagamento cadastrado com sucesso!');
                    this.newPayment.close();
                    this.getItems(1, this.pageSize);
                },
                error: () => this.poNotification.error('Verifique sua conexão!'),
            });

            return;
        }

        this.poNotification.error('Favor preencher todos os campos!')
    }

    editPayment(register: Payment) {
        let payment: any = register;
        payment.date = formatDate(register.date, 'yyyy-MM-dd', 'pt')

        this.paymentId = register.id;
        this.editRegister = true;

        this.advancedFilterForm.patchValue(payment);
        this.newPayment.open();
    }

    onPaidChecked(value: Payment) {
        value.paid = !value.paid

        this.paymentSubscriptionUpdate$ = this.paymentService.put(value.id, value).subscribe({
            next: () => {
                this.poNotification.success('Pagamento alterado com sucesso!');
                this.newPayment.close();
                this.getItems(1, this.pageSize);
            },
            error: () => this.poNotification.error('Verifique sua conexão!'),
        });
	}

    excludePayment(payment: Payment) {
        this.poDialog.confirm({
            title: 'Excluir pagamento',
            message: `
                Usuário: ${payment.user} <br>
                Data: ${formatDate(payment.date, 'shortDate', 'pt')} <br>
                Valor: R$: ${formatNumber(payment.value, 'pt')}
            `,
            confirm: () => {
                this.paymentSubscriptionDelete$= this.paymentService.delete(payment['id']).subscribe({
                    next: () => {
                        this.poNotification.success('Pagamento removido com sucesso!');
                        this.getItems(1, this.pageSize);
                    },
                    error: () => this.poNotification.error('Verifique sua conexão!'),
                });
            }
        });
    }

    onChangeQuickSearch() {
        if (!this.enterPressed) {
            this.onChangeDisclaimer(this.userSearch, 'simple');
        }

        this.enterPressed = false;
    }

    keyPressInput(key: number) {
        if (key === 13) {
            this.enterPressed = true;
            this.onChangeDisclaimer(this.userSearch, 'simple');
        }
    }

    onChangeDisclaimer(disclaimers: string, filter: string): void {
        if (filter === 'simple') {
            this.disclaimers = `user_like=${disclaimers}`;
            this.getItems(1, this.pageSize);

            return;
        }
    
        this.disclaimers = disclaimers;
        this.getItems(1, this.pageSize);
    }

    onChangeCombo(pageSize: number) {
        this.pageSize = pageSize;
        this.getItems(1, pageSize);
    }

    onChangePagination(page: string) {
        if (page === 'previous') {

            this.currentPage === 1 ? 1 : this.currentPage--;
            this.getItems(this.currentPage, this.pageSize);

            return;
        }

        this.currentPage === 3 ? 3 : this.currentPage++;
        this.getItems(this.currentPage, this.pageSize);
    }

    ngOnDestroy(): void {
        if (this.paymentSubscriptionDelete$ !== undefined) {
            this.paymentSubscriptionDelete$.unsubscribe();
        }
    
        if (this.paymentSubscriptionUpdate$ !== undefined) {
            this.paymentSubscriptionUpdate$.unsubscribe();
        }

        if (this.paymentSubscriptionGet$ !== undefined) {
            this.paymentSubscriptionGet$.unsubscribe();
        }

        if (this.paymentSubscriptionPost$ !== undefined) {
            this.paymentSubscriptionPost$.unsubscribe();
        }
    }
}
