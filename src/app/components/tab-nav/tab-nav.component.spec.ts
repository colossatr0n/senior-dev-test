import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabNavComponent } from './tab-nav.component';
import { take } from 'rxjs';

describe('TabNavComponent', () => {
    let component: TabNavComponent;
    let fixture: ComponentFixture<TabNavComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TabNavComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TabNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should start out on the home tab', () => {
        component.activeTab$.pipe(take(1)).subscribe(t => {
            expect(t.title).toEqual('Home');
        });
    });

    it('it should change current tab to the active tab', () => {
        component.tabs$.pipe(take(1)).subscribe(tabs => {
            let tabToOpen = tabs[1]
            component.openTab(tabToOpen)
            component.activeTab$.pipe(take(1)).subscribe(at => {
                expect(at.title).toEqual(tabToOpen.title)
            })
        })
    });
});
