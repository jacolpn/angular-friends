import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { PaymentListModule } from './payment-list/payment-list.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
		BrowserAnimationsModule,
    BrowserModule,
    PaymentListModule,
    AppRoutingModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
