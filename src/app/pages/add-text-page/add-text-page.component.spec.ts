import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTextPageComponent } from './add-text-page.component';

describe('AddTextPageComponent', () => {
  let component: AddTextPageComponent;
  let fixture: ComponentFixture<AddTextPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTextPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTextPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
