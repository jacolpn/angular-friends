import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from '../shared/guards/login.guard';

import { PaymentListComponent } from './payment-list.component';

const routes: Routes = [
  {
    path: 'payments',
    component: PaymentListComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
