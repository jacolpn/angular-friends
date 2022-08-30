import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PoModule } from '@po-ui/ng-components';
import { TranslateModule } from '@ngx-translate/core';

import { ActionDirectiveModule } from './../../shared/directives/action/action.module';
import { ModalModule } from './../../shared/components/modal/modal.module';

import { PaymentService } from './../../shared/services/payment.service';

import { PaymentListComponent } from './payment-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdvancedFilterComponent } from './advanced-filter/advanced-filter.component';

import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    declarations: [
        PaymentListComponent,
        RegistrationComponent,
        AdvancedFilterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        PoModule,
        TranslateModule,
        ActionDirectiveModule,
        ModalModule,
        CalendarModule,
        InputTextModule,
        InputNumberModule,
        PaginatorModule
    ],
    exports: [PaymentListComponent],
    providers: [PaymentService]
})
export class PaymentListModule { }
