import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PoDialogService, PoDynamicFormField, PoModalAction, PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { PaymentService } from '../shared/services/payment.service';

@Component({
    selector: 'app-payment-list',
    templateUrl: './payment-list.component.html',
    styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
    @ViewChild('newPayment', { static: true }) newPayment: any;

    paymentSubscription$: Subscription | undefined;
    paymentColumns: Array<PoTableColumn> = [];
	tableActions: Array<PoTableAction> = [];
    
    hiringProcesses: Array<object> = [];
    disclaimers: Array<any> | string = [];
    paymentItems: Array<any> = [];
    isLoading: boolean = false;
    advancedFilterForm: FormGroup;
    currentPage: number = 1;
    pageSize: number = 20;

    userSearch: string = '';
    enterPressed: boolean = false;

    constructor(
        private paymentService: PaymentService,
        private poNotification: PoNotificationService,
        private poDialog: PoDialogService,
		private formBuilder: FormBuilder
    ) {
        this.advancedFilterForm = this.formBuilder.group({
			user: [{ value: '', disabled: false, require: true }],
			value: [{ value: '', disabled: false, require: true }],
			date: [{ value: '', disabled: false, require: true }],
			title: [{ value: '', disabled: false, require: true }]
		});
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
            { property: 'user', label: 'Usuário', width: '150px', type: 'string' },
            { property: 'title', label: 'Título', type: 'string' },
            { property: 'date', label: 'Data', type: 'date', format: 'mediumDate' },
            { property: 'value', label: 'Valor', type: 'currency', format: 'BRL' },
            { property: 'paid', label: 'Pago', type: 'boolean' }
        ];
    }

    getItems(currentPage: number, pageSize: number): void {
        this.isLoading = true;
        this.paymentItems = [];

        this.paymentSubscription$ = this.paymentService
            .get(this.disclaimers, currentPage, pageSize)
            .subscribe({
                next: (response: any) => {
                    this.paymentItems = [...this.paymentItems, ...response];
                    this.hiringProcesses = this.paymentItems;
                    this.isLoading = false;
                },
                error: (error: any) => {
                    this.isLoading = false;
                    throw new Error(error);
                }
            });
    }

    savePayment(payment: any) {
        if (this.advancedFilterForm.valid) {
            this.paymentService
                .post(payment)
                .subscribe({
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

    editPayment(e: any) {
        this.advancedFilterForm.patchValue(e)
        this.newPayment.open();
    }

    isParent(row: any, index: number) {
		return row.user === null;
	}

    excludePayment(payment: any) {
        this.poDialog.confirm({
            title: 'Excluir pagamento',
            message: `
                Usuário: ${payment['user']} <br>
                Data: ${payment['date']} <br>
                Valor: R$: ${payment['value']}
            `,
            confirm: () => {
                this.paymentService
                    .delete(payment['id'])
                    .subscribe({
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
            this.onChangeDisclaimer(this.userSearch);
        }

        this.enterPressed = false;
    }

    keyPressInput(key: number) {
        if (key === 13) {
            this.enterPressed = true;
            this.onChangeDisclaimer(this.userSearch);
        }
    }

    onChangeDisclaimer(disclaimers: any): void {
        this.disclaimers = `user_like=${disclaimers}`;
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
}
