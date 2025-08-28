import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsAppliesComponent } from './applicants-applies.component';

describe('ApplicantsAppliesComponent', () => {
  let component: ApplicantsAppliesComponent;
  let fixture: ComponentFixture<ApplicantsAppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicantsAppliesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantsAppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
