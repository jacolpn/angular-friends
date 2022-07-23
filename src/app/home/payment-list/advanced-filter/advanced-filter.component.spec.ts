import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoModule } from '@po-ui/ng-components';
import { TranslateModule } from '@ngx-translate/core';

import { AppModule } from './../../../app.module';

import { loader } from './../../../shared/utils/http-loader-factory';

import { PaymentService } from './../../../shared/services/payment.service';

import { AdvancedFilterComponent } from './advanced-filter.component';

describe(AdvancedFilterComponent.name, () => {
    let component: AdvancedFilterComponent;
    let fixture: ComponentFixture<AdvancedFilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ AdvancedFilterComponent ],
            imports: [
                PoModule,
                TranslateModule.forRoot({ loader }),
                AppModule
            ],
            providers: [PaymentService],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(AdvancedFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('openModal: Should open to modal', () => {
        component.openModal();
        fixture.detectChanges();

        const modal: HTMLElement = fixture.nativeElement.querySelector('.po-modal');

        expect(modal.innerHTML).toContain('po-modal');
    });

    it('onClickSearch: Should return filters with _like when not filling the fields', () => {
        component.onClickSearch();

        expect(component.disclaimers[0].value).toBe('');
        expect(component.disclaimers[1].value).toBe('');
        expect(component.disclaimers[2].value).toContain('&date_like=');
        expect(component.disclaimers[3].value).toBe('');
    });

    it('onClickSearch: Should return filters without _like when filling the fields', () => {
        component.userSearchAdvanced = 'Jackson';
        component.usernameSearchAdvanced = 'Picpay';
        component.dateSearchAdvanced = new Date();
        component.titleSearchAdvanced = 'Neves';

        component.onClickSearch();

        expect(component.disclaimers[0].value).toBe('&name=Jackson');
        expect(component.disclaimers[1].value).toBe('&title=Neves');
        expect(component.disclaimers[2].value).toContain('&date_like=');
        expect(component.disclaimers[3].value).toBe('&username=Picpay');
    });
});
