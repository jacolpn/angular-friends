import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PoModule } from '@po-ui/ng-components';

import { PaymentListComponent } from './payment-list.component';

import { PaymentService } from '../shared/services/payment.service';

import { PaymentRoutingModule } from './payment-routing.module';

@NgModule({
    declarations: [PaymentListComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        PoModule,
        PaymentRoutingModule,
    ],
    exports: [PaymentListComponent],
    providers: [PaymentService]
})
export class PaymentListModule { }
