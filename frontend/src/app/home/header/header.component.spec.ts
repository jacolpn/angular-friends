import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from './header.component';

import { loader } from './../../shared/utils/http-loader-factory';

describe(HeaderComponent.name, () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [TranslateModule.forRoot({ loader })],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('(D) Should display app-profile when initialized', () => {
        fixture.detectChanges();

        const profile: HTMLElement = fixture.nativeElement.querySelector('app-profile');

        expect(profile).toBeTruthy();
    });
});
