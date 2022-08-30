import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoModule } from '@po-ui/ng-components';
import { TranslateModule } from '@ngx-translate/core';

import { ProfileComponent } from './profile.component';

@NgModule({
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
    imports: [
        CommonModule,
        FormsModule,
        PoModule,
        TranslateModule
    ]
})
export class ProfileModule { }
