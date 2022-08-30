import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { PoModule } from '@po-ui/ng-components';

import { HeaderComponent } from './header.component';

import { ProfileModule } from './profile/profile.module';

@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        PoModule,
        TranslateModule,
        ProfileModule
    ]
})
export class HeaderModule { }
