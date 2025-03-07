import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeableComponent } from './resizeable.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ResizeableComponent', () => {
    let component: ResizeableComponent;
    let fixture: ComponentFixture<ResizeableComponent>;
    let debugEl: DebugElement[];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ResizeableComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: { queryParams: of({ param1: 'value1' }) },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ResizeableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should resize when right edge clicked and dragged', () => {
        let prevWidth = component.width;
        let clickX = 101;
        let clickY = 101;
        let diff = 50;
        let release = clickX + diff;
        debugEl = fixture.debugElement.queryAll(By.css('#right-edge'));
        debugEl[0].triggerEventHandler('mousedown', {
            clientX: clickX,
            clientY: clickY,
            preventDefault: () => {},
            stopPropagation: () => {}
        });

        document.dispatchEvent(
            new MouseEvent('mousemove', {
                clientX: release,
                clientY: clickY,
            })
        );

        document.dispatchEvent(
            new MouseEvent('mouseup', {
                clientX: release,
                clientY: clickY,
            })
        );
        expect(component.width - diff).toEqual(prevWidth);
    });

    it('should resize when left edge clicked and dragged', () => {
        let prevWidth = component.width;
        let clickX = 101;
        let clickY = 101;
        let diff = 50;
        let release = clickX - diff;
        debugEl = fixture.debugElement.queryAll(By.css('#left-edge'));
        debugEl[0].triggerEventHandler('mousedown', {
            clientX: clickX,
            clientY: clickY,
            preventDefault: () => {},
            stopPropagation: () => {}
        });

        document.dispatchEvent(
            new MouseEvent('mousemove', {
                clientX: release,
                clientY: clickY,
            })
        );

        document.dispatchEvent(
            new MouseEvent('mouseup', {
                clientX: release,
                clientY: clickY,
            })
        );
        expect(component.width - diff).toEqual(prevWidth);
    });

    it('should resize when top edge clicked and dragged upward', () => {
        let prevHeight = component.height;
        let clickX = 101;
        let clickY = 101;
        let diff = 50;
        let release = clickY - diff;
        debugEl = fixture.debugElement.queryAll(By.css('#top-edge'));
        debugEl[0].triggerEventHandler('mousedown', {
            clientX: clickX,
            clientY: clickY,
            preventDefault: () => {},
            stopPropagation: () => {}
        });

        document.dispatchEvent(
            new MouseEvent('mousemove', {
                clientX: clickX,
                clientY: release,
            })
        );

        document.dispatchEvent(
            new MouseEvent('mouseup', {
                clientX: clickX,
                clientY: release,
            })
        );
        expect(component.height - diff).toEqual(prevHeight);
    });

    it('should resize when bottom edge clicked and dragged downward', () => {
        let prevHeight = component.height;
        let clickX = 101;
        let clickY = 101;
        let diff = 50;
        let release = clickY + diff;
        debugEl = fixture.debugElement.queryAll(By.css('#bottom-edge'));
        debugEl[0].triggerEventHandler('mousedown', {
            clientX: clickX,
            clientY: clickY,
            preventDefault: () => {},
            stopPropagation: () => {},
        });

        document.dispatchEvent(
            new MouseEvent('mousemove', {
                clientX: clickX,
                clientY: release,
            })
        );

        document.dispatchEvent(
            new MouseEvent('mouseup', {
                clientX: clickX,
                clientY: release,
            })
        );
        expect(component.height - diff).toEqual(prevHeight);
    });


    it('it should change state to isResizing when clicked', () => {
        debugEl = fixture.debugElement.queryAll(By.css('#right-edge'));
        debugEl[0].triggerEventHandler('mousedown', {
            clientX: 101,
            clientY: 101,
        });
        // expect(component.width - (release - click)).toEqual(prevWidth)
        expect(component.isResizing).toEqual(true);
    });
});
