import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileLoadPageComponent } from './pages/file-load-page/file-load-page.component';
import { MainViewPageComponent } from './pages/main-view-page/main-view-page.component';
import { MainViewEmployerPageComponent } from './pages/main-view-employer-page/main-view-employer-page.component';
import { ApplicantsAppliesPageComponent } from './pages/applicants-applies-page/applicants-applies-page.component';
import { ApplicantProfilePageComponent } from './pages/applicant-profile-page/applicant-profile-page.component';
import { EmployerProfilePageComponent } from './pages/employer-profile-page/employer-profile-page.component';
import { AddEditJobEmployerPageComponent } from './pages/add-edit-job-employer-page/add-edit-job-employer-page.component';
import { ApplicantJobDisplayViewPageComponent } from './pages/applicant-job-display-view-page/applicant-job-display-view-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';


// Declares possible routes and there components.
const routes: Routes = [  
  {path: '', component: FileLoadPageComponent, title: 'File load'},
  {path: 'main-view-page', component: MainViewPageComponent, title: 'Main View'}, // this "title" property is overwriting default title element "DN Angular Template" at index.html
                                                                                  // whithout property "title" the main title on web card would be shows as "DN Angular Template"
  {path: 'main-view-employer-page', component: MainViewEmployerPageComponent, title: 'Main View Employer'},
  {path: 'applicants-applies-page', component: ApplicantsAppliesPageComponent, title: 'Applicants Applies'},
  {path: 'applicant-profile-page', component: ApplicantProfilePageComponent, title: 'Applicant Profile'},
  {path: 'employer-profile-page', component: EmployerProfilePageComponent, title: 'Employer Profile'},
  {path: 'add-edit-job-employer-page', component: AddEditJobEmployerPageComponent, title: 'Add Edit Job Employer'},
  {path: 'applicant-job-display-view-page', component: ApplicantJobDisplayViewPageComponent, title: 'Applicant Job Display View'},
  {path: '**', component: NotFoundPageComponent, title: '404 - Not Found Page'} // that is for non existing routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
