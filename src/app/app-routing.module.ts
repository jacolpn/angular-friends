import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PaymentListComponent } from './payment-list/payment-list.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
        // component: PaymentListComponent
    },
    {
        path: 'payments',
        loadChildren: () => import('./payment-list/payment-list.module').then(module => module.PaymentListModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
