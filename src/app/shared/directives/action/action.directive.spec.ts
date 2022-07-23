import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDirective } from './action.directive';

import { ActionDirectiveModule } from './action.module';

@Component({
    template: `<div class="dummy-component" (appAction)="actionHandler($event)"></div>`
})
class ActionDirectiveTesteComponent {
    private event: Event;

    public actionHandler(event: Event): void {
        this.event = event;
    }

    public hasEvent(): boolean {
        return !!this.event;
    }
}

describe(ActionDirective.name, () => {
    let fixture: ComponentFixture<ActionDirectiveTesteComponent>;
    let component: ActionDirectiveTesteComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ActionDirectiveTesteComponent],
            imports: [ActionDirectiveModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ActionDirectiveTesteComponent);
        component = fixture.componentInstance;
    });

	it('Should create component', () => {
		expect(component).toBeTruthy();
	});

    it(`(D) (@Output appAction) should emit with payload when ENTER key is pressed`, () => {
        const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
        const event = new KeyboardEvent('keyup', { keyCode: 13 });

        divEl.dispatchEvent(event);

        expect(component.hasEvent()).toBeTrue();
    });
});
