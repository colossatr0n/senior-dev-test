import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeablePlaygroundComponent } from './resizeable-playground.component';

describe('ResizeablePlaygroundComponent', () => {
  let component: ResizeablePlaygroundComponent;
  let fixture: ComponentFixture<ResizeablePlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResizeablePlaygroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResizeablePlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
