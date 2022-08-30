import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { PoModule } from '@po-ui/ng-components';

import { ModalComponent } from './modal.component';

@NgModule({
    declarations: [ModalComponent],
    exports: [ModalComponent],
    imports: [
        CommonModule,
        PoModule,
        TranslateModule
    ]
})
export class ModalModule { }
