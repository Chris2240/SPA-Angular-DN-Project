import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileLoadPageComponent } from './pages/file-load-page/file-load-page.component';
import { MainViewPageComponent } from './pages/main-view-page/main-view-page.component';
import { MainViewEmployerPageComponent } from './pages/main-view-employer-page/main-view-employer-page.component';
import { ApplicantsAppliesPageComponent } from './pages/applicants-applies-page/applicants-applies-page.component';
import { ApplicantProfilePageComponent } from './pages/applicant-profile-page/applicant-profile-page.component';
import { EmployerProfilePageComponent } from './pages/employer-profile-page/employer-profile-page.component';
import { AddEditJobEmployerPageComponent } from './pages/add-edit-job-employer-page/add-edit-job-employer-page.component';
import { ApplicantJobDisplayViewPageComponent } from './pages/applicant-job-display-view-page/applicant-job-display-view-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { FileLoadComponent } from './components/file-load/file-load.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { ApplicantsAppliesComponent } from './components/applicants-applies/applicants-applies.component';
import { ApplicantProfileComponent } from './components/applicant-profile/applicant-profile.component';
import { EmployerProfileComponent } from './components/employer-profile/employer-profile.component';
import { AddEditJobEmployerComponent } from './components/add-edit-job-employer/add-edit-job-employer.component';
import { ApplicantJobDisplayViewComponent } from './components/applicant-job-display-view/applicant-job-display-view.component';
import { MainViewEmployerComponent } from './components/main-view-employer/main-view-employer.component';


@NgModule({
  declarations: [
    AppComponent,
    FileLoadPageComponent,
    MainViewPageComponent,
    MainViewEmployerPageComponent,
    ApplicantsAppliesPageComponent,
    ApplicantProfilePageComponent,
    EmployerProfilePageComponent,
    AddEditJobEmployerPageComponent,
    ApplicantJobDisplayViewPageComponent,
    NotFoundPageComponent,
    FileLoadComponent,
    MainViewComponent,
    ApplicantsAppliesComponent,
    ApplicantProfileComponent,
    EmployerProfileComponent,
    AddEditJobEmployerComponent,
    ApplicantJobDisplayViewComponent,
    MainViewEmployerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
