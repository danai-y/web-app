import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStaffComponent } from './form-staff.component';

describe('FormStaffComponent', () => {
  let component: FormStaffComponent;
  let fixture: ComponentFixture<FormStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
