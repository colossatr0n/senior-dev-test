import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTabPanelComponent } from './new-tab-panel.component';

describe('NewTabPanelComponent', () => {
  let component: NewTabPanelComponent;
  let fixture: ComponentFixture<NewTabPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTabPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTabPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
