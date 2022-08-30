import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import locatePt from '@angular/common/locales/pt';

import { PoModule } from '@po-ui/ng-components';
import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';

import { UserService } from './shared/services/user.service';

import { loader } from './shared/utils/http-loader-factory';

registerLocaleData(locatePt, 'pt');

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        PoModule,
        LoginModule,
        ReactiveFormsModule,
        AppRoutingModule,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({ loader })
    ],
    providers: [UserService, { provide: LOCALE_ID, useValue: 'pt'}],
    bootstrap: [AppComponent]
})
export class AppModule { }
