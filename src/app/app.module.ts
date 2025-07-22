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
import { CsvFileComponent } from './components/csv-file/csv-file.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { ApplicantJobDisplayViewComponent } from './components/applicant-job-display-view/applicant-job-display-view.component';
import { ApplicantProfileComponent } from './components/applicant-profile/applicant-profile.component';
import { SaveInputOnBlurDirective } from './directives/save-input-on-blur.directive';
import { SaveSelectOptionOnBlurDirective } from './directives/save-select-option-on-blur.directive';
import { SaveAndDisplayPictureDirective } from './directives/save-and-display-picture.directive';
import { ApplicantsAppliesComponent } from './components/applicants-applies/applicants-applies.component';

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
    CsvFileComponent,
    MainViewComponent,
    ApplicantJobDisplayViewComponent,
    ApplicantProfileComponent,
    SaveInputOnBlurDirective,
    SaveSelectOptionOnBlurDirective,
    SaveAndDisplayPictureDirective,
    ApplicantsAppliesComponent
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
