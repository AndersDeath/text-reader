import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressPageComponent } from './press-page.component';

describe('PressPageComponent', () => {
  let component: PressPageComponent;
  let fixture: ComponentFixture<PressPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PressPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
