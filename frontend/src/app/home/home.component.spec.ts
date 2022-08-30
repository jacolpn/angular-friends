import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';
import { PoModule } from '@po-ui/ng-components';

import { HomeComponent } from './home.component';

import { loader } from './../shared/utils/http-loader-factory';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [
                PoModule,
                TranslateModule.forRoot({ loader })
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('(D) Should display app-header when initialized', () => {
        const header: HTMLElement = fixture.nativeElement.querySelector('app-header');

        expect(header).toBeTruthy();
    });

    it('(D) Should display app-payment-list when initialized', () => {
        const payment: HTMLElement = fixture.nativeElement.querySelector('app-payment-list');

        expect(payment).toBeTruthy();
    });
});
