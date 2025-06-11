import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantJobDisplayViewComponent } from './applicant-job-display-view.component';

describe('ApplicantJobDisplayViewComponent', () => {
  let component: ApplicantJobDisplayViewComponent;
  let fixture: ComponentFixture<ApplicantJobDisplayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicantJobDisplayViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantJobDisplayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
