import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoModule } from '@po-ui/ng-components';

import { HomeComponent } from './home.component';

import { HomeRoutingModule } from './home-routing.module';
import { PaymentListModule } from './payment-list/payment-list.module';
import { HeaderModule } from './header/header.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        PaymentListModule,
        HeaderModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        PoModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }
