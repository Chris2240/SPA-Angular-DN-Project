import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewEmployerComponent } from './main-view-employer.component';

describe('MainViewEmployerComponent', () => {
  let component: MainViewEmployerComponent;
  let fixture: ComponentFixture<MainViewEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainViewEmployerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainViewEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
