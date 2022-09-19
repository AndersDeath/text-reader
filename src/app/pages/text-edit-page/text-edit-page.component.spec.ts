import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditPageComponent } from './text-edit-page.component';

describe('TextEditPageComponent', () => {
  let component: TextEditPageComponent;
  let fixture: ComponentFixture<TextEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
