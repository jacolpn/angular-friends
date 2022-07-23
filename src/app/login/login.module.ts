import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { PoModule } from '@po-ui/ng-components';

import { LoginComponent } from './login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        PoModule,
        ReactiveFormsModule,
        TranslateModule
    ]
})
export class LoginModule { }
