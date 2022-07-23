import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';

import { loader } from './shared/utils/http-loader-factory';

import { AppComponent } from './app.component';

describe(AppComponent.name, () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                TranslateModule.forRoot({ loader })
            ],
            declarations: [AppComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('Should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('(D) Should display router-outlet', () => {
        fixture.detectChanges();

        const router: HTMLElement = fixture.nativeElement.querySelector('router-outlet');

        expect(router).toBeTruthy();
    });
});
