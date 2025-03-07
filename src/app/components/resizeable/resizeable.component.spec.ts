import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeableComponent } from './resizeable.component';

describe('ResizeableComponent', () => {
  let component: ResizeableComponent;
  let fixture: ComponentFixture<ResizeableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResizeableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResizeableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
