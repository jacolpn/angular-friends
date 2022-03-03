import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentListComponent } from './payment-list.component';

const routes: Routes = [
  {
    path: 'payments',
    component: PaymentListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
