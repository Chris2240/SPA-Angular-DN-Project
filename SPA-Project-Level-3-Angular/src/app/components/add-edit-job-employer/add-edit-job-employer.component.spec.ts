import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditJobEmployerComponent } from './add-edit-job-employer.component';

describe('AddEditJobEmployerComponent', () => {
  let component: AddEditJobEmployerComponent;
  let fixture: ComponentFixture<AddEditJobEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditJobEmployerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditJobEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
