import { formatDate } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { IDisclaimer } from './../../../shared/interfaces/disclaimer.interface';

@Component({
    selector: 'app-advanced-filter',
    templateUrl: './advanced-filter.component.html',
    styleUrls: ['./advanced-filter.component.css']
})
export class AdvancedFilterComponent {
    @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal: any;

    @Output() filter: EventEmitter<Array<IDisclaimer>> = new EventEmitter<Array<IDisclaimer>>();

    userSearchAdvanced: string;
    usernameSearchAdvanced: string;
    dateSearchAdvanced: Date = new Date();
    titleSearchAdvanced: string;
    disclaimers: Array<IDisclaimer> = [];

    constructor(private translate: TranslateService) {
        this.userSearchAdvanced = '';
        this.usernameSearchAdvanced = '';
        this.titleSearchAdvanced = '';
    }

    openModal() {
        this.advancedFilterModal.open();
    }

    onClickSearch() {
        let dateFormated = '';

        if (this.dateSearchAdvanced) {
            dateFormated = formatDate(this.dateSearchAdvanced, 'dd-MM-yyyy', 'pt');
        }

        this.disclaimers = [
            {
                label: `${this.translate.instant('user')}: ${this.userSearchAdvanced}`,
                value: this.userSearchAdvanced !== '' ? `&name=${this.userSearchAdvanced}` : ''
            },
            {
                label: `${this.translate.instant('title')}: ${this.titleSearchAdvanced}`,
                value: this.titleSearchAdvanced !== '' ? `&title=${this.titleSearchAdvanced}` : ''
            },
            {
                label: `${this.translate.instant('date')}: ${dateFormated}`,
                value: dateFormated !== '' ? `&date=${this.dateSearchAdvanced}` : ''
            },
            {
                label: `${this.translate.instant('nickname')}: ${this.usernameSearchAdvanced}`,
                value: this.usernameSearchAdvanced !== '' ? `&username=${this.usernameSearchAdvanced}` : ''
            }
        ];

        this.filter.emit(this.disclaimers);
        this.advancedFilterModal.close();
    }
}
