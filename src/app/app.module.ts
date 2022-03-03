import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import locatePt from '@angular/common/locales/pt';

import { PoModule } from '@po-ui/ng-components';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { PaymentListModule } from './payment-list/payment-list.module';
import { UserService } from './shared/services/user.service';

registerLocaleData(locatePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
		BrowserAnimationsModule,
    BrowserModule,
    PoModule,
    ReactiveFormsModule,
    PaymentListModule,
    AppRoutingModule,
    RouterModule.forRoot([])
  ],
  providers: [UserService, { provide: LOCALE_ID, useValue: 'pt'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
